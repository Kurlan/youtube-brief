const STORAGE_KEY = "yt-brief-studio-v7";
const LEGACY_STORAGE_KEYS = [
  "yt-brief-studio-v6",
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
const INSPIRATION_NOTES_SAVE_DEBOUNCE_MS = 700;
const MAX_LOCAL_STORAGE_SNAPSHOT_CHARS = 900000;
const MAX_IMAGE_LONG_EDGE_PX = 1280;
const MAX_UNSCALED_IMAGE_BYTES = 300000;
const IMAGE_ENCODE_QUALITY = 0.82;
const DEFAULT_OWNER_NAME = "Steve Huynh";
const IDEA_STATUSES = ["none", "red"];
const BRIEF_STATUSES = ["draft", "review", "in-production", "published"];
const STEP3_LIFECYCLE_STATUSES = ["brainstorming", "in-brief"];
const STEP1_SORT_OPTIONS = ["newest", "oldest", "title-asc", "title-desc", "name-asc"];
const BRIEF_LIST_SORT_OPTIONS = ["newest", "oldest", "tag-asc"];
const PAGE_OPTIONS = ["home", "channel", "briefs", "brief-detail"];
const CHANNEL_VIEW_OPTIONS = ["dashboard", "ideation"];
const DEFAULT_CHANNEL_ID = "channel-alifeengineered";
const DEFAULT_ACCOUNT_ID = "acct-steve-huynh";
const CHANNEL_MEMBER_ROLES = ["owner", "editor", "viewer"];
const CHANNEL_ACCESS_ROLES = ["owner"];
const CHANNEL_ASSET_KINDS = ["avatar", "banner", "thumbnail", "other"];
const BRIEF_WORKSPACE_OPTIONS = ["packaging", "scripting"];
const SCRIPTING_VIEW_OPTIONS = ["draft", "export"];
const SCRIPT_SECTION_KINDS = ["intro", "content", "sponsor", "outro"];
const SCRIPT_DRAFT_LAYOUT_OPTIONS = ["plain", "script"];
const INSPIRATION_LIBRARY_SOURCES = ["brief-inspiration", "brief-thumbnails"];
const SCRIPT_SENTENCE_TYPES = [
  { id: "", label: "Untyped", color: "#5d6770" },
  { id: "intrigue", label: "Creating Intrigue", color: "#9c6a1a" },
  { id: "question", label: "Asking a Question", color: "#96556b" },
  { id: "quote-proof", label: "Quote from Source", color: "#506da0" },
  { id: "credibility", label: "Adding Credibility", color: "#71619f" },
  { id: "core-takeaway", label: "Core Takeaways", color: "#4d7e4f" },
  { id: "supporting-fact", label: "Supporting Facts", color: "#6a645b" },
  { id: "transition", label: "Transition", color: "#0d6a71" },
  { id: "pain-point", label: "Identifying the pain point", color: "#8b4a2f" },
  { id: "cost-of-problem", label: "Cost of the problem", color: "#a14b43" },
  { id: "introducing-solution", label: "Introducing the solution", color: "#3b6f8e" },
  { id: "how-it-works", label: "Showing how it works", color: "#4f6f3c" },
  { id: "showing-result", label: "Showing the result", color: "#2f7a66" },
  { id: "removing-objections", label: "Removing objections", color: "#7c5a9a" },
  { id: "actionable-instruction", label: "Actionable instruction", color: "#1e6f7f" },
  { id: "tease", label: "Tease", color: "#b06a1f" },
];
const INTRO_TARGET_SECONDS = { min: 20, max: 35 };
// Calibrated from Steve's teleprompter read: a script estimated at 94s was actually read in 72s.
const ESTIMATED_READ_WPM = 196;
const DEFAULT_CHANNEL_ASSET_SOURCE_URL = "https://www.youtube.com/@ALifeEngineered";
const DEFAULT_CHANNEL_AVATAR_URL =
  "https://yt3.googleusercontent.com/xMADx5czTPcIhTmWROpNFrnAFB_S98l_8tq2Fwe2_t2b-hACm1xN8UWyilipkkoehvBAIzW_kBA=s160-c-k-c0x00ffffff-no-rj";
const DEFAULT_CHANNEL_BANNER_URL =
  "https://yt3.googleusercontent.com/pbVHdjiF-fat6mkzHWh0kMaRrbuhWdaEzyxit_YhKwjgcTxXiktfTBn0TYYPToKfLHc41rfpIy4=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";
const DEFAULT_CHANNEL_ASSETS = [
  {
    kind: "avatar",
    url: "https://yt3.googleusercontent.com/xMADx5czTPcIhTmWROpNFrnAFB_S98l_8tq2Fwe2_t2b-hACm1xN8UWyilipkkoehvBAIzW_kBA=s900-c-k-c0x00ffffff-no-rj",
    sourceUrl: DEFAULT_CHANNEL_ASSET_SOURCE_URL,
  },
  {
    kind: "avatar",
    url: DEFAULT_CHANNEL_AVATAR_URL,
    sourceUrl: DEFAULT_CHANNEL_ASSET_SOURCE_URL,
  },
  {
    kind: "banner",
    url: DEFAULT_CHANNEL_BANNER_URL,
    sourceUrl: DEFAULT_CHANNEL_ASSET_SOURCE_URL,
  },
  {
    kind: "banner",
    url: "https://yt3.googleusercontent.com/pbVHdjiF-fat6mkzHWh0kMaRrbuhWdaEzyxit_YhKwjgcTxXiktfTBn0TYYPToKfLHc41rfpIy4=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    sourceUrl: DEFAULT_CHANNEL_ASSET_SOURCE_URL,
  },
];
const DEFAULT_CHANNEL_STATS = {
  subscribersText: "195K subscribers",
  videosText: "217 videos",
  viewsText: "9,761,233 views",
  sourceUrl: "https://www.youtube.com/channel/UCEHFikgnRuLd1HYKTLrae9Q/about",
};

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
  "expectedViews",
  "intrigueTrigger",
  "curiosityGap",
  "uniquenessEdge",
  "treatment",
  "treatmentReferences",
  "thumbnailDirectionNotes",
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
  saveStatus: document.getElementById("saveStatus"),
  saveConflictBanner: document.getElementById("saveConflictBanner"),
  keepLocalEditsBtn: document.getElementById("keepLocalEditsBtn"),
  discardLocalEditsBtn: document.getElementById("discardLocalEditsBtn"),
  showBriefsPageBtn: document.getElementById("showBriefsPageBtn"),
  activeChannelLabel: document.getElementById("activeChannelLabel"),
  channelHomeBoard: document.getElementById("channelHomeBoard"),
  channelPageBanner: document.querySelector('[data-role="channelPageBanner"]'),
  channelPageBannerImage: document.querySelector('[data-role="channelPageBannerImage"]'),
  channelCardTemplate: document.getElementById("channelCardTemplate"),
  briefListBoard: document.getElementById("briefListBoard"),
  briefListItemTemplate: document.getElementById("briefListItemTemplate"),
  briefListSort: document.getElementById("briefListSort"),
  briefTagFilter: document.getElementById("briefTagFilter"),
  backToBriefListBtn: document.getElementById("backToBriefListBtn"),
  briefStatusSelect: document.getElementById("briefStatus"),
  briefTagsInput: document.getElementById("briefTagsInput"),
  showPackagingWorkspaceBtn: document.getElementById("showPackagingWorkspaceBtn"),
  showScriptingWorkspaceBtn: document.getElementById("showScriptingWorkspaceBtn"),
  briefWorkspaceHint: document.getElementById("briefWorkspaceHint"),
  toggleBriefDetailBtn: document.getElementById("toggleBriefDetailBtn"),
  briefDetailContent: document.getElementById("briefDetailContent"),
  briefDetailArrow: document.getElementById("briefDetailArrow"),
  toggleViewerSnapshotBtn: document.getElementById("toggleViewerSnapshotBtn"),
  viewerSnapshotContent: document.getElementById("viewerSnapshotContent"),
  viewerSnapshotArrow: document.getElementById("viewerSnapshotArrow"),
  createBriefBtn: document.getElementById("createBriefBtn"),
  jumpToIdeationBtn: document.getElementById("jumpToIdeationBtn"),
  jumpToBriefsBtn: document.getElementById("jumpToBriefsBtn"),
  prevStepViewBtn: document.getElementById("prevStepViewBtn"),
  nextStepViewBtn: document.getElementById("nextStepViewBtn"),
  jumpStep1Btn: document.getElementById("jumpStep1Btn"),
  jumpStep2Btn: document.getElementById("jumpStep2Btn"),
  jumpStep3Btn: document.getElementById("jumpStep3Btn"),
  toggleDiscardedBtn: document.getElementById("toggleDiscardedBtn"),
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
  quickTitleInput: document.getElementById("quickTitleInput"),
  addQuickTitleBtn: document.getElementById("addQuickTitleBtn"),
  thumbnailTextBoard: document.getElementById("thumbnailTextBoard"),
  quickThumbnailTextInput: document.getElementById("quickThumbnailTextInput"),
  addQuickThumbnailTextBtn: document.getElementById("addQuickThumbnailTextBtn"),
  addThumbnailUploadBtn: document.getElementById("addThumbnailUploadBtn"),
  thumbnailFileInput: document.getElementById("thumbnailFileInput"),
  thumbnailPasteZone: document.getElementById("thumbnailPasteZone"),
  thumbnailBoard: document.getElementById("thumbnailBoard"),
  comparableBoard: document.getElementById("comparableBoard"),
  comparableUrl: document.getElementById("comparableUrl"),
  addComparableBtn: document.getElementById("addComparableBtn"),
  addInspirationUploadBtn: document.getElementById("addInspirationUploadBtn"),
  toggleInspirationLibraryBtn: document.getElementById("toggleInspirationLibraryBtn"),
  inspirationFileInput: document.getElementById("inspirationFileInput"),
  inspirationPasteZone: document.getElementById("inspirationPasteZone"),
  inspirationLibraryPopover: document.getElementById("inspirationLibraryPopover"),
  inspirationLibrarySourceTabs: document.querySelectorAll("[data-inspiration-source]"),
  inspirationLibraryStatus: document.getElementById("inspirationLibraryStatus"),
  inspirationLibraryList: document.getElementById("inspirationLibraryList"),
  showScriptDraftBtn: document.getElementById("showScriptDraftBtn"),
  showScriptExportBtn: document.getElementById("showScriptExportBtn"),
  scriptingProgressHint: document.getElementById("scriptingProgressHint"),
  introSentenceLegend: document.getElementById("introSentenceLegend"),
  addScriptSectionBtn: document.getElementById("addScriptSectionBtn"),
  addIntroVariantBtn: document.getElementById("addIntroVariantBtn"),
  skeletonBoard: document.getElementById("skeletonBoard"),
  draftBoard: document.getElementById("draftBoard"),
  scriptSectionModal: document.getElementById("scriptSectionModal"),
  scriptSectionModalTitle: document.getElementById("scriptSectionModalTitle"),
  scriptSectionModalHint: document.getElementById("scriptSectionModalHint"),
  scriptSectionModalHelperHint: document.getElementById("scriptSectionModalHelperHint"),
  scriptSectionModalTextarea: document.getElementById("scriptSectionModalTextarea"),
  scriptSectionModalCancelBtn: document.getElementById("scriptSectionModalCancelBtn"),
  scriptSectionModalConfirmBtn: document.getElementById("scriptSectionModalConfirmBtn"),
  copyScriptSectionModalPromptBtn: document.getElementById("copyScriptSectionModalPromptBtn"),
  copyScriptSectionModalPlainBtn: document.getElementById("copyScriptSectionModalPlainBtn"),
  copyScriptSectionModalJsonBtn: document.getElementById("copyScriptSectionModalJsonBtn"),
  packagingPreviewLight: document.getElementById("packagingPreviewLight"),
  packagingPreviewDark: document.getElementById("packagingPreviewDark"),
  titleTemplate: document.getElementById("titleRowTemplate"),
  thumbTemplate: document.getElementById("thumbRowTemplate"),
  comparableTemplate: document.getElementById("comparableRowTemplate"),
  briefSourceType: document.getElementById("briefSourceType"),
  briefSourceIdea: document.getElementById("briefSourceIdea"),
  briefSourceNotes: document.getElementById("briefSourceNotes"),
  briefSourceTitleThumb: document.getElementById("briefSourceTitleThumb"),
  briefSourceHypothesis: document.getElementById("briefSourceHypothesis"),
  briefSourceInsights: document.getElementById("briefSourceInsights"),
  briefOutput: document.getElementById("briefOutput"),
  briefExportHint: document.getElementById("briefExportHint"),
  exportPackagingBriefPdfBtn: document.getElementById("exportPackagingBriefPdfBtn"),
  exportProductionBriefPdfBtn: document.getElementById("exportProductionBriefPdfBtn"),
  openScriptExportBtn: document.getElementById("openScriptExportBtn"),
  copyScriptMetadataJsonBtn: document.getElementById("copyScriptMetadataJsonBtn"),
  exportAnalyticsBriefBtn: document.getElementById("exportAnalyticsBriefBtn"),
  topTitle: document.getElementById("topTitle"),
  topThumb: document.getElementById("topThumb"),
  checkCuriosity: document.getElementById("checkCuriosity"),
  checkClarity: document.getElementById("checkClarity"),
  checkUniqueness: document.getElementById("checkUniqueness"),
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
  currentAccountId: DEFAULT_ACCOUNT_ID,
  channelWorkspaces: {},
  briefsByChannel: {},
  activeBriefId: "",
  channelView: "dashboard",
  ideationStepView: 1,
  showDiscarded: true,
  step1View: {
    query: "",
    status: "all",
    sort: "newest",
  },
  step1Ideas: [],
  step2Ideas: [],
  step3Ideas: [],
  titles: [],
  thumbnailTexts: [],
  thumbnails: [],
  comparables: [],
  scriptIntroGroup: null,
  scriptSections: [],
  scriptDraftLayout: "plain",
  scriptDraftShowColors: true,
  latestBriefHtml: "",
  briefDetailExpanded: false,
  viewerSnapshotExpanded: false,
  briefWorkspaceView: "packaging",
  scriptingView: "draft",
  titleExpandedId: "",
  thumbnailTextExpandedId: "",
  thumbnailExpandedId: "",
  comparableExpandedId: "",
  briefListExpandedId: "",
  briefListSort: "newest",
  briefTagFilter: "all",
  inspirationLibraryOpen: false,
  inspirationLibrarySource: "brief-inspiration",
};

const scriptSectionModalState = {
  mode: "bulk-add",
  sectionId: "",
};

let localDbPromise = null;
let remotePersistenceAvailable = null;
let remotePersistenceCheckPromise = null;
const remoteStorageUpdatedAt = {};
const remoteBriefUpdatedAt = {};
const remoteBriefSerialized = {};
const pendingBriefDeletions = new Set();
let pendingBriefActiveIds = {};
let remoteLoadFailed = false;
let saveConflictPending = false;
let remotePersistenceLastCheckedAt = 0;
let pendingSaveTimer = null;
let inspirationNotesSaveTimer = null;
let queuedSnapshotPayload = null;
let persistQueue = Promise.resolve();
let pendingTitleReorderPositions = null;
let pendingThumbnailTextReorderPositions = null;
let pendingThumbReorderPositions = null;
let pendingComparableReorderPositions = null;
let variationDragState = {
  type: "",
  id: "",
};
const DRAG_HANDLE_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="6.5" r="1.5"></circle><circle cx="8" cy="12" r="1.5"></circle><circle cx="8" cy="17.5" r="1.5"></circle><circle cx="16" cy="6.5" r="1.5"></circle><circle cx="16" cy="12" r="1.5"></circle><circle cx="16" cy="17.5" r="1.5"></circle></svg>';
const DELETE_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM7 9h2v9H7V9Z"></path></svg>';
const ARCHIVE_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v4H3V5Zm2 6h14v10H5V11Zm4 2v2h6v-2H9Z"></path></svg>';

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

  .card.major {
    border-color: rgba(208, 74, 39, 0.45);
    background: linear-gradient(160deg, #fff9f4, #ffffff);
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

  .comparables.compact {
    gap: 0.6rem;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
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

  .comparable.compact h3 {
    font-size: 0.82rem;
    line-height: 1.26;
  }

  .comparable.compact div {
    padding: 0.5rem;
    gap: 0.24rem;
  }

  .comparable.compact p {
    font-size: 0.76rem;
    line-height: 1.32;
  }

  .comparable.compact a {
    font-size: 0.74rem;
  }

  .priority-chip {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    margin: 0 0 0.28rem;
    padding: 0.14rem 0.52rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #8f2f19;
    background: #ffe3d6;
    border: 1px solid rgba(208, 74, 39, 0.32);
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

  .page-break {
    break-after: page;
    page-break-after: always;
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

async function checkRemotePersistence(force = false) {
  if (!force && remotePersistenceAvailable === true) {
    return remotePersistenceAvailable;
  }
  if (!force && remotePersistenceCheckPromise) {
    return remotePersistenceCheckPromise;
  }

  remotePersistenceCheckPromise = fetch("/api/health", {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      remotePersistenceAvailable = response.ok;
      remotePersistenceLastCheckedAt = Date.now();
      return remotePersistenceAvailable;
    })
    .catch(() => {
      remotePersistenceAvailable = false;
      remotePersistenceLastCheckedAt = Date.now();
      return false;
    })
    .finally(() => {
      remotePersistenceCheckPromise = null;
    });

  return remotePersistenceCheckPromise;
}

async function readFromRemoteStorage(key) {
  const response = await fetch(`/api/storage/${encodeURIComponent(key)}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to load ${key} from backend storage.`);
  }
  const payload = await response.json();
  remoteStorageUpdatedAt[key] = payload?.updatedAt ?? null;
  return payload?.value ?? null;
}

async function writeToRemoteStorage(key, value) {
  const response = await fetch(`/api/storage/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      value,
      source: "frontend",
      expectedUpdatedAt: Object.prototype.hasOwnProperty.call(remoteStorageUpdatedAt, key)
        ? remoteStorageUpdatedAt[key]
        : null,
    }),
  });
  if (response.status === 409) {
    const payload = await response.json().catch(() => ({}));
    remoteStorageUpdatedAt[key] = payload?.updatedAt ?? null;
    const conflictError = new Error(`Conflict while saving ${key} to backend storage.`);
    conflictError.code = "REMOTE_CONFLICT";
    throw conflictError;
  }
  if (!response.ok) {
    throw new Error(`Failed to save ${key} to backend storage.`);
  }
  const payload = await response.json().catch(() => ({}));
  remoteStorageUpdatedAt[key] = payload?.updatedAt ?? Date.now();
}

async function readBriefsFromRemoteStorage() {
  const indexResponse = await fetch("/api/briefs", {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!indexResponse.ok) {
    throw new Error("Failed to load the brief index from backend storage.");
  }
  const { briefs: index = [] } = await indexResponse.json();
  if (!index.length) {
    return null;
  }

  const loaded = await Promise.all(
    index.map(async (entry) => {
      const response = await fetch(`/api/briefs/${encodeURIComponent(entry.briefId)}`, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to load brief ${entry.briefId} from backend storage.`);
      }
      return response.json();
    }),
  );

  const byChannel = {};
  Object.keys(remoteBriefUpdatedAt).forEach((briefId) => delete remoteBriefUpdatedAt[briefId]);
  Object.keys(remoteBriefSerialized).forEach((briefId) => delete remoteBriefSerialized[briefId]);

  loaded.forEach((entry) => {
    const channelId = entry.channelId || entry.value?.channelId;
    if (!channelId) {
      return;
    }
    if (!byChannel[channelId]) {
      byChannel[channelId] = { activeBriefId: "", briefs: [] };
    }
    byChannel[channelId].briefs.push(entry.value);
    remoteBriefUpdatedAt[entry.briefId] = entry.updatedAt ?? null;
    remoteBriefSerialized[entry.briefId] = JSON.stringify(entry.value);
  });

  return { schemaVersion: 4, savedAt: Date.now(), byChannel };
}

