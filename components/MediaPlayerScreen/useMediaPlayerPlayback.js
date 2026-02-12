import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Audio } from "expo-av";

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

const PLACEHOLDER_TRACK_COUNT = 5;

/**
 * Holds all playback state and control handlers.
 * When tracks (with .source) are provided, uses expo-av to play MP3s.
 */
export function useMediaPlayerPlayback(tracks = []) {
  const trackCount = tracks.length > 0 ? tracks.length : PLACEHOLDER_TRACK_COUNT;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const soundRef = useRef(null);
  const isMountedRef = useRef(true);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const unloadSound = useCallback(async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
      } catch (_) {}
      soundRef.current = null;
    }
  }, []);

  const loadTrack = useCallback(
    async (index, shouldPlay) => {
      if (tracks.length === 0 || index < 0 || index >= tracks.length) return;
      await unloadSound();
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuck: false,
          playThroughEarpieceAndroid: false,
        });
        const { sound } = await Audio.Sound.createAsync(
          tracks[index].source,
          { progressUpdateIntervalMillis: 500, isLooping: false },
          (status) => {
            if (!isMountedRef.current || !status.isLoaded) return;
            const pos = status.positionMillis / 1000;
            const dur =
              status.durationMillis != null ? status.durationMillis / 1000 : 0;
            setCurrentTimeSec(pos);
            setDurationSec(dur);
            setProgress(dur > 0 ? pos / dur : 0);
            if (status.didJustFinishAndNotLoop) {
              setCurrentTrackIndex((i) => (i + 1) % tracks.length);
              setIsPlaying(false);
            }
          }
        );
        soundRef.current = sound;
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.durationMillis != null) {
          setDurationSec(status.durationMillis / 1000);
        }
        if (shouldPlay) {
          await sound.playAsync();
        }
      } catch (_) {
        soundRef.current = null;
      }
    },
    [tracks, unloadSound]
  );

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      unloadSound();
    };
  }, [unloadSound]);

  useEffect(() => {
    if (tracks.length === 0) return;
    const idx = Math.min(currentTrackIndex, tracks.length - 1);
    if (idx !== currentTrackIndex) {
      setCurrentTrackIndex(idx);
      return;
    }
    loadTrack(idx, isPlayingRef.current);
    return () => {
      unloadSound();
    };
  }, [tracks, currentTrackIndex, loadTrack]);

  const onPlay = useCallback(async () => {
    if (tracks.length > 0) {
      if (soundRef.current) {
        await soundRef.current.playAsync();
      } else {
        await loadTrack(currentTrackIndex, true);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(true);
    }
  }, [tracks.length, currentTrackIndex, loadTrack]);

  const onPause = useCallback(async () => {
    if (tracks.length > 0 && soundRef.current) {
      await soundRef.current.pauseAsync();
    }
    setIsPlaying(false);
  }, [tracks.length]);

  const onPrev = useCallback(() => {
    setCurrentTrackIndex((i) => (i - 1 + trackCount) % trackCount);
  }, [trackCount]);

  const onNext = useCallback(() => {
    setCurrentTrackIndex((i) => (i + 1) % trackCount);
  }, [trackCount]);

  const onSeek = useCallback(async (positionSec) => {
    if (tracks.length === 0 || !soundRef.current || durationSec <= 0) return;
    const sec = Math.max(0, Math.min(durationSec, positionSec));
    setCurrentTimeSec(sec);
    setProgress(sec / durationSec);
    try {
      await soundRef.current.setPositionAsync(sec * 1000);
    } catch (_) {}
  }, [tracks.length, durationSec]);

  const handlers = useMemo(
    () => ({ onPlay, onPause, onPrev, onNext, onSeek }),
    [onPlay, onPause, onPrev, onNext, onSeek]
  );

  const currentTrackTitle =
    tracks.length > 0 && tracks[currentTrackIndex]
      ? tracks[currentTrackIndex].title
      : null;

  return {
    isPlaying,
    currentTrackIndex,
    volume,
    setVolume,
    progress,
    currentTimeSec,
    durationSec,
    formatTime,
    handlers,
    currentTrackTitle,
    trackCount,
  };
}
