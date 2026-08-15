import { expect, test } from "@playwright/test";
import { DEFAULT_CHANNEL_ID, openChannel, resetServerState } from "./helpers.js";

const BRIEF_ID = "brief-load-write-check";

test.beforeEach(async ({ request }) => {
  await resetServerState(request);
});

async function openBriefs(page) {
  await openChannel(page);
  await page.getByRole("button", { name: "Open Briefs Workspace" }).click();
  await page.getByRole("heading", { name: "Briefs Workspace" }).waitFor();
}

/** A brief stored without every field the app normalizes into place, as migrated rows are. */
async function storeSparseBrief(request, projectName) {
  const response = await request.put(`/api/briefs/${BRIEF_ID}`, {
    data: {
      channelId: DEFAULT_CHANNEL_ID,
      value: {
        id: BRIEF_ID,
        channelId: DEFAULT_CHANNEL_ID,
        values: { projectName },
      },
    },
  });
  expect(response.status()).toBe(200);
}

async function storedBrief(request) {
  return (await request.get(`/api/briefs/${BRIEF_ID}`)).json();
}

test("loading the app does not rewrite a stored brief", async ({ page, request }) => {
  await storeSparseBrief(request, "Load write brief");
  const before = await storedBrief(request);

  const briefWrites = [];
  page.on("request", (pageRequest) => {
    if (pageRequest.method() === "PUT" && pageRequest.url().includes("/api/briefs/")) {
      briefWrites.push(pageRequest.url());
    }
  });

  await openBriefs(page);
  await expect(page.locator("#briefListBoard")).toContainText("Load write brief");
  await page.waitForTimeout(1500);

  expect(briefWrites).toEqual([]);
  expect((await storedBrief(request)).updatedAt).toBe(before.updatedAt);
});

test("an edit made after a load is still written", async ({ page, request }) => {
  await storeSparseBrief(request, "Load write brief");
  const before = await storedBrief(request);

  await openBriefs(page);
  await page.getByRole("button", { name: /Load write brief/ }).click();
  await page.locator('#briefListBoard button[data-action="openBrief"]').first().click();
  await expect(page.locator("#projectName")).toHaveValue("Load write brief");
  await page.locator("#projectName").fill("Edited after load");
  await page.locator("#ideaFocus").click();
  await expect(page.locator("#saveStatus")).toContainText("Saved");

  const after = await storedBrief(request);
  expect(after.value.values.projectName).toBe("Edited after load");
  expect(after.updatedAt).not.toBe(before.updatedAt);
});
