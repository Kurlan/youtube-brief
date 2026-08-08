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

Open `index.html` in your browser.

Or run a local server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

The YouTube integration requires an `http://localhost` origin, so use a local
server rather than opening the file directly.

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

## Notes

- Data is persisted in browser IndexedDB (`yt-brief-studio-local`), with localStorage fallback under `yt-brief-studio-v7`.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
