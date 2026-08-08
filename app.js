const STORAGE_KEY = "yt-brief-studio-v4";
const LEGACY_STORAGE_KEYS = ["yt-brief-studio-v3", "yt-brief-studio-v2", "yt-brief-studio-v1"];

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
  titles: [],
  thumbnails: [],
  comparables: [],
  latestBriefHtml: "",
};

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

function saveSnapshot() {
  const payload = {
    values: getFieldValues(),
    titles: state.titles,
    thumbnails: state.thumbnails,
    comparables: state.comparables,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadSnapshot() {
  const keysToCheck = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

  for (const key of keysToCheck) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw);
      setFieldValues(parsed.values || {});
      state.titles = Array.isArray(parsed.titles) ? parsed.titles : [];
      state.thumbnails = Array.isArray(parsed.thumbnails) ? parsed.thumbnails : [];
      state.comparables = Array.isArray(parsed.comparables) ? parsed.comparables : [];
      return true;
    } catch {
      continue;
    }
  }

  return false;
}

function resetAll() {
  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.value = "";
    }
  });

  refs.comparableUrl.value = "";
  state.titles = [];
  state.thumbnails = [];
  state.comparables = [];

  localStorage.removeItem(STORAGE_KEY);
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  applyDefaultPlaybookValues();
  updateBoardsAndBrief();
}

function updateBoardsAndBrief() {
  const values = getFieldValues();
  renderTitleBoard();
  renderThumbBoard();
  renderComparableBoard();
  updateScoreboard(values);
  updateBriefOutput(values);
  saveSnapshot();
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

/**
 * Attach a known video (for example one pulled from the connected channel) to
 * the comparable board without another metadata lookup.
 * @returns {boolean} false when the video is already on the board
 */
function addComparableFromVideo({ videoId, title, author }) {
  if (!videoId || state.comparables.some((item) => item.videoId === videoId)) {
    return false;
  }

  state.comparables.unshift({
    videoId,
    url: normalizeVideoUrl(videoId),
    title: title || `Comparable: ${videoId}`,
    author: author || "",
  });

  updateBoardsAndBrief();
  return true;
}

function bindEvents() {
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

  document.getElementById("saveStateBtn").addEventListener("click", () => {
    saveSnapshot();
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

function init() {
  renderViewerSnapshot();
  loadSnapshot();
  applyDefaultPlaybookValues();
  bindEvents();
  updateBoardsAndBrief();
}

window.briefStudio = { addComparableFromVideo };

init();
