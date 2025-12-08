import React from "react";
import { Box, Typography, Chip, alpha, useTheme, Tooltip } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

export interface ActionIndicatorProps {
  actionName: string; // Name of the current action
  actionType?: string; // Type of action (e.g., "crafting", "training", "resting")
  isNext?: boolean; // Is this the action that will execute NEXT?
}

/**
 * Action indicator component
 * Shows the current action that will execute NEXT
 */
export const ActionIndicator: React.FC<ActionIndicatorProps> = ({
  actionName,
  actionType,
  isNext = true,
}) => {
  const theme = useTheme();

  // Get color based on action type
  const getActionColor = (type?: string): string => {
    switch (type) {
      case "crafting":
        return theme.palette.warning.main;
      case "training":
        return theme.palette.info?.main || theme.palette.secondary.main;
      case "resting":
        return theme.palette.success.main;
      case "traveling":
        return theme.palette.primary.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  if (!actionName) return null;

  return (
    <Tooltip title={isNext ? "Next action to execute" : "Current action"} arrow>
      <Chip
        icon={<PlayArrow sx={{ fontSize: "1rem !important" }} />}
        label={actionName}
        size="small"
        sx={{
          fontFamily: "Crimson Text, serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          height: 24,
          backgroundColor: alpha(getActionColor(actionType), 0.2),
          color: getActionColor(actionType),
          border: `1px solid ${alpha(getActionColor(actionType), 0.4)}`,
          "& .MuiChip-icon": {
            color: getActionColor(actionType),
          },
          "& .MuiChip-label": {
            padding: "0 8px",
          },
        }}
      />
    </Tooltip>
  );
};