async function writeBriefToRemoteStorage(brief) {
  const response = await fetch(`/api/briefs/${encodeURIComponent(brief.id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      value: brief,
      channelId: brief.channelId,
      source: "frontend",
      expectedUpdatedAt: Object.prototype.hasOwnProperty.call(remoteBriefUpdatedAt, brief.id)
        ? remoteBriefUpdatedAt[brief.id]
        : null,
    }),
  });
  if (response.status === 409) {
    const payload = await response.json().catch(() => ({}));
    remoteBriefUpdatedAt[brief.id] = payload?.updatedAt ?? null;
    const conflictError = new Error(`Conflict while saving brief ${brief.id} to backend storage.`);
    conflictError.code = "REMOTE_CONFLICT";
    throw conflictError;
  }
  if (!response.ok) {
    throw new Error(`Failed to save brief ${brief.id} to backend storage.`);
  }
  const payload = await response.json().catch(() => ({}));
  remoteBriefUpdatedAt[brief.id] = payload?.updatedAt ?? Date.now();
  remoteBriefSerialized[brief.id] = JSON.stringify(brief);
}

/**
 * The only supported way to remove a stored brief. A brief that is simply absent from the
 * in-memory state is never treated as deleted, so a partial load or a dropped channel cannot
 * take server rows with it.
 */
function queueBriefDeletion(briefId) {
  const id = toCleanText(briefId);
  if (!id) {
    return;
  }
  pendingBriefDeletions.add(id);
}

async function deleteBriefFromRemoteStorage(briefId) {
  const response = await fetch(`/api/briefs/${encodeURIComponent(briefId)}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Failed to delete brief ${briefId} from backend storage.`);
  }
  delete remoteBriefUpdatedAt[briefId];
  delete remoteBriefSerialized[briefId];
}

/** Writes only the briefs whose payload changed, so a save costs one brief instead of the whole collection. */
async function writeBriefsToRemoteStorage(payload) {
  const seen = new Set();
  for (const [channelId, channelData] of Object.entries(payload?.byChannel || {})) {
    for (const brief of channelData?.briefs || []) {
      if (!brief?.id) {
        continue;
      }
      seen.add(brief.id);
      const serialized = JSON.stringify(brief);
      if (remoteBriefSerialized[brief.id] === serialized) {
        continue;
      }
      await writeBriefToRemoteStorage({ ...brief, channelId: brief.channelId || channelId });
    }
  }

  for (const briefId of [...pendingBriefDeletions]) {
    if (!seen.has(briefId)) {
      await deleteBriefFromRemoteStorage(briefId);
    }
    pendingBriefDeletions.delete(briefId);
  }
}

async function deleteAllBriefsFromRemoteStorage() {
  const response = await fetch("/api/briefs", { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    throw new Error("Failed to clear briefs from backend storage.");
  }
  Object.keys(remoteBriefUpdatedAt).forEach((briefId) => delete remoteBriefUpdatedAt[briefId]);
  Object.keys(remoteBriefSerialized).forEach((briefId) => delete remoteBriefSerialized[briefId]);
  pendingBriefDeletions.clear();
}

async function deleteFromRemoteStorage(key) {
  const response = await fetch(`/api/storage/${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Failed to clear ${key} from backend storage.`);
  }
  // The row is gone, so the next write has to expect an empty slot rather than the old timestamp.
  delete remoteStorageUpdatedAt[key];
}

async function readPersistedValue(key) {
  const useRemote = await checkRemotePersistence();
  if (useRemote) {
    return readFromRemoteStorage(key);
  }
  return readFromLocalDb(key);
}

async function writePersistedValue(key, value) {
  const useRemote = await checkRemotePersistence();
  if (useRemote) {
    await writeToRemoteStorage(key, value);
    return;
  }
  await writeToLocalDb(key, value);
}

async function deletePersistedValue(key) {
  const useRemote = await checkRemotePersistence();
  if (useRemote) {
    await deleteFromRemoteStorage(key);
  }
  await deleteFromLocalDb(key);
}

async function loadBrowserLocalDbSnapshot() {
  const [workspacePayload, ideasPayload, briefsPayload] = await Promise.all([
    readFromLocalDb(LOCAL_DB_KEY_WORKSPACE),
    readFromLocalDb(LOCAL_DB_KEY_IDEAS),
    readFromLocalDb(LOCAL_DB_KEY_BRIEFS),
  ]);

  if (!workspacePayload && !ideasPayload && !briefsPayload) {
    return false;
  }

  applyWorkspacePayload(workspacePayload || {});
  applyIdeasPayload(ideasPayload || {});
  applyBriefsPayload(briefsPayload || {});
  ensureChannelModel();
  ensureChannelWorkspace(state.activeChannelId);
  ensureChannelBriefState(state.activeChannelId);
  applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
  applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
  return true;
}

async function clearBrowserLocalSnapshotCache() {
  try {
    await Promise.all([
      deleteFromLocalDb(LOCAL_DB_KEY_WORKSPACE),
      deleteFromLocalDb(LOCAL_DB_KEY_IDEAS),
      deleteFromLocalDb(LOCAL_DB_KEY_BRIEFS),
      deleteFromLocalDb(LOCAL_DB_KEY_VIEWER),
    ]);
  } catch (error) {
    console.warn("Could not clear browser IndexedDB snapshot cache.", error);
  }

  try {
    [STORAGE_KEY, ...LEGACY_STORAGE_KEYS].forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn("Could not clear browser localStorage snapshot cache.", error);
  }
}

function setSaveConflictPending(pending) {
  saveConflictPending = pending;
  if (refs.saveConflictBanner) {
    refs.saveConflictBanner.hidden = !pending;
  }
}

/** Writes the edits that are on screen over the version another client stored. */
function keepLocalEditsAfterConflict() {
  if (!saveConflictPending) {
    return Promise.resolve();
  }

  // The conflict response already refreshed the expected timestamps, so this write is accepted.
  setSaveConflictPending(false);
  setSaveStatus("saving");
  return enqueuePersistTask(runQueuedSnapshotPersist);
}

/** Throws away the edits on screen and reloads whatever the other client stored. */
function discardLocalEditsAfterConflict() {
  queuedSnapshotPayload = null;
  setSaveConflictPending(false);
  window.location.reload();
}

function enqueuePersistTask(task) {
  persistQueue = persistQueue
    .then(async () => {
      await task();
      setSaveConflictPending(false);
      setSaveStatus("saved", Date.now());
    })
    .catch(async (error) => {
      if (error && error.code === "REMOTE_CONFLICT") {
        // Another client saved after this tab loaded. Retrying would overwrite their work without
        // anyone seeing it, so writes stop here and the user picks which version survives.
        setSaveConflictPending(true);
        setSaveStatus("conflict");
        console.warn("Remote snapshot conflict detected; waiting for the user to resolve it.", error);
        return;
      }
      setSaveStatus("error");
      console.warn("Failed to persist snapshot to local database.", error);
    });

  return persistQueue;
}

function scheduleSnapshotPersist(snapshotPayload, immediate = false) {
  queuedSnapshotPayload = snapshotPayload;

  // While a conflict is unresolved the newest edits keep accumulating in the queued payload,
  // but nothing is written until the user chooses a side.
  if (saveConflictPending) {
    setSaveStatus("conflict");
    return Promise.resolve();
  }

  setSaveStatus("saving");

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
    return readPersistedValue(LOCAL_DB_KEY_WORKSPACE);
  },
  async save(payload) {
    return writePersistedValue(LOCAL_DB_KEY_WORKSPACE, payload);
  },
  async clear() {
    return deletePersistedValue(LOCAL_DB_KEY_WORKSPACE);
  },
};

const ideasRepo = {
  async load() {
    return readPersistedValue(LOCAL_DB_KEY_IDEAS);
  },
  async save(payload) {
    return writePersistedValue(LOCAL_DB_KEY_IDEAS, payload);
  },
  async clear() {
    return deletePersistedValue(LOCAL_DB_KEY_IDEAS);
  },
};

const briefsRepo = {
  async loadCurrent() {
    if (await checkRemotePersistence()) {
      return readBriefsFromRemoteStorage();
    }
    return readFromLocalDb(LOCAL_DB_KEY_BRIEFS);
  },
  async saveCurrent(payload) {
    if (await checkRemotePersistence()) {
      return writeBriefsToRemoteStorage(payload);
    }
    return writeToLocalDb(LOCAL_DB_KEY_BRIEFS, payload);
  },
  async clear() {
    if (await checkRemotePersistence()) {
      await deleteAllBriefsFromRemoteStorage();
    }
    return deleteFromLocalDb(LOCAL_DB_KEY_BRIEFS);
  },
};

const viewerRepo = {
  async load() {
    return readPersistedValue(LOCAL_DB_KEY_VIEWER);
  },
  async save(payload) {
    return writePersistedValue(LOCAL_DB_KEY_VIEWER, payload);
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

function formatClockTime(value) {
  return new Date(normalizeTimestamp(value)).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function setSaveStatus(status, timestamp = Date.now()) {
  if (!refs.saveStatus) {
    return;
  }

  const normalized = toCleanText(status).toLowerCase();
  refs.saveStatus.dataset.state = normalized;
  if (normalized === "saving") {
    refs.saveStatus.textContent = "Saving...";
    return;
  }

  if (normalized === "saved") {
    refs.saveStatus.textContent = `Saved ${formatClockTime(timestamp)}`;
    return;
  }

  if (normalized === "error") {
    refs.saveStatus.textContent = "Save failed";
    return;
  }

  if (normalized === "load-failed") {
    refs.saveStatus.textContent = "Load failed - reload to retry";
    return;
  }

  if (normalized === "conflict") {
    refs.saveStatus.textContent = "Not saved - changed elsewhere";
    return;
  }

  refs.saveStatus.textContent = "";
}

function createRecordId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeIdeaStatus(value, fallback = "none") {
  const normalized = toCleanText(value).toLowerCase();
  return IDEA_STATUSES.includes(normalized) ? normalized : fallback;
}

function normalizeStep3LifecycleStatus(value, fallback = "brainstorming") {
  return STEP3_LIFECYCLE_STATUSES.includes(value) ? value : fallback;
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
    status: normalizeIdeaStatus(seed.status, "none"),
  };
}

function createStep2Idea(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("s2"),
    videoIdea: toCleanText(seed.videoIdea),
    notes: toCleanText(seed.notes),
    hookDrafts: toCleanText(seed.hookDrafts),
    titleThumbCombos: toCleanText(seed.titleThumbCombos),
    status: normalizeIdeaStatus(seed.status, "none"),
  };
}

function createStep3Idea(seed = {}) {
  const promotedBriefId = toCleanText(seed.promotedBriefId);
  const defaultLifecycle = promotedBriefId ? "in-brief" : "brainstorming";
  return {
    id: toCleanText(seed.id) || createRecordId("s3"),
    videoIdea: toCleanText(seed.videoIdea),
    notes: toCleanText(seed.notes),
    titleThumbLink: toCleanText(seed.titleThumbLink),
    hypothesisMetric: toCleanText(seed.hypothesisMetric),
    insights: toCleanText(seed.insights),
    lifecycleStatus: normalizeStep3LifecycleStatus(seed.lifecycleStatus, defaultLifecycle),
    promotedBriefId,
    promotedAt: promotedBriefId ? normalizeTimestamp(seed.promotedAt) : null,
    status: normalizeIdeaStatus(seed.status, "none"),
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

function normalizeScoreValue(value, fallback = 0) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return fallback;
  }

  if (num < 0) {
    return 0;
  }

  if (num > 10) {
    return 10;
  }

  return num;
}

function hasLegacyNeutralScores(scores = {}, legacyValue = 5) {
  const values = Object.values(scores);
  return values.length > 0 && values.every((value) => Number(value) === Number(legacyValue));
}

function createTitleRecord(seed = {}) {
  const text = toCleanText(seed?.text);
  if (!text) {
    return null;
  }

  const defaults = defaultTitleScores();
  let scores = {
    curiosity: normalizeScoreValue(seed?.scores?.curiosity, defaults.curiosity),
    clarity: normalizeScoreValue(seed?.scores?.clarity, defaults.clarity),
    uniqueness: normalizeScoreValue(seed?.scores?.uniqueness, defaults.uniqueness),
    promise: normalizeScoreValue(seed?.scores?.promise, defaults.promise),
  };
  if (hasLegacyNeutralScores(scores, 5)) {
    scores = defaultTitleScores();
  }

  return {
    id: toCleanText(seed?.id) || createRecordId("title"),
    text,
    notes: toCleanText(seed?.notes),
    scores,
    isStrong: Boolean(seed?.isStrong),
  };
}

function normalizeTitleCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createTitleRecord(item)).filter(Boolean);
}

function createThumbnailTextRecord(seed = {}) {
  const text = toCleanText(seed?.text);
  if (!text) {
    return null;
  }

  const defaults = defaultTitleScores();
  let scores = {
    curiosity: normalizeScoreValue(seed?.scores?.curiosity, defaults.curiosity),
    clarity: normalizeScoreValue(seed?.scores?.clarity, defaults.clarity),
    uniqueness: normalizeScoreValue(seed?.scores?.uniqueness, defaults.uniqueness),
    promise: normalizeScoreValue(seed?.scores?.promise, defaults.promise),
  };
  if (hasLegacyNeutralScores(scores, 5)) {
    scores = defaultTitleScores();
  }

  return {
    id: toCleanText(seed?.id) || createRecordId("thumbtext"),
    text,
    notes: toCleanText(seed?.notes),
    scores,
    isStrong: Boolean(seed?.isStrong),
  };
}

function normalizeThumbnailTextCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createThumbnailTextRecord(item)).filter(Boolean);
}

function createThumbnailRecord(seed = {}) {
  const title = toCleanText(seed?.title);
  if (!title) {
    return null;
  }

  const defaults = defaultThumbScores();
  let scores = {
    emotion: normalizeScoreValue(seed?.scores?.emotion, defaults.emotion),
    contrast: normalizeScoreValue(seed?.scores?.contrast, defaults.contrast),
    clarity: normalizeScoreValue(seed?.scores?.clarity, defaults.clarity),
    intent: normalizeScoreValue(seed?.scores?.intent, defaults.intent),
  };
  if (hasLegacyNeutralScores(scores, 5)) {
    scores = defaultThumbScores();
  }

  return {
    id: toCleanText(seed?.id) || createRecordId("thumb"),
    title,
    creator: toCleanText(seed?.creator || seed?.author),
    meta: toCleanText(seed?.meta),
    notes: toCleanText(seed?.notes),
    imageSrc: toCleanText(seed?.imageSrc),
    scores,
  };
}

function normalizeThumbnailCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item) => createThumbnailRecord(item)).filter(Boolean);
}

function normalizeComparableCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const sourceUrl = toCleanText(item?.sourceUrl || item?.url);
      const parsedVideoId = parseYouTubeVideoId(sourceUrl);
      const videoId = toCleanText(item?.videoId) || parsedVideoId || "";
      const imageSrc = toCleanText(item?.imageSrc) || (videoId ? getThumbUrl(videoId, "hq") : "");
      if (!imageSrc) {
        return null;
      }

      return {
        id: toCleanText(item?.id) || createRecordId("insp"),
        imageSrc,
        sourceUrl: sourceUrl || (videoId ? normalizeVideoUrl(videoId) : ""),
        title: toCleanText(item?.title),
        author: toCleanText(item?.author),
        notes: toCleanText(item?.notes),
        sourceKind: toCleanText(item?.sourceKind),
        sourceCollection: toCleanText(item?.sourceCollection),
        sourceChannelId: toCleanText(item?.sourceChannelId),
        sourceChannelName: toCleanText(item?.sourceChannelName),
        sourceBriefId: toCleanText(item?.sourceBriefId),
        sourceBriefTitle: toCleanText(item?.sourceBriefTitle),
        sourceThumbnailId: toCleanText(item?.sourceThumbnailId),
        sourceThumbnailTitle: toCleanText(item?.sourceThumbnailTitle),
        videoId,
        createdAt: normalizeTimestamp(item?.createdAt),
        updatedAt: normalizeTimestamp(item?.updatedAt || item?.createdAt),
      };
    })
    .filter(Boolean);
}

function normalizeBriefValues(values = {}) {
  const source = values && typeof values === "object" ? values : {};
  return fieldIds.reduce((acc, id) => {
    acc[id] = toCleanText(source[id]);
    return acc;
  }, {});
}

function normalizeBriefWorkspaceView(value) {
  return BRIEF_WORKSPACE_OPTIONS.includes(value) ? value : "packaging";
}

function normalizeScriptingView(value) {
  const normalized = toCleanText(value);
  if (normalized === "intros" || normalized === "sections" || normalized === "skeleton") {
    return "draft";
  }
  return SCRIPTING_VIEW_OPTIONS.includes(normalized) ? normalized : "draft";
}

function normalizeScriptDraftLayout(value) {
  const normalized = toCleanText(value);
  if (normalized === "color") {
    return "plain";
  }
  if (SCRIPT_DRAFT_LAYOUT_OPTIONS.includes(normalized)) {
    return normalized;
  }
  return "plain";
}

function normalizeScriptDraftColorEnabled(value, fallback = true) {
  if (typeof value === "boolean") {
    return value;
  }
  const normalized = toCleanText(value);
  if (normalized === "color") {
    return true;
  }
  if (normalized === "plain" || normalized === "script") {
    return false;
  }
  return fallback;
}

function normalizeScriptSectionKind(value) {
  return SCRIPT_SECTION_KINDS.includes(toCleanText(value)) ? toCleanText(value) : "content";
}

function normalizeScriptSentenceType(value) {
  const type = toCleanText(value);
  return SCRIPT_SENTENCE_TYPES.some((item) => item.id === type) ? type : "";
}

function createScriptSentenceRecord(seed = {}) {
  const id = toCleanText(seed.id) || createRecordId("line");
  return {
    id,
    slotId: toCleanText(seed.slotId) || id,
    type: normalizeScriptSentenceType(seed.type),
    text: toCleanText(seed.text),
    notes: toCleanText(seed.notes),
    archivedAt: normalizeTimestamp(seed.archivedAt),
    originalIndex: Number.isInteger(seed.originalIndex) ? seed.originalIndex : null,
    replacedById: toCleanText(seed.replacedById),
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt || seed.createdAt),
  };
}

function normalizeScriptSentenceCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => createScriptSentenceRecord(item));
}

function normalizeArchivedScriptSentenceCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => createScriptSentenceRecord(item));
}

function createSponsorResourceLinkRecord(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("resource"),
    label: toCleanText(seed.label),
    url: toCleanText(seed.url),
    notes: toCleanText(seed.notes),
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt || seed.createdAt),
  };
}

function normalizeSponsorResourceLinks(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => createSponsorResourceLinkRecord(item));
}

function getDefaultIntroLabel(index) {
  return `Intro ${index + 1}`;
}

function getDefaultIntroGroupTitle() {
  return "Intro Variants";
}

function createDefaultScriptSectionSeed() {
  return [
    { title: "Part 1", kind: "content" },
    { title: "Sponsor", kind: "sponsor" },
    { title: "Part 2", kind: "content" },
    { title: "Part 3", kind: "content" },
    { title: "Outro", kind: "outro" },
  ];
}

function createDefaultIntroVariantSeed() {
  return [{ title: "Intro 1" }, { title: "Intro 2" }, { title: "Intro 3" }];
}

function createScriptSectionItemRecord(seed = {}, index = 0, fallbackText = "") {
  const baseText = toCleanText(seed.text) || toCleanText(seed.draftText);
  const id = toCleanText(seed.id) || createRecordId("item");
  return {
    id,
    slotId: toCleanText(seed.slotId) || id,
    text: fallbackText ? baseText || fallbackText : baseText,
    type: normalizeScriptSentenceType(seed.type),
    draftText: toCleanText(seed.draftText) || baseText,
    archivedAt: normalizeTimestamp(seed.archivedAt),
    originalIndex: Number.isInteger(seed.originalIndex) ? seed.originalIndex : null,
    replacedById: toCleanText(seed.replacedById),
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt || seed.createdAt),
  };
}

function createDefaultScriptSectionItems(kind = "content") {
  return [createScriptSectionItemRecord({ text: "" }, 0)];
}

function normalizeScriptSectionItemCollection(items, kind = "content") {
  if (!Array.isArray(items) || !items.length) {
    return createDefaultScriptSectionItems(kind);
  }
  return items.map((item, index) => createScriptSectionItemRecord(item, index));
}

function normalizeArchivedScriptSectionItemCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item, index) => createScriptSectionItemRecord(item, index));
}

function getLiveScriptSectionItemCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item, index) => createScriptSectionItemRecord(item, index));
}

function createScriptSectionRecord(seed = {}, index = 0, fallbackSeed = null) {
  const seedSource = seed && typeof seed === "object" ? seed : {};
  const base = fallbackSeed && typeof fallbackSeed === "object" ? fallbackSeed : {};
  const kind = normalizeScriptSectionKind(seedSource.kind || base.kind);
  return {
    id: toCleanText(seedSource.id) || createRecordId("section"),
    title: toCleanText(seedSource.title) || toCleanText(base.title) || `Section ${index + 1}`,
    kind,
    goal: toCleanText(seedSource.goal),
    summary: toCleanText(seedSource.summary),
    sponsorName: toCleanText(seedSource.sponsorName),
    sponsorTalkingPoints: toCleanText(seedSource.sponsorTalkingPoints),
    sponsorCta: toCleanText(seedSource.sponsorCta),
    sponsorHandoffNotes: toCleanText(seedSource.sponsorHandoffNotes),
    items: normalizeScriptSectionItemCollection(seedSource.items, kind),
    archivedItems: normalizeArchivedScriptSectionItemCollection(seedSource.archivedItems),
    archivedExpanded: Boolean(seedSource.archivedExpanded),
    resourceLinks: normalizeSponsorResourceLinks(seedSource.resourceLinks),
    createdAt: normalizeTimestamp(seedSource.createdAt),
    updatedAt: normalizeTimestamp(seedSource.updatedAt || seedSource.createdAt),
  };
}

function normalizeScriptSectionCollection(items) {
  const source = Array.isArray(items) ? items : [];
  const hasNewShape = source.some((item) => item && typeof item === "object" && Array.isArray(item.items));
  if (!source.length || !hasNewShape) {
    return createDefaultScriptSectionSeed().map((seed, index) => createScriptSectionRecord(seed, index, seed));
  }
  const sections = source
    .map((item, index) => createScriptSectionRecord(item, index))
    .filter((section) => normalizeScriptSectionKind(section.kind) !== "intro");
  if (sections.length) {
    return sections;
  }
  return createDefaultScriptSectionSeed().map((seed, index) => createScriptSectionRecord(seed, index, seed));
}

function createIntroVariantSectionRecord(seed = {}, index = 0) {
  return createScriptSectionRecord(
    {
      ...seed,
      title: toCleanText(seed.title || seed.label) || getDefaultIntroLabel(index),
      kind: "intro",
      items: seed.items || seed.sentences,
      archivedItems: seed.archivedItems || seed.archivedSentences,
      archivedExpanded: seed.archivedExpanded,
    },
    index,
    { title: getDefaultIntroLabel(index), kind: "intro" },
  );
}

function normalizeIntroVariantSectionCollection(items) {
  const source = Array.isArray(items) ? items : [];
  const intros = source
    .map((item, index) => createIntroVariantSectionRecord(item, index))
    .filter((section) => normalizeScriptSectionKind(section.kind) === "intro");
  if (intros.length) {
    return intros;
  }
  return createDefaultIntroVariantSeed().map((seed, index) => createIntroVariantSectionRecord(seed, index));
}

function isLiveIntroVariantSectionRecord(item) {
  return (
    item &&
    typeof item === "object" &&
    toCleanText(item.id) &&
    normalizeScriptSectionKind(item.kind) === "intro" &&
    Array.isArray(item.items) &&
    Array.isArray(item.archivedItems)
  );
}

function createScriptIntroGroupRecord(seed = {}) {
  const source = seed && typeof seed === "object" ? seed : {};
  return {
    id: toCleanText(source.id) || createRecordId("intro-group"),
    title: toCleanText(source.title) || getDefaultIntroGroupTitle(),
    variants: normalizeIntroVariantSectionCollection(source.variants),
    createdAt: normalizeTimestamp(source.createdAt),
    updatedAt: normalizeTimestamp(source.updatedAt || source.createdAt),
  };
}

function createLegacyIntroGroupRecord(items) {
  return createScriptIntroGroupRecord({
    title: getDefaultIntroGroupTitle(),
    variants: Array.isArray(items)
      ? items.map((item, index) => {
          const intro = item && typeof item === "object" ? item : {};
          return {
            id: toCleanText(intro.id) || createRecordId("intro"),
            title: toCleanText(intro.label) || getDefaultIntroLabel(index),
            kind: "intro",
            items: normalizeScriptSentenceCollection(intro.sentences).map((line) => ({
              ...line,
              draftText: toCleanText(line.text),
            })),
            archivedItems: normalizeArchivedScriptSentenceCollection(intro.archivedSentences).map((line) => ({
              ...line,
              draftText: toCleanText(line.text),
            })),
            archivedExpanded: Boolean(intro.archivedExpanded),
            createdAt: normalizeTimestamp(intro.createdAt),
            updatedAt: normalizeTimestamp(intro.updatedAt || intro.createdAt),
          };
        })
      : [],
  });
}

function normalizeScriptIntroGroup(seed = {}) {
  const source = seed && typeof seed === "object" ? seed : {};
  if (source.introGroup && typeof source.introGroup === "object") {
    return normalizeScriptIntroGroup({
      ...source.introGroup,
      intros: source.intros,
    });
  }
  if (Array.isArray(source.variants)) {
    const directGroup = createScriptIntroGroupRecord(source);
    const legacyGroup = Array.isArray(source.intros) ? createLegacyIntroGroupRecord(source.intros) : null;
    if (!hasMeaningfulIntroGroupContent(directGroup) && legacyGroup && hasMeaningfulIntroGroupContent(legacyGroup)) {
      return legacyGroup;
    }
    return directGroup;
  }
  if (Array.isArray(source.intros)) {
    return createLegacyIntroGroupRecord(source.intros);
  }
  return createScriptIntroGroupRecord({});
}

function normalizeBriefScript(seed = {}) {
  const source = seed && typeof seed === "object" ? seed : {};
  const introGroup = normalizeScriptIntroGroup({
    ...(source.introGroup && typeof source.introGroup === "object" ? source.introGroup : {}),
    intros: source.intros,
  });
  return {
    introGroup,
    intros: getIntroVariants(introGroup).map((variant, index) => ({
      id: variant.id,
      label: toCleanText(variant.title) || getDefaultIntroLabel(index),
      title: toCleanText(variant.title) || getDefaultIntroLabel(index),
      kind: "intro",
      sentences: getLiveScriptSectionItemCollection(variant.items).map((item) => ({
        id: item.id,
        slotId: item.slotId,
        type: item.type,
        text: toCleanText(item.text),
        draftText: toCleanText(item.draftText),
        notes: "",
        archivedAt: item.archivedAt,
        originalIndex: item.originalIndex,
        replacedById: item.replacedById,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      archivedSentences: normalizeArchivedScriptSectionItemCollection(variant.archivedItems).map((item) => ({
        id: item.id,
        slotId: item.slotId,
        type: item.type,
        text: toCleanText(item.text),
        draftText: toCleanText(item.draftText),
        notes: "",
        archivedAt: item.archivedAt,
        originalIndex: item.originalIndex,
        replacedById: item.replacedById,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      archivedExpanded: Boolean(variant.archivedExpanded),
      createdAt: variant.createdAt,
      updatedAt: variant.updatedAt,
    })),
    sections: normalizeScriptSectionCollection(source.sections),
  };
}

function normalizeBriefSourceSnapshot(snapshot = {}) {
  if (!snapshot || typeof snapshot !== "object") {
    return null;
  }

  const videoIdea = toCleanText(snapshot.videoIdea);
  const notes = toCleanText(snapshot.notes);
  const titleThumbLink = toCleanText(snapshot.titleThumbLink);
  const hypothesisMetric = toCleanText(snapshot.hypothesisMetric);
  const insights = toCleanText(snapshot.insights);

  const hasData = Boolean(videoIdea || notes || titleThumbLink || hypothesisMetric || insights);
  if (!hasData) {
    return null;
  }

  return {
    videoIdea,
    notes,
    titleThumbLink,
    hypothesisMetric,
    insights,
  };
}

function normalizeBriefStatus(value) {
  const parsed = toCleanText(value).toLowerCase();
  return BRIEF_STATUSES.includes(parsed) ? parsed : "draft";
}

function formatBriefStatus(value) {
  const normalized = normalizeBriefStatus(value);
  if (normalized === "review") {
    return "Review";
  }
  if (normalized === "in-production") {
    return "In production";
  }
  if (normalized === "published") {
    return "Published";
  }
  return "Draft";
}

function createStep3Snapshot(step3Idea = {}) {
  return normalizeBriefSourceSnapshot({
    videoIdea: step3Idea.videoIdea,
    notes: step3Idea.notes,
    titleThumbLink: step3Idea.titleThumbLink,
    hypothesisMetric: step3Idea.hypothesisMetric,
    insights: step3Idea.insights,
  });
}

function createBriefRecord(seed = {}) {
  const channelId = toCleanText(seed.channelId) || toCleanText(state.activeChannelId);
  const createdAt = normalizeTimestamp(seed.createdAt);
  const values = normalizeBriefValues(seed.values);

  return {
    id: toCleanText(seed.id) || createRecordId("brief"),
    channelId,
    status: normalizeBriefStatus(seed.status),
    sourceType: toCleanText(seed.sourceType) === "phase3" ? "phase3" : "manual",
    sourceIdeaId: toCleanText(seed.sourceIdeaId),
    sourceSnapshot: normalizeBriefSourceSnapshot(seed.sourceSnapshot),
    version: Number(seed.version) > 0 ? Number(seed.version) : 1,
    createdAt,
    updatedAt: normalizeTimestamp(seed.updatedAt || createdAt),
    tags: normalizeBriefTags(seed.tags),
    values,
    titles: normalizeTitleCollection(seed.titles),
    thumbnailTexts: normalizeThumbnailTextCollection(seed.thumbnailTexts),
    thumbnails: normalizeThumbnailCollection(seed.thumbnails),
    comparables: normalizeComparableCollection(seed.comparables),
    script: normalizeBriefScript(seed.script),
    latestBriefHtml: toCleanText(seed.latestBriefHtml),
  };
}

function normalizeBriefRecords(items, channelId = "") {
  if (!Array.isArray(items)) {
    return [];
  }

  const deduped = new Map();
  items.forEach((item) => {
    const parsed = createBriefRecord({
      ...item,
      channelId: toCleanText(item?.channelId) || toCleanText(channelId),
    });

    if (!parsed.channelId) {
      return;
    }

    const existing = deduped.get(parsed.id);
    if (!existing || parsed.updatedAt >= existing.updatedAt) {
      deduped.set(parsed.id, parsed);
    }
  });

  return Array.from(deduped.values()).sort((left, right) => {
    if (right.createdAt !== left.createdAt) {
      return right.createdAt - left.createdAt;
    }

    return right.updatedAt - left.updatedAt;
  });
}

function createEmptyChannelBriefState() {
  return {
    activeBriefId: "",
    briefs: [],
  };
}

function normalizeChannelBriefState(stateValue = {}, channelId = "") {
  const parsedBriefs = normalizeBriefRecords(stateValue.briefs, channelId);
  const requestedActiveBriefId = toCleanText(stateValue.activeBriefId);
  const activeBriefId =
    requestedActiveBriefId && parsedBriefs.some((brief) => brief.id === requestedActiveBriefId)
      ? requestedActiveBriefId
      : "";

  return {
    activeBriefId,
    briefs: parsedBriefs,
  };
}

function normalizeStep1View(view = {}) {
  return {
    query: toCleanText(view.query),
    status: view.status === "all" || IDEA_STATUSES.includes(view.status) ? view.status : "all",
    sort: STEP1_SORT_OPTIONS.includes(view.sort) ? view.sort : "newest",
  };
}

function normalizeShowDiscarded(value) {
  return value !== false;
}

function normalizeBriefListSort(value) {
  return BRIEF_LIST_SORT_OPTIONS.includes(value) ? value : "newest";
}

function normalizeBriefTagFilter(value) {
  const normalized = toCleanText(value);
  return normalized || "all";
}

function normalizePageView(value) {
  return PAGE_OPTIONS.includes(value) ? value : "home";
}

function normalizeChannelView(value) {
  return CHANNEL_VIEW_OPTIONS.includes(value) ? value : "dashboard";
}

function createNavigationState(seed = {}) {
  const source = seed && typeof seed === "object" ? seed : {};
  const pageView = normalizePageView(source.pageView);
  const channelId = toCleanText(source.channelId);
  const channelView = normalizeChannelView(source.channelView);
  const briefId = toCleanText(source.briefId);

  return {
    pageView,
    channelId,
    channelView,
    briefId,
  };
}

function getNavigationStateFromCurrentState() {
  const pageView = normalizePageView(state.pageView);
  const nav = createNavigationState({
    pageView,
    channelId: pageView === "home" ? "" : state.activeChannelId,
    channelView: state.channelView,
    briefId: toCleanText(state.activeBriefId),
  });

  if (nav.pageView === "brief-detail" && !nav.briefId) {
    return createNavigationState({
      pageView: "briefs",
      channelId: nav.channelId,
    });
  }

  return nav;
}

function getNavigationStateFromLocation() {
  const hash = toCleanText(window.location.hash).replace(/^#/, "");
  const hashParams = new URLSearchParams(hash);
  const hasHashParams = Array.from(hashParams.keys()).length > 0;
  const params = hasHashParams ? hashParams : new URLSearchParams(window.location.search);
  return createNavigationState({
    pageView: params.get("view"),
    channelId: params.get("channel"),
    channelView: params.get("channelView"),
    briefId: params.get("brief"),
  });
}

function areNavigationStatesEqual(left = {}, right = {}) {
  const a = createNavigationState(left);
  const b = createNavigationState(right);
  return (
    a.pageView === b.pageView &&
    a.channelId === b.channelId &&
    a.channelView === b.channelView &&
    a.briefId === b.briefId
  );
}

function buildNavigationHref(navigationState) {
  const nav = createNavigationState(navigationState);
  const params = new URLSearchParams();
  params.set("view", nav.pageView);

  if (nav.pageView !== "home" && nav.channelId) {
    params.set("channel", nav.channelId);
  }

  if (nav.pageView === "channel") {
    params.set("channelView", nav.channelView);
  }

  if (nav.pageView === "brief-detail" && nav.briefId) {
    params.set("brief", nav.briefId);
  }

  const query = params.toString();
  return `${window.location.pathname}${query ? `#${query}` : ""}`;
}

function syncNavigationHistory(mode = "push") {
  const nav = getNavigationStateFromCurrentState();
  const href = buildNavigationHref(nav);
  const currentHref = `${window.location.pathname}${window.location.hash}`;
  const currentNav = history.state && typeof history.state === "object" ? history.state.nav : null;
  const shouldReplace = mode === "replace" || currentHref === href || areNavigationStatesEqual(currentNav, nav);
  const payload = { nav };

  if (shouldReplace) {
    history.replaceState(payload, "", href);
    return;
  }

  history.pushState(payload, "", href);
}

function getResolvedNavigationChannelId(requestedChannelId = "") {
  const requestedId = toCleanText(requestedChannelId);
  const accessibleChannels = getAccessibleChannels();
  if (!accessibleChannels.length) {
    return "";
  }

  if (requestedId && accessibleChannels.some((channel) => channel.id === requestedId)) {
    return requestedId;
  }

  const currentId = toCleanText(state.activeChannelId);
  if (currentId && accessibleChannels.some((channel) => channel.id === currentId)) {
    return currentId;
  }

  return accessibleChannels[0].id;
}

function applyNavigationState(navigationState, options = {}) {
  const nav = createNavigationState(navigationState);
  const shouldPersist = options.persist !== false;
  const syncHistory = options.syncHistory !== false;
  const historyMode = options.historyMode === "replace" ? "replace" : "push";

  if (nav.pageView === "home") {
    setPageView("home", shouldPersist, { syncHistory, historyMode });
    return;
  }

  const resolvedChannelId = getResolvedNavigationChannelId(nav.channelId);
  if (!resolvedChannelId) {
    setPageView("home", shouldPersist, { syncHistory, historyMode });
    return;
  }

  state.activeChannelId = resolvedChannelId;

  if (nav.pageView === "channel") {
    state.channelView = nav.channelView;
  }

  if (nav.pageView === "brief-detail" && nav.briefId) {
    ensureChannelBriefState(resolvedChannelId);
    const briefState = normalizeChannelBriefState(state.briefsByChannel[resolvedChannelId], resolvedChannelId);
    if (briefState.briefs.some((brief) => brief.id === nav.briefId)) {
      state.activeBriefId = nav.briefId;
      briefState.activeBriefId = nav.briefId;
      state.briefsByChannel[resolvedChannelId] = briefState;
    }
  }

  setPageView(nav.pageView, shouldPersist, { syncHistory, historyMode });
}

function normalizeChannelAssetKind(value) {
  const kind = toCleanText(value).toLowerCase();
  return CHANNEL_ASSET_KINDS.includes(kind) ? kind : "other";
}

function createChannelAssetRecord(seed = {}) {
  return {
    id: toCleanText(seed.id) || createRecordId("asset"),
    kind: normalizeChannelAssetKind(seed.kind),
    url: toCleanText(seed.url),
    sourceUrl: toCleanText(seed.sourceUrl),
    createdAt: normalizeTimestamp(seed.createdAt),
    updatedAt: normalizeTimestamp(seed.updatedAt),
  };
}

function normalizeChannelAssets(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const deduped = new Map();
  items.forEach((item) => {
    const parsed = createChannelAssetRecord(item);
    if (!parsed.url) {
      return;
    }

    const key = `${parsed.kind}::${parsed.url}`;
    const existing = deduped.get(key);
    if (!existing || parsed.updatedAt > existing.updatedAt) {
      deduped.set(key, parsed);
    }
  });

  return Array.from(deduped.values());
}

function getFirstChannelAssetUrl(channelAssets, kind) {
  const match = channelAssets.find((asset) => asset.kind === kind && asset.url);
  return match ? match.url : "";
}

function createChannelStatsRecord(seed = {}) {
  return {
    subscribersText: toCleanText(seed.subscribersText),
    videosText: toCleanText(seed.videosText),
    viewsText: toCleanText(seed.viewsText),
    sourceUrl: toCleanText(seed.sourceUrl),
    updatedAt: normalizeTimestamp(seed.updatedAt),
  };
}

function normalizeChannelStats(seed = {}) {
  if (!seed || typeof seed !== "object") {
    return createChannelStatsRecord();
  }

  return createChannelStatsRecord(seed);
}

function createChannelRecord(seed = {}) {
  const name = toCleanText(seed.name) || "Untitled Channel";
  const handle = toCleanText(seed.handle) || "";
  const isDefaultChannel =
    toCleanText(seed.id) === DEFAULT_CHANNEL_ID || toCleanText(seed.handle).toLowerCase() === "@alifeengineered";
  let channelAssets = normalizeChannelAssets(seed.channelAssets || seed.assets);
  if (isDefaultChannel && !channelAssets.length) {
    channelAssets = normalizeChannelAssets(DEFAULT_CHANNEL_ASSETS);
  }
  let avatarUrl = toCleanText(seed.avatarUrl) || getFirstChannelAssetUrl(channelAssets, "avatar");
  let bannerUrl = toCleanText(seed.bannerUrl) || getFirstChannelAssetUrl(channelAssets, "banner");
  if (isDefaultChannel && !avatarUrl) {
    avatarUrl = DEFAULT_CHANNEL_AVATAR_URL;
  }
  if (isDefaultChannel && !bannerUrl) {
    bannerUrl = DEFAULT_CHANNEL_BANNER_URL;
  }
  let channelStats = normalizeChannelStats(seed.channelStats || seed.stats);
  if (isDefaultChannel && !channelStats.subscribersText && !channelStats.videosText && !channelStats.viewsText) {
    channelStats = createChannelStatsRecord({
      ...DEFAULT_CHANNEL_STATS,
      updatedAt: seed.updatedAt,
    });
  }
  return {
    id: toCleanText(seed.id) || createRecordId("ch"),
    name,
    handle,
    ownerName: toCleanText(seed.ownerName) || DEFAULT_OWNER_NAME,
    platform: toCleanText(seed.platform) || "YouTube",
    avatarUrl,
    bannerUrl,
    channelAssets,
    channelStats,
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
    avatarUrl: DEFAULT_CHANNEL_AVATAR_URL,
    bannerUrl: DEFAULT_CHANNEL_BANNER_URL,
    channelAssets: DEFAULT_CHANNEL_ASSETS,
    channelStats: {
      ...DEFAULT_CHANNEL_STATS,
      updatedAt: now,
    },
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
    ideationStepView: 1,
    showDiscarded: true,
    step1View: normalizeStep1View({}),
    step1Ideas: [],
    step2Ideas: [],
    step3Ideas: [],
  };
}

function normalizeChannelWorkspace(workspace = {}) {
  return {
    ideationStepView: normalizeIdeationStep(workspace.ideationStepView),
    showDiscarded: normalizeShowDiscarded(workspace.showDiscarded),
    step1View: normalizeStep1View(workspace.step1View),
    step1Ideas: normalizeStep1Ideas(workspace.step1Ideas),
    step2Ideas: normalizeStep2Ideas(workspace.step2Ideas),
    step3Ideas: normalizeStep3Ideas(workspace.step3Ideas),
  };
}

function extractLegacyBriefDraftFromWorkspace(workspace = {}, channelId = "") {
  const values = normalizeBriefValues(workspace.values);
  const titles = normalizeTitleCollection(workspace.titles);
  const thumbnailTexts = normalizeThumbnailTextCollection(workspace.thumbnailTexts);
  const thumbnails = normalizeThumbnailCollection(workspace.thumbnails);
  const comparables = normalizeComparableCollection(workspace.comparables);
  const latestBriefHtml = toCleanText(workspace.latestBriefHtml);
  const sourceIdeaId = toCleanText(workspace.matriculatedIdeaId);
  const sourceSnapshotIdea = normalizeStep3Ideas(workspace.step3Ideas).find((item) => item.id === sourceIdeaId);
  const sourceSnapshot = createStep3Snapshot(sourceSnapshotIdea);

  const hasMeaningfulValues = Object.values(values).some(Boolean);
  const hasData = Boolean(
    hasMeaningfulValues ||
      titles.length ||
      thumbnailTexts.length ||
      thumbnails.length ||
      comparables.length ||
      latestBriefHtml ||
      sourceIdeaId,
  );

  if (!hasData) {
    return null;
  }

  const sourceType = sourceIdeaId ? "phase3" : "manual";
  return createBriefRecord({
    channelId,
    sourceType,
    sourceIdeaId,
    sourceSnapshot,
    values,
    titles,
    thumbnailTexts,
    thumbnails,
    comparables,
    latestBriefHtml,
    updatedAt: Date.now(),
  });
}

function formatAddedAt(value) {
  return new Date(normalizeTimestamp(value)).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatStatusLabel(status) {
  const raw = toCleanText(status).toLowerCase();
  if (!raw || raw === "none") {
    return "Active";
  }

  const normalized = normalizeIdeaStatus(status, "none");
  if (normalized === "none") {
    return "Active";
  }
  return normalized === "red" ? "Discarded" : "Active";
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

function autosizeTextarea(el) {
  if (!(el instanceof HTMLTextAreaElement)) {
    return;
  }
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

function formatStatusCounts(items) {
  const counts = { none: 0, red: 0 };
  items.forEach((item) => {
    const normalized = normalizeIdeaStatus(item.status, "none");
    counts[normalized] += 1;
  });

  return `Active ${counts.none} · Discarded ${counts.red}`;
}

function applyPipelineDefaults() {
  const activeChannel = getActiveChannelRecord();
  const ownerName = getPrimaryChannelOwnerName(activeChannel);

  if (refs.step1QuickName && !toCleanText(refs.step1QuickName.value)) {
    refs.step1QuickName.value = ownerName;
  }

  state.step1View = normalizeStep1View(state.step1View);
  state.showDiscarded = normalizeShowDiscarded(state.showDiscarded);

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

function formatStep3LifecycleLabel(value) {
  return normalizeStep3LifecycleStatus(value) === "in-brief" ? "In Brief Production" : "Brainstorming";
}

function formatBriefSourceType(value) {
  return toCleanText(value) === "phase3" ? "Promoted from Phase 3" : "Manual / Retrospective";
}

function getChannelAssetUrl(channel, kind) {
  const urls = getChannelAssetUrls(channel, kind);
  return urls[0] || "";
}

function getChannelAssetUrls(channel, kind) {
  if (!channel) {
    return [];
  }

  const urls = [];

  if (kind === "avatar") {
    const avatarUrl = toCleanText(channel.avatarUrl);
    if (avatarUrl) {
      urls.push(avatarUrl);
    }
  }

  if (kind === "banner") {
    const bannerUrl = toCleanText(channel.bannerUrl);
    if (bannerUrl) {
      urls.push(bannerUrl);
    }
  }

  const channelAssets = normalizeChannelAssets(channel.channelAssets);
  channelAssets.forEach((asset) => {
    if (asset.kind === kind && asset.url) {
      urls.push(asset.url);
    }
  });

  const seen = new Set();
  return urls.filter((url) => {
    const value = toCleanText(url);
    if (!value || seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

function clearChannelAssetImage(wrapperEl, imageEl) {
  if (!wrapperEl || !imageEl) {
    return;
  }
  imageEl.onerror = null;
  imageEl.removeAttribute("src");
  imageEl.alt = "";
  wrapperEl.classList.remove("has-image");
}

function applyChannelAssetImage(wrapperEl, imageEl, urls, altText = "") {
  if (!wrapperEl || !imageEl) {
    return;
  }

  const candidates = (Array.isArray(urls) ? urls : [])
    .map((url) => toCleanText(url))
    .filter(Boolean);

  if (!candidates.length) {
    clearChannelAssetImage(wrapperEl, imageEl);
    return;
  }

  let candidateIndex = 0;

  const tryNext = () => {
    if (candidateIndex >= candidates.length) {
      clearChannelAssetImage(wrapperEl, imageEl);
      return;
    }
    imageEl.src = candidates[candidateIndex];
    candidateIndex += 1;
  };

  wrapperEl.classList.add("has-image");
  imageEl.alt = toCleanText(altText);
  imageEl.onerror = tryNext;
  tryNext();
}

function getChannelCardInitials(channel) {
  const rawName = toCleanText(channel?.name) || toCleanText(channel?.handle).replace(/^@/, "") || "Y";
  const words = rawName
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) {
    return "Y";
  }
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function formatChannelStatsLine(channel) {
  const stats = normalizeChannelStats(channel?.channelStats || channel?.stats);
  const pieces = [stats.videosText, stats.subscribersText, stats.viewsText].filter(Boolean);
  return pieces.length ? pieces.join(" • ") : "Stats unavailable";
}

function renderChannelPageBanner() {
  if (!refs.channelPageBanner || !refs.channelPageBannerImage) {
    return;
  }

  const activeChannel = getActiveChannelRecord();
  const hasActiveChannel = Boolean(activeChannel && canCurrentAccountAccessChannel(activeChannel.id));
  const bannerUrls = hasActiveChannel ? getChannelAssetUrls(activeChannel, "banner") : [];
  applyChannelAssetImage(
    refs.channelPageBanner,
    refs.channelPageBannerImage,
    bannerUrls,
    hasActiveChannel ? `${activeChannel.name} banner` : "",
  );
}

function renderChannelHomeBoard() {
  if (!refs.channelHomeBoard || !refs.channelCardTemplate) {
    return;
  }

  refs.channelHomeBoard.innerHTML = "";
  const accessibleChannels = getAccessibleChannels();

  if (!accessibleChannels.length) {
    const currentAccount = getCurrentAccountRecord();
    const viewerName = currentAccount ? currentAccount.name : "current account";
    refs.channelHomeBoard.innerHTML =
      `<p class="pipeline-empty">No accessible channels for ${escapeHtml(
        viewerName,
      )}. Channel access currently requires owner confirmation.</p>`;
    return;
  }

  accessibleChannels.forEach((channel) => {
    const fragment = refs.channelCardTemplate.content.cloneNode(true);
    const openBtn = fragment.querySelector('button[data-action="openChannel"]');
    const nameEl = fragment.querySelector('[data-role="channelName"]');
    const handleEl = fragment.querySelector('[data-role="channelHandle"]');
    const bannerWrapEl = fragment.querySelector('[data-role="channelBanner"]');
    const bannerImgEl = fragment.querySelector('[data-role="channelBannerImage"]');
    const avatarShellEl = fragment.querySelector(".channel-card-avatar-shell");
    const avatarImgEl = fragment.querySelector('[data-role="channelAvatar"]');
    const avatarFallbackEl = fragment.querySelector('[data-role="channelAvatarFallback"]');
    const statsEl = fragment.querySelector('[data-role="channelStats"]');
    const avatarUrls = getChannelAssetUrls(channel, "avatar");
    const bannerUrls = getChannelAssetUrls(channel, "banner");

    nameEl.textContent = channel.name;
    handleEl.textContent = channel.handle || channel.platform;
    avatarFallbackEl.textContent = getChannelCardInitials(channel);
    if (statsEl) {
      statsEl.textContent = formatChannelStatsLine(channel);
    }

    applyChannelAssetImage(avatarShellEl, avatarImgEl, avatarUrls, `${channel.name} avatar`);
    applyChannelAssetImage(bannerWrapEl, bannerImgEl, bannerUrls, `${channel.name} banner`);

    openBtn.disabled = false;
    openBtn.title = `Open ${channel.name}`;
    openBtn.addEventListener("click", () => {
      openChannelById(channel.id);
    });

    refs.channelHomeBoard.appendChild(fragment);
  });
}

function renderIdeationStepView() {
  const activeStep = normalizeIdeationStep(state.ideationStepView);
  state.ideationStepView = activeStep;
  state.showDiscarded = normalizeShowDiscarded(state.showDiscarded);

  document.querySelectorAll("[data-ideation-step]").forEach((stage) => {
    const isActive = Number(stage.dataset.ideationStep) === activeStep;
    stage.hidden = !isActive;
    stage.classList.toggle("is-active", isActive);
  });

  refs.prevStepViewBtn.disabled = activeStep === 1;
  refs.nextStepViewBtn.disabled = activeStep === 3;
  refs.ideationStepViewLabel.textContent = `Phase ${activeStep} of 3`;
  refs.jumpStep1Btn.classList.toggle("is-active", activeStep === 1);
  refs.jumpStep2Btn.classList.toggle("is-active", activeStep === 2);
  refs.jumpStep3Btn.classList.toggle("is-active", activeStep === 3);
  refs.toggleDiscardedBtn.textContent = state.showDiscarded ? "Hide Discarded" : "Show Discarded";
}

function setIdeationStep(step, shouldPersist = true) {
  state.ideationStepView = normalizeIdeationStep(step);
  renderIdeationStepView();

  if (shouldPersist) {
    saveSnapshot();
  }
}

function renderPageView() {
  const pageView = normalizePageView(state.pageView);
  state.pageView = pageView;
  state.channelView = normalizeChannelView(state.channelView);

  document.querySelectorAll("[data-page]").forEach((panel) => {
    panel.hidden = panel.dataset.page !== pageView;
  });

  document.querySelectorAll('[data-page="channel"][data-channel-view]').forEach((panel) => {
    if (pageView !== "channel") {
      panel.hidden = true;
      return;
    }

    panel.hidden = panel.dataset.channelView !== state.channelView;
  });

  const activeChannel = getActiveChannelRecord();
  const hasActiveChannel = Boolean(activeChannel && canCurrentAccountAccessChannel(activeChannel.id));
  const isChannelContext = hasActiveChannel && pageView !== "home";
  if (refs.showHomePageBtn) {
    refs.showHomePageBtn.classList.toggle("is-active", pageView === "home");
  }
  if (refs.showChannelPageBtn) {
    refs.showChannelPageBtn.classList.toggle("is-active", isChannelContext);
    const shouldHide = !hasActiveChannel || pageView === "channel";
    refs.showChannelPageBtn.hidden = shouldHide;
    refs.showChannelPageBtn.disabled = shouldHide;
  }
  if (refs.showBriefsPageBtn) {
    const isBriefContext = pageView === "briefs" || pageView === "brief-detail";
    refs.showBriefsPageBtn.classList.toggle("is-active", isBriefContext);
    refs.showBriefsPageBtn.setAttribute("aria-selected", String(isBriefContext));
    refs.showBriefsPageBtn.disabled = !hasActiveChannel;
  }
  if (refs.activeChannelLabel) {
    refs.activeChannelLabel.textContent = hasActiveChannel
      ? `${activeChannel.name}${activeChannel.handle ? ` · ${activeChannel.handle}` : ""}`
      : "Select a channel from Home.";
  }
}

function renderBriefDetailCollapseState() {
  const expanded = Boolean(state.briefDetailExpanded);
  if (refs.briefDetailContent) {
    refs.briefDetailContent.hidden = !expanded;
  }

  if (refs.toggleBriefDetailBtn) {
    refs.toggleBriefDetailBtn.setAttribute("aria-expanded", String(expanded));
  }
  if (refs.briefDetailArrow) {
    refs.briefDetailArrow.textContent = expanded ? "▼" : "▶";
  }
}

function renderViewerSnapshotCollapseState() {
  const expanded = Boolean(state.viewerSnapshotExpanded);
  if (refs.viewerSnapshotContent) {
    refs.viewerSnapshotContent.hidden = !expanded;
  }

  if (refs.toggleViewerSnapshotBtn) {
    refs.toggleViewerSnapshotBtn.setAttribute("aria-expanded", String(expanded));
  }
  if (refs.viewerSnapshotArrow) {
    refs.viewerSnapshotArrow.textContent = expanded ? "▼" : "▶";
  }
}

function setPageView(pageView, shouldPersist = true, options = {}) {
  const syncHistory = options.syncHistory !== false;
  const historyMode = options.historyMode === "replace" ? "replace" : "push";
  const previousPageView = normalizePageView(state.pageView);
  state.pageView = normalizePageView(pageView);

  if (state.pageView === "brief-detail" && previousPageView !== "brief-detail") {
    state.briefDetailExpanded = false;
    state.viewerSnapshotExpanded = false;
  }
  if (state.pageView === "briefs" && previousPageView !== "briefs") {
    state.briefListExpandedId = "";
  }

  if (state.pageView === "channel" || state.pageView === "briefs" || state.pageView === "brief-detail") {
    const accessibleChannels = getAccessibleChannels();
    if (!accessibleChannels.length) {
      state.pageView = "home";
    } else {
      const activeChannel = getActiveChannelRecord();
      if (!activeChannel || !canCurrentAccountAccessChannel(activeChannel.id)) {
        state.activeChannelId = accessibleChannels[0].id;
      }

      const resolvedChannel = getActiveChannelRecord();
      if (!resolvedChannel || !canCurrentAccountAccessChannel(resolvedChannel.id)) {
        state.pageView = "home";
        updateBoardsAndBrief({ persist: false, syncHistory });
        if (shouldPersist) {
          saveSnapshot();
        }
        if (syncHistory) {
          syncNavigationHistory(historyMode);
        }
        return;
      }

      ensureChannelWorkspace(resolvedChannel.id);
      ensureChannelBriefState(resolvedChannel.id);
      applyActiveChannelWorkspace(state.channelWorkspaces[resolvedChannel.id]);
      applyActiveChannelBriefState(state.briefsByChannel[resolvedChannel.id]);
      applyPipelineDefaults();
    }
  }

  updateBoardsAndBrief({ persist: false, syncHistory });

  if (shouldPersist) {
    saveSnapshot();
  }

  if (syncHistory) {
    syncNavigationHistory(historyMode);
  }
}

function openChannelById(channelId, shouldPersist = true, options = {}) {
  const syncHistory = options.syncHistory !== false;
  const historyMode = options.historyMode === "replace" ? "replace" : "push";
  const id = toCleanText(channelId);
  if (!id || !state.channels.some((channel) => channel.id === id) || !canCurrentAccountAccessChannel(id)) {
    return;
  }

  cacheActiveChannelWorkspace();
  state.activeChannelId = id;
  state.channelView = "dashboard";
  ensureChannelWorkspace(id);
  ensureChannelBriefState(id);
  applyActiveChannelWorkspace(state.channelWorkspaces[id]);
  applyActiveChannelBriefState(state.briefsByChannel[id]);
  applyPipelineDefaults();
  state.pageView = "channel";
  updateBoardsAndBrief({ persist: false, syncHistory });

  if (shouldPersist) {
    saveSnapshot();
  }

  if (syncHistory) {
    syncNavigationHistory(historyMode);
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

function withBriefDefaultValues(values = {}) {
  const parsed = normalizeBriefValues(values);
  if (!parsed.ideaSource) {
    parsed.ideaSource = "40/40/20 blend (Internal/External/Innovation)";
  }
  if (!parsed.targetTrafficSource) {
    parsed.targetTrafficSource = "Suggested/Browse hybrid";
  }
  if (!parsed.uploadStrategy) {
    parsed.uploadStrategy = "Establish > Experiment > Double Down";
  }
  if (!parsed.ccnCore) {
    parsed.ccnCore = "6";
  }
  if (!parsed.ccnCasual) {
    parsed.ccnCasual = "6";
  }
  if (!parsed.ccnNew) {
    parsed.ccnNew = "6";
  }
  return parsed;
}

function buildActiveChannelWorkspace() {
  const channelId = toCleanText(state.activeChannelId);
  const base = normalizeChannelWorkspace(state.channelWorkspaces[channelId] || createEmptyChannelWorkspace());
  return normalizeChannelWorkspace({
    ...base,
    ideationStepView: state.ideationStepView,
    showDiscarded: state.showDiscarded,
    step1View: state.step1View,
    step1Ideas: state.step1Ideas,
    step2Ideas: state.step2Ideas,
    step3Ideas: state.step3Ideas,
  });
}

function applyActiveChannelWorkspace(workspace = {}) {
  const parsed = normalizeChannelWorkspace(workspace);
  state.ideationStepView = parsed.ideationStepView;
  state.showDiscarded = parsed.showDiscarded;
  state.step1View = parsed.step1View;
  state.step1Ideas = parsed.step1Ideas;
  state.step2Ideas = parsed.step2Ideas;
  state.step3Ideas = parsed.step3Ideas;
}

function buildActiveChannelBriefState(values = getFieldValues()) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return createEmptyChannelBriefState();
  }

  ensureChannelBriefState(channelId);
  const base = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
  const requestedActiveId = toCleanText(state.activeBriefId) || base.activeBriefId;
  let hasActiveBrief = false;

  const updatedBriefs = base.briefs.map((brief) => {
    if (brief.id !== requestedActiveId) {
      return brief;
    }

    hasActiveBrief = true;
    const persistedScript = getPersistableScriptState(brief.script);
    return createBriefRecord({
      ...brief,
      channelId,
      tags: brief.tags,
      values: normalizeBriefValues(values),
      titles: state.titles,
      thumbnailTexts: state.thumbnailTexts,
      thumbnails: state.thumbnails,
      comparables: state.comparables,
      script: persistedScript,
      latestBriefHtml: state.latestBriefHtml,
      updatedAt: Date.now(),
    });
  });

  const activeBriefId = hasActiveBrief ? requestedActiveId : base.activeBriefId;
  return normalizeChannelBriefState(
    {
      activeBriefId,
      briefs: updatedBriefs,
    },
    channelId,
  );
}

function applyActiveChannelBriefState(briefState = {}) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    setFieldValues({});
    state.activeBriefId = "";
    state.titles = [];
    state.thumbnailTexts = [];
    state.thumbnails = [];
    state.comparables = [];
    state.scriptIntroGroup = normalizeScriptIntroGroup({});
    state.scriptSections = normalizeScriptSectionCollection([]);
    state.latestBriefHtml = "";
    state.inspirationLibraryOpen = false;
    state.titleExpandedId = "";
    state.thumbnailTextExpandedId = "";
    state.thumbnailExpandedId = "";
    state.comparableExpandedId = "";
    if (refs.briefTagsInput) {
      refs.briefTagsInput.value = "";
    }
    return;
  }

  const parsed = normalizeChannelBriefState(briefState, channelId);
  state.briefsByChannel[channelId] = parsed;

  const requestedActiveId = toCleanText(state.activeBriefId);
  const activeBriefId =
    requestedActiveId && parsed.briefs.some((brief) => brief.id === requestedActiveId)
      ? requestedActiveId
      : parsed.activeBriefId;
  state.activeBriefId = activeBriefId;

  const activeBrief = parsed.briefs.find((brief) => brief.id === activeBriefId) || null;
  if (!activeBrief) {
    setFieldValues({});
    state.titles = [];
    state.thumbnailTexts = [];
    state.thumbnails = [];
    state.comparables = [];
    state.scriptIntroGroup = normalizeScriptIntroGroup({});
    state.scriptSections = normalizeScriptSectionCollection([]);
    state.latestBriefHtml = "";
    state.inspirationLibraryOpen = false;
    state.titleExpandedId = "";
    state.thumbnailTextExpandedId = "";
    state.thumbnailExpandedId = "";
    state.comparableExpandedId = "";
    if (refs.briefTagsInput) {
      refs.briefTagsInput.value = "";
    }
    return;
  }

  setFieldValues(activeBrief.values || {});
  state.titles = normalizeTitleCollection(activeBrief.titles);
  state.thumbnailTexts = normalizeThumbnailTextCollection(activeBrief.thumbnailTexts);
  state.thumbnails = normalizeThumbnailCollection(activeBrief.thumbnails);
  syncProjectNameFromTopTitle();
  state.comparables = normalizeComparableCollection(activeBrief.comparables);
  state.scriptIntroGroup = normalizeScriptIntroGroup(activeBrief.script);
  state.scriptSections = normalizeScriptSectionCollection(activeBrief.script?.sections);
  state.latestBriefHtml = toCleanText(activeBrief.latestBriefHtml);
  state.inspirationLibraryOpen = false;
  if (refs.briefTagsInput) {
    refs.briefTagsInput.value = formatBriefTags(activeBrief.tags);
  }
  state.titleExpandedId = "";
  state.thumbnailTextExpandedId = "";
  state.thumbnailExpandedId = "";
  state.comparableExpandedId = "";
}

function cacheActiveChannelWorkspace(values = getFieldValues()) {
  cacheActiveChannelBriefState(values);
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return;
  }

  state.channelWorkspaces[channelId] = buildActiveChannelWorkspace();
  const channel = state.channels.find((entry) => entry.id === channelId);
  if (channel) {
    channel.updatedAt = Date.now();
  }
}

function cacheActiveChannelBriefState(values = getFieldValues()) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return;
  }

  state.briefsByChannel[channelId] = buildActiveChannelBriefState(values);
  state.activeBriefId = state.briefsByChannel[channelId].activeBriefId;
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

function ensureChannelBriefState(channelId) {
  const id = toCleanText(channelId);
  if (!id) {
    return;
  }

  state.briefsByChannel[id] = normalizeChannelBriefState(
    state.briefsByChannel[id] || createEmptyChannelBriefState(),
    id,
  );
}

function getActiveChannelBriefState() {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return createEmptyChannelBriefState();
  }

  ensureChannelBriefState(channelId);
  return state.briefsByChannel[channelId];
}

function getActiveBriefRecord() {
  const briefState = getActiveChannelBriefState();
  const briefId = toCleanText(state.activeBriefId) || briefState.activeBriefId;
  if (!briefId) {
    return null;
  }

  return (
    briefState.briefs.find((brief) => brief.id === briefId) ||
    briefState.briefs.find((brief) => brief.id === briefState.activeBriefId) ||
    null
  );
}

function getActiveChannelRecord() {
  const id = toCleanText(state.activeChannelId);
  return state.channels.find((channel) => channel.id === id) || null;
}

function getCurrentAccountRecord() {
  const id = toCleanText(state.currentAccountId);
  if (!id) {
    return null;
  }

  return state.accounts.find((account) => account.id === id) || null;
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

function canAccountAccessChannel(channelId, accountId) {
  const targetChannelId = toCleanText(channelId);
  const targetAccountId = toCleanText(accountId);
  if (!targetChannelId || !targetAccountId) {
    return false;
  }

  return state.channelMemberships.some((membership) => {
    return (
      membership.channelId === targetChannelId &&
      membership.accountId === targetAccountId &&
      CHANNEL_ACCESS_ROLES.includes(membership.role)
    );
  });
}

function canCurrentAccountAccessChannel(channelId) {
  return canAccountAccessChannel(channelId, state.currentAccountId);
}

function getAccessibleChannels(accountId = state.currentAccountId) {
  const targetAccountId = toCleanText(accountId);
  if (!targetAccountId) {
    return [];
  }

  return state.channels.filter((channel) => canAccountAccessChannel(channel.id, targetAccountId));
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

  if (!state.currentAccountId || !state.accounts.some((account) => account.id === state.currentAccountId)) {
    const defaultAccount = state.accounts.find((account) => account.id === DEFAULT_ACCOUNT_ID) || state.accounts[0];
    state.currentAccountId = defaultAccount?.id || "";
  }

  const channelIdSet = new Set(state.channels.map((channel) => channel.id));
  const accountIdSet = new Set(state.accounts.map((account) => account.id));
  state.channelMemberships = state.channelMemberships.filter((membership) => {
    return channelIdSet.has(membership.channelId) && accountIdSet.has(membership.accountId);
  });

  const normalizedBriefsByChannel = {};
  state.channels.forEach((channel) => {
    ensureChannelWorkspace(channel.id);
    ensureChannelBriefState(channel.id);
    normalizedBriefsByChannel[channel.id] = normalizeChannelBriefState(
      state.briefsByChannel[channel.id],
      channel.id,
    );
    ensureOwnerMembershipForChannel(channel);
  });
  state.briefsByChannel = normalizedBriefsByChannel;

  state.accounts = normalizeAccounts(state.accounts);
  state.channelMemberships = normalizeChannelMemberships(state.channelMemberships);

  const accessibleChannels = getAccessibleChannels(state.currentAccountId);
  if (!state.activeChannelId || !accessibleChannels.some((channel) => channel.id === state.activeChannelId)) {
    state.activeChannelId = accessibleChannels[0]?.id || state.channels[0]?.id || "";
  }

  const activeChannelBriefState = state.briefsByChannel[state.activeChannelId] || createEmptyChannelBriefState();
  if (!activeChannelBriefState.briefs.some((brief) => brief.id === state.activeBriefId)) {
    state.activeBriefId = activeChannelBriefState.activeBriefId;
  }
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

function formatBriefUpdatedAt(value) {
  return new Date(normalizeTimestamp(value)).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatBriefCreatedAt(value) {
  return new Date(normalizeTimestamp(value)).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getBriefDisplayTitle(brief, index = 0) {
  const projectName = toCleanText(brief?.values?.projectName);
  if (projectName) {
    return projectName;
  }

  const sourceIdea = toCleanText(brief?.sourceSnapshot?.videoIdea);
  if (sourceIdea) {
    return sourceIdea;
  }

  return `Brief ${index + 1}`;
}

function setActiveBrief(briefId, shouldPersist = true) {
  const channelId = toCleanText(state.activeChannelId);
  const targetBriefId = toCleanText(briefId);
  if (!channelId || !targetBriefId) {
    return false;
  }

  cacheActiveChannelBriefState();
  const briefState = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
  if (!briefState.briefs.some((brief) => brief.id === targetBriefId)) {
    return false;
  }

  briefState.activeBriefId = targetBriefId;
  state.briefsByChannel[channelId] = briefState;
  state.activeBriefId = targetBriefId;
  state.briefWorkspaceView = "packaging";
  applyActiveChannelBriefState(briefState);

  if (shouldPersist) {
    saveSnapshot();
  }

  return true;
}

function updateActiveBriefStatus(statusValue) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return false;
  }

  cacheActiveChannelBriefState();
  const briefState = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
  const activeBriefId = toCleanText(state.activeBriefId) || briefState.activeBriefId;
  if (!activeBriefId) {
    return false;
  }

  const nextStatus = normalizeBriefStatus(statusValue);
  let changed = false;
  const nextBriefs = briefState.briefs.map((brief) => {
    if (brief.id !== activeBriefId) {
      return brief;
    }

    changed = true;
    return createBriefRecord({
      ...brief,
      status: nextStatus,
      updatedAt: Date.now(),
    });
  });

  if (!changed) {
    return false;
  }

  const nextState = normalizeChannelBriefState(
    {
      activeBriefId,
      briefs: nextBriefs,
    },
    channelId,
  );
  state.briefsByChannel[channelId] = nextState;
  state.activeBriefId = activeBriefId;
  applyActiveChannelBriefState(nextState);
  return true;
}

function updateActiveBriefTags(tagsValue) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return false;
  }

  cacheActiveChannelBriefState();
  const briefState = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
  const activeBriefId = toCleanText(state.activeBriefId) || briefState.activeBriefId;
  if (!activeBriefId) {
    return false;
  }

  const nextTags = normalizeBriefTags(tagsValue);
  let changed = false;
  const nextBriefs = briefState.briefs.map((brief) => {
    if (brief.id !== activeBriefId) {
      return brief;
    }
    if (formatBriefTags(brief.tags) === formatBriefTags(nextTags)) {
      return brief;
    }

    changed = true;
    return createBriefRecord({
      ...brief,
      tags: nextTags,
      updatedAt: Date.now(),
    });
  });

  if (!changed) {
    return false;
  }

  const nextState = normalizeChannelBriefState(
    {
      activeBriefId,
      briefs: nextBriefs,
    },
    channelId,
  );
  state.briefsByChannel[channelId] = nextState;
  state.activeBriefId = activeBriefId;
  applyActiveChannelBriefState(nextState);
  return true;
}

function createManualBrief() {
  const channel = getActiveChannelRecord();
  if (!channel) {
    return null;
  }

  const channelId = channel.id;
  cacheActiveChannelBriefState();
  ensureChannelBriefState(channelId);

  const current = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
  const nextIndex = current.briefs.length + 1;
  const brief = createBriefRecord({
    channelId,
    sourceType: "manual",
    values: withBriefDefaultValues({
      projectName: `${channel.name} Brief ${nextIndex}`,
    }),
  });

  const nextState = normalizeChannelBriefState(
    {
      activeBriefId: brief.id,
      briefs: [brief, ...current.briefs],
    },
    channelId,
  );
  state.briefsByChannel[channelId] = nextState;
  state.activeBriefId = brief.id;
  state.briefWorkspaceView = "packaging";
  applyActiveChannelBriefState(nextState);
  return brief;
}

function buildBriefFromStep3Idea(step3Idea = {}) {
  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return null;
  }

  const ideaText = toCleanText(step3Idea.videoIdea);
  const treatment = [toCleanText(step3Idea.notes), toCleanText(step3Idea.insights)]
    .filter(Boolean)
    .join("\n\n");

  return createBriefRecord({
    channelId,
    sourceType: "phase3",
    sourceIdeaId: toCleanText(step3Idea.id),
    sourceSnapshot: createStep3Snapshot(step3Idea),
    values: withBriefDefaultValues({
      projectName: ideaText || "Production Brief",
      ideaFocus: ideaText,
      treatment,
      logline: toCleanText(step3Idea.hypothesisMetric),
    }),
  });
}

function promoteStep3IdeaToBrief(step3Idea, button) {
  const ideaText = toCleanText(step3Idea?.videoIdea);
  if (!ideaText) {
    flashButtonText(button, "Need idea", 1000);
    return;
  }

  const existingBriefId = toCleanText(step3Idea.promotedBriefId);
  if (existingBriefId && setActiveBrief(existingBriefId, false)) {
    setPageView("brief-detail");
    return;
  }

  const channelId = toCleanText(state.activeChannelId);
  if (!channelId) {
    return;
  }

  cacheActiveChannelBriefState();
  ensureChannelBriefState(channelId);
  const brief = buildBriefFromStep3Idea(step3Idea);
  if (!brief) {
    return;
  }

  const current = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
  const nextState = normalizeChannelBriefState(
    {
      activeBriefId: brief.id,
      briefs: [brief, ...current.briefs],
    },
    channelId,
  );

  state.briefsByChannel[channelId] = nextState;
  state.activeBriefId = brief.id;
  state.briefWorkspaceView = "packaging";
  step3Idea.lifecycleStatus = "in-brief";
  step3Idea.promotedBriefId = brief.id;
  step3Idea.promotedAt = Date.now();
  step3Idea.status = "none";
  applyActiveChannelBriefState(nextState);
  setPageView("brief-detail");
}

function renderBriefSourceSnapshot() {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    if (refs.briefStatusSelect) {
      refs.briefStatusSelect.value = "draft";
    }
    refs.briefSourceType.textContent = "Manual brief";
    refs.briefSourceIdea.textContent = "Not linked to a phase 3 idea.";
    refs.briefSourceNotes.textContent = "No phase 3 snapshot data.";
    refs.briefSourceTitleThumb.textContent = "No phase 3 snapshot data.";
    refs.briefSourceHypothesis.textContent = "No phase 3 snapshot data.";
    refs.briefSourceInsights.textContent = "No phase 3 snapshot data.";
    return;
  }

  const snapshot = activeBrief.sourceSnapshot || {};
  if (refs.briefStatusSelect) {
    refs.briefStatusSelect.value = normalizeBriefStatus(activeBrief.status);
  }
  refs.briefSourceType.textContent = formatBriefSourceType(activeBrief.sourceType);
  refs.briefSourceIdea.textContent = toCleanText(snapshot.videoIdea) || "Not linked to a phase 3 idea.";
  refs.briefSourceNotes.textContent = toCleanText(snapshot.notes) || "No phase 3 notes captured.";
  refs.briefSourceTitleThumb.textContent =
    toCleanText(snapshot.titleThumbLink) || "No title + thumbnail link captured.";
  refs.briefSourceHypothesis.textContent =
    toCleanText(snapshot.hypothesisMetric) || "No hypothesis + metric captured.";
  refs.briefSourceInsights.textContent = toCleanText(snapshot.insights) || "No insights captured.";
}

function getScriptSentenceTypeMeta(type) {
  return SCRIPT_SENTENCE_TYPES.find((item) => item.id === normalizeScriptSentenceType(type)) || SCRIPT_SENTENCE_TYPES[0];
}

function countWords(value) {
  return toCleanText(value)
    .split(/\s+/)
    .filter(Boolean).length;
}

function estimateReadSeconds(value) {
  const words = countWords(value);
  if (!words) {
    return 0;
  }
  return Math.max(1, Math.round((words / ESTIMATED_READ_WPM) * 60));
}

function formatDurationShort(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${String(remainder).padStart(2, "0")}s`;
}

function getSectionPlainText(section = {}) {
  return getLiveScriptSectionItemCollection(section.items)
    .map((item) => toCleanText(item.text))
    .filter(Boolean)
    .join("\n");
}

function getIntroVariants(group = state.scriptIntroGroup) {
  if (!group || typeof group !== "object") {
    return normalizeIntroVariantSectionCollection([]);
  }
  if (Array.isArray(group.variants) && group.variants.length && group.variants.every(isLiveIntroVariantSectionRecord)) {
    return group.variants;
  }
  group.variants = normalizeIntroVariantSectionCollection(group.variants);
  return group.variants;
}

function getIntroVariantDurationSeconds(section = {}) {
  return getSectionDurationSeconds(section);
}

function getIntroVariantWordCount(section = {}) {
  return getLiveScriptSectionItemCollection(section.items).reduce((sum, item) => sum + countWords(item.text), 0);
}

function getIntroVariantPlainText(section = {}) {
  return getSectionPlainText(section);
}

function normalizeIntroVariants(items) {
  return normalizeIntroVariantSectionCollection(items);
}

function getIntroDurationSeconds(intro = {}) {
  return getIntroVariantDurationSeconds(intro);
}

function getIntroWordCount(intro = {}) {
  return getIntroVariantWordCount(intro);
}

function getIntroPlainText(intro = {}) {
  return getIntroVariantPlainText(intro);
}

function getIntroGroupPlainText(group = state.scriptIntroGroup) {
  return getIntroVariants(group)
    .map((section) => {
      const body = getIntroVariantPlainText(section);
      if (!body) {
        return "";
      }
      return `${toCleanText(section.title) || "UNTITLED INTRO"}\n${body}`;
    })
    .filter(Boolean)
    .join("\n\n");
}

function getAllScriptSectionsForExport() {
  return [
    ...getIntroVariants(state.scriptIntroGroup).map((section) => ({ ...section, kind: "intro" })),
    ...normalizeScriptSectionCollection(state.scriptSections),
  ];
}

function hasMeaningfulScriptLineContent(items = []) {
  return getLiveScriptSectionItemCollection(items).some((item) => {
    return Boolean(toCleanText(item.text) || normalizeScriptSentenceType(item.type));
  });
}

function hasMeaningfulArchivedScriptLineContent(items = []) {
  return normalizeArchivedScriptSectionItemCollection(items).some((item) => {
    return Boolean(toCleanText(item.text) || normalizeScriptSentenceType(item.type));
  });
}

function hasMeaningfulIntroGroupContent(group = {}) {
  return getIntroVariants(group).some((section) => {
    return hasMeaningfulScriptLineContent(section.items) || hasMeaningfulArchivedScriptLineContent(section.archivedItems);
  });
}

function hasMeaningfulSectionCollectionContent(sections = []) {
  return normalizeScriptSectionCollection(sections).some((section) => {
    return hasMeaningfulScriptLineContent(section.items) || hasMeaningfulArchivedScriptLineContent(section.archivedItems);
  });
}

function getPersistableScriptState(existingScript = null) {
  const currentIntroGroup = normalizeScriptIntroGroup(state.scriptIntroGroup);
  const existingIntroGroup = normalizeScriptIntroGroup(existingScript?.introGroup || existingScript);
  const introGroup =
    hasMeaningfulIntroGroupContent(currentIntroGroup) || !hasMeaningfulIntroGroupContent(existingIntroGroup)
      ? currentIntroGroup
      : existingIntroGroup;

  const currentSections = normalizeScriptSectionCollection(state.scriptSections);
  const existingSections = normalizeScriptSectionCollection(existingScript?.sections);
  const sections =
    hasMeaningfulSectionCollectionContent(currentSections) || !hasMeaningfulSectionCollectionContent(existingSections)
      ? currentSections
      : existingSections;

  return {
    introGroup,
    intros: getIntroVariants(introGroup),
    sections,
  };
}

function getCompiledScriptText() {
  const blocks = [];
  getAllScriptSectionsForExport().forEach((section) => {
    const body = getSectionPlainText(section);
    if (!body) {
      return;
    }
    blocks.push(`${section.title}\n${body}`);
  });
  return blocks.join("\n\n");
}

function getSectionDurationSeconds(section = {}) {
  return getLiveScriptSectionItemCollection(section.items).reduce((sum, item) => sum + estimateReadSeconds(item.text), 0);
}

function getSectionDraftedItemCount(section = {}) {
  return getLiveScriptSectionItemCollection(section.items).filter((item) => toCleanText(item.text)).length;
}

function getTotalScriptItemCount() {
  return getIntroVariants(state.scriptIntroGroup).length + state.scriptSections.reduce((sum, section) => {
    return sum + getLiveScriptSectionItemCollection(section.items).length;
  }, 0);
}

function getDraftedScriptItemCount() {
  return (
    getIntroVariants(state.scriptIntroGroup).reduce((sum, section) => sum + getSectionDraftedItemCount(section), 0) +
    state.scriptSections.reduce((sum, section) => sum + getSectionDraftedItemCount(section), 0)
  );
}

function getSkeletonSectionCount() {
  return getIntroVariants(state.scriptIntroGroup).length + state.scriptSections.length;
}

function getSkeletonBulletCount() {
  return getAllScriptSectionsForExport().reduce((sum, section) => {
    return sum + getLiveScriptSectionItemCollection(section.items).length;
  }, 0);
}

function getScriptTotalDurationSeconds() {
  return getAllScriptSectionsForExport().reduce((sum, section) => sum + getSectionDurationSeconds(section), 0);
}

function renderBriefWorkspaceState() {
  const briefWorkspaceView = normalizeBriefWorkspaceView(state.briefWorkspaceView);
  state.briefWorkspaceView = briefWorkspaceView;

  document.querySelectorAll("[data-brief-workspace]").forEach((panel) => {
    panel.hidden = panel.dataset.briefWorkspace !== briefWorkspaceView;
  });

  if (refs.showPackagingWorkspaceBtn) {
    refs.showPackagingWorkspaceBtn.classList.toggle("is-active", briefWorkspaceView === "packaging");
  }
  if (refs.showScriptingWorkspaceBtn) {
    refs.showScriptingWorkspaceBtn.classList.toggle("is-active", briefWorkspaceView === "scripting");
  }
  if (refs.briefWorkspaceHint) {
    refs.briefWorkspaceHint.textContent =
      briefWorkspaceView === "packaging"
        ? "Develop the packaging, preview the top combinations, and export designer/editor handoff docs."
        : "Write the script in Draft, then review the compiled output in Export.";
  }
}

function renderScriptingWorkspaceState() {
  const scriptingView = normalizeScriptingView(state.scriptingView);
  state.scriptingView = scriptingView;

  document.querySelectorAll("[data-scripting-view]").forEach((panel) => {
    panel.hidden = panel.dataset.scriptingView !== scriptingView;
  });

  if (refs.showScriptDraftBtn) {
    refs.showScriptDraftBtn.classList.toggle("is-active", scriptingView === "draft");
  }
  if (refs.showScriptExportBtn) {
    refs.showScriptExportBtn.classList.toggle("is-active", scriptingView === "export");
  }
  if (refs.scriptingProgressHint) {
    const draftedIntroCount = getIntroVariants(state.scriptIntroGroup).filter((section) => toCleanText(getSectionPlainText(section))).length;
    refs.scriptingProgressHint.textContent = `Draft: ${draftedIntroCount} intro variants · ${state.scriptSections.length} sections · ${getSkeletonBulletCount()} total lines · compiled runtime ${formatDurationShort(
      getScriptTotalDurationSeconds(),
    )}.`;
  }
}

function buildIconButton(className, label, iconMarkup, options = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  if (options.title) {
    button.title = options.title;
  }
  button.innerHTML = iconMarkup;
  return button;
}

function renderIntroSentenceLegend() {
  if (!refs.introSentenceLegend) {
    return;
  }
  refs.introSentenceLegend.innerHTML = "";

  SCRIPT_SENTENCE_TYPES.filter((item) => item.id).forEach((type) => {
    const chip = document.createElement("span");
    chip.className = "script-type-chip";
    chip.textContent = type.label;
    chip.style.color = type.color;
    refs.introSentenceLegend.appendChild(chip);
  });
}

function updateIntroCardStats(card, intro) {
  const durationEl = card.querySelector("[data-role='introDuration']");
  const wordsEl = card.querySelector("[data-role='introWords']");
  const targetEl = card.querySelector("[data-role='introTarget']");
  if (durationEl) {
    durationEl.textContent = `Read time ${formatDurationShort(getIntroDurationSeconds(intro))}`;
  }
  if (wordsEl) {
    wordsEl.textContent = `${getIntroWordCount(intro)} words`;
  }
  if (targetEl) {
    const duration = getIntroDurationSeconds(intro);
    let suffix = "Recommended 20-35s";
    if (duration > INTRO_TARGET_SECONDS.max) {
      suffix = "Running long";
    } else if (duration > 0 && duration < INTRO_TARGET_SECONDS.min) {
      suffix = "Could open faster";
    }
    targetEl.textContent = suffix;
  }
}

function renderIntroBoards() {
  if (!refs.introsBoard) {
    return;
  }

  refs.introsBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.introsBoard.innerHTML = '<p class="pipeline-empty">Create or select a brief to draft intro variations.</p>';
    return;
  }

  state.scriptIntros.forEach((intro, introIndex) => {
    const introCard = document.createElement("article");
    introCard.className = "intro-card";
    introCard.innerHTML = `
      <div class="intro-card-header">
        <div class="intro-card-title-shell"></div>
        <div class="intro-card-controls">
          <div class="intro-card-meta">
            <span class="script-stat" data-role="introDuration"></span>
            <span class="script-stat" data-role="introWords"></span>
            <span class="script-stat" data-role="introTarget"></span>
          </div>
        </div>
      </div>
    `;

    const sentenceBoard = document.createElement("div");
    sentenceBoard.className = "script-intro-sentence-stack";
    introCard.appendChild(sentenceBoard);

    const introRecord = state.scriptIntros[introIndex];
    introRecord.archivedSentences = normalizeArchivedScriptSentenceCollection(introRecord.archivedSentences);
    const titleShell = introCard.querySelector(".intro-card-title-shell");
    const titleInput = document.createElement("input");
    titleInput.className = "intro-card-title-input";
    titleInput.value = introRecord.label;
    titleInput.placeholder = getDefaultIntroLabel(introIndex);
    titleInput.setAttribute("aria-label", `Rename ${getDefaultIntroLabel(introIndex)}`);
    titleShell.appendChild(titleInput);

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn btn-muted";
    addBtn.textContent = "Add Sentence";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-muted";
    copyBtn.textContent = "Copy Intro";
    copyBtn.addEventListener("click", async () => {
      const introText = getIntroPlainText(introRecord);
      if (!introText) {
        flashButtonText(copyBtn, "Empty", 900);
        return;
      }
      const didCopy = await copyTextToClipboard(introText);
      flashButtonText(copyBtn, didCopy ? "Copied" : "Copy Failed", 1100);
    });

    const headerActions = document.createElement("div");
    headerActions.className = "intro-card-actions";
    headerActions.append(copyBtn, addBtn);
    introCard.querySelector(".intro-card-controls").appendChild(headerActions);

    titleInput.addEventListener("input", () => {
      introRecord.label = titleInput.value;
      saveSnapshot();
    });

    const sentences = introRecord.sentences;
    if (!sentences.length) {
      sentenceBoard.innerHTML =
        '<p class="pipeline-empty">No intro sentences yet. Add a sentence and classify it only if useful.</p>';
    } else {
      sentences.forEach((sentence) => {
        const row = document.createElement("article");
        row.className = "script-sentence-card";
        row.dataset.variationId = sentence.id;
        row.dataset.scriptType = sentence.type;

        const dragBtn = buildIconButton("icon-btn drag-handle-btn", "Reorder sentence", DRAG_HANDLE_ICON, {
          title: "Drag to reorder",
        });
        dragBtn.dataset.action = "drag";
        dragBtn.draggable = true;
        dragBtn.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
        });
        dragBtn.addEventListener("dragstart", (event) => {
          beginVariationDrag(event, `intro-sentence:${introRecord.id}`, sentence.id);
        });
        dragBtn.addEventListener("dragend", clearVariationDropTargets);

        row.addEventListener("dragover", (event) => {
          if (canVariationDrop(`intro-sentence:${introRecord.id}`, sentence.id)) {
            event.preventDefault();
            row.classList.add("is-drop-target");
          }
        });
        row.addEventListener("dragleave", () => {
          row.classList.remove("is-drop-target");
        });
        row.addEventListener("drop", (event) => {
          if (!canVariationDrop(`intro-sentence:${introRecord.id}`, sentence.id)) {
            return;
          }
          event.preventDefault();
          const fromIndex = introRecord.sentences.findIndex((item) => item.id === variationDragState.id);
          const toIndex = introRecord.sentences.findIndex((item) => item.id === sentence.id);
          clearVariationDropTargets();
          if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
            return;
          }
          moveItemInArray(introRecord.sentences, fromIndex, toIndex);
          updateBoardsAndBrief();
        });

        const summaryTypeBadge = document.createElement("span");
        summaryTypeBadge.className = "script-sentence-type-badge";

        const summaryText = document.createElement("span");
        summaryText.className = "script-sentence-line";
        summaryText.textContent = toCleanText(sentence.text) || "Sentence draft";

        const summaryContent = document.createElement("span");
        summaryContent.className = "script-sentence-summary-content";
        summaryContent.append(summaryTypeBadge, summaryText);

        const summaryBtn = document.createElement("button");
        summaryBtn.type = "button";
        summaryBtn.className = "script-sentence-summary";
        summaryBtn.append(summaryContent);

        const typeSelect = document.createElement("select");
        typeSelect.className = "script-row-type";
        SCRIPT_SENTENCE_TYPES.forEach((type) => {
          const option = document.createElement("option");
          option.value = type.id;
          option.textContent = type.label;
          if (type.id === sentence.type) {
            option.selected = true;
          }
          typeSelect.appendChild(option);
        });

        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.className = "script-sentence-input";
        textInput.placeholder = "Sentence draft";
        textInput.value = sentence.text;

        const durationLabel = document.createElement("span");
        durationLabel.className = "script-row-duration";
        durationLabel.textContent = formatDurationShort(estimateReadSeconds(sentence.text));

        const archiveBtn = buildIconButton("icon-btn", "Archive sentence", ARCHIVE_ICON);
        archiveBtn.addEventListener("click", () => {
          if (!archiveLineVariant(introRecord.sentences, introRecord.archivedSentences, sentence.id, createScriptSentenceRecord)) {
            return;
          }
          updateBoardsAndBrief();
        });

        const summaryShell = document.createElement("div");
        summaryShell.className = "script-sentence-summary-shell";
        const actions = document.createElement("div");
        actions.className = "script-row-actions";
        actions.append(durationLabel, archiveBtn);
        summaryShell.append(dragBtn, summaryBtn, actions);

        const editor = document.createElement("div");
        editor.className = "script-sentence-editor";
        editor.hidden = true;
        const editorActions = document.createElement("div");
        editorActions.className = "script-sentence-editor-actions";
        const duplicateArchiveBtn = document.createElement("button");
        duplicateArchiveBtn.type = "button";
        duplicateArchiveBtn.className = "btn btn-muted btn-compact";
        duplicateArchiveBtn.textContent = "Duplicate + Archive";
        duplicateArchiveBtn.addEventListener("click", () => {
          if (
            !duplicateAndArchiveLineVariant(
              introRecord.sentences,
              introRecord.archivedSentences,
              sentence.id,
              createScriptSentenceRecord,
            )
          ) {
            return;
          }
          updateBoardsAndBrief();
        });
        editorActions.append(duplicateArchiveBtn);
        editor.append(typeSelect, textInput, editorActions);

        row.append(summaryShell, editor);
        sentenceBoard.appendChild(row);

        const syncSentenceTypeUi = () => {
          const typeMeta = getScriptSentenceTypeMeta(sentence.type);
          row.dataset.scriptType = sentence.type;
          summaryBtn.title = typeMeta.id ? typeMeta.label : "";
          summaryTypeBadge.hidden = !typeMeta.id;
          summaryTypeBadge.textContent = typeMeta.id ? typeMeta.label : "";
        };

        const closeSentenceEditor = () => {
          editor.hidden = true;
          row.classList.remove("is-editing");
        };

        const openSentenceEditor = () => {
          editor.hidden = false;
          row.classList.add("is-editing");
          textInput.focus();
          textInput.select();
        };

        syncSentenceTypeUi();

        summaryBtn.addEventListener("click", () => {
          if (editor.hidden) {
            openSentenceEditor();
            return;
          }
          closeSentenceEditor();
        });

        typeSelect.addEventListener("change", () => {
          sentence.type = typeSelect.value;
          syncSentenceTypeUi();
          saveSnapshot();
        });
        textInput.addEventListener("input", () => {
          sentence.text = textInput.value;
          summaryText.textContent = toCleanText(sentence.text) || "Sentence draft";
          durationLabel.textContent = formatDurationShort(estimateReadSeconds(sentence.text));
          updateIntroCardStats(introCard, introRecord);
          saveSnapshot();
        });
        textInput.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            closeSentenceEditor();
          }
        });
        row.addEventListener("focusout", () => {
          window.requestAnimationFrame(() => {
            if (!row.contains(document.activeElement)) {
              closeSentenceEditor();
            }
          });
        });
      });
    }

    addBtn.addEventListener("click", () => {
      introRecord.sentences.push(createScriptSentenceRecord({}));
      updateBoardsAndBrief();
    });

    const archivedSubsection = renderArchivedLineSubsection(introRecord, introRecord.archivedSentences, {
      placeholder: "Archived sentence",
      onRevive: (archivedId) => {
        if (!reviveArchivedLineVariant(introRecord.sentences, introRecord.archivedSentences, archivedId, createScriptSentenceRecord)) {
          return;
        }
        updateBoardsAndBrief();
      },
    });
    if (archivedSubsection) {
      introCard.appendChild(archivedSubsection);
    }

    updateIntroCardStats(introCard, introRecord);
    refs.introsBoard.appendChild(introCard);
  });
}

