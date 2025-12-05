import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

export interface GameViewIconProps {
  icon: SvgIconComponent;
  text: string;
  onClick: () => void;
  active?: boolean;
}

/**
 * Reusable sidebar icon button for GameView
 * Consistent styling, no custom style props
 */
export const GameViewIcon: React.FC<GameViewIconProps> = ({
  icon: Icon,
  text,
  onClick,
  active = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        padding: 2,
        paddingLeft: 2.5,
        cursor: "pointer",
        borderRadius: 1.5,
        border: `2px solid ${active ? theme.palette.primary.main : alpha(theme.palette.text.disabled, 0.3)}`,
        backgroundColor: active
          ? alpha(theme.palette.primary.main, 0.15)
          : alpha("#fff", 0.2),
        transition: "all 0.2s ease-out",
        position: "relative",
        overflow: "hidden",
        
        // Glow effect
        boxShadow: active
          ? `
            0 0 16px ${alpha(theme.palette.primary.main, 0.4)},
            inset 0 1px 0 ${alpha("#fff", 0.3)}
          `
          : `inset 0 1px 0 ${alpha("#fff", 0.2)}`,

        "&:hover": {
          backgroundColor: active
            ? alpha(theme.palette.primary.main, 0.25)
            : alpha("#fff", 0.4),
          border: `2px solid ${active ? theme.palette.primary.light : theme.palette.text.secondary}`,
          boxShadow: `
            0 0 20px ${alpha(active ? theme.palette.primary.main : theme.palette.text.disabled, 0.3)},
            inset 0 1px 0 ${alpha("#fff", 0.4)}
          `,
          transform: "translateX(4px)",
        },

        "&:active": {
          transform: "translateX(2px)",
        },

        // Subtle gradient overlay
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: active
            ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`
            : "transparent",
          pointerEvents: "none",
        },
      }}
    >
      <Icon
        sx={{
          fontSize: "1.75rem",
          color: active ? theme.palette.primary.main : theme.palette.text.secondary,
          filter: active
            ? `drop-shadow(0 0 8px ${alpha(theme.palette.primary.main, 0.5)})`
            : "none",
          transition: "all 0.2s ease-out",
        }}
      />
      <Typography
        sx={{
          fontFamily: "Crimson Text, serif",
          fontSize: "1.1rem",
          fontWeight: active ? 600 : 500,
          color: active ? theme.palette.primary.main : theme.palette.text.primary,
          letterSpacing: "0.3px",
          transition: "all 0.2s ease-out",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

