import path from "node:path";
import { fileURLToPath } from "node:url";
import { createStore, DEFAULT_USER_ID } from "../server/db.js";
import { repairBriefIntroShape } from "../server/intro-shape.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userId = process.argv[2] || DEFAULT_USER_ID;

const store = await createStore({
  connectionString: process.env.DATABASE_URL,
  migrationsDir: path.join(__dirname, "..", "server", "migrations"),
});

let repaired = 0;
for (const entry of await store.listBriefs(userId)) {
  const brief = await store.loadBrief(userId, entry.briefId);
  if (!brief || !repairBriefIntroShape(brief.value)) {
    continue;
  }
  await store.saveBrief(
    userId,
    { briefId: brief.briefId, channelId: brief.channelId, payload: brief.value },
    "repair:intro-shape-compatibility",
  );
  repaired += 1;
  console.log(`repaired ${brief.briefId}`);
}

console.log(`intro shape repair complete: ${repaired} brief(s) updated`);
await store.close();