function renderResourceLinkStack(section, stackEl) {
  stackEl.innerHTML = "";
  const links = section.resourceLinks;
  if (!links.length) {
    stackEl.innerHTML = '<p class="pipeline-empty">No sponsor resource links yet.</p>';
    return;
  }

  links.forEach((link) => {
    const row = document.createElement("article");
    row.className = "pipeline-card resource-link-card";
    row.innerHTML = `
      <div class="pipeline-row-details">
        <div class="pipeline-fields">
          <label>
            Label
            <input data-field="label" value="${escapeHtml(link.label)}" placeholder="Campaign brief" />
          </label>
          <label>
            URL
            <input data-field="url" value="${escapeHtml(link.url)}" placeholder="https://..." />
          </label>
          <label class="full">
            Notes
            <textarea rows="2" data-field="notes" placeholder="Key instructions or handoff context.">${escapeHtml(
              link.notes,
            )}</textarea>
          </label>
        </div>
      </div>
    `;
    const removeBtn = buildIconButton("icon-btn icon-btn-danger", "Remove sponsor resource", DELETE_ICON);
    removeBtn.addEventListener("click", () => {
      const sourceIndex = section.resourceLinks.findIndex((item) => item.id === link.id);
      if (sourceIndex < 0) {
        return;
      }
      section.resourceLinks.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    });
    row.querySelector(".pipeline-row-details").appendChild(removeBtn);

    row.querySelector('[data-field="label"]').addEventListener("input", (event) => {
      link.label = event.target.value;
      saveSnapshot();
    });
    row.querySelector('[data-field="url"]').addEventListener("input", (event) => {
      link.url = event.target.value;
      saveSnapshot();
    });
    row.querySelector('[data-field="notes"]').addEventListener("input", (event) => {
      link.notes = event.target.value;
      saveSnapshot();
    });

    stackEl.appendChild(row);
  });
}

