import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BRAND_COLOR } from "../brandColors";
import mediaPlayerStyles from "./mediaPlayerStyles";

export default function HomeButtonContent({ onPress, homeLabelFontSize }) {
  const labelStyle = [
    mediaPlayerStyles.homeButtonLabel,
    homeLabelFontSize != null && { fontSize: homeLabelFontSize },
    { color: BRAND_COLOR },
  ];
  return (
    <TouchableOpacity
      style={mediaPlayerStyles.homeButtonTouchable}
      onPress={onPress}
    >
      <MaterialIcons name="home" size={34} color={BRAND_COLOR} />
      <Text style={labelStyle}>Home</Text>
    </TouchableOpacity>
  );
}
