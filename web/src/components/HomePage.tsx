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
    const isTabletOrLarger = viewport !== "mobile";
    const isShortLandscape =
      (viewport === "tablet" || viewport === "laptop") &&
      viewportHeight < COMPACT_VIEWPORT_HEIGHT;
    const gap = isShortLandscape
      ? 12
      : viewport === "wide" || viewport === "desktop"
        ? 32
        : viewport === "laptop" || viewport === "tablet"
          ? 24
          : 12;
    const minSize = isTabletOrLarger ? 100 : 88;
    const maxSize = isShortLandscape
      ? 88
      : viewport === "wide"
        ? 160
        : viewport === "desktop"
          ? 140
          : viewport === "laptop"
            ? 112
            : viewport === "tablet"
              ? 104
              : 88;
    const columns = 3;
    return { gap, minSize, maxSize, columns, compact: isShortLandscape };
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
      ? 720
      : viewport === "desktop" || viewport === "laptop"
        ? 640
        : viewport === "tablet"
          ? 560
          : 360;

  return (
    <div className="min-h-full flex flex-col bg-app">
      <div className="flex-1 flex flex-col min-h-0 flex-grow">
        <header
          className={`flex-shrink-0 w-full flex items-center justify-center ${layout.compact ? "py-3 tablet:py-4" : "py-6 tablet:py-8 laptop:py-10"}`}
          style={{ minHeight: layout.compact ? "clamp(60px, 12vh, 100px)" : "clamp(100px, 18vh, 180px)" }}
        >
          <Logo src={LOGO_WUSA} width={logoW} height={logoH} />
        </header>
        <main className={`flex-1 min-h-0 overflow-auto w-full flex flex-col items-center ${layout.compact ? "px-3 py-2" : "px-4 py-4"}`}>
          <section
            className={`w-full rounded-[28px] laptop:rounded-[32px] bg-card border border-navy/10 shadow-card flex flex-col items-center mb-6 ${layout.compact ? "py-3 px-4 tablet:py-3 tablet:px-5" : "py-4 px-6 tablet:py-5 tablet:px-8 laptop:py-6 laptop:px-10 desktop:py-8 desktop:px-10"}`}
            style={{ maxWidth: contentMaxWidth }}
          >
            <h2 className={`text-textPrimary font-bold tracking-tight text-center w-full ${layout.compact ? "text-lg mb-3" : "text-xl tablet:text-2xl mb-4 tablet:mb-6"}`}>
              Select playlist
            </h2>
            <div
              className="flex flex-row flex-nowrap items-start justify-center"
              style={{ gap: layout.gap }}
            >
              {WELCOME_OPTIONS.map((opt) => (
                <MenuButton
                  key={opt.id}
                  option={opt}
                  size={layout.maxSize}
                  onClick={() => onSelectOption(opt)}
                  selected={currentOption.id === opt.id}
                />
              ))}
            </div>
          </section>
          <MediaPlayerScreen
            playlistTitle={currentOption.label}
            playback={playback}
            contentMaxWidth={contentMaxWidth}
          />
        </main>
      </div>
      <Footer isTablet={isTabletOrLarger} />
    </div>
  );
}
