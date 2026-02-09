import React from "react";
import { View, StyleSheet } from "react-native";
import Footer from "./Footer";

export default function C1RootBottomFooter() {
  return (
    <View style={styles.root}>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexShrink: 0,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "blue",
  },
});
