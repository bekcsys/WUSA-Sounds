import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import mediaPlayerStyles, { navyPrimary } from "./mediaPlayerStyles";

export default function HomeButtonContent({ onPress, homeLabelFontSize }) {
  const labelStyle = [
    mediaPlayerStyles.homeButtonLabel,
    homeLabelFontSize != null && { fontSize: homeLabelFontSize },
  ];
  return (
    <TouchableOpacity
      style={mediaPlayerStyles.homeButtonTouchable}
      onPress={onPress}
    >
      <MaterialIcons name="home" size={34} color={navyPrimary} />
      <Text style={labelStyle}>Home</Text>
    </TouchableOpacity>
  );
}
