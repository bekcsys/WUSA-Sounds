import { useState } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import {
  getSpotifyEmbedPlaylistUrl,
  SPOTIFY_PLAYLISTS,
} from "../config/spotify";

interface SpotifyEmbedProps {
  playlistIds?: string[];
  className?: string;
}

export function SpotifyEmbed({
  playlistIds = SPOTIFY_PLAYLISTS,
  className = "",
}: SpotifyEmbedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playlists = playlistIds.length > 0 ? playlistIds : SPOTIFY_PLAYLISTS;
  const playlistId = playlists[currentIndex];
  const embedUrl = getSpotifyEmbedPlaylistUrl(playlistId);

  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? playlists.length - 1 : i - 1));
  };

  const goNext = () => {
    setCurrentIndex((i) => (i >= playlists.length - 1 ? 0 : i + 1));
  };

  if (!embedUrl) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 text-textMuted text-center ${className}`}
      >
        <p className="text-sm tablet:text-base">
          No Spotify playlists configured.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col items-center gap-4 ${className}`}>
      <div className="relative w-full max-w-2xl rounded-lg overflow-hidden border-4 border-gray-600 bg-gray-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3),0_4px_14px_rgba(0,0,0,0.15)]">
        <iframe
          key={playlistId}
          title="Spotify playlist"
          src={embedUrl}
          className="w-full border-0"
          style={{ height: 380 }}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      {playlists.length > 1 && (
        <div className="flex flex-nowrap items-center justify-center gap-3 tablet:gap-5 w-full">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous playlist"
            className="flex items-center justify-center gap-2 min-h-touch-target min-w-[48px] px-3 py-2 rounded-lg border border-navy/20 text-textPrimary hover:bg-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            <SkipBack className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm font-medium">Prev</span>
          </button>
          <span className="text-sm text-textMuted tabular-nums">
            {currentIndex + 1} / {playlists.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next playlist"
            className="flex items-center justify-center gap-2 min-h-touch-target min-w-[48px] px-3 py-2 rounded-lg border border-navy/20 text-textPrimary hover:bg-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            <SkipForward className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm font-medium">Next</span>
          </button>
        </div>
      )}
    </div>
  );
}
