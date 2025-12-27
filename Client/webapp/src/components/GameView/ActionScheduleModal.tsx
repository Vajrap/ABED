import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  WbSunny,
  WbTwilight,
  NightsStay,
  WbSunnyTwoTone,
  DirectionsWalk,
  Train,
} from "@mui/icons-material";
import { ActionSelectionModal } from "./ActionSelectionModal";
import { getActionById } from "@/config/actions";

// Day names matching DayOfWeek enum: laoh, rowana, aftree, udur, matris, seethar
const DAYS = ["Laoh", "Rowana", "Aftree", "Udur", "Matris", "Seethar"];
const PHASES = [
  { name: "Morning", icon: WbSunny, color: "#ff9933" }, // Orange - sunrise
  { name: "Afternoon", icon: WbSunnyTwoTone, color: "#ffcc00" }, // Yellow - bright sun
  { name: "Evening", icon: WbTwilight, color: "#9933ff" }, // Purple - twilight
  { name: "Night", icon: NightsStay, color: "#0066cc" }, // Deep Blue - night sky
];

export interface ActionScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (schedule: Record<string, string>) => void;
  onTravelClick?: () => void;
  onRailTravelClick?: () => void;
  hasRailStation?: boolean; // Whether current location has a rail station
  characterSkills?: Record<string, { level: number; exp: number }>; // Character's skills for Train Skill sub-selection
  availableActionsByPhase?: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  }; // Phase-specific actions from backend
  initialSchedule?: Record<string, string>; // Initial schedule to load (from character.actionSequence)
  currentDay?: number; // Current day index (0-5), where 0=laoh, 1=rowana, etc.
  currentPhase?: number; // Current phase index (0-3), where 0=morning, 1=afternoon, 2=evening, 3=night
  isTraveling?: boolean; // Whether the party is currently traveling
  travelDestination?: string; // Destination location name
}

/**
 * Full-screen modal for weekly action planning
 * 6 days × 4 phases = 24 action slots
 */
