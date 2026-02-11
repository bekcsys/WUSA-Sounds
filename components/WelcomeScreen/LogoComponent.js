import React from "react";
import { View, Image, StyleSheet, useWindowDimensions } from "react-native";

const TABLET_BREAKPOINT = 600;

function getWrapperStyle(width) {
  const isTablet = width >= TABLET_BREAKPOINT;
  return {
    borderWidth: isTablet ? 3 : 2,
    borderRadius: isTablet ? 20 : 12,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  };
}

export default function LogoComponent({ source, width, height }) {
  const { width: screenWidth } = useWindowDimensions();
  const wrapperStyle = getWrapperStyle(screenWidth);
  const borderOffset = (wrapperStyle.borderWidth || 2) * 2;

  return (
    <View
      style={[
        styles.wrapperBase,
        wrapperStyle,
        {
          width: width + borderOffset,
          height: height + borderOffset,
        },
      ]}
    >
      <Image
        source={source}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperBase: {
    alignItems: "center",
    justifyContent: "center",
  },
});
