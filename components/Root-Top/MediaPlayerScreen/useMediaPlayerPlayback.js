import { useState, useCallback, useMemo } from "react";

const TRACK_COUNT = 5;

function randomTrackIndex(current, total) {
  if (total <= 1) return 0;
  let next = Math.floor(Math.random() * total);
  while (next === current && total > 1) {
    next = Math.floor(Math.random() * total);
  }
  return next;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/**
 * Holds all playback state and control handlers.
 * Returns state plus a stable handlers object so children can avoid unnecessary re-renders.
 */
export function useMediaPlayerPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const onPlay = useCallback(() => setIsPlaying(true), []);
  const onPause = useCallback(() => setIsPlaying(false), []);
  const onPrev = useCallback(() => {
    setCurrentTrackIndex((i) =>
      isShuffleOn ? randomTrackIndex(i, TRACK_COUNT) : (i - 1 + TRACK_COUNT) % TRACK_COUNT,
    );
  }, [isShuffleOn]);
  const onNext = useCallback(() => {
    setCurrentTrackIndex((i) =>
      isShuffleOn ? randomTrackIndex(i, TRACK_COUNT) : (i + 1) % TRACK_COUNT,
    );
  }, [isShuffleOn]);
  const onShuffle = useCallback(() => setIsShuffleOn((prev) => !prev), []);

  const handlers = useMemo(
    () => ({ onPlay, onPause, onPrev, onNext, onShuffle }),
    [onPlay, onPause, onPrev, onNext, onShuffle],
  );

  const progress = 0;
  const currentTimeSec = 0;
  const durationSec = 0;

  return {
    isPlaying,
    isShuffleOn,
    currentTrackIndex,
    volume,
    setVolume,
    progress,
    currentTimeSec,
    durationSec,
    formatTime,
    handlers,
  };
}
