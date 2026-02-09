import React from "react";
import { View, Image, StyleSheet } from "react-native";

const BORDER_WIDTH = 3;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 3,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function C2bLogo({ source, width, height }) {
  return (
    <View style={[styles.wrapper, { width: width + BORDER_WIDTH * 2, height: height + BORDER_WIDTH * 2 }]}>
      <Image
        source={source}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
}
