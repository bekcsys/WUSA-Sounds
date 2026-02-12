import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { navyPrimary, BRAND_COLOR } from "../brandColors";
import mediaPlayerStyles from "./mediaPlayerStyles";

function ControlButton({ label, iconName, onPress, layout, iconColor, labelColor }) {
  const size = layout?.controlSize ?? 80;
  const iconSize = layout?.controlIconSize ?? 32;
  const labelSize = layout?.controlLabelFontSize ?? 12;
  const iconClr = iconColor ?? navyPrimary;
  const textClr = labelColor ?? undefined;
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
          color={iconClr}
        />
      </View>
      <Text
        style={[
          mediaPlayerStyles.controlLabel,
          { fontSize: labelSize },
          textClr != null && { color: textClr },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function MediaPlayerControls({
  isTablet,
  layout,
  isPlaying,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onBack,
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
      {isTablet && onBack != null && (
        <ControlButton
          label="Home"
          iconName="home"
          onPress={onBack}
          layout={layout}
          iconColor={BRAND_COLOR}
          labelColor={BRAND_COLOR}
        />
      )}
    </View>
  );
}
