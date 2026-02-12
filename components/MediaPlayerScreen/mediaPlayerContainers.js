import React from "react";
import { View } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";
import { brandCard } from "../brandColors";
import { layoutConstants } from "../../styles/globalLayoutTablet";

export function getRootStyle(layout, isTablet, isTabletPortrait) {
  return [
    mediaPlayerStyles.container,
    {
      backgroundColor: layoutConstants.appBackground,
      padding: layout.contentPadding,
      justifyContent: isTablet ? "center" : "flex-end",
      flex: 1,
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

export function getControlsStyle(layout, isTablet) {
  return [
    mediaPlayerStyles.controlsOuterContainer,
    isTablet && mediaPlayerStyles.controlsOuterContainerTablet,
    {
      backgroundColor: brandCard,
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
