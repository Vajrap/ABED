import React from "react";
import { IconButton, Tooltip, alpha, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";

export interface SettingsButtonProps {
  onClick: () => void;
}

/**
 * Settings button - Positioned in top-right corner with game time/location
 */
export const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  const theme = useTheme();

  return (
    <Tooltip title="Settings" placement="left" arrow>
      <IconButton
        onClick={onClick}
        sx={{
          width: 48,
          height: 48,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          border: `2px solid ${theme.palette.secondary.main}`,
          boxShadow: `
            0 4px 16px ${alpha("#000", 0.2)},
            inset 0 1px 0 ${alpha("#fff", 0.3)}
          `,
          "&:hover": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
            transform: "translateY(-2px)",
            boxShadow: `
              0 6px 20px ${alpha("#000", 0.3)},
              inset 0 1px 0 ${alpha("#fff", 0.3)}
            `,
          },
          transition: "all 0.2s ease-out",
        }}
      >
        <Settings sx={{ color: theme.palette.secondary.main }} />
      </IconButton>
    </Tooltip>
  );
};

