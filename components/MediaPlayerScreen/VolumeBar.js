import React, { useState, useRef } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { navyMuted } from "../../styles/brandColors";
import mediaPlayerStyles from "./mediaPlayerStyles";

function getVolumeIconName(volume) {
  if (volume <= 0) return "volume-off";
  if (volume < 0.5) return "volume-down";
  return "volume-up";
}

export default function VolumeBar({ volume, onVolumeChange, layout }) {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const value = Math.max(0, Math.min(1, volume));
  const volumeIconSize = layout?.volumeIconSize ?? 24;

  const handleLayout = (e) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) setTrackWidth(w);
  };

  const updateVolumeFromPageX = (pageX) => {
    trackRef.current?.measureInWindow((tx, ty, tw, th) => {
      if (tw <= 0) return;
      const localX = pageX - tx;
      const newVal = Math.max(0, Math.min(1, localX / tw));
      onVolumeChange?.(newVal);
    });
  };

  const handleResponderGrant = (e) => {
    setIsDragging(true);
    updateVolumeFromPageX(e.nativeEvent.pageX);
  };

  const handleResponderMove = (e) => {
    updateVolumeFromPageX(e.nativeEvent.pageX);
  };

  const handleResponderRelease = () => {
    setIsDragging(false);
  };

  const sectionStyle = [
    mediaPlayerStyles.volumeSection,
    layout?.maxContentWidth != null && { maxWidth: layout.maxContentWidth },
  ];
  const trackStyle = [
    mediaPlayerStyles.volumeTrack,
    isDragging && mediaPlayerStyles.volumeTrackActive,
  ];
  const fillStyle = [
    mediaPlayerStyles.volumeFill,
    isDragging && mediaPlayerStyles.volumeFillActive,
    { width: `${value * 100}%` },
  ];
  const thumbStyle = [
    mediaPlayerStyles.volumeThumb,
    isDragging ? mediaPlayerStyles.volumeThumbActive : mediaPlayerStyles.volumeThumbDefault,
    { left: trackWidth > 0 ? value * trackWidth : 0 },
  ];
  return (
    <View style={sectionStyle}>
      <View style={mediaPlayerStyles.volumeRow}>
        <View style={mediaPlayerStyles.volumeIconWrap}>
          <MaterialIcons
            name={getVolumeIconName(value)}
            size={volumeIconSize}
            color={navyMuted}
          />
        </View>
        <View
          ref={trackRef}
          style={mediaPlayerStyles.volumeTrackWrap}
          onLayout={handleLayout}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleResponderGrant}
          onResponderMove={handleResponderMove}
          onResponderRelease={handleResponderRelease}
          onResponderTerminate={handleResponderRelease}
        >
          <View style={trackStyle}>
            <View style={fillStyle} />
            {trackWidth > 0 && (
              <View pointerEvents="none" style={thumbStyle} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
