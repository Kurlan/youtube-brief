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

The app needs its own server and a PostgreSQL database; a static file server is
not enough (without `/api` the frontend silently falls back to browser-only
storage).

```bash
docker compose up -d db          # PostgreSQL on localhost:5432
cp .env.example .env             # then: set -a && source .env
npm install
npm start                        # http://localhost:4173
```

Migrations run automatically at boot; `npm run db:migrate` applies them without
starting the server. `npm run dev` restarts on file changes.

The YouTube integration requires an `http://localhost` origin, so use the server
rather than opening `index.html` directly.

## Persistence

| Env var | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string (required) |
| `BUCKET_NAME`, `AWS_REGION`, `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | S3-compatible bucket for images; set by `fly storage create` |
| `REVISION_LIMIT` | Revisions kept per document/brief (default 50) |
| `BODY_LIMIT` | Request body limit (default 25mb) |
| `PORT`, `HOST` | Listen address (default 4173, 0.0.0.0) |

Data model: `workspace`, `ideas`, and `viewer` are single `jsonb` documents;
each brief is its own row in `briefs`, so a save writes one brief instead of the
whole collection. Image bytes never enter the database — uploads are downscaled
in the browser, stored in the bucket keyed by content hash, and briefs keep only
a `/api/assets/<id>` reference. Revisions are hash-deduplicated and pruned to
`REVISION_LIMIT` per record.

Without `BUCKET_NAME` the server writes objects under `data/assets/`, which is
what local development uses.

## Backup and recovery

Rows and image bytes live in two systems, so both are part of a restore:

- **PostgreSQL** (Fly Managed Postgres in production): automatic backups and
  point-in-time restore via `fly mpg restore`.
- **Object storage** (Tigris): enable bucket versioning; objects are not covered
  by database backups.

A restore of only one side leaves briefs pointing at objects that do not exist;
`GET /api/assets/:id` answers `410` in that case rather than hanging the page.
Run a restore drill covering both sides before trusting the setup.

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
- `server/`: Express API, PostgreSQL store, object storage, SQL migrations
- `scripts/`: `db:migrate` and the one-off `repair:intro-shapes` pass

## Notes

- Data is persisted in PostgreSQL through the server. When `/api` is unreachable the app degrades to browser IndexedDB (`yt-brief-studio-local`), with a localStorage fallback under `yt-brief-studio-v7`, and images stay inline until a server is available again.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
