export interface Track {
  title: string;
  artist: string;
  src: string;
  duration: number;
}

export interface MusicPlayerState {
  isPlaying: boolean;
  isExpanded: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  currentTrackIndex: number;
  isLoading: boolean;
  isShuffle: boolean;
  showSongList: boolean;
}
