Optional: place audio files here when not using S3. Use the same folder structure as in `src/data/tracks.ts`:

- `SolfeggioSounds/174Meditation.mp3`, `285Healing.mp3`, ...
- `TriBowl/174TriBowlGrounding.mp3`, `417TriBowlPositivity.mp3`, ...
- `AmbinetSounds/Ambient - Fragments.mp3`, ...

If `VITE_S3_MEDIA_URL` is not set, the app loads from `/assets/audio/`.

### TriBowl rename map (legacy → new)

| Legacy file        | New file                    |
|--------------------|-----------------------------|
| `174TriBowl.mp3`   | `174TriBowlGrounding.mp3`   |
| `285TriBowl.mp3`   | `285TriBowlRestoration.mp3` |
| `396TriBowl.mp3`   | `396TriBowlRelease.mp3`     |
| `Bowl01.mp3`       | `417TriBowlPositivity.mp3`  |
| `Bowl02.mp3`       | `528TriBowlRenewal.mp3`     |
| `Bowl03.mp3`       | `639TriBowlHarmony.mp3`     |
| `Bowl04.mp3`       | `741TriBowlCleansing.mp3`   |
| `Bowl05.mp3`       | `852TriBowlIntuition.mp3`   |
| `Bowl06.mp3`       | `963TriBowlSerenity.mp3`    |
