#!/usr/bin/env node
// Preflight check for local development: verifies everything `npm start` needs
// before the server tries to boot. Run with `npm run doctor`.

import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
const port = Number(process.env.PORT) || 4173;
const dbPath = process.env.DB_PATH || path.join(rootDir, "data", "youtube-brief.sqlite");

const results = [];

function record(ok, label, hint = "") {
  results.push({ ok, label, hint });
}

function parseVersion(value) {
  const [major = 0, minor = 0, patch = 0] = value.split(".").map((part) => Number.parseInt(part, 10) || 0);
  return [major, minor, patch];
}

function compareVersions(a, b) {
  const left = parseVersion(a);
  const right = parseVersion(b);
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] - right[index];
    }
  }
  return 0;
}

function checkNodeVersion() {
  const required = (pkg.engines?.node ?? ">=20.0.0").replace(/^[^\d]*/, "");
  record(
    compareVersions(process.versions.node, required) >= 0,
    `Node ${process.versions.node} (requires >=${required})`,
    `Install Node ${required}+ (see .nvmrc: \`nvm install && nvm use\`).`,
  );
}

function checkDependencies() {
  for (const name of Object.keys(pkg.dependencies ?? {})) {
    try {
      require.resolve(name, { paths: [rootDir] });
      record(true, `dependency ${name} installed`);
    } catch {
      record(false, `dependency ${name} missing`, "Run `npm ci`.");
    }
  }
}

async function checkNativeModule() {
  try {
    const { default: Database } = await import("better-sqlite3");
    const db = new Database(":memory:");
    db.close();
    record(true, "better-sqlite3 native binding loads");
  } catch (error) {
    record(
      false,
      "better-sqlite3 native binding failed to load",
      `Reinstall it with \`npm rebuild better-sqlite3\` (needs a C++ toolchain if no prebuild matches). ${error.message}`,
    );
  }
}

function checkDatabaseWritable() {
  const dir = path.dirname(dbPath);
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.accessSync(dir, fs.constants.W_OK);
    record(true, `database directory writable (${dir})`);
  } catch (error) {
    record(false, `database directory not writable (${dir})`, `Fix permissions or set DB_PATH. ${error.message}`);
  }
}

function checkPort() {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once("error", (error) => {
        record(
          false,
          `port ${port} unavailable (${error.code})`,
          `Stop the process using it, or start with PORT=${port + 1} npm start.`,
        );
        resolve();
      })
      .once("listening", () => {
        tester.close(() => {
          record(true, `port ${port} free`);
          resolve();
        });
      })
      .listen(port, process.env.HOST || "0.0.0.0");
  });
}

checkNodeVersion();
checkDependencies();
await checkNativeModule();
checkDatabaseWritable();
await checkPort();

for (const { ok, label, hint } of results) {
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok && hint) {
    console.log(`     -> ${hint}`);
  }
}

const failures = results.filter((result) => !result.ok).length;
if (failures > 0) {
  console.log(`\n${failures} check(s) failed. See README "Troubleshooting".`);
  process.exit(1);
}
console.log("\nAll checks passed. Run `npm start`.");
