export function getSpotifyEmbedPlaylistUrl(playlistId: string): string {
  if (!playlistId) return "";
  return `https://open.spotify.com/embed/playlist/${encodeURIComponent(playlistId)}`;
}

export const SPOTIFY_PLAYLISTS = [
  "37i9dQZF1DXcBWIGoYBM5M",
];
