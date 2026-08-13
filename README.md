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

The app is served by a small Express server that also owns the persistence API, so it must be started with Node — a plain static file server or opening `index.html` from disk is not supported (see [Persistence](#persistence)), and the YouTube integration needs an `http://localhost` origin.

### Requirements

- Node.js 20.11+ (`node --version`; the repo pins a major version in `.nvmrc`, so `nvm install && nvm use` selects it)
- npm 10+
- Docker, for the local PostgreSQL container in `docker-compose.yml`

### First run

```bash
nvm install && nvm use   # optional, if you use nvm (`nvm use` alone fails when Node 20 isn't installed yet)
npm ci
docker compose up -d db  # PostgreSQL on localhost:5432
cp .env.example .env     # then: set -a && source .env && set +a
npm run doctor           # preflight: Node version, deps, database, port
npm start
```

`npm start` prints exactly where to go:

```
youtube-brief server running on http://localhost:4173
postgres: localhost:5432
object storage: file:///path/to/youtube-brief/data/assets
```

Open that URL. It is up when `http://localhost:4173/api/health` returns `{"ok":true,"storage":"postgres",...}` and the home view lists channel cards.

Stop the server with `Ctrl+C`.

### Day-to-day

```bash
npm run dev                  # same server, restarts on file changes (node --watch)
npm run doctor               # run this first whenever startup misbehaves
npm run db:migrate           # apply server/migrations without starting the server
npm run repair:intro-shapes  # one-off: re-sync script.introGroup and legacy script.intros
npm run db:import-legacy     # one-off: import a pre-PostgreSQL SQLite deployment (see below)
```

Only the server restarts on change; reload the browser for frontend edits. HTML/CSS/JS are served with `Cache-Control: no-store`, so a plain reload is enough — no hard-refresh needed.

### Configuration

Read from the environment at startup; `DATABASE_URL` is required, the rest are optional:

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | — | PostgreSQL connection string |
| `PORT` | `4173` | HTTP port |
| `HOST` | `0.0.0.0` | Bind address (`127.0.0.1` to keep it off your LAN) |
| `BUCKET_NAME`, `AWS_REGION`, `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | unset | S3-compatible bucket for images; unset stores them under `data/assets/` |
| `REVISION_LIMIT` | `50` | Revisions kept per document and per brief |
| `BODY_LIMIT` | `25mb` | Request body limit |
| `APP_PASSWORD` | unset | Shared password gate; unset serves with no access control |

Example: `PORT=4180 npm start`.

### Persistence

The frontend prefers the server API and falls back to browser storage when `/api/health` is unreachable. That fallback is why the app *appears* to work behind a static file server such as `python3 -m http.server` — it loads, but every change is written only to the browser, is invisible to the database, and disappears when browser storage is cleared. Always start it with `npm start` / `npm run dev`.

State lives in PostgreSQL. Migrations in `server/migrations/` are applied automatically at startup, guarded by an advisory lock so several machines can boot at once. To start clean: `docker compose down -v && docker compose up -d db`.

Data model: `workspace`, `ideas`, and `viewer` are single `jsonb` documents; each brief is its own row in `briefs`, so a save writes one brief instead of the whole collection. Image bytes never enter the database — uploads are downscaled in the browser, stored keyed by content hash, and briefs keep only a `/api/assets/<id>` reference. Revisions are hash-deduplicated and pruned to `REVISION_LIMIT` per record.

### Backup and recovery

Rows and image bytes live in two systems, so both are part of a restore:

- **PostgreSQL** (Fly Managed Postgres in production): automatic backups and point-in-time restore via `fly mpg restore`.
- **Object storage** (Tigris): enable bucket versioning; objects are not covered by database backups.

A restore of only one side leaves briefs pointing at objects that do not exist; `GET /api/assets/:id` answers `410` in that case rather than hanging the page. Run a restore drill covering both sides before trusting the setup.

### Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `Port 4173 is already in use, so the server did not start.` | An earlier server is still running. Stop it (`pkill -f "node server/index.js"`) or use another port: `PORT=4174 npm start`. |
| `Failed to connect to PostgreSQL.` | The database is not running or `DATABASE_URL` is wrong. Start it with `docker compose up -d db` and re-source `.env`. |
| Images show as broken icons | The object referenced by the brief is missing (`/api/assets/:id` answers `410`), which happens when the database was restored without the bucket. |
| App loads but edits vanish on reload, or the page shows local-only persistence | You are on a static file server or `file://`. Stop it and use `npm start`; confirm `/api/health` returns `ok: true`. |
| Server starts but the browser shows a stale UI | Confirm the port in the URL matches the one the server printed — an old tab may point at a previous port. |
| Comparable videos do not attach metadata | Metadata is fetched from YouTube/noembed in the browser, so it needs outbound network access. Everything else works offline. |
| Google sign-in rejects the origin | The YouTube integration requires an `http://localhost` origin, so it only works through the server — not from a `file://` URL. |

## Production

The app runs on Fly.io at https://yt-brief.fly.dev, behind a shared password (interim access
control until Google sign-in lands). Data lives in Fly Managed Postgres, and brief images live in a
Tigris bucket, so the app is not pinned to a single machine.

### Environment

| Variable | Where it is set | Purpose |
| --- | --- | --- |
| `PORT` | `fly.toml` (8080) | HTTP port |
| `HOST` | `fly.toml` (0.0.0.0) | Bind address |
| `NODE_ENV` | `fly.toml` (`production`) | Marks the session cookie `Secure` |
| `DATABASE_URL` | Fly secret | Managed Postgres connection string |
| `BUCKET_NAME` | Fly secret | Tigris bucket for brief images |
| `AWS_REGION`, `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Fly secrets (set by `fly storage create`) | Bucket credentials |
| `APP_PASSWORD` | Fly secret | Shared password for the login gate. When unset, the app serves with no access control. |

### Deploy

Pushing to `main` deploys automatically via `.github/workflows/deploy.yml`, which needs a
`FLY_API_TOKEN` repository secret.

To deploy by hand:

```bash
fly deploy --remote-only
```

### Changing the password

```bash
fly secrets set APP_PASSWORD='new-password' -a yt-brief
```

### First-time provisioning

```bash
fly apps create yt-brief --org personal
fly mpg create --name yt-brief-db --region sjc --plan Basic
fly mpg attach <cluster-id> -a yt-brief          # sets the DATABASE_URL secret
fly storage create -n yt-brief-assets -a yt-brief  # Tigris bucket; sets BUCKET_NAME + keys
fly secrets set APP_PASSWORD='choose-a-password' -a yt-brief
fly deploy --remote-only
```

Tigris provisioning requires a payment method on the Fly organization; it fails on trial
organizations with `This functionality is disabled for trial organizations`.

### Importing a legacy SQLite deployment

Earlier versions stored everything in a single SQLite file whose `document_revisions` table kept a
full copy of the entire briefs blob on every save — those files reach tens of gigabytes. The importer
takes the latest state only and drops that history.

```bash
# on the old machine, after one clean boot of the app
sqlite3 data/youtube-brief.sqlite ".dump documents" > documents.sql

# against the target database (locally, or a proxied production connection)
DATABASE_URL=... npm run db:import-legacy -- --dump documents.sql --dry-run
DATABASE_URL=... npm run db:import-legacy -- --dump documents.sql
```

It can also read a SQLite file directly with `--sqlite data/youtube-brief.sqlite`. Inline `data:`
images are uploaded to object storage (deduped by SHA-256) and replaced with `/api/assets/<id>`
references, so the same command works for both a local filesystem and a Tigris target. It refuses to
run when the target already holds briefs unless `--force` is passed, and `--user <id>` selects the
owning user. Keep the original SQLite file until the import is verified in the app.

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
- `server/index.js`: Express server, static hosting, `/api/storage`, `/api/briefs`, and `/api/assets` endpoints
- `server/db.js`, `server/migrations/`: PostgreSQL store and schema migrations
- `server/object-storage.js`: S3-compatible image storage with a local filesystem fallback
- `scripts/doctor.mjs`: local-startup preflight checks (`npm run doctor`)
- `scripts/migrate.mjs`, `scripts/repair-intro-shapes.mjs`, `scripts/import-legacy-data.mjs`: migrations, the one-off intro-shape pass, and the legacy SQLite importer

## Notes

- Data is persisted server-side in PostgreSQL when the app is served by `npm start`; browser IndexedDB (`yt-brief-studio-local`) with a localStorage fallback under `yt-brief-studio-v7` is used only when the API is unreachable, and images stay inline until a server is available again.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
