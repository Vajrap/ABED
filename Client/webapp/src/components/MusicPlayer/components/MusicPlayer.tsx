import React from "react";
import {
  Paper,
  IconButton,
  Slider,
  Box,
  Tooltip,
  Fade,
  Typography,
} from "@mui/material";
// import { useNavigate } from "react-router-dom"; // Removed - using dedicated VR toggle
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  VolumeMute,
  MusicNote,
  ExpandLess,
  ExpandMore,
  SkipPrevious,
  SkipNext,
  Replay10,
  Forward10,
  Shuffle,
  PlaylistPlay,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useLocalization, L10N } from "@/localization";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { ScrollingTextComponent } from "./ScrollingText";
import { SongList } from "./SongList";

const FloatingPlayer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1000,
  padding: theme.spacing(1),
  minWidth: 60,
  width: "fit-content",
  maxWidth: 320,
  height: "fit-content",
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  backdropFilter: "blur(12px)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  },
}));

const CompactView = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 40,
}));

const ExpandedView = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 280,
  height: 220,
  position: "relative",
}));

const VolumeSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "& .MuiSlider-thumb": {
    width: 16,
    height: 16,
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    height: 3,
    opacity: 0.3,
  },
}));

const ProgressSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 4,
  "& .MuiSlider-thumb": {
    width: 12,
    height: 12,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`,
    },
  },
  "& .MuiSlider-track": {
    height: 4,
    borderRadius: 2,
  },
  "& .MuiSlider-rail": {
    height: 4,
    borderRadius: 2,
    opacity: 0.2,
  },
}));

export const MusicPlayer: React.FC = () => {
  const {
    state,
    currentTrack,
    audioRef,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    toggleExpanded,
    formatTime,
    getVolumeIcon,
    toggleShuffle,
    toggleSongList,
    seekBackward,
    seekForward,
    nextTrack,
    previousTrack,
    selectTrack,
    tracks,
  } = useMusicPlayer();

  const { t } = useLocalization();

  const renderVolumeIcon = () => {
    const volumeLevel = getVolumeIcon();
    switch (volumeLevel) {
      case "muted":
        return <VolumeOff />;
      case "low":
        return <VolumeMute />;
      case "high":
        return <VolumeUp />;
      default:
        return <VolumeUp />;
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" loop={false} />

      <FloatingPlayer elevation={8}>
        {!state.isExpanded ? (
          // Compact view
          <CompactView>
            <Tooltip
              title={
                state.isPlaying ? t(L10N.musicPlayer.pause) : t(L10N.musicPlayer.play)
              }
            >
              <IconButton
                onClick={togglePlay}
                size="small"
                disabled={state.isLoading}
                sx={{
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                {state.isLoading ? (
                  <MusicNote
                    sx={{ animation: "pulse 1.5s ease-in-out infinite" }}
                  />
                ) : state.isPlaying ? (
                  <Pause />
                ) : (
                  <PlayArrow />
                )}
              </IconButton>
            </Tooltip>

            <Box sx={{ flex: 1, mx: 1, minWidth: 0, display: "flex", alignItems: "center" }}>
              <ScrollingTextComponent
                text={currentTrack.title}
                maxWidth={120}
                variant="body2"
                color="text.primary"
              />
            </Box>

            <Tooltip title={t(L10N.musicPlayer.expandPlayer)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
              <IconButton
                onClick={toggleExpanded}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                <ExpandMore />
              </IconButton>
            </Tooltip>
          </CompactView>
        ) : (
          // Expanded view
          <Fade in={state.isExpanded} timeout={300}>
            <ExpandedView>
              {/* Header with track info and collapse button */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={1}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <ScrollingTextComponent
                    text={currentTrack.title}
                    maxWidth={200}
                    variant="body1"
                    color="text.primary"
                  />
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block", mt: 0.25 }}>
                    {currentTrack.artist}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Tooltip title={t(L10N.musicPlayer.togglePlaylist)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                    <IconButton
                      onClick={toggleSongList}
                      size="small"
                      sx={{ 
                        color: state.showSongList ? "primary.main" : "text.secondary",
                        "&:hover": {
                          backgroundColor: state.showSongList ? "primary.main" : "action.hover",
                          color: state.showSongList ? "primary.contrastText" : "text.primary",
                        }
                      }}
                    >
                      <PlaylistPlay fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t(L10N.musicPlayer.collapsePlayer)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                    <IconButton
                      onClick={toggleExpanded}
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      <ExpandLess />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Progress bar */}
              <Box mb={2}>
                <ProgressSlider
                  size="small"
                  value={state.duration ? (state.currentTime / state.duration) * 100 : 0}
                  onChange={handleProgressChange}
                  aria-label="Track progress"
                />
                <Box display="flex" justifyContent="space-between" mt={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(state.currentTime)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(state.duration)}
                  </Typography>
                </Box>
              </Box>

              {/* Navigation controls */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={0.5}
                mb={2}
              >
                <Tooltip title={t(L10N.musicPlayer.previousTrack)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                  <IconButton onClick={previousTrack} size="small" sx={{ color: "text.secondary" }}>
                    <SkipPrevious />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t(L10N.musicPlayer.seekBack)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                  <IconButton onClick={seekBackward} size="small" sx={{ color: "text.secondary" }}>
                    <Replay10 />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    state.isPlaying
                      ? t(L10N.musicPlayer.pause)
                      : t(L10N.musicPlayer.play)
                  }
                  slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}
                >
                  <IconButton
                    onClick={togglePlay}
                    disabled={state.isLoading}
                    sx={{ 
                      color: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                      },
                    }}
                  >
                    {state.isLoading ? (
                      <MusicNote
                        sx={{ animation: "pulse 1.5s ease-in-out infinite" }}
                      />
                    ) : state.isPlaying ? (
                      <Pause />
                    ) : (
                      <PlayArrow />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title={t(L10N.musicPlayer.seekForward)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                  <IconButton onClick={seekForward} size="small" sx={{ color: "text.secondary" }}>
                    <Forward10 />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t(L10N.musicPlayer.nextTrack)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                  <IconButton onClick={nextTrack} size="small" sx={{ color: "text.secondary" }}>
                    <SkipNext />
                  </IconButton>
                </Tooltip>

                <Tooltip title={t(L10N.musicPlayer.toggleShuffle)} slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}>
                  <IconButton
                    onClick={toggleShuffle}
                    size="small"
                    sx={{ 
                      color: state.isShuffle ? "primary.main" : "text.secondary",
                      "&:hover": {
                        backgroundColor: state.isShuffle ? "primary.main" : "action.hover",
                        color: state.isShuffle ? "primary.contrastText" : "text.primary",
                      }
                    }}
                  >
                    <Shuffle fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Volume controls */}
              <Box display="flex" alignItems="center">
                <Tooltip
                  title={
                    state.isMuted
                      ? t(L10N.musicPlayer.unmute)
                      : t(L10N.musicPlayer.mute)
                  }
                  slotProps={{ tooltip: { sx: { zIndex: 1300 } } }}
                >
                  <IconButton
                    onClick={toggleMute}
                    size="small"
                    sx={{ color: "text.secondary", mr: 1 }}
                  >
                    {renderVolumeIcon()}
                  </IconButton>
                </Tooltip>

                <VolumeSlider
                  size="small"
                  value={state.isMuted ? 0 : state.volume * 100}
                  onChange={handleVolumeChange}
                  aria-label={t(L10N.musicPlayer.volumeControl)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>

              {/* Song List */}
              {state.showSongList && (
                <SongList
                  tracks={tracks}
                  currentTrackIndex={state.currentTrackIndex}
                  onSelectTrack={selectTrack}
                  onClose={toggleSongList}
                />
              )}
            </ExpandedView>
          </Fade>
        )}
      </FloatingPlayer>
    </>
  );
};
