import { MediaTimeContent } from "./MediaTimeContent";
import { MediaPlayerControls } from "./MediaPlayerControls";
import type { PlaybackState } from "../types";

interface MediaPlayerScreenProps {
  playlistTitle: string;
  playback: PlaybackState;
  onBack?: () => void;
  contentMaxWidth?: number;
}

export function MediaPlayerScreen({
  playlistTitle,
  playback,
  onBack,
  contentMaxWidth,
}: MediaPlayerScreenProps) {
  const { actions } = playback;
  const maxWidth = contentMaxWidth ?? 576;
  return (
    <div className="w-full mx-auto" style={{ maxWidth }}>
      <div className="rounded-[28px] laptop:rounded-[32px] border border-navy/10 bg-card shadow-card p-6 tablet:p-8 laptop:py-10 laptop:px-10">
        <div className="flex items-center justify-between gap-3 mb-6 min-w-0">
          <div className="flex flex-wrap items-center gap-2 min-w-0 shrink">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-navy/10 text-textPrimary text-base tablet:text-lg font-medium truncate max-w-full">
              {playlistTitle}
            </span>
            <span className="text-textMuted text-xs tablet:text-sm font-medium uppercase tracking-wide shrink-0">
              Now playing
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 min-w-0 shrink text-right">
            <span className="text-textPrimary font-semibold text-base tablet:text-lg truncate min-w-0">
              {playback.currentTrackTitle ??
                `Track ${playback.currentTrackIndex + 1}`}
            </span>
            {playback.trackCount > 0 && (
              <span className="text-textMuted text-sm tablet:text-base shrink-0">
                ({playback.currentTrackIndex + 1} /{playback.trackCount})
              </span>
            )}
          </div>
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
          isShuffle={playback.isShuffle}
          onPlay={actions.play}
          onPause={actions.pause}
          onPrev={actions.prev}
          onNext={actions.next}
          onShuffle={actions.toggleShuffle}
          onBack={onBack}
        />
      </div>
    </div>
  );
}
