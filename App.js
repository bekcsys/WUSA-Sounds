import React, { useState } from "react";
import { View, StatusBar, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import C1RootTop from "./components/Root-Top";
import WelcomeScreenContainer from "./components/Root-Top/WelcomeScreen/WelcomeScreenContainer";
import MediaPlayerScreenContainer from "./components/Root-Top/MediaPlayerScreen/MediaPlayerScreenContainer";
import C1RootBottomFooter from "./components/xRoot-Footer/C1Root-Bottom-Footer";
import layout from "./styles/globalLayout";
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
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const { companyLogoHeight, companyLogoWidth, logoMarginBottom } =
    getLogoSize(isTablet);

  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [mediaPlayerTitle, setMediaPlayerTitle] = useState("");

  const handleOptionPress = (opt) => {
    if (opt.id === "solfeggio" || opt.id === "ambient") {
      setMediaPlayerTitle(opt.label);
      setShowMediaPlayer(true);
    }
  };

  const content = showMediaPlayer ? (
    <MediaPlayerScreenContainer
      title={mediaPlayerTitle}
      onBack={() => setShowMediaPlayer(false)}
    />
  ) : (
    <WelcomeScreenContainer
      options={OPTIONS}
      onOptionPress={handleOptionPress}
    />
  );

  return (
    <SafeAreaView style={layout["safeArea-OuterLayout"]}>
      <StatusBar barStyle="dark-content" />
      <View style={layout.innerLayout}>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "stretch",
            marginBottom: 10,
          }}
        >
          <C1RootTop
            logoSource={WUSALogo}
            logoWidth={companyLogoWidth}
            logoHeight={companyLogoHeight}
            logoMarginBottom={logoMarginBottom}
            isTablet={isTablet}
          >
            {content}
          </C1RootTop>
        </View>
      </View>
      <C1RootBottomFooter isTablet={isTablet} />
    </SafeAreaView>
  );
}
