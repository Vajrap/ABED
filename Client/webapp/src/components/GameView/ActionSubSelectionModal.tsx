import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  alpha,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { ActionDefinition } from "@/config/actions";

export interface ActionSubSelectionModalProps {
  open: boolean;
  onClose: () => void;
  action: ActionDefinition;
  onSelect: (actionId: string, subSelectionValue: string) => void;
  availableOptions: { id: string; name: string }[];
}

/**
 * Modal for sub-selecting action parameters (e.g., attribute for Train Attribute, skill for Train Skill)
 */
export const ActionSubSelectionModal: React.FC<ActionSubSelectionModalProps> = ({
  open,
  onClose,
  action,
  onSelect,
  availableOptions,
}) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedOption) {
      // Build the full action ID with parameter
      // Format: "actionId|parameter" (e.g., "Train Attribute|strength")
      onSelect(action.id, selectedOption);
      onClose();
      setSelectedOption(null);
    }
  };

  const handleCancel = () => {
    onClose();
    setSelectedOption(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
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
        Select {action.name} Option
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 2 }}>
        <Typography
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "0.9rem",
            color: theme.palette.text.secondary,
            textAlign: "center",
            mb: 2,
          }}
        >
          Choose the specific {action.subSelectionType} to {action.name.toLowerCase()}
        </Typography>

        {/* Options List */}
        <Box
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <List dense>
            {availableOptions.map((option) => (
              <ListItem key={option.id} disablePadding>
                <ListItemButton
                  selected={selectedOption === option.id}
                  onClick={() => setSelectedOption(option.id)}
                  sx={{
                    py: 0.75,
                    "&.Mui-selected": {
                      backgroundColor: alpha(theme.palette.tertiary.main, 0.15),
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.tertiary.main, 0.25),
                      },
                    },
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.tertiary.main, 0.08),
                    },
                  }}
                >
                  <ListItemText
                    primary={option.name}
                    primaryTypographyProps={{
                      fontFamily: "Crimson Text, serif",
                      fontSize: "0.9rem",
                      fontWeight: selectedOption === option.id ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            startIcon={<ArrowBack />}
            size="small"
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.9rem",
              textTransform: "none",
              px: 2,
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
            onClick={handleConfirm}
            variant="contained"
            disabled={!selectedOption}
            size="small"
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "0.9rem",
              textTransform: "none",
              px: 2,
              backgroundColor: theme.palette.tertiary.main,
              "&:hover": {
                backgroundColor: theme.palette.tertiary.dark,
              },
              "&.Mui-disabled": {
                backgroundColor: alpha(theme.palette.tertiary.main, 0.3),
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

