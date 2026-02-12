import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLayout } from "../styles/globalLayout";
import { textMuted, lineDivider } from "./brandColors";

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: lineDivider,
  },
  footer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: "center",
    flexShrink: 0,
  },
  footerTextTablet: {
    fontSize: 16,
    color: textMuted,
  },
  footerTextMobile: {
    fontSize: 15,
    color: textMuted,
  },
});

export default function FooterComponent({ isTablet }) {
  const layout = useLayout();
  const textStyle = isTablet
    ? styles.footerTextTablet
    : styles.footerTextMobile;
  return (
    <View style={layout.dispFooter}>
      <View style={layout.dispFooterCont}>
        <View style={styles.line} />
        <View style={styles.footer}>
          <Text style={textStyle}>
            All rights reserved, Wellness USA. © {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    </View>
  );
}
