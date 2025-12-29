"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Grid,
  alpha,
  useTheme,
  Paper,
  LinearProgress,
  Tooltip,
  IconButton,
  Collapse,
} from "@mui/material";
import { HelpOutline, ExpandMore, ExpandLess } from "@mui/icons-material";
import { EquipmentSlot } from "./EquipmentSlot";
import { CharacterStatsView, EquipmentDisplay } from "@/types/game";
import { TitleSelectionModal } from "./TitleSelectionModal";
import { PortraitRenderer } from "@/components/Portrait/PortraitRenderer";
import { BattleSpriteRenderer } from "@/components/Battle/BattleSpriteRenderer";

export interface CharacterStatsModalProps {
  open: boolean;
  onClose: () => void;
  character: CharacterStatsView | null;
  onCharacterUpdate?: (updatedCharacter: CharacterStatsView) => void;
}

/**
 * Read-only character stats modal
 * Displays all character information EXCEPT Skills and Inventory
 * Equipment shown as RPG-style slots with tooltips
 */
export const CharacterStatsModal: React.FC<CharacterStatsModalProps> = ({
  open,
  onClose,
  character,
  onCharacterUpdate,
}) => {
  const theme = useTheme();
  const [titleModalOpen, setTitleModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basicInfo: true,
    vitals: true,
    needs: true,
    equipment: true,
    attributes: true,
    proficiencies: true,
    artisans: true,
    elements: true,
    battleStats: true,
    planarAptitude: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!character || !character.name) {
    return null;
  }
  
  // Helper to extract string from L10N or string
  const getString = (value: string | { en: string; th: string } | null | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && 'en' in value) return value.en || '';
    return String(value);
  };

  // Helper to get color based on percentage (darker colors for white text)
  // 75-100%: Green (healthy)
  // 50-74%: Yellow (moderate)
  // 25-49%: Orange (low)
  // 0-24%: Red (critical)
  const getPercentageColor = (percentage: number): string => {
    const clamped = Math.min(100, Math.max(0, percentage));
    if (clamped >= 75) return "#009977"; // Dark green (darker for white text)
    if (clamped >= 50) return "#cc9900"; // Dark yellow
    if (clamped >= 25) return "#cc7700"; // Dark orange
    return "#b30059"; // Dark red (darker for white text)
  };

  // Helper to calculate percentage for needs
  // Needs have current (0-100) and max (always 100), so current is already the percentage
  const getNeedsPercentage = (needValue: number | { current?: number; max?: number } | undefined): number => {
    if (typeof needValue === 'number') {
      return Math.min(100, Math.max(0, needValue));
    }
    if (needValue && typeof needValue === 'object' && 'current' in needValue) {
      // For needs, current is already 0-100, max is always 100
      const current = (needValue as any).current ?? 0;
      return Math.min(100, Math.max(0, current));
    }
    return 0;
  };

  // Helper to parse title string into epithet and role
  const parseTitle = (title: string | undefined): { epithet: string | undefined; role: string | undefined } => {
    if (!title) return { epithet: undefined, role: undefined };
    const parts = title.split(" ").filter(p => p && p.toLowerCase() !== "null");
    // Typically format is "Epithet Role" or just "Role" or just "Epithet"
    if (parts.length >= 2) {
      return { epithet: parts[0], role: parts[1] };
    } else if (parts.length === 1) {
      // Try to match against available lists to determine which it is
      const part = parts[0];
      if (character?.possibleEpithets?.includes(part)) {
        return { epithet: part, role: undefined };
      } else if (character?.possibleRoles?.includes(part)) {
        return { epithet: undefined, role: part };
      }
      // Default: assume it's an epithet if we can't determine
      return { epithet: part, role: undefined };
    }
    return { epithet: undefined, role: undefined };
  };

  const { epithet: currentEpithet, role: currentRole } = parseTitle(
    typeof character?.title === 'string' ? character.title : getString(character?.title)
  );

  // Handle title update
  const handleTitleSave = async (epithet: string | null, role: string | null) => {
    if (!character?.id) return;
    
    try {
      const { characterService } = await import("@/services/characterService");
      const response = await characterService.updateTitle({
        characterId: character.id,
        epithet,
        role,
      });

      if (response.success && response.character && onCharacterUpdate) {
        // Map the updated character back to CharacterStatsView format
        // We need to merge the response character data with the existing character stats view
        const updatedStatsView: CharacterStatsView = {
          ...character,
          title: response.character.title,
          possibleEpithets: response.character.possibleEpithets?.map(e => String(e)) || character.possibleEpithets || [],
          possibleRoles: response.character.possibleRoles?.map(r => String(r)) || character.possibleRoles || [],
          // Parse epithet and role from title for backwards compatibility
          epithet: epithet || undefined,
          role: role || undefined,
        };
        onCharacterUpdate(updatedStatsView);
      } else {
        throw new Error(response.error || "Failed to update title");
      }
    } catch (error) {
      throw error;
    }
  };

  // Organize equipment by slot for easy lookup
  // Handle both array format (EquipmentDisplay[]) and object format (Record<slot, ItemId>)
  const equipmentBySlot: Record<string, EquipmentDisplay> = {};
  if (character.equipment) {
    if (Array.isArray(character.equipment)) {
      // Array format: EquipmentDisplay[]
      character.equipment.forEach((eq) => {
        equipmentBySlot[eq.slot] = eq;
      });
    } else {
      // Object format: Record<CharacterEquipmentSlot, ItemId>
      // Convert to EquipmentDisplay format (just ItemId for now, will be resolved later)
      Object.entries(character.equipment).forEach(([slot, itemId]) => {
        equipmentBySlot[slot] = {
          slot,
          itemId: itemId as string,
          id: itemId as string, // For compatibility
        };
      });
    }
  }

  // Extract body equipment ID - handle both object and string formats
  const bodyEquipmentId = (() => {
    const bodyEq = equipmentBySlot.body;
    if (!bodyEq) return null;
    if (typeof bodyEq === 'string') return bodyEq;
    return bodyEq.itemId || bodyEq.id || null;
  })();
  
  // Debug: Log equipment structure
  console.log("CharacterStatsModal: character.equipment", character.equipment);
  console.log("CharacterStatsModal: equipmentBySlot", equipmentBySlot);
  console.log("CharacterStatsModal: equipmentBySlot.body", equipmentBySlot.body);
  console.log("CharacterStatsModal: body equipment ID", bodyEquipmentId);

  // Helper function to format stat value
  // Calculate stat modifier based on backend logic
  // This mirrors Server/src/Utils/statMod.ts
  const calculateStatMod = (total: number): number => {
    const boundaries = [
      { upperBound: 1, modifier: -5 },
      { upperBound: 3, modifier: -4 },
      { upperBound: 5, modifier: -3 },
      { upperBound: 7, modifier: -2 },
      { upperBound: 9, modifier: -1 },
      { upperBound: 11, modifier: 0 },
      { upperBound: 13, modifier: 1 },
      { upperBound: 15, modifier: 2 },
      { upperBound: 17, modifier: 3 },
      { upperBound: 19, modifier: 4 },
      { upperBound: 21, modifier: 5 },
      { upperBound: 23, modifier: 6 },
      { upperBound: 25, modifier: 7 },
      { upperBound: 27, modifier: 8 },
      { upperBound: 29, modifier: 9 },
      { upperBound: 30, modifier: 10 },
    ];
    
    for (const bound of boundaries) {
      if (total <= bound.upperBound) {
        return bound.modifier;
      }
    }
    // For values > 30, return 10
    return 10;
  };

  // Get color based on stat modifier
  const getStatModifierColor = (modifier: number): string => {
    if (modifier < 0) return "#e60073"; // Red for negative
    if (modifier === 0) return "#666666"; // Gray for neutral
    if (modifier <= 2) return "#ffcc00"; // Yellow for small positive
    if (modifier <= 5) return "#ff9800"; // Orange for medium positive
    return "#00cc99"; // Green for high positive
  };

  const formatStat = (stat: { base?: number; bonus?: number; [key: string]: any } | undefined) => {
    if (!stat || typeof stat !== 'object') return "N/A";
    
    // Safely extract base and bonus values, handling different possible structures
    let base: number;
    let bonus: number;
    
    if (typeof stat.base === 'number' && !isNaN(stat.base)) {
      base = stat.base;
    } else if (typeof stat.base === 'string') {
      base = parseFloat(stat.base);
      if (isNaN(base)) base = 0;
    } else {
      base = 0;
    }
    
    if (typeof stat.bonus === 'number' && !isNaN(stat.bonus)) {
      bonus = stat.bonus;
    } else if (typeof stat.bonus === 'string') {
      bonus = parseFloat(stat.bonus);
      if (isNaN(bonus)) bonus = 0;
    } else {
      bonus = 0;
    }
    
    const total = base + bonus;
    if (bonus === 0) {
      return total.toString();
    }
    return `${total} (${base}${bonus > 0 ? "+" : ""}${bonus})`;
  };

  // Helper function to render stat grid
  const renderStatGrid = (
    stats: Record<string, { base: number; bonus: number }> | undefined,
    columns: number = 3
  ) => {
    if (!stats) return null;

    return (
      <Grid container spacing={2}>
        {Object.entries(stats).map(([key, value]) => (
          <Grid item xs={12 / columns} key={key}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                padding: 0.5,
                backgroundColor: alpha("#fff", 0.3),
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Crimson Text, serif",
                  fontSize: "0.85rem",
                  textTransform: "capitalize",
                  color: theme.palette.text.secondary,
                  whiteSpace: "nowrap",
                }}
              >
                {key}:
              </Typography>
              {(() => {
                // Calculate total stat (base + bonus, ignoring battle for display)
                const base = (value as any)?.base ?? 0;
                const bonus = (value as any)?.bonus ?? 0;
                const total = base + bonus;
                const modifier = calculateStatMod(total);
                const color = getStatModifierColor(modifier);
                
                return (
                  <Typography
                    sx={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: color,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatStat(value)}
                  </Typography>
                );
              })()}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Helper component for section headers with tooltips and collapse
  const SectionHeader: React.FC<{
    title: string;
    tooltip: string;
    color: string;
    expanded: boolean;
    onToggle: () => void;
  }> = ({ title, tooltip, color, expanded, onToggle }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: expanded ? 1 : 0 }}>
      <IconButton
        size="small"
        onClick={onToggle}
        sx={{
          color: color,
          padding: 0.25,
          "&:hover": {
            backgroundColor: alpha(color, 0.1),
          },
        }}
      >
        {expanded ? <ExpandLess sx={{ fontSize: "1.25rem" }} /> : <ExpandMore sx={{ fontSize: "1.25rem" }} />}
      </IconButton>
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: color,
          cursor: "pointer",
          userSelect: "none",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={onToggle}
      >
        {title}
      </Typography>
      <Tooltip
        title={tooltip}
        arrow
        placement="right"
        componentsProps={{
          tooltip: {
            sx: {
              fontFamily: "Crimson Text, serif",
                fontSize: "0.85rem",
              maxWidth: 300,
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `1px solid ${color}`,
              borderRadius: 1,
              boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
              color: "#333",
              "& .MuiTooltip-arrow": {
                color: color,
              },
            },
          },
          arrow: {
            sx: {
              color: color,
            },
          },
        }}
      >
        <IconButton
          size="small"
          onClick={(e) => e.stopPropagation()}
          sx={{
            color: color,
            padding: 0.5,
            "&:hover": {
              backgroundColor: alpha(color, 0.1),
            },
          }}
        >
          <HelpOutline sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  // Helper function to create a tooltip-wrapped label
  const createTooltipLabel = (label: string, tooltip: string) => (
    <Tooltip
      title={tooltip}
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            fontFamily: "Crimson Text, serif",
            fontSize: "0.85rem",
            maxWidth: 300,
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: 1,
            boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
            color: "#333",
          },
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Crimson Text, serif",
          fontSize: "0.85rem",
          color: theme.palette.text.secondary,
          cursor: "help",
          display: "inline-block",
        }}
      >
        {label}:
      </Typography>
    </Tooltip>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
          fontFamily: "Crimson Text, serif",
          backgroundColor: theme.palette.background.paper,
          border: `3px solid ${theme.palette.secondary.main}`,
          boxShadow: `
            0 0 30px ${alpha(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${alpha("#000", 0.15)}
          `,
          maxHeight: "90vh",
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
          fontSize: "1.5rem",
          fontWeight: 700,
          color: theme.palette.text.primary,
          textAlign: "center",
          pb: 1,
          borderBottom: `2px solid ${alpha(theme.palette.divider, 0.5)}`,
          mb: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
        {character.portrait && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                      }}
                    >
                      <PortraitRenderer
                        portrait={character.portrait}
                        size={120}
                        alt={getString(character.name) || "Character"}
                  equipment={{
                    body: bodyEquipmentId,
                  }}
                      />
                    </Box>
                  </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 200,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: theme.palette.text.primary,
                textAlign: "center",
              }}
            >
          {getString(character.name) || 'Character'}
            </Typography>
          </Box>
          {character.portrait && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                      backgroundColor: alpha(theme.palette.background.default, 0.5),
                    }}
                  >
                    <BattleSpriteRenderer
                      portrait={character.portrait}
                      equipment={{
                        body: equipmentBySlot.body?.itemId || equipmentBySlot.body?.id || null,
                        weapon: equipmentBySlot.rightHand?.itemId || equipmentBySlot.rightHand?.id || equipmentBySlot.leftHand?.itemId || equipmentBySlot.leftHand?.id || null,
                      }}
                      size={200}
                      style={{ right: -10, top: 10 }}
                      animated={true}
                    />
                  </Box>
                </Box>
              )}
        </Box>
        {character.title && (
          <Tooltip
            title="Character title formed from their Epithet (background) and Role (class). Titles reflect the character's identity and can affect how NPCs react to them."
            arrow
            placement="bottom"
            componentsProps={{
              tooltip: {
                sx: {
                  fontFamily: "Crimson Text, serif",
                  fontSize: "0.85rem",
                  maxWidth: 300,
                  backgroundColor: alpha(theme.palette.background.paper, 0.95),
                  border: `1px solid ${theme.palette.secondary.main}`,
                  borderRadius: 1,
                  boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
                  color: "#333",
                },
              },
            }}
          >
            <Typography
              onClick={() => setTitleModalOpen(true)}
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: theme.palette.text.primary,
                cursor: "pointer",
                display: "inline-block",
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              {getString(character.title)}
            </Typography>
          </Tooltip>
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            borderRadius: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.5),
            borderRadius: 1,
            "&:hover": {
              backgroundColor: alpha(theme.palette.secondary.main, 0.7),
            },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* Basic Info Section */}
          <Paper
            elevation={0}
            sx={{
              padding: 1.5,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <SectionHeader
              title="Basic Information"
              tooltip="Core character identity and background information. This includes level, race, background, gender, and moral alignment that define who the character is."
              color={theme.palette.text.primary}
              expanded={expandedSections.basicInfo}
              onToggle={() => toggleSection("basicInfo")}
            />
            <Collapse in={expandedSections.basicInfo}>
            <Grid container spacing={2}>
              {/* Portrait Display */}
              
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.85rem", color: theme.palette.text.secondary }}>
                  Level:
                </Typography>
                <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.9rem", fontWeight: 600 }}>
                  {character.level || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.85rem", color: theme.palette.text.secondary }}>
                  Race:
                </Typography>
                <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.9rem", fontWeight: 600 }}>
                  {character.race ? (typeof character.race === 'string' ? character.race : getString(character.race)) : "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.9rem", color: theme.palette.text.secondary }}>
                  Background:
                </Typography>
                <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600 }}>
                  {getString(character.background) || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.9rem", color: theme.palette.text.secondary }}>
                  Gender:
                </Typography>
                <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600 }}>
                  {character.gender || "N/A"}
                </Typography>
              </Grid>
              {character.alignment && (
                <Grid item xs={12} sm={6}>
                  <Box>
                    {createTooltipLabel(
                      "Alignment",
                      "The character's moral compass determined by their Good and Evil values. Alignment affects how NPCs and factions react to the character, and can unlock or restrict certain actions and story paths."
                    )}
                  </Box>
                  <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.9rem", fontWeight: 600 }}>
                    {typeof character.alignment === 'string' 
                      ? character.alignment 
                      : (character.alignment as any)?.good !== undefined 
                        ? `Good: ${(character.alignment as any).good}, Evil: ${(character.alignment as any).evil}` 
                        : String(character.alignment)}
                  </Typography>
                </Grid>
              )}
            </Grid>
            </Collapse>
          </Paper>

          {/* Vitals Section */}
          {character.vitals && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Vitals"
                tooltip="Essential life force values that determine a character's physical and magical capacity. These values change during combat, rest, and activities."
                color={theme.palette.text.primary}
                expanded={expandedSections.vitals}
                onToggle={() => toggleSection("vitals")}
              />
              <Collapse in={expandedSections.vitals}>
                <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 0.25 }}>
                    {createTooltipLabel(
                      "Health Points (HP)",
                      "The character's physical health and vitality. When HP reaches 0, the character becomes incapacitated or dies. Rest and healing restore HP."
                    )}
                  </Box>
                  <Box sx={{ position: "relative", flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(() => {
                        const max = character.vitals.hp.base + character.vitals.hp.bonus || 1;
                        return max > 0 ? (character.vitals.hp.current / max) * 100 : 0;
                      })()}
                      sx={{
                        width: "100%",
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: alpha(getPercentageColor((() => {
                          const max = character.vitals.hp.base + character.vitals.hp.bonus || 1;
                          return max > 0 ? (character.vitals.hp.current / max) * 100 : 0;
                        })()), 0.15),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getPercentageColor((() => {
                            const max = character.vitals.hp.base + character.vitals.hp.bonus || 1;
                            return max > 0 ? (character.vitals.hp.current / max) * 100 : 0;
                          })()),
                          borderRadius: 1,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        pointerEvents: "none",
                      }}
                    >
                      {character.vitals.hp.current}/{character.vitals.hp.base + character.vitals.hp.bonus || 1}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 0.25 }}>
                    {createTooltipLabel(
                      "Mana Points (MP)",
                      "Magical energy used to cast spells and perform magical abilities. MP is consumed when using magic and regenerates over time or through rest."
                    )}
                  </Box>
                  <Box sx={{ position: "relative", flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(() => {
                        const max = character.vitals.mp.base + character.vitals.mp.bonus || 1;
                        return max > 0 ? (character.vitals.mp.current / max) * 100 : 0;
                      })()}
                      sx={{
                        width: "100%",
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: alpha(getPercentageColor((() => {
                          const max = character.vitals.mp.base + character.vitals.mp.bonus || 1;
                          return max > 0 ? (character.vitals.mp.current / max) * 100 : 0;
                        })()), 0.15),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getPercentageColor((() => {
                            const max = character.vitals.mp.base + character.vitals.mp.bonus || 1;
                            return max > 0 ? (character.vitals.mp.current / max) * 100 : 0;
                          })()),
                          borderRadius: 1,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        pointerEvents: "none",
                      }}
                    >
                      {character.vitals.mp.current}/{character.vitals.mp.base + character.vitals.mp.bonus || 1}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 0.25 }}>
                    {createTooltipLabel(
                      "Stamina Points (SP)",
                      "Physical endurance and energy used for running, dodging, and performing strenuous physical actions. SP depletes during intense activities and recovers during rest."
                    )}
                  </Box>
                  <Box sx={{ position: "relative", flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(() => {
                        const max = character.vitals.sp.base + character.vitals.sp.bonus || 1;
                        return max > 0 ? (character.vitals.sp.current / max) * 100 : 0;
                      })()}
                      sx={{
                        width: "100%",
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: alpha(getPercentageColor((() => {
                          const max = character.vitals.sp.base + character.vitals.sp.bonus || 1;
                          return max > 0 ? (character.vitals.sp.current / max) * 100 : 0;
                        })()), 0.15),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getPercentageColor((() => {
                            const max = character.vitals.sp.base + character.vitals.sp.bonus || 1;
                            return max > 0 ? (character.vitals.sp.current / max) * 100 : 0;
                          })()),
                          borderRadius: 1,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontFamily: "Cinzel, serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        pointerEvents: "none",
                      }}
                    >
                      {character.vitals.sp.current}/{character.vitals.sp.base + character.vitals.sp.bonus || 1}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              </Collapse>
            </Paper>
          )}

          {/* Needs Section */}
          {character.needs && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Needs"
                tooltip="Physical and mental needs that affect a character's performance and well-being. These values decrease over time and must be maintained through rest, food, and activities."
                color={theme.palette.text.primary}
                expanded={expandedSections.needs}
                onToggle={() => toggleSection("needs")}
              />
              <Collapse in={expandedSections.needs}>
                <Grid container spacing={1}>
                {[
                  { key: "mood", tooltip: "The character's emotional state and happiness. Low mood affects performance and can lead to negative effects." },
                  { key: "energy", tooltip: "Overall physical and mental energy levels. Low energy reduces effectiveness in all activities and requires rest to recover." },
                  { key: "satiety", tooltip: "How well-fed and satisfied the character is. Hunger reduces performance and must be maintained through eating food." },
                ].map(({ key, tooltip }) => (
                  <Grid item xs={12} sm={4} key={key}>
                    <Box sx={{ mb: 0.25 }}>
                      {createTooltipLabel(key.charAt(0).toUpperCase() + key.slice(1), tooltip)}
                    </Box>
                    {(() => {
                      // Needs are already 0-100, extract current value directly
                      const needValue = character.needs?.[key as keyof typeof character.needs];
                      let current = 0;
                      if (typeof needValue === 'number') {
                        current = Math.round(needValue);
                      } else if (needValue && typeof needValue === 'object' && 'current' in needValue) {
                        current = Math.round((needValue as any).current ?? 0);
                      }
                      const percentage = Math.min(100, Math.max(0, current));
                      
                      return (
                        <Box sx={{ position: "relative" }}>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              width: "100%",
                              height: 24,
                              borderRadius: 1,
                              backgroundColor: alpha(getPercentageColor(percentage), 0.15),
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: getPercentageColor(percentage),
                                borderRadius: 1,
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              fontFamily: "Cinzel, serif",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "#FFFFFF",
                              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                              pointerEvents: "none",
                            }}
                          >
                            {Math.round(current)}/100
                          </Typography>
                        </Box>
                      );
                    })()}
                  </Grid>
                ))}
              </Grid>
              </Collapse>
            </Paper>
          )}

          {/* Equipment Section - RPG Style */}
          <Paper
            elevation={0}
            sx={{
              padding: 1.5,
              backgroundColor: alpha(theme.palette.secondary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <SectionHeader
              title="Equipment"
              tooltip="Character's equipped items. Equipment provides stat bonuses, defensive values, and special abilities. Hover over items to see detailed information."
              color={theme.palette.text.primary}
              expanded={expandedSections.equipment}
              onToggle={() => toggleSection("equipment")}
            />
            <Collapse in={expandedSections.equipment}>
              <Typography
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: theme.palette.secondary.main,
                mb: 1,
              }}
            >
              Equipment
            </Typography>
            
            {/* RPG-style equipment layout */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1.5,
                maxWidth: 400,
                mx: "auto",
              }}
            >
              {/* Row 1: Head */}
              <Box sx={{ gridColumn: "2", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="headWear"
                  equipment={equipmentBySlot.headWear}
                  label="Head"
                  size="medium"
                />
              </Box>

              {/* Row 2: Accessories */}
              <Box sx={{ gridColumn: "1", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="earL"
                  equipment={equipmentBySlot.earL}
                  label="Ear L"
                  size="small"
                />
              </Box>
              <Box sx={{ gridColumn: "2", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="neck"
                  equipment={equipmentBySlot.neck}
                  label="Neck"
                  size="small"
                />
              </Box>
              <Box sx={{ gridColumn: "3", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="earR"
                  equipment={equipmentBySlot.earR}
                  label="Ear R"
                  size="small"
                />
              </Box>

              {/* Row 3: Shoulders and Body */}
              <Box sx={{ gridColumn: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <EquipmentSlot
                  slot="rightHand"
                  equipment={equipmentBySlot.rightHand}
                  label="Right Hand"
                  size="medium"
                />
              </Box>
              <Box sx={{ gridColumn: "2", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <EquipmentSlot
                  slot="body"
                  equipment={equipmentBySlot.body}
                  label="Body"
                  size="large"
                />
              </Box>
              <Box sx={{ gridColumn: "3", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <EquipmentSlot
                  slot="leftHand"
                  equipment={equipmentBySlot.leftHand}
                  label="Left Hand"
                  size="medium"
                />
              </Box>

              {/* Row 4: Rings */}
              <Box sx={{ gridColumn: "1", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="ringL"
                  equipment={equipmentBySlot.ringL}
                  label="Ring L"
                  size="small"
                />
              </Box>
              <Box sx={{ gridColumn: "3", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="ringR"
                  equipment={equipmentBySlot.ringR}
                  label="Ring R"
                  size="small"
                />
              </Box>

              {/* Row 5: Legs and Feet */}
              <Box sx={{ gridColumn: "2", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="leg"
                  equipment={equipmentBySlot.leg}
                  label="Legs"
                  size="medium"
                />
              </Box>

              {/* Row 6: Hands and Feet */}
              <Box sx={{ gridColumn: "1", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="hand"
                  equipment={equipmentBySlot.hand}
                  label="Hands"
                  size="small"
                />
              </Box>
              <Box sx={{ gridColumn: "2", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="foot"
                  equipment={equipmentBySlot.foot}
                  label="Feet"
                  size="small"
                />
              </Box>
              <Box sx={{ gridColumn: "3", display: "flex", justifyContent: "center" }}>
                <EquipmentSlot
                  slot="util"
                  equipment={equipmentBySlot.util}
                  label="Util"
                  size="small"
                />
              </Box>
            </Box>
            </Collapse>
          </Paper>

          {/* Attributes Section - First */}
          {character.attributes && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Attributes"
                tooltip="Core character statistics that determine capabilities in all aspects of the game. These base attributes affect combat effectiveness, skill performance, crafting success, and social interactions. Attributes can be improved through training and leveling up."
                color={theme.palette.text.primary}
                expanded={expandedSections.attributes}
                onToggle={() => toggleSection("attributes")}
              />
              <Collapse in={expandedSections.attributes}>
                {renderStatGrid(character.attributes, 4)}
              </Collapse>
            </Paper>
          )}

          {/* Proficiencies Section - Second */}
          {character.proficiencies && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.warning.main, 0.05),
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Proficiencies"
                tooltip="Weapon and tool mastery skills. Higher proficiency in a weapon type increases accuracy, damage, and unlocks special techniques. Proficiency improves through training and use."
                color={theme.palette.text.primary}
                expanded={expandedSections.proficiencies}
                onToggle={() => toggleSection("proficiencies")}
              />
              <Collapse in={expandedSections.proficiencies}>
                {renderStatGrid(character.proficiencies, 4)}
              </Collapse>
            </Paper>
          )}

          {/* Artisans Section - Third */}
          {character.artisans && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Artisan Skills"
                tooltip="Crafting and profession skills for creating items, gathering resources, and performing specialized tasks. Higher skill levels allow crafting better items and accessing new recipes."
                color={theme.palette.text.primary}
                expanded={expandedSections.artisans}
                onToggle={() => toggleSection("artisans")}
              />
              <Collapse in={expandedSections.artisans}>
                {renderStatGrid(character.artisans, 4)}
              </Collapse>
            </Paper>
          )}

          {/* Elements Section - Fourth */}
          {character.elements && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.info.main, 0.05),
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Elemental Affinity"
                tooltip="Resistance and affinity to different elemental forces (Fire, Water, Wind, Earth, Light, Dark). Higher values provide resistance to that element and boost related magical abilities."
                color={theme.palette.text.primary}
                expanded={expandedSections.elements}
                onToggle={() => toggleSection("elements")}
              />
              <Collapse in={expandedSections.elements}>
                {renderStatGrid(character.elements, 3)}
              </Collapse>
            </Paper>
          )}

          {/* Battle Stats Section - Last (these are just bonuses) */}
          {character.battleStats && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Battle Stats"
                tooltip="Combat statistics that determine effectiveness in battle. These values are calculated from attributes, equipment, and skills. Higher values improve combat performance."
                color={theme.palette.text.primary}
                expanded={expandedSections.battleStats}
                onToggle={() => toggleSection("battleStats")}
              />
              <Collapse in={expandedSections.battleStats}>
                {renderStatGrid(character.battleStats, 3)}
              </Collapse>
            </Paper>
          )}

          {/* Planar Aptitude */}
          {character.planarAptitude !== undefined && (
            <Paper
              elevation={0}
              sx={{
                padding: 1.5,
                backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Planar Aptitude"
                tooltip="The character's natural connection to the planar forces and dimensional energy. Higher aptitude improves magical abilities, allows access to advanced spells, and provides resistance to planar effects. This is an innate ability that can be enhanced through training and special items."
                color={theme.palette.text.primary}
                expanded={expandedSections.planarAptitude}
                onToggle={() => toggleSection("planarAptitude")}
              />
              <Collapse in={expandedSections.planarAptitude}>
              <LinearProgress
                variant="determinate"
                value={(() => {
                  const apt = character.planarAptitude;
                  if (typeof apt === 'number') return apt;
                  if (apt && typeof apt === 'object') {
                    if ('aptitude' in apt) return (apt as any).aptitude as number;
                    if ('total' in apt) return (apt as any).total as number;
                  }
                  return 0;
                })()}
                sx={{
                  height: 24,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              />
              <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.85rem", mt: 0.5, textAlign: "center" }}>
                {(() => {
                  const apt = character.planarAptitude;
                  if (typeof apt === 'number') return `${apt}%`;
                  if (apt && typeof apt === 'object') {
                    if ('aptitude' in apt) return `${(apt as any).aptitude as number}%`;
                    if ('total' in apt) return `${(apt as any).total as number}%`;
                  }
                  return '0%';
                })()}
              </Typography>
              </Collapse>
            </Paper>
          )}
        </Box>
      </DialogContent>

      {/* Title Selection Modal */}
      {character && (
        <TitleSelectionModal
          open={titleModalOpen}
          onClose={() => setTitleModalOpen(false)}
          currentEpithet={currentEpithet}
          currentRole={currentRole}
          availableEpithets={character.possibleEpithets || []}
          availableRoles={character.possibleRoles || []}
          onSave={handleTitleSave}
          characterName={getString(character.name)}
        />
      )}
    </Dialog>
  );
};

