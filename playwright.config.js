import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT) || 4273;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node tests/e2e/prepare-database.mjs && node server/index.js",
    url: `${baseURL}/api/health`,
    reuseExistingServer: false,
    timeout: 60_000,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      PORT: String(port),
      HOST: "127.0.0.1",
      DATABASE_URL: process.env.E2E_DATABASE_URL || "postgres://postgres:postgres@localhost:5432/youtube_brief_e2e",
    },
  },
});
