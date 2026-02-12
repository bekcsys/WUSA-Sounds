import React from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import C1RootTop from "../components";
import MediaPlayerScreenContainer from "../components/MediaPlayerScreen/MediaPlayerScreenContainer";
import FooterComponent from "../components/FooterComponent";
import { useLayout, TABLET_BREAKPOINT } from "../styles/globalLayout";
import { getLogoSize } from "../styles/appLayout";

const WUSALogo = require("../assets/images/L01-WUSA.png");
const SolfegVisualizationImage = require("../assets/images/solfeg.png");
const TriBowlVisualizationImage = require("../assets/images/triB.jpg");

export default function MediaPlayerPage({ title, tracks, onBack }) {
  const layout = useLayout();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const { companyLogoHeight, companyLogoWidth } = getLogoSize(
    isTablet,
    width,
    true,
  );
  const visualizationImage =
    title === "Tri Bowl" ? TriBowlVisualizationImage : SolfegVisualizationImage;

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
          />
        </C1RootTop>
        <FooterComponent isTablet={isTablet} />
      </View>
    </SafeAreaView>
  );
}
