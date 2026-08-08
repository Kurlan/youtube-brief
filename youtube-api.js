/**
 * YouTube Data API v3 client for the authenticated channel.
 *
 * Auth uses Google Identity Services (GIS) in the browser, so no client secret
 * exists in this app. The OAuth client ID is a public identifier and is read at
 * runtime from `config.js` (git-ignored) or from the in-app setup field, never
 * from committed source. Access tokens live in sessionStorage only and are
 * cleared on disconnect or tab close.
 */

const YT_API_BASE = "https://www.googleapis.com/youtube/v3";
const YT_SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.force-ssl",
].join(" ");

const CLIENT_ID_STORAGE_KEY = "yt-brief-google-client-id";
const TOKEN_STORAGE_KEY = "yt-brief-google-token";
const TOKEN_EXPIRY_SKEW_MS = 60_000;

class YouTubeApiError extends Error {
  constructor(message, { status = 0, reason = "" } = {}) {
    super(message);
    this.name = "YouTubeApiError";
    this.status = status;
    this.reason = reason;
  }
}

function readStoredClientId() {
  const configured = (window.YT_BRIEF_CONFIG && window.YT_BRIEF_CONFIG.googleClientId) || "";
  if (configured.trim()) {
    return configured.trim();
  }

  try {
    return (window.localStorage.getItem(CLIENT_ID_STORAGE_KEY) || "").trim();
  } catch {
    return "";
  }
}

function writeStoredClientId(clientId) {
  try {
    if (clientId) {
      window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId);
    } else {
      window.localStorage.removeItem(CLIENT_ID_STORAGE_KEY);
    }
  } catch {
    // Storage can be blocked; the client ID then lasts for this page load only.
  }
}

function readStoredToken() {
  try {
    const raw = window.sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const token = JSON.parse(raw);
    if (!token.accessToken || !token.expiresAt) {
      return null;
    }

    if (token.expiresAt - TOKEN_EXPIRY_SKEW_MS <= Date.now()) {
      return null;
    }

    return token;
  } catch {
    return null;
  }
}

