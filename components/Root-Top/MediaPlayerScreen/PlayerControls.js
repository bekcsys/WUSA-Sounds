import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import mediaPlayerScreenStyles from "./mediaPlayerScreenStyles";

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}) {
  return (
    <View style={mediaPlayerScreenStyles.controls}>
      <TouchableOpacity
        style={mediaPlayerScreenStyles.controlBtn}
        onPress={onPrev}
      >
        <Text style={mediaPlayerScreenStyles.controlText}>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[mediaPlayerScreenStyles.controlBtn, mediaPlayerScreenStyles.playBtn]}
        onPress={onPlayPause}
      >
        <Text style={mediaPlayerScreenStyles.controlText}>
          {isPlaying ? "Pause" : "Play"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={mediaPlayerScreenStyles.controlBtn}
        onPress={onNext}
      >
        <Text style={mediaPlayerScreenStyles.controlText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
