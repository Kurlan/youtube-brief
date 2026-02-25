const STORAGE_KEY = "yt-brief-studio-v6";
const LEGACY_STORAGE_KEYS = [
  "yt-brief-studio-v5",
  "yt-brief-studio-v4",
  "yt-brief-studio-v3",
  "yt-brief-studio-v2",
  "yt-brief-studio-v1",
];
const LOCAL_DB_NAME = "yt-brief-studio-local";
const LOCAL_DB_VERSION = 1;
const LOCAL_DB_STORE = "kv";
const LOCAL_DB_KEY_WORKSPACE = "workspace";
const LOCAL_DB_KEY_IDEAS = "ideas";
const LOCAL_DB_KEY_BRIEFS = "briefs";
const LOCAL_DB_KEY_VIEWER = "viewer";
const SAVE_DEBOUNCE_MS = 180;
const DEFAULT_OWNER_NAME = "Steve Huynh";
const IDEA_STATUSES = ["green", "yellow", "red"];
const STEP1_SORT_OPTIONS = ["newest", "oldest", "title-asc", "title-desc", "name-asc"];
const PAGE_OPTIONS = ["home", "channel"];
const DEFAULT_CHANNEL_ID = "channel-alifeengineered";
const DEFAULT_ACCOUNT_ID = "acct-steve-huynh";
const CHANNEL_MEMBER_ROLES = ["owner", "editor", "viewer"];

const VIEWER_STRATEGY = {
  channel: "@ALifeEngineered",
  niche: "Tech professionals who care about career growth, leverage, and long-term performance.",
  ageRange: "25-45",
  mainCountries: "US, Canada, UK, India",
  similarChannels: "The Prime Time, Tina Huang, Asian Dad Energy, Joma Tech",
  tamEstimate: "2,000,000 estimated views/video TAM ceiling for well-packaged ideas.",
  tamCurrent: "49,761 average views across the last 14 long-form videos.",
  tamShare: "2.4% of current TAM ceiling.",
  audience:
    "Tech workers making good money who value competence, structure, and practical systems over hype.",
  avatar:
    "Clever, ambitious, analytical tech professional who has strong potential but wants clearer execution systems.",
  cluster:
    "Career-focused tech and analytical self-improvement channels with high overlap in systems-driven viewer intent.",
  personality:
    "They were usually good at school or at least good at figuring things out. They like rabbit-holing on ideas and mastering tools.",
  humorStyle:
    "Dry, sharp, understated humor. They like clever references, deadpan contrast, and intelligent internet-native wit.",
  antiPatterns:
    "Loud, performative, shallow, or fake-expert energy. They disengage from low-signal motivational noise.",
  unlockNeed:
    "They want a clear unlock: one principle plus one practical lever they can immediately run with.",
  rabbitHoles:
    "Competence breakdowns, system teardowns, efficient workflows, and high-agency execution maps.",
  primaryPain: "high capability but inconsistent results because their personal operating system is fragmented",
  desiredOutcome: "reliable, compounding progress through clear systems and better decisions",
  strategyPage: "viewer-strategy.html",
};

const ACCELERATOR_PLAYBOOK = {
  ideaFunnel: "0 > 100+ > 20 > 5 (strategy, brainstorm, filter, select)",
  sourceMix: "40% Internal / 40% External / 20% Innovation",
  ccn: "Core + Casual + New all need to be served for growth.",
  packagingStages: "Stop Scroll > Create Interest > Get Click",
  titleRules:
    "Keep titles short (<70 chars, ideally <50), universal language, thumbnail-complementary, readable at a glance.",
  thumbRules:
    "Use simplicity, contrast, <=5 words text if used, 3-element hierarchy, and concept > sketch > test > refine.",
  algorithmFrame:
    "Serve audience, not algorithm. Optimize for CTR, AVD, and satisfaction across intended traffic source.",
};

const fieldIds = [
  "projectName",
  "ideaFocus",
  "painPoint",
  "desiredOutcome",
  "intrigueTrigger",
  "curiosityGap",
  "uniquenessEdge",
  "treatment",
  "treatmentReferences",
  "logline",
  "ideaSource",
  "targetTrafficSource",
  "uploadStrategy",
  "ccnCore",
  "ccnCasual",
  "ccnNew",
];

const refs = {
  showHomePageBtn: document.getElementById("showHomePageBtn"),
  showChannelPageBtn: document.getElementById("showChannelPageBtn"),
  workspaceViewSwitch: document.getElementById("workspaceViewSwitch"),
  activeChannelLabel: document.getElementById("activeChannelLabel"),
  showIdeationViewBtn: document.getElementById("showIdeationViewBtn"),
  showBriefViewBtn: document.getElementById("showBriefViewBtn"),
  briefGateStatus: document.getElementById("briefGateStatus"),
  channelHomeBoard: document.getElementById("channelHomeBoard"),
  channelCardTemplate: document.getElementById("channelCardTemplate"),
  jumpToIdeationBtn: document.getElementById("jumpToIdeationBtn"),
  prevStepViewBtn: document.getElementById("prevStepViewBtn"),
  nextStepViewBtn: document.getElementById("nextStepViewBtn"),
  ideationStepViewLabel: document.getElementById("ideationStepViewLabel"),
  step1Board: document.getElementById("step1Board"),
  step2Board: document.getElementById("step2Board"),
  step3Board: document.getElementById("step3Board"),
  step1Count: document.getElementById("step1Count"),
  step1ResultCount: document.getElementById("step1ResultCount"),
  step2Count: document.getElementById("step2Count"),
  step3Count: document.getElementById("step3Count"),
  step1FastIdea: document.getElementById("step1FastIdea"),
  addStep1FastBtn: document.getElementById("addStep1FastBtn"),
  step1QuickName: document.getElementById("step1QuickName"),
  step1QuickIdea: document.getElementById("step1QuickIdea"),
  step1QuickSource: document.getElementById("step1QuickSource"),
  step1Search: document.getElementById("step1Search"),
  step1StatusFilter: document.getElementById("step1StatusFilter"),
  step1Sort: document.getElementById("step1Sort"),
  step2QuickIdea: document.getElementById("step2QuickIdea"),
  step3QuickIdea: document.getElementById("step3QuickIdea"),
  addStep1Btn: document.getElementById("addStep1Btn"),
  addStep2Btn: document.getElementById("addStep2Btn"),
  addStep3Btn: document.getElementById("addStep3Btn"),
  step1Template: document.getElementById("step1CardTemplate"),
  step2Template: document.getElementById("step2CardTemplate"),
  step3Template: document.getElementById("step3CardTemplate"),
  titleBoard: document.getElementById("titleBoard"),
  thumbnailBoard: document.getElementById("thumbnailBoard"),
  comparableBoard: document.getElementById("comparableBoard"),
  comparableUrl: document.getElementById("comparableUrl"),
  addComparableBtn: document.getElementById("addComparableBtn"),
  titleTemplate: document.getElementById("titleCardTemplate"),
  thumbTemplate: document.getElementById("thumbCardTemplate"),
  comparableTemplate: document.getElementById("comparableCardTemplate"),
  briefOutput: document.getElementById("briefOutput"),
  topTitle: document.getElementById("topTitle"),
  topThumb: document.getElementById("topThumb"),
  checkCuriosity: document.getElementById("checkCuriosity"),
  checkClarity: document.getElementById("checkClarity"),
  checkUniqueness: document.getElementById("checkUniqueness"),
  copyHtmlBtn: document.getElementById("copyHtmlBtn"),
  snapNiche: document.getElementById("snapNiche"),
  snapAgeRange: document.getElementById("snapAgeRange"),
  snapCountries: document.getElementById("snapCountries"),
  snapSimilarChannels: document.getElementById("snapSimilarChannels"),
  snapTamEstimate: document.getElementById("snapTamEstimate"),
  snapTamCurrent: document.getElementById("snapTamCurrent"),
  snapTamShare: document.getElementById("snapTamShare"),
  snapAudience: document.getElementById("snapAudience"),
  snapAvatar: document.getElementById("snapAvatar"),
  snapCluster: document.getElementById("snapCluster"),
  snapHumorStyle: document.getElementById("snapHumorStyle"),
  snapAntiPatterns: document.getElementById("snapAntiPatterns"),
  snapUnlock: document.getElementById("snapUnlock"),
  checkTitleLength: document.getElementById("checkTitleLength"),
  checkThumbTextRule: document.getElementById("checkThumbTextRule"),
  checkPackagingStages: document.getElementById("checkPackagingStages"),
  checkCCN: document.getElementById("checkCCN"),
};

const state = {
  pageView: "home",
  channels: [],
  accounts: [],
  channelMemberships: [],
  activeChannelId: "",
  channelWorkspaces: {},
  activeView: "ideation",
  ideationStepView: 1,
  briefUnlocked: false,
  matriculatedIdeaId: "",
  step1View: {
    query: "",
    status: "all",
    sort: "newest",
  },
  step1Ideas: [],
  step2Ideas: [],
  step3Ideas: [],
  titles: [],
  thumbnails: [],
  comparables: [],
  latestBriefHtml: "",
};

let localDbPromise = null;
let pendingSaveTimer = null;
let queuedSnapshotPayload = null;
let persistQueue = Promise.resolve();

const BRIEF_EXPORT_STYLES = `
  :root {
    --bg: #f7f2e8;
    --panel: #ffffff;
    --ink: #152836;
    --ink-soft: #3f5b6d;
    --line: rgba(8, 33, 52, 0.16);
    --accent: #d04a27;
    --sea: #0c5f66;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: "Space Grotesk", "Trebuchet MS", sans-serif;
    color: var(--ink);
    background: linear-gradient(180deg, #fffaf0, var(--bg));
  }

  .page {
    width: min(1080px, calc(100vw - 2.5rem));
    margin: 1.5rem auto 2.8rem;
    display: grid;
    gap: 1rem;
  }

  .hero {
    border: 1px solid var(--line);
    background: linear-gradient(145deg, #fffdf7, #ffffff);
    border-radius: 18px;
    padding: 1.15rem;
  }

  .hero h1 {
    margin: 0;
    font-family: "Fraunces", Georgia, serif;
    font-size: clamp(1.7rem, 3.5vw, 2.4rem);
    line-height: 1.08;
  }

  .hero p {
    margin: 0.45rem 0 0;
    color: var(--ink-soft);
    font-size: 0.92rem;
  }

  .grid {
    display: grid;
    gap: 0.85rem;
  }

  .two {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .card {
    border: 1px solid var(--line);
    background: var(--panel);
    border-radius: 14px;
    padding: 0.85rem;
  }

  h2 {
    margin: 0 0 0.55rem;
    font-size: 1rem;
  }

  ul,
  ol,
  p {
    margin: 0;
    color: var(--ink-soft);
    line-height: 1.48;
    font-size: 0.89rem;
  }

  ul,
  ol {
    padding-left: 1.1rem;
  }

  .comparables {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  }

  .comparable {
    border: 1px solid var(--line);
    background: var(--panel);
    border-radius: 14px;
    overflow: hidden;
    display: grid;
  }

  .comparable img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: rgba(8, 33, 52, 0.1);
  }

  .comparable div {
    padding: 0.75rem;
    display: grid;
    gap: 0.3rem;
  }

  .comparable h3 {
    margin: 0;
    font-size: 0.95rem;
  }

  .comparable a {
    color: var(--sea);
    font-size: 0.84rem;
    font-weight: 700;
  }

  .muted {
    color: var(--ink-soft);
    font-size: 0.82rem;
  }

  .kicker {
    color: var(--accent);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.72rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
`;

function hasIndexedDbSupport() {
  return typeof indexedDB !== "undefined";
}

function idbRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB request failed."));
  });
}

function idbTransactionDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error || new Error("IndexedDB transaction aborted."));
    tx.onerror = () => reject(tx.error || new Error("IndexedDB transaction failed."));
  });
}

async function openLocalDb() {
  if (!hasIndexedDbSupport()) {
    return null;
  }

  if (localDbPromise) {
    return localDbPromise;
  }

  localDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(LOCAL_DB_NAME, LOCAL_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(LOCAL_DB_STORE)) {
        db.createObjectStore(LOCAL_DB_STORE, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to open local database."));
  }).catch((error) => {
    localDbPromise = null;
    console.warn("Local database is unavailable. Falling back to localStorage.", error);
    return null;
  });

  return localDbPromise;
}

async function readFromLocalDb(key) {
  const db = await openLocalDb();
  if (!db) {
    return null;
  }

  const tx = db.transaction(LOCAL_DB_STORE, "readonly");
  const txDone = idbTransactionDone(tx);
  const store = tx.objectStore(LOCAL_DB_STORE);
  const row = await idbRequest(store.get(key));
  await txDone;
  return row?.value ?? null;
}

