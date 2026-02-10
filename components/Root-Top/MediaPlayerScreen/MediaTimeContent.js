import React from "react";
import { View, Text } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";

export default function MediaTimeContent({
  progress,
  currentTimeSec,
  durationSec,
  formatTime,
  timeTextFontSize,
}) {
  const remaining = Math.max(0, durationSec - currentTimeSec);
  const timeStyle = [
    mediaPlayerStyles.timeText,
    timeTextFontSize != null && { fontSize: timeTextFontSize },
  ];
  return (
    <>
      <View style={mediaPlayerStyles.progressBar}>
        <View
          style={[
            mediaPlayerStyles.progressFill,
            { width: `${(progress || 0) * 100}%` },
          ]}
        />
      </View>
      <View style={mediaPlayerStyles.timeRow}>
        <Text style={timeStyle}>{formatTime(currentTimeSec)}</Text>
        <Text style={timeStyle}>-{formatTime(remaining)}</Text>
      </View>
    </>
  );
}
