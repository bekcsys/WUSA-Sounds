import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import { audioFiles } from '../assets/audio';

export interface Track {
  id: number;
  name: string;
  file: string;
}

export interface PlayerStatus {
  current_track: number;
  track_name: string;
  is_playing: boolean;
  volume: number;
  shuffle: boolean;
}

// Track list - matches backend
// Note: Audio files should be in assets/audio/ directory
// The file property will be the path relative to assets/audio/
export const TRACKS: Track[] = [
  { id: 0, name: "OFF", file: "aPower.mp3" },
  { id: 1, name: "174Hz Sine Wave", file: "a174Hz.mp3" },
  { id: 2, name: "285Hz Sine Wave", file: "a285Hz.mp3" },
  { id: 3, name: "396Hz Sine Wave", file: "a396Hz.mp3" },
  { id: 4, name: "417Hz Sine Wave", file: "a417Hz.mp3" },
  { id: 5, name: "528Hz Sine Wave", file: "a528Hz.mp3" },
  { id: 6, name: "639Hz Sine Wave", file: "a639Hz.mp3" },
  { id: 7, name: "741Hz Sine Wave", file: "a741Hz.mp3" },
  { id: 8, name: "852Hz Sine Wave", file: "a852Hz.mp3" },
  { id: 9, name: "963Hz Sine Wave", file: "a963Hz.mp3" },
  { id: 10, name: "174 Meditation", file: "174Meditation.mp3" },
  { id: 11, name: "285 Healing", file: "285Healing.mp3" },
  { id: 12, name: "396 Freedom", file: "396Fearless.mp3" },
  { id: 13, name: "417 Positivity", file: "417Positivity.mp3" },
  { id: 14, name: "528 Love", file: "528Confidence.mp3" },
  { id: 15, name: "639 Harmony", file: "639Harmony.mp3" },
  { id: 16, name: "741 Expression", file: "741Cleansing.mp3" },
  { id: 17, name: "852 Intuition", file: "852Intuition.mp3" },
  { id: 18, name: "963 Enlightenment", file: "963Enlightenment.mp3" },
  { id: 19, name: "Bowl Zen", file: "Bowl01.mp3" },
  { id: 20, name: "Bowl Sings Peace", file: "Bowl02.mp3" },
  { id: 21, name: "Bowl Sings Joy", file: "Bowl03.mp3" },
  { id: 22, name: "Bowl Sings Love", file: "Bowl04.mp3" },
  { id: 23, name: "Bowl Sings Heal", file: "Bowl05.mp3" },
  { id: 24, name: "Bowl Sings Relax", file: "Bowl06.mp3" },
  { id: 25, name: "174Hz Tri-Bowls", file: "174TriBowl.mp3" },
  { id: 26, name: "285Hz Tri-Bowls", file: "285TriBowl.mp3" },
  { id: 27, name: "396Hz Tri-Bowls", file: "396TriBowl.mp3" },
];

class AudioPlayerService {
  private sound: Audio.Sound | null = null;
  private currentTrackId: number = 0;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private volume: number = 1.0;
  private shuffle: boolean = false;
  private listeners: ((status: PlayerStatus) => void)[] = [];

  constructor() {
    this.setupAudio();
  }

  private async setupAudio() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  }

  subscribe(listener: (status: PlayerStatus) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    const status = this.getStatus();
    this.listeners.forEach(listener => listener(status));
  }

  getStatus(): PlayerStatus {
    const track = TRACKS[this.currentTrackId];
    return {
      current_track: this.currentTrackId,
      track_name: track?.name || 'OFF',
      is_playing: this.isPlaying,
      volume: this.volume,
      shuffle: this.shuffle,
    };
  }

  async setTrack(trackId: number): Promise<void> {
    if (trackId < 0 || trackId >= TRACKS.length) {
      throw new Error(`Invalid track ID: ${trackId}`);
    }

    await this.stop();
    this.currentTrackId = trackId;

    if (trackId === 0) {
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyListeners();
      return;
    }

    // Auto-play when track is set
    await this.play();
  }

  async play(): Promise<void> {
    if (this.currentTrackId === 0) {
      throw new Error('Track 0 (OFF) cannot be played');
    }

    if (this.isPaused && this.sound) {
      // Resume
      await this.sound.playAsync();
      this.isPlaying = true;
      this.isPaused = false;
      this.notifyListeners();
      return;
    }

    // Load and play
    await this.stop();
    
    const track = TRACKS[this.currentTrackId];
    // Get audio file from assets mapping
    const audioModule = audioFiles[track.file];
    if (!audioModule) {
      throw new Error(`Audio file not found: ${track.file}`);
    }
    
    const asset = Asset.fromModule(audioModule);
    await asset.downloadAsync();

    const { sound } = await Audio.Sound.createAsync(
      asset,
      {
        shouldPlay: true,
        isLooping: true,
        volume: this.volume,
      }
    );

    this.sound = sound;
    this.isPlaying = true;
    this.isPaused = false;
    this.notifyListeners();
  }

  async pause(): Promise<void> {
    if (this.sound) {
      await this.sound.pauseAsync();
      this.isPlaying = false;
      this.isPaused = true;
      this.notifyListeners();
    }
  }

  async resume(): Promise<void> {
    if (!this.isPaused) {
      throw new Error('Audio is not paused');
    }
    await this.play();
  }

  async stop(): Promise<void> {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
    this.isPlaying = false;
    this.isPaused = false;
  }

  async setVolume(volume: number): Promise<void> {
    this.volume = Math.max(0.0, Math.min(1.0, volume));
    if (this.sound) {
      await this.sound.setVolumeAsync(this.volume);
    }
    this.notifyListeners();
  }

  async nextTrack(): Promise<void> {
    if (this.currentTrackId >= TRACKS.length - 1) {
      this.currentTrackId = 1; // Skip track 0
    } else {
      this.currentTrackId += 1;
    }

    if (this.isPlaying) {
      await this.play();
    } else {
      this.notifyListeners();
    }
  }

  async previousTrack(): Promise<void> {
    if (this.currentTrackId <= 1) {
      this.currentTrackId = TRACKS.length - 1;
    } else {
      this.currentTrackId -= 1;
    }

    if (this.isPlaying) {
      await this.play();
    } else {
      this.notifyListeners();
    }
  }

  toggleShuffle(): void {
    this.shuffle = !this.shuffle;
    this.notifyListeners();
  }

  getTracks(): Track[] {
    return TRACKS;
  }
}

export const audioPlayer = new AudioPlayerService();
