import React from "react";
import { View, StyleSheet } from "react-native";
import layout from "../../../styles/globalLayout";

export default function C3bGreyContainer({ children, style }) {
  return (
    <View style={[layout.buttonsContainer, style, styles.root]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 3,
    borderColor: "black",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});
