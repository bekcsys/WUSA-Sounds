import React from "react";
import MediaPlayerScreen from "./MediaPlayerScreen";

export default function MediaPlayerScreenContainer({ title, onBack, tracks = [] }) {
  return (
    <MediaPlayerScreen title={title} onBack={onBack} tracks={tracks} />
  );
}