function writeStoredToken(token) {
  try {
    if (token) {
      window.sessionStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
    } else {
      window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // Storage can be blocked; the token then lasts for this page load only.
  }
}

function formatApiError(status, payload) {
  const apiError = payload && payload.error;
  const detail = apiError && Array.isArray(apiError.errors) ? apiError.errors[0] : null;
  const reason = (detail && detail.reason) || "";
  const message =
    (apiError && apiError.message) || `YouTube API request failed with status ${status}.`;

  if (reason === "quotaExceeded" || reason === "dailyLimitExceeded") {
    return new YouTubeApiError("YouTube API quota exceeded for today.", { status, reason });
  }

  if (reason === "forbidden" || status === 403) {
    return new YouTubeApiError(`${message} (check enabled API and granted scopes)`, {
      status,
      reason,
    });
  }

  return new YouTubeApiError(message, { status, reason });
}

class YouTubeClient {
  constructor() {
    this.clientId = readStoredClientId();
    this.token = readStoredToken();
    this.tokenClient = null;
    this.tokenClientId = "";
  }

  isConfigured() {
    return Boolean(this.clientId);
  }

  isConnected() {
    return Boolean(readStoredToken());
  }

  setClientId(clientId) {
    const next = (clientId || "").trim();
    if (next === this.clientId) {
      return;
    }

    this.clientId = next;
    this.tokenClient = null;
    writeStoredClientId(next);
    this.forgetToken();
  }

  forgetToken() {
    this.token = null;
    writeStoredToken(null);
  }

  isGisReady() {
    return Boolean(window.google && window.google.accounts && window.google.accounts.oauth2);
  }

  async waitForGis(timeoutMs = 8000) {
    const startedAt = Date.now();

    while (!this.isGisReady()) {
      if (Date.now() - startedAt > timeoutMs) {
        throw new YouTubeApiError(
          "Google Identity Services failed to load. Check your network connection and retry.",
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 120));
    }
  }

  async getTokenClient() {
    if (!this.clientId) {
      throw new YouTubeApiError("Add your Google OAuth client ID before connecting.");
    }

    await this.waitForGis();

    if (!this.tokenClient || this.tokenClientId !== this.clientId) {
      this.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: YT_SCOPES,
        callback: () => {},
      });
      this.tokenClientId = this.clientId;
    }

    return this.tokenClient;
  }

  /**
   * @param {{ interactive?: boolean }} options
   * @returns {Promise<string>} a valid access token
   */
  async getAccessToken({ interactive = true } = {}) {
    const cached = readStoredToken();
    if (cached) {
      this.token = cached;
      return cached.accessToken;
    }

    if (!interactive) {
      throw new YouTubeApiError("Connect your YouTube channel to continue.", { status: 401 });
    }

    const tokenClient = await this.getTokenClient();

    const response = await new Promise((resolve, reject) => {
      tokenClient.callback = (result) => {
        if (result.error) {
          reject(
            new YouTubeApiError(result.error_description || `Google sign-in failed: ${result.error}`),
          );
          return;
        }

        resolve(result);
      };

      tokenClient.error_callback = (error) => {
        reject(new YouTubeApiError(error.message || "Google sign-in was cancelled."));
      };

      tokenClient.requestAccessToken({ prompt: this.token ? "" : "consent" });
    });

    const token = {
      accessToken: response.access_token,
      expiresAt: Date.now() + Number(response.expires_in || 3600) * 1000,
      scope: response.scope || YT_SCOPES,
    };

    this.token = token;
    writeStoredToken(token);
    return token.accessToken;
  }

  async disconnect() {
    const token = this.token || readStoredToken();
    this.forgetToken();

    if (token && this.isGisReady()) {
      await new Promise((resolve) => {
        window.google.accounts.oauth2.revoke(token.accessToken, resolve);
      });
    }
  }

  async request(path, { method = "GET", params = {}, body = null, interactive = true } = {}) {
    const accessToken = await this.getAccessToken({ interactive });
    const url = new URL(`${YT_API_BASE}/${path}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      this.forgetToken();
      throw new YouTubeApiError("Your Google session expired. Connect again.", { status: 401 });
    }

    const payload = response.status === 204 ? null : await response.json().catch(() => null);

    if (!response.ok) {
      throw formatApiError(response.status, payload);
    }

    return payload;
  }

  /** Channel of the authenticated user, including stats and the uploads playlist. */
  async getMyChannel({ interactive = true } = {}) {
    const data = await this.request("channels", {
      params: { part: "snippet,statistics,contentDetails,brandingSettings", mine: "true" },
      interactive,
    });

    const channel = data && Array.isArray(data.items) ? data.items[0] : null;
    if (!channel) {
      throw new YouTubeApiError("No YouTube channel is attached to this Google account.");
    }

    const snippet = channel.snippet || {};
    const stats = channel.statistics || {};
    const thumbnails = snippet.thumbnails || {};

    return {
      id: channel.id,
      title: snippet.title || "",
      handle: (snippet.customUrl || "").replace(/^@?/, "@"),
      description: snippet.description || "",
      publishedAt: snippet.publishedAt || "",
      country: snippet.country || "",
      thumbnail: (thumbnails.medium || thumbnails.default || {}).url || "",
      uploadsPlaylistId: ((channel.contentDetails || {}).relatedPlaylists || {}).uploads || "",
      subscriberCount: Number(stats.subscriberCount || 0),
      hiddenSubscriberCount: Boolean(stats.hiddenSubscriberCount),
      viewCount: Number(stats.viewCount || 0),
      videoCount: Number(stats.videoCount || 0),
    };
  }

  /** Most recent uploads with per-video statistics. */
  async listRecentVideos(uploadsPlaylistId, { limit = 10 } = {}) {
    if (!uploadsPlaylistId) {
      throw new YouTubeApiError("Load the channel before listing videos.");
    }

    const playlist = await this.request("playlistItems", {
      params: {
        part: "contentDetails",
        playlistId: uploadsPlaylistId,
        maxResults: Math.min(Math.max(limit, 1), 50),
      },
    });

    const videoIds = (playlist.items || [])
      .map((item) => (item.contentDetails || {}).videoId)
      .filter(Boolean);

    if (!videoIds.length) {
      return [];
    }

    return this.getVideos(videoIds);
  }

  async getVideos(videoIds) {
    const ids = Array.isArray(videoIds) ? videoIds : [videoIds];
    if (!ids.length) {
      return [];
    }

    const data = await this.request("videos", {
      params: { part: "snippet,statistics,status", id: ids.join(",") },
    });

    return (data.items || []).map((video) => {
      const snippet = video.snippet || {};
      const stats = video.statistics || {};
      const thumbnails = snippet.thumbnails || {};

      return {
        id: video.id,
        title: snippet.title || "",
        description: snippet.description || "",
        publishedAt: snippet.publishedAt || "",
        channelTitle: snippet.channelTitle || "",
        categoryId: snippet.categoryId || "",
        tags: snippet.tags || [],
        defaultLanguage: snippet.defaultLanguage || "",
        privacyStatus: (video.status || {}).privacyStatus || "",
        thumbnail: (thumbnails.medium || thumbnails.default || {}).url || "",
        url: `https://www.youtube.com/watch?v=${video.id}`,
        viewCount: Number(stats.viewCount || 0),
        likeCount: Number(stats.likeCount || 0),
        commentCount: Number(stats.commentCount || 0),
      };
    });
  }

  /**
   * Update title/description/tags on an owned video. The API replaces the whole
   * snippet, so the current snippet is read first and merged with the changes.
   */
  async updateVideoMetadata(videoId, changes) {
    const data = await this.request("videos", { params: { part: "snippet", id: videoId } });
    const current = data && Array.isArray(data.items) ? data.items[0] : null;

    if (!current) {
      throw new YouTubeApiError("That video was not found on the connected channel.");
    }

    const snippet = current.snippet || {};
    const nextSnippet = {
      title: changes.title !== undefined ? changes.title : snippet.title,
      description: changes.description !== undefined ? changes.description : snippet.description,
      tags: changes.tags !== undefined ? changes.tags : snippet.tags,
      categoryId: snippet.categoryId,
    };

    if (snippet.defaultLanguage) {
      nextSnippet.defaultLanguage = snippet.defaultLanguage;
    }

    if (!nextSnippet.title || !nextSnippet.title.trim()) {
      throw new YouTubeApiError("A video title cannot be empty.");
    }

    if (nextSnippet.title.length > 100) {
      throw new YouTubeApiError("YouTube titles are limited to 100 characters.");
    }

    const updated = await this.request("videos", {
      method: "PUT",
      params: { part: "snippet" },
      body: { id: videoId, snippet: nextSnippet },
    });

    return {
      id: updated.id,
      title: (updated.snippet || {}).title || "",
      description: (updated.snippet || {}).description || "",
      tags: (updated.snippet || {}).tags || [],
    };
  }
}

window.YouTubeApiError = YouTubeApiError;
window.youtubeClient = new YouTubeClient();
