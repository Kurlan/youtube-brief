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
  return items.some((item) => Boolean(toCleanText(item?.text) || toCleanText(item?.draftText) || toCleanText(item?.type)));
}

export function hasMeaningfulIntroGroupContent(group = {}) {
  if (!group || typeof group !== "object" || !Array.isArray(group.variants)) {
    return false;
  }
  return group.variants.some((variant) => {
    return hasMeaningfulLineContent(variant?.items) || hasMeaningfulLineContent(variant?.archivedItems);
  });
}

function mapLine(line, fallbackId) {
  return {
    id: toCleanText(line?.id) || fallbackId,
    slotId: toCleanText(line?.slotId) || toCleanText(line?.id) || fallbackId,
    text: toCleanText(line?.text),
    type: toCleanText(line?.type),
    draftText: toCleanText(line?.draftText) || toCleanText(line?.text),
    archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : "",
    originalIndex: Number.isInteger(line?.originalIndex) ? line.originalIndex : null,
    replacedById: toCleanText(line?.replacedById),
    createdAt: normalizeTimestamp(line?.createdAt),
    updatedAt: normalizeTimestamp(line?.updatedAt || line?.createdAt),
  };
}

export function createRecoveredIntroGroupFromLegacyIntros(intros = []) {
  const variants = Array.isArray(intros)
    ? intros.map((intro, index) => ({
        id: toCleanText(intro?.id) || `recovered-intro-${index + 1}`,
        title: toCleanText(intro?.label) || `Intro ${index + 1}`,
        kind: "intro",
        items: (Array.isArray(intro?.sentences) ? intro.sentences : []).map((line, lineIndex) =>
          mapLine(line, `recovered-line-${index + 1}-${lineIndex + 1}`),
        ),
        archivedItems: (Array.isArray(intro?.archivedSentences) ? intro.archivedSentences : []).map((line, lineIndex) => ({
          ...mapLine(line, `recovered-archived-line-${index + 1}-${lineIndex + 1}`),
          archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : normalizeTimestamp(line?.updatedAt),
        })),
        archivedExpanded: Boolean(intro?.archivedExpanded),
        createdAt: normalizeTimestamp(intro?.createdAt),
        updatedAt: normalizeTimestamp(intro?.updatedAt || intro?.createdAt),
      }))
    : [];

  return {
    id: "recovered-intro-group",
    title: "Intro Variants",
    variants,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function createLegacyIntrosFromIntroGroup(introGroup = {}) {
  const variants = Array.isArray(introGroup?.variants) ? introGroup.variants : [];
  return variants.map((variant, index) => ({
    id: toCleanText(variant?.id) || `mirrored-intro-${index + 1}`,
    label: toCleanText(variant?.title) || `Intro ${index + 1}`,
    title: toCleanText(variant?.title) || `Intro ${index + 1}`,
    kind: "intro",
    sentences: (Array.isArray(variant?.items) ? variant.items : []).map((line, lineIndex) => ({
      ...mapLine(line, `mirrored-line-${index + 1}-${lineIndex + 1}`),
      text: toCleanText(line?.text) || toCleanText(line?.draftText),
      notes: "",
    })),
    archivedSentences: (Array.isArray(variant?.archivedItems) ? variant.archivedItems : []).map((line, lineIndex) => ({
      ...mapLine(line, `mirrored-archived-line-${index + 1}-${lineIndex + 1}`),
      text: toCleanText(line?.text) || toCleanText(line?.draftText),
      notes: "",
      archivedAt: Number.isFinite(Number(line?.archivedAt)) ? Number(line.archivedAt) : normalizeTimestamp(line?.updatedAt),
    })),
    archivedExpanded: Boolean(variant?.archivedExpanded),
    createdAt: normalizeTimestamp(variant?.createdAt),
    updatedAt: normalizeTimestamp(variant?.updatedAt || variant?.createdAt),
  }));
}

/**
 * Keeps a brief's `script.introGroup` and legacy `script.intros` in sync. Ran on every boot
 * against the SQLite blob; now a one-off pass (`npm run repair:intro-shapes`) over brief rows.
 */
export function repairBriefIntroShape(brief) {
  if (!brief?.script || typeof brief.script !== "object") {
    return false;
  }

  let changed = false;
  if (!hasMeaningfulIntroGroupContent(brief.script.introGroup) && Array.isArray(brief.script.intros)) {
    const recovered = createRecoveredIntroGroupFromLegacyIntros(brief.script.intros);
    if (hasMeaningfulIntroGroupContent(recovered)) {
      brief.script.introGroup = recovered;
      changed = true;
    }
  }

  if (hasMeaningfulIntroGroupContent(brief.script.introGroup)) {
    const mirrored = createLegacyIntrosFromIntroGroup(brief.script.introGroup);
    const current = JSON.stringify(Array.isArray(brief.script.intros) ? brief.script.intros : []);
    if (current !== JSON.stringify(mirrored)) {
      brief.script.intros = mirrored;
      changed = true;
    }
  }

  return changed;
}
