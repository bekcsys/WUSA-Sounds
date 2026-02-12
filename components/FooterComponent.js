import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLayout } from "../styles/globalLayout";
import { lineDivider } from "./brandColors";

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
  footerMobile: {
    marginTop: 18,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: "center",
    flexShrink: 0,
  },
  footerTextTablet: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.22)",
  },
  footerTextMobile: {
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.22)",
  },
});

export default function FooterComponent({ isTablet }) {
  const layout = useLayout();
  const textStyle = isTablet
    ? styles.footerTextTablet
    : styles.footerTextMobile;
  const footerBoxStyle = isTablet ? styles.footer : styles.footerMobile;
  return (
    <View style={layout.dispFooter}>
      <View style={layout.dispFooterCont}>
        <View style={styles.line} />
        <View style={footerBoxStyle}>
          <Text style={textStyle}>
            All rights reserved, Wellness USA. © {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    </View>
  );
}
