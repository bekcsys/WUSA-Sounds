import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";

export default function MediaTimeContent({
  progress,
  currentTimeSec,
  durationSec,
  formatTime,
  timeTextFontSize,
  onSeek,
}) {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const remaining = Math.max(0, durationSec - currentTimeSec);
  const timeStyle = [
    mediaPlayerStyles.timeText,
    timeTextFontSize != null && { fontSize: timeTextFontSize },
  ];

  const seekFromPageX = (pageX) => {
    if (!onSeek || durationSec <= 0) return;
    trackRef.current?.measureInWindow((tx, ty, tw, th) => {
      if (tw <= 0) return;
      const localX = pageX - tx;
      const fraction = Math.max(0, Math.min(1, localX / tw));
      const positionSec = fraction * durationSec;
      onSeek(positionSec);
    });
  };

  const canSeek = onSeek && durationSec > 0 && trackWidth > 0;

  return (
    <>
      <View style={mediaPlayerStyles.timeRow}>
        <Text style={timeStyle}>{formatTime(currentTimeSec)}</Text>
        <Text style={timeStyle}>-{formatTime(remaining)}</Text>
      </View>
      <View
        ref={trackRef}
        style={mediaPlayerStyles.progressBar}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          if (w > 0) setTrackWidth(w);
        }}
        onStartShouldSetResponder={() => canSeek}
        onResponderGrant={(e) => canSeek && seekFromPageX(e.nativeEvent.pageX)}
        onResponderMove={(e) => canSeek && seekFromPageX(e.nativeEvent.pageX)}
      >
        <View
          style={[
            mediaPlayerStyles.progressFill,
            { width: `${(progress || 0) * 100}%` },
          ]}
        />
      </View>
    </>
  );
}
