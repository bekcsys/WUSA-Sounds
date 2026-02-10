import React from "react";
import { View } from "react-native";
import mediaPlayerStyles from "./mediaPlayerStyles";
import MediaPlayerControls from "./MediaPlayerControls";
import VolumeBar from "./VolumeBar";
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
  volume,
  onVolumeChange,
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
      <View style={mediaPlayerStyles.controlsFooterRow}>
        <View style={mediaPlayerStyles.controlsVolumeWrap}>
          <VolumeBar
            volume={volume}
            onVolumeChange={onVolumeChange}
            layout={layout}
          />
        </View>
        <HomeButtonContent onPress={onBack} homeLabelFontSize={layout?.homeLabelFontSize} />
      </View>
    </>
  );
}
