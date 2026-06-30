import type { LucideIcon } from "lucide-react";
import { SkipBack, Play, Pause, SkipForward, Home, Repeat, Repeat1 } from "lucide-react";
import type { RepeatMode } from "../types";

interface MediaPlayerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onBack?: () => void;
  repeatMode?: RepeatMode;
  onToggleRepeat?: () => void;
  showRepeat?: boolean;
}

const REPEAT_LABELS: Record<RepeatMode, string> = {
  none: "Repeat Off",
  all: "Repeat All",
  one: "Repeat One",
};

const REPEAT_ARIA: Record<RepeatMode, string> = {
  none: "Repeat off",
  all: "Repeat all",
  one: "Repeat one",
};

function ControlButton({
  label,
  icon: Icon,
  onClick,
  ariaLabel,
  variant = "default",
  ariaPressed,
  reserveLabelSpace,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  ariaLabel: string;
  variant?: "default" | "primary" | "toggle";
  ariaPressed?: boolean;
  reserveLabelSpace?: string[];
}) {
  const isPrimary = variant === "primary";
  const isToggle = variant === "toggle";
  const isToggleOn = isToggle && ariaPressed;
  const widthClass = isPrimary
    ? "min-w-[64px] w-[64px] flex-none tablet:min-w-[96px] tablet:max-w-[96px] tablet:w-[96px]"
    : isToggle
      ? "flex-none tablet:min-w-touch-target"
      : "tablet:min-w-touch-target tablet:min-w-[88px]";
  const flexClass = isPrimary || isToggle ? "flex-none" : "flex-1 tablet:flex-none";
  const baseClass =
    `flex flex-col items-center justify-center gap-0.5 min-w-0 ${flexClass} tablet:min-h-touch-target ${widthClass} py-2 px-2.5 tablet:py-4 tablet:px-4 rounded-lg transition-colors border-0 bg-transparent`;
  const colorClass = isToggleOn
    ? "text-brand active:opacity-80"
    : "text-textPrimary active:text-brand active:opacity-80";

  const labelEl =
    reserveLabelSpace && reserveLabelSpace.length > 0 ? (
      <span className="hidden tablet:grid text-sm font-medium justify-items-center">
        {reserveLabelSpace.map((text) => (
          <span key={text} className="col-start-1 row-start-1 invisible" aria-hidden>
            {text}
          </span>
        ))}
        <span className="col-start-1 row-start-1">{label}</span>
      </span>
    ) : (
      <span className="hidden tablet:block text-sm font-medium truncate max-w-full">{label}</span>
    );

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
      {labelEl}
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
  repeatMode = "none",
  onToggleRepeat,
  showRepeat = false,
}: MediaPlayerControlsProps) {
  const handlePlayPause = () => (isPlaying ? onPause() : onPlay());
  const RepeatIcon = repeatMode === "one" ? Repeat1 : Repeat;

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
      {showRepeat && onToggleRepeat && (
        <ControlButton
          label={REPEAT_LABELS[repeatMode]}
          icon={RepeatIcon}
          onClick={onToggleRepeat}
          ariaLabel={REPEAT_ARIA[repeatMode]}
          variant="toggle"
          ariaPressed={repeatMode !== "none"}
          reserveLabelSpace={Object.values(REPEAT_LABELS)}
        />
      )}
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
