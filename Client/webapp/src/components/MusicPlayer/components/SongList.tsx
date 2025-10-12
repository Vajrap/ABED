import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close, PlayArrow } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Track } from "../types";
import { ScrollingTextComponent } from "./ScrollingText";

const SongListContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  right: 0,
  width: 280,
  maxHeight: 300,
  overflowY: "auto",
  zIndex: 10000,
  marginTop: theme.spacing(1),
  background: `linear-gradient(135deg, ${theme.palette.background.paper}95, ${theme.palette.background.paper}95)`,
  backdropFilter: "blur(12px)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
}));

const ListHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

interface SongListProps {
  tracks: Track[];
  currentTrackIndex: number;
  onSelectTrack: (index: number) => void;
  onClose: () => void;
}

export const SongList: React.FC<SongListProps> = ({
  tracks,
  currentTrackIndex,
  onSelectTrack,
  onClose,
}) => {
  return (
    <SongListContainer elevation={8}>
      <ListHeader>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          Playlist ({tracks.length})
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
          <Close fontSize="small" />
        </IconButton>
      </ListHeader>
      
      <List dense sx={{ padding: 0 }}>
        {tracks.map((track, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              backgroundColor: index === currentTrackIndex ? "action.selected" : "transparent",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <ListItemButton
              onClick={() => onSelectTrack(index)}
              sx={{
                py: 0.5,
                px: 2,
                minHeight: 48,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 1,
                }}
              >
                {index === currentTrackIndex && (
                  <PlayArrow fontSize="small" color="primary" />
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <ScrollingTextComponent
                    text={track.title}
                    maxWidth={180}
                    variant="body2"
                    color={index === currentTrackIndex ? "primary" : "text.primary"}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ display: "block", mt: 0.25 }}
                  >
                    {track.artist}
                  </Typography>
                </Box>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SongListContainer>
  );
};
