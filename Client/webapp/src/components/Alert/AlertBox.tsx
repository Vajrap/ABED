import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
} from "@mui/icons-material";

export interface AlertButton {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export interface AlertBoxProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  severity?: "info" | "warning" | "error" | "success";
  buttons?: AlertButton[];
}

// Severity config is now built from theme in the component

export const AlertBox: React.FC<AlertBoxProps> = ({
  open,
  onClose,
  title,
  message,
  severity = "info",
  buttons,
}) => {
  const theme = useTheme();

  // Build severity config from theme
  const severityConfig = {
    info: {
      icon: InfoIcon,
      color: theme.palette.info.main,
      glowColor: alpha(theme.palette.info.main, 0.3),
    },
    warning: {
      icon: WarningIcon,
      color: theme.palette.warning.main,
      glowColor: alpha(theme.palette.warning.main, 0.3),
    },
    error: {
      icon: ErrorIcon,
      color: theme.palette.error.main,
      glowColor: alpha(theme.palette.error.main, 0.3),
    },
    success: {
      icon: SuccessIcon,
      color: theme.palette.success.main,
      glowColor: alpha(theme.palette.success.main, 0.3),
    },
  };

  // Button styles using theme colors
  const buttonVariantStyles = {
    primary: {
      variant: "contained" as const,
      sx: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `2px solid ${theme.palette.primary.dark}`,
        fontWeight: 600,
        letterSpacing: "0.5px",
        boxShadow: `
          0 2px 8px ${alpha(theme.palette.primary.main, 0.3)},
          inset 0 1px 0 ${alpha("#fff", 0.2)}
        `,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: `
            0 0 20px ${alpha(theme.palette.primary.main, 0.5)},
            0 4px 12px ${alpha(theme.palette.primary.main, 0.4)},
            inset 0 1px 0 ${alpha("#fff", 0.3)}
          `,
          transform: "translateY(-1px)",
        },
        transition: "all 0.2s ease-out",
      },
    },
    secondary: {
      variant: "outlined" as const,
      sx: {
        color: theme.palette.text.secondary,
        border: `2px solid ${theme.palette.text.disabled}`,
        backgroundColor: alpha("#fff", 0.4),
        fontWeight: 600,
        letterSpacing: "0.5px",
        "&:hover": {
          backgroundColor: alpha("#fff", 0.7),
          border: `2px solid ${theme.palette.text.secondary}`,
          boxShadow: `0 0 12px ${alpha(theme.palette.text.disabled, 0.2)}`,
        },
        transition: "all 0.2s ease-out",
      },
    },
    danger: {
      variant: "contained" as const,
      sx: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        border: `2px solid ${theme.palette.error.dark}`,
        fontWeight: 600,
        letterSpacing: "0.5px",
        boxShadow: `
          0 2px 8px ${alpha(theme.palette.error.main, 0.3)},
          inset 0 1px 0 ${alpha("#fff", 0.2)}
        `,
        "&:hover": {
          backgroundColor: theme.palette.error.dark,
          boxShadow: `
            0 0 20px ${alpha(theme.palette.error.main, 0.5)},
            0 4px 12px ${alpha(theme.palette.error.main, 0.4)}
          `,
          transform: "translateY(-1px)",
        },
        transition: "all 0.2s ease-out",
      },
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  // Default button: OK (รับทราบ)
  const defaultButtons: AlertButton[] = [
    {
      label: "รับทราบ", // OK in Thai
      variant: "primary",
      onClick: onClose,
    },
  ];

  const displayButtons = buttons && buttons.length > 0 ? buttons : defaultButtons;

  const handleButtonClick = (button: AlertButton) => {
    if (button.onClick) {
      button.onClick();
    } else {
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
          backgroundColor: theme.palette.background.paper, // Beige from theme
          border: `3px solid ${config.color}`,
          boxShadow: `
            0 0 30px ${config.glowColor},
            0 8px 32px ${alpha("#000", 0.15)},
            inset 0 1px 0 ${alpha("#fff", 0.3)}
          `,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 2,
            background: `radial-gradient(circle at top right, ${alpha(config.color, 0.08)} 0%, transparent 70%)`,
            pointerEvents: "none",
          },
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: alpha("#1A1A2E", 0.7), // Dark arcane backdrop
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {/* Title with Icon */}
      {title && (
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontFamily: "Cinzel, serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: config.color,
            pb: 2,
            pt: 1,
            textShadow: `0 2px 8px ${config.glowColor}`,
            borderBottom: `2px solid ${alpha(config.color, 0.3)}`,
            mb: 2,
          }}
        >
          <Icon 
            sx={{ 
              fontSize: "2.25rem", 
              color: config.color,
              filter: `drop-shadow(0 0 8px ${config.glowColor})`,
            }} 
          />
          {title}
        </DialogTitle>
      )}

      {/* Content */}
      <DialogContent sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            padding: 3,
            borderRadius: 1.5,
            border: `1px solid ${alpha(config.color, 0.2)}`,
            backgroundColor: alpha("#fff", 0.3), // Subtle white overlay on beige
            boxShadow: `inset 0 2px 4px ${alpha("#000", 0.03)}`,
          }}
        >
          {!title && (
            <Icon 
              sx={{ 
                fontSize: "2rem", 
                color: config.color, 
                mt: 0.25,
                filter: `drop-shadow(0 0 8px ${config.glowColor})`,
              }} 
            />
          )}
          <DialogContentText
            sx={{
              fontFamily: "Crimson Text, serif",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              color: theme.palette.text.primary, // Dark text from theme
              flex: 1,
              letterSpacing: "0.01em",
            }}
          >
            {message}
          </DialogContentText>
        </Box>
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions
        sx={{
          padding: 2,
          paddingTop: 1,
          gap: 1,
          justifyContent: "flex-end",
        }}
      >
        {displayButtons.map((button, index) => {
          const variantStyle =
            buttonVariantStyles[button.variant || "primary"];

          return (
            <Button
              key={index}
              onClick={() => handleButtonClick(button)}
              variant={variantStyle.variant}
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "1.05rem",
                textTransform: "none",
                minWidth: "120px",
                px: 3,
                py: 1,
                ...variantStyle.sx,
              }}
            >
              {button.label}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
};

