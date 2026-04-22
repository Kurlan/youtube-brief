import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export const STORAGE_KEYS = new Set(["workspace", "ideas", "briefs", "viewer"]);

function toCleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTimestamp(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : Date.now();
}

function hasMeaningfulLineContent(items = []) {
  if (!Array.isArray(items)) {
    return false;
  }
  return items.some((item) => {
    return Boolean(toCleanText(item?.text) || toCleanText(item?.draftText) || toCleanText(item?.type));
  });
}

function hasMeaningfulIntroGroupContent(group = {}) {
  if (!group || typeof group !== "object" || !Array.isArray(group.variants)) {
    return false;
  }
  return group.variants.some((variant) => {
    return hasMeaningfulLineContent(variant?.items) || hasMeaningfulLineContent(variant?.archivedItems);
  });
}

function createRecoveredIntroGroupFromLegacyIntros(intros = []) {
  const variants = Array.isArray(intros)
    ? intros.map((intro, index) => {
        const lines = Array.isArray(intro?.sentences) ? intro.sentences : [];
        const archivedLines = Array.isArray(intro?.archivedSentences) ? intro.archivedSentences : [];
        return {
          id: toCleanText(intro?.id) || `recovered-intro-${index + 1}`,
          title: toCleanText(intro?.label) || `Intro ${index + 1}`,
          kind: "intro",
          items: lines.map((line, lineIndex) => ({
            id: toCleanText(line?.id) || `recovered-line-${index + 1}-${lineIndex + 1}`,
            slotId: toCleanText(line?.slotId) || toCleanText(line?.id) || `recovered-line-${index + 1}-${lineIndex + 1}`,
            text: toCleanText(line?.text),
            type: toCleanText(line?.type),
            draftText: toCleanText(line?.draftText) || toCleanText(line?.text),
            archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : "",
            originalIndex: Number.isInteger(line?.originalIndex) ? line.originalIndex : null,
            replacedById: toCleanText(line?.replacedById),
            createdAt: normalizeTimestamp(line?.createdAt),
            updatedAt: normalizeTimestamp(line?.updatedAt || line?.createdAt),
          })),
          archivedItems: archivedLines.map((line, lineIndex) => ({
            id: toCleanText(line?.id) || `recovered-archived-line-${index + 1}-${lineIndex + 1}`,
            slotId:
              toCleanText(line?.slotId) || toCleanText(line?.id) || `recovered-archived-line-${index + 1}-${lineIndex + 1}`,
            text: toCleanText(line?.text),
            type: toCleanText(line?.type),
            draftText: toCleanText(line?.draftText) || toCleanText(line?.text),
            archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : normalizeTimestamp(line?.updatedAt),
            originalIndex: Number.isInteger(line?.originalIndex) ? line.originalIndex : null,
            replacedById: toCleanText(line?.replacedById),
            createdAt: normalizeTimestamp(line?.createdAt),
            updatedAt: normalizeTimestamp(line?.updatedAt || line?.createdAt),
          })),
          archivedExpanded: Boolean(intro?.archivedExpanded),
          createdAt: normalizeTimestamp(intro?.createdAt),
          updatedAt: normalizeTimestamp(intro?.updatedAt || intro?.createdAt),
        };
      })
    : [];

  return {
    id: "recovered-intro-group",
    title: "Intro Variants",
    variants,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function createLegacyIntrosFromIntroGroup(introGroup = {}) {
  const variants = Array.isArray(introGroup?.variants) ? introGroup.variants : [];
  return variants.map((variant, index) => ({
    id: toCleanText(variant?.id) || `mirrored-intro-${index + 1}`,
    label: toCleanText(variant?.title) || `Intro ${index + 1}`,
    title: toCleanText(variant?.title) || `Intro ${index + 1}`,
    kind: "intro",
    sentences: Array.isArray(variant?.items)
      ? variant.items.map((line, lineIndex) => ({
          id: toCleanText(line?.id) || `mirrored-line-${index + 1}-${lineIndex + 1}`,
          slotId: toCleanText(line?.slotId) || toCleanText(line?.id) || `mirrored-line-${index + 1}-${lineIndex + 1}`,
          type: toCleanText(line?.type),
          text: toCleanText(line?.text) || toCleanText(line?.draftText),
          draftText: toCleanText(line?.draftText) || toCleanText(line?.text),
          notes: "",
          archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : "",
          originalIndex: Number.isInteger(line?.originalIndex) ? line.originalIndex : null,
          replacedById: toCleanText(line?.replacedById),
          createdAt: normalizeTimestamp(line?.createdAt),
          updatedAt: normalizeTimestamp(line?.updatedAt || line?.createdAt),
        }))
      : [],
    archivedSentences: Array.isArray(variant?.archivedItems)
      ? variant.archivedItems.map((line, lineIndex) => ({
          id: toCleanText(line?.id) || `mirrored-archived-line-${index + 1}-${lineIndex + 1}`,
          slotId:
            toCleanText(line?.slotId) || toCleanText(line?.id) || `mirrored-archived-line-${index + 1}-${lineIndex + 1}`,
          type: toCleanText(line?.type),
          text: toCleanText(line?.text) || toCleanText(line?.draftText),
          draftText: toCleanText(line?.draftText) || toCleanText(line?.text),
          notes: "",
          archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : normalizeTimestamp(line?.updatedAt),
          originalIndex: Number.isInteger(line?.originalIndex) ? line.originalIndex : null,
          replacedById: toCleanText(line?.replacedById),
          createdAt: normalizeTimestamp(line?.createdAt),
          updatedAt: normalizeTimestamp(line?.updatedAt || line?.createdAt),
        }))
      : [],
    archivedExpanded: Boolean(variant?.archivedExpanded),
    createdAt: normalizeTimestamp(variant?.createdAt),
    updatedAt: normalizeTimestamp(variant?.updatedAt || variant?.createdAt),
  }));
}

function getRecoveredIntroGroupFromRevisionBrief(brief = {}) {
  const script = brief?.script;
  if (!script || typeof script !== "object") {
    return null;
  }
  if (hasMeaningfulIntroGroupContent(script.introGroup)) {
    return script.introGroup;
  }
  if (Array.isArray(script.intros)) {
    const recovered = createRecoveredIntroGroupFromLegacyIntros(script.intros);
    if (hasMeaningfulIntroGroupContent(recovered)) {
      return recovered;
    }
  }
  return null;
}

function repairBlankIntroGroupsFromRevisions(db, getStatement, saveTransaction) {
  const current = getStatement.get("briefs");
  if (!current?.payload_json) {
    return;
  }

  const payload = JSON.parse(current.payload_json);
  if (!payload?.byChannel || typeof payload.byChannel !== "object") {
    return;
  }

  const briefsNeedingRepair = [];
  Object.entries(payload.byChannel).forEach(([channelId, channelData]) => {
    (channelData?.briefs || []).forEach((brief, briefIndex) => {
      const introGroup = brief?.script?.introGroup;
      if (!hasMeaningfulIntroGroupContent(introGroup)) {
        briefsNeedingRepair.push({
          channelId,
          briefId: brief?.id,
          briefIndex,
        });
      }
    });
  });

  if (!briefsNeedingRepair.length) {
    return;
  }

  const repairsByBriefId = new Map();
  const revisions = db
    .prepare(
      "SELECT payload_json FROM document_revisions WHERE document_key = 'briefs' ORDER BY created_at DESC, id DESC",
    )
    .iterate();

  for (const row of revisions) {
    const revisionPayload = JSON.parse(row.payload_json);
    for (const target of briefsNeedingRepair) {
      if (repairsByBriefId.has(target.briefId)) {
        continue;
      }
      const revisionBriefs = revisionPayload?.byChannel?.[target.channelId]?.briefs;
      if (!Array.isArray(revisionBriefs)) {
        continue;
      }
      const revisionBrief = revisionBriefs.find((brief) => brief?.id === target.briefId);
      if (!revisionBrief) {
        continue;
      }
      const recoveredIntroGroup = getRecoveredIntroGroupFromRevisionBrief(revisionBrief);
      if (recoveredIntroGroup) {
        repairsByBriefId.set(target.briefId, recoveredIntroGroup);
      }
    }
    if (repairsByBriefId.size === briefsNeedingRepair.length) {
      break;
    }
  }

  if (!repairsByBriefId.size) {
    return;
  }

  let repairedCount = 0;
  briefsNeedingRepair.forEach(({ channelId, briefIndex, briefId }) => {
    const recoveredIntroGroup = repairsByBriefId.get(briefId);
    if (!recoveredIntroGroup) {
      return;
    }
    const brief = payload.byChannel[channelId]?.briefs?.[briefIndex];
    if (!brief?.script || typeof brief.script !== "object") {
      return;
    }
    brief.script.introGroup = recoveredIntroGroup;
    brief.script.intros = createLegacyIntrosFromIntroGroup(recoveredIntroGroup);
    repairedCount += 1;
  });

  if (repairedCount > 0) {
    saveTransaction("briefs", payload, "repair:recover-blank-intro-groups");
  }
}

function repairIntroShapeCompatibility(getStatement, saveTransaction) {
  const current = getStatement.get("briefs");
  if (!current?.payload_json) {
    return;
  }

  const payload = JSON.parse(current.payload_json);
  if (!payload?.byChannel || typeof payload.byChannel !== "object") {
    return;
  }

  let changed = false;
  Object.values(payload.byChannel).forEach((channelData) => {
    (channelData?.briefs || []).forEach((brief) => {
      if (!brief?.script || typeof brief.script !== "object") {
        return;
      }

      if (!hasMeaningfulIntroGroupContent(brief.script.introGroup) && Array.isArray(brief.script.intros)) {
        const recoveredGroup = createRecoveredIntroGroupFromLegacyIntros(brief.script.intros);
        if (hasMeaningfulIntroGroupContent(recoveredGroup)) {
          brief.script.introGroup = recoveredGroup;
          changed = true;
        }
      }

      if (hasMeaningfulIntroGroupContent(brief.script.introGroup)) {
        const mirroredIntros = createLegacyIntrosFromIntroGroup(brief.script.introGroup);
        const currentIntrosJson = JSON.stringify(Array.isArray(brief.script.intros) ? brief.script.intros : []);
        const mirroredIntrosJson = JSON.stringify(mirroredIntros);
        if (currentIntrosJson !== mirroredIntrosJson) {
          brief.script.intros = mirroredIntros;
          changed = true;
        }
      }
    });
  });

  if (changed) {
    saveTransaction("briefs", payload, "repair:intro-shape-compatibility");
  }
}

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

  const saveTransaction = db.transaction((key, payload, source = "app", expectedUpdatedAt) => {
    const now = Date.now();
    const payloadJson = JSON.stringify(payload);
    const existing = getStatement.get(key);
    const normalizedExpected =
      Number.isFinite(Number(expectedUpdatedAt)) && Number(expectedUpdatedAt) > 0 ? Number(expectedUpdatedAt) : null;

    if (typeof expectedUpdatedAt !== "undefined") {
      const currentUpdatedAt =
        Number.isFinite(Number(existing?.updated_at)) && Number(existing?.updated_at) > 0 ? Number(existing.updated_at) : null;
      const expectedMatches =
        (normalizedExpected === null && currentUpdatedAt === null) ||
        (normalizedExpected !== null && currentUpdatedAt !== null && normalizedExpected === currentUpdatedAt);

      if (!expectedMatches) {
        return {
          changed: false,
          conflict: true,
          updatedAt: currentUpdatedAt,
        };
      }
    }

    if (existing && existing.payload_json === payloadJson) {
      return {
        changed: false,
        conflict: false,
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
      conflict: false,
      updatedAt: now,
    };
  });

  repairBlankIntroGroupsFromRevisions(db, getStatement, saveTransaction);
  repairIntroShapeCompatibility(getStatement, saveTransaction);

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
    save(key, payload, source = "app", expectedUpdatedAt) {
      if (!STORAGE_KEYS.has(key)) {
        throw new Error(`Unsupported storage key: ${key}`);
      }
      return saveTransaction(key, payload, source, expectedUpdatedAt);
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
