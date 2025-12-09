"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon, HelpOutline } from "@mui/icons-material";

export interface TitleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  currentEpithet?: string;
  currentRole?: string;
  availableEpithets: string[];
  availableRoles: string[];
  onSave: (epithet: string | null, role: string | null) => Promise<void>;
  characterName?: string;
}

/**
 * Modal for selecting/changing character epithet and role
 */
export const TitleSelectionModal: React.FC<TitleSelectionModalProps> = ({
  open,
  onClose,
  currentEpithet,
  currentRole,
  availableEpithets,
  availableRoles,
  onSave,
  characterName,
}) => {
  const theme = useTheme();
  const [selectedEpithet, setSelectedEpithet] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Initialize selections when modal opens or current values change
  useEffect(() => {
    if (open) {
      setSelectedEpithet(currentEpithet || "");
      setSelectedRole(currentRole || "");
    }
  }, [open, currentEpithet, currentRole]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(
        selectedEpithet || null,
        selectedRole || null
      );
      onClose();
    } catch (error) {
      console.error("Error saving title changes:", error);
      // TODO: Show error notification
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    selectedEpithet !== (currentEpithet || "") ||
    selectedRole !== (currentRole || "");

  const createTooltipLabel = (label: string, tooltip: string) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
      <Typography
        sx={{
          fontFamily: "Crimson Text, serif",
          fontSize: "0.9rem",
          color: theme.palette.text.secondary,
        }}
      >
        {label}
      </Typography>
      <Tooltip
        title={tooltip}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `1px solid ${theme.palette.secondary.main}`,
              borderRadius: 1,
              color: "#333",
              maxWidth: 300,
            },
          },
        }}
      >
        <IconButton size="small" sx={{ padding: 0 }}>
          <HelpOutline sx={{ fontSize: "1rem", color: theme.palette.text.secondary }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          border: `2px solid ${theme.palette.secondary.main}`,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "1.25rem",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
          pb: 1.5,
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1.25rem", fontWeight: 700 }}>
            {characterName ? `${characterName}'s Title` : "Select Title"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.85rem",
              color: theme.palette.text.secondary,
              mt: 0.5,
            }}
          >
            Choose your epithet and role
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              color: theme.palette.error.main,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Current Title Display */}
          {(currentEpithet || currentRole) && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Crimson Text, serif",
                  fontSize: "0.85rem",
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                }}
              >
                Current Title
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                {[currentEpithet, currentRole].filter(Boolean).join(" ") || "None"}
              </Typography>
            </Paper>
          )}

          {/* Epithet Selection */}
          <FormControl fullWidth>
            {createTooltipLabel(
              "Epithet",
              "An epithet reflects your character's reputation, achievements, or notable characteristics. It can be earned through your actions and accomplishments in the game world."
            )}
            <Select
              value={selectedEpithet}
              onChange={(e) => setSelectedEpithet(e.target.value)}
              displayEmpty
              sx={{
                fontFamily: "Cinzel, serif",
                "& .MuiSelect-select": {
                  py: 1.5,
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {availableEpithets.map((epithet) => (
                <MenuItem key={epithet} value={epithet}>
                  {epithet}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Role Selection */}
          <FormControl fullWidth>
            {createTooltipLabel(
              "Role",
              "A role represents your character's professional identity and specialization. Different roles provide unique bonuses, abilities, and affect how your character interacts with the world."
            )}
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              displayEmpty
              sx={{
                fontFamily: "Cinzel, serif",
                "& .MuiSelect-select": {
                  py: 1.5,
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {availableRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Preview */}
          {(selectedEpithet || selectedRole) && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Crimson Text, serif",
                  fontSize: "0.85rem",
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                }}
              >
                Preview
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: theme.palette.success.main,
                }}
              >
                {[selectedEpithet, selectedRole].filter(Boolean).join(" ") || "None"}
              </Typography>
            </Paper>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 2,
          py: 1.5,
          borderTop: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            fontFamily: "Cinzel, serif",
            color: theme.palette.text.secondary,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!hasChanges || saving}
          sx={{
            fontFamily: "Cinzel, serif",
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

