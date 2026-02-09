import React from "react";
import { View, Text, StyleSheet } from "react-native";
import layout from "../../styles/globalLayout";

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
});

export default function Footer() {
  return (
    <View>
      <View style={styles.line} />
      <View style={layout.footer}>
        <Text style={layout.footerText}>
          All rights reserved, Wellness USA. © {new Date().getFullYear()}
        </Text>
      </View>
    </View>
  );
}
