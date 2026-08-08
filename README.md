# YouTube Brief Studio

A packaging-first YouTube brief generator focused on:

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

The YouTube integration requires an `http://localhost` origin, so use the local
server rather than opening the file directly.

## Connect your YouTube channel

Section 2 of the app reads live data from the channel of the signed-in Google
account: subscriber/view/video totals, the 10 most recent uploads with their
stats, and in-place editing of a video's title and description.

One-time setup in [Google Cloud](https://console.cloud.google.com/):

1. Create (or pick) a project.
2. Enable **YouTube Data API v3** under APIs & Services > Library.
3. Configure the OAuth consent screen as **External**, add yourself as a test
   user, and add the scopes `youtube.readonly` and `youtube.force-ssl`.
4. Create credentials > **OAuth client ID** > **Web application**, and add your
   origin (for example `http://localhost:4173`) to **Authorized JavaScript
   origins**.
5. Copy the client ID into the app's "API setup" section, or into `config.js`.

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
- `channel-panel.js`: UI for the connected channel section
- `config.example.js`: template for the git-ignored `config.js`

## Notes

- Data is saved in browser localStorage under `yt-brief-studio-v3`.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
