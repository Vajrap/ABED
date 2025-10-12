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
} from "@mui/icons-material";
import { ActionSelectionModal } from "./ActionSelectionModal";
import { getActionById } from "@/config/actions";

const DAYS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"];
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
}

/**
 * Full-screen modal for weekly action planning
 * 6 days × 4 phases = 24 action slots
 */
export const ActionScheduleModal: React.FC<ActionScheduleModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; phase: number } | null>(null);

  const handleCellClick = (day: number, phase: number) => {
    setSelectedSlot({ day, phase });
    setSelectionModalOpen(true);
  };

  const handleActionSelect = (actionId: string) => {
    if (selectedSlot) {
      const key = `${selectedSlot.day}-${selectedSlot.phase}`;
      setSchedule({ ...schedule, [key]: actionId });
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
            mb: 3,
          }}
        >
          Weekly Action Schedule
        </DialogTitle>

        <DialogContent>
          {/* Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 1,
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
                  const actionId = getActionForSlot(dayIndex, phaseIndex);
                  const actionDef = actionId ? getActionById(actionId) : null;
                  const ActionIcon = actionDef?.icon || null;
                  
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
                        border: actionDef
                          ? `2px solid ${theme.palette.tertiary.main}`
                          : `2px solid ${alpha(theme.palette.text.disabled, 0.3)}`,
                        backgroundColor: actionDef
                          ? alpha(theme.palette.tertiary.main, 0.15)
                          : alpha("#fff", 0.3),
                        transition: "all 0.2s ease-out",

                        "&:hover": {
                          backgroundColor: alpha(theme.palette.tertiary.main, 0.2),
                          border: `2px solid ${theme.palette.tertiary.main}`,
                          boxShadow: `0 0 12px ${alpha(theme.palette.tertiary.main, 0.3)}`,
                          transform: "scale(1.05)",
                        },

                        "&:active": {
                          transform: "scale(0.98)",
                        },
                        height: "13vh",
                      }}
                    >
                      {/* Phase indicator icon (small, top) */}
                      <PhaseIcon
                        sx={{
                          fontSize: "1.5rem",
                          color: phase.color,
                          opacity: 0.8,
                          filter: `drop-shadow(0 0 4px ${alpha(phase.color, 0.4)})`,
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
            justifyContent: "space-between",
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
        />
      )}
    </>
  );
};

