import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDocumentStore, STORAGE_KEYS } from "./db.js";
import { createPasswordGate } from "./auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const dbPath = process.env.DB_PATH || path.join(dataDir, "youtube-brief.sqlite");
const migrationsDir = path.join(__dirname, "migrations");

function exitWithMessage(lines) {
  for (const line of lines) {
    console.error(line);
  }
  process.exit(1);
}

let store;
try {
  store = createDocumentStore({ dbPath, migrationsDir });
} catch (error) {
  if (error?.code === "MODULE_NOT_FOUND" || error?.code === "ERR_DLOPEN_FAILED") {
    exitWithMessage([
      "Failed to load the SQLite driver.",
      "Run `npm install` (or `npm ci`) with a supported Node version, then try again.",
      String(error.message),
    ]);
  }
  exitWithMessage([
    `Failed to open the SQLite database at ${dbPath}.`,
    "Check that the path is writable, or point DB_PATH somewhere else.",
    String(error?.message ?? error),
  ]);
}

const app = express();
const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || "0.0.0.0";
const appPassword = process.env.APP_PASSWORD || "";

app.set("trust proxy", true);
app.use(express.json({ limit: "10mb" }));

if (appPassword) {
  createPasswordGate({ password: appPassword, secure: process.env.NODE_ENV === "production" }).register(app);
} else {
  console.warn("APP_PASSWORD is not set; the app is served without any access control.");
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    storage: "sqlite",
    keys: Array.from(STORAGE_KEYS),
  });
});

app.get("/api/storage/:key", (req, res) => {
  const key = req.params.key;
  if (!STORAGE_KEYS.has(key)) {
    res.status(404).json({ error: "Unknown storage key" });
    return;
  }
  const document = store.load(key);
  res.json({
    key,
    value: document?.value ?? null,
    updatedAt: document?.updatedAt ?? null,
  });
});

app.put("/api/storage/:key", (req, res) => {
  const key = req.params.key;
  if (!STORAGE_KEYS.has(key)) {
    res.status(404).json({ error: "Unknown storage key" });
    return;
  }
  if (!("value" in req.body)) {
    res.status(400).json({ error: "Missing value" });
    return;
  }
  if ((req.body.source || "app") === "frontend" && !Object.prototype.hasOwnProperty.call(req.body, "expectedUpdatedAt")) {
    res.status(409).json({
      error: "Conflict",
      updatedAt: store.load(key)?.updatedAt ?? null,
    });
    return;
  }
  const result = store.save(key, req.body.value, req.body.source || "app", req.body.expectedUpdatedAt);
  if (result.conflict) {
    res.status(409).json({
      error: "Conflict",
      updatedAt: result.updatedAt ?? null,
    });
    return;
  }
  res.json({
    ok: true,
    changed: result.changed,
    updatedAt: result.updatedAt,
  });
});

app.delete("/api/storage/:key", (req, res) => {
  const key = req.params.key;
  if (!STORAGE_KEYS.has(key)) {
    res.status(404).json({ error: "Unknown storage key" });
    return;
  }
  store.clear(key);
  res.status(204).end();
});

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

const server = app.listen(port, host, () => {
  const displayHost = host === "0.0.0.0" || host === "::" ? "localhost" : host;
  console.log(`youtube-brief server running on http://${displayHost}:${port}`);
  console.log(`sqlite database: ${dbPath}`);
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
