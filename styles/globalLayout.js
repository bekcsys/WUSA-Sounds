import { useWindowDimensions } from "react-native";
import layoutTablet from "./globalLayoutTablet";
import layoutMobile from "./globalLayoutMobile";

const TABLET_BREAKPOINT = 600;

export { layoutConstants } from "./globalLayoutTablet";
export { default as layoutTablet } from "./globalLayoutTablet";
export { default as layoutMobile } from "./globalLayoutMobile";

export function useLayout() {
  const { width } = useWindowDimensions();
  return width >= TABLET_BREAKPOINT ? layoutTablet : layoutMobile;
}