async function writeToLocalDb(key, value) {
  const db = await openLocalDb();
  if (!db) {
    return;
  }

  const tx = db.transaction(LOCAL_DB_STORE, "readwrite");
  const txDone = idbTransactionDone(tx);
  const store = tx.objectStore(LOCAL_DB_STORE);
  await idbRequest(
    store.put({
      key,
      value,
      updatedAt: Date.now(),
    }),
  );
  await txDone;
}

async function deleteFromLocalDb(key) {
  const db = await openLocalDb();
  if (!db) {
    return;
  }

  const tx = db.transaction(LOCAL_DB_STORE, "readwrite");
  const txDone = idbTransactionDone(tx);
  const store = tx.objectStore(LOCAL_DB_STORE);
  await idbRequest(store.delete(key));
  await txDone;
}

function enqueuePersistTask(task) {
  persistQueue = persistQueue
    .then(task)
    .catch((error) => {
      console.warn("Failed to persist snapshot to local database.", error);
    });

  return persistQueue;
}

function scheduleSnapshotPersist(snapshotPayload, immediate = false) {
  queuedSnapshotPayload = snapshotPayload;

  if (pendingSaveTimer) {
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  }

  if (immediate) {
    return enqueuePersistTask(runQueuedSnapshotPersist);
  }

  pendingSaveTimer = setTimeout(() => {
    pendingSaveTimer = null;
    void enqueuePersistTask(runQueuedSnapshotPersist);
  }, SAVE_DEBOUNCE_MS);

  return Promise.resolve();
}

async function flushPersistQueue() {
  if (pendingSaveTimer) {
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
    await enqueuePersistTask(runQueuedSnapshotPersist);
    return;
  }

  await persistQueue;
}

const workspaceRepo = {
  async load() {
    return readFromLocalDb(LOCAL_DB_KEY_WORKSPACE);
  },
  async save(payload) {
    return writeToLocalDb(LOCAL_DB_KEY_WORKSPACE, payload);
  },
  async clear() {
    return deleteFromLocalDb(LOCAL_DB_KEY_WORKSPACE);
  },
};

const ideasRepo = {
  async load() {
    return readFromLocalDb(LOCAL_DB_KEY_IDEAS);
  },
  async save(payload) {
    return writeToLocalDb(LOCAL_DB_KEY_IDEAS, payload);
  },
  async clear() {
    return deleteFromLocalDb(LOCAL_DB_KEY_IDEAS);
  },
};

const briefsRepo = {
  async loadCurrent() {
    return readFromLocalDb(LOCAL_DB_KEY_BRIEFS);
  },
  async saveCurrent(payload) {
    return writeToLocalDb(LOCAL_DB_KEY_BRIEFS, payload);
  },
  async clear() {
    return deleteFromLocalDb(LOCAL_DB_KEY_BRIEFS);
  },
};

const viewerRepo = {
  async load() {
    return readFromLocalDb(LOCAL_DB_KEY_VIEWER);
  },
  async save(payload) {
    return writeToLocalDb(LOCAL_DB_KEY_VIEWER, payload);
  },
};

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeText(value, fallback = "N/A") {
  const text = (value || "").trim();
  return text ? escapeHtml(text) : fallback;
}

function formatDateTime() {
  return new Date().toLocaleString();
}

function createRecordId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeIdeaStatus(value, fallback = "yellow") {
  return IDEA_STATUSES.includes(value) ? value : fallback;
}

function toCleanText(value) {
  return String(value || "").trim();
}

function normalizeTimestamp(value) {
  const stamp = Number(value);
  return Number.isFinite(stamp) ? stamp : Date.now();
}

function createStep1Idea(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("s1"),
    name: toCleanText(seed.name) || DEFAULT_OWNER_NAME,
    videoIdea: toCleanText(seed.videoIdea),
    source: toCleanText(seed.source),
    hypothesis: toCleanText(seed.hypothesis),
    notes: toCleanText(seed.notes),
    createdAt: normalizeTimestamp(seed.createdAt),
    status: normalizeIdeaStatus(seed.status, "yellow"),
  };
}

function createStep2Idea(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("s2"),
    videoIdea: toCleanText(seed.videoIdea),
    notes: toCleanText(seed.notes),
    hookDrafts: toCleanText(seed.hookDrafts),
    titleThumbCombos: toCleanText(seed.titleThumbCombos),
    status: normalizeIdeaStatus(seed.status, "yellow"),
  };
}

function createStep3Idea(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("s3"),
    videoIdea: toCleanText(seed.videoIdea),
    notes: toCleanText(seed.notes),
    titleThumbLink: toCleanText(seed.titleThumbLink),
    hypothesisMetric: toCleanText(seed.hypothesisMetric),
    insights: toCleanText(seed.insights),
    status: normalizeIdeaStatus(seed.status, "yellow"),
  };
}

function normalizeStep1Ideas(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createStep1Idea(item));
}

function normalizeStep2Ideas(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createStep2Idea(item));
}

function normalizeStep3Ideas(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createStep3Idea(item));
}

function normalizeStep1View(view = {}) {
  return {
    query: toCleanText(view.query),
    status: view.status === "all" || IDEA_STATUSES.includes(view.status) ? view.status : "all",
    sort: STEP1_SORT_OPTIONS.includes(view.sort) ? view.sort : "newest",
  };
}

function normalizePageView(value) {
  return PAGE_OPTIONS.includes(value) ? value : "home";
}

function createChannelRecord(seed = {}) {
  const name = toCleanText(seed.name) || "Untitled Channel";
  const handle = toCleanText(seed.handle) || "";
  return {
    id: toCleanText(seed.id) || createRecordId("ch"),
    name,
    handle,
    ownerName: toCleanText(seed.ownerName) || DEFAULT_OWNER_NAME,
    platform: toCleanText(seed.platform) || "YouTube",
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt),
  };
}

function createDefaultChannelRecord() {
  const now = Date.now();
  return createChannelRecord({
    id: DEFAULT_CHANNEL_ID,
    name: "A Life Engineered",
    handle: "@ALifeEngineered",
    ownerName: DEFAULT_OWNER_NAME,
    platform: "YouTube",
    createdAt: now,
    updatedAt: now,
  });
}

function createAccountRecord(seed = {}) {
  const name = toCleanText(seed.name) || "Unknown User";
  return {
    id: toCleanText(seed.id) || createRecordId("acct"),
    name,
    email: toCleanText(seed.email),
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt),
  };
}

function createDefaultAccountRecord() {
  const now = Date.now();
  return createAccountRecord({
    id: DEFAULT_ACCOUNT_ID,
    name: DEFAULT_OWNER_NAME,
    createdAt: now,
    updatedAt: now,
  });
}

function normalizeAccounts(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const seen = new Set();
  return items
    .map((item) => createAccountRecord(item))
    .filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
}

function normalizeMembershipRole(value) {
  return CHANNEL_MEMBER_ROLES.includes(value) ? value : "editor";
}

function createChannelMembershipRecord(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("m"),
    channelId: toCleanText(seed.channelId),
    accountId: toCleanText(seed.accountId),
    role: normalizeMembershipRole(seed.role),
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt),
  };
}

function normalizeChannelMemberships(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const deduped = new Map();
  items.forEach((item) => {
    const parsed = createChannelMembershipRecord(item);
    if (!parsed.channelId || !parsed.accountId) {
      return;
    }

    const key = `${parsed.channelId}::${parsed.accountId}`;
    const existing = deduped.get(key);
    if (!existing) {
      deduped.set(key, parsed);
      return;
    }

    const shouldPromoteOwner = existing.role !== "owner" && parsed.role === "owner";
    if (shouldPromoteOwner || parsed.updatedAt > existing.updatedAt) {
      deduped.set(key, {
        ...existing,
        ...parsed,
        role: shouldPromoteOwner ? "owner" : parsed.role,
      });
    }
  });

  return Array.from(deduped.values());
}

function normalizeChannels(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const seen = new Set();
  return items
    .map((item) => createChannelRecord(item))
    .filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
}

function createEmptyChannelWorkspace() {
  return {
    activeView: "ideation",
    ideationStepView: 1,
    briefUnlocked: false,
    matriculatedIdeaId: "",
    step1View: normalizeStep1View({}),
    values: {},
    step1Ideas: [],
    step2Ideas: [],
    step3Ideas: [],
    titles: [],
    thumbnails: [],
    comparables: [],
    latestBriefHtml: "",
  };
}

function normalizeChannelWorkspace(workspace = {}) {
  return {
    activeView: normalizeWorkspaceView(workspace.activeView),
    ideationStepView: normalizeIdeationStep(workspace.ideationStepView),
    briefUnlocked: Boolean(workspace.briefUnlocked),
    matriculatedIdeaId: toCleanText(workspace.matriculatedIdeaId),
    step1View: normalizeStep1View(workspace.step1View),
    values: workspace.values && typeof workspace.values === "object" ? workspace.values : {},
    step1Ideas: normalizeStep1Ideas(workspace.step1Ideas),
    step2Ideas: normalizeStep2Ideas(workspace.step2Ideas),
    step3Ideas: normalizeStep3Ideas(workspace.step3Ideas),
    titles: Array.isArray(workspace.titles) ? workspace.titles : [],
    thumbnails: Array.isArray(workspace.thumbnails) ? workspace.thumbnails : [],
    comparables: Array.isArray(workspace.comparables) ? workspace.comparables : [],
    latestBriefHtml: toCleanText(workspace.latestBriefHtml),
  };
}

