import React from "react";
import { Box, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import { MockEquipment } from "@/data/mockPartyData";

export interface EquipmentSlotProps {
  slot: string; // CharacterEquipmentSlot
  equipment?: MockEquipment;
  label?: string; // Optional label to display (e.g., "Head", "Body")
  size?: "small" | "medium" | "large";
}

/**
 * RPG-style equipment slot component
 * Shows an empty slot or equipped item with tooltip
 * Read-only display
 */
export const EquipmentSlot: React.FC<EquipmentSlotProps> = ({
  slot,
  equipment,
  label,
  size = "medium",
}) => {
  const theme = useTheme();

  const sizeMap = {
    small: { width: 48, height: 48, fontSize: "0.7rem" },
    medium: { width: 64, height: 64, fontSize: "0.85rem" },
    large: { width: 80, height: 80, fontSize: "1rem" },
  };

  const dimensions = sizeMap[size];

  // Create tooltip content
  const tooltipContent = equipment ? (
    <Box sx={{ maxWidth: 300, p: 1 }}>
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: theme.palette.primary.main,
          mb: 1,
        }}
      >
        {equipment.name}
      </Typography>
      
      {equipment.desc && (
        <Typography
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "0.85rem",
            color: theme.palette.text.secondary,
            mb: 1.5,
            whiteSpace: "pre-wrap",
          }}
        >
          {equipment.desc}
        </Typography>
      )}

      {/* Weapon Stats */}
      {equipment.weaponStats && (
        <Box sx={{ mt: 1.5 }}>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: theme.palette.secondary.main,
              mb: 0.5,
            }}
          >
            Weapon Stats
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, fontSize: "0.8rem" }}>
            {equipment.weaponStats.pDice && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Physical Damage: {equipment.weaponStats.pDice}
              </Typography>
            )}
            {equipment.weaponStats.mDice && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Magical Damage: {equipment.weaponStats.mDice}
              </Typography>
            )}
            {equipment.weaponStats.weaponType && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Type: {equipment.weaponType}
              </Typography>
            )}
            {equipment.weaponStats.handle && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Handle: {equipment.weaponStats.handle === 1 ? "One-handed" : "Two-handed"}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Armor Stats */}
      {equipment.armorStats && (
        <Box sx={{ mt: 1.5 }}>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: theme.palette.secondary.main,
              mb: 0.5,
            }}
          >
            Armor Stats
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, fontSize: "0.8rem" }}>
            {equipment.armorStats.pDEF !== undefined && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Physical Defense: +{equipment.armorStats.pDEF}
              </Typography>
            )}
            {equipment.armorStats.mDEF !== undefined && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Magical Defense: +{equipment.armorStats.mDEF}
              </Typography>
            )}
            {equipment.armorStats.dodgeBonus !== undefined && equipment.armorStats.dodgeBonus !== 0 && (
              <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.8rem" }}>
                Dodge Bonus: {equipment.armorStats.dodgeBonus > 0 ? "+" : ""}{equipment.armorStats.dodgeBonus}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Item Info */}
      <Box sx={{ mt: 1.5, pt: 1, borderTop: `1px solid ${alpha(theme.palette.text.disabled, 0.2)}` }}>
        <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.75rem", color: theme.palette.text.disabled }}>
          Weight: {equipment.weight} | Cost: {equipment.cost}
        </Typography>
      </Box>
    </Box>
  ) : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Tooltip
        title={tooltipContent || `Empty ${label || slot}`}
        arrow
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `2px solid ${theme.palette.secondary.main}`,
              borderRadius: 2,
              boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
              maxWidth: 350,
            },
          },
          arrow: {
            sx: {
              color: theme.palette.secondary.main,
            },
          },
        }}
      >
        <Box
          sx={{
            width: dimensions.width,
            height: dimensions.height,
            border: equipment
              ? `2px solid ${theme.palette.primary.main}`
              : `2px dashed ${alpha(theme.palette.text.disabled, 0.5)}`,
            borderRadius: 1,
            backgroundColor: equipment
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha("#fff", 0.2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: equipment ? "pointer" : "default",
            transition: "all 0.2s ease-out",
            position: "relative",
            overflow: "hidden",

            "&:hover": equipment
              ? {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  border: `2px solid ${theme.palette.primary.light}`,
                  boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: "scale(1.05)",
                }
              : {},

            // Inner glow for equipped items
            "&::before": equipment
              ? {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
                  pointerEvents: "none",
                }
              : {},
          }}
        >
          {equipment ? (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: dimensions.fontSize,
                fontWeight: 600,
                color: theme.palette.text.primary,
                textAlign: "center",
                px: 0.5,
                lineHeight: 1.2,
              }}
            >
              {equipment.name.split(" ")[0]}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: dimensions.fontSize,
                color: theme.palette.text.disabled,
                opacity: 0.5,
              }}
            >
              +
            </Typography>
          )}
        </Box>
      </Tooltip>

      {label && (
        <Typography
          sx={{
            fontFamily: "Crimson Text, serif",
            fontSize: "0.75rem",
            color: theme.palette.text.secondary,
            textTransform: "capitalize",
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

