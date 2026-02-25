import type { MouseEvent } from "react";

interface MediaTimeContentProps {
  progress: number;
  currentTimeSec: number;
  durationSec: number;
  formatTime: (sec: number) => string;
  onSeek?: (positionSec: number) => void;
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

  const handleBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!canSeek || !onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    if (width <= 0) return;
    const localX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, localX / width));
    onSeek(fraction * durationSec);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-textMuted mb-1">
        <span>{formatTime(currentTimeSec)}</span>
        <span>-{formatTime(remaining)}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={progress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 bg-lineDivider rounded-full overflow-hidden cursor-pointer"
        onClick={handleBarClick}
      >
        <div
          className="h-full bg-brand rounded-full transition-[width] duration-150"
          style={{ width: `${(progress || 0) * 100}%` }}
        />
      </div>
    </div>
  );
}
