import { useMemo } from "react";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { MenuButton } from "./MenuButton";
import { getLogoSize } from "../config/layout";
import { LOGO_WUSA } from "../config/assets";
import { WELCOME_OPTIONS } from "../data/tracks";
import type { WelcomeOption } from "../types";
import type { ViewportSize } from "../config/layout";

interface WelcomePageProps {
  onSelect: (option: WelcomeOption) => void;
  viewport: ViewportSize;
}

function useMenuLayout(viewport: ViewportSize) {
  return useMemo(() => {
    const isTabletOrLarger = viewport !== "mobile";
    const gap = isTabletOrLarger ? 32 : 24;
    const minSize = isTabletOrLarger ? 120 : 100;
    const maxSize =
      viewport === "wide" ? 160 : viewport === "desktop" || viewport === "laptop" ? 140 : isTabletOrLarger ? 130 : 120;
    const columns = isTabletOrLarger ? 3 : 2;
    return { gap, minSize, maxSize, columns };
  }, [viewport]);
}

export function WelcomePage({ onSelect, viewport }: WelcomePageProps) {
  const { width: logoW, height: logoH } = getLogoSize(false, viewport);
  const layout = useMenuLayout(viewport);
  const isTabletOrLarger = viewport !== "mobile";

  const handleClick = (opt: WelcomeOption) => onSelect(opt);

  return (
    <div className="min-h-screen flex flex-col bg-app">
      <div className="flex-1 flex flex-col min-h-0" style={{ height: "94%" }}>
        <header
          className="flex-shrink-0 w-full flex items-center justify-center py-6 tablet:py-8 laptop:py-10"
          style={{ minHeight: "clamp(100px, 18vh, 180px)" }}
        >
          <Logo src={LOGO_WUSA} width={logoW} height={logoH} />
        </header>
        <main className="flex-1 min-h-0 overflow-auto w-full flex flex-col items-center justify-center px-4 py-4">
          <div
            className="w-full max-w-full rounded-[28px] laptop:rounded-[32px] bg-card border border-navy/10 shadow-card flex items-center justify-center py-8 px-6 tablet:px-8 laptop:py-10 laptop:px-10"
            style={{
              maxWidth:
                viewport === "wide"
                  ? 720
                  : viewport === "desktop" || viewport === "laptop"
                    ? 640
                    : viewport === "tablet"
                      ? 560
                      : 360,
            }}
          >
            <div
              className="flex flex-row flex-wrap items-start justify-center"
              style={{
                gap: layout.gap,
                width:
                  layout.columns === 2
                    ? layout.minSize * 2 + layout.gap
                    : layout.maxSize * 3 + layout.gap * 2,
              }}
            >
              {WELCOME_OPTIONS.map((opt) => (
                <MenuButton
                  key={opt.id}
                  option={opt}
                  size={layout.columns === 2 ? layout.minSize : layout.maxSize}
                  onClick={() => handleClick(opt)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer isTablet={isTabletOrLarger} />
    </div>
  );
}
