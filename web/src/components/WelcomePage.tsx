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
    const gap =
      viewport === "wide" || viewport === "desktop" ? 32 : viewport === "laptop" || viewport === "tablet" ? 24 : 12;
    const minSize = isTabletOrLarger ? 100 : 88;
    const maxSize =
      viewport === "wide"
        ? 160
        : viewport === "desktop"
          ? 140
          : viewport === "laptop"
            ? 112
            : viewport === "tablet"
              ? 104
              : 88;
    const columns = 3;
    return { gap, minSize, maxSize, columns };
  }, [viewport]);
}

export function WelcomePage({ onSelect, viewport }: WelcomePageProps) {
  const { width: logoW, height: logoH } = getLogoSize(false, viewport);
  const layout = useMenuLayout(viewport);
  const isTabletOrLarger = viewport !== "mobile";

  const handleClick = (opt: WelcomeOption) => onSelect(opt);

  return (
    <div className="min-h-full flex flex-col bg-app">
      <div className="flex-1 flex flex-col min-h-0 flex-grow">
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
              className="flex flex-row flex-nowrap items-start justify-center"
              style={{
                gap: layout.gap,
                width: layout.maxSize * layout.columns + layout.gap * (layout.columns - 1),
              }}
            >
              {WELCOME_OPTIONS.map((opt) => (
                <MenuButton
                  key={opt.id}
                  option={opt}
                  size={layout.maxSize}
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
