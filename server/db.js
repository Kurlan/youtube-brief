import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export const STORAGE_KEYS = new Set(["workspace", "ideas", "briefs", "viewer"]);

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function ensureMigrationsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at INTEGER NOT NULL
    );
  `);
}

function runMigrations(db, migrationsDir) {
  ensureMigrationsTable(db);
  const applied = new Set(db.prepare("SELECT name FROM _migrations").all().map((row) => row.name));
  const files = fs
    .readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort((left, right) => left.localeCompare(right));

  for (const fileName of files) {
    if (applied.has(fileName)) {
      continue;
    }
    const sql = fs.readFileSync(path.join(migrationsDir, fileName), "utf8");
    const applyMigration = db.transaction(() => {
      db.exec(sql);
      db.prepare("INSERT INTO _migrations (name, applied_at) VALUES (?, ?)").run(fileName, Date.now());
    });
    applyMigration();
  }
}

export function createDocumentStore({ dbPath, migrationsDir }) {
  ensureDir(path.dirname(dbPath));
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  runMigrations(db, migrationsDir);

  const getStatement = db.prepare("SELECT key, payload_json, created_at, updated_at FROM documents WHERE key = ?");
  const putStatement = db.prepare(`
    INSERT INTO documents (key, payload_json, created_at, updated_at)
    VALUES (@key, @payloadJson, @createdAt, @updatedAt)
    ON CONFLICT(key) DO UPDATE SET
      payload_json = excluded.payload_json,
      updated_at = excluded.updated_at
  `);
  const revisionStatement = db.prepare(`
    INSERT INTO document_revisions (document_key, payload_json, created_at, change_source)
    VALUES (@documentKey, @payloadJson, @createdAt, @changeSource)
  `);
  const deleteStatement = db.prepare("DELETE FROM documents WHERE key = ?");

  const saveTransaction = db.transaction((key, payload, source = "app") => {
    const now = Date.now();
    const payloadJson = JSON.stringify(payload);
    const existing = getStatement.get(key);
    if (existing && existing.payload_json === payloadJson) {
      return {
        changed: false,
        updatedAt: existing.updated_at,
      };
    }
    putStatement.run({
      key,
      payloadJson,
      createdAt: existing?.created_at || now,
      updatedAt: now,
    });
    revisionStatement.run({
      documentKey: key,
      payloadJson,
      createdAt: now,
      changeSource: source,
    });
    return {
      changed: true,
      updatedAt: now,
    };
  });

  return {
    load(key) {
      if (!STORAGE_KEYS.has(key)) {
        return null;
      }
      const row = getStatement.get(key);
      if (!row) {
        return null;
      }
      return {
        key: row.key,
        value: JSON.parse(row.payload_json),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    },
    save(key, payload, source = "app") {
      if (!STORAGE_KEYS.has(key)) {
        throw new Error(`Unsupported storage key: ${key}`);
      }
      return saveTransaction(key, payload, source);
    },
    clear(key) {
      if (!STORAGE_KEYS.has(key)) {
        throw new Error(`Unsupported storage key: ${key}`);
      }
      deleteStatement.run(key);
    },
    db,
  };
}
