import { expect, test } from "@playwright/test";
import { openChannel, resetServerState } from "./helpers.js";

// 1x1 red PNG.
const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==",
  "base64",
);

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

test("an asset whose bytes are gone renders a labelled placeholder", async ({ page }) => {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Briefs Workspace" }).click();
  await page.getByRole("heading", { name: "Briefs Workspace" }).waitFor();
  await page.locator("#createBriefBtn").click();
  await expect(page.locator("#projectName")).toBeVisible();

  // Stand in for a Postgres restore that is newer than the bucket.
  await page.route("**/api/assets/*", (route) =>
    route.fulfill({ status: 410, contentType: "application/json", body: '{"error":"gone"}' }),
  );

  await page.locator("#inspirationFileInput").setInputFiles({
    name: "inspiration.png",
    mimeType: "image/png",
    buffer: PNG_BYTES,
  });

  const placeholder = page.getByRole("img", { name: "Image missing from storage" }).first();
  await expect(placeholder).toBeVisible();
  await expect(placeholder).toContainText("Image missing from storage");
});
