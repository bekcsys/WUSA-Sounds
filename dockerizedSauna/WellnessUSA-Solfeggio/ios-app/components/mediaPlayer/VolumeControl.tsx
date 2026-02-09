import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const getVolumeIcon = () => {
    if (volume === 0) return '🔇';
    if (volume < 0.33) return '🔈';
    if (volume < 0.66) return '🔉';
    return '🔊';
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.icon}>{getVolumeIcon()}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={onVolumeChange}
          minimumTrackTintColor="rgba(100, 200, 255, 0.8)"
          maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
          thumbTintColor="rgba(100, 200, 255, 1)"
        />
        <Text style={styles.percentage}>{Math.round(volume * 100)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    fontSize: 24,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  percentage: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'right',
  },
});

export default VolumeControl;