function getScriptSectionKindLabel(kind = "content") {
  switch (normalizeScriptSectionKind(kind)) {
    case "intro":
      return "Intro";
    case "sponsor":
      return "Sponsor";
    case "outro":
      return "Outro";
    default:
      return "Content";
  }
}

function syncIntroSectionItems(section) {
  const intros = normalizeIntroVariants(state.scriptIntros);
  section.items = intros.map((intro, index) => {
    const existing = Array.isArray(section.items) ? section.items[index] || {} : {};
    return createScriptSectionItemRecord(
      {
        ...existing,
        text: intro.label || getDefaultIntroLabel(index),
      },
      index,
      intro.label || getDefaultIntroLabel(index),
    );
  });
}

function ensureSectionItems(section) {
  if (!Array.isArray(section.items)) {
    section.items = createDefaultScriptSectionItems(section.kind);
  }
}

function archiveLineVariant(liveItems, archivedItems, lineId, createRecord) {
  const sourceIndex = liveItems.findIndex((entry) => entry.id === lineId);
  if (sourceIndex < 0) {
    return false;
  }
  const current = liveItems[sourceIndex];
  const slotId = toCleanText(current.slotId) || current.id;
  archivedItems.unshift(
    createRecord({
      ...current,
      id: createRecordId("archived"),
      slotId,
      archivedAt: Date.now(),
      originalIndex: sourceIndex,
      replacedById: "",
    }),
  );
  liveItems.splice(sourceIndex, 1);
  return true;
}

function duplicateAndArchiveLineVariant(liveItems, archivedItems, lineId, createRecord, livePrefix = "line") {
  const sourceIndex = liveItems.findIndex((entry) => entry.id === lineId);
  if (sourceIndex < 0) {
    return false;
  }
  const current = liveItems[sourceIndex];
  const slotId = toCleanText(current.slotId) || current.id;
  const replacement = createRecord({
    ...current,
    id: createRecordId(livePrefix),
    slotId,
    archivedAt: "",
    originalIndex: null,
    replacedById: "",
  });
  const archived = createRecord({
    ...current,
    id: createRecordId("archived"),
    slotId,
    archivedAt: Date.now(),
    originalIndex: sourceIndex,
    replacedById: replacement.id,
  });
  liveItems.splice(sourceIndex, 1, replacement);
  archivedItems.unshift(archived);
  return true;
}

function reviveArchivedLineVariant(liveItems, archivedItems, archivedId, createRecord, livePrefix = "line") {
  const archivedIndex = archivedItems.findIndex((entry) => entry.id === archivedId);
  if (archivedIndex < 0) {
    return false;
  }
  const archived = archivedItems[archivedIndex];
  const slotId = toCleanText(archived.slotId) || archived.id;
  const replacementIndex = liveItems.findIndex((entry) => {
    return (toCleanText(entry.slotId) || entry.id) === slotId;
  });
  const revived = createRecord({
    ...archived,
    id: createRecordId(livePrefix),
    slotId,
    archivedAt: "",
    originalIndex: null,
    replacedById: "",
  });
  if (replacementIndex >= 0) {
    liveItems.splice(replacementIndex, 1, revived);
  } else {
    const insertIndex =
      typeof archived.originalIndex === "number" && archived.originalIndex >= 0
        ? Math.min(archived.originalIndex, liveItems.length)
        : liveItems.length;
    liveItems.splice(insertIndex, 0, revived);
  }
  archivedItems.splice(archivedIndex, 1);
  return true;
}

function renderArchivedLineSubsection(ownerRecord, archivedItems, options = {}) {
  if (!Array.isArray(archivedItems) || !archivedItems.length) {
    return null;
  }
  const details = document.createElement("details");
  details.className = "script-archived-block";
  details.open = Boolean(ownerRecord.archivedExpanded);
  const summary = document.createElement("summary");
  summary.className = "script-archived-toggle";
  summary.textContent = `Archived (${archivedItems.length})`;
  details.appendChild(summary);

  const stack = document.createElement("div");
  stack.className = "script-archived-stack";
  archivedItems.forEach((item) => {
    const row = document.createElement("article");
    row.className = "script-sentence-card script-archived-row";
    row.dataset.scriptType = item.type;

    const summaryShell = document.createElement("div");
    summaryShell.className = "script-sentence-summary-shell";

    const summaryBtn = document.createElement("div");
    summaryBtn.className = "script-sentence-summary";
    const summaryContent = document.createElement("span");
    summaryContent.className = "script-sentence-summary-content script-sentence-summary-content-inline";
    const summaryText = document.createElement("span");
    summaryText.className = "script-sentence-line";
    summaryText.textContent = toCleanText(item.text) || options.placeholder || "Archived line";
    const summaryTypeBadge = document.createElement("span");
    summaryTypeBadge.className = "script-sentence-type-badge";
    const typeMeta = getScriptSentenceTypeMeta(item.type);
    summaryTypeBadge.hidden = !typeMeta.id;
    summaryTypeBadge.textContent = typeMeta.id ? typeMeta.label : "";
    summaryContent.append(summaryText, summaryTypeBadge);
    summaryBtn.appendChild(summaryContent);

    const actions = document.createElement("div");
    actions.className = "script-row-actions";
    const reviveBtn = document.createElement("button");
    reviveBtn.type = "button";
    reviveBtn.className = "btn btn-muted btn-compact";
    reviveBtn.textContent = "Revive";
    reviveBtn.addEventListener("click", () => {
      if (options.onRevive) {
        options.onRevive(item.id);
      }
    });
    actions.append(reviveBtn);

    summaryShell.append(summaryBtn, actions);
    row.appendChild(summaryShell);
    stack.appendChild(row);
  });
  details.appendChild(stack);
  details.addEventListener("toggle", () => {
    ownerRecord.archivedExpanded = details.open;
    void saveSnapshot({ immediate: true });
  });
  return details;
}

function createSectionKindSelect(section) {
  const select = document.createElement("select");
  select.className = "script-section-kind";
  ["content", "sponsor", "outro"].forEach((kind) => {
    const option = document.createElement("option");
    option.value = kind;
    option.textContent = getScriptSectionKindLabel(kind);
    if (kind === section.kind) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  return select;
}

function bindSectionCardDrag(card, section) {
  card.addEventListener("dragover", (event) => {
    if (canVariationDrop("script-section", section.id)) {
      event.preventDefault();
      card.classList.add("is-drop-target");
    }
  });
  card.addEventListener("dragleave", () => {
    card.classList.remove("is-drop-target");
  });
  card.addEventListener("drop", (event) => {
    if (!canVariationDrop("script-section", section.id)) {
      return;
    }
    event.preventDefault();
    const fromIndex = state.scriptSections.findIndex((item) => item.id === variationDragState.id);
    const toIndex = state.scriptSections.findIndex((item) => item.id === section.id);
    clearVariationDropTargets();
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      return;
    }
    moveItemInArray(state.scriptSections, fromIndex, toIndex);
    updateBoardsAndBrief();
  });
}

function updateSectionCardStats(card, section) {
  const durationEl = card.querySelector("[data-role='sectionDuration']");
  const countEl = card.querySelector("[data-role='sectionCount']");
  const kindEl = card.querySelector("[data-role='sectionKind']");
  if (durationEl) {
    durationEl.textContent = `Runtime ${formatDurationShort(getSectionDurationSeconds(section))}`;
  }
  if (countEl) {
    countEl.textContent = `${getLiveScriptSectionItemCollection(section.items).length} lines`;
  }
  if (kindEl) {
    kindEl.textContent = getScriptSectionKindLabel(section.kind);
  }
}

function createSectionCardBase(section) {
  const card = document.createElement("article");
  card.className = "script-section-card pipeline-card list-row";
  card.dataset.variationId = section.id;

  const dragBtn = buildIconButton("icon-btn drag-handle-btn", "Reorder section", DRAG_HANDLE_ICON, {
    title: "Drag to reorder",
  });
  dragBtn.draggable = true;
  dragBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  dragBtn.addEventListener("dragstart", (event) => {
    beginVariationDrag(event, "script-section", section.id);
  });
  dragBtn.addEventListener("dragend", clearVariationDropTargets);
  bindSectionCardDrag(card, section);

  const header = document.createElement("div");
  header.className = "script-section-header";
  const titleShell = document.createElement("div");
  titleShell.className = "intro-card-title-shell";
  const titleInput = document.createElement("input");
  titleInput.className = "intro-card-title-input";
  titleInput.value = section.title;
  titleInput.placeholder = "Section title";
  titleInput.setAttribute("aria-label", "Section title");
  titleShell.appendChild(titleInput);

  const leading = document.createElement("div");
  leading.className = "script-section-leading";
  leading.append(dragBtn, titleShell);

  const controls = document.createElement("div");
  controls.className = "intro-card-controls";
  const meta = document.createElement("div");
  meta.className = "script-section-meta";
  meta.innerHTML = `
    <span class="script-stat" data-role="sectionDuration"></span>
    <span class="script-stat" data-role="sectionKind"></span>
    <span class="script-stat" data-role="sectionCount"></span>
  `;
  controls.appendChild(meta);

  const tools = document.createElement("div");
  tools.className = "intro-card-actions";

  const kindSelect = createSectionKindSelect(section);
  kindSelect.classList.add("script-section-kind-inline");
  tools.appendChild(kindSelect);

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "btn btn-muted";
  copyBtn.textContent = "Copy Section";
  copyBtn.addEventListener("click", async () => {
    const sectionText = getSectionPlainText(section);
    if (!sectionText) {
      flashButtonText(copyBtn, "Empty", 900);
      return;
    }
    const didCopy = await copyTextToClipboard(sectionText);
    flashButtonText(copyBtn, didCopy ? "Copied" : "Copy Failed", 1100);
  });
  tools.appendChild(copyBtn);

  const addLineBtn = document.createElement("button");
  addLineBtn.type = "button";
  addLineBtn.className = "btn btn-muted";
  addLineBtn.textContent = "Add Line";
  addLineBtn.addEventListener("click", () => {
    section.items.push(createScriptSectionItemRecord({}, section.items.length));
    updateBoardsAndBrief();
  });
  tools.appendChild(addLineBtn);

  const actions = document.createElement("div");
  actions.className = "script-row-actions";
  const removeBtn = buildIconButton("icon-btn icon-btn-danger", "Remove section", DELETE_ICON);
  removeBtn.addEventListener("click", () => {
    const sourceIndex = state.scriptSections.findIndex((item) => item.id === section.id);
    if (sourceIndex < 0) {
      return;
    }
    state.scriptSections.splice(sourceIndex, 1);
    updateBoardsAndBrief();
  });
  actions.append(removeBtn);
  tools.append(actions);
  controls.appendChild(tools);

  header.append(leading, controls);
  card.appendChild(header);

  const body = document.createElement("div");
  body.className = "script-section-stack";
  card.appendChild(body);

  titleInput.addEventListener("input", (event) => {
    section.title = event.target.value;
    saveSnapshot();
  });
  kindSelect.addEventListener("change", () => {
    section.kind = normalizeScriptSectionKind(kindSelect.value);
    section.items = Array.isArray(section.items)
      ? section.items.map((item, index) => createScriptSectionItemRecord(item, index))
      : createDefaultScriptSectionItems(section.kind);
    updateBoardsAndBrief();
  });
  updateSectionCardStats(card, section);
  return { card, body };
}

function buildScriptItemRow(section, item) {
  const row = document.createElement("article");
  row.className = "script-sentence-card script-section-item-card";
  row.dataset.variationId = item.id;
  row.dataset.scriptType = item.type;

  const dragBtn = buildIconButton("icon-btn drag-handle-btn", "Reorder line", DRAG_HANDLE_ICON, {
    title: "Drag to reorder",
  });
  dragBtn.draggable = true;
  dragBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  dragBtn.addEventListener("dragstart", (event) => {
    beginVariationDrag(event, `section-item:${section.id}`, item.id);
  });
  dragBtn.addEventListener("dragend", clearVariationDropTargets);

  row.addEventListener("dragover", (event) => {
    if (canVariationDrop(`section-item:${section.id}`, item.id)) {
      event.preventDefault();
      row.classList.add("is-drop-target");
    }
  });
  row.addEventListener("dragleave", () => {
    row.classList.remove("is-drop-target");
  });
  row.addEventListener("drop", (event) => {
    if (!canVariationDrop(`section-item:${section.id}`, item.id)) {
      return;
    }
    event.preventDefault();
    const fromIndex = section.items.findIndex((entry) => entry.id === variationDragState.id);
    const toIndex = section.items.findIndex((entry) => entry.id === item.id);
    clearVariationDropTargets();
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      return;
    }
    moveItemInArray(section.items, fromIndex, toIndex);
    updateBoardsAndBrief();
  });

  const typeSelect = document.createElement("select");
  typeSelect.className = "script-row-type";
  SCRIPT_SENTENCE_TYPES.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.label;
    if (type.id === item.type) {
      option.selected = true;
    }
    typeSelect.appendChild(option);
  });

  const summaryTypeBadge = document.createElement("span");
  summaryTypeBadge.className = "script-sentence-type-badge";

  const summaryText = document.createElement("span");
  summaryText.className = "script-sentence-line";
  summaryText.textContent = toCleanText(item.text) || "Section line";

  const summaryContent = document.createElement("span");
  summaryContent.className = "script-sentence-summary-content script-sentence-summary-content-inline";
  summaryContent.append(summaryText, summaryTypeBadge);

  const summaryBtn = document.createElement("button");
  summaryBtn.type = "button";
  summaryBtn.className = "script-sentence-summary";
  summaryBtn.append(summaryContent);

  const durationLabel = document.createElement("span");
  durationLabel.className = "script-row-duration";
  durationLabel.textContent = formatDurationShort(estimateReadSeconds(item.text));

  const archiveBtn = buildIconButton("icon-btn", "Archive line", ARCHIVE_ICON);
  archiveBtn.addEventListener("click", () => {
    if (!archiveLineVariant(section.items, section.archivedItems, item.id, createScriptSectionItemRecord, "item")) {
      return;
    }
    updateBoardsAndBrief();
  });

  const summaryShell = document.createElement("div");
  summaryShell.className = "script-sentence-summary-shell";
  const actions = document.createElement("div");
  actions.className = "script-row-actions";
  actions.append(durationLabel, archiveBtn);
  summaryShell.append(dragBtn, summaryBtn, actions);

  const editor = document.createElement("div");
  editor.className = "script-sentence-editor";
  editor.hidden = true;

  const textInput = document.createElement("textarea");
  textInput.rows = 5;
  textInput.className = "script-section-line-input";
  textInput.placeholder = "Section line";
  textInput.value = item.text;
  const editorActions = document.createElement("div");
  editorActions.className = "script-sentence-editor-actions";
  const duplicateArchiveBtn = document.createElement("button");
  duplicateArchiveBtn.type = "button";
  duplicateArchiveBtn.className = "btn btn-muted btn-compact";
  duplicateArchiveBtn.textContent = "Duplicate + Archive";
  duplicateArchiveBtn.addEventListener("click", () => {
    if (
      !duplicateAndArchiveLineVariant(section.items, section.archivedItems, item.id, createScriptSectionItemRecord, "item")
    ) {
      return;
    }
    updateBoardsAndBrief();
  });
  editorActions.append(duplicateArchiveBtn);
  editor.append(typeSelect, textInput, editorActions);
  row.append(summaryShell, editor);

  row.dataset.scriptType = item.type;
  const syncTypeUi = () => {
    row.dataset.scriptType = item.type;
    const typeMeta = getScriptSentenceTypeMeta(item.type);
    summaryBtn.title = typeMeta.id ? typeMeta.label : "";
    summaryTypeBadge.hidden = !typeMeta.id;
    summaryTypeBadge.textContent = typeMeta.id ? typeMeta.label : "";
  };
  syncTypeUi();

  const closeEditor = () => {
    editor.hidden = true;
    row.classList.remove("is-editing");
  };

  const openEditor = () => {
    editor.hidden = false;
    row.classList.add("is-editing");
    autosizeTextarea(textInput);
    textInput.focus();
    textInput.setSelectionRange(textInput.value.length, textInput.value.length);
  };

  summaryBtn.addEventListener("click", () => {
    if (editor.hidden) {
      openEditor();
      return;
    }
    closeEditor();
  });

  typeSelect.addEventListener("change", () => {
    item.type = typeSelect.value;
    syncTypeUi();
    void saveSnapshot({ immediate: true });
  });

  textInput.addEventListener("input", () => {
    item.text = textInput.value;
    item.draftText = textInput.value;
    autosizeTextarea(textInput);
    summaryText.textContent = toCleanText(item.text) || "Section line";
    durationLabel.textContent = formatDurationShort(estimateReadSeconds(item.text));
    const card = row.closest(".script-section-card");
    if (card) {
      updateSectionCardStats(card, section);
    }
    void saveSnapshot({ immediate: true });
  });
  textInput.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      closeEditor();
    }
  });
  row.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => {
      if (!row.contains(document.activeElement)) {
        closeEditor();
      }
    });
  });
  window.requestAnimationFrame(() => autosizeTextarea(textInput));

  return row;
}

function renderSkeletonBoard() {
  if (!refs.skeletonBoard) {
    return;
  }
  refs.skeletonBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.skeletonBoard.innerHTML = '<p class="pipeline-empty">Create or select a brief to build script sections.</p>';
    return;
  }

  state.scriptSections.forEach((section) => {
    ensureSectionItems(section);
    section.archivedItems = normalizeArchivedScriptSectionItemCollection(section.archivedItems);
    const { card, body } = createSectionCardBase(section);
    const stack = document.createElement("div");
    stack.className = "script-intro-sentence-stack";
    if (!section.items.length) {
      stack.innerHTML = '<p class="pipeline-empty">No live lines in this section.</p>';
    }
    section.items.forEach((item) => {
      stack.appendChild(buildScriptItemRow(section, item));
    });
    body.appendChild(stack);
    const archivedSubsection = renderArchivedLineSubsection(section, section.archivedItems, {
      placeholder: "Archived line",
      onRevive: (archivedId) => {
        if (!reviveArchivedLineVariant(section.items, section.archivedItems, archivedId, createScriptSectionItemRecord, "item")) {
          return;
        }
        updateBoardsAndBrief();
      },
    });
    if (archivedSubsection) {
      body.appendChild(archivedSubsection);
    }
    refs.skeletonBoard.appendChild(card);
  });
}

function renderDraftBoard() {
  if (!refs.draftBoard) {
    return;
  }
  refs.draftBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.draftBoard.innerHTML = '<p class="pipeline-empty">Create or select a brief to review the compiled script.</p>';
    return;
  }

  const controls = document.createElement("div");
  controls.className = "script-draft-read-toolbar";
  const copyAllBtn = document.createElement("button");
  copyAllBtn.type = "button";
  copyAllBtn.className = "btn btn-muted";
  copyAllBtn.textContent = "Copy Full Script";
  copyAllBtn.addEventListener("click", async () => {
    const compiled = getCompiledScriptText();
    if (!compiled) {
      flashButtonText(copyAllBtn, "Empty", 900);
      return;
    }
      const didCopy = await copyTextToClipboard(compiled);
      flashButtonText(copyAllBtn, didCopy ? "Copied" : "Copy Failed", 1100);
    });
  const copyJsonBtn = document.createElement("button");
  copyJsonBtn.type = "button";
  copyJsonBtn.className = "btn btn-muted";
  copyJsonBtn.textContent = "Copy Script JSON";
  copyJsonBtn.addEventListener("click", () => copyScriptMetadataJson(copyJsonBtn));
  const draftLayout = normalizeScriptDraftLayout(state.scriptDraftLayout);
  state.scriptDraftLayout = draftLayout;
  const colorEnabled = normalizeScriptDraftColorEnabled(state.scriptDraftShowColors);
  state.scriptDraftShowColors = colorEnabled;

  [
    { id: "plain", label: "Plain" },
    { id: "script", label: "Script" },
  ].forEach((option) => {
    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "btn btn-muted";
    viewBtn.textContent = option.label;
    viewBtn.classList.toggle("is-active", draftLayout === option.id);
    viewBtn.addEventListener("click", () => {
      state.scriptDraftLayout = option.id;
      updateBoardsAndBrief();
    });
    controls.appendChild(viewBtn);
  });
  const colorBtn = document.createElement("button");
  colorBtn.type = "button";
  colorBtn.className = "btn btn-muted";
  colorBtn.textContent = colorEnabled ? "Color On" : "Color Off";
  colorBtn.classList.toggle("is-active", colorEnabled);
  colorBtn.addEventListener("click", () => {
    state.scriptDraftShowColors = !state.scriptDraftShowColors;
    updateBoardsAndBrief();
  });
  controls.appendChild(colorBtn);
  controls.prepend(copyJsonBtn);
  controls.prepend(copyAllBtn);
  refs.draftBoard.appendChild(controls);

  const colorMode = colorEnabled;
  const scriptMode = draftLayout === "script";
  refs.draftBoard.classList.toggle("is-plain-script", !colorMode);
  refs.draftBoard.classList.toggle("is-script-draft", scriptMode);

  const compiledSections = [];
  normalizeIntroVariants(state.scriptIntros).forEach((intro, index) => {
    compiledSections.push({
      id: intro.id,
      title: intro.label || getDefaultIntroLabel(index),
      kind: "intro",
      lines: normalizeScriptSentenceCollection(intro.sentences).map((item) => ({
        id: item.id,
        text: item.text,
        type: item.type,
      })),
      runtime: getIntroDurationSeconds(intro),
      copyText: getIntroPlainText(intro),
    });
  });
  normalizeScriptSectionCollection(state.scriptSections).forEach((section) => {
    compiledSections.push({
      id: section.id,
      title: section.title,
      kind: section.kind,
      lines: getLiveScriptSectionItemCollection(section.items).map((item) => ({
        id: item.id,
        text: item.text,
        type: item.type,
      })),
      runtime: getSectionDurationSeconds(section),
      copyText: getSectionPlainText(section),
    });
  });

  compiledSections.forEach((section) => {
    const card = document.createElement("article");
    card.className = "script-section-card pipeline-card list-row";
    const header = document.createElement("div");
    header.className = "script-section-header";
    header.innerHTML = `
      <div>
        <h3>${escapeHtml(section.title)}</h3>
      </div>
      <div class="intro-card-controls">
        <div class="script-section-meta">
          <span class="script-stat">Runtime ${formatDurationShort(section.runtime)}</span>
          <span class="script-stat">${escapeHtml(getScriptSectionKindLabel(section.kind))}</span>
        </div>
      </div>
    `;
    const headerTools = document.createElement("div");
    headerTools.className = "intro-card-actions";
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-muted";
    copyBtn.textContent = section.kind === "intro" ? "Copy Intro" : "Copy Section";
    copyBtn.addEventListener("click", async () => {
      if (!section.copyText) {
        flashButtonText(copyBtn, "Empty", 900);
        return;
      }
      const didCopy = await copyTextToClipboard(section.copyText);
      flashButtonText(copyBtn, didCopy ? "Copied" : "Copy Failed", 1100);
    });
    headerTools.appendChild(copyBtn);
    header.querySelector(".intro-card-controls").appendChild(headerTools);
    card.appendChild(header);

    const stack = document.createElement("div");
    stack.className = "script-intro-sentence-stack";
    const nonEmptyLines = section.lines.filter((item) => toCleanText(item.text));
    if (!nonEmptyLines.length) {
      stack.innerHTML = '<p class="pipeline-empty">No script lines yet.</p>';
    } else {
      nonEmptyLines.forEach((item) => {
        const lineCard = document.createElement("article");
        lineCard.className = "script-sentence-card script-readonly-line";
        lineCard.dataset.scriptType = colorMode ? item.type : "";
        const summary = document.createElement("div");
        summary.className = "script-sentence-summary script-readonly-summary";
        const content = document.createElement("div");
        content.className = "script-sentence-summary-content script-sentence-summary-content-inline";
        const badge = document.createElement("span");
        badge.className = "script-sentence-type-badge";
        const typeMeta = getScriptSentenceTypeMeta(item.type);
        badge.hidden = !colorMode || !typeMeta.id;
        badge.textContent = typeMeta.id ? typeMeta.label : "";
        const text = document.createElement("span");
        text.className = "script-sentence-line";
        text.textContent = item.text;
        content.append(text, badge);
        summary.append(content);
        lineCard.append(summary);
        stack.appendChild(lineCard);
      });
    }
    card.appendChild(stack);
    refs.draftBoard.appendChild(card);
  });
}

function findScriptSectionContext(sectionId = "") {
  const normalizedId = toCleanText(sectionId);
  if (!normalizedId) {
    return null;
  }
  const introIndex = getIntroVariants(state.scriptIntroGroup).findIndex((section) => section.id === normalizedId);
  if (introIndex >= 0) {
    return {
      section: state.scriptIntroGroup.variants[introIndex],
      scope: "intro",
      index: introIndex,
      group: state.scriptIntroGroup,
    };
  }
  const sectionIndex = state.scriptSections.findIndex((section) => section.id === normalizedId);
  if (sectionIndex >= 0) {
    return {
      section: state.scriptSections[sectionIndex],
      scope: "section",
      index: sectionIndex,
      group: null,
    };
  }
  return null;
}

function buildSectionImportExportPayload(section = {}) {
  return {
    title: toCleanText(section.title),
    kind: normalizeScriptSectionKind(section.kind),
    lines: getLiveScriptSectionItemCollection(section.items)
      .filter((line) => toCleanText(line.text) || normalizeScriptSentenceType(line.type))
      .map((line) => ({
        type: normalizeScriptSentenceType(line.type) || "untyped",
        text: toCleanText(line.text),
      })),
  };
}

function buildIntroGroupImportExportPayload(group = state.scriptIntroGroup) {
  return {
    title: toCleanText(group?.title) || getDefaultIntroGroupTitle(),
    variants: getIntroVariants(group).map((section) => buildSectionImportExportPayload(section)),
  };
}

function normalizeImportTypeId(raw = "") {
  const normalized = toCleanText(raw)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!normalized || normalized === "untyped") {
    return "";
  }
  if (SCRIPT_SENTENCE_TYPES.some((item) => item.id === normalized)) {
    return normalized;
  }
  const matched = SCRIPT_SENTENCE_TYPES.find((item) => {
    const labelKey = item.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return labelKey === normalized;
  });
  return matched?.id || "";
}

function isRecognizedImportTypeToken(raw = "") {
  const normalized = toCleanText(raw)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!normalized) {
    return false;
  }
  if (normalized === "untyped") {
    return true;
  }
  return Boolean(normalizeImportTypeId(raw));
}

function normalizeImportSectionKind(raw = "", fallback = "content") {
  const normalized = toCleanText(raw)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!normalized) {
    return normalizeScriptSectionKind(fallback);
  }
  if (SCRIPT_SECTION_KINDS.includes(normalized)) {
    return normalized;
  }
  const matched = SCRIPT_SECTION_KINDS.find((kind) => {
    const labelKey = getScriptSectionKindLabel(kind)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return labelKey === normalized;
  });
  return matched || normalizeScriptSectionKind(fallback);
}

function parseImportedSectionLines(lines = []) {
  const source = Array.isArray(lines) ? lines : [];
  return source
    .map((line, index) => {
      if (typeof line === "string") {
        return createScriptSectionItemRecord({
          type: "",
          text: toCleanText(line),
        }, index);
      }
      if (!line || typeof line !== "object") {
        return null;
      }
      const rawType = typeof line.type === "string" ? line.type : toCleanText(line.type?.id || line.type?.label);
      return createScriptSectionItemRecord({
        type: normalizeImportTypeId(rawType),
        text: toCleanText(line.text),
      }, index);
    })
    .filter((line) => line && toCleanText(line.text));
}

function parseSectionImportJson(rawText = "", fallbackKind = "content") {
  const trimmed = toCleanText(rawText);
  if (!trimmed || !/^[{\[]/.test(trimmed)) {
    return null;
  }

  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (_error) {
    return null;
  }

  const section = Array.isArray(parsed)
    ? { title: "", kind: fallbackKind, lines: parsed }
    : parsed && typeof parsed === "object"
      ? parsed
      : null;
  if (!section) {
    return null;
  }

  const kindSource =
    typeof section.kind === "string"
      ? section.kind
      : toCleanText(section.kind?.id || section.kind?.label);

  return {
    title: toCleanText(section.title),
    kind: normalizeImportSectionKind(kindSource, fallbackKind),
    lines: parseImportedSectionLines(section.lines),
  };
}

function parseSectionImportText(text = "", fallbackKind = "content") {
  const jsonPayload = parseSectionImportJson(text, fallbackKind);
  if (jsonPayload) {
    return jsonPayload;
  }

  const lines = String(text).replace(/\r/g, "").split("\n");
  let title = "";
  let kind = "";
  let bodyStarted = false;
  const parsedLines = [];

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      if (bodyStarted) {
        return;
      }
      return;
    }

    const headerMatch = !bodyStarted ? line.match(/^(title|kind)\s*:\s*(.+)$/i) : null;
    if (headerMatch) {
      const key = headerMatch[1].toLowerCase();
      const value = toCleanText(headerMatch[2]);
      if (key === "title") {
        title = value;
      } else if (key === "kind") {
        kind = value;
      }
      return;
    }

    bodyStarted = true;
    const typedMatch = line.match(/^([a-z0-9 _-]+)\s*:\s*(.+)$/i);
    if (typedMatch && isRecognizedImportTypeToken(typedMatch[1])) {
      parsedLines.push(
        createScriptSectionItemRecord({
          type: normalizeImportTypeId(typedMatch[1]),
          text: toCleanText(typedMatch[2]),
        }),
      );
      return;
    }
    parsedLines.push(
      createScriptSectionItemRecord({
        type: "",
        text: line,
      }),
    );
  });

  return {
    title: toCleanText(title),
    kind: normalizeImportSectionKind(kind, fallbackKind),
    lines: parsedLines.filter((line) => toCleanText(line.text)),
  };
}

function getScriptSectionImportTemplate(section = {}, mode = "bulk-add") {
  const normalizedKind = normalizeScriptSectionKind(section?.kind);
  const title = toCleanText(section?.title) || "Section Title";
  if (mode === "import-section") {
    return [
      `title: ${title}`,
      `kind: ${normalizedKind}`,
      "",
      "intrigue: Open with the strongest claim or tension.",
      "supporting-facts: Add concrete detail or evidence.",
      "credibility: Explain why this point is trustworthy.",
      "untyped: Use an untyped line when no tag is useful.",
    ].join("\n");
  }
  return [
    "Open with the strongest claim or tension.",
    "Add concrete detail or evidence.",
    "Explain why this point is trustworthy.",
    "Use one line per row. Leave tags out in bulk add mode.",
  ].join("\n");
}

function getScriptSectionImportJsonExample(section = {}) {
  return JSON.stringify(
    {
      title: toCleanText(section?.title) || "Section Title",
      kind: normalizeScriptSectionKind(section?.kind),
      lines: [
        { type: "intrigue", text: "Open with the strongest claim or tension." },
        { type: "supporting-facts", text: "Add concrete detail or evidence." },
        { type: "credibility", text: "Explain why this point is trustworthy." },
        { type: "untyped", text: "Use an untyped line when no tag is useful." },
      ],
    },
    null,
    2,
  );
}

function getScriptSectionTypePromptGuide() {
  return [
    "Type ids and when to use them:",
    "- intrigue: create curiosity, tension, or a strong hook",
    "- question: ask the viewer a direct or implied question",
    "- quote-proof: cite a source, quote, or outside proof point",
    "- credibility: establish authority, experience, or trust",
    "- core-takeaway: deliver the main promised point or conclusion",
    "- supporting-fact: add detail, evidence, context, or examples",
    "- transition: bridge from one idea or section to the next",
    "- pain-point: name the core frustration or problem",
    "- cost-of-problem: show what the problem is costing the viewer",
    "- introducing-solution: introduce the solution or new approach",
    "- how-it-works: explain the mechanism or process",
    "- showing-result: describe the outcome, payoff, or transformation",
    "- removing-objections: answer doubts, resistance, or counterarguments",
    "- actionable-instruction: give a concrete step or instruction",
    "- tease: hint at what is coming later",
    "- untyped: use only when none of the tags fit cleanly",
  ].join("\n");
}

function getScriptSectionLlmPrompt(section = {}, mode = "bulk-add") {
  const title = toCleanText(section?.title) || "Section Title";
  const kind = normalizeScriptSectionKind(section?.kind);
  const typeGuide = getScriptSectionTypePromptGuide();

  if (mode === "import-section") {
    return [
      `Format the script for the section "${title}" (${kind}) so it can be pasted into the import tool.`,
      "Return either:",
      "1. plain text with optional title/kind headers and one line per row using `type-id: text`, or",
      "2. JSON with { title, kind, lines: [{ type, text }] }.",
      "Tag every line with the best fitting type id when possible.",
      typeGuide,
      "If no tag fits, use `untyped` or omit the type in plain text.",
      "Do not add markdown fences, bullets, numbering, or commentary.",
    ].join("\n");
  }

  return [
    `Format script lines for the section "${title}" (${kind}) so they can be pasted into the bulk add tool.`,
    "Return one script line per row.",
    "Bulk add ignores tags, but use this tagging rubric while drafting so the same lines can also be reformatted for import if needed.",
    typeGuide,
    "Do not add numbering, bullets, labels, markdown fences, or commentary.",
    "Keep each row as plain script text only.",
  ].join("\n");
}

function syncScriptSectionModalHelper(section = {}, mode = "bulk-add") {
  if (refs.scriptSectionModalHelperHint) {
    refs.scriptSectionModalHelperHint.textContent =
      mode === "import-section"
        ? "Copy a prompt, plain-text example, or JSON example to give your LLM the exact section import shape."
        : "Copy a prompt or example to get one script line per row for bulk add. JSON is available as a reference for import mode.";
  }

  if (refs.copyScriptSectionModalPromptBtn) {
    refs.copyScriptSectionModalPromptBtn.dataset.copyPayload = getScriptSectionLlmPrompt(section, mode);
  }
  if (refs.copyScriptSectionModalPlainBtn) {
    refs.copyScriptSectionModalPlainBtn.dataset.copyPayload = getScriptSectionImportTemplate(section, mode);
  }
  if (refs.copyScriptSectionModalJsonBtn) {
    refs.copyScriptSectionModalJsonBtn.dataset.copyPayload = getScriptSectionImportJsonExample(section);
  }
}

function openScriptSectionModal(section, mode = "bulk-add") {
  if (!refs.scriptSectionModal || !refs.scriptSectionModalTextarea) {
    return;
  }
  scriptSectionModalState.mode = mode;
  scriptSectionModalState.sectionId = toCleanText(section?.id);
  refs.scriptSectionModal.hidden = false;
  refs.scriptSectionModal.dataset.mode = mode;
  refs.scriptSectionModalTitle.textContent = mode === "import-section" ? "Import Section" : "Bulk Add Lines";
  refs.scriptSectionModalHint.textContent =
    mode === "import-section"
      ? "Paste plain text or JSON. Plain text supports optional title/kind headers, then one line per row using type-id: text."
      : "Paste one script line per row. Blank lines are ignored. New lines start as untyped.";
  refs.scriptSectionModalTextarea.value =
    mode === "import-section"
      ? `title: ${toCleanText(section?.title)}\nkind: ${normalizeScriptSectionKind(section?.kind)}\n\n`
      : "";
  refs.scriptSectionModalConfirmBtn.textContent = mode === "import-section" ? "Import" : "Add Lines";
  syncScriptSectionModalHelper(section, mode);
  refs.scriptSectionModalTextarea.focus();
  refs.scriptSectionModalTextarea.select();
}

function closeScriptSectionModal() {
  if (!refs.scriptSectionModal) {
    return;
  }
  refs.scriptSectionModal.hidden = true;
  scriptSectionModalState.mode = "bulk-add";
  scriptSectionModalState.sectionId = "";
  refs.scriptSectionModalTextarea.value = "";
}

