# DoneWizIt Media (Web)

React + Vite + TypeScript + Tailwind web app for the media player. Deploy to Vercel; media (MP3) is loaded from AWS S3 via a single config; logo and menu icons are deployed with the app.

## Setup

1. Install dependencies:

   ```bash
   cd web && npm install
   ```

2. **Media (MP3) from S3** – One place to set the S3 base URL:

   - **Option A (recommended for Vercel):** In Vercel project **Settings > Environment Variables**, add `VITE_S3_MEDIA_URL` = your S3 base URL (no trailing slash), e.g. `https://your-bucket.s3.us-east-1.amazonaws.com/media` or `https://d1234abcd.cloudfront.net/media`.
   - **Option B (local / single place in code):** Edit **`src/config/media.ts`** and set `S3_MEDIA_BASE_URL` to your bucket URL. You can also copy `.env.example` to `.env` and set `VITE_S3_MEDIA_URL` there for local runs.

   Track paths in `src/data/tracks.ts` (e.g. `SolfeggioSounds/174Meditation.mp3`) are appended to this base. When you move files in S3, only change `S3_MEDIA_BASE_URL` or `VITE_S3_MEDIA_URL`; no need to change track paths unless you rename files or folders.

3. Run locally:

   ```bash
   npm run dev
   ```

4. Build:

   ```bash
   npm run build
   ```

## Assets

**Logo and menu icons (deployed with the app)** – Must be in the repo so they appear on Vercel. Add these files under **`web/public/assets/images/`**:

- `L01-WUSA.png` – company logo (header on welcome and player pages)
- `SoundFreqenciesLogo.png` – menu option icons (Solfeggio / TriBowl / Ambient)

Copy them from your design assets or the mobile app `assets/images/`, then commit. They are served at `/assets/images/...`. In Vercel, set **Root Directory** to `web` so the build and `public/` paths are correct.

**Audio (MP3)** – Served from AWS S3 only. Do not put MP3s in the repo. Configure the S3 base URL as above; the app builds full URLs from `src/config/media.ts` and `src/data/tracks.ts`.

## S3 bucket structure

Upload MP3s to your bucket under paths that match `src/data/tracks.ts`, for example:

- `SolfeggioSounds/174Meditation.mp3`, `SolfeggioSounds/285Healing.mp3`, etc.
- `tribowl/174TriBowl.mp3`, `tribowl/Bowl01.mp3`, etc.
- `AmbinetSounds/Ambient - Calm.mp3`, etc.

Ensure the bucket (or CloudFront) allows public read for these objects.

## Deploy to Vercel

1. Create a project and link this repo. Set **Root Directory** to `web`.
2. Add env var: `VITE_S3_MEDIA_URL` = your S3 base URL (no trailing slash).
3. Ensure `web/public/assets/images/L01-WUSA.png` and `SoundFreqenciesLogo.png` are committed so the logo and icons deploy.
4. Deploy. Add a custom domain under **Settings > Domains** if needed.
