import fs from "node:fs";
import path from "node:path";

export function readStoredTokens(tokenFile) {
  try {
    return JSON.parse(fs.readFileSync(tokenFile, "utf8"));
  } catch {
    return null;
  }
}

export function writeStoredTokens(tokenFile, tokens) {
  fs.mkdirSync(path.dirname(tokenFile), { recursive: true });
  fs.writeFileSync(tokenFile, `${JSON.stringify(tokens, null, 2)}\n`, { mode: 0o600 });
}

export function clearStoredTokens(tokenFile) {
  try {
    fs.rmSync(tokenFile);
  } catch {
    // Nothing stored yet.
  }
}

export function getRefreshToken(config) {
  if (config.refreshToken) {
    return config.refreshToken;
  }

  return readStoredTokens(config.tokenFile)?.refresh_token || "";
}