function submitScriptSectionModal() {
  const context = findScriptSectionContext(scriptSectionModalState.sectionId);
  if (!context || !refs.scriptSectionModalTextarea) {
    closeScriptSectionModal();
    return;
  }
  const section = context.section;
  if (scriptSectionModalState.mode === "import-section") {
    const parsed = parseSectionImportText(refs.scriptSectionModalTextarea.value, section.kind);
    if (parsed.title) {
      section.title = parsed.title;
    }
    if (context.scope !== "intro") {
      section.kind = normalizeImportSectionKind(parsed.kind, section.kind);
    } else {
      section.kind = "intro";
    }
    section.items = parsed.lines.map((line, index) => createScriptSectionItemRecord(line, index));
  } else {
    const lines = refs.scriptSectionModalTextarea.value
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => toCleanText(line))
      .filter(Boolean)
      .map((line, index) => createScriptSectionItemRecord({ text: line }, section.items.length + index));
    section.items.push(...lines);
  }
  closeScriptSectionModal();
  updateBoardsAndBrief();
}

async function copySectionJson(section, triggerBtn) {
  const didCopy = await copyTextToClipboard(JSON.stringify(buildSectionImportExportPayload(section), null, 2));
  flashButtonText(triggerBtn, didCopy ? "Copied" : "Copy Failed", 1100);
}

async function copyIntroGroupJson(group, triggerBtn) {
  const didCopy = await copyTextToClipboard(JSON.stringify(buildIntroGroupImportExportPayload(group), null, 2));
  flashButtonText(triggerBtn, didCopy ? "Copied" : "Copy Failed", 1100);
}

function buildEditableSectionCard(section, options = {}) {
  ensureSectionItems(section);
  section.archivedItems = normalizeArchivedScriptSectionItemCollection(section.archivedItems);
  const card = document.createElement("article");
  card.className = "script-section-card pipeline-card list-row";
  card.dataset.variationId = section.id;

  const dragBtn = buildIconButton("icon-btn drag-handle-btn", "Reorder section", DRAG_HANDLE_ICON, {
    title: "Drag to reorder",
  });
  dragBtn.draggable = true;
  dragBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  const titleShell = document.createElement("div");
  titleShell.className = "intro-card-title-shell";
  const titleInput = document.createElement("input");
  titleInput.className = "intro-card-title-input";
  titleInput.value = toCleanText(section.title);
  titleInput.placeholder = options.titlePlaceholder || "Section title";
  titleInput.setAttribute("aria-label", options.titlePlaceholder || "Section title");
  titleShell.appendChild(titleInput);

  const header = document.createElement("div");
  header.className = "script-section-header";
  const leading = document.createElement("div");
  leading.className = "script-section-leading";
  leading.append(dragBtn, titleShell);
  header.appendChild(leading);

  const controls = document.createElement("div");
  controls.className = "intro-card-controls";
  const meta = document.createElement("div");
  meta.className = "script-section-meta";
  meta.innerHTML = `
    <span class="script-stat" data-role="sectionDuration"></span>
    <span class="script-stat" data-role="sectionKind"></span>
    <span class="script-stat" data-role="sectionCount"></span>
  `;
  controls.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "intro-card-actions";

  if (!options.lockKind) {
    const kindSelect = createSectionKindSelect(section);
    kindSelect.classList.add("script-section-kind-inline");
    kindSelect.addEventListener("change", () => {
      section.kind = normalizeScriptSectionKind(kindSelect.value);
      updateBoardsAndBrief();
    });
    actions.appendChild(kindSelect);
  }

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "btn btn-muted";
  copyBtn.textContent = options.copyLabel || "Copy Section";
  copyBtn.addEventListener("click", async () => {
    const sectionText = getSectionPlainText(section);
    if (!sectionText) {
      flashButtonText(copyBtn, "Empty", 900);
      return;
    }
    const didCopy = await copyTextToClipboard(sectionText);
    flashButtonText(copyBtn, didCopy ? "Copied" : "Copy Failed", 1100);
  });
  actions.appendChild(copyBtn);

  const copyJsonBtn = document.createElement("button");
  copyJsonBtn.type = "button";
  copyJsonBtn.className = "btn btn-muted";
  copyJsonBtn.textContent = "Copy JSON";
  copyJsonBtn.addEventListener("click", () => copySectionJson(section, copyJsonBtn));
  actions.appendChild(copyJsonBtn);

  const bulkAddBtn = document.createElement("button");
  bulkAddBtn.type = "button";
  bulkAddBtn.className = "btn btn-muted";
  bulkAddBtn.textContent = "Bulk Add";
  bulkAddBtn.addEventListener("click", () => openScriptSectionModal(section, "bulk-add"));
  actions.appendChild(bulkAddBtn);

  const importBtn = document.createElement("button");
  importBtn.type = "button";
  importBtn.className = "btn btn-muted";
  importBtn.textContent = "Import";
  importBtn.addEventListener("click", () => openScriptSectionModal(section, "import-section"));
  actions.appendChild(importBtn);

  const addLineBtn = document.createElement("button");
  addLineBtn.type = "button";
  addLineBtn.className = "btn btn-muted";
  addLineBtn.textContent = "Add Line";
  addLineBtn.addEventListener("click", () => {
    section.items.push(createScriptSectionItemRecord({}, section.items.length));
    updateBoardsAndBrief();
  });
  actions.appendChild(addLineBtn);

  const removeBtn = buildIconButton("icon-btn icon-btn-danger", options.removeLabel || "Remove section", DELETE_ICON);
  removeBtn.addEventListener("click", () => {
    if (options.onRemove) {
      options.onRemove(section);
    }
  });
  const removeShell = document.createElement("div");
  removeShell.className = "script-row-actions";
  removeShell.append(removeBtn);
  actions.append(removeShell);

  controls.append(actions);
  header.appendChild(controls);
  card.appendChild(header);

  titleInput.addEventListener("input", (event) => {
    section.title = event.target.value;
    saveSnapshot();
  });

  if (options.dragType && options.onDrop) {
    dragBtn.addEventListener("dragstart", (event) => {
      beginVariationDrag(event, options.dragType, section.id);
    });
    dragBtn.addEventListener("dragend", clearVariationDropTargets);
    card.addEventListener("dragover", (event) => {
      if (canVariationDrop(options.dragType, section.id)) {
        event.preventDefault();
        card.classList.add("is-drop-target");
      }
    });
    card.addEventListener("dragleave", () => card.classList.remove("is-drop-target"));
    card.addEventListener("drop", (event) => {
      if (!canVariationDrop(options.dragType, section.id)) {
        return;
      }
      event.preventDefault();
      options.onDrop(section.id);
      clearVariationDropTargets();
    });
  }

  const stack = document.createElement("div");
  stack.className = "script-intro-sentence-stack";
  if (!section.items.length) {
    stack.innerHTML = '<p class="pipeline-empty">No lines in this section yet.</p>';
  }
  section.items.forEach((item) => stack.appendChild(buildScriptItemRow(section, item)));
  card.appendChild(stack);

  const archivedSubsection = renderArchivedLineSubsection(section, section.archivedItems, {
    placeholder: "Archived line",
    onRevive: (archivedId) => {
      if (!reviveArchivedLineVariant(section.items, section.archivedItems, archivedId, createScriptSectionItemRecord, "item")) {
        return;
      }
      updateBoardsAndBrief();
    },
  });
  if (archivedSubsection) {
    card.appendChild(archivedSubsection);
  }

  updateSectionCardStats(card, section);
  return card;
}

function renderScriptDraftWorkspace() {
  if (!refs.skeletonBoard) {
    return;
  }
  refs.skeletonBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.skeletonBoard.innerHTML = '<p class="pipeline-empty">Create or select a brief to draft the script.</p>';
    return;
  }

  state.scriptIntroGroup = normalizeScriptIntroGroup(state.scriptIntroGroup);
  state.scriptSections = normalizeScriptSectionCollection(state.scriptSections);

  const introGroupCard = document.createElement("article");
  introGroupCard.className = "script-section-card pipeline-card list-row script-intro-group-card";
  introGroupCard.innerHTML = `
    <div class="script-section-header">
      <div class="script-section-leading">
        <div class="intro-card-title-shell">
          <input class="intro-card-title-input" data-role="introGroupTitle" placeholder="Intro group title" />
        </div>
      </div>
      <div class="intro-card-controls">
        <div class="script-section-meta">
          <span class="script-stat">Runtime ${formatDurationShort(
            getIntroVariants(state.scriptIntroGroup).reduce((sum, section) => sum + getSectionDurationSeconds(section), 0),
          )}</span>
          <span class="script-stat">Intro group</span>
          <span class="script-stat">${getIntroVariants(state.scriptIntroGroup).length} variants</span>
        </div>
      </div>
    </div>
  `;
  const introGroupTitleInput = introGroupCard.querySelector("[data-role='introGroupTitle']");
  introGroupTitleInput.value = toCleanText(state.scriptIntroGroup.title) || getDefaultIntroGroupTitle();
  introGroupTitleInput.addEventListener("input", (event) => {
    state.scriptIntroGroup.title = event.target.value;
    saveSnapshot();
  });
  const introGroupActions = document.createElement("div");
  introGroupActions.className = "intro-card-actions";
  const copyIntroGroupBtn = document.createElement("button");
  copyIntroGroupBtn.type = "button";
  copyIntroGroupBtn.className = "btn btn-muted";
  copyIntroGroupBtn.textContent = "Copy Intro Group";
  copyIntroGroupBtn.addEventListener("click", async () => {
    const text = getIntroGroupPlainText(state.scriptIntroGroup);
    if (!text) {
      flashButtonText(copyIntroGroupBtn, "Empty", 900);
      return;
    }
    const didCopy = await copyTextToClipboard(text);
    flashButtonText(copyIntroGroupBtn, didCopy ? "Copied" : "Copy Failed", 1100);
  });
  const copyIntroGroupJsonBtn = document.createElement("button");
  copyIntroGroupJsonBtn.type = "button";
  copyIntroGroupJsonBtn.className = "btn btn-muted";
  copyIntroGroupJsonBtn.textContent = "Copy JSON";
  copyIntroGroupJsonBtn.addEventListener("click", () => copyIntroGroupJson(state.scriptIntroGroup, copyIntroGroupJsonBtn));
  const addIntroVariantBtn = document.createElement("button");
  addIntroVariantBtn.type = "button";
  addIntroVariantBtn.className = "btn btn-muted";
  addIntroVariantBtn.textContent = "Add Intro Variant";
  addIntroVariantBtn.addEventListener("click", () => {
    state.scriptIntroGroup.variants.push(
      createIntroVariantSectionRecord({}, getIntroVariants(state.scriptIntroGroup).length),
    );
    updateBoardsAndBrief();
  });
  introGroupActions.append(copyIntroGroupBtn, copyIntroGroupJsonBtn, addIntroVariantBtn);
  introGroupCard.querySelector(".intro-card-controls").appendChild(introGroupActions);

  const introVariantStack = document.createElement("div");
  introVariantStack.className = "script-subsection-stack";
  getIntroVariants(state.scriptIntroGroup).forEach((section) => {
    introVariantStack.appendChild(
      buildEditableSectionCard(section, {
        lockKind: true,
        copyLabel: "Copy Intro",
        titlePlaceholder: "Intro variant title",
        dragType: "intro-variant",
        onDrop: (targetId) => {
          const fromIndex = state.scriptIntroGroup.variants.findIndex((entry) => entry.id === variationDragState.id);
          const toIndex = state.scriptIntroGroup.variants.findIndex((entry) => entry.id === targetId);
          if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
            return;
          }
          moveItemInArray(state.scriptIntroGroup.variants, fromIndex, toIndex);
          updateBoardsAndBrief();
        },
        onRemove: (targetSection) => {
          const sourceIndex = state.scriptIntroGroup.variants.findIndex((entry) => entry.id === targetSection.id);
          if (sourceIndex < 0) {
            return;
          }
          state.scriptIntroGroup.variants.splice(sourceIndex, 1);
          updateBoardsAndBrief();
        },
      }),
    );
  });
  introGroupCard.appendChild(introVariantStack);
  refs.skeletonBoard.appendChild(introGroupCard);

  state.scriptSections.forEach((section) => {
    refs.skeletonBoard.appendChild(
      buildEditableSectionCard(section, {
        lockKind: false,
        copyLabel: "Copy Section",
        titlePlaceholder: "Section title",
        dragType: "script-section",
        onDrop: (targetId) => {
          const fromIndex = state.scriptSections.findIndex((entry) => entry.id === variationDragState.id);
          const toIndex = state.scriptSections.findIndex((entry) => entry.id === targetId);
          if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
            return;
          }
          moveItemInArray(state.scriptSections, fromIndex, toIndex);
          updateBoardsAndBrief();
        },
        onRemove: (targetSection) => {
          const sourceIndex = state.scriptSections.findIndex((entry) => entry.id === targetSection.id);
          if (sourceIndex < 0) {
            return;
          }
          state.scriptSections.splice(sourceIndex, 1);
          updateBoardsAndBrief();
        },
      }),
    );
  });
}

function renderScriptExportWorkspace() {
  if (!refs.draftBoard) {
    return;
  }
  refs.draftBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.draftBoard.innerHTML = '<p class="pipeline-empty">Create or select a brief to review the compiled script.</p>';
    return;
  }

  const controls = document.createElement("div");
  controls.className = "script-draft-read-toolbar";
  const copyAllBtn = document.createElement("button");
  copyAllBtn.type = "button";
  copyAllBtn.className = "btn btn-muted";
  copyAllBtn.textContent = "Copy Full Script";
  copyAllBtn.addEventListener("click", async () => {
    const compiled = getCompiledScriptText();
    if (!compiled) {
      flashButtonText(copyAllBtn, "Empty", 900);
      return;
    }
    const didCopy = await copyTextToClipboard(compiled);
    flashButtonText(copyAllBtn, didCopy ? "Copied" : "Copy Failed", 1100);
  });
  const copyJsonBtn = document.createElement("button");
  copyJsonBtn.type = "button";
  copyJsonBtn.className = "btn btn-muted";
  copyJsonBtn.textContent = "Copy Script JSON";
  copyJsonBtn.addEventListener("click", () => copyScriptMetadataJson(copyJsonBtn));
  const draftLayout = normalizeScriptDraftLayout(state.scriptDraftLayout);
  state.scriptDraftLayout = draftLayout;
  const colorEnabled = normalizeScriptDraftColorEnabled(state.scriptDraftShowColors);
  state.scriptDraftShowColors = colorEnabled;

  [
    { id: "plain", label: "Plain" },
    { id: "script", label: "Script" },
  ].forEach((option) => {
    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "btn btn-muted";
    viewBtn.textContent = option.label;
    viewBtn.classList.toggle("is-active", draftLayout === option.id);
    viewBtn.addEventListener("click", () => {
      state.scriptDraftLayout = option.id;
      updateBoardsAndBrief();
    });
    controls.appendChild(viewBtn);
  });
  const colorBtn = document.createElement("button");
  colorBtn.type = "button";
  colorBtn.className = "btn btn-muted";
  colorBtn.textContent = colorEnabled ? "Color On" : "Color Off";
  colorBtn.classList.toggle("is-active", colorEnabled);
  colorBtn.addEventListener("click", () => {
    state.scriptDraftShowColors = !state.scriptDraftShowColors;
    updateBoardsAndBrief();
  });
  controls.appendChild(colorBtn);
  controls.prepend(copyJsonBtn);
  controls.prepend(copyAllBtn);
  refs.draftBoard.appendChild(controls);

  refs.draftBoard.classList.toggle("is-plain-script", !colorEnabled);
  refs.draftBoard.classList.toggle("is-script-draft", draftLayout === "script");

  const introGroup = normalizeScriptIntroGroup(state.scriptIntroGroup);
  state.scriptIntroGroup = introGroup;
  if (getIntroVariants(introGroup).length) {
    const groupCard = document.createElement("article");
    groupCard.className = "script-section-card pipeline-card list-row";
    groupCard.innerHTML = `
      <div class="script-section-header">
        <div><h3>${escapeHtml(toCleanText(introGroup.title) || getDefaultIntroGroupTitle())}</h3></div>
        <div class="intro-card-controls">
          <div class="script-section-meta">
            <span class="script-stat">Runtime ${formatDurationShort(
              getIntroVariants(introGroup).reduce((sum, section) => sum + getSectionDurationSeconds(section), 0),
            )}</span>
            <span class="script-stat">Intro group</span>
          </div>
        </div>
      </div>
    `;
    const groupActions = document.createElement("div");
    groupActions.className = "intro-card-actions";
    const copyGroupBtn = document.createElement("button");
    copyGroupBtn.type = "button";
    copyGroupBtn.className = "btn btn-muted";
    copyGroupBtn.textContent = "Copy Intro Group";
    copyGroupBtn.addEventListener("click", async () => {
      const text = getIntroGroupPlainText(introGroup);
      if (!text) {
        flashButtonText(copyGroupBtn, "Empty", 900);
        return;
      }
      const didCopy = await copyTextToClipboard(text);
      flashButtonText(copyGroupBtn, didCopy ? "Copied" : "Copy Failed", 1100);
    });
    groupActions.appendChild(copyGroupBtn);
    groupCard.querySelector(".intro-card-controls").appendChild(groupActions);

    const variantStack = document.createElement("div");
    variantStack.className = "script-subsection-stack";
    getIntroVariants(introGroup).forEach((section) => {
      variantStack.appendChild(buildReadonlyScriptSectionCard(section, colorEnabled));
    });
    groupCard.appendChild(variantStack);
    refs.draftBoard.appendChild(groupCard);
  }

  normalizeScriptSectionCollection(state.scriptSections).forEach((section) => {
    refs.draftBoard.appendChild(buildReadonlyScriptSectionCard(section, colorEnabled));
  });
}

function buildReadonlyScriptSectionCard(section, colorEnabled) {
  const card = document.createElement("article");
  card.className = "script-section-card pipeline-card list-row";
  const header = document.createElement("div");
  header.className = "script-section-header";
  header.innerHTML = `
    <div>
      <h3>${escapeHtml(section.title)}</h3>
    </div>
    <div class="intro-card-controls">
      <div class="script-section-meta">
        <span class="script-stat">Runtime ${formatDurationShort(getSectionDurationSeconds(section))}</span>
        <span class="script-stat">${escapeHtml(getScriptSectionKindLabel(section.kind))}</span>
      </div>
    </div>
  `;
  const headerTools = document.createElement("div");
  headerTools.className = "intro-card-actions";
  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "btn btn-muted";
  copyBtn.textContent = section.kind === "intro" ? "Copy Intro" : "Copy Section";
  copyBtn.addEventListener("click", async () => {
    const copyText = getSectionPlainText(section);
    if (!copyText) {
      flashButtonText(copyBtn, "Empty", 900);
      return;
    }
    const didCopy = await copyTextToClipboard(copyText);
    flashButtonText(copyBtn, didCopy ? "Copied" : "Copy Failed", 1100);
  });
  headerTools.appendChild(copyBtn);
  header.querySelector(".intro-card-controls").appendChild(headerTools);
  card.appendChild(header);

  const stack = document.createElement("div");
  stack.className = "script-intro-sentence-stack";
  const nonEmptyLines = getLiveScriptSectionItemCollection(section.items).filter((item) => toCleanText(item.text));
  if (!nonEmptyLines.length) {
    stack.innerHTML = '<p class="pipeline-empty">No script lines yet.</p>';
  } else {
    nonEmptyLines.forEach((item) => {
      const lineCard = document.createElement("article");
      lineCard.className = "script-sentence-card script-readonly-line";
      lineCard.dataset.scriptType = colorEnabled ? item.type : "";
      const summary = document.createElement("div");
      summary.className = "script-sentence-summary script-readonly-summary";
      const content = document.createElement("div");
      content.className = "script-sentence-summary-content script-sentence-summary-content-inline";
      const badge = document.createElement("span");
      badge.className = "script-sentence-type-badge";
      const typeMeta = getScriptSentenceTypeMeta(item.type);
      badge.hidden = !colorEnabled || !typeMeta.id;
      badge.textContent = typeMeta.id ? typeMeta.label : "";
      const text = document.createElement("span");
      text.className = "script-sentence-line";
      text.textContent = item.text;
      content.append(text, badge);
      summary.append(content);
      lineCard.append(summary);
      stack.appendChild(lineCard);
    });
  }
  card.appendChild(stack);
  return card;
}

function renderBriefListBoard() {
  if (!refs.briefListBoard || !refs.briefListItemTemplate) {
    return;
  }

  refs.briefListBoard.innerHTML = "";
  const briefState = getActiveChannelBriefState();
  const activeBriefId = toCleanText(state.activeBriefId) || briefState.activeBriefId;
  const allTags = Array.from(
    new Set(briefState.briefs.flatMap((brief) => normalizeBriefTags(brief.tags))),
  ).sort((left, right) => left.localeCompare(right));

  if (refs.briefListSort) {
    setInputValueIfChanged(refs.briefListSort, normalizeBriefListSort(state.briefListSort));
  }
  if (refs.briefTagFilter) {
    const normalizedFilter = normalizeBriefTagFilter(state.briefTagFilter);
    state.briefTagFilter = normalizedFilter === "all" || allTags.includes(normalizedFilter) ? normalizedFilter : "all";
    refs.briefTagFilter.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All tags";
    refs.briefTagFilter.appendChild(allOption);
    allTags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      refs.briefTagFilter.appendChild(option);
    });
    refs.briefTagFilter.value = state.briefTagFilter;
  }

  if (!briefState.briefs.length) {
    refs.briefListBoard.innerHTML =
      '<p class="pipeline-empty">No briefs yet. Promote a Phase 3 idea or create a manual brief.</p>';
    return;
  }

  const filteredBriefs =
    state.briefTagFilter === "all"
      ? [...briefState.briefs]
      : briefState.briefs.filter((brief) => normalizeBriefTags(brief.tags).includes(state.briefTagFilter));
  const sortedBriefs = filteredBriefs.sort((left, right) => {
    const leftCreated = normalizeTimestamp(left.createdAt);
    const rightCreated = normalizeTimestamp(right.createdAt);
    if (state.briefListSort === "oldest") {
      return leftCreated - rightCreated;
    }
    if (state.briefListSort === "tag-asc") {
      const leftTag = getPrimaryBriefTag(left);
      const rightTag = getPrimaryBriefTag(right);
      if (leftTag && rightTag) {
        const byTag = leftTag.localeCompare(rightTag);
        if (byTag !== 0) {
          return byTag;
        }
      } else if (leftTag || rightTag) {
        return leftTag ? -1 : 1;
      }
    }
    return rightCreated - leftCreated;
  });

  if (!sortedBriefs.length) {
    refs.briefListBoard.innerHTML =
      '<p class="pipeline-empty">No briefs match the selected tag yet. Clear the filter or add tags inside a brief.</p>';
    return;
  }

  sortedBriefs.forEach((brief) => {
    const index = briefState.briefs.findIndex((item) => item.id === brief.id);
    const fragment = refs.briefListItemTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const openBtn = fragment.querySelector('button[data-action="openBrief"]');
    const titleEl = fragment.querySelector('[data-role="briefTitle"]');
    const tagsEl = fragment.querySelector('[data-role="briefTags"]');
    const metaEl = fragment.querySelector('[data-role="briefMeta"]');
    const statusEl = fragment.querySelector('[data-role="briefStatus"]');
    const updatedEl = fragment.querySelector('[data-role="briefUpdated"]');

    titleEl.textContent = getBriefDisplayTitle(brief, index);
    metaEl.textContent = `Created ${formatBriefCreatedAt(brief.createdAt)}`;
    if (tagsEl) {
      tagsEl.innerHTML = "";
      normalizeBriefTags(brief.tags).forEach((tag) => {
        const pill = document.createElement("span");
        pill.className = "brief-tag-pill";
        pill.textContent = tag;
        tagsEl.appendChild(pill);
      });
      tagsEl.hidden = !tagsEl.childElementCount;
    }
    statusEl.textContent = formatBriefStatus(brief.status);
    updatedEl.textContent = `Updated ${formatBriefUpdatedAt(brief.updatedAt)}`;
    card.classList.toggle("is-active", brief.id === activeBriefId);
    card.dataset.briefStatus = normalizeBriefStatus(brief.status);
    setPipelineRowExpanded(card, detailsEl, arrowEl, state.briefListExpandedId === brief.id);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.briefListBoard, card, detailsEl, arrowEl);
      state.briefListExpandedId = card.dataset.expanded === "true" ? brief.id : "";
    });

    openBtn.addEventListener("click", () => {
      setActiveBrief(brief.id, false);
      state.briefListExpandedId = "";
      setPageView("brief-detail");
    });

    refs.briefListBoard.appendChild(fragment);
  });
}

function setBriefEditorEnabled(enabled) {
  const fieldControlIds = [...fieldIds];
  fieldControlIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.disabled = !enabled;
    }
  });

  if (refs.quickTitleInput) {
    refs.quickTitleInput.disabled = !enabled;
  }
  if (refs.addQuickTitleBtn) {
    refs.addQuickTitleBtn.disabled = !enabled;
  }
  if (refs.quickThumbnailTextInput) {
    refs.quickThumbnailTextInput.disabled = !enabled;
  }
  if (refs.addQuickThumbnailTextBtn) {
    refs.addQuickThumbnailTextBtn.disabled = !enabled;
  }
  if (refs.addThumbnailUploadBtn) {
    refs.addThumbnailUploadBtn.disabled = !enabled;
  }
  if (refs.thumbnailFileInput) {
    refs.thumbnailFileInput.disabled = !enabled;
  }
  if (refs.thumbnailPasteZone) {
    refs.thumbnailPasteZone.classList.toggle("is-disabled", !enabled);
    refs.thumbnailPasteZone.tabIndex = enabled ? 0 : -1;
  }
  if (refs.comparableUrl) {
    refs.comparableUrl.disabled = !enabled;
  }
  if (refs.addComparableBtn) {
    refs.addComparableBtn.disabled = !enabled;
  }
  if (refs.toggleInspirationLibraryBtn) {
    refs.toggleInspirationLibraryBtn.disabled = !enabled;
  }
  if (refs.briefTagsInput) {
    refs.briefTagsInput.disabled = !enabled;
  }
  if (refs.addInspirationUploadBtn) {
    refs.addInspirationUploadBtn.disabled = !enabled;
  }
  if (refs.inspirationFileInput) {
    refs.inspirationFileInput.disabled = !enabled;
  }
  if (refs.inspirationPasteZone) {
    refs.inspirationPasteZone.classList.toggle("is-disabled", !enabled);
    refs.inspirationPasteZone.tabIndex = enabled ? 0 : -1;
  }
  if (refs.briefStatusSelect) {
    refs.briefStatusSelect.disabled = !enabled;
  }
  if (refs.showPackagingWorkspaceBtn) {
    refs.showPackagingWorkspaceBtn.disabled = !enabled;
  }
  if (refs.showScriptingWorkspaceBtn) {
    refs.showScriptingWorkspaceBtn.disabled = !enabled;
  }
  if (refs.showScriptDraftBtn) {
    refs.showScriptDraftBtn.disabled = !enabled;
  }
  if (refs.showScriptExportBtn) {
    refs.showScriptExportBtn.disabled = !enabled;
  }
  if (refs.addScriptSectionBtn) {
    refs.addScriptSectionBtn.disabled = !enabled;
  }
  if (refs.addIntroVariantBtn) {
    refs.addIntroVariantBtn.disabled = !enabled;
  }
}

function renderBriefExportControls() {
  const activeBrief = getActiveBriefRecord();
  const hasActiveBrief = Boolean(activeBrief);
  const hasScript = Boolean(getCompiledScriptText());
  if (refs.exportPackagingBriefPdfBtn) {
    refs.exportPackagingBriefPdfBtn.disabled = !hasActiveBrief;
  }
  if (refs.exportProductionBriefPdfBtn) {
    refs.exportProductionBriefPdfBtn.disabled = !hasActiveBrief;
  }
  if (refs.openScriptExportBtn) {
    refs.openScriptExportBtn.disabled = !hasActiveBrief || !hasScript;
  }
  if (refs.copyScriptMetadataJsonBtn) {
    refs.copyScriptMetadataJsonBtn.disabled = !hasActiveBrief || !hasScript;
  }
  if (refs.exportAnalyticsBriefBtn) {
    refs.exportAnalyticsBriefBtn.disabled = true;
  }
  if (!refs.briefExportHint) {
    return;
  }

  if (!hasActiveBrief) {
    refs.briefExportHint.textContent = "Select a brief to export.";
    return;
  }
  if (!hasScript) {
    refs.briefExportHint.textContent =
      "Packaging and Production exports are ready. Script Export unlocks after you add at least 1 script section.";
    return;
  }

  refs.briefExportHint.textContent = `Packaging Brief, Production Brief, and Script Export are ready. Total script runtime ${formatDurationShort(
    getScriptTotalDurationSeconds(),
  )}.`;
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

  card.dataset.status = normalizeIdeaStatus(status, "none");
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
    if (view.status !== "all" && normalizeIdeaStatus(item.status, "none") !== view.status) {
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

  const visible = filtered.filter((item) => {
    if (state.showDiscarded) {
      return true;
    }

    return normalizeIdeaStatus(item.status, "none") !== "red";
  });

  const sorted = [...visible];
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
    preVisibilityCount: filtered.length,
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
    refs.step1Board.innerHTML = '<p class="pipeline-empty">No ideas in Phase 1 yet. Add fast entries.</p>';
    return;
  }

  if (!viewState.filteredCount) {
    if (!state.showDiscarded && viewState.preVisibilityCount > 0) {
      refs.step1Board.innerHTML =
        '<p class="pipeline-empty">All matching ideas are discarded and hidden. Click "Show Discarded".</p>';
      return;
    }

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
    const summaryPromoteEl = fragment.querySelector('[data-role="summaryPromote"]');
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
      const normalizedStatus = normalizeIdeaStatus(item.status, "none");
      titleEl.textContent = ideaText || "Untitled brainstorm";
      lineTitleEl.textContent = ideaText || "Untitled brainstorm";
      lineStatusEl.textContent = normalizedStatus === "none" ? "" : formatStatusLabel(normalizedStatus);
      lineStatusEl.hidden = normalizedStatus === "none";
      lineMetaEl.textContent = `${ownerText} · Added ${formatAddedAt(item.createdAt)}`;
      createdAtEl.textContent = `Added ${formatAddedAt(item.createdAt)}`;
    };

    refreshText();
    nameEl.value = item.name;
    ideaEl.value = item.videoIdea;
    sourceEl.value = item.source;
    hypothesisEl.value = item.hypothesis;
    notesEl.value = item.notes;

    statusSelect.value = normalizeIdeaStatus(item.status, "none");
    setPipelineCardStatus(card, statusSelect.value);
    setPipelineRowExpanded(card, detailsEl, arrowEl, false);

    const promoteStep1Record = () => {
      const sourceIndex = state.step1Ideas.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      const record = state.step1Ideas[sourceIndex];
      if (!toCleanText(record.videoIdea)) {
        flashButtonText(promoteBtn, "Need idea", 1000);
        flashInlineText(summaryPromoteEl, "Need idea", 1000);
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
          status: "none",
        }),
      );
      state.step1Ideas.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    };

    summaryBtn.addEventListener("click", (event) => {
      if (summaryPromoteEl && event.target && summaryPromoteEl.contains(event.target)) {
        event.preventDefault();
        promoteStep1Record();
        return;
      }

      togglePipelineRow(refs.step1Board, card, detailsEl, arrowEl);
    });

    statusSelect.addEventListener("change", () => {
      const record = state.step1Ideas.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.status = normalizeIdeaStatus(statusSelect.value, "none");
      setPipelineCardStatus(card, record.status);
      refs.step1Count.textContent = formatStatusCounts(state.step1Ideas);
      item.status = record.status;
      refreshText();
      if (state.step1View.status !== "all" || (!state.showDiscarded && record.status === "red")) {
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

    promoteBtn.addEventListener("click", promoteStep1Record);

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

  const visibleIdeas = state.step2Ideas.filter((item) => {
    if (state.showDiscarded) {
      return true;
    }

    return normalizeIdeaStatus(item.status, "none") !== "red";
  });

  if (!visibleIdeas.length) {
    refs.step2Board.innerHTML =
      '<p class="pipeline-empty">All ideas in this phase are discarded and hidden. Click "Show Discarded".</p>';
    return;
  }

  visibleIdeas.forEach((item, index) => {
    const itemId = item.id;
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
    const demoteBtn = fragment.querySelector('button[data-action="demote"]');
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
      lineStatusEl.hidden = normalizeIdeaStatus(item.status, "none") === "none";
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
      if (!state.showDiscarded && item.status === "red") {
        renderStep2Board();
      }
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
      const sourceIndex = state.step2Ideas.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      const record = state.step2Ideas[sourceIndex];
      if (!toCleanText(item.videoIdea)) {
        flashButtonText(promoteBtn, "Need idea", 1000);
        return;
      }

      state.step3Ideas.unshift(
        createStep3Idea({
          videoIdea: record.videoIdea,
          notes: record.notes,
          titleThumbLink: record.titleThumbCombos,
          hypothesisMetric: record.hookDrafts,
          status: "none",
        }),
      );
      state.step2Ideas.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    });

    demoteBtn.addEventListener("click", () => {
      const sourceIndex = state.step2Ideas.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      const record = state.step2Ideas[sourceIndex];
      const ownerName = getPrimaryChannelOwnerName(getActiveChannelRecord());

      state.step1Ideas.unshift(
        createStep1Idea({
          name: ownerName,
          videoIdea: record.videoIdea,
          source: record.titleThumbCombos,
          hypothesis: record.hookDrafts,
          notes: record.notes,
          status: "none",
        }),
      );
      state.step2Ideas.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      const sourceIndex = state.step2Ideas.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.step2Ideas.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    });

    refs.step2Board.appendChild(fragment);
  });
}

function renderStep3Board() {
  refs.step3Board.innerHTML = "";
  refs.step3Count.textContent = formatStatusCounts(state.step3Ideas);

  if (!state.step3Ideas.length) {
    refs.step3Board.innerHTML =
      '<p class="pipeline-empty">No ideas in Phase 3 yet. Promote from Phase 2 to build experiment-ready concepts.</p>';
    return;
  }

  const visibleIdeas = state.step3Ideas.filter((item) => {
    if (state.showDiscarded) {
      return true;
    }

    return normalizeIdeaStatus(item.status, "none") !== "red";
  });

  if (!visibleIdeas.length) {
    refs.step3Board.innerHTML =
      '<p class="pipeline-empty">All ideas in this phase are discarded and hidden. Click "Show Discarded".</p>';
    return;
  }

  visibleIdeas.forEach((item, index) => {
    const itemId = item.id;
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
    const demoteBtn = fragment.querySelector('button[data-action="demote"]');
    const startBriefBtn = fragment.querySelector('button[data-action="startBrief"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const ideaEl = fragment.querySelector('[data-field="videoIdea"]');
    const notesEl = fragment.querySelector('[data-field="notes"]');
    const linkEl = fragment.querySelector('[data-field="titleThumbLink"]');
    const hypothesisEl = fragment.querySelector('[data-field="hypothesisMetric"]');
    const insightsEl = fragment.querySelector('[data-field="insights"]');

    const refreshText = () => {
      const ideaText = toCleanText(item.videoIdea);
      const ideaLifecycle = formatStep3LifecycleLabel(item.lifecycleStatus);
      titleEl.textContent = ideaText || `Phase 3 Idea ${index + 1}`;
      lineTitleEl.textContent = ideaText || `Phase 3 Idea ${index + 1}`;
      lineStatusEl.textContent = formatStatusLabel(item.status);
      lineStatusEl.hidden = normalizeIdeaStatus(item.status, "none") === "none";
      lineMetaEl.textContent = `${ideaLifecycle} · ${summarizeLine(item.hypothesisMetric || item.insights || item.notes)}`;
      startBriefBtn.textContent = toCleanText(item.promotedBriefId) ? "Open Brief" : "Promote to Brief";
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
      if (!state.showDiscarded && item.status === "red") {
        renderStep3Board();
      }
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
      promoteStep3IdeaToBrief(item, startBriefBtn);
    });

    demoteBtn.addEventListener("click", () => {
      const sourceIndex = state.step3Ideas.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      const record = state.step3Ideas[sourceIndex];
      state.step2Ideas.unshift(
        createStep2Idea({
          videoIdea: record.videoIdea,
          notes: record.notes,
          hookDrafts: record.hypothesisMetric,
          titleThumbCombos: record.titleThumbLink,
          status: normalizeIdeaStatus(record.status, "none"),
        }),
      );
      state.step3Ideas.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      const sourceIndex = state.step3Ideas.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.step3Ideas.splice(sourceIndex, 1);
      updateBoardsAndBrief();
    });

    refs.step3Board.appendChild(fragment);
  });
}

function defaultTitleScores() {
  return {
    curiosity: 0,
    clarity: 0,
    uniqueness: 0,
    promise: 0,
  };
}

