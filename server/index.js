import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDocumentStore, STORAGE_KEYS } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const dbPath = process.env.DB_PATH || path.join(dataDir, "youtube-brief.sqlite");
const migrationsDir = path.join(__dirname, "migrations");
const store = createDocumentStore({ dbPath, migrationsDir });

const app = express();
const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json({ limit: "10mb" }));

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
  const result = store.save(key, req.body.value, req.body.source || "app");
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
  res.sendFile(path.join(rootDir, "index.html"));
});

app.get("*", (req, res) => {
  if (path.extname(req.path)) {
    res.status(404).end();
    return;
  }
  res.sendFile(path.join(rootDir, "index.html"));
});

app.listen(port, host, () => {
  console.log(`youtube-brief server running on http://${host}:${port}`);
  console.log(`sqlite database: ${dbPath}`);
});
