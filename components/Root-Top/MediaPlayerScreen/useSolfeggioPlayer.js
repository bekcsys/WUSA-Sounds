import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { TRACKS } from "./constants";

export default function useSolfeggioPlayer() {
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  soundRef.current = sound;
  const currentTrack = TRACKS[currentIndex];

  async function loadAndPlay(uri) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish && !status.isLooping) {
          setIsPlaying(false);
        }
      });
      setSound(newSound);
      setIsPlaying(true);
    } catch (e) {
      console.warn("Load error:", e);
      setIsPlaying(false);
    }
  }

  async function togglePlayPause() {
    if (!sound) {
      await loadAndPlay(currentTrack.uri);
      return;
    }
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  function switchTrack(direction) {
    const next =
      (currentIndex + direction + TRACKS.length) % TRACKS.length;
    setCurrentIndex(next);
    if (sound) {
      sound.unloadAsync().then(() => setSound(null));
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentMode: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return {
    currentTrack,
    isPlaying,
    togglePlayPause,
    switchTrack,
  };
}
