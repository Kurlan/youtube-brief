/**
 * UI wiring for the connected YouTube channel panel: sign-in, channel stats,
 * recent uploads with live stats, metadata editing, and comparable import.
 */

const RECENT_VIDEO_LIMIT = 10;

const channelRefs = {
  panel: document.getElementById("channelPanel"),
  setup: document.getElementById("channelSetup"),
  clientIdInput: document.getElementById("channelClientId"),
  saveClientIdBtn: document.getElementById("channelSaveClientIdBtn"),
  connectBtn: document.getElementById("channelConnectBtn"),
  refreshBtn: document.getElementById("channelRefreshBtn"),
  disconnectBtn: document.getElementById("channelDisconnectBtn"),
  status: document.getElementById("channelStatus"),
  summary: document.getElementById("channelSummary"),
  avatar: document.getElementById("channelAvatar"),
  title: document.getElementById("channelTitle"),
  handle: document.getElementById("channelHandle"),
  subs: document.getElementById("channelSubs"),
  views: document.getElementById("channelViews"),
  videos: document.getElementById("channelVideos"),
  avgViews: document.getElementById("channelAvgViews"),
  videoBoard: document.getElementById("channelVideoBoard"),
  videoTemplate: document.getElementById("channelVideoTemplate"),
};

const channelState = {
  channel: null,
  videos: [],
  loading: false,
};

const numberFormat = new Intl.NumberFormat();

function formatCount(value) {
  return numberFormat.format(Math.round(value || 0));
}

function formatDate(isoDate) {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
}

function setChannelStatus(message, tone = "neutral") {
  channelRefs.status.textContent = message;
  channelRefs.status.dataset.tone = tone;
}

function setBusy(isBusy) {
  channelState.loading = isBusy;
  [channelRefs.connectBtn, channelRefs.refreshBtn, channelRefs.disconnectBtn].forEach((button) => {
    button.disabled = isBusy;
  });
}

function renderChannelSummary() {
  const channel = channelState.channel;

  if (!channel) {
    channelRefs.summary.hidden = true;
    return;
  }

  channelRefs.summary.hidden = false;
  channelRefs.avatar.src = channel.thumbnail;
  channelRefs.avatar.alt = `${channel.title} avatar`;
  channelRefs.title.textContent = channel.title;
  channelRefs.handle.textContent = [channel.handle, channel.country].filter(Boolean).join(" | ");
  channelRefs.subs.textContent = channel.hiddenSubscriberCount
    ? "Hidden"
    : formatCount(channel.subscriberCount);
  channelRefs.views.textContent = formatCount(channel.viewCount);
  channelRefs.videos.textContent = formatCount(channel.videoCount);
  channelRefs.avgViews.textContent = channel.videoCount
    ? formatCount(channel.viewCount / channel.videoCount)
    : "-";
}

function renderVideoCard(video) {
  const fragment = channelRefs.videoTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".channel-video-card");
  const thumb = fragment.querySelector(".channel-video-thumb");
  const form = fragment.querySelector(".channel-video-form");
  const titleInput = fragment.querySelector(".channel-video-title-input");
  const descriptionInput = fragment.querySelector(".channel-video-description-input");
  const formStatus = fragment.querySelector(".channel-video-form-status");
  const editBtn = fragment.querySelector(".channel-video-edit");
  const comparableBtn = fragment.querySelector(".channel-video-comparable");
  const link = fragment.querySelector(".channel-video-link");

  thumb.src = video.thumbnail;
  thumb.alt = `${video.title} thumbnail`;
  fragment.querySelector(".channel-video-title").textContent = video.title;
  fragment.querySelector(".channel-video-meta").textContent = [
    `${formatCount(video.viewCount)} views`,
    `${formatCount(video.likeCount)} likes`,
    `${formatCount(video.commentCount)} comments`,
    formatDate(video.publishedAt),
    video.privacyStatus,
  ]
    .filter(Boolean)
    .join(" | ");
  link.href = video.url;

  comparableBtn.addEventListener("click", () => {
    const added = window.briefStudio.addComparableFromVideo({
      videoId: video.id,
      title: video.title,
      author: video.channelTitle,
    });
    comparableBtn.textContent = added ? "Added" : "Already Added";
    setTimeout(() => {
      comparableBtn.textContent = "Add as Comparable";
    }, 1300);
  });

  editBtn.addEventListener("click", () => {
    const opening = form.hidden;
    if (opening) {
      titleInput.value = video.title;
      descriptionInput.value = video.description;
      formStatus.textContent = "";
    }

    form.hidden = !opening;
    editBtn.textContent = opening ? "Close Editor" : "Edit Metadata";
  });

  fragment.querySelector(".channel-video-cancel").addEventListener("click", () => {
    form.hidden = true;
    editBtn.textContent = "Edit Metadata";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const saveBtn = form.querySelector(".channel-video-save");
    saveBtn.disabled = true;
    formStatus.textContent = "Saving to YouTube...";

    try {
      const updated = await window.youtubeClient.updateVideoMetadata(video.id, {
        title: titleInput.value.trim(),
        description: descriptionInput.value,
      });

      video.title = updated.title;
      video.description = updated.description;
      card.querySelector(".channel-video-title").textContent = updated.title;
      formStatus.textContent = "Saved.";
    } catch (error) {
      formStatus.textContent = error.message || "Update failed.";
    } finally {
      saveBtn.disabled = false;
    }
  });

  return fragment;
}

