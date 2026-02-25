export const TABLET_BREAKPOINT = 600;
export const LAPTOP_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1280;
export const WIDE_BREAKPOINT = 1536;

export type ViewportSize = "mobile" | "tablet" | "laptop" | "desktop" | "wide";

export function getViewportSize(width: number): ViewportSize {
  if (width >= WIDE_BREAKPOINT) return "wide";
  if (width >= DESKTOP_BREAKPOINT) return "desktop";
  if (width >= LAPTOP_BREAKPOINT) return "laptop";
  if (width >= TABLET_BREAKPOINT) return "tablet";
  return "mobile";
}

export function getLogoSize(
  compact: boolean,
  viewport: ViewportSize
): { width: number; height: number } {
  if (compact) {
    const sizes: Record<ViewportSize, { width: number; height: number }> = {
      mobile: { width: 100, height: 46 },
      tablet: { width: 120, height: 55 },
      laptop: { width: 140, height: 64 },
      desktop: { width: 160, height: 73 },
      wide: { width: 180, height: 82 },
    };
    return sizes[viewport];
  }
  const sizes: Record<ViewportSize, { width: number; height: number }> = {
    mobile: { width: 180, height: 82 },
    tablet: { width: 220, height: 100 },
    laptop: { width: 260, height: 118 },
    desktop: { width: 300, height: 136 },
    wide: { width: 320, height: 146 },
  };
  return sizes[viewport];
}
