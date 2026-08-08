import { OAUTH_SCOPES } from "./config.mjs";
import { getRefreshToken, writeStoredTokens } from "./token-store.mjs";

const OAUTH_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_BASE = "https://www.googleapis.com/youtube/v3";
const ACCESS_TOKEN_SAFETY_WINDOW_MS = 60_000;

export class YouTubeApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "YouTubeApiError";
    this.status = status;
    this.details = details;
  }
}

export function buildAuthUrl(config, state) {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: OAUTH_SCOPES.join(" "),
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
    state,
  });

  return `${OAUTH_AUTH_URL}?${params.toString()}`;
}

async function postToken(body) {
  const response = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new YouTubeApiError(
      payload.error_description || payload.error || "Google token request failed",
      response.status,
      payload,
    );
  }

  return payload;
}

export async function exchangeCodeForTokens(config, code) {
  const tokens = await postToken({
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    grant_type: "authorization_code",
  });

  if (!tokens.refresh_token) {
    throw new YouTubeApiError(
      "Google did not return a refresh token. Revoke the app at myaccount.google.com/permissions and retry consent.",
      400,
      null,
    );
  }

  writeStoredTokens(config.tokenFile, {
    refresh_token: tokens.refresh_token,
    scope: tokens.scope,
    obtained_at: new Date().toISOString(),
  });

  return tokens;
}

const accessTokenCache = new Map();

export async function getAccessToken(config) {
  const refreshToken = getRefreshToken(config);
  if (!refreshToken) {
    throw new YouTubeApiError("Not connected to YouTube. Visit /auth/google to grant access.", 401, null);
  }

  const cached = accessTokenCache.get(refreshToken);
  if (cached && cached.expiresAt - ACCESS_TOKEN_SAFETY_WINDOW_MS > Date.now()) {
    return cached.accessToken;
  }

  const tokens = await postToken({
    refresh_token: refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
  });

  const accessToken = tokens.access_token;
  accessTokenCache.set(refreshToken, {
    accessToken,
    expiresAt: Date.now() + Number(tokens.expires_in || 3600) * 1000,
  });

  return accessToken;
}

export function resetAccessTokenCache() {
  accessTokenCache.clear();
}

async function apiRequest(config, resourcePath, { method = "GET", query = {}, body } = {}) {
  const accessToken = await getAccessToken(config);
  const url = new URL(`${API_BASE}/${resourcePath}`);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      authorization: `Bearer ${accessToken}`,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new YouTubeApiError(
      payload.error?.message || `YouTube API request failed (${response.status})`,
      response.status,
      payload.error || null,
    );
  }

  return payload;
}

function pickThumbnail(thumbnails = {}) {
  return (
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url ||
    ""
  );
}

export function normalizeChannel(item) {
  return {
    id: item.id,
    title: item.snippet?.title || "",
    handle: item.snippet?.customUrl || "",
    description: item.snippet?.description || "",
    thumbnail: pickThumbnail(item.snippet?.thumbnails),
    publishedAt: item.snippet?.publishedAt || "",
    uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads || "",
    stats: {
      subscribers: Number(item.statistics?.subscriberCount || 0),
      views: Number(item.statistics?.viewCount || 0),
      videos: Number(item.statistics?.videoCount || 0),
      hiddenSubscriberCount: Boolean(item.statistics?.hiddenSubscriberCount),
    },
  };
}

export function normalizeVideo(item) {
  return {
    id: item.id,
    title: item.snippet?.title || "",
    description: item.snippet?.description || "",
    tags: item.snippet?.tags || [],
    categoryId: item.snippet?.categoryId || "",
    publishedAt: item.snippet?.publishedAt || "",
    thumbnail: pickThumbnail(item.snippet?.thumbnails),
    url: `https://www.youtube.com/watch?v=${item.id}`,
    duration: item.contentDetails?.duration || "",
    privacyStatus: item.status?.privacyStatus || "",
    stats: {
      views: Number(item.statistics?.viewCount || 0),
      likes: Number(item.statistics?.likeCount || 0),
      comments: Number(item.statistics?.commentCount || 0),
    },
  };
}

export async function fetchChannel(config) {
  const query = config.channelId ? { id: config.channelId } : { mine: "true" };
  const payload = await apiRequest(config, "channels", {
    query: { part: "snippet,contentDetails,statistics", ...query },
  });

  const item = payload.items?.[0];
  if (!item) {
    throw new YouTubeApiError("No YouTube channel found for these credentials.", 404, null);
  }

  return normalizeChannel(item);
}

export async function fetchVideosByIds(config, ids) {
  if (!ids.length) {
    return [];
  }

  const payload = await apiRequest(config, "videos", {
    query: { part: "snippet,contentDetails,statistics,status", id: ids.join(",") },
  });

  return (payload.items || []).map(normalizeVideo);
}

export async function fetchRecentVideos(config, { limit = 10, channel } = {}) {
  const resolvedChannel = channel || (await fetchChannel(config));
  if (!resolvedChannel.uploadsPlaylistId) {
    return [];
  }

  const playlist = await apiRequest(config, "playlistItems", {
    query: {
      part: "contentDetails",
      playlistId: resolvedChannel.uploadsPlaylistId,
      maxResults: Math.min(Math.max(limit, 1), 50),
    },
  });

  const ids = (playlist.items || [])
    .map((item) => item.contentDetails?.videoId)
    .filter(Boolean);

  const videos = await fetchVideosByIds(config, ids);
  const order = new Map(ids.map((id, index) => [id, index]));

  return videos.sort((a, b) => order.get(a.id) - order.get(b.id));
}

export function mergeVideoSnippet(current, updates) {
  const snippet = {
    title: current.title,
    description: current.description,
    categoryId: current.categoryId,
    tags: current.tags,
  };

  if (typeof updates.title === "string") {
    snippet.title = updates.title.trim();
  }
  if (typeof updates.description === "string") {
    snippet.description = updates.description;
  }
  if (Array.isArray(updates.tags)) {
    snippet.tags = updates.tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof updates.categoryId === "string" && updates.categoryId) {
    snippet.categoryId = updates.categoryId;
  }

  if (!snippet.title) {
    throw new YouTubeApiError("A video title is required.", 400, null);
  }
  if (snippet.title.length > 100) {
    throw new YouTubeApiError("YouTube titles are limited to 100 characters.", 400, null);
  }
  if ((snippet.description || "").length > 5000) {
    throw new YouTubeApiError("YouTube descriptions are limited to 5000 characters.", 400, null);
  }

  return snippet;
}

export async function updateVideoMetadata(config, videoId, updates) {
  const [current] = await fetchVideosByIds(config, [videoId]);
  if (!current) {
    throw new YouTubeApiError(`Video ${videoId} was not found on this account.`, 404, null);
  }

  const snippet = mergeVideoSnippet(current, updates);
  await apiRequest(config, "videos", {
    method: "PUT",
    query: { part: "snippet" },
    body: { id: videoId, snippet },
  });

  const [updated] = await fetchVideosByIds(config, [videoId]);
  return updated || { ...current, ...snippet };
}
