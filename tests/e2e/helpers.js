export const DEFAULT_CHANNEL_ID = "channel-alifeengineered";

// Every spec starts from an empty database so runs do not depend on each other.
export async function resetServerState(request) {
  await request.delete("/api/briefs");
  for (const key of ["workspace", "ideas", "viewer"]) {
    await request.delete(`/api/storage/${key}`);
  }
}

// The app restores the last page view from the workspace document, so every entry
// point starts by navigating back to the channel home board.
export async function openApp(page) {
  await page.goto("/");
  await page.locator("#channelHomeBoard .channel-card").first().waitFor({ state: "attached" });
  await page.locator("#showHomePageBtn").click();
  await page.getByRole("heading", { name: "Channels" }).waitFor();
}

export async function openChannel(page) {
  await openApp(page);
  await page.locator('#channelHomeBoard button[data-action="openChannel"]').first().click();
  await page.getByRole("heading", { name: "Live Channel Data" }).waitFor();
}
