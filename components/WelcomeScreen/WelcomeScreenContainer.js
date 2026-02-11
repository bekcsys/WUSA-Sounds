import React, { useRef, useState } from "react";
import {
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import MenuButtonsContainer from "./MenuButtonsContainer";
import ButtonComponent, { buttonLayoutStyles } from "./ButtonComponent";
import scrollButtons from "../../styles/scrollButtons";
import {
  getCardLayout,
  getLogoSize,
  getButtonStripStyles,
  getMobileGridStyles,
} from "../../styles/appLayout";

const TABLET_BREAKPOINT = 600;

export default function WelcomeScreenContainer({ options, onOptionPress }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const isTabletPortrait = isTablet && height >= width;

  const cardLayout = getCardLayout(isTablet, width, height);
  const gridPadding = isTablet ? 24 : 16;
  const gap = isTablet ? 28 : 20;
  const { companyLogoHeight, logoMarginBottom } = getLogoSize(isTablet, width);
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

  if (isTabletPortrait) {
    return (
      <MenuButtonsContainer
        isTabletPortrait
        options={options}
        onPress={onOptionPress}
      />
    );
  }

  if (isTablet) {
    return (
      <MenuButtonsContainer
        style={{ width: strip.rowWidth + 65 }}
      >
        <View style={[buttonLayoutStyles.buttonsGrid, buttonLayoutStyles.buttonsGridScroll]}>
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
              buttonLayoutStyles.scrollContent,
              strip.maxScroll === 0 && buttonLayoutStyles.scrollContentCentered,
            ]}
            style={buttonLayoutStyles.scrollView}
            onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.x)}
            scrollEventThrottle={16}
          >
            <View style={strip.rowStyle}>
              {options.map((opt) => (
                <ButtonComponent
                  key={opt.id}
                  logo={opt.logo}
                  label={opt.label}
                  onPress={() => onOptionPress(opt)}
                  size={strip.displaySize}
                  containerStyle={strip.cellStyle}
                />
              ))}
            </View>
          </ScrollView>
          {strip.maxScroll > 0 && scrollOffset < strip.maxScroll - 1 && (
            <TouchableOpacity
              onPress={scrollRight}
              style={scrollButtons.right}
              activeOpacity={0.8}
            >
              <Text style={scrollButtons.text}>{">"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </MenuButtonsContainer>
    );
  }

  return (
    <MenuButtonsContainer>
      <View style={[buttonLayoutStyles.buttonsGrid, mobileGrid.gridStyle]}>
        {options.map((opt) => (
          <ButtonComponent
            key={opt.id}
            logo={opt.logo}
            label={opt.label}
            onPress={() => onOptionPress(opt)}
            size={mobileGrid.displaySize}
            containerStyle={mobileGrid.cellStyle}
          />
        ))}
      </View>
    </MenuButtonsContainer>
  );
}
