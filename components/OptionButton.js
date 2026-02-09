import React from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";

const BRAND_COLOR = "rgb(206, 25, 60)";
const NAVY_BORDER = "#001f3f";

export default function OptionButton({ logo, label, onPress, size, containerStyle }) {
  const redBoxSize = Math.round(size * 0.88);
  const redBoxRadius = Math.round(redBoxSize * 0.28);
  const logoSize = Math.round(redBoxSize * 0.68);

  const redBoxStyle = {
    width: redBoxSize,
    height: redBoxSize,
    borderRadius: redBoxRadius,
    backgroundColor: BRAND_COLOR,
    borderWidth: 3,
    borderColor: NAVY_BORDER,
  };

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
      <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail" adjustsFontSizeToFit>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {},
  label: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    maxWidth: "100%",
  },
});
