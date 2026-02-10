import React from "react";
import { View, Text } from "react-native";
import BackButton from "./BackButton";
import PlayerControls from "./PlayerControls";
import useSolfeggioPlayer from "./useSolfeggioPlayer";
import mediaPlayerScreenStyles from "./mediaPlayerScreenStyles";

export default function MediaPlayerScreen({ onBack }) {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    switchTrack,
  } = useSolfeggioPlayer();

  return (
    <View style={mediaPlayerScreenStyles.container}>
      <BackButton onPress={onBack} />
      <Text style={mediaPlayerScreenStyles.title}>Solfeggio Sounds</Text>
      <Text style={mediaPlayerScreenStyles.trackTitle}>{currentTrack.title}</Text>
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onPrev={() => switchTrack(-1)}
        onNext={() => switchTrack(1)}
      />
    </View>
  );
}
