# YouTube Brief Studio

A packaging-first YouTube brief generator focused on:

- Static viewer strategy profile for `@ALifeEngineered`
- Deep viewer signals (humor, taste, anti-patterns, unlock expectations)
- Accelerator playbook integration (Idea Funnel, CCN, packaging stages, traffic strategy)
- Treatment + one-line logline clarity (with vibe references)
- Title and thumbnail variation generation
- Scoring for curiosity, clarity, uniqueness, and click intent
- Comparable YouTube URL ingestion (thumbnail + metadata)
- Live channel data from the YouTube Data API (stats, recent uploads, metadata updates)
- Exportable single-file HTML brief

## Why this app format

This MVP is a web app because it is the fastest path to:

- A desktop-friendly canvas experience
- Fast iteration without app-store overhead
- Easy sharing and future collaboration

## Run locally

```bash
npm start
```

Then open `http://localhost:4173`. Node 18+ is required; there are no npm dependencies.

Everything except the Live Channel Signals panel also works by opening `index.html` directly.

## YouTube Data API setup

The Live Channel Signals panel reads the authenticated channel and can push title,
description, and tag updates back to YouTube. One-time setup:

1. In the [Google Cloud Console](https://console.cloud.google.com/), create (or pick) a project.
2. Enable the **YouTube Data API v3** under APIs & Services > Library.
3. Configure the OAuth consent screen (External, testing mode is fine) and add the Google
   account that owns the channel as a test user. Requested scopes:
   - `https://www.googleapis.com/auth/youtube.readonly`
   - `https://www.googleapis.com/auth/youtube.force-ssl` (needed to update metadata)
4. Create an OAuth client ID of type **Web application** with the authorized redirect URI
   `http://localhost:4173/auth/google/callback`.
5. Copy `.env.example` to `.env` and fill in `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
6. Run `npm start`, open the app, and click **Connect YouTube** once. The refresh token is
   written to `.youtube-tokens.json` (gitignored, mode 600) and reused on later runs.

Secrets are only read from the environment or `.env`; nothing is hard-coded and no token is
ever sent to the browser. In a deployed environment set `GOOGLE_REFRESH_TOKEN` directly
instead of shipping the token file.

### API routes

| Route | Purpose |
| --- | --- |
| `GET /api/youtube/status` | Whether credentials are configured and the channel is connected |
| `GET /api/youtube/channel` | Channel snippet + subscriber/view/video counts |
| `GET /api/youtube/videos?limit=10` | Recent uploads with per-video stats |
| `PATCH /api/youtube/videos/:id` | Update `title`, `description`, `tags`, `categoryId` |
| `POST /api/youtube/disconnect` | Delete the stored refresh token |
| `GET /auth/google` | Start the one-time OAuth consent flow |

## Tests

```bash
npm test
```

## Files

- `index.html`: main brief workflow
- `viewer-strategy.html`: static strategy reference page
- `styles.css`: visual design and responsive layout
- `app.js`: generation logic, scoring, and HTML export
- `server/`: static file server, Google OAuth flow, and YouTube Data API client
- `test/`: node:test unit tests for the API layer

## Notes

- Data is saved in browser localStorage under `yt-brief-studio-v3`.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
