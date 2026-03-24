CREATE TABLE IF NOT EXISTS documents (
  key TEXT PRIMARY KEY,
  payload_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS document_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_key TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  change_source TEXT NOT NULL DEFAULT 'app',
  FOREIGN KEY (document_key) REFERENCES documents(key) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_document_revisions_key_created
  ON document_revisions (document_key, created_at DESC);