function formatAddedAt(value) {
  return new Date(normalizeTimestamp(value)).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatStatusLabel(status) {
  const normalized = normalizeIdeaStatus(status, "yellow");
  return normalized[0].toUpperCase() + normalized.slice(1);
}

function summarizeLine(value, fallback = "No details yet", max = 42) {
  const text = toCleanText(value);
  if (!text) {
    return fallback;
  }

  const compact = text.replace(/\s+/g, " ");
  if (compact.length <= max) {
    return compact;
  }

  return `${compact.slice(0, Math.max(10, max - 1))}…`;
}

function setInputValueIfChanged(el, value) {
  if (!el) {
    return;
  }

  const next = String(value ?? "");
  if (el.value !== next) {
    el.value = next;
  }
}

function formatStatusCounts(items) {
  const counts = IDEA_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  items.forEach((item) => {
    counts[normalizeIdeaStatus(item.status)] += 1;
  });

  return `Green ${counts.green} · Yellow ${counts.yellow} · Red ${counts.red}`;
}

function applyPipelineDefaults() {
  const activeChannel = getActiveChannelRecord();
  const ownerName = getPrimaryChannelOwnerName(activeChannel);

  if (refs.step1QuickName && !toCleanText(refs.step1QuickName.value)) {
    refs.step1QuickName.value = ownerName;
  }

  state.step1View = normalizeStep1View(state.step1View);

  if (refs.step1Search) {
    refs.step1Search.value = state.step1View.query;
  }

  if (refs.step1StatusFilter) {
    refs.step1StatusFilter.value = state.step1View.status;
  }

  if (refs.step1Sort) {
    refs.step1Sort.value = state.step1View.sort;
  }
}

function normalizeWorkspaceView(value) {
  return value === "brief" ? "brief" : "ideation";
}

function normalizeIdeationStep(value) {
  const step = Number(value);
  if (step < 1) {
    return 1;
  }
  if (step > 3) {
    return 3;
  }
  return Number.isFinite(step) ? step : 1;
}

function ensureViewAccess() {
  if (!state.briefUnlocked && state.activeView === "brief") {
    state.activeView = "ideation";
  }
}

function renderChannelHomeBoard() {
  if (!refs.channelHomeBoard || !refs.channelCardTemplate) {
    return;
  }

  refs.channelHomeBoard.innerHTML = "";

  if (!state.channels.length) {
    refs.channelHomeBoard.innerHTML =
      '<p class="pipeline-empty">No channels yet. Add a channel to begin ideation and brief planning.</p>';
    return;
  }

  state.channels.forEach((channel) => {
    const counts = getChannelIdeaCounts(channel.id);
    const ownerName = getPrimaryChannelOwnerName(channel);
    const fragment = refs.channelCardTemplate.content.cloneNode(true);
    const openBtn = fragment.querySelector('button[data-action="openChannel"]');
    const nameEl = fragment.querySelector('[data-role="channelName"]');
    const handleEl = fragment.querySelector('[data-role="channelHandle"]');
    const phaseCountsEl = fragment.querySelector('[data-role="phaseCounts"]');
    const updatedAtEl = fragment.querySelector('[data-role="updatedAt"]');

    nameEl.textContent = channel.name;
    handleEl.textContent = `${channel.handle || channel.platform} · Owner ${ownerName}`;
    phaseCountsEl.textContent = `Phase 1 ${counts.step1} · Phase 2 ${counts.step2} · Phase 3 ${counts.step3}`;
    updatedAtEl.textContent = `Updated ${formatChannelUpdatedAt(channel.updatedAt)}`;

    openBtn.addEventListener("click", () => {
      openChannelById(channel.id);
    });

    refs.channelHomeBoard.appendChild(fragment);
  });
}

function renderIdeationStepView() {
  const activeStep = normalizeIdeationStep(state.ideationStepView);
  state.ideationStepView = activeStep;

  document.querySelectorAll("[data-ideation-step]").forEach((stage) => {
    const isActive = Number(stage.dataset.ideationStep) === activeStep;
    stage.hidden = !isActive;
    stage.classList.toggle("is-active", isActive);
  });

  refs.prevStepViewBtn.disabled = activeStep === 1;
  refs.nextStepViewBtn.disabled = activeStep === 3;
  refs.ideationStepViewLabel.textContent = `Phase ${activeStep} of 3`;
}

function setIdeationStep(step, shouldPersist = true) {
  state.ideationStepView = normalizeIdeationStep(step);
  renderIdeationStepView();

  if (shouldPersist) {
    saveSnapshot();
  }
}

function renderWorkspaceView() {
  ensureViewAccess();
  const activeView = normalizeWorkspaceView(state.activeView);

  document.querySelectorAll('[data-page="channel"][data-view]').forEach((panel) => {
    panel.hidden = panel.dataset.view !== activeView;
  });

  const briefReady = Boolean(state.briefUnlocked);
  refs.showBriefViewBtn.disabled = !briefReady;
  refs.showIdeationViewBtn.classList.toggle("is-active", activeView === "ideation");
  refs.showBriefViewBtn.classList.toggle("is-active", activeView === "brief");
  refs.showIdeationViewBtn.setAttribute("aria-selected", String(activeView === "ideation"));
  refs.showBriefViewBtn.setAttribute("aria-selected", String(activeView === "brief"));
  refs.briefGateStatus.textContent = briefReady
    ? "Brief view unlocked. You can switch between ideation and brief views."
    : "Brief view is locked. Matriculate a Phase 3 idea to unlock the brief workspace.";

  renderIdeationStepView();
}

function renderPageView() {
  const pageView = normalizePageView(state.pageView);
  state.pageView = pageView;

  document.querySelectorAll("[data-page]").forEach((panel) => {
    panel.hidden = panel.dataset.page !== pageView;
  });

  const activeChannel = getActiveChannelRecord();
  const hasActiveChannel = Boolean(activeChannel);
  refs.showHomePageBtn.classList.toggle("is-active", pageView === "home");
  refs.showChannelPageBtn.classList.toggle("is-active", pageView === "channel");
  refs.showHomePageBtn.setAttribute("aria-selected", String(pageView === "home"));
  refs.showChannelPageBtn.setAttribute("aria-selected", String(pageView === "channel"));
  refs.showChannelPageBtn.disabled = !hasActiveChannel;
  refs.workspaceViewSwitch.classList.toggle("is-hidden", pageView !== "channel");
  refs.briefGateStatus.classList.toggle("is-hidden", pageView !== "channel");
  refs.activeChannelLabel.textContent = hasActiveChannel
    ? `Channel: ${activeChannel.name}${activeChannel.handle ? ` (${activeChannel.handle})` : ""}`
    : "No channel selected.";
}

function setPageView(pageView, shouldPersist = true) {
  state.pageView = normalizePageView(pageView);

  if (state.pageView === "channel") {
    const activeChannel = getActiveChannelRecord();
    if (!activeChannel) {
      state.pageView = "home";
    } else {
      ensureChannelWorkspace(activeChannel.id);
      applyActiveChannelWorkspace(state.channelWorkspaces[activeChannel.id]);
      applyDefaultPlaybookValues();
      applyPipelineDefaults();
    }
  }

  updateBoardsAndBrief({ persist: false });

  if (shouldPersist) {
    saveSnapshot();
  }
}

function openChannelById(channelId, shouldPersist = true) {
  const id = toCleanText(channelId);
  if (!id || !state.channels.some((channel) => channel.id === id)) {
    return;
  }

  cacheActiveChannelWorkspace();
  state.activeChannelId = id;
  ensureChannelWorkspace(id);
  applyActiveChannelWorkspace(state.channelWorkspaces[id]);
  applyDefaultPlaybookValues();
  applyPipelineDefaults();
  state.pageView = "channel";
  updateBoardsAndBrief({ persist: false });

  if (shouldPersist) {
    saveSnapshot();
  }
}

function setWorkspaceView(view, shouldPersist = true) {
  state.activeView = normalizeWorkspaceView(view);
  if (state.pageView !== "channel") {
    state.pageView = "channel";
  }
  updateBoardsAndBrief({ persist: false });

  if (shouldPersist) {
    saveSnapshot();
  }
}

function getFieldValues() {
  return fieldIds.reduce((acc, id) => {
    const el = document.getElementById(id);
    acc[id] = (el?.value || "").trim();
    return acc;
  }, {});
}

function setFieldValues(values) {
  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = values[id] || "";
    }
  });
}

function buildActiveChannelWorkspace(values = getFieldValues()) {
  return normalizeChannelWorkspace({
    activeView: state.activeView,
    ideationStepView: state.ideationStepView,
    briefUnlocked: state.briefUnlocked,
    matriculatedIdeaId: state.matriculatedIdeaId,
    step1View: state.step1View,
    values,
    step1Ideas: state.step1Ideas,
    step2Ideas: state.step2Ideas,
    step3Ideas: state.step3Ideas,
    titles: state.titles,
    thumbnails: state.thumbnails,
    comparables: state.comparables,
    latestBriefHtml: state.latestBriefHtml,
  });
}

function applyActiveChannelWorkspace(workspace = {}) {
  const parsed = normalizeChannelWorkspace(workspace);
  setFieldValues(parsed.values || {});
  state.activeView = parsed.activeView;
  state.ideationStepView = parsed.ideationStepView;
  state.briefUnlocked = parsed.briefUnlocked;
  state.matriculatedIdeaId = parsed.matriculatedIdeaId;
  state.step1View = parsed.step1View;
  state.step1Ideas = parsed.step1Ideas;
  state.step2Ideas = parsed.step2Ideas;
  state.step3Ideas = parsed.step3Ideas;
  state.titles = parsed.titles;
  state.thumbnails = parsed.thumbnails;
  state.comparables = parsed.comparables;
  state.latestBriefHtml = parsed.latestBriefHtml;
}

function cacheActiveChannelWorkspace(values = getFieldValues()) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return;
  }

  state.channelWorkspaces[channelId] = buildActiveChannelWorkspace(values);
  const channel = state.channels.find((entry) => entry.id === channelId);
  if (channel) {
    channel.updatedAt = Date.now();
  }
}

function ensureChannelWorkspace(channelId) {
  const id = toCleanText(channelId);
  if (!id) {
    return;
  }

  state.channelWorkspaces[id] = normalizeChannelWorkspace(
    state.channelWorkspaces[id] || createEmptyChannelWorkspace(),
  );
}

function getActiveChannelRecord() {
  const id = toCleanText(state.activeChannelId);
  return state.channels.find((channel) => channel.id === id) || null;
}

function getAccountRecord(accountId) {
  const id = toCleanText(accountId);
  if (!id) {
    return null;
  }

  return state.accounts.find((account) => account.id === id) || null;
}

function getChannelMemberships(channelId) {
  const id = toCleanText(channelId);
  if (!id) {
    return [];
  }

  return state.channelMemberships.filter((membership) => membership.channelId === id);
}

function ensureAccountByName(name) {
  const cleaned = toCleanText(name) || DEFAULT_OWNER_NAME;
  const normalized = cleaned.toLowerCase();
  const existing = state.accounts.find((account) => account.name.toLowerCase() === normalized);
  if (existing) {
    if (!toCleanText(existing.name)) {
      existing.name = cleaned;
    }
    return existing;
  }

  const created = createAccountRecord({ name: cleaned });
  state.accounts.push(created);
  return created;
}

function getPrimaryChannelOwnerAccount(channelId) {
  const ownerMembership = getChannelMemberships(channelId).find((membership) => membership.role === "owner");
  if (!ownerMembership) {
    return null;
  }

  return getAccountRecord(ownerMembership.accountId);
}

function getPrimaryChannelOwnerName(channel, fallback = DEFAULT_OWNER_NAME) {
  if (!channel) {
    return fallback;
  }

  const ownerAccount = getPrimaryChannelOwnerAccount(channel.id);
  if (ownerAccount) {
    return ownerAccount.name;
  }

  return toCleanText(channel.ownerName) || fallback;
}

function ensureOwnerMembershipForChannel(channel) {
  if (!channel || !toCleanText(channel.id)) {
    return;
  }

  const memberships = getChannelMemberships(channel.id);
  const existingOwnerMembership = memberships.find((membership) => membership.role === "owner");
  const existingOwnerAccount = existingOwnerMembership
    ? getAccountRecord(existingOwnerMembership.accountId)
    : null;

  if (existingOwnerMembership && existingOwnerAccount) {
    channel.ownerName = existingOwnerAccount.name;
    return;
  }

  const desiredOwner = ensureAccountByName(channel.ownerName || DEFAULT_OWNER_NAME);
  const attachedMembership = memberships.find((membership) => membership.accountId === desiredOwner.id);

  if (attachedMembership) {
    attachedMembership.role = "owner";
    attachedMembership.updatedAt = Date.now();
  } else if (existingOwnerMembership) {
    existingOwnerMembership.accountId = desiredOwner.id;
    existingOwnerMembership.role = "owner";
    existingOwnerMembership.updatedAt = Date.now();
  } else {
    state.channelMemberships.push(
      createChannelMembershipRecord({
        channelId: channel.id,
        accountId: desiredOwner.id,
        role: "owner",
      }),
    );
  }

  channel.ownerName = desiredOwner.name;
}

function ensureChannelModel() {
  state.channels = normalizeChannels(state.channels);
  state.accounts = normalizeAccounts(state.accounts);
  state.channelMemberships = normalizeChannelMemberships(state.channelMemberships);

  if (!state.channels.length) {
    const seedChannel = createDefaultChannelRecord();
    state.channels = [seedChannel];
    state.activeChannelId = seedChannel.id;
  }

  if (!state.accounts.length) {
    state.accounts = [createDefaultAccountRecord()];
  }

  if (!state.activeChannelId || !state.channels.some((channel) => channel.id === state.activeChannelId)) {
    state.activeChannelId = state.channels[0].id;
  }

  const channelIdSet = new Set(state.channels.map((channel) => channel.id));
  const accountIdSet = new Set(state.accounts.map((account) => account.id));
  state.channelMemberships = state.channelMemberships.filter((membership) => {
    return channelIdSet.has(membership.channelId) && accountIdSet.has(membership.accountId);
  });

  state.channels.forEach((channel) => {
    ensureChannelWorkspace(channel.id);
    ensureOwnerMembershipForChannel(channel);
  });

  state.accounts = normalizeAccounts(state.accounts);
  state.channelMemberships = normalizeChannelMemberships(state.channelMemberships);
}

function formatChannelUpdatedAt(value) {
  return new Date(normalizeTimestamp(value)).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getChannelIdeaCounts(channelId) {
  const workspace = normalizeChannelWorkspace(state.channelWorkspaces[channelId] || createEmptyChannelWorkspace());
  return {
    step1: workspace.step1Ideas.length,
    step2: workspace.step2Ideas.length,
    step3: workspace.step3Ideas.length,
  };
}

function applyDefaultPlaybookValues() {
  const defaults = {
    ideaSource: "40/40/20 blend (Internal/External/Innovation)",
    targetTrafficSource: "Suggested/Browse hybrid",
    uploadStrategy: "Establish > Experiment > Double Down",
    ccnCore: "6",
    ccnCasual: "6",
    ccnNew: "6",
  };

  Object.entries(defaults).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }

    if (!String(el.value || "").trim()) {
      el.value = value;
    }
  });
}

function renderViewerSnapshot() {
  refs.snapNiche.textContent = VIEWER_STRATEGY.niche;
  refs.snapAgeRange.textContent = VIEWER_STRATEGY.ageRange;
  refs.snapCountries.textContent = VIEWER_STRATEGY.mainCountries;
  refs.snapSimilarChannels.textContent = VIEWER_STRATEGY.similarChannels;
  refs.snapTamEstimate.textContent = VIEWER_STRATEGY.tamEstimate;
  refs.snapTamCurrent.textContent = VIEWER_STRATEGY.tamCurrent;
  refs.snapTamShare.textContent = VIEWER_STRATEGY.tamShare;
  refs.snapAudience.textContent = VIEWER_STRATEGY.audience;
  refs.snapAvatar.textContent = VIEWER_STRATEGY.avatar;
  refs.snapCluster.textContent = VIEWER_STRATEGY.cluster;
  refs.snapHumorStyle.textContent = VIEWER_STRATEGY.humorStyle;
  refs.snapAntiPatterns.textContent = VIEWER_STRATEGY.antiPatterns;
  refs.snapUnlock.textContent = VIEWER_STRATEGY.unlockNeed;
}

