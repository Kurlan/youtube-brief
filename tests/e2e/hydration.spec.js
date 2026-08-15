import { expect, test } from "@playwright/test";
import { openChannel, resetServerState } from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

async function openBriefDetail(page, projectName) {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Briefs Workspace" }).click();
  await page.getByRole("heading", { name: "Briefs Workspace" }).waitFor();
  await page.locator("#createBriefBtn").click();
  await expect(page.locator("#projectName")).toBeVisible();
  await page.locator("#projectName").fill(projectName);
  await page.locator("#ideaFocus").click();
}

function trackWrites(page) {
  const writes = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith("/api/") && request.method() !== "GET") {
      writes.push(`${request.method()} ${url.pathname}`);
    }
  });
  return writes;
}

async function readStoredState(request) {
  const briefs = (await (await request.get("/api/briefs")).json()).briefs;
  const documents = {};
  for (const key of ["workspace", "ideas"]) {
    const payload = await (await request.get(`/api/storage/${key}`)).json();
    documents[key] = payload.updatedAt ?? null;
  }
  return {
    briefs: briefs.map((brief) => `${brief.briefId}:${brief.updatedAt}`).sort(),
    documents,
  };
}

test("reloading the app does not write anything the user did not change", async ({ page, request }) => {
  const projectName = "Hydration brief";
  await openBriefDetail(page, projectName);
  await expect
    .poll(async () => JSON.stringify((await (await request.get("/api/briefs")).json()).briefs))
    .toContain(projectName);

  const before = await readStoredState(request);
  const writes = trackWrites(page);

  await page.reload();
  await expect(page.locator("#projectName")).toHaveValue(projectName);
  await page.waitForTimeout(2_000);

  expect(writes).toEqual([]);
  expect(await readStoredState(request)).toEqual(before);
});

test("an edit after hydration still reaches the server", async ({ page, request }) => {
  await openBriefDetail(page, "Editable brief");
  await expect
    .poll(async () => JSON.stringify((await (await request.get("/api/briefs")).json()).briefs))
    .toContain("Editable brief");

  await page.reload();
  await expect(page.locator("#projectName")).toHaveValue("Editable brief");
  const writes = trackWrites(page);

  await page.locator("#projectName").fill("Edited after hydration");
  await page.locator("#ideaFocus").click();

  await expect
    .poll(async () => JSON.stringify((await (await request.get("/api/briefs")).json()).briefs))
    .toContain("Edited after hydration");
  expect(writes.filter((entry) => entry.startsWith("PUT /api/briefs/"))).not.toEqual([]);
});
