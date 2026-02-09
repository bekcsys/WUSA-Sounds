import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Freqencies, AmbinetSounds } from '../assets/images';
import Button from './shared/Button';

interface MainMenuProps {
  onSelectOption: (option: 'solfeggio' | 'ambient' | 'entertainment' | 'sine-wave' | 'bowls') => void;
  onBack: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectOption, onBack }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const menuOptions = [
    { id: 'solfeggio' as const, label: 'Solfeggio', description: 'sound frequencies', icon: '🎵', image: Freqencies },
    { id: 'ambient' as const, label: 'Ambient', description: 'Rain, Ocean, Forest', icon: '🌊', image: AmbinetSounds },
    { id: 'sine-wave' as const, label: 'SINE WAVE', description: 'pure tones', icon: '〰️', image: undefined },
    { id: 'bowls' as const, label: 'Bowl Sounds', description: 'Bowl sounds', icon: '🔔', image: undefined },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        <View style={styles.card}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Sounds Frequencies</Text>
            <Text style={styles.subtitle}>Select sound Frequencies</Text>
          </View>
          
          <View style={styles.buttonsRow}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuOption}
                onPress={() => onSelectOption(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.menuButton}>
                  {option.image ? (
                    <Image source={option.image} style={styles.menuImage} resizeMode="contain" />
                  ) : (
                    <Text style={styles.menuIcon}>{option.icon}</Text>
                  )}
                </View>
                <Text style={styles.menuLabel}>{option.label}</Text>
                <Text style={styles.menuDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Button onPress={onBack} style={styles.homeButton}>
            Home
          </Button>
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
  buttonsRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  menuOption: {
    alignItems: 'center',
    margin: 10,
    width: 140,
  },
  menuButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(100, 200, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuImage: {
    width: 70,
    height: 70,
  },
  menuIcon: {
    fontSize: 40,
  },
  menuLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    textAlign: 'center',
  },
  homeButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(100, 200, 255, 0.5)',
  },
});

export default MainMenu;
