import React, { useRef, useState } from "react";
import {
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import C1RootTop from "./C1Root-Top";
import { C3bGreyContainer, C3cButtonsL1 } from "./index";
import MediaPlayerScreen from "./MediaPlayerScreen/MediaPlayerScreen";
import MediaPlayerScreenErrorBoundary from "./MediaPlayerScreen/MediaPlayerScreenErrorBoundary";
import { OPTIONS, WELCOME_LOGO } from "./welcomeConfig";
import layout from "../../styles/globalLayout";
import scrollButtons from "../../styles/scrollButtons";
import {
  getCardLayout,
  getLogoSize,
  getButtonStripStyles,
  getMobileGridStyles,
} from "../../styles/appLayout";

const TABLET_BREAKPOINT = 600;

export default function RootTopContainer() {
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
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const scrollStep = contentWidth * 0.6;

  const handleOptionPress = (opt) => {
    if (opt.id === "solfeggio") {
      setShowMediaPlayer(true);
    }
  };

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

  if (showMediaPlayer) {
    const goBack = () => setShowMediaPlayer(false);
    return (
      <MediaPlayerScreenErrorBoundary onBack={goBack}>
        <MediaPlayerScreen onBack={goBack} />
      </MediaPlayerScreenErrorBoundary>
    );
  }

  return (
    <C1RootTop
      logoSource={WELCOME_LOGO}
      logoWidth={companyLogoWidth}
      logoHeight={companyLogoHeight}
      logoMarginBottom={logoMarginBottom}
      isTablet={isTablet}
    >
      {isTabletPortrait ? (
        <C3bGreyContainer
          isTabletPortrait
          options={OPTIONS}
          onPress={handleOptionPress}
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
                      onPress={() => handleOptionPress(opt)}
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
                onPress={() => handleOptionPress(opt)}
                size={mobileGrid.displaySize}
                containerStyle={mobileGrid.cellStyle}
              />
            ))}
          </View>
        </C3bGreyContainer>
      )}
    </C1RootTop>
  );
}
