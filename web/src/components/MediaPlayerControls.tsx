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
  variant?: "default" | "primary";
  ariaPressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={
        variant === "primary"
          ? "flex flex-col items-center justify-center gap-1 min-w-[88px] py-3 px-4 rounded-xl bg-brand text-white border-2 border-navyBorder shadow-button hover:opacity-90 active:opacity-80 transition-opacity"
          : "flex flex-col items-center justify-center gap-1 min-w-[72px] py-2 px-3 rounded-lg border border-navy/20 bg-card hover:bg-navy/5 active:bg-navy/10 text-textPrimary transition-colors"
      }
    >
      <span className={variant === "primary" ? "text-3xl" : "text-2xl"} aria-hidden>
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
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
    <div className="flex flex-wrap items-center justify-center gap-3 tablet:gap-4 w-full">
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
