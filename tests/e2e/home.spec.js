import { expect, test } from "@playwright/test";
import { openApp, openChannel, resetServerState } from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

test("home lists the seeded channel card", async ({ page }) => {
  await openApp(page);

  const card = page.locator("#channelHomeBoard .channel-card").first();
  await expect(card).toBeVisible();
  await expect(card.locator('[data-role="channelName"]')).not.toBeEmpty();
});

test("opening a channel shows the dashboard and returns home", async ({ page }) => {
  await openChannel(page);

  await expect(page.getByRole("button", { name: "Open Ideation Phases" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open Briefs Workspace" })).toBeVisible();

  await page.locator("#showHomePageBtn").click();
  await expect(page.locator("#channelHomeBoard .channel-card").first()).toBeVisible();
});
