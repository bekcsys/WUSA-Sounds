# DoneWizIt Media (Web)

React + Vite + TypeScript + Tailwind web app for the media player. Deploy to Vercel and optionally connect a GoDaddy domain.

## Setup

1. Install dependencies:

   ```bash
   cd web && npm install
   ```

2. Create `.env` from the example and set your S3 base URL:

   ```bash
   cp .env.example .env
   ```

   Set `VITE_S3_MEDIA_URL` to the base URL of your AWS S3 bucket (or CloudFront) where audio files are stored, e.g.:

   - `https://your-bucket.s3.us-east-1.amazonaws.com/media`
   - or `https://d1234abcd.cloudfront.net/media`

   Do not add a trailing slash. Track paths in `src/data/tracks.ts` are appended to this base (e.g. `solfeggio/174Meditation.mp3`).

3. Run locally:

   ```bash
   npm run dev
   ```

4. Build:

   ```bash
   npm run build
   ```

## Assets (images and audio)

All static assets live under **`web/public/assets/`** so the company logo and menu work.

**Images** – Copy from the mobile app `assets/images/` into **`web/public/assets/images/`**:

- `L01-WUSA.png` – company logo (header on welcome and player pages)
- `SoundFreqenciesLogo.png` – Solfeggio / TriBowl / Ambient menu options

They are served at `/assets/images/...` and referenced via `src/config/assets.ts`.

**Audio** – Either set `VITE_S3_MEDIA_URL` for S3, or place files under **`web/public/assets/audio/`** using the same paths as in `src/data/tracks.ts` (e.g. `assets/audio/solfeggio/174Meditation.mp3`). If S3 is not set, the app loads from `/assets/audio/`.

## S3 bucket structure

Upload your audio files under paths that match `src/data/tracks.ts`:

- `solfeggio/174Meditation.mp3`, `solfeggio/285Healing.mp3`, etc.
- `tribowl/174TriBowl.mp3`, `tribowl/Bowl01.mp3`, etc.
- `ambient/Ambient-Fragments.mp3`, `ambient/Ambient-Calm.mp3`, etc.

Ensure the bucket (or CloudFront) allows public read access for these objects, or use signed URLs if you add backend support.

## Deploy to Vercel

1. In Vercel, create a new project and link this repo.
2. Set **Root Directory** to `web` so Vercel builds from the web app.
3. Add environment variable in Vercel: `VITE_S3_MEDIA_URL` = your S3 base URL.
4. Deploy. Then in **Settings > Domains** you can add your GoDaddy domain and follow Vercel’s DNS instructions.
