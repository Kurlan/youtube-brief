import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

import { ROOT_DIR, getConfig, loadEnvFile, missingCredentials } from "./config.mjs";
import { clearStoredTokens, getRefreshToken } from "./token-store.mjs";
import {
  YouTubeApiError,
  buildAuthUrl,
  exchangeCodeForTokens,
  fetchChannel,
  fetchRecentVideos,
  resetAccessTokenCache,
  updateVideoMetadata,
} from "./youtube.mjs";

const STATIC_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

const pendingOauthStates = new Set();

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(payload);
}

function sendHtml(res, status, body) {
  res.writeHead(status, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  res.end(body);
}

function sendError(res, error) {
  const status = error instanceof YouTubeApiError ? error.status || 500 : 500;
  sendJson(res, status, { error: error.message || "Unexpected server error" });
}

async function readJsonBody(req, limitBytes = 1_000_000) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > limitBytes) {
      throw new YouTubeApiError("Request body too large.", 413, null);
    }
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new YouTubeApiError("Request body must be valid JSON.", 400, null);
  }
}

function serveStatic(req, res, pathname) {
  const relative = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = path.resolve(ROOT_DIR, relative);

  if (!filePath.startsWith(`${ROOT_DIR}${path.sep}`) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  res.writeHead(200, { "content-type": STATIC_TYPES[path.extname(filePath)] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

function requireCredentials(config) {
  const missing = missingCredentials(config);
  if (missing.length) {
    throw new YouTubeApiError(
      `Missing Google OAuth credentials: ${missing.join(", ")}. Copy .env.example to .env and fill them in.`,
      503,
      null,
    );
  }
}

async function handleApi(req, res, url, config) {
  const { pathname } = url;

  if (pathname === "/api/youtube/status") {
    sendJson(res, 200, {
      configured: missingCredentials(config).length === 0,
      missingCredentials: missingCredentials(config),
      connected: Boolean(getRefreshToken(config)),
      channelId: config.channelId || null,
      authUrl: "/auth/google",
    });
    return true;
  }

  if (pathname === "/api/youtube/channel" && req.method === "GET") {
    requireCredentials(config);
    sendJson(res, 200, { channel: await fetchChannel(config) });
    return true;
  }

  if (pathname === "/api/youtube/videos" && req.method === "GET") {
    requireCredentials(config);
    const limit = Number(url.searchParams.get("limit") || 10);
    const channel = await fetchChannel(config);
    const videos = await fetchRecentVideos(config, { limit, channel });
    sendJson(res, 200, { channel, videos });
    return true;
  }

  const videoMatch = pathname.match(/^\/api\/youtube\/videos\/([A-Za-z0-9_-]{5,20})$/);
  if (videoMatch && (req.method === "PATCH" || req.method === "PUT")) {
    requireCredentials(config);
    const updates = await readJsonBody(req);
    const video = await updateVideoMetadata(config, videoMatch[1], updates);
    sendJson(res, 200, { video });
    return true;
  }

  if (pathname === "/api/youtube/disconnect" && req.method === "POST") {
    clearStoredTokens(config.tokenFile);
    resetAccessTokenCache();
    sendJson(res, 200, { connected: false });
    return true;
  }

  return false;
}

async function handleAuth(req, res, url, config) {
  if (url.pathname === "/auth/google") {
    requireCredentials(config);
    const state = crypto.randomBytes(16).toString("hex");
    pendingOauthStates.add(state);
    res.writeHead(302, { location: buildAuthUrl(config, state) });
    res.end();
    return true;
  }

  if (url.pathname === "/auth/google/callback") {
    requireCredentials(config);
    const error = url.searchParams.get("error");
    if (error) {
      sendHtml(res, 400, `<h1>Consent denied</h1><p>Google returned: ${error}</p>`);
      return true;
    }

    const state = url.searchParams.get("state") || "";
    if (!pendingOauthStates.delete(state)) {
      sendHtml(res, 400, "<h1>Invalid OAuth state</h1><p>Restart the flow at <a href=\"/auth/google\">/auth/google</a>.</p>");
      return true;
    }

    await exchangeCodeForTokens(config, url.searchParams.get("code") || "");
    resetAccessTokenCache();
    sendHtml(
      res,
      200,
      "<h1>YouTube connected</h1><p>Refresh token stored. <a href=\"/\">Back to YouTube Brief Studio</a>.</p>",
    );
    return true;
  }

  return false;
}

export function createServer(config) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    try {
      if (url.pathname.startsWith("/api/")) {
        if (!(await handleApi(req, res, url, config))) {
          sendJson(res, 404, { error: "Unknown API route" });
        }
        return;
      }

      if (url.pathname.startsWith("/auth/")) {
        if (!(await handleAuth(req, res, url, config))) {
          sendJson(res, 404, { error: "Unknown auth route" });
        }
        return;
      }

      serveStatic(req, res, url.pathname);
    } catch (error) {
      sendError(res, error);
    }
  });
}

function main() {
  loadEnvFile();
  const config = getConfig();
  const missing = missingCredentials(config);

  createServer(config).listen(config.port, () => {
    console.log(`YouTube Brief Studio running on http://localhost:${config.port}`);
    if (missing.length) {
      console.log(`Google OAuth not configured yet (missing ${missing.join(", ")}). See .env.example.`);
    } else if (!getRefreshToken(config)) {
      console.log(`Connect your channel once at http://localhost:${config.port}/auth/google`);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  main();
}
