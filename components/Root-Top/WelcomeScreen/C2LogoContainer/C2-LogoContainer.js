import React from "react";
import { View, StyleSheet } from "react-native";
import layout from "../../../../styles/globalLayout";
import C2bLogo from "./C2b-Logo";

const styles = StyleSheet.create({
  debug: {
    borderWidth: 0,
    borderColor: "blue",
    width: "100%",
  },
  container: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 40,
    paddingBottom: 6,
  },
});

export default function C2LogoContainer({ source, width, height, marginBottom }) {
  return (
    <View
      style={[
        layout.welcomeLogoArea,
        marginBottom != null && { marginBottom },
        styles.container,
        styles.debug,
      ]}
    >
      <C2bLogo source={source} width={width} height={height} />
    </View>
  );
}
