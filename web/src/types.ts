export interface Track {
  id: string;
  title: string;
  source: string;
}

export interface MediaOption {
  id: string;
  label: string;
  tracks: Track[];
}

export interface WelcomeOption {
  id: string;
  label: string;
  logo: string;
  tracks: Track[];
}

export interface PlaybackActions {
  play: () => void;
  pause: () => void;
  prev: () => void;
  next: () => void;
  seek: (positionSec: number) => void;
  toggleShuffle: () => void;
}

export interface PlaybackState {
  isPlaying: boolean;
  isShuffle: boolean;
  currentTrackIndex: number;
  currentTrackTitle: string | null;
  trackCount: number;
  progress: number;
  currentTimeSec: number;
  durationSec: number;
  formatTime: (sec: number) => string;
  actions: PlaybackActions;
}
