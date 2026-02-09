import React from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";

export const BRAND_COLOR = "rgb(206, 25, 60)";
export const NAVY_BORDER = "#001f3f";

export function getRedBoxStyle(size) {
  const redBoxSize = Math.round(size * 0.88);
  const redBoxRadius = Math.round(redBoxSize * 0.28);
  return {
    width: redBoxSize,
    height: redBoxSize,
    borderRadius: redBoxRadius,
    backgroundColor: BRAND_COLOR,
    borderWidth: 3,
    borderColor: NAVY_BORDER,
  };
}

export function getLogoSize(size) {
  const redBoxSize = Math.round(size * 0.88);
  return Math.round(redBoxSize * 0.68);
}

const buttonsL1Styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {},
  label: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    maxWidth: "100%",
  },
});

export default function C3cButtonsL1({ logo, label, onPress, size, containerStyle }) {
  const logoSize = getLogoSize(size);
  const redBoxStyle = getRedBoxStyle(size);

  return (
    <TouchableOpacity
      style={[buttonsL1Styles.cell, { width: size }, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[buttonsL1Styles.inner, redBoxStyle]}>
        <Image
          source={logo}
          style={[buttonsL1Styles.logo, { width: logoSize, height: logoSize }]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={buttonsL1Styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
        adjustsFontSizeToFit
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