export const ActionScheduleModal: React.FC<ActionScheduleModalProps> = ({
  open,
  onClose,
  onSave,
  onTravelClick,
  onRailTravelClick,
  hasRailStation = true, // Default to true for now (can be disabled later)
  characterSkills,
  availableActionsByPhase,
  initialSchedule,
  currentDay,
  currentPhase,
  isTraveling = false,
  travelDestination,
}) => {
  const theme = useTheme();
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; phase: number } | null>(null);

  // Initialize schedule from initialSchedule prop when modal opens
  React.useEffect(() => {
    if (open && initialSchedule) {
      setSchedule(initialSchedule);
    } else if (open && !initialSchedule) {
      // Reset to empty if no initial schedule
      setSchedule({});
    }
  }, [open, initialSchedule]);

  const handleCellClick = (day: number, phase: number) => {
    setSelectedSlot({ day, phase });
    setSelectionModalOpen(true);
  };

  const handleActionSelect = (actionId: string, subSelectionValue?: string) => {
    if (selectedSlot) {
      const key = `${selectedSlot.day}-${selectedSlot.phase}`;
      // Store action with parameter in format: "actionId|parameterValue" if sub-selection exists
      const actionKey = subSelectionValue ? `${actionId}|${subSelectionValue}` : actionId;
      setSchedule({ ...schedule, [key]: actionKey });
    }
  };

  const getActionForSlot = (day: number, phase: number): string | null => {
    const key = `${day}-${phase}`;
    return schedule[key] || null;
  };

  const handleSave = () => {
    if (onSave) {
      onSave(schedule);
    }
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
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
            minHeight: "80vh",
            overflow: "hidden",
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
            pb: 1,
            borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
            mb: 2,
          }}
        >
          Weekly Action Schedule
        </DialogTitle>

        <DialogContent
          sx={{
            overflow: "hidden",
            "& > *": {
              overflow: "visible",
            },
          }}
        >
          {/* Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 1,
              overflow: "visible",
              position: "relative",
            }}
          >
            {/* Day headers */}
            {DAYS.map((day, dayIndex) => (
              <Box
                key={`day-header-${dayIndex}`}
                sx={{
                  textAlign: "center",
                  padding: 0.75,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  borderRadius: 1,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: theme.palette.secondary.main,
                  }}
                >
                  {day}
                </Typography>
              </Box>
            ))}

            {/* Phase rows */}
            {PHASES.map((phase, phaseIndex) => (
              <React.Fragment key={`phase-${phaseIndex}`}>
                {DAYS.map((_, dayIndex) => {
                  const PhaseIcon = phase.icon;
                  const actionKey = getActionForSlot(dayIndex, phaseIndex);
                  // Parse action key: "actionId" or "actionId|parameterValue"
                  const actionId = actionKey?.includes("|") ? actionKey.split("|")[0] : actionKey;
                  const parameterValue = actionKey?.includes("|") ? actionKey.split("|")[1] : null;
                  const actionDef = actionId ? getActionById(actionId) : null;
                  const ActionIcon = actionDef?.icon || null;
                  
                  // Check if this is the current phase slot
                  const isCurrentPhase = currentDay !== undefined && currentPhase !== undefined &&
                    dayIndex === currentDay && phaseIndex === currentPhase;
                  
                  return (
                    <Box
                      key={`cell-${dayIndex}-${phaseIndex}`}
                      onClick={() => handleCellClick(dayIndex, phaseIndex)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.25,
                        padding: 1,
                        cursor: "pointer",
                        borderRadius: 1.5,
                        border: isCurrentPhase
                          ? `4px solid #ffcc00` // Broader yellow border for current phase
                          : actionDef
                          ? `2px solid ${theme.palette.tertiary.main}`
                          : `2px solid ${alpha(theme.palette.text.disabled, 0.3)}`,
                        backgroundColor: isCurrentPhase
                          ? alpha("#ffcc00", 0.2) // Light yellow background for current phase
                          : actionDef
                          ? alpha(theme.palette.tertiary.main, 0.15)
                          : alpha("#fff", 0.3),
                        transition: "all 0.2s ease-out",
                        height: "13vh",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: isCurrentPhase
                          ? `0 0 16px ${alpha("#ffcc00", 0.5)}` // Yellow glow for current phase
                          : "none",

                        "&:hover": {
                          backgroundColor: isCurrentPhase
                            ? alpha("#ffcc00", 0.25)
                            : alpha(theme.palette.tertiary.main, 0.2),
                          border: isCurrentPhase
                            ? `4px solid #ffcc00`
                            : `2px solid ${theme.palette.tertiary.main}`,
                          boxShadow: isCurrentPhase
                            ? `0 0 20px ${alpha("#ffcc00", 0.6)}`
                            : `0 0 12px ${alpha(theme.palette.tertiary.main, 0.3)}`,
                          transform: "scale(1.05)",
                          zIndex: 1,
                        },

                        "&:active": {
                          transform: "scale(0.98)",
                        },
                      }}
                    >
                      {/* Phase indicator icon (small, top) */}
                      <PhaseIcon
                        sx={{
                          fontSize: "1.5rem",
                          color: phase.color,
                          opacity: 0.8,
                          filter: `drop-shadow(0 0 2px ${alpha(phase.color, 0.3)})`,
                          position: "relative",
                          zIndex: 0,
                        }}
                      />
                      
                      {/* Action icon (large, center) */}
                      {ActionIcon ? (
                        <ActionIcon
                          sx={{
                            fontSize: "1.8rem",
                            color: theme.palette.tertiary.main,
                          }}
                        />
                      ) : (
                        <Box sx={{ height: "1.8rem" }} /> // Placeholder spacing
                      )}
                      
                      {/* Action name (small text) */}
                      <Typography
                        sx={{
                          fontFamily: "Crimson Text, serif",
                          fontSize: "0.7rem",
                          color: actionDef ? theme.palette.text.primary : theme.palette.text.secondary,
                          textAlign: "center",
                          fontWeight: actionDef ? 600 : 400,
                        }}
                      >
                        {actionDef ? actionDef.name : "None"}
                      </Typography>
                      
                      {/* Parameter value (if exists) */}
                      {parameterValue && (
                        <Typography
                          sx={{
                            fontFamily: "Crimson Text, serif",
                            fontSize: "0.6rem",
                            color: theme.palette.text.secondary,
                            textAlign: "center",
                            fontStyle: "italic",
                            opacity: 0.8,
                          }}
                        >
                          {parameterValue}
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </React.Fragment>
            ))}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            padding: 3,
            paddingTop: 2,
            gap: 2,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "1.05rem",
              textTransform: "none",
              px: 3,
              color: theme.palette.text.secondary,
              border: `2px solid ${theme.palette.text.disabled}`,
              "&:hover": {
                border: `2px solid ${theme.palette.text.secondary}`,
              },
            }}
          >
            Cancel
          </Button>

          {/* Travel Buttons - Between Cancel and Save */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={onTravelClick}
              variant="outlined"
              startIcon={<DirectionsWalk />}
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "1.05rem",
                textTransform: "none",
                px: 3,
                color: theme.palette.primary.main,
                border: `2px solid ${theme.palette.primary.main}`,
                "&:hover": {
                  border: `2px solid ${theme.palette.primary.dark}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              Travel
            </Button>
            <Button
              onClick={onRailTravelClick}
              variant="outlined"
              startIcon={<Train />}
              disabled={!hasRailStation}
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "1.05rem",
                textTransform: "none",
                px: 3,
                color: theme.palette.primary.main,
                border: `2px solid ${hasRailStation ? theme.palette.primary.main : theme.palette.text.disabled}`,
                "&:hover": {
                  border: `2px solid ${hasRailStation ? theme.palette.primary.dark : theme.palette.text.disabled}`,
                  backgroundColor: hasRailStation ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                },
                "&.Mui-disabled": {
                  border: `2px solid ${theme.palette.text.disabled}`,
                  color: theme.palette.text.disabled,
                },
              }}
            >
              Rail
            </Button>
          </Box>

          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "1.05rem",
              textTransform: "none",
              px: 3,
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Save Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Selection Modal (nested) */}
      {selectedSlot && (
        <ActionSelectionModal
          open={selectionModalOpen}
          onClose={() => setSelectionModalOpen(false)}
          day={selectedSlot.day}
          phase={selectedSlot.phase}
          onActionSelect={handleActionSelect}
          availableActionsByPhase={availableActionsByPhase}
          characterSkills={characterSkills}
          isTraveling={isTraveling}
          travelDestination={travelDestination}
        />
      )}
    </>
  );
};

