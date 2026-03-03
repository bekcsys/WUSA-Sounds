import { useMemo } from "react";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { MenuButton } from "./MenuButton";
import { MediaPlayerScreen } from "./MediaPlayerScreen";
import { getLogoSize } from "../config/layout";
import { LOGO_WUSA } from "../config/assets";
import { WELCOME_OPTIONS } from "../data/tracks";
import { COMPACT_VIEWPORT_HEIGHT } from "../hooks/useViewportSize";
import type { WelcomeOption } from "../types";
import type { ViewportSize } from "../config/layout";
import type { PlaybackState } from "../types";

interface HomePageProps {
  viewport: ViewportSize;
  viewportHeight: number;
  currentOption: WelcomeOption;
  onSelectOption: (option: WelcomeOption) => void;
  playback: PlaybackState;
}

function useMenuLayout(viewport: ViewportSize, viewportHeight: number) {
  return useMemo(() => {
    const isShortLandscape =
      (viewport === "tablet" || viewport === "laptop") &&
      viewportHeight < COMPACT_VIEWPORT_HEIGHT;
    return { compact: isShortLandscape };
  }, [viewport, viewportHeight]);
}

export function HomePage({
  viewport,
  viewportHeight,
  currentOption,
  onSelectOption,
  playback,
}: HomePageProps) {
  const { width: logoW, height: logoH } = getLogoSize(false, viewport);
  const layout = useMenuLayout(viewport, viewportHeight);
  const isTabletOrLarger = viewport !== "mobile";
  const contentMaxWidth =
    viewport === "wide"
      ? 960
      : viewport === "desktop"
        ? 860
        : viewport === "laptop"
          ? 760
          : viewport === "tablet"
            ? 600
            : 360;

  return (
    <div className="min-h-full flex flex-col bg-app">
      <div className="flex-1 flex flex-col min-h-0 flex-grow">
        <header
          className={`flex-shrink-0 w-full flex items-center justify-center ${layout.compact ? "py-2 tablet:py-3" : "py-4 tablet:py-5 laptop:py-6"}`}
          style={{ minHeight: layout.compact ? "clamp(52px, 10vh, 88px)" : "clamp(64px, 10vh, 120px)" }}
        >
          <Logo src={LOGO_WUSA} width={logoW} height={logoH} />
        </header>
        <main className={`flex-1 min-h-0 overflow-auto w-full flex flex-col items-center justify-center ${layout.compact ? "px-3 py-2" : "px-4 py-4 tablet:px-6 laptop:px-8"}`}>
          <section
            className={`w-full rounded-[28px] laptop:rounded-[32px] bg-card border border-navy/10 shadow-card flex flex-col items-center mb-4 ${layout.compact ? "py-2 px-4 tablet:py-2 tablet:px-5" : "py-2 px-4 tablet:py-3 tablet:px-6 laptop:py-4 laptop:px-8"}`}
            style={{ maxWidth: contentMaxWidth }}
          >
            <h2 className={`text-textPrimary font-bold tracking-tight text-center w-full ${layout.compact ? "text-lg mb-2" : "text-lg tablet:text-xl mb-2 tablet:mb-3"}`}>
              Select playlist
            </h2>
            <div className="flex flex-nowrap items-center justify-center gap-3 tablet:gap-5 w-full">
              {WELCOME_OPTIONS.map((opt) => (
                <MenuButton
                  key={opt.id}
                  option={opt}
                  size={88}
                  onClick={() => onSelectOption(opt)}
                  selected={currentOption.id === opt.id}
                />
              ))}
            </div>
            <div className="border-t border-navy/10 w-full mt-4 shrink-0" />
            <div className="w-full pt-4">
              <MediaPlayerScreen
                playback={playback}
                embedded
              />
            </div>
          </section>
        </main>
      </div>
      <Footer isTablet={isTabletOrLarger} />
    </div>
  );
}
