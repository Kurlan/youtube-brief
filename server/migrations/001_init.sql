CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS documents (
  user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  payload JSONB NOT NULL,
  payload_hash TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (user_id, key)
);

CREATE TABLE IF NOT EXISTS document_revisions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  document_key TEXT NOT NULL,
  payload JSONB NOT NULL,
  payload_hash TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  change_source TEXT NOT NULL DEFAULT 'app',
  FOREIGN KEY (user_id, document_key) REFERENCES documents (user_id, key) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_document_revisions_key_created
  ON document_revisions (user_id, document_key, created_at DESC);

CREATE TABLE IF NOT EXISTS briefs (
  user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  brief_id TEXT NOT NULL,
  channel_id TEXT NOT NULL,
  payload JSONB NOT NULL,
  payload_hash TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (user_id, brief_id)
);

CREATE INDEX IF NOT EXISTS idx_briefs_channel
  ON briefs (user_id, channel_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS brief_revisions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  brief_id TEXT NOT NULL,
  payload JSONB NOT NULL,
  payload_hash TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  change_source TEXT NOT NULL DEFAULT 'app',
  FOREIGN KEY (user_id, brief_id) REFERENCES briefs (user_id, brief_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_brief_revisions_brief_created
  ON brief_revisions (user_id, brief_id, created_at DESC);

CREATE TABLE IF NOT EXISTS brief_assets (
  user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  asset_id TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  mime TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  storage_key TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (user_id, asset_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_brief_assets_sha256
  ON brief_assets (user_id, sha256);
