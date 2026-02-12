import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { TABLET_BREAKPOINT } from "../../styles/globalLayout";
import { getMediaPlayerLayout } from "../../styles/appLayout";

/**
 * Supplies layout and device flags for the media player.
 * Use this once at the top of the screen; pass layout and flags down to children.
 */
export function useMediaPlayerLayout() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const isTabletPortrait = isTablet && height >= width;
  const layout = useMemo(
    () => getMediaPlayerLayout(isTablet, width, height),
    [isTablet, width, height],
  );
  return { layout, isTablet, isTabletPortrait };
}