function setPipelineCardStatus(card, status) {
  if (!card) {
    return;
  }

  card.dataset.status = normalizeIdeaStatus(status);
}

function setPipelineRowExpanded(card, detailsEl, arrowEl, expanded) {
  const isExpanded = Boolean(expanded);
  card.dataset.expanded = isExpanded ? "true" : "false";
  detailsEl.hidden = !isExpanded;
  arrowEl.textContent = isExpanded ? "▼" : "▶";
}

function togglePipelineRow(boardEl, card, detailsEl, arrowEl) {
  const nextExpanded = card.dataset.expanded !== "true";

  if (nextExpanded && boardEl) {
    boardEl.querySelectorAll('.pipeline-card[data-expanded="true"]').forEach((openCard) => {
      if (openCard === card) {
        return;
      }

      const openDetails = openCard.querySelector('[data-role="details"]');
      const openArrow = openCard.querySelector('[data-role="expandArrow"]');
      if (!openDetails || !openArrow) {
        return;
      }

      setPipelineRowExpanded(openCard, openDetails, openArrow, false);
    });
  }

  setPipelineRowExpanded(card, detailsEl, arrowEl, nextExpanded);
}

function renderPipelineBoards() {
  renderStep1Board();
  renderStep2Board();
  renderStep3Board();
}

function getStep1FilteredSortedIdeas() {
  const view = normalizeStep1View(state.step1View);
  state.step1View = view;
  const query = view.query.toLowerCase();

  const filtered = state.step1Ideas.filter((item) => {
    if (view.status !== "all" && normalizeIdeaStatus(item.status) !== view.status) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [item.videoIdea, item.name, item.source, item.hypothesis, item.notes]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });

  const sorted = [...filtered];
  sorted.sort((left, right) => {
    if (view.sort === "oldest") {
      return normalizeTimestamp(left.createdAt) - normalizeTimestamp(right.createdAt);
    }

    if (view.sort === "title-asc") {
      return left.videoIdea.localeCompare(right.videoIdea);
    }

    if (view.sort === "title-desc") {
      return right.videoIdea.localeCompare(left.videoIdea);
    }

    if (view.sort === "name-asc") {
      return left.name.localeCompare(right.name);
    }

    return normalizeTimestamp(right.createdAt) - normalizeTimestamp(left.createdAt);
  });

  return {
    view,
    items: sorted,
    filteredCount: sorted.length,
    totalCount: state.step1Ideas.length,
  };
}

