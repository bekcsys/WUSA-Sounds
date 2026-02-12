import React, { useState } from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import C1RootTop from "./components";
import WelcomeScreenContainer from "./components/WelcomeScreen/WelcomeScreenContainer";
import MediaPlayerScreenContainer from "./components/MediaPlayerScreen/MediaPlayerScreenContainer";
import { solfeggioTracks } from "./components/MediaPlayerScreen/solfeggioTracks";
import { triBowlTracks } from "./components/MediaPlayerScreen/triBowlTracks";
import FooterComponent from "./components/FooterComponent";
import { useLayout } from "./styles/globalLayout";
import { getLogoSize } from "./styles/appLayout";

const WUSALogo = require("./assets/images/L01-WUSA.png");
const SaunaControlLogo = require("./assets/images/SunaControlLogo.png");
const SolfeggioLogo = require("./assets/images/SoundFreqenciesLogo.png");
const EntertainmentLogo = require("./assets/images/EntertinmnetLogo.png");
const SolfegVisualizationImage = require("./assets/images/solfeg.png");

const TABLET_BREAKPOINT = 600;

const OPTIONS = [
  { id: "sauna", label: "Sauna Control", logo: SaunaControlLogo },
  { id: "solfeggio", label: "Solfeggio Sounds", logo: SolfeggioLogo },
  { id: "tribowl", label: "Tri Bowl", logo: SolfeggioLogo },
  { id: "entertainment", label: "Entertainment", logo: EntertainmentLogo },
];

export default function App() {
  const layout = useLayout();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [mediaPlayerTitle, setMediaPlayerTitle] = useState("");
  const [mediaPlayerTracks, setMediaPlayerTracks] = useState([]);

  const { companyLogoHeight, companyLogoWidth } =
    getLogoSize(isTablet, width, showMediaPlayer);

  const handleOptionPress = (opt) => {
    const mediaIds = ["solfeggio", "tribowl"];
    if (mediaIds.includes(opt.id)) {
      setMediaPlayerTitle(opt.label);
      const tracksById = {
        solfeggio: solfeggioTracks,
        tribowl: triBowlTracks,
      };
      setMediaPlayerTracks(tracksById[opt.id] || []);
      setShowMediaPlayer(true);
    }
  };

  const content = showMediaPlayer ? (
    <MediaPlayerScreenContainer
      title={mediaPlayerTitle}
      onBack={() => setShowMediaPlayer(false)}
      tracks={mediaPlayerTracks}
      visualizationImage={SolfegVisualizationImage}
    />
  ) : (
    <WelcomeScreenContainer
      options={OPTIONS}
      onOptionPress={handleOptionPress}
    />
  );

  return (
    <SafeAreaView style={layout.safeArea} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" />
      <View style={layout.displayArea}>
          <C1RootTop
            logoSource={WUSALogo}
            logoWidth={companyLogoWidth}
            logoHeight={companyLogoHeight}
            compactHeader={showMediaPlayer}
          >
            {content}
          </C1RootTop>
        <FooterComponent isTablet={isTablet} />
      </View>
    </SafeAreaView>
  );
}
