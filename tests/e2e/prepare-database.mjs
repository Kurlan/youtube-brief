import pg from "pg";

// The suite writes real rows, so it runs against its own database rather than the
// one used for local development. The server applies migrations on startup.
const url = new URL(process.env.DATABASE_URL);
const databaseName = decodeURIComponent(url.pathname.replace(/^\//, ""));
const adminUrl = new URL(url);
adminUrl.pathname = "/postgres";

const client = new pg.Client({ connectionString: adminUrl.toString() });
try {
  await client.connect();
} catch (error) {
  console.error(`Cannot reach PostgreSQL at ${url.host}. Start it with \`docker compose up -d db\`.`);
  console.error(error.message);
  process.exit(1);
}

try {
  const existing = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [databaseName]);
  if (!existing.rowCount) {
    await client.query(`CREATE DATABASE "${databaseName.replace(/"/g, '""')}"`);
    console.log(`Created test database ${databaseName}`);
  }
} finally {
  await client.end();
}
