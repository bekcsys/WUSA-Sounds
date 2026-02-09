import React from "react";
import { View, StyleSheet } from "react-native";
import Footer from "./Footer";

export default function C1RootBottomFooter({ isTablet }) {
  return (
    <View style={styles.root}>
      <Footer isTablet={isTablet} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexShrink: 0,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "red",
  },
});
