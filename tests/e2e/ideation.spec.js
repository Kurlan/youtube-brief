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

test("quick capture adds a phase 1 idea that survives a reload", async ({ page }) => {
  const title = "E2E quick capture idea";

  await openIdeation(page);
  await page.locator("#step1FastIdea").fill(title);
  await page.locator("#addStep1FastBtn").click();

  const row = page.locator("#step1Board").getByText(title, { exact: false }).first();
  await expect(row).toBeVisible();
  await expect(page.locator("#step1Count")).toContainText("Active 1");
  await expect(page.locator("#saveStatus")).toContainText("Saved");

  await openIdeation(page);
  await expect(page.locator("#step1Board").getByText(title, { exact: false }).first()).toBeVisible();
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
