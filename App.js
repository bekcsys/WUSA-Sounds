import React, { useRef, useState } from "react";
import {
  View,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import OptionButton from "./components/OptionButton";
import layout from "./styles/globalLayout";

const WUSALogo = require("./assets/images/L01-WUSA.png");
const BackgroundImage = require("./assets/images/Background-new.png");
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
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  const cardWidth = isTablet ? Math.min(width * 0.82, 720) : width * 0.92;
  const cardHeight = isTablet ? height * 0.78 : cardWidth;

  const cardLayout = {
    width: cardWidth,
    height: cardHeight,
  };

  const gridPadding = isTablet ? 24 : 16;
  const gap = isTablet ? 28 : 20;
  const labelHeight = 26;
  const logoMarginBottom = isTablet ? 36 : 12;
  const companyLogoHeight = isTablet ? 180 : 100;
  const companyLogoWidth = isTablet ? 360 : 220;
  const logoAreaHeight = companyLogoHeight + logoMarginBottom;

  const columns = 4;
  const gapCount = columns - 1;
  const availableGridWidth = cardWidth - gridPadding * 2 - gap * gapCount;
  const availableGridHeight = cardHeight - gridPadding * 2 - logoAreaHeight - labelHeight * 2;
  const rawButtonSize = availableGridWidth / columns;
  const rowContentHeight = 34;
  const maxButtonSizeFromHeight = Math.floor((availableGridHeight - rowContentHeight) / 0.88);
  const maxButtonSizeTablet = 115;
  const minButtonSizeMobile = 68;
  const buttonSizeRaw = Math.min(
    rawButtonSize,
    maxButtonSizeFromHeight,
    isTablet ? maxButtonSizeTablet : rawButtonSize
  );
  let buttonSize = Math.round(buttonSizeRaw * 0.82);
  if (!isTablet && buttonSize < minButtonSizeMobile) {
    buttonSize = minButtonSizeMobile;
  }
  if (!isTablet && buttonSize > maxButtonSizeFromHeight) {
    buttonSize = Math.max(minButtonSizeMobile, maxButtonSizeFromHeight);
  }

  const maxDisplayByHeight = Math.floor((availableGridHeight - rowContentHeight) / 0.88);
  const displaySize = Math.min(buttonSize * 2, maxDisplayByHeight);
  const rowWidth = displaySize * columns + gap * gapCount;
  const cellStyle = { width: displaySize, marginBottom: 0 };

  const rowStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    width: rowWidth,
    marginBottom: gap,
  };

  const scrollRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollStep = cardWidth * 0.6;
  const maxScroll = Math.max(0, rowWidth - (cardWidth - gridPadding * 2));

  const scrollLeft = () => {
    const next = Math.max(0, scrollOffset - scrollStep);
    scrollRef.current?.scrollTo({ x: next, animated: true });
    setScrollOffset(next);
  };
  const scrollRight = () => {
    const next = Math.min(maxScroll, scrollOffset + scrollStep);
    scrollRef.current?.scrollTo({ x: next, animated: true });
    setScrollOffset(next);
  };

  return (
    <SafeAreaView style={layout.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={BackgroundImage}
        style={layout.background}
        imageStyle={layout.backgroundImageStyle}
      >
        <View style={layout.container}>
          <View style={[layout.card, layout.cardShadow, cardLayout, isTablet ? null : layout.cardMobile]}>
            <View style={[layout.welcomeLogoArea, { marginBottom: logoMarginBottom }]}>
              <Image
                source={WUSALogo}
                style={{ width: companyLogoWidth, height: companyLogoHeight }}
                resizeMode="contain"
              />
            </View>
            <View style={[layout.buttonsGrid, { width: "100%", position: "relative", overflow: "hidden" }]}>
              {maxScroll > 0 && scrollOffset > 0 && (
                <TouchableOpacity
                  onPress={scrollLeft}
                  style={scrollButtonLeft}
                  activeOpacity={0.8}
                >
                  <Text style={scrollButtonText}>{"<"}</Text>
                </TouchableOpacity>
              )}
              <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center" }}
                style={{ width: "100%", overflow: "hidden" }}
                onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.x)}
                scrollEventThrottle={16}
              >
                <View style={rowStyle}>
                  {OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.id}
                      logo={opt.logo}
                      label={opt.label}
                      onPress={() => {}}
                      size={displaySize}
                      containerStyle={cellStyle}
                    />
                  ))}
                </View>
              </ScrollView>
              {maxScroll > 0 && scrollOffset < maxScroll - 1 && (
                <TouchableOpacity
                  onPress={scrollRight}
                  style={scrollButtonRight}
                  activeOpacity={0.8}
                >
                  <Text style={scrollButtonText}>{">"}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const scrollButtonLeft = {
  position: "absolute",
  left: 4,
  bottom: 8,
  zIndex: 10,
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "rgba(0,0,0,0.15)",
  justifyContent: "center",
  alignItems: "center",
};
const scrollButtonRight = {
  position: "absolute",
  right: 4,
  bottom: 8,
  zIndex: 10,
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "rgba(0,0,0,0.15)",
  justifyContent: "center",
  alignItems: "center",
};
const scrollButtonText = {
  color: "rgba(0,0,0,0.5)",
  fontSize: 16,
  fontWeight: "600",
};
