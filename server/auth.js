import crypto from "node:crypto";
import express from "express";

const COOKIE_NAME = "yt_brief_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function parseCookies(header = "") {
  const cookies = {};
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) {
      continue;
    }
    const name = part.slice(0, index).trim();
    if (!name) {
      continue;
    }
    cookies[name] = decodeURIComponent(part.slice(index + 1).trim());
  }
  return cookies;
}

function safeEquals(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) {
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function sessionToken(password) {
  return crypto.createHash("sha256").update(`yt-brief:${password}`).digest("hex");
}

function loginPage(error) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>YouTube Brief Studio</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0f1115; color: #f5f6f8; font-family: system-ui, sans-serif; }
      form { width: min(320px, 90vw); display: grid; gap: 12px; }
      h1 { font-size: 18px; margin: 0 0 4px; }
      input, button { font: inherit; padding: 10px 12px; border-radius: 8px; border: 1px solid #2b303b; }
      input { background: #171a21; color: inherit; }
      button { background: #4c7dff; color: #fff; border-color: transparent; cursor: pointer; }
      p { margin: 0; color: #ff8e8e; font-size: 14px; }
    </style>
  </head>
  <body>
    <form method="POST" action="/login">
      <h1>YouTube Brief Studio</h1>
      ${error ? `<p>${error}</p>` : ""}
      <input type="password" name="password" placeholder="Password" autocomplete="current-password" autofocus required />
      <button type="submit">Sign in</button>
    </form>
  </body>
</html>`;
}

export function createPasswordGate({ password, secure }) {
  const expectedToken = sessionToken(password);

  function isAuthenticated(req) {
    const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
    return Boolean(token) && safeEquals(token, expectedToken);
  }

  function setSessionCookie(res) {
    const attributes = [
      `${COOKIE_NAME}=${expectedToken}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    ];
    if (secure) {
      attributes.push("Secure");
    }
    res.setHeader("Set-Cookie", attributes.join("; "));
  }

  function register(app) {
    app.get("/login", (req, res) => {
      if (isAuthenticated(req)) {
        res.redirect("/");
        return;
      }
      res.status(200).type("html").send(loginPage(""));
    });

    app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
      if (typeof req.body?.password === "string" && safeEquals(sessionToken(req.body.password), expectedToken)) {
        setSessionCookie(res);
        res.redirect("/");
        return;
      }
      res.status(401).type("html").send(loginPage("Incorrect password."));
    });

    app.post("/logout", (_req, res) => {
      res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
      res.redirect("/login");
    });

    app.use((req, res, next) => {
      if (req.path === "/api/health" || isAuthenticated(req)) {
        next();
        return;
      }
      if (req.path.startsWith("/api/")) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      res.redirect("/login");
    });
  }

  return { register };
}