function renderStep1Board() {
  refs.step1Board.innerHTML = "";
  refs.step1Count.textContent = formatStatusCounts(state.step1Ideas);
  const viewState = getStep1FilteredSortedIdeas();

  setInputValueIfChanged(refs.step1Search, viewState.view.query);
  setInputValueIfChanged(refs.step1StatusFilter, viewState.view.status);
  setInputValueIfChanged(refs.step1Sort, viewState.view.sort);
  refs.step1ResultCount.textContent = `Showing ${viewState.filteredCount} of ${viewState.totalCount} titles`;

  if (!viewState.totalCount) {
    refs.step1Board.innerHTML =
      '<p class="pipeline-empty">No ideas in Phase 1 yet. Add fast entries and score with green/yellow/red.</p>';
    return;
  }

  if (!viewState.filteredCount) {
    refs.step1Board.innerHTML =
      '<p class="pipeline-empty">No titles match the current filters. Adjust search/status/sort and try again.</p>';
    return;
  }

  viewState.items.forEach((item) => {
    const itemId = item.id;
    const fragment = refs.step1Template.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineTitleEl = fragment.querySelector('[data-role="lineTitle"]');
    const lineStatusEl = fragment.querySelector('[data-role="lineStatus"]');
    const lineMetaEl = fragment.querySelector('[data-role="lineMeta"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const titleEl = fragment.querySelector(".pipeline-card-title");
    const createdAtEl = fragment.querySelector('[data-role="createdAt"]');
    const statusSelect = fragment.querySelector('select[data-role="status"]');
    const promoteBtn = fragment.querySelector('button[data-action="promote"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const nameEl = fragment.querySelector('[data-field="name"]');
    const ideaEl = fragment.querySelector('[data-field="videoIdea"]');
    const sourceEl = fragment.querySelector('[data-field="source"]');
    const hypothesisEl = fragment.querySelector('[data-field="hypothesis"]');
    const notesEl = fragment.querySelector('[data-field="notes"]');

    const refreshText = () => {
      const ideaText = toCleanText(item.videoIdea);
      const ownerText = summarizeLine(item.name, DEFAULT_OWNER_NAME, 16);
      titleEl.textContent = ideaText || "Untitled brainstorm";
      lineTitleEl.textContent = ideaText || "Untitled brainstorm";
      lineStatusEl.textContent = formatStatusLabel(item.status);
      lineMetaEl.textContent = `${ownerText} · Added ${formatAddedAt(item.createdAt)}`;
      createdAtEl.textContent = `Added ${formatAddedAt(item.createdAt)}`;
    };

    refreshText();
    nameEl.value = item.name;
    ideaEl.value = item.videoIdea;
    sourceEl.value = item.source;
    hypothesisEl.value = item.hypothesis;
    notesEl.value = item.notes;

    statusSelect.value = normalizeIdeaStatus(item.status);
    setPipelineCardStatus(card, statusSelect.value);
    setPipelineRowExpanded(card, detailsEl, arrowEl, false);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.step1Board, card, detailsEl, arrowEl);
    });

    statusSelect.addEventListener("change", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.status = normalizeIdeaStatus(statusSelect.value);
      setPipelineCardStatus(card, record.status);
      refs.step1Count.textContent = formatStatusCounts(state.step1Ideas);
      item.status = record.status;
      refreshText();
      if (state.step1View.status !== "all") {
        renderStep1Board();
      }
      saveSnapshot();
    });

    nameEl.addEventListener("input", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.name = nameEl.value;
      item.name = record.name;
      refreshText();
      saveSnapshot();
    });

    ideaEl.addEventListener("input", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.videoIdea = ideaEl.value;
      item.videoIdea = record.videoIdea;
      refreshText();
      saveSnapshot();
    });

    sourceEl.addEventListener("input", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.source = sourceEl.value;
      item.source = record.source;
      saveSnapshot();
    });

    hypothesisEl.addEventListener("input", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.hypothesis = hypothesisEl.value;
      item.hypothesis = record.hypothesis;
      saveSnapshot();
    });

    notesEl.addEventListener("input", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.notes = notesEl.value;
      item.notes = record.notes;
      saveSnapshot();
    });

    promoteBtn.addEventListener("click", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record || !toCleanText(record.videoIdea)) {
        flashButtonText(promoteBtn, "Need idea", 1000);
        return;
      }

      const notes = [
        toCleanText(record.notes),
        toCleanText(record.source) ? `Source: ${toCleanText(record.source)}` : "",
        toCleanText(record.hypothesis) ? `Hypothesis: ${toCleanText(record.hypothesis)}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      state.step2Ideas.unshift(
        createStep2Idea({
          videoIdea: record.videoIdea,
          notes,
          status: "yellow",
        }),
      );
      record.status = "green";
      item.status = "green";
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      const index = state.step1Ideas.findIndex((entry) => entry.id === itemId);
      if (index < 0) {
        return;
      }

      state.step1Ideas.splice(index, 1);
      updateBoardsAndBrief();
    });

    refs.step1Board.appendChild(fragment);
  });
}

function renderStep2Board() {
  refs.step2Board.innerHTML = "";
  refs.step2Count.textContent = formatStatusCounts(state.step2Ideas);

  if (!state.step2Ideas.length) {
    refs.step2Board.innerHTML =
      '<p class="pipeline-empty">No ideas in Phase 2 yet. Promote from Phase 1 or add ideas directly.</p>';
    return;
  }

  state.step2Ideas.forEach((item, index) => {
    const fragment = refs.step2Template.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineTitleEl = fragment.querySelector('[data-role="lineTitle"]');
    const lineStatusEl = fragment.querySelector('[data-role="lineStatus"]');
    const lineMetaEl = fragment.querySelector('[data-role="lineMeta"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const titleEl = fragment.querySelector(".pipeline-card-title");
    const statusSelect = fragment.querySelector('select[data-role="status"]');
    const promoteBtn = fragment.querySelector('button[data-action="promote"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const ideaEl = fragment.querySelector('[data-field="videoIdea"]');
    const notesEl = fragment.querySelector('[data-field="notes"]');
    const hooksEl = fragment.querySelector('[data-field="hookDrafts"]');
    const combosEl = fragment.querySelector('[data-field="titleThumbCombos"]');

    const refreshText = () => {
      const ideaText = toCleanText(item.videoIdea);
      titleEl.textContent = ideaText || `Phase 2 Idea ${index + 1}`;
      lineTitleEl.textContent = ideaText || `Phase 2 Idea ${index + 1}`;
      lineStatusEl.textContent = formatStatusLabel(item.status);
      lineMetaEl.textContent = summarizeLine(item.hookDrafts || item.titleThumbCombos || item.notes);
    };

    refreshText();
    ideaEl.value = item.videoIdea;
    notesEl.value = item.notes;
    hooksEl.value = item.hookDrafts;
    combosEl.value = item.titleThumbCombos;

    statusSelect.value = normalizeIdeaStatus(item.status);
    setPipelineCardStatus(card, statusSelect.value);
    setPipelineRowExpanded(card, detailsEl, arrowEl, false);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.step2Board, card, detailsEl, arrowEl);
    });

    statusSelect.addEventListener("change", () => {
      item.status = normalizeIdeaStatus(statusSelect.value);
      setPipelineCardStatus(card, item.status);
      refs.step2Count.textContent = formatStatusCounts(state.step2Ideas);
      refreshText();
      saveSnapshot();
    });

    ideaEl.addEventListener("input", () => {
      item.videoIdea = ideaEl.value;
      refreshText();
      saveSnapshot();
    });

    notesEl.addEventListener("input", () => {
      item.notes = notesEl.value;
      refreshText();
      saveSnapshot();
    });

    hooksEl.addEventListener("input", () => {
      item.hookDrafts = hooksEl.value;
      refreshText();
      saveSnapshot();
    });

    combosEl.addEventListener("input", () => {
      item.titleThumbCombos = combosEl.value;
      refreshText();
      saveSnapshot();
    });

    promoteBtn.addEventListener("click", () => {
      if (!toCleanText(item.videoIdea)) {
        flashButtonText(promoteBtn, "Need idea", 1000);
        return;
      }

      state.step3Ideas.unshift(
        createStep3Idea({
          videoIdea: item.videoIdea,
          notes: item.notes,
          titleThumbLink: item.titleThumbCombos,
          hypothesisMetric: item.hookDrafts,
          status: "yellow",
        }),
      );
      item.status = "green";
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      state.step2Ideas.splice(index, 1);
      updateBoardsAndBrief();
    });

    refs.step2Board.appendChild(fragment);
  });
}

function matriculateStep3IdeaToBrief(item, button) {
  const ideaText = toCleanText(item.videoIdea);
  if (!ideaText) {
    flashButtonText(button, "Need idea", 1000);
    return;
  }

  const projectNameEl = document.getElementById("projectName");
  const ideaFocusEl = document.getElementById("ideaFocus");
  const treatmentEl = document.getElementById("treatment");
  const loglineEl = document.getElementById("logline");

  if (!projectNameEl || !ideaFocusEl || !treatmentEl || !loglineEl) {
    return;
  }

  item.status = "green";
  state.briefUnlocked = true;
  state.matriculatedIdeaId = item.id;
  state.activeView = "brief";
  ideaFocusEl.value = ideaText;

  if (!toCleanText(projectNameEl.value)) {
    projectNameEl.value = ideaText;
  }

  if (!toCleanText(treatmentEl.value) && toCleanText(item.notes)) {
    treatmentEl.value = item.notes;
  }

  if (!toCleanText(loglineEl.value) && toCleanText(item.hypothesisMetric)) {
    loglineEl.value = item.hypothesisMetric;
  }

  updateBoardsAndBrief();
  const firstBriefPanel = document.querySelector('[data-view="brief"]');
  if (firstBriefPanel) {
    firstBriefPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderStep3Board() {
  refs.step3Board.innerHTML = "";
  refs.step3Count.textContent = formatStatusCounts(state.step3Ideas);

  if (!state.step3Ideas.length) {
    refs.step3Board.innerHTML =
      '<p class="pipeline-empty">No ideas in Phase 3 yet. Promote from Phase 2 to build experiment-ready concepts.</p>';
    return;
  }

  state.step3Ideas.forEach((item, index) => {
    const fragment = refs.step3Template.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineTitleEl = fragment.querySelector('[data-role="lineTitle"]');
    const lineStatusEl = fragment.querySelector('[data-role="lineStatus"]');
    const lineMetaEl = fragment.querySelector('[data-role="lineMeta"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const titleEl = fragment.querySelector(".pipeline-card-title");
    const statusSelect = fragment.querySelector('select[data-role="status"]');
    const startBriefBtn = fragment.querySelector('button[data-action="startBrief"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const ideaEl = fragment.querySelector('[data-field="videoIdea"]');
    const notesEl = fragment.querySelector('[data-field="notes"]');
    const linkEl = fragment.querySelector('[data-field="titleThumbLink"]');
    const hypothesisEl = fragment.querySelector('[data-field="hypothesisMetric"]');
    const insightsEl = fragment.querySelector('[data-field="insights"]');

    const refreshText = () => {
      const ideaText = toCleanText(item.videoIdea);
      titleEl.textContent = ideaText || `Phase 3 Idea ${index + 1}`;
      lineTitleEl.textContent = ideaText || `Phase 3 Idea ${index + 1}`;
      lineStatusEl.textContent = formatStatusLabel(item.status);
      lineMetaEl.textContent = summarizeLine(item.hypothesisMetric || item.insights || item.notes);
    };

    refreshText();
    ideaEl.value = item.videoIdea;
    notesEl.value = item.notes;
    linkEl.value = item.titleThumbLink;
    hypothesisEl.value = item.hypothesisMetric;
    insightsEl.value = item.insights;

    statusSelect.value = normalizeIdeaStatus(item.status);
    setPipelineCardStatus(card, statusSelect.value);
    setPipelineRowExpanded(card, detailsEl, arrowEl, false);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.step3Board, card, detailsEl, arrowEl);
    });

    statusSelect.addEventListener("change", () => {
      item.status = normalizeIdeaStatus(statusSelect.value);
      setPipelineCardStatus(card, item.status);
      refs.step3Count.textContent = formatStatusCounts(state.step3Ideas);
      refreshText();
      saveSnapshot();
    });

    ideaEl.addEventListener("input", () => {
      item.videoIdea = ideaEl.value;
      refreshText();
      saveSnapshot();
    });

    notesEl.addEventListener("input", () => {
      item.notes = notesEl.value;
      refreshText();
      saveSnapshot();
    });

    linkEl.addEventListener("input", () => {
      item.titleThumbLink = linkEl.value;
      saveSnapshot();
    });

    hypothesisEl.addEventListener("input", () => {
      item.hypothesisMetric = hypothesisEl.value;
      refreshText();
      saveSnapshot();
    });

    insightsEl.addEventListener("input", () => {
      item.insights = insightsEl.value;
      refreshText();
      saveSnapshot();
    });

    startBriefBtn.addEventListener("click", () => {
      matriculateStep3IdeaToBrief(item, startBriefBtn);
    });

    removeBtn.addEventListener("click", () => {
      state.step3Ideas.splice(index, 1);
      updateBoardsAndBrief();
    });

    refs.step3Board.appendChild(fragment);
  });
}

function defaultTitleScores() {
  return {
    curiosity: 5,
    clarity: 5,
    uniqueness: 5,
    promise: 5,
  };
}

function defaultThumbScores() {
  return {
    emotion: 5,
    contrast: 5,
    clarity: 5,
    intent: 5,
  };
}

function extractPhrase(text, fallback) {
  const cleaned = (text || "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return fallback;
  }

  const words = cleaned.split(" ").filter(Boolean).slice(0, 8);
  return words.join(" ");
}

function toTitleCase(text) {
  return text
    .split(" ")
    .map((part) => {
      if (!part) {
        return "";
      }

      return part[0].toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(" ");
}

function uniqueItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function averageScore(scores) {
  const values = Object.values(scores);
  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);
  return total / values.length;
}

function getTopScored(items) {
  if (!items.length) {
    return null;
  }

  return [...items].sort((a, b) => averageScore(b.scores) - averageScore(a.scores))[0];
}

function generateTitles(values) {
  const avatar = "engineers";
  const pain = values.painPoint || VIEWER_STRATEGY.primaryPain;
  const outcome = values.desiredOutcome || VIEWER_STRATEGY.desiredOutcome;
  const intrigue = values.intrigueTrigger || "one counterintuitive system shift";
  const curiosity = values.curiosityGap || "the hidden bottleneck they keep missing";
  const unique = values.uniquenessEdge || "engineering-first life and career operating system";
  const idea = values.ideaFocus || "this video concept";
  const core = extractPhrase(values.logline, `${avatar} achieve ${outcome}`);

  const patterns = [
    `I Used ${toTitleCase(intrigue)} to Fix ${toTitleCase(pain)}`,
    `The ${toTitleCase(unique)} Playbook for ${toTitleCase(avatar)}`,
    `${toTitleCase(avatar)}: Stop Doing This If You Want ${toTitleCase(outcome)}`,
    `Why Most ${toTitleCase(avatar)} Miss ${toTitleCase(curiosity)}`,
    `From ${toTitleCase(pain)} to ${toTitleCase(outcome)} (My Exact System)`,
    `I Tested ${toTitleCase(core)} for 30 Days. Here Is What Happened`,
    `${toTitleCase(idea)}: The Packaging Formula That Actually Clicks`,
    `Nobody Talks About ${toTitleCase(curiosity)} for ${toTitleCase(avatar)}`,
    `${toTitleCase(outcome)} Without Working More? Try This`,
    `The 3-Second Hook That Changed My Video Results`,
    `If Your Videos Feel Flat, Start with This ${toTitleCase(intrigue)} Trick`,
    `How to Turn One Logline Into a Click-Worthy Video Plan`,
  ];

  return uniqueItems(patterns).map((text) => ({
    text,
    scores: defaultTitleScores(),
  }));
}

function generateThumbnails(values) {
  const pain = values.painPoint || VIEWER_STRATEGY.primaryPain;
  const outcome = values.desiredOutcome || VIEWER_STRATEGY.desiredOutcome;
  const intrigue = values.intrigueTrigger || "unexpected before/after reveal";
  const curiosity = values.curiosityGap || "the missing move";
  const idea = values.ideaFocus || "this concept";

  const concepts = [
    {
      title: "Split-Screen Contradiction",
      meta: `Left: ${pain}. Right: ${outcome}. Overlay: "WHY THIS WORKS"`,
    },
    {
      title: "Big Reaction + Tiny Clue",
      meta: `Face close-up with one visual clue for ${curiosity}. Overlay: "I MISSED THIS"`,
    },
    {
      title: "Whiteboard Mechanism",
      meta: `Draw your ${intrigue} with one red circle. Overlay: "ONE SWITCH"`,
    },
    {
      title: "Before vs Blueprint",
      meta: `Messy board before, clean system after. Overlay: "ENGINEER YOUR LIFE"`,
    },
    {
      title: "Object Symbol",
      meta: `Use one symbolic object tied to ${idea}. Overlay: "STOP GUESSING"`,
    },
    {
      title: "Negative Space Punch",
      meta: `Single subject, bold contrast text. Overlay: "THIS CHANGED"`,
    },
    {
      title: "Curiosity Diagram",
      meta: `Blurred chart + one highlighted metric. Overlay: "LOOK CLOSER"`,
    },
    {
      title: "Unexpected Prop",
      meta: `Surprising prop near setup. Overlay: "NO ONE DOES THIS"`,
    },
  ];

  return concepts.map((item) => ({
    ...item,
    scores: defaultThumbScores(),
  }));
}

function parseYouTubeVideoId(input) {
  const text = (input || "").trim();
  if (!text) {
    return null;
  }

  const raw = text.includes("://") ? text : `https://${text}`;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host.endsWith("youtube.com")) {
      const fromQuery = url.searchParams.get("v");
      if (fromQuery) {
        return fromQuery;
      }

      const parts = url.pathname.split("/").filter(Boolean);
      const markers = ["embed", "shorts", "live", "v"];
      const markerIndex = parts.findIndex((part) => markers.includes(part));
      if (markerIndex >= 0 && parts[markerIndex + 1]) {
        return parts[markerIndex + 1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function getThumbUrl(videoId, quality = "hq") {
  if (quality === "max") {
    return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }

  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

async function fetchComparableMetadata(url) {
  const endpoints = [
    `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`,
    `https://noembed.com/embed?url=${encodeURIComponent(url)}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      return {
        title: (data.title || "").trim(),
        author: (data.author_name || "").trim(),
      };
    } catch {
      continue;
    }
  }

  return null;
}

function renderTitleBoard() {
  refs.titleBoard.innerHTML = "";

  if (!state.titles.length) {
    refs.titleBoard.innerHTML =
      '<p class="hint">No title ideas yet. Add your logline and click "Generate Titles".</p>';
    return;
  }

  state.titles.forEach((item, index) => {
    const fragment = refs.titleTemplate.content.cloneNode(true);
    const titleEl = fragment.querySelector(".idea-title");
    const scorePill = fragment.querySelector(".score-pill");
    titleEl.textContent = item.text;

    const scoreInputs = fragment.querySelectorAll("input[data-score]");
    scoreInputs.forEach((input) => {
      const key = input.dataset.score;
      input.value = item.scores[key];

      input.addEventListener("input", () => {
        state.titles[index].scores[key] = Number(input.value);
        updateBoardsAndBrief();
      });
    });

    scorePill.textContent = `Average Score: ${averageScore(item.scores).toFixed(1)} / 10`;
    refs.titleBoard.appendChild(fragment);
  });
}

function renderThumbBoard() {
  refs.thumbnailBoard.innerHTML = "";

  if (!state.thumbnails.length) {
    refs.thumbnailBoard.innerHTML =
      '<p class="hint">No thumbnail concepts yet. Click "Generate Thumbnails" to start.</p>';
    return;
  }

  state.thumbnails.forEach((item, index) => {
    const fragment = refs.thumbTemplate.content.cloneNode(true);
    const titleEl = fragment.querySelector(".idea-title");
    const metaEl = fragment.querySelector(".idea-meta");
    const scorePill = fragment.querySelector(".score-pill");

    titleEl.textContent = item.title;
    metaEl.textContent = item.meta;

    const scoreInputs = fragment.querySelectorAll("input[data-score]");
    scoreInputs.forEach((input) => {
      const key = input.dataset.score;
      input.value = item.scores[key];

      input.addEventListener("input", () => {
        state.thumbnails[index].scores[key] = Number(input.value);
        updateBoardsAndBrief();
      });
    });

    scorePill.textContent = `Average Score: ${averageScore(item.scores).toFixed(1)} / 10`;
    refs.thumbnailBoard.appendChild(fragment);
  });
}

function renderComparableBoard() {
  refs.comparableBoard.innerHTML = "";

  if (!state.comparables.length) {
    refs.comparableBoard.innerHTML =
      '<p class="hint">No comparables yet. Add a YouTube URL to build your reference cluster.</p>';
    return;
  }

  state.comparables.forEach((item, index) => {
    const fragment = refs.comparableTemplate.content.cloneNode(true);
    const image = fragment.querySelector(".comparable-thumb");
    const title = fragment.querySelector(".comparable-title");
    const meta = fragment.querySelector(".comparable-meta");
    const link = fragment.querySelector(".comparable-link");
    const removeBtn = fragment.querySelector(".comparable-remove");

    image.src = getThumbUrl(item.videoId, "max");
    image.onerror = () => {
      image.onerror = null;
      image.src = getThumbUrl(item.videoId, "hq");
    };

    title.textContent = item.title || `Comparable: ${item.videoId}`;
    meta.textContent = item.author
      ? `Channel: ${item.author}`
      : "Metadata unavailable. Thumbnail and URL still saved.";
    link.href = item.url;

    removeBtn.addEventListener("click", () => {
      state.comparables.splice(index, 1);
      updateBoardsAndBrief();
    });

    refs.comparableBoard.appendChild(fragment);
  });
}

function looksTitleCase(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return false;
  }

  return words.every((word) => {
    if (word.length <= 2) {
      return true;
    }

    const first = word[0];
    return first === first.toUpperCase();
  });
}

function extractOverlayWordCount(meta) {
  const match = String(meta || "").match(/overlay:\s*\"([^\"]+)\"/i);
  if (!match || !match[1]) {
    return 0;
  }

  return match[1].trim().split(/\s+/).filter(Boolean).length;
}

function evaluatePlaybookSignals(topTitle, topThumb, values) {
  const core = Number(values.ccnCore || 0);
  const casual = Number(values.ccnCasual || 0);
  const isNew = Number(values.ccnNew || 0);
  const minCCN = Math.min(core, casual, isNew);

  const ccnText =
    minCCN >= 7
      ? `CCN balance: strong (Core ${core}/10, Casual ${casual}/10, New ${isNew}/10).`
      : `CCN balance: weak (Core ${core}/10, Casual ${casual}/10, New ${isNew}/10) - growth needs all 3.`;

  if (!topTitle || !topThumb) {
    return {
      titleLengthText: "Title length check: generate ideas first.",
      thumbTextRuleText: "Thumbnail text check: generate ideas first.",
      packagingStagesText: "Stage check (Stop Scroll > Interest > Click): generate ideas first.",
      ccnText,
      stopScroll: 0,
      createInterest: 0,
      getClick: 0,
    };
  }

  const titleLength = topTitle.text.length;
  const titleCase = looksTitleCase(topTitle.text);
  let titleLengthText = "";
  if (titleLength <= 50) {
    titleLengthText = `Title length check: strong (${titleLength} chars, title-case ${titleCase ? "yes" : "no"}).`;
  } else if (titleLength <= 70) {
    titleLengthText = `Title length check: acceptable (${titleLength} chars) - try trimming toward <50.`;
  } else {
    titleLengthText = `Title length check: weak (${titleLength} chars) - over 70 is usually hard at a glance.`;
  }

  const overlayWordCount = extractOverlayWordCount(topThumb.meta);
  let thumbTextRuleText = "";
  if (overlayWordCount === 0) {
    thumbTextRuleText = "Thumbnail text check: no overlay text detected (valid if visual tells story).";
  } else if (overlayWordCount <= 5) {
    thumbTextRuleText = `Thumbnail text check: strong (${overlayWordCount} words, within <=5 guidance).`;
  } else {
    thumbTextRuleText = `Thumbnail text check: weak (${overlayWordCount} words) - trim text to <=5 words.`;
  }

  const stopScroll = (Number(topThumb.scores.contrast) + Number(topThumb.scores.emotion)) / 2;
  const createInterest = (Number(topTitle.scores.curiosity) + Number(topThumb.scores.clarity)) / 2;
  const getClick =
    (Number(topTitle.scores.promise) +
      Number(topTitle.scores.clarity) +
      Number(topThumb.scores.intent)) /
    3;
  const stageMin = Math.min(stopScroll, createInterest, getClick);
  const packagingStagesText =
    stageMin >= 7
      ? `Stage check (Stop Scroll > Interest > Click): strong (${stopScroll.toFixed(1)} / ${createInterest.toFixed(1)} / ${getClick.toFixed(1)}).`
      : `Stage check (Stop Scroll > Interest > Click): weak (${stopScroll.toFixed(1)} / ${createInterest.toFixed(1)} / ${getClick.toFixed(1)}).`;

  return {
    titleLengthText,
    thumbTextRuleText,
    packagingStagesText,
    ccnText,
    stopScroll,
    createInterest,
    getClick,
  };
}

function updateChecks(topTitle, topThumb, values) {
  const playbook = evaluatePlaybookSignals(topTitle, topThumb, values);
  refs.checkTitleLength.textContent = playbook.titleLengthText;
  refs.checkThumbTextRule.textContent = playbook.thumbTextRuleText;
  refs.checkPackagingStages.textContent = playbook.packagingStagesText;
  refs.checkCCN.textContent = playbook.ccnText;

  if (!topTitle || !topThumb) {
    refs.checkCuriosity.textContent = "Curiosity: generate ideas to evaluate";
    refs.checkClarity.textContent = "Clarity: generate ideas to evaluate";
    refs.checkUniqueness.textContent = "Uniqueness: generate ideas to evaluate";
    return;
  }

  const titleCuriosity = topTitle.scores.curiosity;
  const titleClarity = topTitle.scores.clarity;
  const titleUniqueness = topTitle.scores.uniqueness;
  const thumbClarity = topThumb.scores.clarity;
  const thumbContrast = topThumb.scores.contrast;

  refs.checkCuriosity.textContent =
    titleCuriosity >= 7
      ? `Curiosity: strong (${titleCuriosity}/10) - hook feels open-loop.`
      : `Curiosity: weak (${titleCuriosity}/10) - sharpen unknown payoff.`;

  refs.checkClarity.textContent =
    titleClarity >= 7 && thumbClarity >= 7
      ? `Clarity: strong (title ${titleClarity}/10, thumbnail ${thumbClarity}/10).`
      : "Clarity: weak - simplify language/visual to one clear promise.";

  refs.checkUniqueness.textContent =
    titleUniqueness >= 7 && thumbContrast >= 7 && Boolean(values.uniquenessEdge)
      ? "Uniqueness: strong - differentiated idea and visual contrast are clear."
      : "Uniqueness: weak - define your edge and make the image less generic.";
}

function renderTitleListHtml(items) {
  if (!items.length) {
    return "<p>No title ideas generated yet.</p>";
  }

  const rows = items
    .map((item) => {
      const score = averageScore(item.scores).toFixed(1);
      return `<li>${escapeHtml(item.text)} <span class=\"muted\">(Score: ${score}/10)</span></li>`;
    })
    .join("");

  return `<ol>${rows}</ol>`;
}

function renderThumbListHtml(items) {
  if (!items.length) {
    return "<p>No thumbnail ideas generated yet.</p>";
  }

  const rows = items
    .map((item) => {
      const score = averageScore(item.scores).toFixed(1);
      return `<li><strong>${escapeHtml(item.title)}</strong>: ${escapeHtml(item.meta)} <span class=\"muted\">(Score: ${score}/10)</span></li>`;
    })
    .join("");

  return `<ol>${rows}</ol>`;
}

function renderComparableHtml(items) {
  if (!items.length) {
    return "<p>No comparables added yet.</p>";
  }

  const cards = items
    .map((item) => {
      return `<article class=\"comparable\">\n  <img src=\"${escapeHtml(getThumbUrl(item.videoId, "hq"))}\" alt=\"Comparable thumbnail\" />\n  <div>\n    <h3>${escapeHtml(item.title || `Comparable: ${item.videoId}`)}</h3>\n    <p>${escapeHtml(item.author || "Channel metadata unavailable")}</p>\n    <a href=\"${escapeHtml(item.url)}\" target=\"_blank\" rel=\"noreferrer noopener\">Open video</a>\n  </div>\n</article>`;
    })
    .join("");

  return `<div class=\"comparables\">${cards}</div>`;
}

function buildBriefViewModel(values) {
  const topTitle = getTopScored(state.titles);
  const topThumb = getTopScored(state.thumbnails);
  const titleList = [...state.titles].sort((a, b) => averageScore(b.scores) - averageScore(a.scores));
  const thumbList = [...state.thumbnails].sort(
    (a, b) => averageScore(b.scores) - averageScore(a.scores),
  );

  return {
    generatedAt: formatDateTime(),
    topTitle,
    topThumb,
    titleList,
    thumbList,
    values,
  };
}

function buildPreviewHtml(values) {
  const model = buildBriefViewModel(values);
  const playbook = evaluatePlaybookSignals(model.topTitle, model.topThumb, values);

  return `
    <article class="brief-preview">
      <header>
        <h3>${safeText(values.projectName, "YouTube Packaging Brief")}</h3>
        <p>Generated ${escapeHtml(model.generatedAt)} · static viewer strategy: ${escapeHtml(
          VIEWER_STRATEGY.channel,
        )}</p>
      </header>
      <section>
        <h4>Viewer Strategy Reference</h4>
        <ul>
          <li><strong>Niche:</strong> ${escapeHtml(VIEWER_STRATEGY.niche)}</li>
          <li><strong>Age range:</strong> ${escapeHtml(VIEWER_STRATEGY.ageRange)}</li>
          <li><strong>Main countries:</strong> ${escapeHtml(VIEWER_STRATEGY.mainCountries)}</li>
          <li><strong>TAM:</strong> ${escapeHtml(VIEWER_STRATEGY.tamEstimate)}</li>
          <li><strong>Current baseline:</strong> ${escapeHtml(VIEWER_STRATEGY.tamCurrent)} (${escapeHtml(VIEWER_STRATEGY.tamShare)})</li>
          <li><strong>Humor profile:</strong> ${escapeHtml(VIEWER_STRATEGY.humorStyle)}</li>
          <li><strong>What they hate:</strong> ${escapeHtml(VIEWER_STRATEGY.antiPatterns)}</li>
          <li><strong>Unlock they seek:</strong> ${escapeHtml(VIEWER_STRATEGY.unlockNeed)}</li>
        </ul>
      </section>
      <section>
        <h4>Treatment</h4>
        <p>${safeText(values.treatment)}</p>
        <p><strong>References:</strong> ${safeText(values.treatmentReferences)}</p>
      </section>
      <section>
        <h4>Accelerator Playbook</h4>
        <ul>
          <li><strong>Idea funnel:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.ideaFunnel)}</li>
          <li><strong>Source mix:</strong> ${escapeHtml(values.ideaSource || ACCELERATOR_PLAYBOOK.sourceMix)}</li>
          <li><strong>CCN framework:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.ccn)}</li>
          <li><strong>Packaging stages:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.packagingStages)}</li>
          <li><strong>Traffic focus:</strong> ${safeText(values.targetTrafficSource)}</li>
          <li><strong>Upload strategy:</strong> ${safeText(values.uploadStrategy)}</li>
          <li><strong>Title guardrail:</strong> ${escapeHtml(playbook.titleLengthText)}</li>
          <li><strong>Thumbnail guardrail:</strong> ${escapeHtml(playbook.thumbTextRuleText)}</li>
          <li><strong>Stage strength:</strong> ${escapeHtml(playbook.packagingStagesText)}</li>
          <li><strong>CCN fit:</strong> ${escapeHtml(playbook.ccnText)}</li>
        </ul>
      </section>
      <section>
        <h4>Core Logline</h4>
        <p>${safeText(values.logline)}</p>
      </section>
      <section>
        <h4>Top Packaging Recommendation</h4>
        <ul>
          <li><strong>Title:</strong> ${model.topTitle ? `${escapeHtml(model.topTitle.text)} (${averageScore(model.topTitle.scores).toFixed(1)}/10)` : "N/A"}</li>
          <li><strong>Thumbnail:</strong> ${model.topThumb ? `${escapeHtml(model.topThumb.title)} (${averageScore(model.topThumb.scores).toFixed(1)}/10)` : "N/A"}</li>
        </ul>
      </section>
      <section>
        <h4>Comparable Videos</h4>
        ${renderComparableHtml(state.comparables)}
      </section>
    </article>
  `;
}

function buildExportHtml(values) {
  const model = buildBriefViewModel(values);
  const playbook = evaluatePlaybookSignals(model.topTitle, model.topThumb, values);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeText(values.projectName, "YouTube Packaging Brief")}</title>
    <style>${BRIEF_EXPORT_STYLES}</style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <p class="kicker">YouTube Brief</p>
        <h1>${safeText(values.projectName, "YouTube Packaging Brief")}</h1>
        <p>Generated ${escapeHtml(model.generatedAt)} · Channel Strategy: ${escapeHtml(VIEWER_STRATEGY.channel)}</p>
      </section>

      <section class="card">
        <h2>Viewer Strategy (Static Reference)</h2>
        <ul>
          <li><strong>Niche:</strong> ${escapeHtml(VIEWER_STRATEGY.niche)}</li>
          <li><strong>Age range:</strong> ${escapeHtml(VIEWER_STRATEGY.ageRange)}</li>
          <li><strong>Main countries:</strong> ${escapeHtml(VIEWER_STRATEGY.mainCountries)}</li>
          <li><strong>Similar channels:</strong> ${escapeHtml(VIEWER_STRATEGY.similarChannels)}</li>
          <li><strong>TAM estimate:</strong> ${escapeHtml(VIEWER_STRATEGY.tamEstimate)}</li>
          <li><strong>Current average:</strong> ${escapeHtml(VIEWER_STRATEGY.tamCurrent)}</li>
          <li><strong>% of TAM reached:</strong> ${escapeHtml(VIEWER_STRATEGY.tamShare)}</li>
          <li><strong>Audience:</strong> ${escapeHtml(VIEWER_STRATEGY.audience)}</li>
          <li><strong>Avatar:</strong> ${escapeHtml(VIEWER_STRATEGY.avatar)}</li>
          <li><strong>Cluster:</strong> ${escapeHtml(VIEWER_STRATEGY.cluster)}</li>
        </ul>
        <p class="muted">Detailed page: ${escapeHtml(VIEWER_STRATEGY.strategyPage)}</p>
      </section>

      <section class="card">
        <h2>Deep Viewer Signals (Patty-Style)</h2>
        <ul>
          <li><strong>Personality:</strong> ${escapeHtml(VIEWER_STRATEGY.personality)}</li>
          <li><strong>Humor they like:</strong> ${escapeHtml(VIEWER_STRATEGY.humorStyle)}</li>
          <li><strong>Rabbit holes:</strong> ${escapeHtml(VIEWER_STRATEGY.rabbitHoles)}</li>
          <li><strong>What they reject:</strong> ${escapeHtml(VIEWER_STRATEGY.antiPatterns)}</li>
          <li><strong>Core unlock expectation:</strong> ${escapeHtml(VIEWER_STRATEGY.unlockNeed)}</li>
        </ul>
      </section>

      <section class="card">
        <h2>Accelerator Playbook Integration</h2>
        <ul>
          <li><strong>Idea funnel:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.ideaFunnel)}</li>
          <li><strong>Source mix in this brief:</strong> ${safeText(values.ideaSource, ACCELERATOR_PLAYBOOK.sourceMix)}</li>
          <li><strong>CCN framework:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.ccn)}</li>
          <li><strong>Packaging stages:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.packagingStages)}</li>
          <li><strong>Title strategy rule:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.titleRules)}</li>
          <li><strong>Thumbnail strategy rule:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.thumbRules)}</li>
          <li><strong>Algorithm framing:</strong> ${escapeHtml(ACCELERATOR_PLAYBOOK.algorithmFrame)}</li>
          <li><strong>Traffic target:</strong> ${safeText(values.targetTrafficSource)}</li>
          <li><strong>Upload strategy:</strong> ${safeText(values.uploadStrategy)}</li>
          <li><strong>CCN fit score:</strong> Core ${safeText(values.ccnCore)} / Casual ${safeText(values.ccnCasual)} / New ${safeText(values.ccnNew)}</li>
          <li><strong>Title guardrail check:</strong> ${escapeHtml(playbook.titleLengthText)}</li>
          <li><strong>Thumbnail guardrail check:</strong> ${escapeHtml(playbook.thumbTextRuleText)}</li>
          <li><strong>Stage check:</strong> ${escapeHtml(playbook.packagingStagesText)}</li>
          <li><strong>CCN balance check:</strong> ${escapeHtml(playbook.ccnText)}</li>
        </ul>
      </section>

      <section class="grid two">
        <article class="card">
          <h2>Treatment</h2>
          <p>${safeText(values.treatment)}</p>
          <p class="muted" style="margin-top:0.5rem;"><strong>References:</strong> ${safeText(values.treatmentReferences)}</p>
        </article>
        <article class="card">
          <h2>Logline</h2>
          <p>${safeText(values.logline)}</p>
        </article>
      </section>

      <section class="card">
        <h2>Idea Inputs</h2>
        <ul>
          <li><strong>Idea focus:</strong> ${safeText(values.ideaFocus)}</li>
          <li><strong>Core pain:</strong> ${safeText(values.painPoint)}</li>
          <li><strong>Desired outcome:</strong> ${safeText(values.desiredOutcome)}</li>
          <li><strong>Intrigue trigger:</strong> ${safeText(values.intrigueTrigger)}</li>
          <li><strong>Curiosity gap:</strong> ${safeText(values.curiosityGap)}</li>
          <li><strong>Uniqueness edge:</strong> ${safeText(values.uniquenessEdge)}</li>
          <li><strong>Idea source:</strong> ${safeText(values.ideaSource)}</li>
        </ul>
      </section>

      <section class="grid two">
        <article class="card">
          <h2>Top Packaging Recommendation</h2>
          <ul>
            <li><strong>Title:</strong> ${model.topTitle ? `${escapeHtml(model.topTitle.text)} (${averageScore(model.topTitle.scores).toFixed(1)}/10)` : "N/A"}</li>
            <li><strong>Thumbnail:</strong> ${model.topThumb ? `${escapeHtml(model.topThumb.title)} (${averageScore(model.topThumb.scores).toFixed(1)}/10)` : "N/A"}</li>
            <li><strong>Curiosity check:</strong> ${escapeHtml(refs.checkCuriosity.textContent.replace("Curiosity: ", ""))}</li>
            <li><strong>Clarity check:</strong> ${escapeHtml(refs.checkClarity.textContent.replace("Clarity: ", ""))}</li>
            <li><strong>Uniqueness check:</strong> ${escapeHtml(refs.checkUniqueness.textContent.replace("Uniqueness: ", ""))}</li>
          </ul>
        </article>
        <article class="card">
          <h2>Comparable Videos</h2>
          ${renderComparableHtml(state.comparables)}
        </article>
      </section>

      <section class="grid two">
        <article class="card">
          <h2>Title Variations</h2>
          ${renderTitleListHtml(model.titleList)}
        </article>
        <article class="card">
          <h2>Thumbnail Variations</h2>
          ${renderThumbListHtml(model.thumbList)}
        </article>
      </section>
    </main>
  </body>
