import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import Button from './shared/Button';

interface SolfeggioFrequenciesProps {
  onStartSession: (trackId: number, playAll?: boolean) => void;
  onBack: () => void;
  onHome: () => void;
}

const SolfeggioFrequencies: React.FC<SolfeggioFrequenciesProps> = ({ 
  onStartSession, 
  onBack, 
  onHome 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const frequencies = [
    { label: 'Meditation', hz: '174 Hz', trackId: 10, bgColor: 'rgb(140, 80, 255)' },
    { label: 'Healing', hz: '285 Hz', trackId: 11, bgColor: 'rgb(100, 255, 150)' },
    { label: 'Freedom', hz: '396 Hz', trackId: 12, bgColor: 'rgb(140, 80, 255)' },
    { label: 'Positivity', hz: '417 Hz', trackId: 13, bgColor: 'rgb(100, 255, 150)' },
    { label: 'Love', hz: '528 Hz', trackId: 14, bgColor: 'rgb(100, 255, 200)' },
    { label: 'Harmony', hz: '639 Hz', trackId: 15, bgColor: 'rgb(80, 255, 220)' },
    { label: 'Expression', hz: '741 Hz', trackId: 16, bgColor: 'rgb(255, 200, 100)' },
    { label: 'Intuition', hz: '852 Hz', trackId: 17, bgColor: 'rgb(255, 150, 100)' },
    { label: 'Enlightenment', hz: '963 Hz', trackId: 18, bgColor: 'rgb(255, 100, 150)' },
  ];

  const itemsPerView = 3;
  const visibleFrequencies = frequencies.slice(startIndex, startIndex + itemsPerView);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        <View style={styles.card}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Healing Frequencies</Text>
            <Text style={styles.subtitle}>select healing frequency</Text>
          </View>
          
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {frequencies.map((freq) => (
              <TouchableOpacity
                key={freq.trackId}
                style={[styles.frequencyButton, { backgroundColor: freq.bgColor }]}
                onPress={() => onStartSession(freq.trackId)}
                activeOpacity={0.8}
              >
                <Text style={styles.frequencyHz}>{freq.hz}</Text>
                <Text style={styles.frequencyLabel}>{freq.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.navigationControls}>
            <Button onPress={onBack} style={styles.navButton}>
              Back
            </Button>
            <Button onPress={onHome} style={styles.navButton}>
              Home
            </Button>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 600,
  },
  card: {
    backgroundColor: 'rgba(40, 40, 50, 0.3)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  titleSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  scrollView: {
    width: '100%',
    marginVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  frequencyButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  frequencyHz: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  frequencyLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  navigationControls: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  navButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.5)',
  },
});

export default SolfeggioFrequencies;
