import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './shared/Button';

interface EntertainmentMenuProps {
  onBack: () => void;
  onHome: () => void;
}

const EntertainmentMenu: React.FC<EntertainmentMenuProps> = ({ onBack, onHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Entertainment</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(40, 40, 50, 0.3)',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
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

export default EntertainmentMenu;
