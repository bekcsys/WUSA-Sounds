/**
 * Image assets are served from public/assets/images/ (Vite copies public to build root).
 * For Vercel: add L01-WUSA.png and SoundFreqenciesLogo.png under web/public/assets/images/
 * and commit so they are deployed; Root Directory in Vercel must be "web".
 */
const ASSETS_BASE = "/assets";
export const ASSETS_IMAGES = `${ASSETS_BASE}/images`;
export const ASSETS_AUDIO = `${ASSETS_BASE}/audio`;

export const LOGO_WUSA = `${ASSETS_IMAGES}/L01-WUSA.png`;
export const LOGO_SOUND = `${ASSETS_IMAGES}/SoundFreqenciesLogo.png`;
