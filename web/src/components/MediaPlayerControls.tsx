import type { LucideIcon } from "lucide-react";
import { SkipBack, Play, Pause, SkipForward, Home } from "lucide-react";

interface MediaPlayerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onBack?: () => void;
}

function ControlButton({
  label,
  icon: Icon,
  onClick,
  ariaLabel,
  variant = "default",
  ariaPressed,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  ariaLabel: string;
  variant?: "default" | "primary" | "toggle";
  ariaPressed?: boolean;
}) {
  const isPrimary = variant === "primary";
  const isToggleOn = variant === "toggle" && ariaPressed;
  const isActive = (isPrimary && ariaPressed) || isToggleOn;
  const widthClass = isPrimary
    ? "min-w-[64px] w-[64px] flex-none tablet:min-w-[96px] tablet:max-w-[96px] tablet:w-[96px]"
    : "tablet:min-w-touch-target tablet:min-w-[88px]";
  const flexClass = isPrimary ? "flex-none" : "flex-1 tablet:flex-none";
  const baseClass =
    `flex flex-col items-center justify-center gap-0.5 min-w-0 ${flexClass} tablet:min-h-touch-target ${widthClass} py-2 px-2.5 tablet:py-4 tablet:px-4 rounded-lg transition-colors border-0 bg-transparent`;
  const colorClass = isActive
    ? "text-brand hover:text-brand active:opacity-80"
    : "text-textPrimary hover:text-brand active:opacity-80";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={`${baseClass} ${colorClass}`}
    >
      <span className="flex items-center justify-center shrink-0 [&>svg]:currentColor" aria-hidden>
        <Icon className="w-7 h-7 tablet:w-9 tablet:h-9" strokeWidth={2.25} />
      </span>
      <span className="hidden tablet:block text-sm font-medium truncate max-w-full">{label}</span>
    </button>
  );
}

export function MediaPlayerControls({
  isPlaying,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onBack,
}: MediaPlayerControlsProps) {
  const handlePlayPause = () => (isPlaying ? onPause() : onPlay());

  return (
    <div className="flex flex-nowrap items-center justify-center gap-3 tablet:gap-5 w-full">
      <ControlButton
        label="Prev"
        icon={SkipBack}
        onClick={onPrev}
        ariaLabel="Previous track"
      />
      <ControlButton
        label={isPlaying ? "Pause" : "Play"}
        icon={isPlaying ? Pause : Play}
        onClick={handlePlayPause}
        ariaLabel={isPlaying ? "Pause" : "Play"}
        variant="primary"
        ariaPressed={isPlaying}
      />
      <ControlButton
        label="Next"
        icon={SkipForward}
        onClick={onNext}
        ariaLabel="Next track"
      />
      {onBack && (
        <ControlButton
          label="Back"
          icon={Home}
          onClick={onBack}
          ariaLabel="Back to menu"
        />
      )}
    </div>
  );
}
