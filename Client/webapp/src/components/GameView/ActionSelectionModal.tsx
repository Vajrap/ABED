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
import { getActionsForPhase } from "@/config/actions";

export interface ActionSelectionModalProps {
  open: boolean;
  onClose: () => void;
  day: number;
  phase: number;
  onActionSelect: (actionId: string) => void;
}

const PHASE_NAMES = ["Morning", "Afternoon", "Evening", "Night"];

/**
 * Modal for selecting an action for a specific time slot
 */
export const ActionSelectionModal: React.FC<ActionSelectionModalProps> = ({
  open,
  onClose,
  day,
  phase,
  onActionSelect,
}) => {
  const theme = useTheme();

  // Get available actions for this phase (from frontend config)
  const availableActions = getActionsForPhase(phase);

  const handleActionClick = (action: typeof availableActions[0]) => {
    if (action.needsSubSelection) {
      // TODO: Open sub-selection modal (e.g., training -> select skill)
      console.log(`Action ${action.name} needs sub-selection`);
      onClose();
    } else {
      onActionSelect(action.id);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 3,
          fontFamily: "Crimson Text, serif",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.tertiary.main}`,
          boxShadow: `
            0 0 30px ${alpha(theme.palette.tertiary.main, 0.3)},
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
          fontSize: "1.5rem",
          fontWeight: 700,
          color: theme.palette.tertiary.main,
          textAlign: "center",
          pb: 2,
          borderBottom: `2px solid ${alpha(theme.palette.tertiary.main, 0.3)}`,
        }}
      >
        Select Action
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Time Slot Info */}
        <Typography
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "1.1rem",
            color: theme.palette.text.secondary,
            textAlign: "center",
            mb: 3,
          }}
        >
          Day {day + 1} - {PHASE_NAMES[phase]}
        </Typography>

        {/* Action Options */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {availableActions.map((action) => {
            const ActionIcon = action.icon;
            
            return (
              <Box
                key={action.id}
                onClick={() => handleActionClick(action)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  padding: 2.5,
                  borderRadius: 1.5,
                  border: `2px solid ${alpha(theme.palette.tertiary.main, 0.3)}`,
                  backgroundColor: alpha("#fff", 0.3),
                  cursor: "pointer",
                  transition: "all 0.2s ease-out",

                  "&:hover": {
                    backgroundColor: alpha(theme.palette.tertiary.main, 0.15),
                    border: `2px solid ${theme.palette.tertiary.main}`,
                    boxShadow: `0 0 16px ${alpha(theme.palette.tertiary.main, 0.3)}`,
                    transform: "translateX(4px)",
                  },

                  "&:active": {
                    transform: "translateX(2px)",
                  },
                }}
              >
                <ActionIcon
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.tertiary.main,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {action.name}
                  </Typography>
                  {action.needsSubSelection && (
                    <Typography
                      sx={{
                        fontFamily: "Crimson Text, serif",
                        fontSize: "0.9rem",
                        color: theme.palette.text.secondary,
                        fontStyle: "italic",
                      }}
                    >
                      (requires selection)
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

