import crypto from "node:crypto";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createStore, DEFAULT_USER_ID, DOCUMENT_KEYS, STORAGE_KEYS } from "./db.js";
import { createObjectStorage, MissingObjectError } from "./object-storage.js";
import { createPasswordGate } from "./auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const migrationsDir = path.join(__dirname, "migrations");
const bodyLimit = process.env.BODY_LIMIT || "25mb";

const MIME_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

function exitWithMessage(lines) {
  for (const line of lines) {
    console.error(line);
  }
  process.exit(1);
}

let store;
try {
  store = await createStore({
    connectionString: process.env.DATABASE_URL,
    migrationsDir,
    revisionLimit: Number(process.env.REVISION_LIMIT) || undefined,
    poolMax: Number(process.env.PG_POOL_MAX) || undefined,
  });
  await store.ensureUser(DEFAULT_USER_ID);
} catch (error) {
  exitWithMessage([
    "Failed to connect to PostgreSQL.",
    "Set DATABASE_URL to a reachable database (locally: `docker compose up -d db`).",
    String(error?.message ?? error),
  ]);
}

const objectStorage = createObjectStorage({
  bucket: process.env.BUCKET_NAME,
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  localDir: path.join(dataDir, "assets"),
});

const app = express();
const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || "0.0.0.0";
const appPassword = process.env.APP_PASSWORD || "";

app.set("trust proxy", true);

// Auth lands in A-115; until then every request belongs to the single seeded user.
function resolveUserId(_req) {
  return DEFAULT_USER_ID;
}

function asyncRoute(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res)).catch(next);
  };
}

if (appPassword) {
  createPasswordGate({ password: appPassword, secure: process.env.NODE_ENV === "production" }).register(app);
} else {
  console.warn("APP_PASSWORD is not set; the app is served without any access control.");
}

app.post("/api/assets", express.raw({ type: ["image/*", "application/octet-stream"], limit: bodyLimit }));
app.use(express.json({ limit: bodyLimit }));

app.get(
  "/api/health",
  asyncRoute(async (_req, res) => {
    try {
      await store.ping();
    } catch (error) {
      res.status(503).json({ ok: false, storage: "postgres", database: "unreachable", error: error.message });
      return;
    }
    res.json({
      ok: true,
      storage: "postgres",
      objectStorage: objectStorage.kind,
      keys: Array.from(STORAGE_KEYS),
    });
  }),
);

app.get(
  "/api/briefs",
  asyncRoute(async (req, res) => {
    res.json({ briefs: await store.listBriefs(resolveUserId(req)) });
  }),
);

app.get(
  "/api/briefs/:briefId",
  asyncRoute(async (req, res) => {
    const brief = await store.loadBrief(resolveUserId(req), req.params.briefId);
    if (!brief) {
      res.status(404).json({ error: "Unknown brief" });
      return;
    }
    res.json(brief);
  }),
);

app.put(
  "/api/briefs/:briefId",
  asyncRoute(async (req, res) => {
    if (!("value" in req.body)) {
      res.status(400).json({ error: "Missing value" });
      return;
    }
    const channelId = typeof req.body.channelId === "string" ? req.body.channelId : req.body.value?.channelId;
    if (!channelId) {
      res.status(400).json({ error: "Missing channelId" });
      return;
    }
    const userId = resolveUserId(req);
    const source = req.body.source || "app";
    if (source === "frontend" && !Object.prototype.hasOwnProperty.call(req.body, "expectedUpdatedAt")) {
      const existing = await store.loadBrief(userId, req.params.briefId);
      res.status(409).json({ error: "Conflict", updatedAt: existing?.updatedAt ?? null });
      return;
    }
    const result = await store.saveBrief(
      userId,
      { briefId: req.params.briefId, channelId, payload: req.body.value },
      source,
      req.body.expectedUpdatedAt,
    );
    if (result.conflict) {
      res.status(409).json({ error: "Conflict", updatedAt: result.updatedAt ?? null });
      return;
    }
    res.json({ ok: true, changed: result.changed, updatedAt: result.updatedAt });
  }),
);

