import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle?: () => void;
  shuffle?: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  shuffle = false,
}) => {
  return (
    <View style={styles.container}>
      {onShuffle && (
        <TouchableOpacity
          style={[styles.button, shuffle && styles.buttonActive]}
          onPress={onShuffle}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>⇄</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        style={styles.button}
        onPress={onPrevious}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>⏮</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.playButton]}
        onPress={onPlayPause}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>{isPlaying ? '⏸' : '▶'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>⏭</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(100, 200, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: 'rgba(100, 200, 255, 0.4)',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  icon: {
    fontSize: 24,
    color: '#ffffff',
  },
});

export default PlayerControls;
