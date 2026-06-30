import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type { Track, PlaybackState, PlaybackActions, RepeatMode } from "../types";

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

const PROGRESS_INTERVAL_MS = 250;
const REPEAT_CYCLE: RepeatMode[] = ["one", "all", "none"];

/**
 * Single reusable playback hook for any playlist.
 * Pass the current playlist (tracks) and a stable playlistId; when either changes,
 * playback resets to the first track of the new list. All control logic (play, pause,
 * prev, next, seek) is centralized here; the UI only calls actions.
 */
export function useMediaPlayerPlayback(
  tracks: Track[],
  playlistId: string | undefined
): PlaybackState {
  const trackCount = tracks.length;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("none");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tracksRef = useRef<Track[]>(tracks);
  const prevPlaylistIdRef = useRef<string | undefined>(playlistId);
  const currentIndexRef = useRef(currentTrackIndex);
  const advanceAndPlayRef = useRef(false);
  const isShuffleRef = useRef(isShuffle);
  const repeatModeRef = useRef(repeatMode);
  tracksRef.current = tracks;
  currentIndexRef.current = currentTrackIndex;
  isShuffleRef.current = isShuffle;
  repeatModeRef.current = repeatMode;

  const stopProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const updateProgress = useCallback(() => {
    const el = audioRef.current;
    if (!el || !(el.duration > 0 && isFinite(el.duration))) return;
    const pos = el.currentTime;
    const dur = el.duration;
    setCurrentTimeSec(pos);
    setDurationSec(dur);
    setProgress(dur > 0 ? pos / dur : 0);
  }, []);

  const getRandomIndex = useCallback((exclude: number): number => {
    const list = tracksRef.current;
    if (list.length === 0) return 0;
    if (list.length === 1) return 0;
    let idx = Math.floor(Math.random() * list.length);
    while (idx === exclude) {
      idx = Math.floor(Math.random() * list.length);
    }
    return idx;
  }, []);

  const advanceToNext = useCallback(() => {
    advanceAndPlayRef.current = true;
    setCurrentTrackIndex((i) => {
      const list = tracksRef.current;
      if (list.length === 0) return i;
      if (isShuffleRef.current && list.length > 1) return getRandomIndex(i);
      return (i + 1) % list.length;
    });
  }, [getRandomIndex]);

  const handleTrackEnded = useCallback(() => {
    const mode = repeatModeRef.current;
    const list = tracksRef.current;
    const index = currentIndexRef.current;
    if (list.length === 0) return;

    if (mode === "one") {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return;
    }

    if (mode === "none" && index >= list.length - 1) {
      setIsPlaying(false);
      return;
    }

    advanceToNext();
  }, [advanceToNext]);

  const loadTrackAtIndex = useCallback(
    (trackList: Track[], index: number, shouldPlay: boolean) => {
      if (trackList.length === 0 || index < 0 || index >= trackList.length) return;

      const track = trackList[index];
      if (!track?.source?.trim()) return;

      stopProgressInterval();

      if (!audioRef.current) {
        const audio = new Audio();
        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleTrackEnded);
        audioRef.current = audio;
      }
      const audio = audioRef.current;

      audio.addEventListener(
        "loadedmetadata",
        () => {
          if (audio.duration > 0 && isFinite(audio.duration)) {
            setDurationSec(audio.duration);
          }
        },
        { once: true }
      );
      audio.addEventListener(
        "canplay",
        () => {
          if (shouldPlay) {
            audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          } else {
            setIsPlaying(false);
          }
        },
        { once: true }
      );

      setCurrentTimeSec(0);
      setProgress(0);
      setDurationSec(0);

      const onError = () => {
        console.warn("Audio load failed:", track.source);
        setIsPlaying(false);
      };
      audio.addEventListener("error", onError, { once: true });

      audio.src = track.source;
      audio.load();

      if (audio.readyState >= 2 && shouldPlay) {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    },
    [stopProgressInterval, updateProgress, handleTrackEnded]
  );

  useEffect(() => {
    if (trackCount === 0 || tracks.length === 0) return;

    const playlistJustChanged = prevPlaylistIdRef.current !== playlistId;
    if (playlistJustChanged) {
      prevPlaylistIdRef.current = playlistId;
      setCurrentTrackIndex(0);
      setIsPlaying(false);
      loadTrackAtIndex(tracks, 0, false);
      return;
    }

    const idx = Math.max(0, Math.min(currentTrackIndex, trackCount - 1));
    if (idx !== currentTrackIndex) {
      setCurrentTrackIndex(idx);
      return;
    }
    const wasPlaying =
      advanceAndPlayRef.current || (audioRef.current ? !audioRef.current.paused : false);
    if (advanceAndPlayRef.current) advanceAndPlayRef.current = false;
    loadTrackAtIndex(tracks, idx, wasPlaying);
  }, [tracks, playlistId, trackCount, currentTrackIndex, loadTrackAtIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      progressIntervalRef.current = setInterval(updateProgress, PROGRESS_INTERVAL_MS);
      return () => stopProgressInterval();
    }
  }, [isPlaying, updateProgress, stopProgressInterval]);

  useEffect(() => {
    return () => {
      stopProgressInterval();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [stopProgressInterval]);

  const play = useCallback(() => {
    if (trackCount === 0) return;
    const list = tracksRef.current;
    const idx = currentIndexRef.current;
    const track = list[idx];
    if (!track?.source?.trim()) {
      setIsPlaying(false);
      return;
    }

    const audio = audioRef.current;
    const needsLoad =
      !audio ||
      audio.error != null ||
      audio.src !== track.source ||
      audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA;

    if (needsLoad) {
      loadTrackAtIndex(list, idx, true);
      return;
    }

    setIsPlaying(true);
    audio.play().catch(() => setIsPlaying(false));
  }, [trackCount, loadTrackAtIndex]);

  const pause = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const prev = useCallback(() => {
    if (trackCount === 0) return;
    setCurrentTrackIndex((i) => {
      if (isShuffleRef.current && trackCount > 1) return getRandomIndex(i);
      return (i - 1 + trackCount) % trackCount;
    });
  }, [trackCount, getRandomIndex]);

  const next = useCallback(() => {
    if (trackCount === 0) return;
    setCurrentTrackIndex((i) => {
      if (isShuffleRef.current && trackCount > 1) return getRandomIndex(i);
      return (i + 1) % trackCount;
    });
  }, [trackCount, getRandomIndex]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((s) => !s);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((mode) => {
      const index = REPEAT_CYCLE.indexOf(mode);
      return REPEAT_CYCLE[(index + 1) % REPEAT_CYCLE.length];
    });
  }, []);

  const seek = useCallback(
    (positionSec: number) => {
      if (!audioRef.current || durationSec <= 0) return;
      const sec = Math.max(0, Math.min(durationSec, positionSec));
      audioRef.current.currentTime = sec;
      setCurrentTimeSec(sec);
      setProgress(sec / durationSec);
    },
    [durationSec]
  );

  const actions = useMemo<PlaybackActions>(
    () => ({ play, pause, prev, next, seek, toggleShuffle, toggleRepeat }),
    [play, pause, prev, next, seek, toggleShuffle, toggleRepeat]
  );

  const currentTrackTitle =
    trackCount > 0 && tracks[currentTrackIndex] ? tracks[currentTrackIndex].title : null;

  return {
    isPlaying,
    isShuffle,
    repeatMode,
    currentTrackIndex,
    currentTrackTitle,
    trackCount,
    progress,
    currentTimeSec,
    durationSec,
    formatTime,
    actions,
  };
}
