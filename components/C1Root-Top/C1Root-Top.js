import React from "react";
import { View, StyleSheet } from "react-native";
import C2LogoContainer from "./C2LogoContainer/C2-LogoContainer";
import C3ButtonContainer from "./C3ButtonContainer/C3-ButtonContainer";

export default function C1RootTop({
  logoSource,
  logoWidth,
  logoHeight,
  logoMarginBottom,
  isTablet,
  children,
}) {
  return (
    <View style={styles.root}>
      <View style={[styles.topHalf, !isTablet && styles.topHalfMobile]}>
        <C2LogoContainer
          source={logoSource}
          width={logoWidth}
          height={logoHeight}
          marginBottom={logoMarginBottom}
        />
      </View>
      <View style={[styles.bottomHalf, !isTablet && styles.bottomHalfMobile]}>
        <C3ButtonContainer isTablet={isTablet}>{children}</C3ButtonContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    padding: 0,
    minHeight: 0,
    overflow: "hidden",
    borderWidth: 10,
    borderColor: "orange",
  },
  topHalf: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
  },
  topHalfMobile: {
    flex: 0.32,
  },
  bottomHalf: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    alignItems: "stretch",
    width: "100%",
  },
  bottomHalfMobile: {
    flex: 0.68,
  },
});