function renderVideoBoard() {
  channelRefs.videoBoard.innerHTML = "";

  if (!channelState.channel) {
    return;
  }

  if (!channelState.videos.length) {
    channelRefs.videoBoard.innerHTML =
      '<p class="hint">No uploads found on the connected channel.</p>';
    return;
  }

  channelState.videos.forEach((video) => {
    channelRefs.videoBoard.appendChild(renderVideoCard(video));
  });
}

async function loadChannel({ interactive }) {
  setBusy(true);
  setChannelStatus(interactive ? "Connecting to YouTube..." : "Loading channel data...");

  try {
    const channel = await window.youtubeClient.getMyChannel({ interactive });
    channelState.channel = channel;
    renderChannelSummary();

    setChannelStatus(`Loading the ${RECENT_VIDEO_LIMIT} most recent uploads...`);
    channelState.videos = await window.youtubeClient.listRecentVideos(channel.uploadsPlaylistId, {
      limit: RECENT_VIDEO_LIMIT,
    });
    renderVideoBoard();

    setChannelStatus(
      `Connected as ${channel.title}. Live data from the YouTube Data API.`,
      "success",
    );
    channelRefs.setup.open = false;
  } catch (error) {
    channelState.channel = null;
    channelState.videos = [];
    renderChannelSummary();
    renderVideoBoard();

    if (error.status === 401 && !interactive) {
      setChannelStatus("Not connected. Choose Connect Channel to sign in with Google.");
    } else {
      setChannelStatus(error.message || "Could not load channel data.", "error");
    }
  } finally {
    setBusy(false);
  }
}

function bindChannelEvents() {
  channelRefs.saveClientIdBtn.addEventListener("click", () => {
    const value = channelRefs.clientIdInput.value.trim();

    if (!value.endsWith(".apps.googleusercontent.com")) {
      setChannelStatus(
        "That does not look like a Google OAuth client ID (expected *.apps.googleusercontent.com).",
        "error",
      );
      return;
    }

    window.youtubeClient.setClientId(value);
    channelState.channel = null;
    channelState.videos = [];
    renderChannelSummary();
    renderVideoBoard();
    setChannelStatus("Client ID saved. Choose Connect Channel to sign in.", "success");
  });

  channelRefs.connectBtn.addEventListener("click", () => {
    if (!window.youtubeClient.isConfigured()) {
      channelRefs.setup.open = true;
      setChannelStatus("Add your Google OAuth client ID first.", "error");
      return;
    }

    loadChannel({ interactive: true });
  });

  channelRefs.refreshBtn.addEventListener("click", () => {
    loadChannel({ interactive: window.youtubeClient.isConnected() ? false : true });
  });

  channelRefs.disconnectBtn.addEventListener("click", async () => {
    setBusy(true);
    await window.youtubeClient.disconnect();
    channelState.channel = null;
    channelState.videos = [];
    renderChannelSummary();
    renderVideoBoard();
    setChannelStatus("Disconnected. Access token revoked.");
    setBusy(false);
  });
}

function initChannelPanel() {
  bindChannelEvents();

  const configuredByFile = Boolean(
    window.YT_BRIEF_CONFIG && window.YT_BRIEF_CONFIG.googleClientId,
  );

  if (window.youtubeClient.isConfigured() && !configuredByFile) {
    channelRefs.clientIdInput.value = window.youtubeClient.clientId;
  }

  if (!window.youtubeClient.isConfigured()) {
    channelRefs.setup.open = true;
    setChannelStatus("Add a Google OAuth client ID to connect your channel.");
    return;
  }

  if (window.youtubeClient.isConnected()) {
    loadChannel({ interactive: false });
    return;
  }

  setChannelStatus("Not connected. Choose Connect Channel to sign in with Google.");
}

initChannelPanel();
