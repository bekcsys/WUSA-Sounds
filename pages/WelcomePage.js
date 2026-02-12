import React, { useCallback } from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import C1RootTop from "../components";
import WelcomeScreenContainer from "../components/WelcomeScreen/WelcomeScreenContainer";
import FooterComponent from "../components/FooterComponent";
import { solfeggioTracks } from "../components/MediaPlayerScreen/solfeggioTracks";
import { triBowlTracks } from "../components/MediaPlayerScreen/triBowlTracks";
import { useLayout, TABLET_BREAKPOINT } from "../styles/globalLayout";
import { getLogoSize } from "../styles/appLayout";

const WUSALogo = require("../assets/images/L01-WUSA.png");
const SaunaControlLogo = require("../assets/images/SunaControlLogo.png");
const SolfeggioLogo = require("../assets/images/SoundFreqenciesLogo.png");
const EntertainmentLogo = require("../assets/images/EntertinmnetLogo.png");

const MEDIA_TRACKS = { solfeggio: solfeggioTracks, tribowl: triBowlTracks };
const MEDIA_IDS = Object.keys(MEDIA_TRACKS);

const OPTIONS = [
  { id: "sauna", label: "Sauna Control", logo: SaunaControlLogo },
  { id: "solfeggio", label: "Solfeggio Sounds", logo: SolfeggioLogo },
  { id: "tribowl", label: "Tri Bowl", logo: SolfeggioLogo },
  { id: "entertainment", label: "Entertainment", logo: EntertainmentLogo },
];

export default function WelcomePage({ onOpenMediaPlayer }) {
  const layout = useLayout();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const { companyLogoHeight, companyLogoWidth } = getLogoSize(isTablet, width, false);

  const handleOptionPress = useCallback(
    (opt) => {
      if (!MEDIA_IDS.includes(opt.id)) return;
      onOpenMediaPlayer(opt.label, MEDIA_TRACKS[opt.id] ?? []);
    },
    [onOpenMediaPlayer],
  );

  return (
    <SafeAreaView style={layout.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <View style={layout.displayArea}>
        <C1RootTop
          logoSource={WUSALogo}
          logoWidth={companyLogoWidth}
          logoHeight={companyLogoHeight}
          compactHeader={false}
        >
          <WelcomeScreenContainer
            options={OPTIONS}
            onOptionPress={handleOptionPress}
          />
        </C1RootTop>
        <FooterComponent isTablet={isTablet} />
      </View>
    </SafeAreaView>
  );
}
