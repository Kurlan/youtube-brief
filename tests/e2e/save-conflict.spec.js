import { expect, test } from "@playwright/test";
import { DEFAULT_CHANNEL_ID, openChannel, resetServerState } from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

async function openBriefs(page) {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Briefs Workspace" }).click();
  await page.getByRole("heading", { name: "Briefs Workspace" }).waitFor();
}

// Simulates a second client: renames the brief straight through the API, which moves the stored
// timestamp past the one the browser cached when it last saved.
async function renameBriefFromAnotherClient(request, briefId, projectName) {
  const current = await (await request.get(`/api/briefs/${briefId}`)).json();
  const value = { ...current.value, values: { ...current.value.values, projectName } };
  const response = await request.put(`/api/briefs/${briefId}`, {
    data: { value, channelId: DEFAULT_CHANNEL_ID },
  });
  expect(response.status()).toBe(200);
}

async function storedProjectName(request, briefId) {
  const stored = await (await request.get(`/api/briefs/${briefId}`)).json();
  return stored.value.values.projectName;
}

async function createBrief(page, projectName) {
  await openBriefs(page);
  await page.locator("#createBriefBtn").click();
  await expect(page.locator("#projectName")).toBeVisible();
  await page.locator("#projectName").fill(projectName);
  await page.locator("#ideaFocus").click();
  await expect(page.locator("#saveStatus")).toContainText("Saved");
  const { briefs } = await (await page.request.get("/api/briefs")).json();
  expect(briefs).toHaveLength(1);
  return briefs[0].briefId;
}

test("a concurrent write stops the save and offers a recovery choice", async ({ page, request }) => {
  const briefId = await createBrief(page, "Mine");

  await renameBriefFromAnotherClient(request, briefId, "Theirs");

  await page.locator("#projectName").fill("Mine edited");
  await page.locator("#ideaFocus").click();

  await expect(page.locator("#saveConflictBanner")).toBeVisible();
  await expect(page.locator("#saveStatus")).toContainText("Not saved");

  // The other client's version is untouched: nothing was overwritten behind their back.
  expect(await storedProjectName(request, briefId)).toBe("Theirs");

  // The edit is still on screen, so no work was lost either.
  await expect(page.locator("#projectName")).toHaveValue("Mine edited");
});

test("keeping local edits writes them over the other version", async ({ page, request }) => {
  const briefId = await createBrief(page, "Mine");
  await renameBriefFromAnotherClient(request, briefId, "Theirs");

  await page.locator("#projectName").fill("Mine wins");
  await page.locator("#ideaFocus").click();
  await expect(page.locator("#saveConflictBanner")).toBeVisible();

  await page.locator("#keepLocalEditsBtn").click();

  await expect(page.locator("#saveStatus")).toContainText("Saved");
  await expect(page.locator("#saveConflictBanner")).toBeHidden();

  expect(await storedProjectName(request, briefId)).toBe("Mine wins");
});

test("discarding local edits reloads the other version", async ({ page, request }) => {
  const briefId = await createBrief(page, "Mine");
  await renameBriefFromAnotherClient(request, briefId, "Theirs");

  await page.locator("#projectName").fill("Mine discarded");
  await page.locator("#ideaFocus").click();
  await expect(page.locator("#saveConflictBanner")).toBeVisible();

  await page.locator("#discardLocalEditsBtn").click();

  await openBriefs(page);
  await expect(page.locator("#briefListBoard")).toContainText("Theirs");
  await expect(page.locator("#briefListBoard")).not.toContainText("Mine discarded");

  expect(await storedProjectName(request, briefId)).toBe("Theirs");
});
