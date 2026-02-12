import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { isSmallTablet } from "../../styles/appLayout";
import { BRAND_COLOR, NAVY_BORDER, textPrimary } from "../brandColors";

const TABLET_BREAKPOINT = 600;

export function getRedBoxStyle(size) {
  const redBoxSize = Math.round(size * 0.88);
  const redBoxRadius = Math.round(redBoxSize * 0.28);
  return {
    width: redBoxSize,
    height: redBoxSize,
    borderRadius: redBoxRadius,
    backgroundColor: BRAND_COLOR,
    borderWidth: 3,
    borderColor: NAVY_BORDER,
  };
}

export function getLogoSize(size) {
  const redBoxSize = Math.round(size * 0.88);
  return Math.round(redBoxSize * 0.68);
}

function getLabelStyle(width) {
  const isTablet = width >= TABLET_BREAKPOINT;
  const small = isTablet && isSmallTablet(width);
  if (!isTablet) {
    return { marginTop: 6, fontSize: 14 };
  }
  if (small) {
    return { marginTop: 7, fontSize: 16 };
  }
  return { marginTop: 8, fontSize: 18 };
}

export const buttonLayoutStyles = StyleSheet.create({
  buttonsGrid: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonsGridScroll: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  scrollView: {
    width: "100%",
    overflow: "hidden",
  },
  scrollContent: {
    alignItems: "center",
  },
  scrollContentCentered: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {},
  labelBase: {
    fontWeight: "600",
    color: textPrimary,
    textAlign: "center",
    maxWidth: "100%",
  },
});

export default function ButtonComponent({ logo, label, onPress, size, containerStyle }) {
  const { width } = useWindowDimensions();
  const logoSize = getLogoSize(size);
  const redBoxStyle = getRedBoxStyle(size);
  const labelStyle = getLabelStyle(width);

  return (
    <TouchableOpacity
      style={[styles.cell, { width: size }, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.inner, redBoxStyle]}>
        <Image
          source={logo}
          style={[styles.logo, { width: logoSize, height: logoSize }]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[styles.labelBase, labelStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
        adjustsFontSizeToFit
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
