import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.force-ssl",
];

export function parseEnvFile(contents) {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separator = line.indexOf("=");
    if (separator <= 0) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

export function loadEnvFile(envPath = path.join(ROOT_DIR, ".env")) {
  if (!fs.existsSync(envPath)) {
    return;
  }

  const values = parseEnvFile(fs.readFileSync(envPath, "utf8"));
  for (const [key, value] of Object.entries(values)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function getConfig(env = process.env) {
  const tokenFile = env.YOUTUBE_TOKEN_FILE || ".youtube-tokens.json";

  return {
    clientId: env.GOOGLE_CLIENT_ID || "",
    clientSecret: env.GOOGLE_CLIENT_SECRET || "",
    redirectUri: env.GOOGLE_REDIRECT_URI || `http://localhost:${env.PORT || 4173}/auth/google/callback`,
    refreshToken: env.GOOGLE_REFRESH_TOKEN || "",
    channelId: env.YOUTUBE_CHANNEL_ID || "",
    tokenFile: path.isAbsolute(tokenFile) ? tokenFile : path.join(ROOT_DIR, tokenFile),
    port: Number(env.PORT || 4173),
  };
}

export function missingCredentials(config) {
  const missing = [];
  if (!config.clientId) {
    missing.push("GOOGLE_CLIENT_ID");
  }
  if (!config.clientSecret) {
    missing.push("GOOGLE_CLIENT_SECRET");
  }
  return missing;
}
