import { spawn } from "node:child_process";
import { expect, request as playwrightRequest, test } from "@playwright/test";

const PASSWORD = "e2e-password";
const port = Number(process.env.E2E_PORT || 4273) + 1;
const baseURL = `http://127.0.0.1:${port}`;

let server;

async function waitForHealth() {
  const context = await playwrightRequest.newContext({ baseURL });
  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      try {
        const response = await context.get("/api/health");
        if (response.ok()) {
          return;
        }
      } catch {
        // keep polling while the server boots
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    throw new Error(`Password-gated server never became healthy on ${baseURL}`);
  } finally {
    await context.dispose();
  }
}

test.beforeAll(async () => {
  server = spawn(process.execPath, ["server/index.js"], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: String(port),
      HOST: "127.0.0.1",
      APP_PASSWORD: PASSWORD,
      DATABASE_URL: process.env.E2E_DATABASE_URL || "postgres://postgres:postgres@localhost:5432/youtube_brief_e2e",
    },
  });
  await waitForHealth();
});

test.afterAll(() => {
  server?.kill();
});

test.use({ baseURL });

test("the app redirects to the login page until a password is accepted", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);

  await page.getByPlaceholder("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Incorrect password.")).toBeVisible();

  await page.getByPlaceholder("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Channels" })).toBeVisible();
});

test("the API rejects unauthenticated requests but keeps health public", async ({ playwright }) => {
  const context = await playwright.request.newContext({ baseURL });
  expect((await context.get("/api/health")).status()).toBe(200);
  expect((await context.get("/api/briefs")).status()).toBe(401);
  await context.dispose();
});
