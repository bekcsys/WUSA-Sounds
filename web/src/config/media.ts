/**
 * Single place to set the AWS S3 base URL for MP3 media (no trailing slash).
 * Set to your bucket URL, e.g. https://your-bucket.s3.us-east-1.amazonaws.com/media
 * Vercel: set VITE_S3_MEDIA_URL in project env to override at build time.
 */
export const S3_MEDIA_BASE_URL = "";

const S3_BASE = import.meta.env.VITE_S3_MEDIA_URL ?? S3_MEDIA_BASE_URL;
const LOCAL_AUDIO_BASE = "/assets/audio";

function encodePath(path: string): string {
  return path.split("/").map((segment) => encodeURIComponent(segment)).join("/");
}

export function getMediaUrl(path: string): string {
  if (!path) return "";
  const base = S3_BASE || LOCAL_AUDIO_BASE;
  const encoded = encodePath(path);
  const url = base.endsWith("/") ? base + encoded : `${base}/${encoded}`;
  return url;
}
