import React from "react";
import { View } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";

const rootContainerColor = "#f5f7fa";

export function getRootStyle(layout, isTablet, isTabletPortrait) {
  return [
    mediaPlayerStyles.container,
    {
      backgroundColor: rootContainerColor,
      padding: layout.contentPadding,
      justifyContent: isTablet ? "center" : "flex-start",
      flex: isTablet ? 1 : 0,
      alignSelf: "stretch",
      ...(isTabletPortrait && {
        paddingTop: 24,
        paddingBottom: 10,
      }),
    },
  ];
}

export function getMediaTimeStyle(layout) {
  return [
    mediaPlayerStyles.progressSection,
    { maxWidth: layout.maxContentWidth },
  ];
}

const controlsContainerColor = "#ffffff";

export function getControlsStyle(layout, isTablet) {
  return [
    mediaPlayerStyles.controlsOuterContainer,
    isTablet && mediaPlayerStyles.controlsOuterContainerTablet,
    {
      backgroundColor: controlsContainerColor,
      paddingVertical: layout.controlsPaddingVertical,
      paddingHorizontal: layout.controlsPaddingHorizontal,
      marginBottom: 0,
      borderRadius: layout.controlsBorderRadius,
      maxWidth: layout.maxContentWidth,
    },
  ];
}

export function MediaPlayerRootContainer({ style, children }) {
  return <View style={style}>{children}</View>;
}

export function MediaTimeContainer({ style, children }) {
  return <View style={style}>{children}</View>;
}

export function MediaControlsContainer({ style, children }) {
  return <View style={style}>{children}</View>;
}
