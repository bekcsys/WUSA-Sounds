import React from "react";
import MediaPlayerScreen from "./MediaPlayerScreen";

export default function MediaPlayerScreenContainer({
  title,
  onBack,
  tracks = [],
  visualizationImage,
  playback,
}) {
  return (
    <MediaPlayerScreen
      title={title}
      onBack={onBack}
      tracks={tracks}
      visualizationImage={visualizationImage}
      playback={playback}
    />
  );
}
