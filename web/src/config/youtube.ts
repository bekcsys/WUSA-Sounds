export const YOUTUBE_PLAYLIST_ID =
  (import.meta.env.VITE_YOUTUBE_PLAYLIST_ID as string) ||
  "PLgIdf285Q8E3iIS978D8qk11IY4IiqPha";

export const YOUTUBE_PLAYLISTS = [
  "PLsuCfYXzi5DJXxyK5q-Exn1AJCbpjy-tx",
  "PLsuCfYXzi5DIoSXGoq9PwweXVfFd0KWaz",
  "PLsuCfYXzi5DJtCakUW-BmfuTYB749jfUo",
  "PLgIdf285Q8E3iIS978D8qk11IY4IiqPha",
  "PLsuCfYXzi5DJ__nU-knFJUwhfmD_hhjVO",
  "PLy2YHVidoy4DQlMgLLH0xwKW4dvau1CaR",
  "PLQAuJ2UwHIbEx5PnAo8MpWl-lncpiSCeZ",
  "PLQAuJ2UwHIbFHj8S978un9e35AzGODYUl",
  "PLQAuJ2UwHIbGWvN5WdOU87KMkZamGaJeu",
  "PLQ_PIlf6OzqJJKRMOS0FZMKZ4GWXf9SaL"
 
];

export function getYouTubeEmbedPlaylistUrl(playlistId: string): string {
  if (!playlistId) return "";
  return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}`;
}
