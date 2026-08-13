import { expect, test } from "@playwright/test";
import { openChannel, resetServerState } from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

async function openBriefs(page) {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Briefs Workspace" }).click();
  await page.getByRole("heading", { name: "Briefs Workspace" }).waitFor();
}

test("a manual brief is created, edited, and persisted", async ({ page, request }) => {
  const projectName = "E2E packaging brief";

  await openBriefs(page);
  await page.locator("#createBriefBtn").click();

  await expect(page.locator("#projectName")).toBeVisible();
  await page.locator("#projectName").fill(projectName);
  await page.locator("#ideaFocus").click();

  // #saveStatus already reads "Saved <time>" on load, so the stored brief is the
  // only assertion that proves the edit reached the server.
  await expect
    .poll(async () => JSON.stringify((await (await request.get("/api/briefs")).json()).briefs))
    .toContain(projectName);

  await page.locator("#backToBriefListBtn").click();
  await expect(page.locator("#briefListBoard")).toContainText(projectName);

  await openBriefs(page);
  await expect(page.locator("#briefListBoard")).toContainText(projectName);
});

test("briefs workspace is empty after the briefs are cleared", async ({ page, request }) => {
  await openBriefs(page);
  await page.locator("#createBriefBtn").click();
  await expect(page.locator("#projectName")).toBeVisible();
  await page.locator("#projectName").fill("Temporary brief");
  await page.locator("#ideaFocus").click();
  await expect.poll(async () => (await (await request.get("/api/briefs")).json()).briefs.length).toBe(1);

  expect((await request.delete("/api/briefs")).status()).toBe(204);

  await openBriefs(page);
  await expect(page.locator("#briefListBoard")).not.toContainText("Temporary brief");
});
