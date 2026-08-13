import { expect, test } from "@playwright/test";
import { openChannel, resetServerState } from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

async function openIdeation(page) {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Ideation Phases" }).click();
  await page.getByRole("heading", { name: "Phase 1. Brainstorming" }).waitFor();
}

test("quick capture persists a phase 1 idea on the server", async ({ browser, page, request }) => {
  const title = "E2E quick capture idea";

  await openIdeation(page);
  await page.locator("#step1FastIdea").fill(title);
  await page.locator("#addStep1FastBtn").click();

  await expect(page.locator("#step1Board").getByText(title, { exact: false }).first()).toBeVisible();
  await expect(page.locator("#step1Count")).toContainText("Active 1");

  // Snapshot writes are debounced, and a reload in this context would re-render from
  // the browser-side cache, so assert the stored document and then a cold context.
  await expect
    .poll(async () => JSON.stringify((await (await request.get("/api/storage/ideas")).json()).value))
    .toContain(title);

  const coldContext = await browser.newContext();
  const coldPage = await coldContext.newPage();
  await openIdeation(coldPage);
  await expect(coldPage.locator("#step1Board").getByText(title, { exact: false }).first()).toBeVisible();
  await coldContext.close();
});

test("phase 1 search filters the backlog", async ({ page }) => {
  await openIdeation(page);
  for (const title of ["Keep this idea", "Hide that idea"]) {
    await page.locator("#step1FastIdea").fill(title);
    await page.locator("#addStep1FastBtn").click();
  }
  await expect(page.locator("#step1ResultCount")).toContainText("Showing 2 of 2");

  await page.locator("#step1Search").fill("Keep this");
  await expect(page.locator("#step1ResultCount")).toContainText("Showing 1 of 2");
  await expect(page.locator("#step1Board").getByText("Hide that idea")).toHaveCount(0);
});
