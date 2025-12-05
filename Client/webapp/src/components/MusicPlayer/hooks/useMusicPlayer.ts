import { useState, useRef, useEffect } from "react";
import { MusicPlayerState } from "../types";
import { SONG_LIST } from "../songList";

export const useMusicPlayer = () => {
  const [state, setState] = useState<MusicPlayerState>({
    isPlaying: false,
    isExpanded: false,
    volume: 0.7,
    isMuted: false,
    currentTime: 0,
    duration: 0,
    currentTrackIndex: 0,
    isLoading: false,
    isShuffle: false,
    showSongList: false,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolumeRef = useRef(state.volume);

  const currentTrack = SONG_LIST[state.currentTrackIndex];

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setState(prev => ({ ...prev, duration: audio.duration, isLoading: false }));
    };

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      // Auto-play next track
      const nextIndex = (state.currentTrackIndex + 1) % SONG_LIST.length;
      setState(prev => ({ ...prev, currentTrackIndex: nextIndex }));
    };

    const handleLoadStart = () => {
      // Only show loading if we're actually trying to play
      if (state.isPlaying) {
        setState(prev => ({ ...prev, isLoading: true }));
      }
    };

    const handleError = () => {
      console.warn("Audio failed to load:", currentTrack.src);
      setState(prev => ({ ...prev, isLoading: false, isPlaying: false }));
    };

    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("error", handleError);
    };
  }, [state.currentTrackIndex, currentTrack.src, state.isPlaying]);

  // Update audio volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = state.isMuted ? 0 : state.volume;
    }
  }, [state.volume, state.isMuted]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      audio.src = currentTrack.src;
      // Reset loading state when changing tracks
      setState(prev => ({ ...prev, isLoading: false }));
      if (state.isPlaying) {
        audio.play().catch(console.warn);
      }
    }
  }, [state.currentTrackIndex, currentTrack.src, state.isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.warn);
    }
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const toggleMute = () => {
    if (state.isMuted) {
      setState(prev => ({ ...prev, volume: previousVolumeRef.current, isMuted: false }));
    } else {
      previousVolumeRef.current = state.volume;
      setState(prev => ({ ...prev, volume: 0, isMuted: true }));
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
    setState(prev => ({ 
      ...prev, 
      volume: newVolume / 100,
      isMuted: newVolume > 0 ? false : prev.isMuted
    }));
  };

  const handleProgressChange = (_: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
    audio.currentTime = (newTime / 100) * state.duration;
    setState(prev => ({ ...prev, currentTime: audio.currentTime }));
  };

  const toggleExpanded = () => {
    setState(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
  };

  const nextTrack = () => {
    let currentIndex = state.currentTrackIndex;
    
    const getNextIndex = () => {
      if (SONG_LIST.length === 1) return 0;

      if (state.isShuffle) {
        return Math.floor(Math.random() * SONG_LIST.length);
      }
      return (state.currentTrackIndex + 1) % SONG_LIST.length;
    };

    let nextIndex = getNextIndex();
    while (nextIndex === currentIndex) {
      nextIndex = getNextIndex();
    };

    setState(prev => ({ ...prev, currentTrackIndex: nextIndex }));
  };

    

  const previousTrack = () => {
    const prevIndex = state.currentTrackIndex === 0
      ? SONG_LIST.length - 1
      : state.currentTrackIndex - 1;
    setState(prev => ({ ...prev, currentTrackIndex: prevIndex }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getVolumeIcon = () => {
    if (state.isMuted || state.volume === 0) return "muted";
    if (state.volume < 0.5) return "low";
    return "high";
  };

  const toggleShuffle = () => {
    setState(prev => ({ ...prev, isShuffle: !prev.isShuffle }));
  };

  const toggleSongList = () => {
    setState(prev => ({ ...prev, showSongList: !prev.showSongList }));
  };

  const seekBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
    setState(prev => ({ ...prev, currentTime: audio.currentTime }));
  };

  const seekForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    setState(prev => ({ ...prev, currentTime: audio.currentTime }));
  };

  const selectTrack = (index: number) => {
    setState(prev => ({ ...prev, currentTrackIndex: index }));
  };

  return {
    state,
    currentTrack,
    audioRef,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    toggleExpanded,
    nextTrack,
    previousTrack,
    formatTime,
    getVolumeIcon,
    toggleShuffle,
    toggleSongList,
    seekBackward,
    seekForward,
    selectTrack,
    tracks: SONG_LIST,
  };
};
