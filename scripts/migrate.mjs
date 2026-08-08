import path from "node:path";
import { fileURLToPath } from "node:url";
import { createStore, DEFAULT_USER_ID } from "../server/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const store = await createStore({
  connectionString: process.env.DATABASE_URL,
  migrationsDir: path.join(__dirname, "..", "server", "migrations"),
});
await store.ensureUser(DEFAULT_USER_ID);
console.log("migrations applied");
await store.close();
