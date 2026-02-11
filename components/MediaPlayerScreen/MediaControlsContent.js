import React from "react";
import { View } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";
import MediaPlayerControls from "./MediaPlayerControls";
import HomeButtonContent from "./HomeButtonContent";

export default function MediaControlsContent({
  isTablet,
  layout,
  isPlaying,
  isShuffleOn,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onShuffle,
  onBack,
}) {
  return (
    <>
      <MediaPlayerControls
        isTablet={isTablet}
        layout={layout}
        isPlaying={isPlaying}
        isShuffleOn={isShuffleOn}
        onPlay={onPlay}
        onPause={onPause}
        onPrev={onPrev}
        onNext={onNext}
        onShuffle={onShuffle}
      />
      <View style={mediaPlayerStyles.controlsDivider} />
      <View style={mediaPlayerStyles.controlsFooterRow}>
        <HomeButtonContent onPress={onBack} homeLabelFontSize={layout?.homeLabelFontSize} />
      </View>
    </>
  );
}
