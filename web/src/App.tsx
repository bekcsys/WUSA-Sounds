import { useState, useCallback } from "react";
import { HomePage } from "./components/HomePage";
import { useMediaPlayerPlayback } from "./hooks/useMediaPlayerPlayback";
import { useViewportSize, useViewportHeight } from "./hooks/useViewportSize";
import { WELCOME_OPTIONS } from "./data/tracks";
import type { WelcomeOption } from "./types";

export default function App() {
  const viewport = useViewportSize();
  const viewportHeight = useViewportHeight();
  const [currentOption, setCurrentOption] = useState<WelcomeOption>(
    () => WELCOME_OPTIONS[0]
  );

  const playback = useMediaPlayerPlayback(
    currentOption.tracks,
    currentOption.id
  );

  const handleSelectOption = useCallback((option: WelcomeOption) => {
    setCurrentOption(option);
  }, []);

  return (
    <HomePage
      viewport={viewport}
      viewportHeight={viewportHeight}
      currentOption={currentOption}
      onSelectOption={handleSelectOption}
      playback={playback}
    />
  );
}