</html>`;
}

function updateScoreboard(values) {
  const topTitle = getTopScored(state.titles);
  const topThumb = getTopScored(state.thumbnails);

  refs.topTitle.textContent = topTitle
    ? `${topTitle.text} (${averageScore(topTitle.scores).toFixed(1)}/10)`
    : "Generate and score titles first.";

  refs.topThumb.textContent = topThumb
    ? `${topThumb.title} (${averageScore(topThumb.scores).toFixed(1)}/10)`
    : "Generate and score thumbnails first.";

  updateChecks(topTitle, topThumb, values);
}

function updateBriefOutput(values) {
  refs.briefOutput.innerHTML = buildPreviewHtml(values);
  state.latestBriefHtml = buildExportHtml(values);
}

function buildLegacySnapshotPayload(values = getFieldValues()) {
  cacheActiveChannelWorkspace(values);
  return {
    schemaVersion: 3,
    pageView: state.pageView,
    channels: state.channels,
    accounts: state.accounts,
    channelMemberships: state.channelMemberships,
    activeChannelId: state.activeChannelId,
    channelWorkspaces: state.channelWorkspaces,
  };
}

function buildWorkspacePayload(values = getFieldValues()) {
  cacheActiveChannelWorkspace(values);
  return {
    schemaVersion: 3,
    savedAt: Date.now(),
    pageView: state.pageView,
    channels: state.channels,
    accounts: state.accounts,
    channelMemberships: state.channelMemberships,
    activeChannelId: state.activeChannelId,
    channelWorkspaces: state.channelWorkspaces,
  };
}

function buildIdeasPayload() {
  cacheActiveChannelWorkspace();
  const byChannel = {};
  Object.entries(state.channelWorkspaces).forEach(([channelId, workspace]) => {
    const parsed = normalizeChannelWorkspace(workspace);
    byChannel[channelId] = {
      step1Ideas: parsed.step1Ideas,
      step2Ideas: parsed.step2Ideas,
      step3Ideas: parsed.step3Ideas,
    };
  });

  return {
    schemaVersion: 3,
    savedAt: Date.now(),
    byChannel,
  };
}

function buildBriefsPayload(values = getFieldValues()) {
  cacheActiveChannelWorkspace(values);
  const byChannel = {};
  Object.entries(state.channelWorkspaces).forEach(([channelId, workspace]) => {
    const parsed = normalizeChannelWorkspace(workspace);
    byChannel[channelId] = {
      projectName: toCleanText(parsed.values?.projectName) || "youtube-brief",
      generatedAt: formatDateTime(),
      html: parsed.latestBriefHtml || "",
    };
  });

  return {
    schemaVersion: 3,
    savedAt: Date.now(),
    currentChannelId: state.activeChannelId,
    byChannel,
  };
}

function buildDbSnapshotPayload(values = getFieldValues()) {
  return {
    workspace: buildWorkspacePayload(values),
    ideas: buildIdeasPayload(),
    briefs: buildBriefsPayload(values),
  };
}

function applyWorkspacePayload(payload = {}) {
  const isChannelPayload =
    Array.isArray(payload.channels) ||
    (payload.channelWorkspaces && typeof payload.channelWorkspaces === "object") ||
    Array.isArray(payload.accounts) ||
    Array.isArray(payload.channelMemberships);

  if (isChannelPayload) {
    state.pageView = normalizePageView(payload.pageView);
    state.channels = normalizeChannels(payload.channels);
    state.accounts = normalizeAccounts(payload.accounts);
    state.channelMemberships = normalizeChannelMemberships(payload.channelMemberships);
    state.activeChannelId = toCleanText(payload.activeChannelId);
    state.channelWorkspaces = {};

    if (payload.channelWorkspaces && typeof payload.channelWorkspaces === "object") {
      Object.entries(payload.channelWorkspaces).forEach(([channelId, workspace]) => {
        state.channelWorkspaces[channelId] = normalizeChannelWorkspace(workspace);
      });
    }

    ensureChannelModel();
    ensureChannelWorkspace(state.activeChannelId);
    applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
    return;
  }

  setFieldValues(payload.values || {});
  state.activeView = normalizeWorkspaceView(payload.activeView);
  state.ideationStepView = normalizeIdeationStep(payload.ideationStepView);
  state.briefUnlocked = Boolean(payload.briefUnlocked);
  state.matriculatedIdeaId = toCleanText(payload.matriculatedIdeaId);
  state.step1View = normalizeStep1View(payload.step1View);
  state.titles = Array.isArray(payload.titles) ? payload.titles : [];
  state.thumbnails = Array.isArray(payload.thumbnails) ? payload.thumbnails : [];
  state.comparables = Array.isArray(payload.comparables) ? payload.comparables : [];
  state.latestBriefHtml = toCleanText(payload.latestBriefHtml);
  state.channels = [createDefaultChannelRecord()];
  state.accounts = [];
  state.channelMemberships = [];
  state.activeChannelId = state.channels[0].id;
  state.channelWorkspaces = {
    [state.activeChannelId]: buildActiveChannelWorkspace(payload.values || {}),
  };
  state.pageView = "home";
  ensureChannelModel();
}

function applyIdeasPayload(payload = {}) {
  if (payload.byChannel && typeof payload.byChannel === "object") {
    Object.entries(payload.byChannel).forEach(([channelId, ideas]) => {
      if (!state.channels.some((channel) => channel.id === channelId)) {
        state.channels.push(
          createChannelRecord({
            id: channelId,
            name: `Channel ${state.channels.length + 1}`,
            ownerName: DEFAULT_OWNER_NAME,
            platform: "YouTube",
          }),
        );
      }

      ensureChannelWorkspace(channelId);
      const workspace = normalizeChannelWorkspace(state.channelWorkspaces[channelId]);
      workspace.step1Ideas = normalizeStep1Ideas(ideas?.step1Ideas);
      workspace.step2Ideas = normalizeStep2Ideas(ideas?.step2Ideas);
      workspace.step3Ideas = normalizeStep3Ideas(ideas?.step3Ideas);
      state.channelWorkspaces[channelId] = workspace;
    });

    ensureChannelModel();
    ensureChannelWorkspace(state.activeChannelId);
    applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
    return;
  }

  state.step1Ideas = normalizeStep1Ideas(payload.step1Ideas);
  state.step2Ideas = normalizeStep2Ideas(payload.step2Ideas);
  state.step3Ideas = normalizeStep3Ideas(payload.step3Ideas);
  cacheActiveChannelWorkspace();
}

function applyLegacySnapshotPayload(parsed = {}) {
  const isChannelPayload =
    Array.isArray(parsed.channels) ||
    (parsed.channelWorkspaces && typeof parsed.channelWorkspaces === "object") ||
    Array.isArray(parsed.accounts) ||
    Array.isArray(parsed.channelMemberships);

  if (isChannelPayload) {
    state.pageView = normalizePageView(parsed.pageView);
    state.channels = normalizeChannels(parsed.channels);
    state.accounts = normalizeAccounts(parsed.accounts);
    state.channelMemberships = normalizeChannelMemberships(parsed.channelMemberships);
    state.activeChannelId = toCleanText(parsed.activeChannelId);
    state.channelWorkspaces = {};
    Object.entries(parsed.channelWorkspaces || {}).forEach(([channelId, workspace]) => {
      state.channelWorkspaces[channelId] = normalizeChannelWorkspace(workspace);
    });
    ensureChannelModel();
    applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
    ensureViewAccess();
    return;
  }

  setFieldValues(parsed.values || {});
  state.activeView = normalizeWorkspaceView(parsed.activeView);
  state.ideationStepView = normalizeIdeationStep(parsed.ideationStepView);
  state.briefUnlocked = Boolean(parsed.briefUnlocked);
  state.matriculatedIdeaId = toCleanText(parsed.matriculatedIdeaId);
  state.step1View = normalizeStep1View(parsed.step1View);
  state.step1Ideas = normalizeStep1Ideas(parsed.step1Ideas);
  state.step2Ideas = normalizeStep2Ideas(parsed.step2Ideas);
  state.step3Ideas = normalizeStep3Ideas(parsed.step3Ideas);
  state.titles = Array.isArray(parsed.titles) ? parsed.titles : [];
  state.thumbnails = Array.isArray(parsed.thumbnails) ? parsed.thumbnails : [];
  state.comparables = Array.isArray(parsed.comparables) ? parsed.comparables : [];
  state.latestBriefHtml = toCleanText(parsed.latestBriefHtml);
  state.channels = [createDefaultChannelRecord()];
  state.accounts = [];
  state.channelMemberships = [];
  state.activeChannelId = state.channels[0].id;
  state.channelWorkspaces = {
    [state.activeChannelId]: buildActiveChannelWorkspace(parsed.values || {}),
  };
  state.pageView = "home";
  ensureChannelModel();
  ensureViewAccess();
}

async function persistSnapshotToDb(snapshotPayload) {
  await workspaceRepo.save(snapshotPayload.workspace);
  await ideasRepo.save(snapshotPayload.ideas);
  await briefsRepo.saveCurrent(snapshotPayload.briefs);
}

async function runQueuedSnapshotPersist() {
  if (!queuedSnapshotPayload) {
    return;
  }

  const payload = queuedSnapshotPayload;
  queuedSnapshotPayload = null;
  await persistSnapshotToDb(payload);
}

function saveSnapshot(options = {}) {
  const values = getFieldValues();
  ensureChannelModel();
  cacheActiveChannelWorkspace(values);
  const legacyPayload = buildLegacySnapshotPayload(values);
  const dbPayload = buildDbSnapshotPayload(values);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyPayload));
  return scheduleSnapshotPersist(dbPayload, Boolean(options.immediate));
}

function loadLegacySnapshotFromLocalStorage() {
  const keysToCheck = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

  for (const key of keysToCheck) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.workspace && parsed.ideas) {
        applyWorkspacePayload(parsed.workspace);
        applyIdeasPayload(parsed.ideas);
        ensureViewAccess();
        return true;
      }

      applyLegacySnapshotPayload(parsed);
      return true;
    } catch {
      continue;
    }
  }

  return false;
}

async function loadSnapshot() {
  try {
    const [workspacePayload, ideasPayload, briefsPayload] = await Promise.all([
      workspaceRepo.load(),
      ideasRepo.load(),
      briefsRepo.loadCurrent(),
    ]);

    if (workspacePayload || ideasPayload) {
      applyWorkspacePayload(workspacePayload || {});
      applyIdeasPayload(ideasPayload || {});
      const currentChannelId = toCleanText(state.activeChannelId);
      const briefHtml =
        toCleanText(briefsPayload?.byChannel?.[currentChannelId]?.html) || toCleanText(briefsPayload?.current?.html);
      if (briefHtml) {
        state.latestBriefHtml = briefHtml;
        cacheActiveChannelWorkspace();
      }
      ensureChannelModel();
      ensureViewAccess();
      return true;
    }
  } catch (error) {
    console.warn("Could not load local database snapshot.", error);
  }

  const loadedLegacy = loadLegacySnapshotFromLocalStorage();
  if (loadedLegacy) {
    void saveSnapshot({ immediate: true });
    return true;
  }

  return false;
}

async function ensureViewerProfilePersistence() {
  try {
    const existing = await viewerRepo.load();
    if (existing) {
      return;
    }

    await viewerRepo.save({
      schemaVersion: 1,
      savedAt: Date.now(),
      profile: VIEWER_STRATEGY,
    });
  } catch (error) {
    console.warn("Could not persist viewer profile to local database.", error);
  }
}

function clearPersistedWorkspace() {
  queuedSnapshotPayload = null;
  if (pendingSaveTimer) {
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  }

  return enqueuePersistTask(async () => {
    await workspaceRepo.clear();
    await ideasRepo.clear();
    await briefsRepo.clear();
  });
}

function resetAll() {
  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = "";
    }
  });

  refs.comparableUrl.value = "";
  refs.step1FastIdea.value = "";
  refs.step1QuickName.value = DEFAULT_OWNER_NAME;
  refs.step1QuickIdea.value = "";
  refs.step1QuickSource.value = "";
  refs.step1Search.value = "";
  refs.step1StatusFilter.value = "all";
  refs.step1Sort.value = "newest";
  refs.step2QuickIdea.value = "";
  refs.step3QuickIdea.value = "";
  const defaultChannel = createDefaultChannelRecord();
  const defaultAccount = createDefaultAccountRecord();
  state.pageView = "home";
  state.channels = [defaultChannel];
  state.accounts = [defaultAccount];
  state.channelMemberships = [
    createChannelMembershipRecord({
      channelId: defaultChannel.id,
      accountId: defaultAccount.id,
      role: "owner",
    }),
  ];
  state.activeChannelId = defaultChannel.id;
  state.channelWorkspaces = {
    [defaultChannel.id]: normalizeChannelWorkspace(createEmptyChannelWorkspace()),
  };
  ensureChannelModel();
  applyActiveChannelWorkspace(state.channelWorkspaces[defaultChannel.id]);

  localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  void clearPersistedWorkspace();
  applyDefaultPlaybookValues();
  applyPipelineDefaults();
  updateBoardsAndBrief();
}

function updateBoardsAndBrief(options = {}) {
  const values = getFieldValues();
  cacheActiveChannelWorkspace(values);
  renderPageView();
  renderChannelHomeBoard();

  if (state.pageView === "channel") {
    renderWorkspaceView();
    renderPipelineBoards();
    renderTitleBoard();
    renderThumbBoard();
    renderComparableBoard();
    updateScoreboard(values);
    updateBriefOutput(values);
  }

  if (options.persist !== false) {
    saveSnapshot();
  }
}

function flashButtonText(button, text, ms = 1200) {
  if (!button) {
    return;
  }

  const original = button.textContent;
  button.textContent = text;
  setTimeout(() => {
    button.textContent = original;
  }, ms);
}

function downloadBriefHtml() {
  if (!state.latestBriefHtml) {
    state.latestBriefHtml = buildExportHtml(getFieldValues());
  }

  const blob = new Blob([state.latestBriefHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = (getFieldValues().projectName || "youtube-brief")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  link.href = url;
  link.download = `${fileName || "youtube-brief"}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

