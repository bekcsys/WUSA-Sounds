import React, { useState, useCallback } from "react";
import WelcomePage from "./pages/WelcomePage";
import MediaPlayerPage from "./pages/MediaPlayerPage";
import { useMediaPlayerPlayback } from "./components/MediaPlayerScreen/useMediaPlayerPlayback";

export default function App() {
  const [mediaPlayerTitle, setMediaPlayerTitle] = useState("");
  const [mediaPlayerTracks, setMediaPlayerTracks] = useState([]);
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);

  const playback = useMediaPlayerPlayback(
    showMediaPlayer ? mediaPlayerTracks : []
  );

  const handleOpenMediaPlayer = useCallback((title, tracks) => {
    setMediaPlayerTitle(title);
    setMediaPlayerTracks(tracks ?? []);
    setShowMediaPlayer(true);
  }, []);

  const handleBackFromMediaPlayer = useCallback(() => {
    setShowMediaPlayer(false);
  }, []);

  if (showMediaPlayer) {
    return (
      <MediaPlayerPage
        title={mediaPlayerTitle}
        tracks={mediaPlayerTracks}
        onBack={handleBackFromMediaPlayer}
        playback={playback}
      />
    );
  }

  return <WelcomePage onOpenMediaPlayer={handleOpenMediaPlayer} />;
}
