import { useCallback, useRef } from "react";
import type { MouseEvent, TouchEvent } from "react";

interface MediaTimeContentProps {
  progress: number;
  currentTimeSec: number;
  durationSec: number;
  formatTime: (sec: number) => string;
  onSeek?: (positionSec: number) => void;
}

function positionToFraction(clientX: number, rect: DOMRect): number {
  const width = rect.width;
  if (width <= 0) return 0;
  const localX = clientX - rect.left;
  return Math.max(0, Math.min(1, localX / width));
}

export function MediaTimeContent({
  progress,
  currentTimeSec,
  durationSec,
  formatTime,
  onSeek,
}: MediaTimeContentProps) {
  const remaining = Math.max(0, durationSec - currentTimeSec);
  const canSeek = Boolean(onSeek && durationSec > 0);
  const barRef = useRef<HTMLDivElement>(null);

  const seekFromPosition = useCallback(
    (clientX: number) => {
      if (!canSeek || !onSeek || !barRef.current) return;
      const fraction = positionToFraction(clientX, barRef.current.getBoundingClientRect());
      onSeek(fraction * durationSec);
    },
    [canSeek, onSeek, durationSec]
  );

  const handleBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!canSeek) return;
    seekFromPosition(e.clientX);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!canSeek || e.touches.length !== 1) return;
    seekFromPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!canSeek || e.touches.length !== 1) return;
    e.preventDefault();
    seekFromPosition(e.touches[0].clientX);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm tablet:text-base text-textMuted mb-1.5 tablet:mb-2">
        <span>{formatTime(currentTimeSec)}</span>
        <span>-{formatTime(remaining)}</span>
      </div>
      <div
        ref={barRef}
        role="progressbar"
        aria-valuenow={progress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 tablet:h-2 bg-lineDivider rounded-full overflow-hidden cursor-pointer touch-none"
        onClick={handleBarClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="h-full bg-brand rounded-full transition-[width] duration-150"
          style={{ width: `${(progress || 0) * 100}%` }}
        />
      </div>
    </div>
  );
}
