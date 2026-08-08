# YouTube Brief Studio

A packaging-first YouTube brief generator focused on:

- Pre-brief ideation pipeline with 3 phases (brainstorming, title/thumbnail ideation, hypothesis/experiment log)
- Home view with channel cards (multi-channel capable, optimized for one primary owner channel)
- Channel workspace view focused on ideation phases
- Dedicated Briefs page for production-intent brief authoring
- Account-to-channel membership model (owner/editor/viewer) for future multi-user channels
- Briefs are a separate model per channel (manual or phase-3 promoted)
- Fast inline editing and color status tracking (green/yellow/red) across stages
- One-click promotion between ideation phases and explicit "Promote to Brief" from phase 3
- Phase 1 backlog view with date-added records, filtering, sorting, and ultra-fast title capture
- Ideation records use one-line rows with click-to-expand details and arrow navigation between phases
- Live channel data from the YouTube Data API for the authenticated channel
- Static viewer strategy profile for `@ALifeEngineered`
- Deep viewer signals (humor, taste, anti-patterns, unlock expectations)
- Accelerator playbook integration (Idea Funnel, CCN, packaging stages, traffic strategy)
- Treatment + one-line logline clarity (with vibe references)
- Title and thumbnail variation generation
- Scoring for curiosity, clarity, uniqueness, and click intent
- Comparable YouTube URL ingestion (thumbnail + metadata)
- Exportable single-file HTML brief

## Why this app format

This MVP is a web app because it is the fastest path to:

- A desktop-friendly canvas experience
- Fast iteration without app-store overhead
- Easy sharing and future collaboration

## Run locally

