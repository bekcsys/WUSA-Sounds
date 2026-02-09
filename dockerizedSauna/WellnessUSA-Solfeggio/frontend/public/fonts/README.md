# SCANDIA Font Files

This directory should contain the SCANDIA font files in the following formats:

## Required Font Files

- `SCANDIA-Light.woff2` (weight: 300)
- `SCANDIA-Light.woff` (weight: 300)
- `SCANDIA-Light.ttf` (weight: 300)
- `SCANDIA-Regular.woff2` (weight: 400)
- `SCANDIA-Regular.woff` (weight: 400)
- `SCANDIA-Regular.ttf` (weight: 400)
- `SCANDIA-Medium.woff2` (weight: 500)
- `SCANDIA-Medium.woff` (weight: 500)
- `SCANDIA-Medium.ttf` (weight: 500)
- `SCANDIA-Bold.woff2` (weight: 700)
- `SCANDIA-Bold.woff` (weight: 700)
- `SCANDIA-Bold.ttf` (weight: 700)

## Font Loading

The fonts are automatically loaded via `fonts.css` when the application starts. Until font files are added, the system will fall back to system fonts.

## Usage

See `components/shared/font.tsx` for React component usage, `documentation/FONT_USAGE.md` for detailed usage guide, and `app/fonts.css` for CSS class usage.
