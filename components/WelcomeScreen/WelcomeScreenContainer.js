import React, { useRef, useState } from "react";
import {
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import ButtonComponent, { buttonLayoutStyles } from "./ButtonComponent";
import scrollButtons from "../../styles/scrollButtons";
import {
  getCardLayout,
  getLogoSize,
  getButtonStripStyles,
  getMobileGridStyles,
  getTabletPortraitGridStyles,
  getTabletPortraitDisplaySize,
} from "../../styles/appLayout";
import {
  TABLET_BREAKPOINT,
  GRID_PADDING_TABLET,
  GRID_PADDING_MOBILE,
  GAP_TABLET,
  GAP_MOBILE,
  SCROLL_STEP_FACTOR,
  STRIP_WIDTH_OFFSET,
  SCROLL_EVENT_THROTTLE,
  TABLET_PORTRAIT_GAP,
} from "./constants";

function OptionButtons({ options, onPress, size, containerStyle }) {
  return options.map((opt) => (
    <ButtonComponent
      key={opt.id}
      logo={opt.logo}
      label={opt.label}
      onPress={() => onPress(opt)}
      size={size}
      containerStyle={containerStyle}
    />
  ));
}

export default function WelcomeScreenContainer({ options, onOptionPress }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const isTabletPortrait = isTablet && height >= width;

  const cardLayout = getCardLayout(isTablet, width, height);
  const gridPadding = isTablet ? GRID_PADDING_TABLET : GRID_PADDING_MOBILE;
  const gap = isTablet ? GAP_TABLET : GAP_MOBILE;
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
  const scrollStep = contentWidth * SCROLL_STEP_FACTOR;

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
    const displaySize = getTabletPortraitDisplaySize(width);
    const portraitGrid = getTabletPortraitGridStyles(
      TABLET_PORTRAIT_GAP,
      displaySize,
    );
    return (
      <View
        style={[
          buttonLayoutStyles.buttonsGrid,
          portraitGrid.gridStyle,
        ]}
      >
        <OptionButtons
          options={options}
          onPress={onOptionPress}
          size={portraitGrid.displaySize}
          containerStyle={portraitGrid.cellStyle}
        />
      </View>
    );
  }

  if (isTablet) {
    return (
      <View
        style={[
          buttonLayoutStyles.buttonsGrid,
          buttonLayoutStyles.buttonsGridScroll,
          { width: strip.rowWidth + STRIP_WIDTH_OFFSET },
        ]}
      >
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
            scrollEventThrottle={SCROLL_EVENT_THROTTLE}
          >
            <View style={strip.rowStyle}>
              <OptionButtons
                options={options}
                onPress={onOptionPress}
                size={strip.displaySize}
                containerStyle={strip.cellStyle}
              />
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
    );
  }

  return (
    <View style={[buttonLayoutStyles.buttonsGrid, mobileGrid.gridStyle]}>
      <OptionButtons
        options={options}
        onPress={onOptionPress}
        size={mobileGrid.displaySize}
        containerStyle={mobileGrid.cellStyle}
      />
    </View>
  );
}