function copyBriefHtml() {
  if (!navigator.clipboard) {
    return;
  }

  if (!state.latestBriefHtml) {
    state.latestBriefHtml = buildExportHtml(getFieldValues());
  }

  navigator.clipboard
    .writeText(state.latestBriefHtml)
    .then(() => {
      flashButtonText(refs.copyHtmlBtn, "Copied", 1000);
    })
    .catch(() => {
      // Clipboard permission can be denied; download remains available.
    });
}

async function addComparable() {
  const input = refs.comparableUrl.value.trim();
  const videoId = parseYouTubeVideoId(input);

  if (!videoId) {
    flashButtonText(refs.addComparableBtn, "Invalid URL", 1300);
    return;
  }

  if (state.comparables.some((item) => item.videoId === videoId)) {
    flashButtonText(refs.addComparableBtn, "Already Added", 1300);
    return;
  }

  const url = normalizeVideoUrl(videoId);
  const record = {
    videoId,
    url,
    title: "Loading metadata...",
    author: "",
  };

  state.comparables.unshift(record);
  refs.comparableUrl.value = "";
  updateBoardsAndBrief();

  const meta = await fetchComparableMetadata(url);
  if (meta) {
    record.title = meta.title || record.title;
    record.author = meta.author || "";
  } else {
    record.title = `Comparable: ${videoId}`;
  }

  updateBoardsAndBrief();
}

