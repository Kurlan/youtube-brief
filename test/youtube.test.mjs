import assert from "node:assert/strict";
import test from "node:test";

import { getConfig, missingCredentials, parseEnvFile } from "../server/config.mjs";
import { buildAuthUrl, mergeVideoSnippet, normalizeChannel, normalizeVideo } from "../server/youtube.mjs";

test("parseEnvFile ignores comments and strips quotes", () => {
  const values = parseEnvFile(['# comment', 'GOOGLE_CLIENT_ID=abc', 'GOOGLE_CLIENT_SECRET="s3cret"', ''].join("\n"));

  assert.deepEqual(values, { GOOGLE_CLIENT_ID: "abc", GOOGLE_CLIENT_SECRET: "s3cret" });
});

test("missingCredentials reports unset OAuth values", () => {
  const config = getConfig({ GOOGLE_CLIENT_ID: "abc" });

  assert.deepEqual(missingCredentials(config), ["GOOGLE_CLIENT_SECRET"]);
  assert.equal(missingCredentials(getConfig({ GOOGLE_CLIENT_ID: "a", GOOGLE_CLIENT_SECRET: "b" })).length, 0);
});

test("buildAuthUrl requests offline access with the YouTube scopes", () => {
  const config = getConfig({
    GOOGLE_CLIENT_ID: "client-id",
    GOOGLE_CLIENT_SECRET: "client-secret",
    GOOGLE_REDIRECT_URI: "http://localhost:4173/auth/google/callback",
  });

  const url = new URL(buildAuthUrl(config, "state-token"));

  assert.equal(url.origin + url.pathname, "https://accounts.google.com/o/oauth2/v2/auth");
  assert.equal(url.searchParams.get("access_type"), "offline");
  assert.equal(url.searchParams.get("state"), "state-token");
  assert.equal(url.searchParams.get("redirect_uri"), "http://localhost:4173/auth/google/callback");
  assert.match(url.searchParams.get("scope"), /youtube\.readonly/);
  assert.match(url.searchParams.get("scope"), /youtube\.force-ssl/);
});

test("normalizeChannel flattens the API payload", () => {
  const channel = normalizeChannel({
    id: "UC123",
    snippet: {
      title: "A Life Engineered",
      customUrl: "@alifeengineered",
      thumbnails: { high: { url: "https://img/high.jpg" } },
    },
    contentDetails: { relatedPlaylists: { uploads: "UU123" } },
    statistics: { subscriberCount: "500000", viewCount: "42000000", videoCount: "120" },
  });

  assert.equal(channel.uploadsPlaylistId, "UU123");
  assert.equal(channel.thumbnail, "https://img/high.jpg");
  assert.deepEqual(channel.stats, {
    subscribers: 500000,
    views: 42000000,
    videos: 120,
    hiddenSubscriberCount: false,
  });
});

test("normalizeVideo builds a watch url and numeric stats", () => {
  const video = normalizeVideo({
    id: "abc123",
    snippet: { title: "Title", description: "Body", tags: ["career"], categoryId: "28" },
    statistics: { viewCount: "1000", likeCount: "50" },
    status: { privacyStatus: "public" },
  });

  assert.equal(video.url, "https://www.youtube.com/watch?v=abc123");
  assert.deepEqual(video.stats, { views: 1000, likes: 50, comments: 0 });
  assert.equal(video.privacyStatus, "public");
});

test("mergeVideoSnippet keeps untouched fields and trims tags", () => {
  const current = normalizeVideo({
    id: "abc123",
    snippet: { title: "Old", description: "Body", tags: ["a"], categoryId: "28" },
  });

  const snippet = mergeVideoSnippet(current, { title: "  New  ", tags: [" career ", ""] });

  assert.deepEqual(snippet, { title: "New", description: "Body", categoryId: "28", tags: ["career"] });
});

test("mergeVideoSnippet rejects invalid metadata", () => {
  const current = normalizeVideo({ id: "abc123", snippet: { title: "Old", categoryId: "28" } });

  assert.throws(() => mergeVideoSnippet(current, { title: "   " }), /title is required/);
  assert.throws(() => mergeVideoSnippet(current, { title: "x".repeat(101) }), /100 characters/);
  assert.throws(() => mergeVideoSnippet(current, { description: "x".repeat(5001) }), /5000 characters/);
});