The app is served by a small Express server that also owns the SQLite persistence API, so it must be started with Node — a plain static file server or opening `index.html` from disk is not supported (see [Persistence](#persistence)), and the YouTube integration needs an `http://localhost` origin.

### Requirements

- Node.js 20.11+ (`node --version`; the repo pins a major version in `.nvmrc`, so `nvm install && nvm use` selects it)
- npm 10+
- No database to install — SQLite lives in a local file created on first run

### First run

```bash
nvm install && nvm use   # optional, if you use nvm (`nvm use` alone fails when Node 20 isn't installed yet)
npm ci           # installs express + better-sqlite3
npm run doctor   # preflight: Node version, deps, native binding, DB path, port
npm start
```

`npm start` prints exactly where to go:

```
youtube-brief server running on http://localhost:4173
sqlite database: /path/to/youtube-brief/data/youtube-brief.sqlite
```

Open that URL. It is up when `http://localhost:4173/api/health` returns `{"ok":true,"storage":"sqlite",...}` and the home view lists channel cards.

Stop the server with `Ctrl+C`.

### Day-to-day

```bash
npm run dev      # same server, restarts on file changes (node --watch)
npm run doctor   # run this first whenever startup misbehaves
```

Only the server restarts on change; reload the browser for frontend edits. HTML/CSS/JS are served with `Cache-Control: no-store`, so a plain reload is enough — no hard-refresh needed.

### Configuration

All optional, read from the environment at startup:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `4173` | HTTP port |
| `HOST` | `0.0.0.0` | Bind address (`127.0.0.1` to keep it off your LAN) |
| `DB_PATH` | `data/youtube-brief.sqlite` | SQLite file location |

Example: `PORT=4180 DB_PATH=/tmp/scratch.sqlite npm start`.

### Persistence

The frontend prefers the server API and falls back to browser storage when `/api/health` is unreachable. That fallback is why the app *appears* to work behind a static file server such as `python3 -m http.server` — it loads, but every change is written only to the browser, is invisible to the SQLite database, and disappears when browser storage is cleared. Always start it with `npm start` / `npm run dev`.

State lives in `data/youtube-brief.sqlite` (git-ignored). Migrations in `server/migrations/` are applied automatically at startup. To start clean, stop the server and delete the file — it is recreated on the next start.

### Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `Port 4173 is already in use, so the server did not start.` | An earlier server is still running. Stop it (`pkill -f "node server/index.js"`) or use another port: `PORT=4174 npm start`. |
| `Failed to load the SQLite driver.` / `better-sqlite3 native binding failed to load` | Node version changed since `npm ci`, so the native module no longer matches. Run `nvm install && nvm use`, then `npm rebuild better-sqlite3` — or delete `node_modules` and `npm ci` again. |
| `Failed to open the SQLite database at ...` | The `data/` directory is not writable, or `DB_PATH` points somewhere unwritable. Fix permissions or set a different `DB_PATH`. |
| `npm ci` fails compiling `better-sqlite3` | No prebuilt binary matched your platform/Node version, so it fell back to a source build. Install build tools (macOS: `xcode-select --install`; Debian/Ubuntu: `apt install build-essential python3`) or switch to a Node version with prebuilds. |
| App loads but edits vanish on reload, or the page shows local-only persistence | You are on a static file server or `file://`. Stop it and use `npm start`; confirm `/api/health` returns `ok: true`. |
| Server starts but the browser shows a stale UI | Confirm the port in the URL matches the one the server printed — an old tab may point at a previous port. |
| Comparable videos do not attach metadata | Metadata is fetched from YouTube/noembed in the browser, so it needs outbound network access. Everything else works offline. |
| Google sign-in rejects the origin | The YouTube integration requires an `http://localhost` origin, so it only works through the server — not from a `file://` URL. |

## Production

The app runs on Fly.io at https://yt-brief.fly.dev, behind a shared password (interim access
control until Google sign-in lands). A 1GB Fly volume is mounted at `/data` and holds the SQLite
database; because SQLite is a single file on that volume, the app must stay on **one** machine.

### Environment

| Variable | Where it is set | Purpose |
| --- | --- | --- |
| `PORT` | `fly.toml` (8080) | HTTP port |
| `HOST` | `fly.toml` (0.0.0.0) | Bind address |
| `DB_PATH` | `fly.toml` (`/data/youtube-brief.sqlite`) | SQLite file on the mounted volume |
| `NODE_ENV` | `fly.toml` (`production`) | Marks the session cookie `Secure` |
| `APP_PASSWORD` | Fly secret | Shared password for the login gate. When unset, the app serves with no access control. |

### Deploy

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml`, which needs a
`FLY_API_TOKEN` repository secret.

To deploy by hand:

```bash
fly deploy --remote-only --ha=false
```

### Changing the password

```bash
fly secrets set APP_PASSWORD='new-password' -a yt-brief
```

### First-time provisioning

```bash
fly apps create yt-brief --org personal
fly volumes create yt_brief_data --region sjc --size 1
fly secrets set APP_PASSWORD='choose-a-password' -a yt-brief
fly deploy --remote-only --ha=false
```

The YouTube integration is browser-side OAuth, so `https://yt-brief.fly.dev` also has to be listed
under **Authorized JavaScript origins** for the Google OAuth client.

## Connect your YouTube channel

The channel dashboard has a **Live Channel Data** panel that reads from the
channel of the signed-in Google account: subscriber/view/video totals, the 10
most recent uploads with their stats, and in-place editing of a video's title
and description.

One-time setup in [Google Cloud](https://console.cloud.google.com/):

1. Create (or pick) a project.
2. Enable **YouTube Data API v3** under APIs & Services > Library.
3. Configure the OAuth consent screen as **External**, add yourself as a test
   user, and add the scopes `youtube.readonly` and `youtube.force-ssl`.
4. Create credentials > **OAuth client ID** > **Web application**, and add your
   origin (for example `http://localhost:4173`) to **Authorized JavaScript
   origins**.
5. Copy the client ID into the panel's "API setup" section, or into `config.js`.

While the consent screen is in **Testing**, only the listed test users can sign
in (others get `Error 403: access_denied`), and Google shows an "unverified app"
interstitial: choose Advanced > Go to YouTube Brief Studio.

```bash
cp config.example.js config.js
# then set googleClientId in config.js
```

### Secret handling

- No client secret or API key exists in this app. Browser apps use the OAuth
  client ID only, which is a public identifier.
- `config.js` is git-ignored; nothing credential-shaped is committed.
- Access tokens are kept in `sessionStorage` and are revoked with Google on
  **Disconnect**.
- Scopes: `youtube.readonly` for reading, `youtube.force-ssl` for metadata
  updates.

### Quota note

The YouTube Data API has a default quota of 10,000 units/day. Loading the panel
costs a handful of units; refresh sparingly if you also use the quota elsewhere.

## Files

- `index.html`: main brief workflow
- `viewer-strategy.html`: static strategy reference page
- `styles.css`: visual design and responsive layout
- `app.js`: generation logic, scoring, and HTML export
- `youtube-api.js`: YouTube Data API v3 client and Google OAuth token handling
- `channel-panel.js`: UI for the live channel data panel
- `config.example.js`: template for the git-ignored `config.js`
- `server/index.js`: Express server, static hosting, and `/api/storage` endpoints
- `server/db.js`, `server/migrations/`: SQLite document store and schema migrations
- `scripts/doctor.mjs`: local-startup preflight checks (`npm run doctor`)

## Notes

- Data is persisted server-side in SQLite (`data/youtube-brief.sqlite`) when the app is served by `npm start`; browser IndexedDB (`yt-brief-studio-local`) with a localStorage fallback under `yt-brief-studio-v7` is used only when the API is unreachable.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