function updateStep1ViewState(partial) {
  state.step1View = normalizeStep1View({
    ...state.step1View,
    ...partial,
  });
  renderStep1Board();
  saveSnapshot();
}

function addStep1IdeaFast() {
  const ideaText = toCleanText(refs.step1FastIdea.value);
  if (!ideaText) {
    flashButtonText(refs.addStep1FastBtn, "Need title", 1000);
    return;
  }

  state.step1Ideas.unshift(
    createStep1Idea({
      name: refs.step1QuickName.value,
      videoIdea: ideaText,
      source: refs.step1QuickSource.value,
      status: "yellow",
    }),
  );

  refs.step1FastIdea.value = "";
  refs.step1FastIdea.focus();
  updateBoardsAndBrief();
}

function addStep1IdeaFromQuickEntry() {
  const ideaText = toCleanText(refs.step1QuickIdea.value);
  if (!ideaText) {
    flashButtonText(refs.addStep1Btn, "Need idea", 1000);
    return;
  }

  state.step1Ideas.unshift(
    createStep1Idea({
      name: refs.step1QuickName.value,
      videoIdea: ideaText,
      source: refs.step1QuickSource.value,
      status: "yellow",
    }),
  );

  refs.step1QuickIdea.value = "";
  refs.step1QuickSource.value = "";
  updateBoardsAndBrief();
}

function addStep2IdeaFromQuickEntry() {
  const ideaText = toCleanText(refs.step2QuickIdea.value);
  if (!ideaText) {
    flashButtonText(refs.addStep2Btn, "Need idea", 1000);
    return;
  }

  state.step2Ideas.unshift(
    createStep2Idea({
      videoIdea: ideaText,
      status: "yellow",
    }),
  );

  refs.step2QuickIdea.value = "";
  updateBoardsAndBrief();
}

function addStep3IdeaFromQuickEntry() {
  const ideaText = toCleanText(refs.step3QuickIdea.value);
  if (!ideaText) {
    flashButtonText(refs.addStep3Btn, "Need idea", 1000);
    return;
  }

  state.step3Ideas.unshift(
    createStep3Idea({
      videoIdea: ideaText,
      status: "yellow",
    }),
  );

  refs.step3QuickIdea.value = "";
  updateBoardsAndBrief();
}

function bindEvents() {
  refs.showHomePageBtn.addEventListener("click", () => {
    setPageView("home");
  });

  refs.showChannelPageBtn.addEventListener("click", () => {
    const activeChannel = getActiveChannelRecord();
    if (!activeChannel) {
      return;
    }

    openChannelById(activeChannel.id);
  });

  refs.jumpToIdeationBtn.addEventListener("click", () => {
    setWorkspaceView("ideation");
  });

  refs.showIdeationViewBtn.addEventListener("click", () => {
    setWorkspaceView("ideation");
  });

  refs.showBriefViewBtn.addEventListener("click", () => {
    if (!state.briefUnlocked) {
      return;
    }

    setWorkspaceView("brief");
  });

  refs.prevStepViewBtn.addEventListener("click", () => {
    setIdeationStep(state.ideationStepView - 1);
  });

  refs.nextStepViewBtn.addEventListener("click", () => {
    setIdeationStep(state.ideationStepView + 1);
  });

  refs.addStep1FastBtn.addEventListener("click", addStep1IdeaFast);
  refs.addStep1Btn.addEventListener("click", addStep1IdeaFromQuickEntry);
  refs.addStep2Btn.addEventListener("click", addStep2IdeaFromQuickEntry);
  refs.addStep3Btn.addEventListener("click", addStep3IdeaFromQuickEntry);

  refs.step1FastIdea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addStep1IdeaFast();
    }
  });

  refs.step1QuickIdea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addStep1IdeaFromQuickEntry();
    }
  });

  refs.step1QuickSource.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addStep1IdeaFromQuickEntry();
    }
  });

  refs.step1Search.addEventListener("input", () => {
    updateStep1ViewState({ query: refs.step1Search.value });
  });

  refs.step1StatusFilter.addEventListener("change", () => {
    updateStep1ViewState({ status: refs.step1StatusFilter.value });
  });

  refs.step1Sort.addEventListener("change", () => {
    updateStep1ViewState({ sort: refs.step1Sort.value });
  });

  refs.step2QuickIdea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addStep2IdeaFromQuickEntry();
    }
  });

  refs.step3QuickIdea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addStep3IdeaFromQuickEntry();
    }
  });

  document.getElementById("generateTitlesBtn").addEventListener("click", () => {
    const values = getFieldValues();
    state.titles = generateTitles(values);
    updateBoardsAndBrief();
  });

  document.getElementById("generateThumbsBtn").addEventListener("click", () => {
    const values = getFieldValues();
    state.thumbnails = generateThumbnails(values);
    updateBoardsAndBrief();
  });

  document.getElementById("saveStateBtn").addEventListener("click", async () => {
    await saveSnapshot({ immediate: true });
    await flushPersistQueue();
    flashButtonText(document.getElementById("saveStateBtn"), "Saved", 900);
  });

  document.getElementById("resetStateBtn").addEventListener("click", resetAll);
  document.getElementById("downloadBriefBtn").addEventListener("click", downloadBriefHtml);
  refs.copyHtmlBtn.addEventListener("click", copyBriefHtml);

  refs.addComparableBtn.addEventListener("click", addComparable);
  refs.comparableUrl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addComparable();
    }
  });

  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }

    const onChange = () => {
      updateScoreboard(getFieldValues());
      updateBriefOutput(getFieldValues());
      saveSnapshot();
    };

    el.addEventListener("input", onChange);
    el.addEventListener("change", onChange);
  });
}

async function init() {
  renderViewerSnapshot();
  await ensureViewerProfilePersistence();
  await loadSnapshot();
  ensureChannelModel();
  ensureChannelWorkspace(state.activeChannelId);
  applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
  state.pageView = normalizePageView(state.pageView);
  applyDefaultPlaybookValues();
  applyPipelineDefaults();
  bindEvents();
  updateBoardsAndBrief();
}

void init();
