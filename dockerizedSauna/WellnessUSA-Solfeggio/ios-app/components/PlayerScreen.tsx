import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PlayerStatus } from '../services/AudioPlayer';
import PlayerControls from './mediaPlayer/PlayerControls';
import VolumeControl from './mediaPlayer/VolumeControl';
import PatternScreen from './mediaPlayer/PatternScreen';
import Button from './shared/Button';

interface PlayerScreenProps {
  status: PlayerStatus;
  sessionStartTime: number | null;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onVolumeChange: (volume: number) => void;
  onBack: () => void;
  onHome: () => void;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({
  status,
  sessionStartTime,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onVolumeChange,
  onBack,
  onHome,
}) => {
  return (
    <View style={styles.container}>
      <PatternScreen
        isPlaying={status.is_playing}
        currentTrack={status.current_track}
        trackName={status.track_name}
        sessionStartTime={sessionStartTime}
      />
      
      <View style={styles.controlsContainer}>
        <PlayerControls
          isPlaying={status.is_playing}
          onPlayPause={onPlayPause}
          onNext={onNext}
          onPrevious={onPrevious}
          onShuffle={onShuffle}
          shuffle={status.shuffle}
        />
        
        <VolumeControl
          volume={status.volume}
          onVolumeChange={onVolumeChange}
        />
        
        <View style={styles.buttonRow}>
          <Button onPress={onBack} style={styles.button}>
            Back
          </Button>
          <Button onPress={onHome} style={styles.button}>
            Home
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.5)',
  },
});

export default PlayerScreen;
