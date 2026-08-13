/**
 * Imports the latest state of a legacy SQLite deployment into PostgreSQL.
 *
 * Revision history is deliberately not copied: the legacy `document_revisions`
 * table stored a full copy of the whole briefs blob on every save, which is what
 * made those files tens of gigabytes.
 *
 * Usage:
 *   node scripts/import-legacy-data.mjs --dump documents.sql [--dry-run] [--force]
 *   node scripts/import-legacy-data.mjs --sqlite data/youtube-brief.sqlite
 *
 * Inline `data:` image URIs are uploaded to object storage and replaced with
 * `/api/assets/<id>` references, matching what the running app writes.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { createStore, DEFAULT_USER_ID, DOCUMENT_KEYS } from "../server/db.js";
import { createObjectStorage } from "../server/object-storage.js";
import { repairBriefIntroShape } from "../server/intro-shape.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const MIME_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

const IMPORT_SOURCE = "import:legacy-sqlite";

function parseArgs(argv) {
  const options = { dump: "", sqlite: "", dryRun: false, force: false, userId: DEFAULT_USER_ID };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--dump" || arg === "--sqlite" || arg === "--user") {
      const value = argv[index + 1];
      if (!value) {
        throw new Error(`${arg} requires a value`);
      }
      index += 1;
      if (arg === "--dump") options.dump = value;
      if (arg === "--sqlite") options.sqlite = value;
      if (arg === "--user") options.userId = value;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!options.dump === !options.sqlite) {
    throw new Error("Pass exactly one of --dump <documents.sql> or --sqlite <file.sqlite>");
  }

  return options;
}

function readLegacyDocuments({ dump, sqlite }) {
  const db = sqlite ? new Database(sqlite, { readonly: true }) : new Database(":memory:");

  try {
    if (dump) {
      db.exec(fs.readFileSync(dump, "utf8"));
    }

    const rows = db.prepare("SELECT key, payload_json, created_at, updated_at FROM documents").all();
    return new Map(rows.map((row) => [row.key, row]));
  } finally {
    db.close();
  }
}

function decodeDataUrl(value) {
  const match = /^data:([^;,]+);base64,(.*)$/s.exec(value || "");
  if (!match) {
    return null;
  }
  return { mime: match[1], bytes: Buffer.from(match[2], "base64") };
}

/**
 * Walks a parsed brief and replaces every inline `data:` image with an asset
 * reference, uploading bytes that are not in object storage yet.
 */
async function externalizeImages(value, context) {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      value[index] = await externalizeImages(value[index], context);
    }
    return value;
  }

  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = await externalizeImages(value[key], context);
    }
    return value;
  }

  if (typeof value !== "string" || !value.startsWith("data:")) {
    return value;
  }

  const decoded = decodeDataUrl(value);
  const extension = decoded && MIME_EXTENSIONS[decoded.mime];
  if (!decoded || !extension) {
    context.skippedImages += 1;
    return value;
  }

  const sha256 = crypto.createHash("sha256").update(decoded.bytes).digest("hex");
  const cached = context.assetsBySha.get(sha256);
  if (cached) {
    context.dedupedImages += 1;
    return `/api/assets/${cached}`;
  }

  const existing = await context.store.findAssetBySha(context.userId, sha256);
  if (existing && (await context.objectStorage.exists(existing.storageKey))) {
    context.assetsBySha.set(sha256, existing.assetId);
    context.dedupedImages += 1;
    return `/api/assets/${existing.assetId}`;
  }

  const assetId = existing?.assetId || sha256.slice(0, 32);
  const storageKey = `u/${context.userId}/assets/${sha256}.${extension}`;

  if (!context.dryRun) {
    await context.objectStorage.put(storageKey, decoded.bytes, decoded.mime);
    if (!existing) {
      await context.store.createAsset(context.userId, {
        assetId,
        sha256,
        mime: decoded.mime,
        byteSize: decoded.bytes.length,
        storageKey,
      });
    }
  }

  context.assetsBySha.set(sha256, assetId);
  context.importedImages += 1;
  context.importedImageBytes += decoded.bytes.length;
  return `/api/assets/${assetId}`;
}

async function importBriefs(payload, context) {
  const byChannel = payload?.byChannel || {};
  let count = 0;

  for (const [channelId, channelData] of Object.entries(byChannel)) {
    for (const brief of channelData?.briefs || []) {
      if (!brief?.id) {
        continue;
      }

      repairBriefIntroShape(brief);
      const externalized = await externalizeImages(brief, context);

      if (!context.dryRun) {
        await context.store.saveBrief(
          context.userId,
          {
            briefId: externalized.id,
            channelId: externalized.channelId || channelId,
            payload: externalized,
          },
          IMPORT_SOURCE,
        );
      }

      count += 1;
    }
  }

  return count;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const documents = readLegacyDocuments(options);

  if (!documents.size) {
    throw new Error("No rows found in the legacy `documents` table");
  }

  const store = await createStore({
    connectionString: process.env.DATABASE_URL,
    migrationsDir: path.join(rootDir, "server", "migrations"),
  });

  try {
    await store.ensureUser(options.userId);

    const existingBriefs = await store.listBriefs(options.userId);
    if (existingBriefs.length && !options.force && !options.dryRun) {
      throw new Error(
        `Target already holds ${existingBriefs.length} brief(s) for user ${options.userId}. ` +
          "Re-run with --force to import on top of them.",
      );
    }

    const context = {
      store,
      objectStorage: createObjectStorage({
        bucket: process.env.BUCKET_NAME,
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT_URL_S3,
        localDir: path.join(rootDir, "data", "assets"),
      }),
      userId: options.userId,
      dryRun: options.dryRun,
      assetsBySha: new Map(),
      importedImages: 0,
      importedImageBytes: 0,
      dedupedImages: 0,
      skippedImages: 0,
    };

    let briefCount = 0;

    for (const [key, row] of documents) {
      const payload = JSON.parse(row.payload_json);

      if (key === "briefs") {
        briefCount = await importBriefs(payload, context);
        continue;
      }

      if (!DOCUMENT_KEYS.has(key)) {
        console.warn(`skipping unknown document key: ${key}`);
        continue;
      }

      if (!options.dryRun) {
        await store.saveDocument(options.userId, key, payload, IMPORT_SOURCE);
      }
    }

    const documentKeys = [...documents.keys()].filter((key) => DOCUMENT_KEYS.has(key));
    console.log(`${options.dryRun ? "would import" : "imported"} as user ${options.userId}:`);
    console.log(`  documents: ${documentKeys.join(", ") || "(none)"}`);
    console.log(`  briefs:    ${briefCount}`);
    console.log(
      `  images:    ${context.importedImages} uploaded (${context.importedImageBytes} bytes), ` +
        `${context.dedupedImages} deduped, ${context.skippedImages} left inline`,
    );
  } finally {
    await store.close();
  }
}

await main();
