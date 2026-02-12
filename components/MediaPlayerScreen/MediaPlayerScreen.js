import React, { useMemo } from "react";
import { Text, View, Image } from "react-native";
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

/**
 * Media player screen: layout from hook, playback from parent (App) so
 * audio continues when app is backgrounded; only the in-app Home button stops it.
 */
export default function MediaPlayerScreen({
  title,
  onBack,
  tracks = [],
  visualizationImage,
  playback,
}) {
  const { layout, isTablet, isTabletPortrait } = useMediaPlayerLayout();

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
  const thumbnailWrapStyle = useMemo(
    () => [
      mediaPlayerStyles.solfegThumbnailWrap,
      isTablet && {
        width: "100%",
        maxWidth: layout.maxContentWidth,
        alignSelf: "center",
      },
    ],
    [isTablet, layout.maxContentWidth],
  );

  const tabletTitleStyle = useMemo(
    () => [
      mediaPlayerStyles.tabletTitleText,
      { fontSize: layout.titleFontSize },
    ],
    [layout.titleFontSize],
  );
  const tabletTrackStyle = useMemo(
    () => [
      mediaPlayerStyles.tabletTrackText,
      { fontSize: layout.trackLabelFontSize },
    ],
    [layout.trackLabelFontSize],
  );

  const showTabletTitleRow = isTablet && visualizationImage != null;

  return (
    <MediaPlayerRootContainer style={rootStyle}>
      {showTabletTitleRow ? (
        <MediaControlsContainer style={controlsStyle}>
          <View style={[mediaPlayerStyles.tabletTitleRow, isTablet && mediaPlayerStyles.tabletTitleRowCloser]}>
            <View style={mediaPlayerStyles.tabletTitleBlock}>
              <Text style={tabletTitleStyle}>{title || "Media Player"}</Text>
              <Text style={tabletTrackStyle}>
                {playback.currentTrackTitle ??
                  `Track ${playback.currentTrackIndex + 1}`}
              </Text>
            </View>
            <View style={mediaPlayerStyles.tabletThumbnailRight}>
              <Image
                source={visualizationImage}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>
          <MediaTimeContainer style={mediaTimeStyle}>
            <MediaTimeContent
              progress={playback.progress}
              currentTimeSec={playback.currentTimeSec}
              durationSec={playback.durationSec}
              formatTime={playback.formatTime}
              timeTextFontSize={layout.timeTextFontSize}
              onSeek={playback.handlers?.onSeek}
            />
          </MediaTimeContainer>
          <MediaControlsContent
            isTablet={isTablet}
            layout={layout}
            isPlaying={playback.isPlaying}
            onBack={onBack}
            {...playback.handlers}
          />
        </MediaControlsContainer>
      ) : (
        <>
          {visualizationImage != null && (
            <View style={thumbnailWrapStyle}>
              <Image
                source={visualizationImage}
                style={mediaPlayerStyles.solfegThumbnail}
                resizeMode="cover"
              />
            </View>
          )}
          <MediaControlsContainer style={controlsStyle}>
            <Text style={categoryTitleStyle}>{title || "Media Player"}</Text>
            <Text style={trackNameStyle}>
              {playback.currentTrackTitle ??
                `Track ${playback.currentTrackIndex + 1}`}
            </Text>
            <MediaTimeContainer style={mediaTimeStyle}>
              <MediaTimeContent
                progress={playback.progress}
                currentTimeSec={playback.currentTimeSec}
                durationSec={playback.durationSec}
                formatTime={playback.formatTime}
                timeTextFontSize={layout.timeTextFontSize}
                onSeek={playback.handlers?.onSeek}
              />
            </MediaTimeContainer>
            <MediaControlsContent
              isTablet={isTablet}
              layout={layout}
              isPlaying={playback.isPlaying}
              onBack={onBack}
              {...playback.handlers}
            />
          </MediaControlsContainer>
        </>
      )}
    </MediaPlayerRootContainer>
  );
}
