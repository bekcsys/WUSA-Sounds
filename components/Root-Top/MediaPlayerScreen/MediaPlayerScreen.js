import React, { useMemo } from "react";
import { Text } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";
import {
  MediaPlayerRootContainer,
  MediaTimeContainer,
  MediaControlsContainer,
  getRootStyle,
  getMediaTimeStyle,
  getControlsStyle,
} from "./mediaPlayerContainers";
import MediaTimeContent from "./MediaTimeContent";
import MediaControlsContent from "./MediaControlsContent";
import { useMediaPlayerLayout } from "./useMediaPlayerLayout";
import { useMediaPlayerPlayback } from "./useMediaPlayerPlayback";

/**
 * Media player screen: layout and playback are handled by hooks;
 * this component composes containers and passes memoized styles and props.
 */
export default function MediaPlayerScreen({ title, onBack }) {
  const { layout, isTablet, isTabletPortrait } = useMediaPlayerLayout();
  const playback = useMediaPlayerPlayback();

  const rootStyle = useMemo(
    () => getRootStyle(layout, isTablet, isTabletPortrait),
    [layout, isTablet, isTabletPortrait],
  );
  const mediaTimeStyle = useMemo(
    () => getMediaTimeStyle(layout),
    [layout],
  );
  const controlsStyle = useMemo(
    () => getControlsStyle(layout, isTablet),
    [layout, isTablet],
  );
  const categoryTitleStyle = useMemo(
    () => [
      mediaPlayerStyles.categoryTitle,
      { fontSize: layout.titleFontSize },
    ],
    [layout.titleFontSize],
  );
  const trackNameStyle = useMemo(
    () => [
      mediaPlayerStyles.trackName,
      {
        fontSize: layout.trackLabelFontSize,
        marginBottom: layout.trackLabelMarginBottom,
      },
    ],
    [layout.trackLabelFontSize, layout.trackLabelMarginBottom],
  );

  return (
    <MediaPlayerRootContainer style={rootStyle}>
      <Text style={categoryTitleStyle}>{title || "Media Player"}</Text>
      <Text style={trackNameStyle}>
        Track {playback.currentTrackIndex + 1}
      </Text>
      <MediaTimeContainer style={mediaTimeStyle}>
        <MediaTimeContent
          progress={playback.progress}
          currentTimeSec={playback.currentTimeSec}
          durationSec={playback.durationSec}
          formatTime={playback.formatTime}
          timeTextFontSize={layout.timeTextFontSize}
        />
      </MediaTimeContainer>
      <MediaControlsContainer style={controlsStyle}>
        <MediaControlsContent
          isTablet={isTablet}
          layout={layout}
          isPlaying={playback.isPlaying}
          isShuffleOn={playback.isShuffleOn}
          volume={playback.volume}
          onVolumeChange={playback.setVolume}
          onBack={onBack}
          {...playback.handlers}
        />
      </MediaControlsContainer>
    </MediaPlayerRootContainer>
  );
}
