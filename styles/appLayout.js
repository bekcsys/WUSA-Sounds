import { TABLET_BREAKPOINT } from "./globalLayout";

const SMALL_TABLET_MAX_WIDTH = 900;

export function isSmallTablet(width) {
  return width >= TABLET_BREAKPOINT && width < SMALL_TABLET_MAX_WIDTH;
}

/**
 * Dynamic layout values computed from dimensions.
 * Used by App.js - import getLayoutStyles(dimensions) and spread where needed.
 */
export function getCardLayout(isTablet, width, height) {
  const cardWidth = width * 0.92;
  const cardHeight = isTablet ? height * 0.70 : cardWidth;
  return { width: cardWidth, height: cardHeight };
}

export function getLogoSize(isTablet, width = 0, compact = false) {
  const small = isTablet && isSmallTablet(width);
  const height = small ? 165 : isTablet ? 225 : 125;
  const widthVal = small ? 330 : isTablet ? 450 : 275;
  const marginBottom = small ? 20 : isTablet ? 32 : 12;
  if (compact) {
    const scale = isTablet ? 0.4 : 0.55;
    return {
      companyLogoHeight: Math.round(height * scale),
      companyLogoWidth: Math.round(widthVal * scale),
      logoMarginBottom: Math.round(marginBottom * scale),
    };
  }
  return {
    companyLogoHeight: height,
    companyLogoWidth: widthVal,
    logoMarginBottom: marginBottom,
  };
}

export function getButtonStripStyles(isTablet, cardWidth, cardHeight, gridPadding, gap, logoAreaHeight) {
  const labelHeight = 26;
  const columns = 4;
  const gapCount = columns - 1;
  const availableGridWidth = cardWidth - gridPadding * 2 - gap * gapCount;
  const availableGridHeight = cardHeight - gridPadding * 2 - logoAreaHeight - labelHeight * 2;
  const rowContentHeight = 34;
  const maxButtonSizeFromHeight = Math.floor((availableGridHeight - rowContentHeight) / 0.88);
  const maxButtonSizeTablet = 78;
  const minButtonSizeMobile = 60;
  const rawButtonSize = availableGridWidth / columns;
  const buttonSizeRaw = Math.min(
    rawButtonSize,
    maxButtonSizeFromHeight,
    isTablet ? maxButtonSizeTablet : rawButtonSize
  );
  let buttonSize = Math.round(buttonSizeRaw * 0.76);
  if (!isTablet && buttonSize < minButtonSizeMobile) buttonSize = minButtonSizeMobile;
  if (!isTablet && buttonSize > maxButtonSizeFromHeight) {
    buttonSize = Math.max(minButtonSizeMobile, maxButtonSizeFromHeight);
  }
  const maxDisplayByHeight = Math.floor((availableGridHeight - rowContentHeight) / 0.88);
  let displaySize = Math.min(buttonSize * 2, maxDisplayByHeight);

  if (isTablet) {
    const maxDisplayByWidth = (availableGridWidth - gap * gapCount) / columns;
    displaySize = Math.min(displaySize, maxDisplayByWidth);
  }

  const rowWidth = displaySize * columns + gap * gapCount;
  const maxScroll = Math.max(0, rowWidth - (cardWidth - gridPadding * 2));
  const stripHeight = Math.round(displaySize * 0.88) + 34;
  return {
    displaySize,
    rowWidth,
    stripHeight,
    cellStyle: { width: displaySize, marginBottom: 0 },
    rowStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: rowWidth,
      marginBottom: gap,
    },
    maxScroll,
  };
}

export function getTabletPortraitDisplaySize(width) {
  if (width >= TABLET_BREAKPOINT && width < SMALL_TABLET_MAX_WIDTH) return 122;
  return 148;
}

export const BUTTON_ROW_LABEL_HEIGHT = 34;

export function getTabletPortraitGridStyles(gap, displaySize) {
  const gridWidth = displaySize * 2 + gap;
  return {
    displaySize,
    cellStyle: { width: displaySize, marginBottom: gap },
    gridStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: gridWidth,
      justifyContent: "space-between",
      alignSelf: "center",
    },
  };
}

export function getVisibleHeightForTwoRows(displaySize, gap) {
  const rowHeight = Math.round(displaySize * 0.88) + BUTTON_ROW_LABEL_HEIGHT;
  return 2 * rowHeight + gap;
}

export function getVisibleWidthForFourButtons(displaySize, gap) {
  return 4 * displaySize + 3 * gap;
}

export function getMobileGridStyles(width, height, gridPadding, gap, logoAreaHeight) {
  const labelHeight = 26;
  const availableWidth = width - gridPadding * 2 - gap;
  const availableHeight = height - gridPadding * 2 - logoAreaHeight - gap - labelHeight * 2;
  const sizeFromWidth = availableWidth / 2;
  const rowContentHeight = 34;
  const sizeFromHeight = Math.floor((availableHeight - rowContentHeight) / 2 / 0.88);
  const displaySize = Math.min(sizeFromWidth, sizeFromHeight);
  const minButtonSize = 60;
  const rawSize = Math.max(minButtonSize, Math.round(displaySize));
  const size = Math.max(minButtonSize, Math.round(rawSize * 0.76));
  const gridWidth = size * 2 + gap;
  return {
    displaySize: size,
    cellStyle: { width: size, marginBottom: gap },
    gridStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: gridWidth,
      justifyContent: "space-between",
      alignSelf: "center",
    },
  };
}

export function getMediaPlayerLayout(isTablet, width, height) {
  const small = isTablet && isSmallTablet(width);
  const gridPadding = small ? 20 : isTablet ? 24 : 16;
  const contentPadding = small ? 20 : isTablet ? 24 : 12;
  const availableWidth = width - gridPadding * 2;
  const controlCount = 4;
  const gap = small ? 12 : isTablet ? 16 : 10;
  const minControlSize = small ? 64 : isTablet ? 80 : 52;
  const maxControlSize = small ? 72 : isTablet ? 80 : 64;
  const controlSizeFromWidth = (availableWidth - (controlCount - 1) * gap - contentPadding * 2) / controlCount;
  const controlSize = Math.min(
    maxControlSize,
    Math.max(minControlSize, Math.floor(controlSizeFromWidth))
  );
  const iconSize = small ? 32 : isTablet ? 38 : 28;
  const labelFontSize = small ? 15 : isTablet ? 18 : 14;
  return {
    contentPadding,
    titleFontSize: small ? 26 : isTablet ? 34 : 22,
    trackLabelFontSize: small ? 18 : isTablet ? 24 : 18,
    trackLabelMarginBottom: small ? 18 : isTablet ? 24 : 16,
    controlSize,
    controlGap: gap,
    controlIconSize: iconSize,
    controlLabelFontSize: labelFontSize,
    timeTextFontSize: small ? 15 : isTablet ? 18 : 15,
    homeLabelFontSize: small ? 15 : isTablet ? 18 : 16,
    controlsPaddingVertical: small ? 18 : isTablet ? 24 : 16,
    controlsPaddingHorizontal: small ? 16 : isTablet ? 20 : 12,
    controlsMarginBottom: small ? 14 : isTablet ? 20 : 12,
    controlsBorderRadius: small ? 16 : isTablet ? 20 : 16,
    backButtonTop: isTablet ? 16 : 8,
    backButtonLeft: isTablet ? 24 : 16,
    volumeIconSize: isTablet ? 24 : 20,
    maxContentWidth: small ? 560 : isTablet ? 700 : availableWidth,
  };
}