app.delete(
  "/api/briefs/:briefId",
  asyncRoute(async (req, res) => {
    await store.deleteBrief(resolveUserId(req), req.params.briefId);
    res.status(204).end();
  }),
);

app.delete(
  "/api/briefs",
  asyncRoute(async (req, res) => {
    await store.clearBriefs(resolveUserId(req));
    res.status(204).end();
  }),
);

function decodeDataUrl(dataUrl) {
  const match = /^data:([^;,]+);base64,(.*)$/s.exec(dataUrl || "");
  if (!match) {
    return null;
  }
  return { mime: match[1], bytes: Buffer.from(match[2], "base64") };
}

app.post(
  "/api/assets",
  asyncRoute(async (req, res) => {
    let mime = "";
    let bytes = null;

    if (Buffer.isBuffer(req.body) && req.body.length) {
      mime = (req.headers["content-type"] || "").split(";")[0].trim();
      bytes = req.body;
    } else if (req.body && typeof req.body.dataUrl === "string") {
      const decoded = decodeDataUrl(req.body.dataUrl);
      if (!decoded) {
        res.status(400).json({ error: "Malformed data URL" });
        return;
      }
      mime = decoded.mime;
      bytes = decoded.bytes;
    }

    if (!bytes || !bytes.length) {
      res.status(400).json({ error: "Missing image bytes" });
      return;
    }
    const extension = MIME_EXTENSIONS[mime];
    if (!extension) {
      res.status(415).json({ error: `Unsupported image type: ${mime || "unknown"}` });
      return;
    }

    const userId = resolveUserId(req);
    const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");
    const existing = await store.findAssetBySha(userId, sha256);
    if (existing && (await objectStorage.exists(existing.storageKey))) {
      res.json({ ...existing, url: `/api/assets/${existing.assetId}` });
      return;
    }

    const storageKey = `u/${userId}/assets/${sha256}.${extension}`;
    await objectStorage.put(storageKey, bytes, mime);
    const asset = await store.createAsset(userId, {
      assetId: existing?.assetId || sha256.slice(0, 32),
      sha256,
      mime,
      byteSize: bytes.length,
      storageKey,
    });
    res.status(201).json({ ...asset, url: `/api/assets/${asset.assetId}` });
  }),
);

app.get(
  "/api/assets/:assetId",
  asyncRoute(async (req, res) => {
    const asset = await store.getAsset(resolveUserId(req), req.params.assetId);
    if (!asset) {
      res.status(404).json({ error: "Unknown asset" });
      return;
    }
    let stream;
    try {
      stream = await objectStorage.getStream(asset.storageKey);
    } catch (error) {
      if (error instanceof MissingObjectError) {
        // The row survived a restore that the bucket did not; report it instead of hanging the image.
        res.status(410).json({ error: "Asset bytes are missing from object storage", assetId: asset.assetId });
        return;
      }
      throw error;
    }
    res.setHeader("Content-Type", asset.mime);
    res.setHeader("Content-Length", String(asset.byteSize));
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    stream.pipe(res);
  }),
);

app.get(
  "/api/storage/:key",
  asyncRoute(async (req, res) => {
    const key = req.params.key;
    const userId = resolveUserId(req);
    if (key === "briefs") {
      const byChannel = await store.loadBriefsByChannel(userId);
      res.json({ key, value: { schemaVersion: 4, savedAt: Date.now(), byChannel }, updatedAt: null });
      return;
    }
    if (!DOCUMENT_KEYS.has(key)) {
      res.status(404).json({ error: "Unknown storage key" });
      return;
    }
    const document = await store.loadDocument(userId, key);
    res.json({
      key,
      value: document?.value ?? null,
      updatedAt: document?.updatedAt ?? null,
    });
  }),
);

