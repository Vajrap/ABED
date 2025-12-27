import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { getActionsForPhase, getActionById } from "@/config/actions";
import { ActionSubSelectionModal } from "./ActionSubSelectionModal";
import { getSubSelectionOptions } from "@/config/subSelectionOptions";
import { DirectionsWalk } from "@mui/icons-material";

export interface ActionSelectionModalProps {
  open: boolean;
  onClose: () => void;
  day: number;
  phase: number;
  onActionSelect: (actionId: string, subSelectionValue?: string) => void;
  characterSkills?: Record<string, { level: number; exp: number }>; // Character's skills for Train Skill sub-selection
  availableActionsByPhase?: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  }; // Phase-specific actions from backend
  isTraveling?: boolean; // Whether the party is currently traveling
  travelDestination?: string; // Destination location name
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
  characterSkills,
  availableActionsByPhase,
  isTraveling = false,
  travelDestination,
}) => {
  const theme = useTheme();
  
  // Map phase index (0-3) to phase name
  const PHASE_KEYS: ("morning" | "afternoon" | "evening" | "night")[] = ["morning", "afternoon", "evening", "night"];
  const phaseKey = PHASE_KEYS[phase] || "morning";
  
  // Get available actions for this phase - use backend data if available, fallback to mock config
  const phaseActionIds = availableActionsByPhase?.[phaseKey] || getActionsForPhase(phase).map(a => a.id);
  const availableActions = phaseActionIds
    .map(id => getActionById(id))
    .filter(Boolean) as ReturnType<typeof getActionsForPhase>;
  const [subSelectionModalOpen, setSubSelectionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<(typeof availableActions)[0] | null>(null);

  const handleActionClick = (action: typeof availableActions[0]) => {
    if (action.needsSubSelection && action.subSelectionType) {
      // Open sub-selection modal
      setSelectedAction(action);
      setSubSelectionModalOpen(true);
    } else {
      // No sub-selection needed, select directly
      onActionSelect(action.id);
      onClose();
    }
  };

  const handleSubSelectionConfirm = (actionId: string, subSelectionValue: string) => {
    // Store action with parameter: "actionId|parameterValue"
    onActionSelect(actionId, subSelectionValue);
    setSubSelectionModalOpen(false);
    setSelectedAction(null);
    onClose();
  };

  const handleSubSelectionCancel = () => {
    setSubSelectionModalOpen(false);
    setSelectedAction(null);
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
          padding: 1,
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
          fontSize: "1.25rem",
          fontWeight: 700,
          color: theme.palette.tertiary.main,
          textAlign: "center",
          pb: 1.5,
          borderBottom: `2px solid ${alpha(theme.palette.tertiary.main, 0.3)}`,
        }}
      >
        Select Action
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 2 }}>
        {/* Time Slot Info */}
        <Typography
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "0.95rem",
            color: theme.palette.text.secondary,
            textAlign: "center",
            mb: 2,
          }}
        >
          Day {day + 1} - {PHASE_NAMES[phase]}
        </Typography>

        {/* Action Options */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {/* Travel Action - shown when party is traveling */}
          {isTraveling && (
            <Box
              onClick={() => {
                onActionSelect("Travel");
                onClose();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                padding: 1.25,
                borderRadius: 1,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                cursor: "pointer",
                transition: "all 0.2s ease-out",
                mb: 1,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  border: `2px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
                "&:active": {
                  transform: "translateX(1px)",
                },
              }}
            >
              <DirectionsWalk
                sx={{
                  fontSize: "1.25rem",
                  color: theme.palette.primary.main,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    lineHeight: 1.3,
                  }}
                >
                  Travel
                </Typography>
                {travelDestination && (
                  <Typography
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      fontSize: "0.8rem",
                      color: theme.palette.text.secondary,
                      lineHeight: 1.2,
                      mt: 0.25,
                    }}
                  >
                    (to {travelDestination})
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          
          {availableActions.map((action) => {
            const ActionIcon = action.icon;
            
            return (
              <Box
                key={action.id}
                onClick={() => handleActionClick(action)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  padding: 1.25,
                  borderRadius: 1,
                  border: `2px solid ${alpha(theme.palette.tertiary.main, 0.3)}`,
                  backgroundColor: alpha("#fff", 0.3),
                  cursor: "pointer",
                  transition: "all 0.2s ease-out",

                  "&:hover": {
                    backgroundColor: alpha(theme.palette.tertiary.main, 0.15),
                    border: `2px solid ${theme.palette.tertiary.main}`,
                    boxShadow: `0 0 12px ${alpha(theme.palette.tertiary.main, 0.3)}`,
                  },

                  "&:active": {
                    transform: "translateX(1px)",
                  },
                }}
              >
                <ActionIcon
                  sx={{
                    fontSize: "1.25rem",
                    color: theme.palette.tertiary.main,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: "Crimson Text, serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                    }}
                  >
                    {action.name}
                  </Typography>
                  {action.needsSubSelection && (
                    <Typography
                      sx={{
                        fontFamily: "Crimson Text, serif",
                        fontSize: "0.75rem",
                        color: theme.palette.text.secondary,
                        fontStyle: "italic",
                        lineHeight: 1.2,
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

      {/* Sub-selection Modal */}
      {selectedAction && selectedAction.subSelectionType && (
        <ActionSubSelectionModal
          open={subSelectionModalOpen}
          onClose={handleSubSelectionCancel}
          action={selectedAction}
          onSelect={handleSubSelectionConfirm}
          availableOptions={getSubSelectionOptions(
            selectedAction.subSelectionType,
            characterSkills
          )}
        />
      )}
    </Dialog>
  );
};

