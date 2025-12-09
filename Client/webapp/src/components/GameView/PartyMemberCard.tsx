import React, { useMemo } from "react";
import { Box, Typography, alpha, useTheme, Tooltip } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { CharacterNeedsBar } from "./CharacterNeedsBar";
import { ActionIndicator } from "./ActionIndicator";
import { PortraitRenderer } from "@/components/Portrait/PortraitRenderer";

import type { EquipmentDisplay } from "@/types/game";

export interface PartyMemberCardProps {
  portrait?: string; // Portrait image path (if character exists)
  name?: string | { en: string; th: string }; // Character name (string or L10N)
  title?: string | { en: string; th: string }; // Character title (epithet + role) (string or L10N)
  level?: number; // Character level
  isPlayer?: boolean; // Is this the player's character?
  isSelected?: boolean; // Is this card currently selected?
  isEmpty?: boolean; // Is this an empty slot?
  needs?: {
    mood: number | { base: number; bonus: number; current: number; max: number };
    energy: number | { base: number; bonus: number; current: number; max: number };
    satiety: number | { base: number; bonus: number; current: number; max: number };
  };
  nextAction?: string; // Name of next action to execute
  actionType?: string; // Type of action
  equipment?: EquipmentDisplay[] | Record<string, string>; // Character equipment data
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
  title,
  level,
  isPlayer = false,
  isSelected = false,
  isEmpty = false,
  needs,
  nextAction,
  actionType,
  equipment,
  onClick,
}) => {
  const theme = useTheme();

  // Extract body equipment ID from equipment data (similar to CharacterStatsModal)
  const bodyEquipmentId = useMemo(() => {
    if (!equipment) return null;
    
    // Organize equipment by slot
    const equipmentBySlot: Record<string, EquipmentDisplay> = {};
    if (Array.isArray(equipment)) {
      equipment.forEach((eq) => {
        equipmentBySlot[eq.slot] = eq;
      });
    } else {
      Object.entries(equipment).forEach(([slot, itemId]) => {
        equipmentBySlot[slot] = {
          slot,
          itemId: itemId as string,
          id: itemId as string,
        };
      });
    }
    
    const bodyEq = equipmentBySlot.body;
    if (!bodyEq) return null;
    if (typeof bodyEq === 'string') return bodyEq;
    return bodyEq.itemId || bodyEq.id || null;
  }, [equipment]);

  // Determine glow color - only player gets special color, others are normal
  const glowColor = isPlayer
    ? theme.palette.primary.main // Purple for player
    : theme.palette.text.disabled; // Grey for normal (no selected state)

  // Tooltip content with needs and next action
  const tooltipContent = !isEmpty && (needs || nextAction) ? (
    <Box sx={{ padding: 1, minWidth: 200 }}>
      {needs && (
        <Box sx={{ mb: nextAction ? 1.5 : 0 }}>
          <CharacterNeedsBar
            mood={typeof needs.mood === 'number' ? needs.mood : (needs.mood?.current ?? 0) / (needs.mood?.max ?? 100) * 100}
            energy={typeof needs.energy === 'number' ? needs.energy : (needs.energy?.current ?? 0) / (needs.energy?.max ?? 100) * 100}
            satiety={typeof needs.satiety === 'number' ? needs.satiety : (needs.satiety?.current ?? 0) / (needs.satiety?.max ?? 100) * 100}
            compact={false}
          />
        </Box>
      )}
      {nextAction && (
        <Box>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: theme.palette.text.secondary,
              mb: 0.5,
            }}
          >
            Next Action:
          </Typography>
          <ActionIndicator
            actionName={nextAction}
            actionType={actionType}
            isNext={true}
          />
        </Box>
      )}
    </Box>
  ) : null;

  const cardContent = (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        width: 80,
        cursor: "pointer",
        transition: "all 0.25s ease-out",
        
        "&:hover": {
          transform: "translateY(-2px) scale(1.05)",
        },

        "&:active": {
          transform: "translateY(-1px) scale(1.02)",
        },
      }}
    >
      {/* Portrait Circle */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "2%",
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
          
          // Glow effect - only player gets strong glow
          boxShadow: isEmpty
            ? "none"
            : isPlayer
            ? `
              0 0 24px ${alpha(glowColor, 0.6)},
              inset 0 2px 4px ${alpha("#000", 0.1)}
            `
            : `
              0 0 8px ${alpha(glowColor, 0.2)},
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
            borderRadius: "2%",
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
            <PortraitRenderer
              portrait={portrait}
              size="100%"
              portraitScale={1.5}
              portraitOffset={{ x: 0, y: 0 }}
              equipment={{
                body: bodyEquipmentId,
              }}
            />
          </Box>
        ) : (
          // Fallback - show initials or placeholder
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: theme.palette.text.secondary,
            }}
          >
            {(typeof name === 'string' ? name : name?.en || "?")?.charAt(0) || "?"}
          </Typography>
        )}
      </Box>

      {/* Character Name Only */}
      {!isEmpty && name && (
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "Crimson Text, serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: isPlayer ? theme.palette.primary.main : theme.palette.text.primary,
            mt: 1.5,
            lineHeight: 1.2,
            textShadow: isPlayer
              ? `0 0 6px ${alpha(theme.palette.primary.main, 0.4)}`
              : "none",
          }}
        >
          {typeof name === 'string' ? name : (name as any)?.en || ''}
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

  // Wrap with tooltip if there's content to show
  if (tooltipContent) {
    return (
      <Tooltip
        title={tooltipContent}
        arrow
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
              boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
              maxWidth: 300,
            },
          },
        }}
      >
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
};