app.put(
  "/api/storage/:key",
  asyncRoute(async (req, res) => {
    const key = req.params.key;
    const userId = resolveUserId(req);
    if (!("value" in req.body)) {
      res.status(400).json({ error: "Missing value" });
      return;
    }
    const source = req.body.source || "app";

    if (key === "briefs") {
      // Compatibility path for whole-blob writers (imports, older clients): fan the
      // blob out into per-brief rows instead of storing it as one document.
      const byChannel = req.body.value?.byChannel || {};
      let changed = 0;
      for (const [channelId, channelData] of Object.entries(byChannel)) {
        for (const brief of channelData?.briefs || []) {
          if (!brief?.id) {
            continue;
          }
          const result = await store.saveBrief(
            userId,
            { briefId: brief.id, channelId: brief.channelId || channelId, payload: brief },
            source,
          );
          changed += result.changed ? 1 : 0;
        }
      }
      res.json({ ok: true, changed: changed > 0, briefsWritten: changed, updatedAt: Date.now() });
      return;
    }

    if (!DOCUMENT_KEYS.has(key)) {
      res.status(404).json({ error: "Unknown storage key" });
      return;
    }
    if (source === "frontend" && !Object.prototype.hasOwnProperty.call(req.body, "expectedUpdatedAt")) {
      const existing = await store.loadDocument(userId, key);
      res.status(409).json({ error: "Conflict", updatedAt: existing?.updatedAt ?? null });
      return;
    }
    const result = await store.saveDocument(userId, key, req.body.value, source, req.body.expectedUpdatedAt);
    if (result.conflict) {
      res.status(409).json({ error: "Conflict", updatedAt: result.updatedAt ?? null });
      return;
    }
    res.json({ ok: true, changed: result.changed, updatedAt: result.updatedAt });
  }),
);

app.delete(
  "/api/storage/:key",
  asyncRoute(async (req, res) => {
    const key = req.params.key;
    const userId = resolveUserId(req);
    if (key === "briefs") {
      await store.clearBriefs(userId);
      res.status(204).end();
      return;
    }
    if (!DOCUMENT_KEYS.has(key)) {
      res.status(404).json({ error: "Unknown storage key" });
      return;
    }
    await store.clearDocument(userId, key);
    res.status(204).end();
  }),
);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Unknown API route" });
});

app.use((req, res, next) => {
  if (
    req.path.startsWith("/server/") ||
    req.path.startsWith("/data/") ||
    req.path.startsWith("/node_modules/") ||
    req.path.startsWith("/.git") ||
    req.path === "/package.json" ||
    req.path === "/package-lock.json"
  ) {
    res.status(404).end();
    return;
  }
  next();
});

app.use(
  express.static(rootDir, {
    index: false,
    etag: false,
    setHeaders(res, filePath) {
      if (/\.(html|js|css)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "no-store");
      }
    },
  }),
);

app.get("/", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(rootDir, "index.html"));
});

app.get("*", (req, res) => {
  if (path.extname(req.path)) {
    res.status(404).end();
    return;
  }
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(rootDir, "index.html"));
});

app.use((error, _req, res, _next) => {
  console.error("Request failed", error);
  if (res.headersSent) {
    res.end();
    return;
  }
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(port, host, () => {
  const displayHost = host === "0.0.0.0" || host === "::" ? "localhost" : host;
  console.log(`youtube-brief server running on http://${displayHost}:${port}`);
  console.log(`postgres: ${new URL(process.env.DATABASE_URL).host}`);
  console.log(`object storage: ${objectStorage.describe()}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    exitWithMessage([
      `Port ${port} is already in use, so the server did not start.`,
      "Another copy of this server is probably still running. Stop it, or start on a different port:",
      `  PORT=${port + 1} npm start`,
    ]);
  }
  if (error.code === "EACCES") {
    exitWithMessage([
      `Not allowed to bind port ${port}.`,
      "Ports below 1024 need elevated privileges; pick a higher port with PORT=<port> npm start.",
    ]);
  }
  throw error;
});
