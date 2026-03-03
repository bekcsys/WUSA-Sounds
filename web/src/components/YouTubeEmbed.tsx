import { useState } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import {
  getYouTubeEmbedPlaylistUrl,
  YOUTUBE_PLAYLISTS,
} from "../config/youtube";

interface YouTubeEmbedProps {
  playlistIds?: string[];
  className?: string;
}

export function YouTubeEmbed({
  playlistIds = YOUTUBE_PLAYLISTS,
  className = "",
}: YouTubeEmbedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playlists = playlistIds.length > 0 ? playlistIds : YOUTUBE_PLAYLISTS;
  const playlistId = playlists[currentIndex];
  const embedUrl = getYouTubeEmbedPlaylistUrl(playlistId);

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
          No YouTube playlists configured.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col items-center gap-4 ${className}`}>
      <div className="relative w-full max-w-[640px] aspect-[640/368] rounded-md overflow-hidden border-[12px] border-gray-600 bg-gray-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4),0_6px_20px_rgba(0,0,0,0.25)]">
        <iframe
          key={playlistId}
          id="panel-youtube"
          title="YouTube playlist"
          src={embedUrl}
          className="absolute inset-0 w-full h-full min-w-0 min-h-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
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
