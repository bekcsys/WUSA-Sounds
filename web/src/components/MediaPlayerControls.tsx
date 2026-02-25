interface MediaPlayerControlsProps {
  isPlaying: boolean;
  isShuffle: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onBack?: () => void;
}

function ControlButton({
  label,
  icon,
  onClick,
  ariaLabel,
  variant = "default",
  ariaPressed,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  ariaLabel: string;
  variant?: "default" | "primary" | "toggle";
  ariaPressed?: boolean;
}) {
  const isPrimary = variant === "primary";
  const isToggleOn = variant === "toggle" && ariaPressed;
  const baseClass =
    "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 tablet:flex-none tablet:min-w-[72px] py-1.5 px-2 tablet:py-2 tablet:px-3 rounded-lg transition-colors";
  const className = isPrimary
    ? `${baseClass} bg-brand text-white border-2 border-navyBorder shadow-button hover:opacity-90 active:opacity-80`
    : isToggleOn
      ? `${baseClass} border-2 border-brand bg-brand/15 text-brand hover:bg-brand/25 active:bg-brand/20`
      : `${baseClass} border border-navy/20 bg-card hover:bg-navy/5 active:bg-navy/10 text-textPrimary`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={className}
    >
      <span className="text-xl tablet:text-2xl" aria-hidden>
        {icon}
      </span>
      <span className="hidden tablet:block text-xs font-medium truncate max-w-full">{label}</span>
    </button>
  );
}

export function MediaPlayerControls({
  isPlaying,
  isShuffle,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onShuffle,
  onBack,
}: MediaPlayerControlsProps) {
  const handlePlayPause = () => (isPlaying ? onPause() : onPlay());

  return (
    <div className="flex flex-nowrap items-center justify-center gap-2 tablet:gap-4 w-full">
      <ControlButton
        label="Shuffle"
        icon="🔀"
        onClick={onShuffle}
        ariaLabel={isShuffle ? "Shuffle on" : "Shuffle off"}
        variant="toggle"
        ariaPressed={isShuffle}
      />
      <ControlButton
        label="Prev"
        icon="⏮"
        onClick={onPrev}
        ariaLabel="Previous track"
      />
      <ControlButton
        label={isPlaying ? "Pause" : "Play"}
        icon={isPlaying ? "⏸" : "▶"}
        onClick={handlePlayPause}
        ariaLabel={isPlaying ? "Pause" : "Play"}
        variant="primary"
        ariaPressed={isPlaying}
      />
      <ControlButton
        label="Next"
        icon="⏭"
        onClick={onNext}
        ariaLabel="Next track"
      />
      {onBack && (
        <ControlButton
          label="Back"
          icon="⌂"
          onClick={onBack}
          ariaLabel="Back to menu"
        />
      )}
    </div>
  );
}
