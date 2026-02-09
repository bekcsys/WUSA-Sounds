import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import { audioPlayer, PlayerStatus } from './services/AudioPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import MainMenu from './components/MainMenu';
import SolfeggioFrequencies from './components/SolfeggioFrequencies';
import EntertainmentMenu from './components/EntertainmentMenu';
import PlayerScreen from './components/PlayerScreen';

type Screen = 'welcome' | 'main-menu' | 'solfeggio' | 'ambient' | 'entertainment' | 'player';

export default function App() {
  const [status, setStatus] = useState<PlayerStatus | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  useEffect(() => {
    // Subscribe to audio player status updates
    const unsubscribe = audioPlayer.subscribe((newStatus) => {
      setStatus(newStatus);
    });

    // Get initial status
    setStatus(audioPlayer.getStatus());

    return unsubscribe;
  }, []);

  const handleStartSession = async (trackId: number) => {
    try {
      await audioPlayer.setTrack(trackId);
      const startTime = Date.now();
      setSessionActive(true);
      setSessionStartTime(startTime);
      setCurrentScreen('player');
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const handleBackToWelcome = async () => {
    try {
      await audioPlayer.pause();
      await audioPlayer.setTrack(0);
      setSessionActive(false);
      setSessionStartTime(null);
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Failed to reset:', error);
    }
  };

  const handleAction = async (action: string) => {
    try {
      switch (action) {
        case 'play':
          await audioPlayer.play();
          break;
        case 'pause':
          await audioPlayer.pause();
          break;
        case 'resume':
          await audioPlayer.resume();
          break;
        case 'next':
          await audioPlayer.nextTrack();
          break;
        case 'previous':
          await audioPlayer.previousTrack();
          break;
        case 'shuffle':
          audioPlayer.toggleShuffle();
          break;
        default:
          if (action.startsWith('track/')) {
            const trackId = parseInt(action.split('/')[1]);
            await audioPlayer.setTrack(trackId);
          }
      }
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
    }
  };

  const handleVolumeChange = async (volume: number) => {
    try {
      await audioPlayer.setVolume(volume);
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  };

  if (currentScreen === 'welcome') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <WelcomeScreen
          onSaunaControl={() => {
            console.log('Sauna Control clicked');
          }}
          onHealingFrequencies={() => setCurrentScreen('main-menu')}
          onMedia={() => setCurrentScreen('entertainment')}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'main-menu') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MainMenu
          onSelectOption={(option) => {
            if (option === 'solfeggio') {
              handleStartSession(10);
            } else if (option === 'sine-wave') {
              handleStartSession(1);
            } else if (option === 'bowls') {
              handleStartSession(19);
            } else if (option === 'ambient') {
              setCurrentScreen('ambient');
            } else if (option === 'entertainment') {
              setCurrentScreen('entertainment');
            }
          }}
          onBack={() => setCurrentScreen('welcome')}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'solfeggio') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SolfeggioFrequencies
          onStartSession={async (trackId) => {
            await handleStartSession(trackId);
            setCurrentScreen('player');
          }}
          onBack={() => setCurrentScreen('main-menu')}
          onHome={handleBackToWelcome}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'entertainment') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <EntertainmentMenu
          onBack={() => setCurrentScreen('main-menu')}
          onHome={handleBackToWelcome}
        />
      </SafeAreaView>
    );
  }

  if (currentScreen === 'player' && sessionActive && status) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <PlayerScreen
          status={status}
          sessionStartTime={sessionStartTime}
          onPlayPause={() => handleAction(status.is_playing ? 'pause' : 'play')}
          onNext={() => handleAction('next')}
          onPrevious={() => handleAction('previous')}
          onShuffle={() => handleAction('shuffle')}
          onVolumeChange={handleVolumeChange}
          onBack={() => setCurrentScreen('main-menu')}
          onHome={handleBackToWelcome}
        />
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
