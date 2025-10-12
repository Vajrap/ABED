import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

export interface PartyMemberCardProps {
  portrait?: string; // Portrait image path (if character exists)
  name?: string; // Character name
  level?: number; // Character level
  isPlayer?: boolean; // Is this the player's character?
  isSelected?: boolean; // Is this card currently selected?
  isEmpty?: boolean; // Is this an empty slot?
  onClick: () => void;
}

/**
 * Reusable party member portrait card
 * Shows character portrait, name, level
 * Supports empty slot state
 */
export const PartyMemberCard: React.FC<PartyMemberCardProps> = ({
  portrait,
  name,
  level,
  isPlayer = false,
  isSelected = false,
  isEmpty = false,
  onClick,
}) => {
  const theme = useTheme();

  // Determine glow color based on state
  const glowColor = isPlayer
    ? theme.palette.primary.main // Purple for player
    : isSelected
    ? theme.palette.tertiary.main // Teal for selected
    : theme.palette.text.disabled; // Grey for normal

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        width: 120,
        cursor: "pointer",
        transition: "all 0.25s ease-out",
        
        "&:hover": {
          transform: "translateY(-4px) scale(1.03)",
        },

        "&:active": {
          transform: "translateY(-2px) scale(1.01)",
        },
      }}
    >
      {/* Portrait Circle */}
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: isEmpty
            ? `3px dashed ${theme.palette.text.disabled}`
            : `3px solid ${glowColor}`,
          backgroundColor: isEmpty
            ? alpha("#fff", 0.3)
            : theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          
          // Glow effect
          boxShadow: isEmpty
            ? "none"
            : `
              0 0 ${isSelected || isPlayer ? "24px" : "12px"} ${alpha(glowColor, isSelected || isPlayer ? 0.6 : 0.3)},
              inset 0 2px 4px ${alpha("#000", 0.1)}
            `,

          // Inner highlight
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: `linear-gradient(180deg, ${alpha("#fff", 0.3)} 0%, transparent 100%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          },
        }}
      >
        {isEmpty ? (
          // Empty slot - show add icon
          <PersonAdd
            sx={{
              fontSize: "3rem",
              color: theme.palette.text.disabled,
              opacity: 0.5,
            }}
          />
        ) : portrait ? (
          // Character portrait image
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={portrait}
              alt={name || "Character"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ) : (
          // Fallback - show initials or placeholder
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: theme.palette.text.secondary,
            }}
          >
            {name?.charAt(0) || "?"}
          </Typography>
        )}

        {/* Player star indicator */}
        {isPlayer && !isEmpty && (
          <Box
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${theme.palette.background.paper}`,
              boxShadow: `0 0 16px ${alpha(theme.palette.primary.main, 0.6)}`,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1.2rem",
                lineHeight: 1,
              }}
            >
              ⭐
            </Typography>
          </Box>
        )}

        {/* Level badge */}
        {!isEmpty && level !== undefined && (
          <Box
            sx={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
              padding: "4px 12px",
              borderRadius: 2,
              border: `2px solid ${theme.palette.background.paper}`,
              boxShadow: `0 2px 8px ${alpha("#000", 0.2)}`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              Lv {level}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Character Name */}
      {!isEmpty && name && (
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Crimson Text, serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: isPlayer ? theme.palette.primary.main : theme.palette.text.primary,
            mt: 2,
            textShadow: isPlayer
              ? `0 0 8px ${alpha(theme.palette.primary.main, 0.4)}`
              : "none",
          }}
        >
          {name}
        </Typography>
      )}

      {/* Empty slot text */}
      {isEmpty && (
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Crimson Text, serif",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: theme.palette.text.disabled,
            mt: 2,
            fontStyle: "italic",
          }}
        >
          Recruit
        </Typography>
      )}
    </Box>
  );
};

