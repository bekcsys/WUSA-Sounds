import React from "react";
import { View, StyleSheet } from "react-native";

export default function C3ButtonContainer({ isTablet, children }) {
  return (
    <View style={styles.root}>
      <View style={[styles.inner, !isTablet && styles.innerMobile]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "blue",
  },
  inner: {
    flex: 1,
    width: "100%",
    minHeight: 0,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  innerMobile: {
    flex: 0,
    alignSelf: "stretch",
    paddingVertical: 16,
  },
});
