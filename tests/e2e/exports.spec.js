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

test("a brief export inlines its uploaded images", async ({ page }) => {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Briefs Workspace" }).click();
  await page.getByRole("heading", { name: "Briefs Workspace" }).waitFor();
  await page.locator("#createBriefBtn").click();
  await expect(page.locator("#projectName")).toBeVisible();
  await page.locator("#projectName").fill("Export brief");

  // The packaging export renders the inspiration assets, so the upload has to land there.
  await page.locator("#inspirationFileInput").setInputFiles({
    name: "inspiration.png",
    mimeType: "image/png",
    buffer: PNG_BYTES,
  });
  await expect(page.locator("#saveStatus")).toContainText("Saved");

  const rawHtml = await page.evaluate(() => buildThumbnailBriefExportHtml(getFieldValues()));
  expect(rawHtml).toContain('src="/api/assets/');

  const exportedHtml = await page.evaluate((html) => inlineAssetUrls(html), rawHtml);
  expect(exportedHtml).toContain('src="data:image/png;base64,');
  expect(exportedHtml).not.toContain("/api/assets/");
});

test("an asset that cannot be read falls back to an absolute url", async ({ page }) => {
  await openChannel(page);

  const { exportedHtml, origin } = await page.evaluate(async () => ({
    exportedHtml: await inlineAssetUrls('<img src="/api/assets/missing-asset-id" />'),
    origin: window.location.origin,
  }));
  expect(exportedHtml).toBe(`<img src="${origin}/api/assets/missing-asset-id" />`);
});
