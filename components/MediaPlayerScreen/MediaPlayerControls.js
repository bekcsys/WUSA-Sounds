import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { navyPrimary } from "../brandColors";
import mediaPlayerStyles from "./mediaPlayerStyles";

function ControlButton({ label, iconName, onPress, layout }) {
  const size = layout?.controlSize ?? 80;
  const iconSize = layout?.controlIconSize ?? 32;
  const labelSize = layout?.controlLabelFontSize ?? 12;
  return (
    <TouchableOpacity
      style={mediaPlayerStyles.controlBtnWrap}
      onPress={onPress}
    >
      <View
        style={[
          mediaPlayerStyles.controlIconWrap,
          { width: size, minHeight: iconSize },
        ]}
      >
        <MaterialIcons
          name={iconName}
          size={iconSize}
          color={navyPrimary}
        />
      </View>
      <Text style={[mediaPlayerStyles.controlLabel, { fontSize: labelSize }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function MediaPlayerControls({
  isTablet,
  layout,
  isPlaying,
  isShuffleOn,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onShuffle,
}) {
  const rowStyle = [
    mediaPlayerStyles.controlsRow,
    isTablet && mediaPlayerStyles.controlsRowTablet,
    layout?.controlGap != null && { gap: layout.controlGap },
  ];
  return (
    <View style={rowStyle}>
      <ControlButton
        label="Prev"
        iconName="skip-previous"
        onPress={onPrev}
        layout={layout}
      />
      <ControlButton
        label={isPlaying ? "Pause" : "Play"}
        iconName={isPlaying ? "pause" : "play-arrow"}
        onPress={isPlaying ? onPause : onPlay}
        layout={layout}
      />
      <ControlButton
        label="Next"
        iconName="skip-next"
        onPress={onNext}
        layout={layout}
      />
      <ControlButton
        label={isShuffleOn ? "Shuffle on" : "Shuffle"}
        iconName={isShuffleOn ? "shuffle" : "format-list-numbered"}
        onPress={onShuffle}
        layout={layout}
      />
    </View>
  );
}
