import { MediaTimeContent } from "./MediaTimeContent";
import { MediaPlayerControls } from "./MediaPlayerControls";
import type { PlaybackState } from "../types";

interface MediaPlayerScreenProps {
  playback: PlaybackState;
  onBack?: () => void;
  contentMaxWidth?: number;
  embedded?: boolean;
}

function MediaPlayerContent({
  playback,
  onBack,
}: {
  playback: PlaybackState;
  onBack?: () => void;
}) {
  const { actions } = playback;
  const trackTitle =
    playback.currentTrackTitle ?? `Track ${playback.currentTrackIndex + 1}`;
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3 mb-4 min-w-0 w-full">
        <span className="text-textPrimary font-semibold text-lg tablet:text-xl laptop:text-2xl truncate min-w-0 flex-1">
          {trackTitle}
        </span>
        {playback.trackCount > 0 && (
          <span className="text-textMuted text-sm tablet:text-base shrink-0">
            {playback.currentTrackIndex + 1} / {playback.trackCount}
          </span>
        )}
      </div>
      <div className="w-full mb-8">
        <MediaTimeContent
          progress={playback.progress}
          currentTimeSec={playback.currentTimeSec}
          durationSec={playback.durationSec}
          formatTime={playback.formatTime}
          onSeek={actions.seek}
        />
      </div>
      <MediaPlayerControls
        isPlaying={playback.isPlaying}
        onPlay={actions.play}
        onPause={actions.pause}
        onPrev={actions.prev}
        onNext={actions.next}
        onBack={onBack}
      />
    </>
  );
}

export function MediaPlayerScreen({
  playback,
  onBack,
  contentMaxWidth,
  embedded = false,
}: MediaPlayerScreenProps) {
  const maxWidth = contentMaxWidth ?? 576;
  if (embedded) {
    return (
      <div className="w-full">
        <MediaPlayerContent playback={playback} onBack={onBack} />
      </div>
    );
  }
  return (
    <div className="w-full mx-auto" style={{ maxWidth }}>
      <div className="rounded-[28px] laptop:rounded-[32px] border border-navy/10 bg-card shadow-card p-6 tablet:p-8 laptop:py-10 laptop:px-10">
        <MediaPlayerContent playback={playback} onBack={onBack} />
      </div>
    </div>
  );
}