function defaultThumbScores() {
  return {
    emotion: 0,
    contrast: 0,
    clarity: 0,
    intent: 0,
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

function normalizeBriefTags(tags) {
  const source = Array.isArray(tags)
    ? tags
    : String(tags || "")
        .split(",");
  const seen = new Set();
  return source
    .map((tag) => toCleanText(tag))
    .filter((tag) => {
      const key = tag.toLowerCase();
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function formatBriefTags(tags) {
  return normalizeBriefTags(tags).join(", ");
}

function getPrimaryBriefTag(brief = {}) {
  return normalizeBriefTags(brief.tags)[0] || "";
}

function averageScore(scores) {
  const values = Object.values(scores);
  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);
  return total / values.length;
}

function summarizeRowNotes(value, fallback = "") {
  const cleaned = toCleanText(value).replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return fallback;
  }

  return summarizeLine(cleaned, "", 68);
}

function captureVariationPositions(container) {
  if (!container) {
    return null;
  }

  const positions = new Map();
  container.querySelectorAll("[data-variation-id]").forEach((row) => {
    positions.set(row.dataset.variationId, row.getBoundingClientRect());
  });

  return positions;
}

function animateVariationReorder(container, previousPositions) {
  if (!container || !previousPositions || !previousPositions.size) {
    return;
  }

  container.querySelectorAll("[data-variation-id]").forEach((row) => {
    const id = row.dataset.variationId;
    const previousRect = previousPositions.get(id);
    if (!previousRect) {
      return;
    }

    const nextRect = row.getBoundingClientRect();
    const deltaX = previousRect.left - nextRect.left;
    const deltaY = previousRect.top - nextRect.top;
    if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
      return;
    }

    row.classList.add("is-reordering");
    row.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    requestAnimationFrame(() => {
      row.style.transform = "translate(0, 0)";
    });

    const cleanup = () => {
      row.classList.remove("is-reordering");
      row.style.transform = "";
      row.removeEventListener("transitionend", cleanup);
    };
    row.addEventListener("transitionend", cleanup);
  });
}

function moveItemInArray(items = [], fromIndex = 0, toIndex = 0) {
  if (!Array.isArray(items) || fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return false;
  }

  if (fromIndex >= items.length || toIndex >= items.length) {
    return false;
  }

  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  return true;
}

function syncProjectNameFromTopTitle(options = {}) {
  const projectNameInput = document.getElementById("projectName");
  if (!projectNameInput) {
    return false;
  }

  const topTitle = state.titles[0];
  if (!topTitle) {
    return false;
  }

  const nextTitle = toCleanText(topTitle.text);
  if (toCleanText(projectNameInput.value) === nextTitle) {
    return false;
  }

  projectNameInput.value = nextTitle;
  if (options.refresh) {
    updateScoreboard(getFieldValues());
    updateBriefOutput(getFieldValues());
  }
  return true;
}

function beginVariationDrag(event, type, id) {
  variationDragState.type = toCleanText(type);
  variationDragState.id = toCleanText(id);
  if (event?.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", variationDragState.id);
  }
}

function canVariationDrop(type, targetId) {
  return (
    variationDragState.type === toCleanText(type) &&
    Boolean(variationDragState.id) &&
    variationDragState.id !== toCleanText(targetId)
  );
}

function clearVariationDropTargets() {
  document.querySelectorAll(".list-row.is-drop-target").forEach((row) => {
    row.classList.remove("is-drop-target");
  });

  variationDragState.type = "";
  variationDragState.id = "";
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

  return uniqueItems(patterns)
    .map((text) => createTitleRecord({ text }))
    .filter(Boolean);
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

  return concepts.map((item) =>
    createThumbnailRecord({
      title: item.title,
      meta: item.meta,
      notes: "",
      imageSrc: "",
      scores: defaultThumbScores(),
    }),
  );
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

function applyComparablePreviewImage(img, item = {}) {
  if (!(img instanceof HTMLImageElement)) {
    return;
  }

  const videoId = toCleanText(item.videoId);
  const fallbackSrc = toCleanText(item.imageSrc) || (videoId ? getThumbUrl(videoId, "hq") : "");
  const preferredSrc = videoId ? getThumbUrl(videoId, "max") : fallbackSrc;
  if (!preferredSrc) {
    img.removeAttribute("src");
    return;
  }

  let retriedFallback = false;
  img.onerror = () => {
    if (retriedFallback || !fallbackSrc || fallbackSrc === preferredSrc) {
      img.onerror = null;
      return;
    }

    retriedFallback = true;
    img.src = fallbackSrc;
  };
  img.src = preferredSrc;
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
  if (!refs.titleBoard || !refs.titleTemplate) {
    return;
  }

  const previousPositions = pendingTitleReorderPositions;
  pendingTitleReorderPositions = null;
  refs.titleBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.titleBoard.innerHTML = '<p class="hint">Create or select a brief to edit title variations.</p>';
    return;
  }

  if (!state.titles.length) {
    refs.titleBoard.innerHTML = '<p class="hint">No title ideas yet. Add one above.</p>';
    return;
  }

  state.titles.forEach((item, index) => {
    const itemId = toCleanText(item.id);
    const fragment = refs.titleTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineTitleEl = fragment.querySelector('[data-role="lineTitle"]');
    const lineStatusEl = fragment.querySelector('[data-role="lineStatus"]');
    const lineMetaEl = fragment.querySelector('[data-role="lineMeta"]');
    const dragBtn = fragment.querySelector('[data-action="drag"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const titleInput = fragment.querySelector('[data-field="text"]');
    const notesInput = fragment.querySelector('[data-field="notes"]');
    const scoreInputs = fragment.querySelectorAll("input[data-score]");

    card.dataset.variationId = itemId;
    lineTitleEl.textContent = toCleanText(item.text) || "Untitled title";
    lineMetaEl.textContent = summarizeRowNotes(item.notes, "");
    lineMetaEl.hidden = !toCleanText(lineMetaEl.textContent);
    lineStatusEl.textContent = index === 0 ? "Video Title" : "";
    lineStatusEl.hidden = index !== 0;
    card.classList.toggle("is-video-title", index === 0);
    titleInput.value = item.text;
    notesInput.value = item.notes;
    setPipelineRowExpanded(card, detailsEl, arrowEl, state.titleExpandedId === itemId);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.titleBoard, card, detailsEl, arrowEl);
      state.titleExpandedId = card.dataset.expanded === "true" ? itemId : "";
    });

    dragBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    dragBtn.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
    dragBtn.addEventListener("dragstart", (event) => {
      beginVariationDrag(event, "title", itemId);
    });
    dragBtn.addEventListener("dragend", () => {
      clearVariationDropTargets();
    });

    card.addEventListener("dragover", (event) => {
      if (canVariationDrop("title", itemId)) {
        event.preventDefault();
        card.classList.add("is-drop-target");
      }
    });
    card.addEventListener("dragleave", () => {
      card.classList.remove("is-drop-target");
    });
    card.addEventListener("drop", (event) => {
      if (!canVariationDrop("title", itemId)) {
        return;
      }

      event.preventDefault();
      const draggedId = variationDragState.id;
      clearVariationDropTargets();
      const fromIndex = state.titles.findIndex((entry) => entry.id === draggedId);
      const toIndex = state.titles.findIndex((entry) => entry.id === itemId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return;
      }

      pendingTitleReorderPositions = captureVariationPositions(refs.titleBoard);
      moveItemInArray(state.titles, fromIndex, toIndex);
      syncProjectNameFromTopTitle();
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      const sourceIndex = state.titles.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.titles.splice(sourceIndex, 1);
      if (state.titleExpandedId === itemId) {
        state.titleExpandedId = "";
      }
      syncProjectNameFromTopTitle();
      updateBoardsAndBrief();
    });

    titleInput.addEventListener("input", () => {
      const sourceIndex = state.titles.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.titles[sourceIndex].text = titleInput.value;
      lineTitleEl.textContent = toCleanText(titleInput.value) || "Untitled title";
      if (sourceIndex === 0) {
        syncProjectNameFromTopTitle({ refresh: true });
      }
      updatePackagingPreview();
      saveSnapshot();
    });

    notesInput.addEventListener("input", () => {
      const sourceIndex = state.titles.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.titles[sourceIndex].notes = notesInput.value;
      lineMetaEl.textContent = summarizeRowNotes(notesInput.value, "");
      lineMetaEl.hidden = !toCleanText(lineMetaEl.textContent);
      saveSnapshot();
    });

    scoreInputs.forEach((input) => {
      const key = input.dataset.score;
      input.value = item.scores[key];
      input.addEventListener("input", () => {
        const sourceIndex = state.titles.findIndex((entry) => entry.id === itemId);
        if (sourceIndex < 0) {
          return;
        }

        state.titles[sourceIndex].scores[key] = Number(input.value);
        saveSnapshot();
      });
    });

    refs.titleBoard.appendChild(fragment);
  });

  if (previousPositions) {
    animateVariationReorder(refs.titleBoard, previousPositions);
  }
}

function renderThumbnailTextBoard() {
  if (!refs.thumbnailTextBoard || !refs.titleTemplate) {
    return;
  }

  const previousPositions = pendingThumbnailTextReorderPositions;
  pendingThumbnailTextReorderPositions = null;
  refs.thumbnailTextBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.thumbnailTextBoard.innerHTML = '<p class="hint">Create or select a brief to edit thumbnail text.</p>';
    return;
  }

  if (!state.thumbnailTexts.length) {
    refs.thumbnailTextBoard.innerHTML = '<p class="hint">No thumbnail text options yet. Add one above.</p>';
    return;
  }

  state.thumbnailTexts.forEach((item, index) => {
    const itemId = toCleanText(item.id);
    const fragment = refs.titleTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineTitleEl = fragment.querySelector('[data-role="lineTitle"]');
    const lineStatusEl = fragment.querySelector('[data-role="lineStatus"]');
    const lineMetaEl = fragment.querySelector('[data-role="lineMeta"]');
    const dragBtn = fragment.querySelector('[data-action="drag"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const titleInput = fragment.querySelector('[data-field="text"]');
    const notesInput = fragment.querySelector('[data-field="notes"]');
    const scoreInputs = fragment.querySelectorAll("input[data-score]");

    card.dataset.variationId = itemId;
    lineTitleEl.textContent = toCleanText(item.text) || "Untitled thumbnail text";
    lineMetaEl.textContent = summarizeRowNotes(item.notes, "");
    lineMetaEl.hidden = !toCleanText(lineMetaEl.textContent);
    lineStatusEl.textContent = index === 0 ? "Lead Thumbnail Text" : "";
    lineStatusEl.hidden = index !== 0;
    card.classList.toggle("is-video-title", index === 0);
    titleInput.value = item.text;
    notesInput.value = item.notes;
    setPipelineRowExpanded(card, detailsEl, arrowEl, state.thumbnailTextExpandedId === itemId);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.thumbnailTextBoard, card, detailsEl, arrowEl);
      state.thumbnailTextExpandedId = card.dataset.expanded === "true" ? itemId : "";
    });

    dragBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    dragBtn.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
    dragBtn.addEventListener("dragstart", (event) => {
      beginVariationDrag(event, "thumb-text", itemId);
    });
    dragBtn.addEventListener("dragend", () => {
      clearVariationDropTargets();
    });

    card.addEventListener("dragover", (event) => {
      if (canVariationDrop("thumb-text", itemId)) {
        event.preventDefault();
        card.classList.add("is-drop-target");
      }
    });
    card.addEventListener("dragleave", () => {
      card.classList.remove("is-drop-target");
    });
    card.addEventListener("drop", (event) => {
      if (!canVariationDrop("thumb-text", itemId)) {
        return;
      }

      event.preventDefault();
      const draggedId = variationDragState.id;
      clearVariationDropTargets();
      const fromIndex = state.thumbnailTexts.findIndex((entry) => entry.id === draggedId);
      const toIndex = state.thumbnailTexts.findIndex((entry) => entry.id === itemId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return;
      }

      pendingThumbnailTextReorderPositions = captureVariationPositions(refs.thumbnailTextBoard);
      moveItemInArray(state.thumbnailTexts, fromIndex, toIndex);
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      const sourceIndex = state.thumbnailTexts.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnailTexts.splice(sourceIndex, 1);
      if (state.thumbnailTextExpandedId === itemId) {
        state.thumbnailTextExpandedId = "";
      }
      updateBoardsAndBrief();
    });

    titleInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnailTexts.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnailTexts[sourceIndex].text = titleInput.value;
      lineTitleEl.textContent = toCleanText(titleInput.value) || "Untitled thumbnail text";
      saveSnapshot();
    });

    notesInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnailTexts.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnailTexts[sourceIndex].notes = notesInput.value;
      lineMetaEl.textContent = summarizeRowNotes(notesInput.value, "");
      lineMetaEl.hidden = !toCleanText(lineMetaEl.textContent);
      saveSnapshot();
    });

    scoreInputs.forEach((input) => {
      const key = input.dataset.score;
      input.value = item.scores[key];
      input.addEventListener("input", () => {
        const sourceIndex = state.thumbnailTexts.findIndex((entry) => entry.id === itemId);
        if (sourceIndex < 0) {
          return;
        }

        state.thumbnailTexts[sourceIndex].scores[key] = Number(input.value);
        saveSnapshot();
      });
    });

    refs.thumbnailTextBoard.appendChild(fragment);
  });

  if (previousPositions) {
    animateVariationReorder(refs.thumbnailTextBoard, previousPositions);
  }
}

function renderThumbBoard() {
  if (!refs.thumbnailBoard || !refs.thumbTemplate) {
    return;
  }

  const previousPositions = pendingThumbReorderPositions;
  pendingThumbReorderPositions = null;
  refs.thumbnailBoard.innerHTML = "";
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.thumbnailBoard.innerHTML = '<p class="pipeline-empty pipeline-empty-centered">Create or select a brief to edit thumbnail variations.</p>';
    return;
  }

  if (!state.thumbnails.length) {
    refs.thumbnailBoard.innerHTML = '<p class="pipeline-empty pipeline-empty-centered">No thumbnail concepts yet.</p>';
    return;
  }

  state.thumbnails.forEach((item) => {
    const itemId = toCleanText(item.id);
    const fragment = refs.thumbTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineImage = fragment.querySelector('[data-role="previewImage"]');
    const lineTitle = fragment.querySelector('[data-role="lineTitle"]');
    const lineMeta = fragment.querySelector('[data-role="lineMeta"]');
    const dragBtn = fragment.querySelector('[data-action="drag"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const titleInput = fragment.querySelector('[data-field="title"]');
    const creatorInput = fragment.querySelector('[data-field="creator"]');
    const imageInput = fragment.querySelector('[data-field="imageSrc"]');
    const metaInput = fragment.querySelector('[data-field="meta"]');
    const notesInput = fragment.querySelector('[data-field="notes"]');
    const scoreInputs = fragment.querySelectorAll("input[data-score]");

    const fallbackImage = toCleanText(state.comparables[0]?.imageSrc);
    const lineImageSrc = toCleanText(item.imageSrc) || fallbackImage || "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
    card.dataset.variationId = itemId;
    lineTitle.textContent = toCleanText(item.title) || "Untitled thumbnail";
    lineMeta.textContent = summarizeRowNotes(item.notes || item.meta || item.creator, "");
    lineImage.src = lineImageSrc;
    titleInput.value = item.title;
    creatorInput.value = item.creator || "";
    imageInput.value = item.imageSrc;
    metaInput.value = item.meta;
    notesInput.value = item.notes;
    setPipelineRowExpanded(card, detailsEl, arrowEl, state.thumbnailExpandedId === itemId);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.thumbnailBoard, card, detailsEl, arrowEl);
      state.thumbnailExpandedId = card.dataset.expanded === "true" ? itemId : "";
    });

    dragBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    dragBtn.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
    dragBtn.addEventListener("dragstart", (event) => {
      beginVariationDrag(event, "thumb", itemId);
    });
    dragBtn.addEventListener("dragend", () => {
      clearVariationDropTargets();
    });

    card.addEventListener("dragover", (event) => {
      if (canVariationDrop("thumb", itemId)) {
        event.preventDefault();
        card.classList.add("is-drop-target");
      }
    });
    card.addEventListener("dragleave", () => {
      card.classList.remove("is-drop-target");
    });
    card.addEventListener("drop", (event) => {
      if (!canVariationDrop("thumb", itemId)) {
        return;
      }

      event.preventDefault();
      const draggedId = variationDragState.id;
      clearVariationDropTargets();
      const fromIndex = state.thumbnails.findIndex((entry) => entry.id === draggedId);
      const toIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return;
      }

      pendingThumbReorderPositions = captureVariationPositions(refs.thumbnailBoard);
      moveItemInArray(state.thumbnails, fromIndex, toIndex);
      updateBoardsAndBrief();
    });

    removeBtn.addEventListener("click", () => {
      const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnails.splice(sourceIndex, 1);
      if (state.thumbnailExpandedId === itemId) {
        state.thumbnailExpandedId = "";
      }
      updateBoardsAndBrief();
    });

    titleInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnails[sourceIndex].title = titleInput.value;
      lineTitle.textContent = toCleanText(titleInput.value) || "Untitled thumbnail";
      updatePackagingPreview();
      saveSnapshot();
    });

    creatorInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnails[sourceIndex].creator = creatorInput.value;
      lineMeta.textContent = summarizeRowNotes(
        state.thumbnails[sourceIndex].notes || state.thumbnails[sourceIndex].meta || creatorInput.value,
        "",
      );
      saveSnapshot();
    });

    imageInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnails[sourceIndex].imageSrc = imageInput.value;
      lineImage.src =
        toCleanText(imageInput.value) || fallbackImage || "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
      updatePackagingPreview();
      saveSnapshot();
    });

    metaInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnails[sourceIndex].meta = metaInput.value;
      lineMeta.textContent = summarizeRowNotes(
        state.thumbnails[sourceIndex].notes || metaInput.value || state.thumbnails[sourceIndex].creator,
        "",
      );
      saveSnapshot();
    });

    notesInput.addEventListener("input", () => {
      const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.thumbnails[sourceIndex].notes = notesInput.value;
      lineMeta.textContent = summarizeRowNotes(
        notesInput.value || state.thumbnails[sourceIndex].meta || state.thumbnails[sourceIndex].creator,
        "",
      );
      saveSnapshot();
    });

    scoreInputs.forEach((input) => {
      const key = input.dataset.score;
      input.value = item.scores[key];
      input.addEventListener("input", () => {
        const sourceIndex = state.thumbnails.findIndex((entry) => entry.id === itemId);
        if (sourceIndex < 0) {
          return;
        }

        state.thumbnails[sourceIndex].scores[key] = Number(input.value);
        saveSnapshot();
      });
    });

    refs.thumbnailBoard.appendChild(fragment);
  });

  if (previousPositions) {
    animateVariationReorder(refs.thumbnailBoard, previousPositions);
  }
}

function getInspirationSourceMeta(item = {}) {
  const sourceKind = toCleanText(item.sourceKind);
  if (sourceKind === "brief-thumbnail") {
    return item.author ? `Thumbnail variation · ${item.author}` : "Thumbnail variation";
  }
  if (sourceKind === "brief-inspiration") {
    return item.author ? `Brief inspiration · ${item.author}` : "Brief inspiration";
  }

  const sourceUrl = toCleanText(item.sourceUrl);
  if (!sourceUrl) {
    return item.author ? `Channel: ${item.author}` : "Uploaded or pasted image.";
  }

  try {
    const host = new URL(sourceUrl).hostname.replace(/^www\./, "");
    if (item.author) {
      return `${host} · ${item.author}`;
    }
    return host;
  } catch {
    return item.author ? item.author : sourceUrl;
  }
}

function getComparableOriginContext(item = {}) {
  const sourceKind = toCleanText(item.sourceKind);
  const sourceBriefTitle = toCleanText(item.sourceBriefTitle);
  if (sourceKind === "brief-thumbnail") {
    const thumbTitle = toCleanText(item.sourceThumbnailTitle || item.title);
    if (sourceBriefTitle && thumbTitle) {
      return `Copied from thumbnail variation "${thumbTitle}" in ${sourceBriefTitle}`;
    }
    if (sourceBriefTitle) {
      return `Copied from thumbnail variations in ${sourceBriefTitle}`;
    }
  }
  if (sourceKind === "brief-inspiration" || sourceBriefTitle) {
    return sourceBriefTitle ? `Copied from inspiration in ${sourceBriefTitle}` : "Copied from another brief";
  }
  return "";
}

function getComparableSignature(item = {}) {
  return (
    toCleanText(item.videoId) ||
    toCleanText(item.sourceUrl) ||
    toCleanText(item.imageSrc) ||
    toCleanText(item.title)
  );
}

function copyComparableRecord(item = {}, overrides = {}) {
  return {
    id: createRecordId("insp"),
    imageSrc: toCleanText(overrides.imageSrc ?? item.imageSrc),
    sourceUrl: toCleanText(overrides.sourceUrl ?? item.sourceUrl),
    title: toCleanText(overrides.title ?? item.title),
    author: toCleanText(overrides.author ?? item.author),
    notes: toCleanText(overrides.notes ?? item.notes),
    sourceKind: toCleanText(overrides.sourceKind ?? item.sourceKind),
    sourceCollection: toCleanText(overrides.sourceCollection ?? item.sourceCollection),
    sourceChannelId: toCleanText(overrides.sourceChannelId ?? item.sourceChannelId),
    sourceChannelName: toCleanText(overrides.sourceChannelName ?? item.sourceChannelName),
    sourceBriefId: toCleanText(overrides.sourceBriefId ?? item.sourceBriefId),
    sourceBriefTitle: toCleanText(overrides.sourceBriefTitle ?? item.sourceBriefTitle),
    sourceThumbnailId: toCleanText(overrides.sourceThumbnailId ?? item.sourceThumbnailId),
    sourceThumbnailTitle: toCleanText(overrides.sourceThumbnailTitle ?? item.sourceThumbnailTitle),
    videoId: toCleanText(overrides.videoId ?? item.videoId),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function getAllCrossBriefInspirations() {
  const activeBriefId = toCleanText(state.activeBriefId);
  const assets = [];

  Object.values(state.briefsByChannel || {}).forEach((briefState) => {
    normalizeChannelBriefState(briefState).briefs.forEach((brief, index) => {
      if (brief.id === activeBriefId) {
        return;
      }

      normalizeComparableCollection(brief.comparables).forEach((item) => {
        assets.push({
          ...item,
          sourceKind: "brief-inspiration",
          sourceCollection: "brief-inspiration",
          sourceBriefId: brief.id,
          sourceBriefTitle: getBriefDisplayTitle(brief, index),
          sourceBriefStatus: formatBriefStatus(brief.status),
          sourceBriefTags: normalizeBriefTags(brief.tags),
        });
      });
    });
  });

  return assets;
}

function getAllCrossBriefThumbnailVariations() {
  const activeBriefId = toCleanText(state.activeBriefId);
  const assets = [];

  Object.values(state.briefsByChannel || {}).forEach((briefState) => {
    normalizeChannelBriefState(briefState).briefs.forEach((brief, index) => {
      if (brief.id === activeBriefId) {
        return;
      }

      normalizeThumbnailCollection(brief.thumbnails)
        .filter((item) => toCleanText(item.imageSrc))
        .forEach((item) => {
          assets.push({
            id: `thumblib-${item.id}`,
            imageSrc: toCleanText(item.imageSrc),
            sourceUrl: "",
            title: toCleanText(item.title),
            author: toCleanText(item.creator),
            notes: toCleanText(item.notes || item.meta),
            sourceKind: "brief-thumbnail",
            sourceCollection: "brief-thumbnails",
            sourceBriefId: brief.id,
            sourceBriefTitle: getBriefDisplayTitle(brief, index),
            sourceBriefStatus: formatBriefStatus(brief.status),
            sourceBriefTags: normalizeBriefTags(brief.tags),
            sourceThumbnailId: toCleanText(item.id),
            sourceThumbnailTitle: toCleanText(item.title),
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        });
    });
  });

  return assets;
}

function getInspirationLibrarySourceAssets() {
  if (state.inspirationLibrarySource === "brief-thumbnails") {
    return getAllCrossBriefThumbnailVariations();
  }
  return getAllCrossBriefInspirations();
}

function getInspirationLibrarySourceText(item = {}) {
  if (item.sourceKind === "brief-thumbnail") {
    return item.sourceBriefTitle
      ? `Thumbnail variation · ${item.sourceBriefTitle}${item.sourceBriefTags?.length ? ` · ${item.sourceBriefTags.join(", ")}` : ""}`
      : "Thumbnail variation · another brief";
  }
  return item.sourceBriefTitle
    ? `From ${item.sourceBriefTitle}${item.sourceBriefTags?.length ? ` · ${item.sourceBriefTags.join(", ")}` : ""}`
    : "From another brief";
}

function renderInspirationLibraryPopover() {
  if (!refs.inspirationLibraryPopover || !refs.inspirationLibraryList) {
    return;
  }

  refs.inspirationLibraryPopover.hidden = !state.inspirationLibraryOpen;
  if (!state.inspirationLibraryOpen) {
    return;
  }

  refs.inspirationLibrarySourceTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.inspirationSource === state.inspirationLibrarySource);
  });

  const assets = getInspirationLibrarySourceAssets().sort(
    (left, right) => normalizeTimestamp(right.updatedAt) - normalizeTimestamp(left.updatedAt),
  );
  if (refs.inspirationLibraryStatus) {
    refs.inspirationLibraryStatus.textContent = `${assets.length} available`;
  }

  const existingSignatures = new Set(state.comparables.map((item) => getComparableSignature(item)));
  refs.inspirationLibraryList.innerHTML = "";

  if (!assets.length) {
    const emptyText =
      state.inspirationLibrarySource === "brief-thumbnails"
        ? "No image-backed thumbnail variations exist in other briefs yet."
        : "No inspiration assets exist in other briefs yet.";
    refs.inspirationLibraryList.innerHTML = `<p class="hint">${escapeHtml(emptyText)}</p>`;
    return;
  }

  assets.forEach((item) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "inspiration-library-item";
    row.disabled = existingSignatures.has(getComparableSignature(item));

    const sourceText = getInspirationLibrarySourceText(item);
    row.innerHTML = `
      <span class="inspiration-library-thumb">
        <img src="${escapeHtml(toCleanText(item.imageSrc))}" alt="Inspiration asset preview" />
      </span>
      <span class="inspiration-library-copy">
        <span class="inspiration-library-title">${escapeHtml(toCleanText(item.title) || "Untitled inspiration")}</span>
        <span class="inspiration-library-meta">${escapeHtml(toCleanText(item.author) || "Unknown creator")}</span>
        <span class="inspiration-library-source">${sourceText}</span>
      </span>
      <span class="inspiration-library-add">${row.disabled ? "Added" : "Add"}</span>
    `;

    row.addEventListener("click", async () => {
      if (row.disabled) {
        return;
      }

      state.comparables.push(
        copyComparableRecord(item, {
          sourceKind: item.sourceKind,
          sourceCollection: item.sourceCollection,
          sourceChannelId: item.sourceChannelId,
          sourceChannelName: item.sourceChannelName,
          sourceBriefId: item.sourceBriefId,
          sourceBriefTitle: item.sourceBriefTitle,
          sourceThumbnailId: item.sourceThumbnailId,
          sourceThumbnailTitle: item.sourceThumbnailTitle,
        }),
      );
      updateBoardsAndBrief({ persist: false });
      await saveSnapshot({ immediate: true });
      renderInspirationLibraryPopover();
      flashButtonText(refs.toggleInspirationLibraryBtn, "Added", 900);
    });

    refs.inspirationLibraryList.appendChild(row);
  });
}

function renderComparableBoard() {
  if (!refs.comparableBoard || !refs.comparableTemplate) {
    return;
  }

  const previousPositions = pendingComparableReorderPositions;
  pendingComparableReorderPositions = null;
  refs.comparableBoard.innerHTML = "";
  renderInspirationLibraryPopover();
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.comparableBoard.innerHTML = '<p class="hint">Create or select a brief to add thumbnail inspiration.</p>';
    return;
  }

  if (!state.comparables.length) {
    refs.comparableBoard.innerHTML =
      '<p class="hint">No inspiration assets yet. Add a YouTube URL or paste/upload images.</p>';
    return;
  }

  const leadStack = document.createElement("div");
  leadStack.className = "inspiration-lead-stack";
  const compactGrid = document.createElement("div");
  compactGrid.className = "inspiration-compact-grid";
  refs.comparableBoard.append(leadStack, compactGrid);

  state.comparables.forEach((item, index) => {
    const itemId = toCleanText(item.id);
    const fragment = refs.comparableTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".pipeline-card");
    card.classList.toggle("comparable-row--compact", index >= 3);
    const summaryBtn = fragment.querySelector('button[data-action="toggle"]');
    const detailsEl = fragment.querySelector('[data-role="details"]');
    const arrowEl = fragment.querySelector('[data-role="expandArrow"]');
    const lineImage = fragment.querySelector('[data-role="lineImage"]');
    const detailImage = fragment.querySelector('[data-role="detailImage"]');
    const lineCreator = fragment.querySelector('[data-role="lineCreator"]');
    const lineMeta = fragment.querySelector('[data-role="lineMeta"]');
    const dragBtn = fragment.querySelector('[data-action="drag"]');
    const removeBtn = fragment.querySelector('button[data-action="remove"]');
    const authorInput = fragment.querySelector('[data-field="author"]');
    const titleInput = fragment.querySelector('[data-field="title"]');
    const sourceInput = fragment.querySelector('[data-field="sourceUrl"]');
    const notesInput = fragment.querySelector('[data-field="notes"]');
    const sourceLink = fragment.querySelector('[data-role="sourceLink"]');
    const sourceContextEl = fragment.querySelector('[data-role="sourceBrief"]');

    const imageSrc = toCleanText(item.imageSrc) || "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
    const creator = toCleanText(item.author) || "Uploaded image";
    const sourceBriefText = toCleanText(item.sourceBriefTitle);
    const sourceContextText = getComparableOriginContext(item);
    const summaryTitle = toCleanText(item.title) || (item.videoId ? `YouTube inspiration · ${item.videoId}` : "Image inspiration");
    const summaryMeta = [
      getInspirationSourceMeta(item),
      sourceContextText,
      toCleanText(item.notes),
    ]
      .filter(Boolean)
      .join(" · ");
    card.dataset.variationId = itemId;
    applyComparablePreviewImage(lineImage, item);
    applyComparablePreviewImage(detailImage, item);
    lineCreator.textContent = summaryTitle;
    lineMeta.textContent = summarizeRowNotes(summaryMeta, creator);
    authorInput.value = item.author;
    titleInput.value = item.title;
    sourceInput.value = item.sourceUrl;
    notesInput.value = item.notes;
    sourceLink.href = item.sourceUrl || "#";
    sourceLink.hidden = !toCleanText(item.sourceUrl);
    if (sourceContextEl) {
      sourceContextEl.textContent = sourceContextText;
      sourceContextEl.hidden = !sourceContextText;
    }
    setPipelineRowExpanded(card, detailsEl, arrowEl, state.comparableExpandedId === itemId);

    summaryBtn.addEventListener("click", () => {
      togglePipelineRow(refs.comparableBoard, card, detailsEl, arrowEl);
      state.comparableExpandedId = card.dataset.expanded === "true" ? itemId : "";
    });

    dragBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    dragBtn.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
    dragBtn.addEventListener("dragstart", (event) => {
      beginVariationDrag(event, "comparable", itemId);
    });
    dragBtn.addEventListener("dragend", () => {
      clearVariationDropTargets();
    });

    card.addEventListener("dragover", (event) => {
      if (canVariationDrop("comparable", itemId)) {
        event.preventDefault();
        card.classList.add("is-drop-target");
      }
    });
    card.addEventListener("dragleave", () => {
      card.classList.remove("is-drop-target");
    });
    card.addEventListener("drop", (event) => {
      if (!canVariationDrop("comparable", itemId)) {
        return;
      }

      event.preventDefault();
      const draggedId = variationDragState.id;
      clearVariationDropTargets();
      const fromIndex = state.comparables.findIndex((entry) => entry.id === draggedId);
      const toIndex = state.comparables.findIndex((entry) => entry.id === itemId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
        return;
      }

      pendingComparableReorderPositions = captureVariationPositions(refs.comparableBoard);
      moveItemInArray(state.comparables, fromIndex, toIndex);
      updateBoardsAndBrief({ persist: false });
      void saveSnapshot({ immediate: true });
    });

    titleInput.addEventListener("input", () => {
      const record = state.comparables.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.title = titleInput.value;
      record.updatedAt = Date.now();
      lineCreator.textContent =
        toCleanText(record.title) || (record.videoId ? `YouTube inspiration · ${record.videoId}` : "Image inspiration");
      lineMeta.textContent = summarizeRowNotes(
        [getInspirationSourceMeta(record), getComparableOriginContext(record), toCleanText(record.notes)]
          .filter(Boolean)
          .join(" · "),
        toCleanText(record.author) || "Uploaded image",
      );
      saveSnapshot();
    });

    authorInput.addEventListener("input", () => {
      const record = state.comparables.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.author = authorInput.value;
      record.updatedAt = Date.now();
      lineMeta.textContent = summarizeRowNotes(
        [getInspirationSourceMeta(record), getComparableOriginContext(record), toCleanText(record.notes)]
          .filter(Boolean)
          .join(" · "),
        toCleanText(record.author) || "Uploaded image",
      );
      saveSnapshot();
    });

    sourceInput.addEventListener("input", () => {
      const record = state.comparables.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.sourceUrl = sourceInput.value;
      record.updatedAt = Date.now();
      sourceLink.href = toCleanText(record.sourceUrl) || "#";
      sourceLink.hidden = !toCleanText(record.sourceUrl);
      saveSnapshot();
    });

    notesInput.addEventListener("input", () => {
      const record = state.comparables.find((entry) => entry.id === itemId);
      if (!record) {
        return;
      }

      record.notes = notesInput.value;
      record.updatedAt = Date.now();
      lineMeta.textContent = summarizeRowNotes(
        [getInspirationSourceMeta(record), getComparableOriginContext(record), toCleanText(record.notes)]
          .filter(Boolean)
          .join(" · "),
        toCleanText(record.author) || "Uploaded image",
      );
      queueInspirationNotesSave();
    });
    notesInput.addEventListener("blur", () => {
      void flushInspirationNotesSave().then(() => {
        updateBoardsAndBrief({ persist: false });
      });
    });

    removeBtn.addEventListener("click", () => {
      const sourceIndex = state.comparables.findIndex((entry) => entry.id === itemId);
      if (sourceIndex < 0) {
        return;
      }

      state.comparables.splice(sourceIndex, 1);
      if (state.comparableExpandedId === itemId) {
        state.comparableExpandedId = "";
      }
      updateBoardsAndBrief({ persist: false });
      void saveSnapshot({ immediate: true });
    });

    if (index < 3) {
      leadStack.appendChild(fragment);
    } else {
      compactGrid.appendChild(fragment);
    }
  });

  if (previousPositions) {
    animateVariationReorder(refs.comparableBoard, previousPositions);
  }
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
      titleLengthText: "Title length check: add ideas first.",
      thumbTextRuleText: "Thumbnail text check: add ideas first.",
      packagingStagesText: "Stage check (Stop Scroll > Interest > Click): add ideas first.",
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
    refs.checkCuriosity.textContent = "Curiosity: add ideas to evaluate";
    refs.checkClarity.textContent = "Clarity: add ideas to evaluate";
    refs.checkUniqueness.textContent = "Uniqueness: add ideas to evaluate";
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

  const rows = items.map((item) => `<li>${escapeHtml(item.text)}</li>`).join("");

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

function renderThumbnailTextListHtml(items) {
  if (!items.length) {
    return "<p>No thumbnail text ideas generated yet.</p>";
  }

  const rows = items.map((item) => `<li>${escapeHtml(item.text)}</li>`).join("");

  return `<ol>${rows}</ol>`;
}

function renderComparableHtml(items, options = {}) {
  if (!items.length) {
    return "<p>No thumbnail inspiration assets added yet.</p>";
  }

  const showPriorityBadges = Boolean(options.showPriorityBadges);
  const priorityStart = Number.isFinite(options.priorityStart) ? Number(options.priorityStart) : 1;
  const compact = Boolean(options.compact);

  const cards = items
    .map((item, index) => {
      const imageSrc = toCleanText(item.imageSrc) || (item.videoId ? getThumbUrl(item.videoId, "hq") : "");
      const title = toCleanText(item.title) || (item.videoId ? `YouTube inspiration · ${item.videoId}` : "Image inspiration");
      const meta = getInspirationSourceMeta(item);
      const notes = toCleanText(item.notes);
      const linkHtml = item.sourceUrl
        ? `<a href=\"${escapeHtml(item.sourceUrl)}\" target=\"_blank\" rel=\"noreferrer noopener\">Open source</a>`
        : '<span class="muted">No source link</span>';
      const priorityHtml = showPriorityBadges
        ? `<p class=\"priority-chip\">Top ${priorityStart + index} Priority</p>`
        : "";
      const comparableClass = compact ? "comparable compact" : "comparable";
      const detailsHtml = compact
        ? `<p class=\"muted\">${safeText(notes || meta, "No notes yet.")}</p>`
        : `<p>${escapeHtml(meta)}</p>\n    <p class=\"muted\">${safeText(notes, "No notes yet.")}</p>`;

      return `<article class=\"${comparableClass}\">\n  <img src=\"${escapeHtml(imageSrc)}\" alt=\"Thumbnail inspiration\" />\n  <div>\n    ${priorityHtml}\n    <h3>${escapeHtml(title)}</h3>\n    ${detailsHtml}\n    ${linkHtml}\n  </div>\n</article>`;
    })
    .join("");

  const comparablesClass = compact ? "comparables compact" : "comparables";
  return `<div class=\"${comparablesClass}\">${cards}</div>`;
}

