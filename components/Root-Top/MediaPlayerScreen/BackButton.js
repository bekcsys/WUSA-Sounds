import React from "react";
import { TouchableOpacity, Text } from "react-native";
import mediaPlayerScreenStyles from "./mediaPlayerScreenStyles";

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity
      style={mediaPlayerScreenStyles.backButton}
      onPress={onPress}
    >
      <Text style={mediaPlayerScreenStyles.backText}>Back</Text>
    </TouchableOpacity>
  );
}
