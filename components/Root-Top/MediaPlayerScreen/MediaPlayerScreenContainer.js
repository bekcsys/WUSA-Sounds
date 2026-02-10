import React from "react";
import MediaPlayerScreen from "./MediaPlayerScreen";

export default function MediaPlayerScreenContainer({ title, onBack }) {
  return <MediaPlayerScreen title={title} onBack={onBack} />;
}
