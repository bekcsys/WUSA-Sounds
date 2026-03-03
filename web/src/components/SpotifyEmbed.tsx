import { useState } from "react";
import { SkipBack, SkipForward } from "lucide-react";
import {
  getSpotifyEmbedUrl,
  SPOTIFY_ITEMS,
  type SpotifyItem,
} from "../config/spotify";

interface SpotifyEmbedProps {
  items?: SpotifyItem[];
  className?: string;
}

export function SpotifyEmbed({
  items = SPOTIFY_ITEMS,
  className = "",
}: SpotifyEmbedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const list = items.length > 0 ? items : SPOTIFY_ITEMS;
  const item = list[currentIndex];
  const embedUrl = getSpotifyEmbedUrl(item);

  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? list.length - 1 : i - 1));
  };

  const goNext = () => {
    setCurrentIndex((i) => (i >= list.length - 1 ? 0 : i + 1));
  };

  if (!embedUrl) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 text-textMuted text-center ${className}`}
      >
        <p className="text-sm tablet:text-base">
          No Spotify content configured.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex w-full flex-col items-center gap-4 ${className}`}>
      <div className="relative w-full max-w-[640px] h-[404px] rounded-md overflow-hidden border-[12px] border-gray-600 bg-gray-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4),0_6px_20px_rgba(0,0,0,0.25)]">
        <iframe
          key={`${item.type}-${item.id}`}
          title="Spotify"
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0 size-full"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <div className="flex flex-nowrap items-center justify-center gap-3 tablet:gap-5 w-full min-h-[52px]">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous"
          className="flex items-center justify-center gap-2 min-h-touch-target min-w-[48px] px-3 py-2 text-textPrimary hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          <SkipBack className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm font-medium">Prev</span>
        </button>
        <span className="text-sm text-textMuted tabular-nums">
          {currentIndex + 1} / {list.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next"
          className="flex items-center justify-center gap-2 min-h-touch-target min-w-[48px] px-3 py-2 text-textPrimary hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          <SkipForward className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm font-medium">Next</span>
        </button>
      </div>
    </div>
  );
}
