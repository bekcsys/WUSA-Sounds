import { useMemo } from "react";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { MenuButton } from "./MenuButton";
import { MediaPlayerScreen } from "./MediaPlayerScreen";
import { getLogoSize } from "../config/layout";
import { LOGO_WUSA } from "../config/assets";
import { WELCOME_OPTIONS } from "../data/tracks";
import type { WelcomeOption } from "../types";
import type { ViewportSize } from "../config/layout";
import type { PlaybackState } from "../types";

interface HomePageProps {
  viewport: ViewportSize;
  currentOption: WelcomeOption;
  onSelectOption: (option: WelcomeOption) => void;
  playback: PlaybackState;
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

export function HomePage({
  viewport,
  currentOption,
  onSelectOption,
  playback,
}: HomePageProps) {
  const { width: logoW, height: logoH } = getLogoSize(false, viewport);
  const layout = useMenuLayout(viewport);
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
    <div className="min-h-screen flex flex-col bg-app">
      <div className="flex-1 flex flex-col min-h-0" style={{ height: "94%" }}>
        <header
          className="flex-shrink-0 w-full flex items-center justify-center py-6 tablet:py-8 laptop:py-10"
          style={{ minHeight: "clamp(100px, 18vh, 180px)" }}
        >
          <Logo src={LOGO_WUSA} width={logoW} height={logoH} />
        </header>
        <main className="flex-1 min-h-0 overflow-auto w-full flex flex-col items-center px-4 py-4">
          <section
            className="w-full rounded-[28px] laptop:rounded-[32px] bg-card border border-navy/10 shadow-card flex flex-col items-center py-6 px-6 tablet:px-8 laptop:py-8 laptop:px-10 mb-6"
            style={{ maxWidth: contentMaxWidth }}
          >
            <h2 className="text-textPrimary text-xl tablet:text-2xl font-bold tracking-tight mb-6 text-center w-full">
              Select playlist
            </h2>
            <div
              className="flex flex-row flex-wrap items-start justify-center"
              style={{ gap: layout.gap }}
            >
              {WELCOME_OPTIONS.map((opt) => (
                <MenuButton
                  key={opt.id}
                  option={opt}
                  size={layout.columns === 2 ? layout.minSize : layout.maxSize}
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
