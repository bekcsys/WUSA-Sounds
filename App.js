import React, { useState } from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import C1RootTop from "./components";
import WelcomeScreenContainer from "./components/WelcomeScreen/WelcomeScreenContainer";
import MediaPlayerScreenContainer from "./components/MediaPlayerScreen/MediaPlayerScreenContainer";
import { solfeggioTracks } from "./components/MediaPlayerScreen/solfeggioTracks";
import FooterComponent from "./components/FooterComponent";
import { useLayout } from "./styles/globalLayout";
import { getLogoSize } from "./styles/appLayout";

const WUSALogo = require("./assets/images/L01-WUSA.png");
const SaunaControlLogo = require("./assets/images/SunaControlLogo.png");
const SolfeggioLogo = require("./assets/images/SoundFreqenciesLogo.png");
const AmbientLogo = require("./assets/images/AmbinetSounds.png");
const EntertainmentLogo = require("./assets/images/EntertinmnetLogo.png");

const TABLET_BREAKPOINT = 600;

const OPTIONS = [
  { id: "sauna", label: "Sauna Control", logo: SaunaControlLogo },
  { id: "solfeggio", label: "Solfeggio Sounds", logo: SolfeggioLogo },
  { id: "ambient", label: "Ambient Sounds", logo: AmbientLogo },
  { id: "entertainment", label: "Entertainment", logo: EntertainmentLogo },
];

export default function App() {
  const layout = useLayout();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const { companyLogoHeight, companyLogoWidth } =
    getLogoSize(isTablet, width);

  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [mediaPlayerTitle, setMediaPlayerTitle] = useState("");
  const [mediaPlayerTracks, setMediaPlayerTracks] = useState([]);

  const handleOptionPress = (opt) => {
    if (opt.id === "solfeggio" || opt.id === "ambient") {
      setMediaPlayerTitle(opt.label);
      setMediaPlayerTracks(opt.id === "solfeggio" ? solfeggioTracks : []);
      setShowMediaPlayer(true);
    }
  };

  const content = showMediaPlayer ? (
    <MediaPlayerScreenContainer
      title={mediaPlayerTitle}
      onBack={() => setShowMediaPlayer(false)}
      tracks={mediaPlayerTracks}
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
          >
          {content}
        </C1RootTop>
        <FooterComponent isTablet={isTablet} />
      </View>
    </SafeAreaView>
  );
}
