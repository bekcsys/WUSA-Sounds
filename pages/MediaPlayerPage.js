import React from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import C1RootTop from "../components";
import MediaPlayerScreenContainer from "../components/MediaPlayerScreen/MediaPlayerScreenContainer";
import FooterComponent from "../components/FooterComponent";
import { useLayout, TABLET_BREAKPOINT } from "../styles/globalLayout";
import { getLogoSize } from "../styles/appLayout";

const WUSALogo = require("../assets/images/L01-WUSA.png");
const ThumbnailSolfeg = require("../assets/images/Thumbnail - solfeg.png");
const ThumbnailTriBowl = require("../assets/images/Thumbnail - TriBowl.jpg");
const ThumbnailAmbient = require("../assets/images/Thumbnail - Ambeint.png");

function getVisualizationImage(title) {
  if (title === "TriBowl Sounds") return ThumbnailTriBowl;
  if (title === "Ambient Sounds") return ThumbnailAmbient;
  return ThumbnailSolfeg;
}

export default function MediaPlayerPage({ title, tracks, onBack, playback }) {
  const layout = useLayout();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const { companyLogoHeight, companyLogoWidth } = getLogoSize(
    isTablet,
    width,
    true,
  );
  const visualizationImage = getVisualizationImage(title);

  return (
    <SafeAreaView style={layout.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <View style={layout.displayArea}>
        <C1RootTop
          logoSource={WUSALogo}
          logoWidth={companyLogoWidth}
          logoHeight={companyLogoHeight}
          compactHeader={true}
        >
          <MediaPlayerScreenContainer
            title={title}
            onBack={onBack}
            tracks={tracks}
            visualizationImage={visualizationImage}
            playback={playback}
          />
        </C1RootTop>
        <FooterComponent isTablet={isTablet} />
      </View>
    </SafeAreaView>
  );
}
