import React from "react";
import { View, StyleSheet } from "react-native";
import layout from "../../../../styles/globalLayout";
import { getTabletPortraitGridStyles } from "../../../../styles/appLayout";
import C3cButtonsL1 from "./C3c-buttonsL1";

const TABLET_PORTRAIT_BUTTON_SIZE = 210;
const TABLET_PORTRAIT_GAP = 20;

export default function C3bGreyContainer({
  children,
  style,
  isTabletPortrait,
  options,
  onPress = () => {},
}) {
  const isPortraitLayout = isTabletPortrait && options && options.length > 0;

  if (isPortraitLayout) {
    const portraitGrid = getTabletPortraitGridStyles(
      TABLET_PORTRAIT_GAP,
      TABLET_PORTRAIT_BUTTON_SIZE,
    );
    return (
      <View style={[layout.buttonsContainer, style, styles.root]}>
        <View style={[layout.buttonsGrid, portraitGrid.gridStyle]}>
          {options.map((opt) => (
            <C3cButtonsL1
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
    <View style={[layout.buttonsContainer, style, styles.root]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    maxWidth: "100%",
    maxHeight: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
});