function buildBriefViewModel(values) {
  const topTitle = state.titles[0] || null;
  const topThumb = state.thumbnails[0] || null;
  const titleList = [...state.titles];
  const thumbnailTextList = [...state.thumbnailTexts];
  const thumbList = [...state.thumbnails];

  return {
    generatedAt: formatDateTime(),
    topTitle,
    topThumb,
    titleList,
    thumbnailTextList,
    thumbList,
    introGroup: normalizeScriptIntroGroup(state.scriptIntroGroup),
    intros: getIntroVariants(state.scriptIntroGroup),
    sections: normalizeScriptSectionCollection(state.scriptSections),
    values,
  };
}

function buildScriptTypePayload(type) {
  const meta = getScriptSentenceTypeMeta(type);
  return meta.id
    ? {
        id: meta.id,
        label: meta.label,
        color: meta.color,
      }
    : null;
}

function buildPackagingFieldPayload(values = {}) {
  return {
    project_name: toCleanText(values.projectName),
    idea_focus: toCleanText(values.ideaFocus),
    core_pain: toCleanText(values.painPoint),
    desired_outcome: toCleanText(values.desiredOutcome),
    expected_views: toCleanText(values.expectedViews),
    intrigue_trigger: toCleanText(values.intrigueTrigger),
    curiosity_gap: toCleanText(values.curiosityGap),
    uniqueness_edge: toCleanText(values.uniquenessEdge),
    treatment: toCleanText(values.treatment),
    treatment_references: toCleanText(values.treatmentReferences),
    logline: toCleanText(values.logline),
    idea_source: toCleanText(values.ideaSource),
    target_traffic_source: toCleanText(values.targetTrafficSource),
    upload_strategy: toCleanText(values.uploadStrategy),
    ccn_core: toCleanText(values.ccnCore),
    ccn_casual: toCleanText(values.ccnCasual),
    ccn_new: toCleanText(values.ccnNew),
    thumbnail_direction_notes: toCleanText(values.thumbnailDirectionNotes),
  };
}

function buildScriptLinePayload(line = {}) {
  const text = toCleanText(line.text);
  return {
    text,
    type: buildScriptTypePayload(line.type),
    word_count: countWords(text),
    read_time_seconds: estimateReadSeconds(text),
    read_time_readable: formatDurationShort(estimateReadSeconds(text)),
  };
}

function buildScriptIntroPayload(intro = {}, index = 0) {
  const normalized = getLiveScriptSectionItemCollection(intro.items).filter((line) => {
    return toCleanText(line.text) || normalizeScriptSentenceType(line.type);
  });
  const archived = normalizeArchivedScriptSectionItemCollection(intro.archivedItems).filter((line) => {
    return toCleanText(line.text) || normalizeScriptSentenceType(line.type);
  });
  return {
    label: toCleanText(intro.title) || getDefaultIntroLabel(index),
    word_count: getIntroVariantWordCount(intro),
    read_time_seconds: getIntroVariantDurationSeconds(intro),
    read_time_readable: formatDurationShort(getIntroVariantDurationSeconds(intro)),
    lines: normalized.map((line) => buildScriptLinePayload(line)),
    archived_lines: archived.map((line) => buildScriptLinePayload(line)),
    plain_text: getIntroVariantPlainText(intro),
  };
}

function buildScriptSectionPayload(section = {}) {
  const normalizedItems = getLiveScriptSectionItemCollection(section.items).filter((line) => {
    return toCleanText(line.text) || normalizeScriptSentenceType(line.type);
  });
  const archivedItems = normalizeArchivedScriptSectionItemCollection(section.archivedItems).filter((line) => {
    return toCleanText(line.text) || normalizeScriptSentenceType(line.type);
  });
  return {
    title: toCleanText(section.title),
    kind: {
      id: normalizeScriptSectionKind(section.kind),
      label: getScriptSectionKindLabel(section.kind),
    },
    word_count: normalizedItems.reduce((sum, line) => sum + countWords(line.text), 0),
    read_time_seconds: getSectionDurationSeconds(section),
    read_time_readable: formatDurationShort(getSectionDurationSeconds(section)),
    lines: normalizedItems.map((line) => buildScriptLinePayload(line)),
    archived_lines: archivedItems.map((line) => buildScriptLinePayload(line)),
    plain_text: getSectionPlainText(section),
  };
}

function buildScriptMetadataPayload(values = getFieldValues()) {
  const activeBrief = getActiveBriefRecord();
  const activeChannel = getActiveChannelRecord();
  const model = buildBriefViewModel(values);
  const staticViewerStrategy = {
    channel: VIEWER_STRATEGY.channel,
    niche: VIEWER_STRATEGY.niche,
    age_range: VIEWER_STRATEGY.ageRange,
    main_countries: VIEWER_STRATEGY.mainCountries,
    similar_channels: VIEWER_STRATEGY.similarChannels,
    tam_estimate: VIEWER_STRATEGY.tamEstimate,
    current_baseline: VIEWER_STRATEGY.tamCurrent,
    tam_share: VIEWER_STRATEGY.tamShare,
    audience: VIEWER_STRATEGY.audience,
    avatar: VIEWER_STRATEGY.avatar,
    cluster: VIEWER_STRATEGY.cluster,
    personality: VIEWER_STRATEGY.personality,
    humor_style: VIEWER_STRATEGY.humorStyle,
    anti_patterns: VIEWER_STRATEGY.antiPatterns,
    unlock_need: VIEWER_STRATEGY.unlockNeed,
    rabbit_holes: VIEWER_STRATEGY.rabbitHoles,
    primary_pain: VIEWER_STRATEGY.primaryPain,
    desired_outcome: VIEWER_STRATEGY.desiredOutcome,
    strategy_page: VIEWER_STRATEGY.strategyPage,
  };
  const briefSourceSnapshot = activeBrief?.sourceSnapshot
    ? {
        video_idea: toCleanText(activeBrief.sourceSnapshot.videoIdea),
        notes: toCleanText(activeBrief.sourceSnapshot.notes),
        title_thumb_link: toCleanText(activeBrief.sourceSnapshot.titleThumbLink),
        hypothesis_metric: toCleanText(activeBrief.sourceSnapshot.hypothesisMetric),
        insights: toCleanText(activeBrief.sourceSnapshot.insights),
      }
    : null;
  const introGroup = normalizeScriptIntroGroup(state.scriptIntroGroup);
  const intros = getIntroVariants(introGroup).map((intro, index) => buildScriptIntroPayload(intro, index));
  const sections = normalizeScriptSectionCollection(state.scriptSections).map((section) => buildScriptSectionPayload(section));
  const compiledIntrosText = intros.map((intro) => `${intro.label}\n${intro.plain_text}`.trim()).filter(Boolean).join("\n\n");
  const compiledSectionsText = sections.map((section) => `${section.title}\n${section.plain_text}`.trim()).filter(Boolean).join("\n\n");
  const topTitle = model.topTitle
    ? {
        text: toCleanText(model.topTitle.text),
        notes: toCleanText(model.topTitle.notes),
        scores: model.topTitle.scores,
        average_score: Number(averageScore(model.topTitle.scores).toFixed(2)),
      }
    : null;
  const topThumbnailVariation = model.topThumb
    ? {
        title: toCleanText(model.topThumb.title),
        creator: toCleanText(model.topThumb.creator),
        meta: toCleanText(model.topThumb.meta),
        notes: toCleanText(model.topThumb.notes),
        scores: model.topThumb.scores,
        average_score: Number(averageScore(model.topThumb.scores).toFixed(2)),
      }
    : null;
  const topThumbnailText = state.thumbnailTexts[0]
    ? {
        text: toCleanText(state.thumbnailTexts[0].text),
        notes: toCleanText(state.thumbnailTexts[0].notes),
        scores: state.thumbnailTexts[0].scores,
        average_score: Number(averageScore(state.thumbnailTexts[0].scores).toFixed(2)),
      }
    : null;

  const payload = {
    purpose: "llm_script_punch_up_context",
    brief: {
      channel_name: toCleanText(activeChannel?.name) || VIEWER_STRATEGY.channel,
      brief_status: activeBrief ? formatBriefStatus(activeBrief.status) : "Draft",
      source_type: activeBrief ? formatBriefSourceType(activeBrief.sourceType) : "Manual brief",
      tags: normalizeBriefTags(activeBrief?.tags),
    },
    viewer_strategy: {
      static_snapshot: staticViewerStrategy,
      brief_source_snapshot: briefSourceSnapshot,
    },
    packaging: {
      fields: buildPackagingFieldPayload(values),
      top_recommendations: {
        title: topTitle,
        thumbnail_variation: topThumbnailVariation,
        thumbnail_text: topThumbnailText,
      },
      title_variations: normalizeTitleCollection(state.titles).map((item) => ({
        text: toCleanText(item.text),
        notes: toCleanText(item.notes),
        scores: item.scores,
        average_score: Number(averageScore(item.scores).toFixed(2)),
        is_strong: Boolean(item.isStrong),
      })),
      thumbnail_text_variations: normalizeThumbnailTextCollection(state.thumbnailTexts).map((item) => ({
        text: toCleanText(item.text),
        notes: toCleanText(item.notes),
        scores: item.scores,
        average_score: Number(averageScore(item.scores).toFixed(2)),
        is_strong: Boolean(item.isStrong),
      })),
      thumbnail_variations: normalizeThumbnailCollection(state.thumbnails).map((item) => ({
        title: toCleanText(item.title),
        creator: toCleanText(item.creator),
        meta: toCleanText(item.meta),
        notes: toCleanText(item.notes),
        scores: item.scores,
        average_score: Number(averageScore(item.scores).toFixed(2)),
      })),
      inspiration_assets: normalizeComparableCollection(state.comparables).map((item) => ({
        title: toCleanText(item.title),
        author: toCleanText(item.author),
        source_url: toCleanText(item.sourceUrl),
        video_id: toCleanText(item.videoId),
        source_kind: toCleanText(item.sourceKind),
        source_collection: toCleanText(item.sourceCollection),
        source_channel_id: toCleanText(item.sourceChannelId),
        source_channel_name: toCleanText(item.sourceChannelName),
        source_brief_id: toCleanText(item.sourceBriefId),
        source_brief_title: toCleanText(item.sourceBriefTitle),
        source_thumbnail_id: toCleanText(item.sourceThumbnailId),
        source_thumbnail_title: toCleanText(item.sourceThumbnailTitle),
        notes: toCleanText(item.notes),
      })),
    },
    intro_group: {
      title: toCleanText(introGroup.title) || getDefaultIntroGroupTitle(),
      target_seconds: INTRO_TARGET_SECONDS,
      variants: intros,
    },
    sections: {
      ordered: sections,
    },
    compiled_script: {
      total_word_count:
        intros.reduce((sum, intro) => sum + intro.word_count, 0) + sections.reduce((sum, section) => sum + section.word_count, 0),
      total_read_time_seconds: getScriptTotalDurationSeconds(),
      total_read_time_readable: formatDurationShort(getScriptTotalDurationSeconds()),
      intros_text: compiledIntrosText,
      sections_text: compiledSectionsText,
      full_text: [compiledIntrosText, compiledSectionsText].filter(Boolean).join("\n\n"),
    },
  };
  return pruneEmptyForLlm(payload);
}

function pruneEmptyForLlm(value) {
  if (Array.isArray(value)) {
    const cleaned = value
      .map((item) => pruneEmptyForLlm(item))
      .filter((item) => item !== null && item !== undefined && !(typeof item === "string" && !item.trim()));
    return cleaned.length ? cleaned : undefined;
  }
  if (value && typeof value === "object") {
    const cleanedEntries = Object.entries(value)
      .map(([key, entry]) => [key, pruneEmptyForLlm(entry)])
      .filter(([, entry]) => {
        if (entry === null || entry === undefined) {
          return false;
        }
        if (typeof entry === "string" && !entry.trim()) {
          return false;
        }
        if (Array.isArray(entry) && !entry.length) {
          return false;
        }
        if (entry && typeof entry === "object" && !Array.isArray(entry) && !Object.keys(entry).length) {
          return false;
        }
        return true;
      });
    return cleanedEntries.length ? Object.fromEntries(cleanedEntries) : undefined;
  }
  return value;
}

function renderIntroCardsHtml(introGroup, options = {}) {
  const intros = getIntroVariants(introGroup);
  if (!intros.length) {
    return "<p>No intros drafted yet.</p>";
  }

  return intros
    .map((intro, index) => {
      const sentences = getLiveScriptSectionItemCollection(intro.items).filter(
        (item) => toCleanText(item.text) || toCleanText(item.type),
      );
      const sentenceList = sentences.length
        ? `<ol>${sentences
            .map((item) => {
              const typeMeta = getScriptSentenceTypeMeta(item.type);
              const prefix = options.includeTypes && typeMeta.id ? `<strong>${escapeHtml(typeMeta.label)}:</strong> ` : "";
              return `<li>${prefix}${safeText(item.text, "No sentence text yet.")}</li>`;
            })
            .join("")}</ol>`
        : "<p>No intro sentences yet.</p>";
      const notesHtml = `<p class="muted">Estimated runtime: ${formatDurationShort(getIntroVariantDurationSeconds(intro))}</p>`;
      return `
        <article class="card">
          <h2>${escapeHtml(intro.title || `Intro ${index + 1}`)}</h2>
          ${notesHtml}
          ${sentenceList}
        </article>
      `;
    })
    .join("");
}

function renderStructureSectionsHtml(sections, options = {}) {
  const visibleSections = normalizeScriptSectionCollection(sections);
  if (!visibleSections.length) {
    return "<p>No script sections yet.</p>";
  }

  return visibleSections
    .map((section) => {
      const items = getLiveScriptSectionItemCollection(section.items).filter((item) => {
        return toCleanText(item.text) || toCleanText(item.type);
      });
      const linesHtml = items.length
        ? `<ol>${items
            .map((item) => {
              const typeMeta = getScriptSentenceTypeMeta(item.type);
              const prefix = options.includeTypes && typeMeta.id ? `<strong>${escapeHtml(typeMeta.label)}:</strong> ` : "";
              return `<li>${prefix}${safeText(item.text, "No line text yet.")}</li>`;
            })
            .join("")}</ol>`
        : "<p>No lines yet.</p>";

      return `
        <article class="card">
          <h2>${safeText(section.title)}</h2>
          <p class="muted">Kind: ${escapeHtml(getScriptSectionKindLabel(section.kind))} · Runtime ${formatDurationShort(
            getSectionDurationSeconds(section),
          )}</p>
          ${linesHtml}
        </article>
      `;
    })
    .join("");
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
          <li><strong>Title:</strong> ${model.topTitle ? escapeHtml(model.topTitle.text) : "N/A"}</li>
          <li><strong>Thumbnail:</strong> ${model.topThumb ? escapeHtml(model.topThumb.title) : "N/A"}</li>
        </ul>
      </section>
      <section>
        <h4>Thumbnail Inspiration Assets</h4>
        ${renderComparableHtml(state.comparables)}
      </section>
    </article>
  `;
}

function buildThumbnailBriefExportHtml(values) {
  const model = buildBriefViewModel(values);
  const directionNotes = toCleanText(values.thumbnailDirectionNotes);
  const topInspiration = state.comparables.slice(0, 3);
  const referenceInspiration = state.comparables.slice(3);
  const topInspirationHtml = topInspiration.length
    ? topInspiration
        .map(
          (item, index) =>
            `${renderComparableHtml([item], { showPriorityBadges: true, priorityStart: index + 1 })}<div class="page-break"></div>`,
        )
        .join("")
    : "<p>No top-priority inspiration assets yet. Add up to three priority assets in Thumbnail Studio.</p>";

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
        <p class="kicker">Packaging Brief</p>
        <h1>${safeText(values.projectName, "YouTube Packaging Brief")}</h1>
        <p>Generated ${escapeHtml(model.generatedAt)} · For thumbnail design and packaging work</p>
      </section>

      <section class="card">
        <h2>Direction Notes</h2>
        <p>${safeText(directionNotes, "No direction notes provided yet.")}</p>
      </section>

      <section class="card major">
        <h2>Thumbnail Priority</h2>
        <p>
          Your thumbnail designer should build new variations from the top 3 inspiration assets first. Keep the
          additional inspiration below as optional reference.
        </p>
      </section>

      <section class="grid two">
        <article class="card">
          <h2>Full Treatment</h2>
          <p>${safeText(values.treatment, "No treatment yet.")}</p>
        </article>
        <article class="card">
          <h2>Full Core Logline</h2>
          <p>${safeText(values.logline, "No core logline yet.")}</p>
        </article>
      </section>

      <section class="card">
        <h2>Treatment + Logline Summary</h2>
        <ul>
          <li><strong>Idea focus:</strong> ${safeText(values.ideaFocus)}</li>
          <li><strong>Core pain:</strong> ${safeText(values.painPoint)}</li>
          <li><strong>Desired outcome:</strong> ${safeText(values.desiredOutcome)}</li>
          <li><strong>Expected views:</strong> ${safeText(values.expectedViews)}</li>
          <li><strong>Intrigue trigger:</strong> ${safeText(values.intrigueTrigger)}</li>
          <li><strong>Curiosity gap:</strong> ${safeText(values.curiosityGap)}</li>
          <li><strong>Uniqueness edge:</strong> ${safeText(values.uniquenessEdge)}</li>
          <li><strong>Treatment references:</strong> ${safeText(values.treatmentReferences)}</li>
        </ul>
      </section>

      ${
        model.thumbList.length
          ? `<section class="card">
              <h2>Thumbnail Variations (If Available)</h2>
              ${renderThumbListHtml(model.thumbList)}
            </section>`
          : ""
      }

      <section class="card">
        <h2>Thumbnail Text Candidates</h2>
        ${renderThumbnailTextListHtml(model.thumbnailTextList)}
      </section>
      <div class="page-break"></div>

      <section class="card">
        <h2>Top 3 Inspiration Assets (Create Variations From These)</h2>
        ${topInspirationHtml}
      </section>

      <section class="card">
        <h2>Additional Inspiration (Reference Only)</h2>
        ${
          referenceInspiration.length
            ? renderComparableHtml(referenceInspiration, { compact: true })
            : '<p class="muted">No additional reference inspiration assets yet.</p>'
        }
      </section>

      <section class="card">
        <h2>Title Candidates</h2>
        ${renderTitleListHtml(model.titleList)}
      </section>

      <section class="card">
        <h2>Viewer Strategy (Reference)</h2>
        <ul>
          <li><strong>Niche:</strong> ${escapeHtml(VIEWER_STRATEGY.niche)}</li>
          <li><strong>Age range:</strong> ${escapeHtml(VIEWER_STRATEGY.ageRange)}</li>
          <li><strong>Main countries:</strong> ${escapeHtml(VIEWER_STRATEGY.mainCountries)}</li>
          <li><strong>Audience:</strong> ${escapeHtml(VIEWER_STRATEGY.audience)}</li>
          <li><strong>Avatar:</strong> ${escapeHtml(VIEWER_STRATEGY.avatar)}</li>
          <li><strong>Humor profile:</strong> ${escapeHtml(VIEWER_STRATEGY.humorStyle)}</li>
          <li><strong>Anti-patterns:</strong> ${escapeHtml(VIEWER_STRATEGY.antiPatterns)}</li>
        </ul>
      </section>
    </main>
  </body>
</html>`;
}

function buildProductionBriefExportHtml(values) {
  const model = buildBriefViewModel(values);
  const playbook = evaluatePlaybookSignals(model.topTitle, model.topThumb, values);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeText(values.projectName, "YouTube Production Brief")}</title>
    <style>${BRIEF_EXPORT_STYLES}</style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <p class="kicker">Production Brief</p>
        <h1>${safeText(values.projectName, "YouTube Production Brief")}</h1>
        <p>Generated ${escapeHtml(model.generatedAt)} · Editor handoff with intros, sections, and current packaging assets</p>
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
          <li><strong>Expected views:</strong> ${safeText(values.expectedViews)}</li>
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
            <li><strong>Title:</strong> ${model.topTitle ? escapeHtml(model.topTitle.text) : "N/A"}</li>
            <li><strong>Thumbnail:</strong> ${model.topThumb ? escapeHtml(model.topThumb.title) : "N/A"}</li>
            <li><strong>Curiosity check:</strong> ${escapeHtml(refs.checkCuriosity.textContent.replace("Curiosity: ", ""))}</li>
            <li><strong>Clarity check:</strong> ${escapeHtml(refs.checkClarity.textContent.replace("Clarity: ", ""))}</li>
            <li><strong>Uniqueness check:</strong> ${escapeHtml(refs.checkUniqueness.textContent.replace("Uniqueness: ", ""))}</li>
          </ul>
        </article>
        <article class="card">
          <h2>Thumbnail Inspiration Assets</h2>
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

      <section class="card">
        <h2>Thumbnail Text Variations</h2>
        ${renderThumbnailTextListHtml(model.thumbnailTextList)}
      </section>

      <section class="card">
        <h2>Produced Thumbnails / Current Variations</h2>
        ${model.thumbList.length ? renderThumbListHtml(model.thumbList) : "<p>No thumbnail variations attached yet.</p>"}
      </section>

      <section class="grid two">
        ${renderIntroCardsHtml(model.introGroup, { includeNotes: true, includeTypes: true })}
      </section>

      <section class="card">
        <h2>Script Sections</h2>
        ${renderStructureSectionsHtml(model.sections, { includeTypes: true })}
      </section>
    </main>
  </body>
</html>`;
}

function buildScriptExportHtml(values) {
  const model = buildBriefViewModel(values);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeText(values.projectName, "YouTube Script Export")}</title>
    <style>${BRIEF_EXPORT_STYLES}
      body { background: #ffffff; }
      .card p, .card li { font-size: 1.08rem; line-height: 1.6; }
      ol { padding-left: 1.4rem; }
      .muted { color: #5a6870; font-size: 0.92rem; }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <p class="kicker">Script Export</p>
        <h1>${safeText(values.projectName, "YouTube Script Export")}</h1>
        <p>Generated ${escapeHtml(model.generatedAt)} · Clean teleprompter reading document</p>
      </section>

      <section class="grid two">
        ${renderIntroCardsHtml(model.introGroup, { includeNotes: false, includeTypes: false })}
      </section>

      <section class="card">
        <h2>Main Script</h2>
        ${renderStructureSectionsHtml(model.sections, { includeTypes: false })}
      </section>
    </main>
  </body>
</html>`;
}

function sanitizeFilenamePart(value, fallback = "script") {
  const cleaned = toCleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || fallback;
}

function buildScriptExportText(values = getFieldValues()) {
  const model = buildBriefViewModel(values);
  const blocks = [];
  const projectName = toCleanText(values.projectName) || "YouTube Script Export";
  blocks.push(projectName);

  getIntroVariants(model.introGroup).forEach((intro, index) => {
    const lines = getLiveScriptSectionItemCollection(intro.items)
      .map((item) => toCleanText(item.text))
      .filter(Boolean);
    blocks.push((toCleanText(intro.title) || getDefaultIntroLabel(index)).toUpperCase());
    if (lines.length) {
      blocks.push(lines.join("\n"));
    }
  });

  normalizeScriptSectionCollection(model.sections).forEach((section) => {
    const lines = getLiveScriptSectionItemCollection(section.items)
      .map((item) => toCleanText(item.text))
      .filter(Boolean);
    blocks.push((toCleanText(section.title) || "UNTITLED SECTION").toUpperCase());
    if (lines.length) {
      blocks.push(lines.join("\n"));
    }
  });

  return blocks.filter(Boolean).join("\n\n").trim();
}

function updateScoreboard(values) {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.topTitle.textContent = "Create or select a brief first.";
    refs.topThumb.textContent = "Create or select a brief first.";
    updateChecks(null, null, values);
    return;
  }

  const topTitle = state.titles[0] || null;
  const topThumb = state.thumbnails[0] || null;

  refs.topTitle.textContent = topTitle
    ? `${topTitle.text} (${averageScore(topTitle.scores).toFixed(1)}/10)`
    : "Add and score titles first.";

  refs.topThumb.textContent = topThumb
    ? `${topThumb.title} (${averageScore(topThumb.scores).toFixed(1)}/10)`
    : "Add and score thumbnails first.";

  updateChecks(topTitle, topThumb, values);
}

function buildPackagingPreviewCardHtml(theme, model) {
  const hasImage = Boolean(model.imageSrc);
  const title = toCleanText(model.title) || "Video title placeholder";
  const thumbnailLabel = toCleanText(model.thumbnailLabel) || "Thumbnail placeholder";
  const channelName = toCleanText(model.channelName) || "Your channel";

  const mediaHtml = hasImage
    ? `<img src="${escapeHtml(model.imageSrc)}" alt="Top thumbnail preview" />`
    : '<div class="thumbsup-placeholder">16:9 Thumbnail Placeholder</div>';

  return `
    <article class="thumbsup-stage thumbsup-stage--${escapeHtml(theme)}">
      <div class="thumbsup-stage-inner">
        <article class="thumbsup-preview thumbsup-preview--${escapeHtml(theme)}">
          <div class="thumbsup-media">
            ${mediaHtml}
            <span class="thumbsup-duration">12:34</span>
          </div>
          <div class="thumbsup-copy">
            <h4>${escapeHtml(title)}</h4>
            <p>${escapeHtml(channelName)}</p>
            <p>${escapeHtml(thumbnailLabel)}</p>
          </div>
        </article>
      </div>
    </article>
  `;
}

function updatePackagingPreview() {
  if (!refs.packagingPreviewLight || !refs.packagingPreviewDark) {
    return;
  }

  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    const emptyHtml = '<p class="pipeline-empty pipeline-empty-centered">Select a brief to preview packaging.</p>';
    refs.packagingPreviewLight.innerHTML = emptyHtml;
    refs.packagingPreviewDark.innerHTML = emptyHtml;
    return;
  }

  const topTitle = state.titles[0] || null;
  const topThumb = state.thumbnails[0] || null;
  const activeChannel = getActiveChannelRecord();
  const model = {
    title: topTitle ? topTitle.text : "",
    thumbnailLabel: topThumb ? topThumb.title : "",
    imageSrc: toCleanText(topThumb?.imageSrc) || "",
    channelName: toCleanText(activeChannel?.name) || VIEWER_STRATEGY.channel,
  };

  refs.packagingPreviewLight.innerHTML = buildPackagingPreviewCardHtml("light", model);
  refs.packagingPreviewDark.innerHTML = buildPackagingPreviewCardHtml("dark", model);
}

function updateBriefOutput(values) {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    refs.briefOutput.innerHTML =
      '<p class="hint">Create or select a brief to preview content and generate PDF exports.</p>';
    state.latestBriefHtml = "";
    return;
  }

  refs.briefOutput.innerHTML = buildPreviewHtml(values);
  state.latestBriefHtml = buildThumbnailBriefExportHtml(values);
}

function applyLegacyWorkspaceBriefDrafts(channelWorkspaces = {}) {
  Object.entries(channelWorkspaces).forEach(([channelId, workspace]) => {
    const legacyBrief = extractLegacyBriefDraftFromWorkspace(workspace, channelId);
    if (!legacyBrief) {
      return;
    }

    ensureChannelBriefState(channelId);
    const current = normalizeChannelBriefState(state.briefsByChannel[channelId], channelId);
    if (current.briefs.length) {
      return;
    }

    state.briefsByChannel[channelId] = normalizeChannelBriefState(
      {
        activeBriefId: legacyBrief.id,
        briefs: [legacyBrief],
      },
      channelId,
    );
  });
}

function buildLegacySnapshotPayload(values = getFieldValues()) {
  const dbSnapshot = buildDbSnapshotPayload(values);
  return {
    schemaVersion: 4,
    workspace: dbSnapshot.workspace,
    ideas: dbSnapshot.ideas,
    briefs: dbSnapshot.briefs,
  };
}

function buildLocalStorageLegacyPayload(values = getFieldValues()) {
  const payload = buildLegacySnapshotPayload(values);
  const byChannel = payload?.briefs?.byChannel;
  if (!byChannel || typeof byChannel !== "object") {
    return payload;
  }

  const sanitizedByChannel = {};
  Object.entries(byChannel).forEach(([channelId, briefState]) => {
    const briefs = Array.isArray(briefState?.briefs)
      ? briefState.briefs.map((brief) => {
          const comparables = Array.isArray(brief?.comparables)
            ? brief.comparables.map((item) => {
                const videoId = toCleanText(item?.videoId);
                return {
                  ...item,
                  imageSrc: videoId ? getThumbUrl(videoId, "hq") : "",
                };
              })
            : [];

          return {
            ...brief,
            comparables,
            latestBriefHtml: "",
          };
        })
      : [];

    sanitizedByChannel[channelId] = {
      activeBriefId: toCleanText(briefState?.activeBriefId),
      briefs,
    };
  });

  return {
    ...payload,
    briefs: {
      ...payload.briefs,
      byChannel: sanitizedByChannel,
    },
  };
}

function buildWorkspacePayload(values = getFieldValues()) {
  cacheActiveChannelWorkspace(values);
  return {
    schemaVersion: 4,
    savedAt: Date.now(),
    pageView: state.pageView,
    channelView: state.channelView,
    briefWorkspaceView: normalizeBriefWorkspaceView(state.briefWorkspaceView),
    scriptingView: normalizeScriptingView(state.scriptingView),
    briefListSort: normalizeBriefListSort(state.briefListSort),
    briefTagFilter: normalizeBriefTagFilter(state.briefTagFilter),
    scriptDraftLayout: normalizeScriptDraftLayout(state.scriptDraftLayout),
    scriptDraftShowColors: normalizeScriptDraftColorEnabled(state.scriptDraftShowColors),
    channels: state.channels,
    accounts: state.accounts,
    channelMemberships: state.channelMemberships,
    currentAccountId: state.currentAccountId,
    activeChannelId: state.activeChannelId,
    channelWorkspaces: state.channelWorkspaces,
    briefActiveIds: buildBriefActiveIds(),
  };
}

// Briefs are stored one row per record, so the per-channel selection rides along with the workspace.
function buildBriefActiveIds() {
  const activeIds = {};
  Object.entries(state.briefsByChannel).forEach(([channelId, briefState]) => {
    activeIds[channelId] = toCleanText(briefState?.activeBriefId);
  });
  return activeIds;
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
    schemaVersion: 4,
    savedAt: Date.now(),
    byChannel,
  };
}

