/**
 * Dynamic layout values computed from dimensions.
 * Used by App.js - import getLayoutStyles(dimensions) and spread where needed.
 */
export function getCardLayout(isTablet, width, height) {
  const cardWidth = isTablet ? width * 0.92 : width * 0.92;
  const cardHeight = isTablet ? height * 0.70 : cardWidth;
  return { width: cardWidth, height: cardHeight };
}

export function getLogoSize(isTablet) {
  return {
    companyLogoHeight: isTablet ? 225 : 125,
    companyLogoWidth: isTablet ? 450 : 275,
    logoMarginBottom: isTablet ? 32 : 12,
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
  const maxButtonSizeTablet = 115;
  const minButtonSizeMobile = 68;
  const rawButtonSize = availableGridWidth / columns;
  const buttonSizeRaw = Math.min(
    rawButtonSize,
    maxButtonSizeFromHeight,
    isTablet ? maxButtonSizeTablet : rawButtonSize
  );
  let buttonSize = Math.round(buttonSizeRaw * 0.82);
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

export function getMobileGridStyles(width, height, gridPadding, gap, logoAreaHeight) {
  const labelHeight = 26;
  const availableWidth = width - gridPadding * 2 - gap;
  const availableHeight = height - gridPadding * 2 - logoAreaHeight - gap - labelHeight * 2;
  const sizeFromWidth = availableWidth / 2;
  const rowContentHeight = 34;
  const sizeFromHeight = Math.floor((availableHeight - rowContentHeight) / 2 / 0.88);
  const displaySize = Math.min(sizeFromWidth, sizeFromHeight);
  const minButtonSize = 68;
  const rawSize = Math.max(minButtonSize, Math.round(displaySize));
  const size = Math.max(minButtonSize, Math.round(rawSize * 0.82));
  const gridWidth = size * 2 + gap;
  return {
    displaySize: size,
    cellStyle: { width: size, marginBottom: gap },
    gridStyle: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: gridWidth,
      justifyContent: "space-between",
    },
  };
}
