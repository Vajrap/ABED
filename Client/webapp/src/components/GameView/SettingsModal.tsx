import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

export interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Settings modal - Empty for now
 * Will contain language settings and other game settings
 */
export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 3,
          fontFamily: "Crimson Text, serif",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.secondary.main}`,
          boxShadow: `
            0 0 30px ${alpha(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${alpha("#000", 0.15)}
          `,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: alpha("#1A1A2E", 0.7),
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: theme.palette.secondary.main,
          textAlign: "center",
          pb: 2,
          borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
        }}
      >
        Settings
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "1rem",
              color: theme.palette.text.secondary,
            }}
          >
            Settings page - Coming soon
          </Typography>
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.9rem",
              color: theme.palette.text.disabled,
              mt: 2,
            }}
          >
            Language settings and other game preferences will be available here.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

