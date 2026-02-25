import { useState, useEffect } from "react";
import {
  TABLET_BREAKPOINT,
  getViewportSize,
  type ViewportSize,
} from "../config/layout";

export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(() =>
    typeof window !== "undefined"
      ? getViewportSize(window.innerWidth)
      : "mobile"
  );

  useEffect(() => {
    const handler = () => setSize(getViewportSize(window.innerWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
}

export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= TABLET_BREAKPOINT
      : false
  );

  useEffect(() => {
    const handler = () =>
      setIsTablet(window.innerWidth >= TABLET_BREAKPOINT);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isTablet;
}