function buildBriefsPayload(values = getFieldValues()) {
  cacheActiveChannelWorkspace(values);
  const byChannel = {};
  Object.entries(state.briefsByChannel).forEach(([channelId, briefState]) => {
    const parsed = normalizeChannelBriefState(briefState, channelId);
    byChannel[channelId] = {
      activeBriefId: parsed.activeBriefId,
      briefs: parsed.briefs,
    };
  });

  return {
    schemaVersion: 4,
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
    Array.isArray(payload.channelMemberships) ||
    (payload.channelBriefs && typeof payload.channelBriefs === "object");

  if (isChannelPayload) {
    state.pageView = normalizePageView(payload.pageView);
    state.channelView = normalizeChannelView(payload.channelView);
    state.briefWorkspaceView = normalizeBriefWorkspaceView(payload.briefWorkspaceView);
    state.scriptingView = normalizeScriptingView(payload.scriptingView);
    state.briefListSort = normalizeBriefListSort(payload.briefListSort);
    state.briefTagFilter = normalizeBriefTagFilter(payload.briefTagFilter);
    state.scriptDraftLayout = normalizeScriptDraftLayout(payload.scriptDraftLayout || payload.scriptDraftView);
    state.scriptDraftShowColors = normalizeScriptDraftColorEnabled(
      payload.scriptDraftShowColors,
      normalizeScriptDraftColorEnabled(payload.scriptDraftView),
    );
    state.channels = normalizeChannels(payload.channels);
    state.accounts = normalizeAccounts(payload.accounts);
    state.channelMemberships = normalizeChannelMemberships(payload.channelMemberships);
    state.currentAccountId = toCleanText(payload.currentAccountId) || DEFAULT_ACCOUNT_ID;
    state.activeChannelId = toCleanText(payload.activeChannelId);
    state.channelWorkspaces = {};
    state.briefsByChannel = {};
    pendingBriefActiveIds = payload.briefActiveIds && typeof payload.briefActiveIds === "object" ? payload.briefActiveIds : {};

    if (payload.channelWorkspaces && typeof payload.channelWorkspaces === "object") {
      Object.entries(payload.channelWorkspaces).forEach(([channelId, workspace]) => {
        state.channelWorkspaces[channelId] = normalizeChannelWorkspace(workspace);
      });
    }

    if (payload.channelBriefs && typeof payload.channelBriefs === "object") {
      Object.entries(payload.channelBriefs).forEach(([channelId, briefState]) => {
        state.briefsByChannel[channelId] = normalizeChannelBriefState(briefState, channelId);
      });
    }

    applyLegacyWorkspaceBriefDrafts(payload.channelWorkspaces || {});
    ensureChannelModel();
    ensureChannelWorkspace(state.activeChannelId);
    ensureChannelBriefState(state.activeChannelId);
    applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
    applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
    return;
  }

  state.ideationStepView = normalizeIdeationStep(payload.ideationStepView);
  state.step1View = normalizeStep1View(payload.step1View);
  state.channelView = "dashboard";
  state.channels = [createDefaultChannelRecord()];
  state.accounts = [];
  state.channelMemberships = [];
  state.currentAccountId = DEFAULT_ACCOUNT_ID;
  state.activeChannelId = state.channels[0].id;
  state.channelWorkspaces = {
    [state.activeChannelId]: normalizeChannelWorkspace({
      ideationStepView: state.ideationStepView,
      step1View: state.step1View,
      step1Ideas: payload.step1Ideas,
      step2Ideas: payload.step2Ideas,
      step3Ideas: payload.step3Ideas,
    }),
  };

  const legacyValues = normalizeBriefValues(payload.values || {});
  const legacyBrief = createBriefRecord({
    channelId: state.activeChannelId,
    sourceType: toCleanText(payload.matriculatedIdeaId) ? "phase3" : "manual",
    sourceIdeaId: toCleanText(payload.matriculatedIdeaId),
    values: legacyValues,
    titles: payload.titles,
    thumbnailTexts: payload.thumbnailTexts,
    thumbnails: payload.thumbnails,
    comparables: payload.comparables,
    latestBriefHtml: payload.latestBriefHtml,
  });
  const hasLegacyBriefData =
    Object.values(legacyValues).some(Boolean) ||
    legacyBrief.titles.length ||
    legacyBrief.thumbnailTexts.length ||
    legacyBrief.thumbnails.length ||
    legacyBrief.comparables.length ||
    Boolean(legacyBrief.latestBriefHtml);
  state.briefsByChannel = {
    [state.activeChannelId]: normalizeChannelBriefState(
      {
        activeBriefId: hasLegacyBriefData ? legacyBrief.id : "",
        briefs: hasLegacyBriefData ? [legacyBrief] : [],
      },
      state.activeChannelId,
    ),
  };
  state.pageView = "home";
  ensureChannelModel();
  applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
  applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
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

function applyBriefsPayload(payload = {}) {
  if (payload.byChannel && typeof payload.byChannel === "object") {
    Object.entries(payload.byChannel).forEach(([channelId, briefsPayload]) => {
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

      if (Array.isArray(briefsPayload?.briefs)) {
        state.briefsByChannel[channelId] = normalizeChannelBriefState(
          {
            ...briefsPayload,
            activeBriefId: toCleanText(briefsPayload.activeBriefId) || toCleanText(pendingBriefActiveIds[channelId]),
          },
          channelId,
        );
        return;
      }

      const projectName = toCleanText(briefsPayload?.projectName);
      const html = toCleanText(briefsPayload?.html);
      if (!projectName && !html) {
        return;
      }

      const migratedBrief = createBriefRecord({
        channelId,
        sourceType: "manual",
        values: withBriefDefaultValues({
          projectName: projectName || "youtube-brief",
        }),
        latestBriefHtml: html,
      });
      state.briefsByChannel[channelId] = normalizeChannelBriefState(
        {
          activeBriefId: migratedBrief.id,
          briefs: [migratedBrief],
        },
        channelId,
      );
    });

    const requestedChannelId = toCleanText(payload.currentChannelId);
    if (requestedChannelId && state.channels.some((channel) => channel.id === requestedChannelId)) {
      state.activeChannelId = requestedChannelId;
    }

    ensureChannelModel();
    ensureChannelBriefState(state.activeChannelId);
    applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
    return;
  }

  if (payload.current && typeof payload.current === "object") {
    const channelId = toCleanText(state.activeChannelId);
    if (!channelId) {
      return;
    }

    const migratedBrief = createBriefRecord({
      channelId,
      sourceType: "manual",
      values: withBriefDefaultValues({
        projectName: toCleanText(payload.current.projectName) || "youtube-brief",
      }),
      latestBriefHtml: toCleanText(payload.current.html),
    });

    if (migratedBrief.latestBriefHtml || migratedBrief.values.projectName) {
      state.briefsByChannel[channelId] = normalizeChannelBriefState(
        {
          activeBriefId: migratedBrief.id,
          briefs: [migratedBrief],
        },
        channelId,
      );
      applyActiveChannelBriefState(state.briefsByChannel[channelId]);
    }
  }
}

function applyLegacySnapshotPayload(parsed = {}) {
  const isChannelPayload =
    Array.isArray(parsed.channels) ||
    (parsed.channelWorkspaces && typeof parsed.channelWorkspaces === "object") ||
    Array.isArray(parsed.accounts) ||
    Array.isArray(parsed.channelMemberships);

  if (isChannelPayload) {
    state.pageView = normalizePageView(parsed.pageView);
    state.channelView = normalizeChannelView(parsed.channelView);
    state.channels = normalizeChannels(parsed.channels);
    state.accounts = normalizeAccounts(parsed.accounts);
    state.channelMemberships = normalizeChannelMemberships(parsed.channelMemberships);
    state.currentAccountId = toCleanText(parsed.currentAccountId) || DEFAULT_ACCOUNT_ID;
    state.activeChannelId = toCleanText(parsed.activeChannelId);
    state.channelWorkspaces = {};
    state.briefsByChannel = {};
    Object.entries(parsed.channelWorkspaces || {}).forEach(([channelId, workspace]) => {
      state.channelWorkspaces[channelId] = normalizeChannelWorkspace(workspace);
    });
    applyLegacyWorkspaceBriefDrafts(parsed.channelWorkspaces || {});
    ensureChannelModel();
    ensureChannelWorkspace(state.activeChannelId);
    ensureChannelBriefState(state.activeChannelId);
    applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
    applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
    return;
  }

  state.ideationStepView = normalizeIdeationStep(parsed.ideationStepView);
  state.step1View = normalizeStep1View(parsed.step1View);
  state.channelView = "dashboard";
  state.step1Ideas = normalizeStep1Ideas(parsed.step1Ideas);
  state.step2Ideas = normalizeStep2Ideas(parsed.step2Ideas);
  state.step3Ideas = normalizeStep3Ideas(parsed.step3Ideas);
  state.channels = [createDefaultChannelRecord()];
  state.accounts = [];
  state.channelMemberships = [];
  state.currentAccountId = DEFAULT_ACCOUNT_ID;
  state.activeChannelId = state.channels[0].id;
  state.channelWorkspaces = {
    [state.activeChannelId]: normalizeChannelWorkspace({
      ideationStepView: state.ideationStepView,
      step1View: state.step1View,
      step1Ideas: state.step1Ideas,
      step2Ideas: state.step2Ideas,
      step3Ideas: state.step3Ideas,
    }),
  };
  const legacyValues = normalizeBriefValues(parsed.values || {});
  const legacyBrief = createBriefRecord({
    channelId: state.activeChannelId,
    sourceType: toCleanText(parsed.matriculatedIdeaId) ? "phase3" : "manual",
    sourceIdeaId: toCleanText(parsed.matriculatedIdeaId),
    values: legacyValues,
    titles: parsed.titles,
    thumbnailTexts: parsed.thumbnailTexts,
    thumbnails: parsed.thumbnails,
    comparables: parsed.comparables,
    latestBriefHtml: parsed.latestBriefHtml,
  });
  const hasLegacyBriefData =
    Object.values(legacyValues).some(Boolean) ||
    legacyBrief.titles.length ||
    legacyBrief.thumbnailTexts.length ||
    legacyBrief.thumbnails.length ||
    legacyBrief.comparables.length ||
    Boolean(legacyBrief.latestBriefHtml);
  state.briefsByChannel = {
    [state.activeChannelId]: normalizeChannelBriefState(
      {
        activeBriefId: hasLegacyBriefData ? legacyBrief.id : "",
        briefs: hasLegacyBriefData ? [legacyBrief] : [],
      },
      state.activeChannelId,
    ),
  };
  state.pageView = "home";
  ensureChannelModel();
  applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
  applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
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
  await persistSnapshotToDb(payload);
  if (queuedSnapshotPayload === payload) {
    queuedSnapshotPayload = null;
  }
}

function saveSnapshot(options = {}) {
  // Briefs load one request each, so a partial load must never be written back as the truth.
  if (remoteLoadFailed) {
    setSaveStatus("load-failed");
    return Promise.resolve();
  }

  const values = getFieldValues();
  ensureChannelModel();
  cacheActiveChannelWorkspace(values);
  const legacyPayload = buildLocalStorageLegacyPayload(values);
  const dbPayload = buildDbSnapshotPayload(values);

  try {
    const serializedLegacy = JSON.stringify(legacyPayload);
    if (serializedLegacy.length <= MAX_LOCAL_STORAGE_SNAPSHOT_CHARS) {
      localStorage.setItem(STORAGE_KEY, serializedLegacy);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Could not persist legacy localStorage snapshot.", error);
    localStorage.removeItem(STORAGE_KEY);
  }

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
        applyBriefsPayload(parsed.briefs || {});
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
  const useRemote = await checkRemotePersistence();
  try {
    const [workspacePayload, ideasPayload, briefsPayload] = await Promise.all([
      workspaceRepo.load(),
      ideasRepo.load(),
      briefsRepo.loadCurrent(),
    ]);

    if (workspacePayload || ideasPayload || briefsPayload) {
      applyWorkspacePayload(workspacePayload || {});
      applyIdeasPayload(ideasPayload || {});
      applyBriefsPayload(briefsPayload || {});
      ensureChannelModel();
      ensureChannelWorkspace(state.activeChannelId);
      ensureChannelBriefState(state.activeChannelId);
      applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
      applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
      if (useRemote) {
        await clearBrowserLocalSnapshotCache();
      }
      return true;
    }

    if (useRemote) {
      const loadedLocalDbSnapshot = await loadBrowserLocalDbSnapshot();
      if (loadedLocalDbSnapshot) {
        await saveSnapshot({ immediate: true });
        await clearBrowserLocalSnapshotCache();
        return true;
      }
    }
  } catch (error) {
    console.warn("Could not load persisted snapshot.", error);
    if (useRemote) {
      remoteLoadFailed = true;
      return false;
    }
  }

  const loadedLegacy = loadLegacySnapshotFromLocalStorage();
  if (loadedLegacy) {
    await saveSnapshot({ immediate: true });
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
    await deleteFromLocalDb(LOCAL_DB_KEY_WORKSPACE);
    await deleteFromLocalDb(LOCAL_DB_KEY_IDEAS);
    await deleteFromLocalDb(LOCAL_DB_KEY_BRIEFS);
    await deleteFromLocalDb(LOCAL_DB_KEY_VIEWER);
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
  if (refs.quickThumbnailTextInput) {
    refs.quickThumbnailTextInput.value = "";
  }
  if (refs.thumbnailFileInput) {
    refs.thumbnailFileInput.value = "";
  }
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
  state.currentAccountId = defaultAccount.id;
  state.activeChannelId = defaultChannel.id;
  state.channelView = "dashboard";
  state.showDiscarded = true;
  state.channelWorkspaces = {
    [defaultChannel.id]: normalizeChannelWorkspace(createEmptyChannelWorkspace()),
  };
  state.briefsByChannel = {
    [defaultChannel.id]: normalizeChannelBriefState(createEmptyChannelBriefState(), defaultChannel.id),
  };
  state.activeBriefId = "";
  state.scriptIntroGroup = normalizeScriptIntroGroup({});
  state.scriptSections = normalizeScriptSectionCollection([]);
  state.scriptDraftLayout = "plain";
  state.scriptDraftShowColors = true;
  state.briefDetailExpanded = false;
  state.viewerSnapshotExpanded = false;
  state.briefWorkspaceView = "packaging";
  state.scriptingView = "draft";
  state.briefListSort = "newest";
  state.briefTagFilter = "all";
  state.inspirationLibraryOpen = false;
  state.titleExpandedId = "";
  state.thumbnailTextExpandedId = "";
  state.thumbnailExpandedId = "";
  state.comparableExpandedId = "";
  state.briefListExpandedId = "";
  pendingTitleReorderPositions = null;
  pendingThumbnailTextReorderPositions = null;
  pendingThumbReorderPositions = null;
  clearVariationDropTargets();
  ensureChannelModel();
  applyActiveChannelWorkspace(state.channelWorkspaces[defaultChannel.id]);
  applyActiveChannelBriefState(state.briefsByChannel[defaultChannel.id]);

  localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  void clearPersistedWorkspace();
  applyPipelineDefaults();
  updateBoardsAndBrief();
}

function updateBoardsAndBrief(options = {}) {
  const syncHistory = options.syncHistory !== false;
  const values = getFieldValues();
  cacheActiveChannelWorkspace(values);
  renderPageView();
  renderChannelPageBanner();
  renderChannelHomeBoard();
  renderIdeationStepView();

  if (state.pageView === "channel") {
    renderPipelineBoards();
  }

  if (state.pageView === "briefs") {
    renderBriefListBoard();
    setBriefEditorEnabled(false);
    renderBriefExportControls();
  } else if (state.pageView === "brief-detail") {
    if (!getActiveBriefRecord()) {
      state.pageView = "briefs";
      renderPageView();
      renderBriefListBoard();
      setBriefEditorEnabled(false);
      renderBriefExportControls();
      if (syncHistory) {
        syncNavigationHistory("replace");
      }
    } else {
      setBriefEditorEnabled(true);
      renderBriefWorkspaceState();
      renderScriptingWorkspaceState();
      renderBriefDetailCollapseState();
      renderViewerSnapshotCollapseState();
      renderBriefSourceSnapshot();
      renderIntroSentenceLegend();
      renderScriptDraftWorkspace();
      renderScriptExportWorkspace();
      renderTitleBoard();
      renderThumbnailTextBoard();
      renderThumbBoard();
      renderComparableBoard();
      updatePackagingPreview();
      updateScoreboard(values);
      updateBriefOutput(values);
      renderBriefExportControls();
    }
  } else {
    setBriefEditorEnabled(false);
    renderBriefExportControls();
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

function flashInlineText(el, text, ms = 1200) {
  if (!el) {
    return;
  }

  const original = el.textContent;
  el.textContent = text;
  setTimeout(() => {
    el.textContent = original;
  }, ms);
}

async function copyTextToClipboard(text) {
  const value = toCleanText(text);
  if (!value) {
    return false;
  }

  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (error) {
    console.warn("Async clipboard write failed. Falling back to document.execCommand.", error);
  }

  const fallbackInput = document.createElement("textarea");
  fallbackInput.value = value;
  fallbackInput.setAttribute("readonly", "");
  fallbackInput.style.position = "fixed";
  fallbackInput.style.opacity = "0";
  fallbackInput.style.pointerEvents = "none";
  document.body.appendChild(fallbackInput);
  fallbackInput.focus();
  fallbackInput.select();

  try {
    return document.execCommand("copy");
  } catch (error) {
    console.warn("Clipboard fallback failed.", error);
    return false;
  } finally {
    fallbackInput.remove();
  }
}

async function copyScriptMetadataJson(triggerBtn = refs.copyScriptMetadataJsonBtn) {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief || !state.scriptSections.length) {
    if (triggerBtn) {
      flashButtonText(triggerBtn, "No Script", 1000);
    }
    return false;
  }

  const payload = buildScriptMetadataPayload(getFieldValues());
  const didCopy = await copyTextToClipboard(JSON.stringify(payload, null, 2));
  if (triggerBtn) {
    flashButtonText(triggerBtn, didCopy ? "Copied" : "Copy Failed", 1100);
  }
  return didCopy;
}

/** Export windows are opened blank, so server-hosted assets need absolute URLs to resolve. */
function absolutizeAssetUrls(html) {
  return String(html || "").replace(/(src|href)="\/api\/assets\//g, `$1="${window.location.origin}/api/assets/`);
}

function openPdfPrintWindow(rawHtml, triggerButton) {
  const html = absolutizeAssetUrls(rawHtml);
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    flashButtonText(triggerButton, "Popup Blocked", 1500);
    return;
  }

  const autoPrintScript = `
    <script>
      (function () {
        const runPrint = () => {
          try {
            window.focus();
            window.print();
          } catch {}
        };

        if (document.readyState === "complete") {
          setTimeout(runPrint, 80);
        } else {
          window.addEventListener("load", () => setTimeout(runPrint, 80), { once: true });
        }

        window.addEventListener(
          "afterprint",
          () => {
            setTimeout(() => window.close(), 50);
          },
          { once: true },
        );
      })();
    </script>
  `;
  const htmlWithAutoPrint = html.includes("</body>")
    ? html.replace("</body>", `${autoPrintScript}</body>`)
    : `${html}${autoPrintScript}`;

  printWindow.document.open();
  printWindow.document.write(htmlWithAutoPrint);
  printWindow.document.close();
  flashButtonText(triggerButton, "Opening PDF", 900);
}

function openDocumentWindow(rawHtml, triggerButton, successText = "Opened") {
  const html = absolutizeAssetUrls(rawHtml);
  const docWindow = window.open("", "_blank");
  if (!docWindow) {
    flashButtonText(triggerButton, "Popup Blocked", 1500);
    return;
  }

  docWindow.document.open();
  docWindow.document.write(html);
  docWindow.document.close();
  flashButtonText(triggerButton, successText, 900);
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function exportPackagingBriefPdf() {
  if (!getActiveBriefRecord()) {
    flashButtonText(refs.exportPackagingBriefPdfBtn, "No Brief", 1000);
    return;
  }

  const html = buildThumbnailBriefExportHtml(getFieldValues());
  openPdfPrintWindow(html, refs.exportPackagingBriefPdfBtn);
}

function exportProductionBriefPdf() {
  if (!getActiveBriefRecord()) {
    flashButtonText(refs.exportProductionBriefPdfBtn, "No Brief", 1000);
    return;
  }

  const html = buildProductionBriefExportHtml(getFieldValues());
  openPdfPrintWindow(html, refs.exportProductionBriefPdfBtn);
}

function openScriptExport() {
  if (!getActiveBriefRecord()) {
    flashButtonText(refs.openScriptExportBtn, "No Brief", 1000);
    return;
  }
  const text = buildScriptExportText(getFieldValues());
  if (!text) {
    flashButtonText(refs.openScriptExportBtn, "No Script", 1000);
    return;
  }
  const values = getFieldValues();
  const filename = `${sanitizeFilenamePart(values.projectName, "youtube-script")}-script.txt`;
  downloadTextFile(filename, text);
  flashButtonText(refs.openScriptExportBtn, "Downloaded", 1000);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(toCleanText(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImageBitmapFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode the selected image."));
    };
    image.src = url;
  });
}

/** Screen-resolution previews are all the app displays, so shrink before anything is stored. */
async function downscaleImageFile(file) {
  if (file.type === "image/gif") {
    return file;
  }

  try {
    const image = await loadImageBitmapFromFile(file);
    const longEdge = Math.max(image.naturalWidth, image.naturalHeight);
    if (!longEdge) {
      return file;
    }
    const scale = Math.min(1, MAX_IMAGE_LONG_EDGE_PX / longEdge);
    if (scale === 1 && file.size <= MAX_UNSCALED_IMAGE_BYTES) {
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", IMAGE_ENCODE_QUALITY));
    if (!blob || blob.size >= file.size) {
      return file;
    }
    return blob;
  } catch (error) {
    console.warn("Could not downscale image; storing it as provided.", error);
    return file;
  }
}

/**
 * Uploads an image to the server and returns the URL to reference it by. Falls back to an
 * inline data URL when the backend is unavailable, which is the browser-only mode.
 */
async function uploadImageFile(file) {
  const prepared = await downscaleImageFile(file);
  if (!(await checkRemotePersistence())) {
    return readFileAsDataUrl(prepared);
  }

  try {
    const response = await fetch("/api/assets", {
      method: "POST",
      headers: {
        "Content-Type": prepared.type || "application/octet-stream",
        Accept: "application/json",
      },
      body: prepared,
    });
    if (!response.ok) {
      throw new Error(`Asset upload failed with status ${response.status}.`);
    }
    const payload = await response.json();
    return toCleanText(payload?.url);
  } catch (error) {
    console.warn("Could not upload image to the server; keeping it inline.", error);
    return readFileAsDataUrl(prepared);
  }
}

function getClipboardImageFiles(event) {
  const clipboardItems = Array.from(event?.clipboardData?.items || []);
  return clipboardItems
    .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
    .map((item) => item.getAsFile())
    .filter(Boolean);
}

function getDroppedImageFiles(event) {
  return Array.from(event?.dataTransfer?.files || []).filter(
    (file) => file && file.type && file.type.startsWith("image/"),
  );
}

function getDisplayNameFromFile(file) {
  const raw = toCleanText(file?.name);
  if (!raw) {
    return "Uploaded thumbnail";
  }

  const withoutExt = raw.replace(/\.[^.]+$/, "");
  return toCleanText(withoutExt) || "Uploaded thumbnail";
}

function isTextEditableElement(target) {
  const element = target instanceof HTMLElement ? target : null;
  if (!element) {
    return false;
  }

  if (element.isContentEditable) {
    return true;
  }

  const tag = element.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

async function addInspirationFiles(files, options = {}) {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    const triggerBtn = options.triggerButton || refs.addInspirationUploadBtn;
    flashButtonText(triggerBtn, "Create Brief First", 1300);
    return;
  }

  const imageFiles = Array.from(files || []).filter(
    (file) => file && file.type && file.type.startsWith("image/"),
  );
  if (!imageFiles.length) {
    return;
  }

  let addedCount = 0;
  for (const file of imageFiles) {
    try {
      const imageSrc = await uploadImageFile(file);
      if (!imageSrc) {
        continue;
      }

      state.comparables.push({
        id: createRecordId("insp"),
        imageSrc,
        sourceUrl: "",
        title: toCleanText(file.name) || "Uploaded inspiration",
        author: "",
        notes: "",
        videoId: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      addedCount += 1;
    } catch {
      continue;
    }
  }

  if (addedCount) {
    updateBoardsAndBrief({ persist: false });
    void saveSnapshot({ immediate: true });
  }
}

async function addThumbnailFiles(files, options = {}) {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    const triggerBtn = options.triggerButton || refs.addThumbnailUploadBtn;
    flashButtonText(triggerBtn, "Create Brief First", 1300);
    return;
  }

  const imageFiles = Array.from(files || []).filter(
    (file) => file && file.type && file.type.startsWith("image/"),
  );
  if (!imageFiles.length) {
    return;
  }

  let addedCount = 0;
  for (const file of imageFiles) {
    try {
      const imageSrc = await uploadImageFile(file);
      if (!imageSrc) {
        continue;
      }

      const title = getDisplayNameFromFile(file);
      const record = createThumbnailRecord({
        title,
        creator: "",
        meta: "",
        notes: "",
        imageSrc,
      });
      if (!record) {
        continue;
      }

      state.thumbnails.push(record);
      addedCount += 1;
    } catch {
      continue;
    }
  }

  if (addedCount) {
    updateBoardsAndBrief({ persist: false });
    void saveSnapshot({ immediate: true });
  }
}

function queueInspirationNotesSave() {
  if (inspirationNotesSaveTimer) {
    clearTimeout(inspirationNotesSaveTimer);
  }

  setSaveStatus("saving");
  inspirationNotesSaveTimer = setTimeout(() => {
    inspirationNotesSaveTimer = null;
    void saveSnapshot({ immediate: true });
  }, INSPIRATION_NOTES_SAVE_DEBOUNCE_MS);
}

function flushInspirationNotesSave() {
  if (inspirationNotesSaveTimer) {
    clearTimeout(inspirationNotesSaveTimer);
    inspirationNotesSaveTimer = null;
    return saveSnapshot({ immediate: true });
  }

  return Promise.resolve();
}

async function addComparable() {
  const activeBrief = getActiveBriefRecord();
  if (!activeBrief) {
    flashButtonText(refs.addComparableBtn, "Create Brief First", 1300);
    return;
  }

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

  const sourceUrl = normalizeVideoUrl(videoId);
  const record = {
    id: createRecordId("insp"),
    imageSrc: getThumbUrl(videoId, "hq"),
    sourceUrl,
    notes: "",
    videoId,
    title: "Loading YouTube metadata...",
    author: "Loading creator...",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  state.comparables.push(record);
  refs.comparableUrl.value = "";
  updateBoardsAndBrief({ persist: false });
  void saveSnapshot({ immediate: true });

  const meta = await fetchComparableMetadata(sourceUrl);
  if (meta) {
    record.title = meta.title || "YouTube inspiration";
    record.author = meta.author || "";
  } else {
    record.title = `YouTube inspiration · ${videoId}`;
  }
  record.updatedAt = Date.now();

  updateBoardsAndBrief({ persist: false });
  void saveSnapshot();
}

function addTitleVariationFromQuickEntry() {
  if (!getActiveBriefRecord()) {
    flashButtonText(refs.addQuickTitleBtn, "Create Brief First", 1200);
    return;
  }

  const text = toCleanText(refs.quickTitleInput.value);
  if (!text) {
    flashButtonText(refs.addQuickTitleBtn, "Need title", 1000);
    return;
  }

  const normalized = text.toLowerCase();
  if (state.titles.some((item) => toCleanText(item.text).toLowerCase() === normalized)) {
    flashButtonText(refs.addQuickTitleBtn, "Exists", 1000);
    return;
  }

  const record = createTitleRecord({ text });
  if (!record) {
    flashButtonText(refs.addQuickTitleBtn, "Need title", 1000);
    return;
  }

  state.titles.push(record);
  refs.quickTitleInput.value = "";
  refs.quickTitleInput.focus();
  syncProjectNameFromTopTitle();
  updateBoardsAndBrief();
}

function addThumbnailTextFromQuickEntry() {
  if (!getActiveBriefRecord()) {
    flashButtonText(refs.addQuickThumbnailTextBtn, "Create Brief First", 1200);
    return;
  }

  const text = toCleanText(refs.quickThumbnailTextInput?.value);
  if (!text) {
    flashButtonText(refs.addQuickThumbnailTextBtn, "Need text", 1000);
    return;
  }

  const normalized = text.toLowerCase();
  if (state.thumbnailTexts.some((item) => toCleanText(item.text).toLowerCase() === normalized)) {
    flashButtonText(refs.addQuickThumbnailTextBtn, "Exists", 1000);
    return;
  }

  const record = createThumbnailTextRecord({ text });
  if (!record) {
    flashButtonText(refs.addQuickThumbnailTextBtn, "Need text", 1000);
    return;
  }

  state.thumbnailTexts.push(record);
  refs.quickThumbnailTextInput.value = "";
  refs.quickThumbnailTextInput.focus();
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
      status: "none",
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
      status: "none",
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
      status: "none",
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
      status: "none",
    }),
  );

  refs.step3QuickIdea.value = "";
  updateBoardsAndBrief();
}

function bindEvents() {
  if (refs.showHomePageBtn) {
    refs.showHomePageBtn.addEventListener("click", () => {
      setPageView("home");
    });
  }

  if (refs.showChannelPageBtn) {
    refs.showChannelPageBtn.addEventListener("click", () => {
      if (refs.showChannelPageBtn.disabled) {
        return;
      }
      const activeChannel = getActiveChannelRecord();
      if (!activeChannel) {
        return;
      }

      state.channelView = "dashboard";
      setPageView("channel");
    });
  }

  if (refs.showBriefsPageBtn) {
    refs.showBriefsPageBtn.addEventListener("click", () => {
      const activeChannel = getActiveChannelRecord();
      if (!activeChannel) {
        return;
      }

      setPageView("briefs");
    });
  }

  refs.jumpToIdeationBtn.addEventListener("click", () => {
    state.channelView = "ideation";
    setPageView("channel");
  });

  refs.jumpToBriefsBtn.addEventListener("click", () => {
    setPageView("briefs");
  });

  refs.createBriefBtn.addEventListener("click", () => {
    const brief = createManualBrief();
    if (!brief) {
      return;
    }

    setPageView("brief-detail");
  });

  if (refs.backToBriefListBtn) {
    refs.backToBriefListBtn.addEventListener("click", () => {
      setPageView("briefs");
    });
  }

  if (refs.briefListSort) {
    refs.briefListSort.addEventListener("change", () => {
      state.briefListSort = normalizeBriefListSort(refs.briefListSort.value);
      renderBriefListBoard();
      saveSnapshot();
    });
  }

  if (refs.briefTagFilter) {
    refs.briefTagFilter.addEventListener("change", () => {
      state.briefTagFilter = normalizeBriefTagFilter(refs.briefTagFilter.value);
      renderBriefListBoard();
      saveSnapshot();
    });
  }

  if (refs.briefTagsInput) {
    refs.briefTagsInput.addEventListener("change", () => {
      if (!updateActiveBriefTags(refs.briefTagsInput.value)) {
        return;
      }
      saveSnapshot();
      renderBriefListBoard();
    });
  }

  if (refs.showPackagingWorkspaceBtn) {
    refs.showPackagingWorkspaceBtn.addEventListener("click", () => {
      state.briefWorkspaceView = "packaging";
      updateBoardsAndBrief();
    });
  }

  if (refs.showScriptingWorkspaceBtn) {
    refs.showScriptingWorkspaceBtn.addEventListener("click", () => {
      state.briefWorkspaceView = "scripting";
      updateBoardsAndBrief();
    });
  }

  if (refs.showScriptDraftBtn) {
    refs.showScriptDraftBtn.addEventListener("click", () => {
      state.scriptingView = "draft";
      updateBoardsAndBrief();
    });
  }

  if (refs.showScriptExportBtn) {
    refs.showScriptExportBtn.addEventListener("click", () => {
      state.scriptingView = "export";
      updateBoardsAndBrief();
    });
  }

  if (refs.addScriptSectionBtn) {
    refs.addScriptSectionBtn.addEventListener("click", () => {
      state.scriptSections.push(createScriptSectionRecord({}, state.scriptSections.length));
      state.scriptingView = "draft";
      state.briefWorkspaceView = "scripting";
      updateBoardsAndBrief();
    });
  }

  if (refs.addIntroVariantBtn) {
    refs.addIntroVariantBtn.addEventListener("click", () => {
      state.scriptIntroGroup = normalizeScriptIntroGroup(state.scriptIntroGroup);
      state.scriptIntroGroup.variants.push(
        createIntroVariantSectionRecord({}, getIntroVariants(state.scriptIntroGroup).length),
      );
      state.scriptingView = "draft";
      state.briefWorkspaceView = "scripting";
      updateBoardsAndBrief();
    });
  }

  if (refs.scriptSectionModalCancelBtn) {
    refs.scriptSectionModalCancelBtn.addEventListener("click", closeScriptSectionModal);
  }

  if (refs.scriptSectionModalConfirmBtn) {
    refs.scriptSectionModalConfirmBtn.addEventListener("click", submitScriptSectionModal);
  }

  [
    refs.copyScriptSectionModalPromptBtn,
    refs.copyScriptSectionModalPlainBtn,
    refs.copyScriptSectionModalJsonBtn,
  ]
    .filter(Boolean)
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const payload = toCleanText(button.dataset.copyPayload);
        if (!payload) {
          flashButtonText(button, "Empty", 900);
          return;
        }
        const didCopy = await copyTextToClipboard(payload);
        flashButtonText(button, didCopy ? "Copied" : "Copy Failed", 1100);
      });
    });

  if (refs.scriptSectionModal) {
    refs.scriptSectionModal.addEventListener("click", (event) => {
      if (event.target === refs.scriptSectionModal) {
        closeScriptSectionModal();
      }
    });
  }

  if (refs.scriptSectionModalTextarea) {
    refs.scriptSectionModalTextarea.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        submitScriptSectionModal();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeScriptSectionModal();
      }
    });
  }

  if (refs.toggleBriefDetailBtn) {
    refs.toggleBriefDetailBtn.addEventListener("click", () => {
      state.briefDetailExpanded = !state.briefDetailExpanded;
      renderBriefDetailCollapseState();
    });
  }

  if (refs.toggleViewerSnapshotBtn) {
    refs.toggleViewerSnapshotBtn.addEventListener("click", () => {
      state.viewerSnapshotExpanded = !state.viewerSnapshotExpanded;
      renderViewerSnapshotCollapseState();
    });
  }

  refs.prevStepViewBtn.addEventListener("click", () => {
    setIdeationStep(state.ideationStepView - 1);
  });

  refs.nextStepViewBtn.addEventListener("click", () => {
    setIdeationStep(state.ideationStepView + 1);
  });

  refs.jumpStep1Btn.addEventListener("click", () => {
    setIdeationStep(1);
  });

  refs.jumpStep2Btn.addEventListener("click", () => {
    setIdeationStep(2);
  });

  refs.jumpStep3Btn.addEventListener("click", () => {
    setIdeationStep(3);
  });

  refs.toggleDiscardedBtn.addEventListener("click", () => {
    state.showDiscarded = !state.showDiscarded;
    updateBoardsAndBrief();
  });

  refs.addStep1FastBtn.addEventListener("click", addStep1IdeaFast);
  refs.addStep1Btn.addEventListener("click", addStep1IdeaFromQuickEntry);
  refs.addStep2Btn.addEventListener("click", addStep2IdeaFromQuickEntry);
  refs.addStep3Btn.addEventListener("click", addStep3IdeaFromQuickEntry);
  refs.addQuickTitleBtn.addEventListener("click", addTitleVariationFromQuickEntry);
  if (refs.addQuickThumbnailTextBtn) {
    refs.addQuickThumbnailTextBtn.addEventListener("click", addThumbnailTextFromQuickEntry);
  }

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

  refs.quickTitleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTitleVariationFromQuickEntry();
    }
  });

  if (refs.quickThumbnailTextInput) {
    refs.quickThumbnailTextInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addThumbnailTextFromQuickEntry();
      }
    });
  }

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

  const saveStateBtn = document.getElementById("saveStateBtn");
  if (saveStateBtn) {
    saveStateBtn.addEventListener("click", async () => {
      await saveSnapshot({ immediate: true });
      await flushPersistQueue();
      flashButtonText(saveStateBtn, "Saved", 900);
    });
  }

  const resetStateBtn = document.getElementById("resetStateBtn");
  if (resetStateBtn) {
    resetStateBtn.addEventListener("click", resetAll);
  }

  if (refs.keepLocalEditsBtn) {
    refs.keepLocalEditsBtn.addEventListener("click", () => {
      void keepLocalEditsAfterConflict();
    });
  }
  if (refs.discardLocalEditsBtn) {
    refs.discardLocalEditsBtn.addEventListener("click", discardLocalEditsAfterConflict);
  }
  if (refs.exportPackagingBriefPdfBtn) {
    refs.exportPackagingBriefPdfBtn.addEventListener("click", exportPackagingBriefPdf);
  }
  if (refs.exportProductionBriefPdfBtn) {
    refs.exportProductionBriefPdfBtn.addEventListener("click", exportProductionBriefPdf);
  }
  if (refs.openScriptExportBtn) {
    refs.openScriptExportBtn.addEventListener("click", openScriptExport);
  }
  if (refs.copyScriptMetadataJsonBtn) {
    refs.copyScriptMetadataJsonBtn.addEventListener("click", () => copyScriptMetadataJson(refs.copyScriptMetadataJsonBtn));
  }
  if (refs.exportAnalyticsBriefBtn) {
    refs.exportAnalyticsBriefBtn.addEventListener("click", () => {
      flashButtonText(refs.exportAnalyticsBriefBtn, "Not Yet", 1200);
    });
  }

  if (refs.addComparableBtn) {
    refs.addComparableBtn.addEventListener("click", addComparable);
  }

  if (refs.toggleInspirationLibraryBtn) {
    refs.toggleInspirationLibraryBtn.addEventListener("click", () => {
      if (!getActiveBriefRecord()) {
        flashButtonText(refs.toggleInspirationLibraryBtn, "Create Brief First", 1300);
        return;
      }

      state.inspirationLibraryOpen = !state.inspirationLibraryOpen;
      renderInspirationLibraryPopover();
      if (state.inspirationLibraryOpen) {
        refs.inspirationLibraryPopover?.focus();
      }
    });
  }

  refs.inspirationLibrarySourceTabs.forEach((button) => {
    button.addEventListener("click", () => {
      const nextSource = toCleanText(button.dataset.inspirationSource);
      if (!INSPIRATION_LIBRARY_SOURCES.includes(nextSource)) {
        return;
      }
      state.inspirationLibrarySource = nextSource;
      renderInspirationLibraryPopover();
    });
  });

  if (refs.inspirationLibraryPopover) {
    refs.inspirationLibraryPopover.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }
      state.inspirationLibraryOpen = false;
      renderInspirationLibraryPopover();
      refs.toggleInspirationLibraryBtn?.focus();
    });
  }

  document.addEventListener("click", (event) => {
    if (!state.inspirationLibraryOpen || !refs.inspirationLibraryPopover || !refs.toggleInspirationLibraryBtn) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }

    if (
      refs.inspirationLibraryPopover.contains(target) ||
      refs.toggleInspirationLibraryBtn.contains(target)
    ) {
      return;
    }

    state.inspirationLibraryOpen = false;
    renderInspirationLibraryPopover();
  });

  if (refs.comparableUrl) {
    refs.comparableUrl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addComparable();
      }
    });
  }

  if (refs.addThumbnailUploadBtn && refs.thumbnailFileInput) {
    refs.addThumbnailUploadBtn.addEventListener("click", () => {
      if (!getActiveBriefRecord()) {
        flashButtonText(refs.addThumbnailUploadBtn, "Create Brief First", 1300);
        return;
      }

      refs.thumbnailFileInput.click();
    });

    refs.thumbnailFileInput.addEventListener("change", async () => {
      await addThumbnailFiles(refs.thumbnailFileInput.files, {
        triggerButton: refs.addThumbnailUploadBtn,
      });
      refs.thumbnailFileInput.value = "";
    });
  }

  if (refs.thumbnailPasteZone) {
    refs.thumbnailPasteZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      refs.thumbnailPasteZone.classList.add("is-dragging");
    });

    refs.thumbnailPasteZone.addEventListener("dragleave", () => {
      refs.thumbnailPasteZone.classList.remove("is-dragging");
    });

    refs.thumbnailPasteZone.addEventListener("drop", async (event) => {
      event.preventDefault();
      refs.thumbnailPasteZone.classList.remove("is-dragging");
      const droppedFiles = getDroppedImageFiles(event);
      if (droppedFiles.length) {
        await addThumbnailFiles(droppedFiles, { triggerButton: refs.addThumbnailUploadBtn });
      }
    });

    refs.thumbnailPasteZone.addEventListener("paste", async (event) => {
      const pastedFiles = getClipboardImageFiles(event);
      if (!pastedFiles.length) {
        return;
      }

      event.preventDefault();
      await addThumbnailFiles(pastedFiles, { triggerButton: refs.addThumbnailUploadBtn });
    });
  }

  if (refs.addInspirationUploadBtn && refs.inspirationFileInput) {
    refs.addInspirationUploadBtn.addEventListener("click", () => {
      if (!getActiveBriefRecord()) {
        flashButtonText(refs.addInspirationUploadBtn, "Create Brief First", 1300);
        return;
      }

      refs.inspirationFileInput.click();
    });

    refs.inspirationFileInput.addEventListener("change", async () => {
      await addInspirationFiles(refs.inspirationFileInput.files, {
        triggerButton: refs.addInspirationUploadBtn,
      });
      refs.inspirationFileInput.value = "";
    });
  }

  if (refs.inspirationPasteZone) {
    refs.inspirationPasteZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      refs.inspirationPasteZone.classList.add("is-dragging");
    });

    refs.inspirationPasteZone.addEventListener("dragleave", () => {
      refs.inspirationPasteZone.classList.remove("is-dragging");
    });

    refs.inspirationPasteZone.addEventListener("drop", async (event) => {
      event.preventDefault();
      refs.inspirationPasteZone.classList.remove("is-dragging");
      const droppedFiles = getDroppedImageFiles(event);
      if (droppedFiles.length) {
        await addInspirationFiles(droppedFiles, { triggerButton: refs.addInspirationUploadBtn });
      }
    });

    refs.inspirationPasteZone.addEventListener("paste", async (event) => {
      const pastedFiles = getClipboardImageFiles(event);
      if (!pastedFiles.length) {
        return;
      }

      event.preventDefault();
      await addInspirationFiles(pastedFiles, { triggerButton: refs.addInspirationUploadBtn });
    });
  }

  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }

    const onChange = () => {
      if (!getActiveBriefRecord()) {
        return;
      }

      updateScoreboard(getFieldValues());
      updateBriefOutput(getFieldValues());
      saveSnapshot();
    };

    el.addEventListener("input", onChange);
    el.addEventListener("change", onChange);
  });

  if (refs.briefStatusSelect) {
    refs.briefStatusSelect.addEventListener("change", () => {
      if (!getActiveBriefRecord()) {
        return;
      }

      updateActiveBriefStatus(refs.briefStatusSelect.value);
      updateBoardsAndBrief();
    });
  }

  window.addEventListener("popstate", (event) => {
    const fromHistory = event.state && typeof event.state === "object" ? event.state.nav : null;
    const nextNav = fromHistory || getNavigationStateFromLocation();
    applyNavigationState(nextNav, { persist: false, syncHistory: true, historyMode: "replace" });
  });

  document.addEventListener("paste", async (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (state.pageView !== "brief-detail" || !getActiveBriefRecord()) {
      return;
    }

    if (isTextEditableElement(event.target)) {
      return;
    }

    const pastedFiles = getClipboardImageFiles(event);
    if (!pastedFiles.length) {
      return;
    }

    event.preventDefault();
    await addInspirationFiles(pastedFiles, { triggerButton: refs.addInspirationUploadBtn });
  });
}

async function init() {
  renderViewerSnapshot();
  await ensureViewerProfilePersistence();
  const loadedSnapshot = await loadSnapshot();
  ensureChannelModel();
  ensureChannelWorkspace(state.activeChannelId);
  ensureChannelBriefState(state.activeChannelId);
  applyActiveChannelWorkspace(state.channelWorkspaces[state.activeChannelId]);
  applyActiveChannelBriefState(state.briefsByChannel[state.activeChannelId]);
  applyPipelineDefaults();
  bindEvents();

  if (loadedSnapshot) {
    const savedNav = getNavigationStateFromCurrentState();
    applyNavigationState(savedNav, { persist: false, syncHistory: false });
    syncNavigationHistory("replace");
    setSaveStatus("saved", Date.now());
    return;
  }

  const locationNav = getNavigationStateFromLocation();
  applyNavigationState(locationNav, { persist: false, syncHistory: false });
  syncNavigationHistory("replace");
  setSaveStatus(remoteLoadFailed ? "load-failed" : "saved", Date.now());
}

void init();
