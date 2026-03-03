export function getSpotifyEmbedPlaylistUrl(playlistId: string): string {
  if (!playlistId) return "";
  return `https://open.spotify.com/embed/playlist/${encodeURIComponent(playlistId)}`;
}

export function getSpotifyEmbedTrackUrl(trackId: string): string {
  if (!trackId) return "";
  return `https://open.spotify.com/embed/track/${encodeURIComponent(trackId)}`;
}

export type SpotifyItem = { type: "playlist"; id: string } | { type: "track"; id: string };

export function getSpotifyEmbedUrl(item: SpotifyItem): string {
  return item.type === "playlist"
    ? getSpotifyEmbedPlaylistUrl(item.id)
    : getSpotifyEmbedTrackUrl(item.id);
}

export const SPOTIFY_ITEMS: SpotifyItem[] = [
  { type: "playlist", id: "37i9dQZF1DXcBWIGoYBM5M" },
  { type: "playlist", id: "37i9dQZEVXbLRQDuF5jeBp" },
  { type: "track", id: "0VjIjW4GlUZAMYd2vXMi3b" },
];
