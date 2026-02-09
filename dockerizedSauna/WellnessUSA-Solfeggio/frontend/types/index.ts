export interface PlayerStatus {
  current_track: number
  track_name: string
  is_playing: boolean
  volume: number
  shuffle: boolean
}

export interface Track {
  id: number
  name: string
  file: string
}

