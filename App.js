import React, { useRef, useState } from "react";
import {
  View,
  StatusBar,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { C3bGreyContainer, C3cButtonsL1 } from "./components/Root-Top";
import C1RootTop from "./components/Root-Top";
import C1RootBottomFooter from "./components/xRoot-Footer/C1Root-Bottom-Footer";
import layout from "./styles/globalLayout";
import scrollButtons from "./styles/scrollButtons";
import {
  getCardLayout,
  getLogoSize,
  getButtonStripStyles,
  getMobileGridStyles,
} from "./styles/appLayout";

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
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const isTabletPortrait = isTablet && height >= width;

  const cardLayout = getCardLayout(isTablet, width, height);
  const gridPadding = isTablet ? 24 : 16;
  const gap = isTablet ? 28 : 20;
  const { companyLogoHeight, companyLogoWidth, logoMarginBottom } =
    getLogoSize(isTablet);
  const logoAreaHeight = companyLogoHeight + logoMarginBottom;
  const contentWidth = isTablet ? width : cardLayout.width;
  const contentHeight = isTablet ? height : cardLayout.height;
  const strip = getButtonStripStyles(
    isTablet,
    contentWidth,
    contentHeight,
    gridPadding,
    gap,
    logoAreaHeight,
  );
  const mobileGrid = getMobileGridStyles(
    width,
    height,
    gridPadding,
    gap,
    logoAreaHeight,
  );
  const scrollRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollStep = contentWidth * 0.6;

  const scrollLeft = () => {
    const next = Math.max(0, scrollOffset - scrollStep);
    scrollRef.current?.scrollTo({ x: next, animated: true });
    setScrollOffset(next);
  };
  const scrollRight = () => {
    const next = Math.min(strip.maxScroll, scrollOffset + scrollStep);
    scrollRef.current?.scrollTo({ x: next, animated: true });
    setScrollOffset(next);
  };

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
          {isTabletPortrait ? (
            <C3bGreyContainer
              isTabletPortrait
              options={OPTIONS}
              onPress={() => {}}
            />
          ) : isTablet ? (
            <View style={layout.tabletButtonsSection}>
              <C3bGreyContainer
                style={[
                  layout.buttonsContainerTablet,
                  { width: strip.rowWidth + 65 },
                ]}
              >
                <View style={[layout.buttonsGrid, layout.buttonsGridScroll]}>
                  {strip.maxScroll > 0 && scrollOffset > 0 && (
                    <TouchableOpacity
                      onPress={scrollLeft}
                      style={scrollButtons.left}
                      activeOpacity={0.8}
                    >
                      <Text style={scrollButtons.text}>{"<"}</Text>
                    </TouchableOpacity>
                  )}
                  <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                      layout.scrollContent,
                      strip.maxScroll === 0 && layout.scrollContentCentered,
                    ]}
                    style={layout.scrollView}
                    onScroll={(e) =>
                      setScrollOffset(e.nativeEvent.contentOffset.x)
                    }
                    scrollEventThrottle={16}
                  >
                    <View style={strip.rowStyle}>
                      {OPTIONS.map((opt) => (
                        <C3cButtonsL1
                          key={opt.id}
                          logo={opt.logo}
                          label={opt.label}
                          onPress={() => {}}
                          size={strip.displaySize}
                          containerStyle={strip.cellStyle}
                        />
                      ))}
                    </View>
                  </ScrollView>
                  {strip.maxScroll > 0 &&
                    scrollOffset < strip.maxScroll - 1 && (
                      <TouchableOpacity
                        onPress={scrollRight}
                        style={scrollButtons.right}
                        activeOpacity={0.8}
                      >
                        <Text style={scrollButtons.text}>{">"}</Text>
                      </TouchableOpacity>
                    )}
                </View>
              </C3bGreyContainer>
            </View>
          ) : (
            <C3bGreyContainer>
              <View style={[layout.buttonsGrid, mobileGrid.gridStyle]}>
                {OPTIONS.map((opt) => (
                  <C3cButtonsL1
                    key={opt.id}
                    logo={opt.logo}
                    label={opt.label}
                    onPress={() => {}}
                    size={mobileGrid.displaySize}
                    containerStyle={mobileGrid.cellStyle}
                  />
                ))}
              </View>
            </C3bGreyContainer>
          )}
          </C1RootTop>
        </View>
      </View>
      <C1RootBottomFooter isTablet={isTablet} />
    </SafeAreaView>
  );
}
