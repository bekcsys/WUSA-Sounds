import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface PatternScreenProps {
  isPlaying: boolean;
  currentTrack: number;
  trackName: string;
  sessionStartTime: number | null;
}

const PatternScreen: React.FC<PatternScreenProps> = ({
  isPlaying,
  currentTrack,
  trackName,
  sessionStartTime,
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isPlaying]);

  const glowIntensity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: glowIntensity }]}>
        <Text style={styles.trackName}>{trackName}</Text>
        <Text style={styles.status}>{isPlaying ? 'Playing...' : 'Paused'}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  content: {
    alignItems: 'center',
  },
  trackName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default PatternScreen;
