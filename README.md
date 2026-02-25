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

## Files

- `index.html`: main brief workflow
- `viewer-strategy.html`: static strategy reference page
- `styles.css`: visual design and responsive layout
- `app.js`: generation logic, scoring, and HTML export

## Notes

- Data is persisted in browser IndexedDB (`yt-brief-studio-local`), with localStorage fallback under `yt-brief-studio-v7`.
- This is a starter. The next layer is adding AI-assisted research and thumbnail image references.
