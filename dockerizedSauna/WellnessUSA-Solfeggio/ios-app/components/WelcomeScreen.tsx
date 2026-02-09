import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { L01_WUSA, SunaControlLogo, SoundFreqenciesLogo, EntertinmnetLogo } from '../assets/images';

interface WelcomeScreenProps {
  onSaunaControl: () => void;
  onHealingFrequencies: () => void;
  onMedia: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onSaunaControl, 
  onHealingFrequencies, 
  onMedia 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentWrapper, { opacity: fadeAnim }]}>
        <View style={styles.card}>
          {/* Company Logo */}
          <View style={styles.logoContainer}>
            <Image source={L01_WUSA} style={styles.logo} resizeMode="contain" />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={onSaunaControl}
              activeOpacity={0.7}
            >
              <View style={styles.button}>
                <Image source={SunaControlLogo} style={styles.buttonImage} resizeMode="contain" />
              </View>
              <Text style={styles.buttonLabel}>SAUNA CONTROL</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={onHealingFrequencies}
              activeOpacity={0.7}
            >
              <View style={styles.button}>
                <Image source={SoundFreqenciesLogo} style={styles.buttonImage} resizeMode="contain" />
              </View>
              <Text style={styles.buttonLabel}>SOUND FREQUENCIES</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={onMedia}
              activeOpacity={0.7}
            >
              <View style={styles.button}>
                <Image source={EntertinmnetLogo} style={styles.buttonImage} resizeMode="contain" />
              </View>
              <Text style={styles.buttonLabel}>ENTERTAINMENT</Text>
            </TouchableOpacity>
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
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
  },
  buttonsRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 10,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(100, 200, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(100, 200, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonImage: {
    width: 80,
    height: 80,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
