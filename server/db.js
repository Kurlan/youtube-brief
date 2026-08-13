import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

export const STORAGE_KEYS = new Set(["workspace", "ideas", "briefs", "viewer"]);
export const DOCUMENT_KEYS = new Set(["workspace", "ideas", "viewer"]);
export const DEFAULT_USER_ID = "local";
const DEFAULT_REVISION_LIMIT = 50;

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => Number(value));

function hashPayload(payload) {
  return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

function normalizeExpected(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function conflictResult(updatedAt) {
  return { changed: false, conflict: true, updatedAt: updatedAt ?? null };
}

async function ensureMigrationsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at BIGINT NOT NULL
    )
  `);
}

async function runMigrations(pool, migrationsDir) {
  const client = await pool.connect();
  try {
    // Serializes concurrent boots so two instances cannot apply the same file.
    await client.query("SELECT pg_advisory_lock(hashtext('youtube-brief-migrations'))");
    await ensureMigrationsTable(client);
    const applied = new Set((await client.query("SELECT name FROM _migrations")).rows.map((row) => row.name));
    const files = fs
      .readdirSync(migrationsDir)
      .filter((name) => name.endsWith(".sql"))
      .sort((left, right) => left.localeCompare(right));

    for (const fileName of files) {
      if (applied.has(fileName)) {
        continue;
      }
      const sql = fs.readFileSync(path.join(migrationsDir, fileName), "utf8");
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO _migrations (name, applied_at) VALUES ($1, $2)", [fileName, Date.now()]);
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      }
    }
  } finally {
    await client.query("SELECT pg_advisory_unlock(hashtext('youtube-brief-migrations'))").catch(() => {});
    client.release();
  }
}

export async function createStore({ connectionString, migrationsDir, revisionLimit = DEFAULT_REVISION_LIMIT, poolMax = 5 }) {
  if (!connectionString) {
    throw new Error("DATABASE_URL is required.");
  }

  const pool = new pg.Pool({
    connectionString,
    max: poolMax,
    ssl: /sslmode=(require|verify-full)/.test(connectionString) ? { rejectUnauthorized: false } : undefined,
  });

  await runMigrations(pool, migrationsDir);

  async function withTransaction(handler) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await handler(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK").catch(() => {});
      throw error;
    } finally {
      client.release();
    }
  }

  async function ensureUser(userId, email = null) {
    await pool.query(
      `INSERT INTO users (id, email, created_at) VALUES ($1, $2, $3)
       ON CONFLICT (id) DO NOTHING`,
      [userId, email, Date.now()],
    );
    return userId;
  }

  async function pruneRevisions(client, table, column, userId, ownerId) {
    await client.query(
      `DELETE FROM ${table}
        WHERE user_id = $1 AND ${column} = $2
          AND id NOT IN (
            SELECT id FROM ${table}
              WHERE user_id = $1 AND ${column} = $2
              ORDER BY created_at DESC, id DESC
              LIMIT $3
          )`,
      [userId, ownerId, revisionLimit],
    );
  }

  return {
    ensureUser,

    async ping() {
      await pool.query("SELECT 1");
    },

    async loadDocument(userId, key) {
      const { rows } = await pool.query(
        "SELECT key, payload, created_at, updated_at FROM documents WHERE user_id = $1 AND key = $2",
        [userId, key],
      );
      const row = rows[0];
      if (!row) {
        return null;
      }
      return {
        key: row.key,
        value: row.payload,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    },

    async saveDocument(userId, key, payload, source = "app", expectedUpdatedAt) {
      const payloadHash = hashPayload(payload);
      return withTransaction(async (client) => {
        const { rows } = await client.query(
          "SELECT payload_hash, created_at, updated_at FROM documents WHERE user_id = $1 AND key = $2 FOR UPDATE",
          [userId, key],
        );
        const existing = rows[0] || null;

        if (typeof expectedUpdatedAt !== "undefined") {
          const expected = normalizeExpected(expectedUpdatedAt);
          const current = existing ? existing.updated_at : null;
          if (expected !== current) {
            return conflictResult(current);
          }
        }

        if (existing && existing.payload_hash === payloadHash) {
          return { changed: false, conflict: false, updatedAt: existing.updated_at };
        }

        const now = Date.now();
        await client.query(
          `INSERT INTO documents (user_id, key, payload, payload_hash, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (user_id, key) DO UPDATE SET
             payload = excluded.payload,
             payload_hash = excluded.payload_hash,
             updated_at = excluded.updated_at`,
          [userId, key, payload, payloadHash, existing?.created_at || now, now],
        );
        await client.query(
          `INSERT INTO document_revisions (user_id, document_key, payload, payload_hash, created_at, change_source)
             VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, key, payload, payloadHash, now, source],
        );
        await pruneRevisions(client, "document_revisions", "document_key", userId, key);
        return { changed: true, conflict: false, updatedAt: now };
      });
    },

    async clearDocument(userId, key) {
      await pool.query("DELETE FROM documents WHERE user_id = $1 AND key = $2", [userId, key]);
    },

    async listBriefs(userId) {
      const { rows } = await pool.query(
        `SELECT brief_id, channel_id, updated_at, created_at,
                payload -> 'values' ->> 'projectName' AS title
           FROM briefs WHERE user_id = $1 ORDER BY updated_at DESC`,
        [userId],
      );
      return rows.map((row) => ({
        briefId: row.brief_id,
        channelId: row.channel_id,
        title: row.title || "",
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    },

    async loadBrief(userId, briefId) {
      const { rows } = await pool.query(
        "SELECT brief_id, channel_id, payload, created_at, updated_at FROM briefs WHERE user_id = $1 AND brief_id = $2",
        [userId, briefId],
      );
      const row = rows[0];
      if (!row) {
        return null;
      }
      return {
        briefId: row.brief_id,
        channelId: row.channel_id,
        value: row.payload,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    },

    async loadBriefsByChannel(userId) {
      const { rows } = await pool.query(
        "SELECT brief_id, channel_id, payload, updated_at FROM briefs WHERE user_id = $1 ORDER BY updated_at DESC",
        [userId],
      );
      const byChannel = {};
      for (const row of rows) {
        if (!byChannel[row.channel_id]) {
          byChannel[row.channel_id] = { activeBriefId: "", briefs: [] };
        }
        byChannel[row.channel_id].briefs.push(row.payload);
      }
      return byChannel;
    },

    async saveBrief(userId, { briefId, channelId, payload }, source = "app", expectedUpdatedAt) {
      const payloadHash = hashPayload(payload);
      return withTransaction(async (client) => {
        const { rows } = await client.query(
          "SELECT payload_hash, created_at, updated_at FROM briefs WHERE user_id = $1 AND brief_id = $2 FOR UPDATE",
          [userId, briefId],
        );
        const existing = rows[0] || null;

        if (typeof expectedUpdatedAt !== "undefined") {
          const expected = normalizeExpected(expectedUpdatedAt);
          const current = existing ? existing.updated_at : null;
          if (expected !== current) {
            return conflictResult(current);
          }
        }

        if (existing && existing.payload_hash === payloadHash) {
          return { changed: false, conflict: false, updatedAt: existing.updated_at };
        }

        const now = Date.now();
        await client.query(
          `INSERT INTO briefs (user_id, brief_id, channel_id, payload, payload_hash, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (user_id, brief_id) DO UPDATE SET
             channel_id = excluded.channel_id,
             payload = excluded.payload,
             payload_hash = excluded.payload_hash,
             updated_at = excluded.updated_at`,
          [userId, briefId, channelId, payload, payloadHash, existing?.created_at || now, now],
        );
        await client.query(
          `INSERT INTO brief_revisions (user_id, brief_id, payload, payload_hash, created_at, change_source)
             VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, briefId, payload, payloadHash, now, source],
        );
        await pruneRevisions(client, "brief_revisions", "brief_id", userId, briefId);
        return { changed: true, conflict: false, updatedAt: now };
      });
    },

    async deleteBrief(userId, briefId) {
      await pool.query("DELETE FROM briefs WHERE user_id = $1 AND brief_id = $2", [userId, briefId]);
    },

    async clearBriefs(userId) {
      await pool.query("DELETE FROM briefs WHERE user_id = $1", [userId]);
    },

    async listBriefRevisions(userId, briefId) {
      const { rows } = await pool.query(
        `SELECT id, created_at, change_source FROM brief_revisions
           WHERE user_id = $1 AND brief_id = $2 ORDER BY created_at DESC, id DESC`,
        [userId, briefId],
      );
      return rows.map((row) => ({ id: row.id, createdAt: row.created_at, source: row.change_source }));
    },

    async findAssetBySha(userId, sha256) {
      const { rows } = await pool.query(
        "SELECT asset_id, sha256, mime, byte_size, storage_key FROM brief_assets WHERE user_id = $1 AND sha256 = $2",
        [userId, sha256],
      );
      return rows[0] ? mapAsset(rows[0]) : null;
    },

    async getAsset(userId, assetId) {
      const { rows } = await pool.query(
        "SELECT asset_id, sha256, mime, byte_size, storage_key FROM brief_assets WHERE user_id = $1 AND asset_id = $2",
        [userId, assetId],
      );
      return rows[0] ? mapAsset(rows[0]) : null;
    },

    async createAsset(userId, { assetId, sha256, mime, byteSize, storageKey }) {
      const { rows } = await pool.query(
        `INSERT INTO brief_assets (user_id, asset_id, sha256, mime, byte_size, storage_key, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (user_id, sha256) DO UPDATE SET sha256 = brief_assets.sha256
         RETURNING asset_id, sha256, mime, byte_size, storage_key`,
        [userId, assetId, sha256, mime, byteSize, storageKey, Date.now()],
      );
      return mapAsset(rows[0]);
    },

    async close() {
      await pool.end();
    },

    pool,
  };
}

function mapAsset(row) {
  return {
    assetId: row.asset_id,
    sha256: row.sha256,
    mime: row.mime,
    byteSize: row.byte_size,
    storageKey: row.storage_key,
  };
}
