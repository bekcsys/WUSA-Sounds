import { useState, useEffect } from "react";
import {
  TABLET_BREAKPOINT,
  getViewportSize,
  type ViewportSize,
} from "../config/layout";

export const COMPACT_VIEWPORT_HEIGHT = 900;

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

export function useViewportHeight(): number {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 1024
  );

  useEffect(() => {
    const handler = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return height;
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
