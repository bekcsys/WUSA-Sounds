import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  getTabletPortraitGridStyles,
  getTabletPortraitDisplaySize,
} from "../../styles/appLayout";
import ButtonComponent, { buttonLayoutStyles } from "./ButtonComponent";

const TABLET_PORTRAIT_GAP = 20;

export default function MenuButtonsContainer({
  children,
  style,
  isTabletPortrait,
  options,
  onPress = () => {},
}) {
  const { width } = useWindowDimensions();
  const isPortraitLayout = isTabletPortrait && options && options.length > 0;

  if (isPortraitLayout) {
    const displaySize = getTabletPortraitDisplaySize(width);
    const portraitGrid = getTabletPortraitGridStyles(
      TABLET_PORTRAIT_GAP,
      displaySize,
    );
    return (
      <View style={[style, styles.root]}>
        <View style={[buttonLayoutStyles.buttonsGrid, portraitGrid.gridStyle]}>
          {options.map((opt) => (
            <ButtonComponent
              key={opt.id}
              logo={opt.logo}
              label={opt.label}
              onPress={() => onPress(opt)}
              size={portraitGrid.displaySize}
              containerStyle={portraitGrid.cellStyle}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={[style, styles.root]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 25,
    marginTop: 8,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
});
