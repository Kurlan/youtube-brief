import { expect, test } from "@playwright/test";
import { DEFAULT_CHANNEL_ID, resetServerState } from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

test("health reports postgres storage", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ ok: true, storage: "postgres" });
});

test("briefs round-trip through the API", async ({ request }) => {
  const briefId = "brief-e2e-api";
  const value = { id: briefId, channelId: DEFAULT_CHANNEL_ID, projectName: "API brief" };

  const saved = await request.put(`/api/briefs/${briefId}`, { data: { value } });
  expect(saved.status()).toBe(200);
  expect(await saved.json()).toMatchObject({ ok: true, changed: true });

  const loaded = await request.get(`/api/briefs/${briefId}`);
  expect(loaded.status()).toBe(200);
  expect((await loaded.json()).value).toMatchObject({ projectName: "API brief" });

  const list = await request.get("/api/briefs");
  expect((await list.json()).briefs.map((brief) => brief.briefId)).toContain(briefId);

  expect((await request.delete(`/api/briefs/${briefId}`)).status()).toBe(204);
  expect((await request.get(`/api/briefs/${briefId}`)).status()).toBe(404);
});

test("documents round-trip through the storage API", async ({ request }) => {
  const saved = await request.put("/api/storage/workspace", { data: { value: { projectName: "Doc" } } });
  expect(saved.status()).toBe(200);

  const loaded = await request.get("/api/storage/workspace");
  expect((await loaded.json()).value).toMatchObject({ projectName: "Doc" });
});

test("unknown routes and keys are rejected", async ({ request }) => {
  expect((await request.get("/api/storage/nope")).status()).toBe(404);
  expect((await request.get("/api/nope")).status()).toBe(404);
  expect((await request.put("/api/storage/workspace", { data: {} })).status()).toBe(400);
});
