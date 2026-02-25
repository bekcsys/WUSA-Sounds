const S3_BASE = import.meta.env.VITE_S3_MEDIA_URL ?? "";
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
