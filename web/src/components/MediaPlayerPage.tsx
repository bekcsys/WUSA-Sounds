import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { MediaPlayerScreen } from "./MediaPlayerScreen";
import { getLogoSize } from "../config/layout";
import { LOGO_WUSA } from "../config/assets";
import type { ViewportSize } from "../config/layout";
import type { PlaybackState } from "../types";

interface MediaPlayerPageProps {
  title: string;
  onBack: () => void;
  playback: PlaybackState;
  viewport: ViewportSize;
}

export function MediaPlayerPage({
  title,
  onBack,
  playback,
  viewport,
}: MediaPlayerPageProps) {
  const isTabletOrLarger = viewport !== "mobile";
  const { width: logoW, height: logoH } = getLogoSize(false, viewport);

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
          <MediaPlayerScreen
            playlistTitle={title}
            playback={playback}
            onBack={onBack}
          />
        </main>
      </div>
      <Footer isTablet={isTabletOrLarger} />
    </div>
  );
}
