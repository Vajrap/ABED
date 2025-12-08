"use client";

import React from "react";
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
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import { EquipmentSlot } from "./EquipmentSlot";
import { CharacterStatsView, EquipmentDisplay } from "@/types/game";

export interface CharacterStatsModalProps {
  open: boolean;
  onClose: () => void;
  character: CharacterStatsView | null;
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
}) => {
  const theme = useTheme();

  if (!character || !character.name) {
    return null;
  }
  
  // Helper to extract string from L10N or string
  const getString = (value: string | { en: string; th: string } | null | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value.en || '';
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

  // Helper function to format stat value
  const formatStat = (stat: { base: number; bonus: number } | undefined) => {
    if (!stat) return "N/A";
    const total = stat.base + stat.bonus;
    if (stat.bonus === 0) {
      return total.toString();
    }
    return `${total} (${stat.base}${stat.bonus > 0 ? "+" : ""}${stat.bonus})`;
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
                justifyContent: "space-between",
                padding: 1,
                backgroundColor: alpha("#fff", 0.3),
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Crimson Text, serif",
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  color: theme.palette.text.secondary,
                }}
              >
                {key}:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                {formatStat(value)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Helper component for section headers with tooltips
  const SectionHeader: React.FC<{
    title: string;
    tooltip: string;
    color: string;
  }> = ({ title, tooltip, color }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: color,
        }}
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
              fontSize: "0.9rem",
              maxWidth: 300,
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `1px solid ${color}`,
              borderRadius: 1,
              boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
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
          },
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Crimson Text, serif",
          fontSize: "0.9rem",
          color: theme.palette.text.secondary,
          cursor: "help",
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          textUnderlineOffset: 4,
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
          padding: 3,
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
          fontSize: "1.75rem",
          fontWeight: 700,
          color: theme.palette.secondary.main,
          textAlign: "center",
          pb: 2,
          borderBottom: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
          mb: 3,
        }}
      >
        {getString(character.name) || 'Character'}'s Stats
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
                },
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "1rem",
                fontWeight: 400,
                color: theme.palette.text.secondary,
                mt: 0.5,
                cursor: "help",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                textUnderlineOffset: 4,
                display: "inline-block",
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Basic Info Section */}
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <SectionHeader
              title="Basic Information"
              tooltip="Core character identity and background information. This includes level, race, background, gender, and moral alignment that define who the character is."
              color={theme.palette.primary.main}
            />
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.9rem", color: theme.palette.text.secondary }}>
                  Level:
                </Typography>
                <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600 }}>
                  {character.level || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography sx={{ fontFamily: "Crimson Text, serif", fontSize: "0.9rem", color: theme.palette.text.secondary }}>
                  Race:
                </Typography>
                <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600 }}>
                  {getString(character.race) || "N/A"}
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
                <>
                  <Grid item xs={6} sm={4}>
                    <Box>
                      {createTooltipLabel(
                        "Good",
                        "Measures the character's virtuous and benevolent nature. Higher values indicate a more altruistic and kind character. Combined with Evil, this determines the character's moral alignment."
                      )}
                    </Box>
                    <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600 }}>
                      {character.alignment.good}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Box>
                      {createTooltipLabel(
                        "Evil",
                        "Measures the character's malevolent and selfish nature. Higher values indicate a more cruel and destructive character. Combined with Good, this determines the character's moral alignment."
                      )}
                    </Box>
                    <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", fontWeight: 600 }}>
                      {character.alignment.evil}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>

          {/* Vitals Section */}
          {character.vitals && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Vitals"
                tooltip="Essential life force values that determine a character's physical and magical capacity. These values change during combat, rest, and activities."
                color={theme.palette.error.main}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 0.5 }}>
                    {createTooltipLabel(
                      "Health Points (HP)",
                      "The character's physical health and vitality. When HP reaches 0, the character becomes incapacitated or dies. Rest and healing restore HP."
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(character.vitals.hp.current / character.vitals.hp.max) * 100}
                      sx={{
                        flex: 1,
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.error.main,
                        },
                      }}
                    />
                    <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.9rem", fontWeight: 600, minWidth: 60, textAlign: "right" }}>
                      {character.vitals.hp.current}/{character.vitals.hp.max}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 0.5 }}>
                    {createTooltipLabel(
                      "Mana Points (MP)",
                      "Magical energy used to cast spells and perform magical abilities. MP is consumed when using magic and regenerates over time or through rest."
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(character.vitals.mp.current / character.vitals.mp.max) * 100}
                      sx={{
                        flex: 1,
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.info.main,
                        },
                      }}
                    />
                    <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.9rem", fontWeight: 600, minWidth: 60, textAlign: "right" }}>
                      {character.vitals.mp.current}/{character.vitals.mp.max}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ mb: 0.5 }}>
                    {createTooltipLabel(
                      "Stamina Points (SP)",
                      "Physical endurance and energy used for running, dodging, and performing strenuous physical actions. SP depletes during intense activities and recovers during rest."
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(character.vitals.sp.current / character.vitals.sp.max) * 100}
                      sx={{
                        flex: 1,
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.warning.main,
                        },
                      }}
                    />
                    <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.9rem", fontWeight: 600, minWidth: 60, textAlign: "right" }}>
                      {character.vitals.sp.current}/{character.vitals.sp.max}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Needs Section */}
          {character.needs && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Needs"
                tooltip="Physical and mental needs that affect a character's performance and well-being. These values decrease over time and must be maintained through rest, food, and activities."
                color={theme.palette.success.main}
              />
              <Grid container spacing={2}>
                {[
                  { key: "mood", tooltip: "The character's emotional state and happiness. Low mood affects performance and can lead to negative effects." },
                  { key: "energy", tooltip: "Overall physical and mental energy levels. Low energy reduces effectiveness in all activities and requires rest to recover." },
                  { key: "satiety", tooltip: "How well-fed and satisfied the character is. Hunger reduces performance and must be maintained through eating food." },
                ].map(({ key, tooltip }) => (
                  <Grid item xs={12} sm={4} key={key}>
                    <Box sx={{ mb: 0.5 }}>
                      {createTooltipLabel(key.charAt(0).toUpperCase() + key.slice(1), tooltip)}
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(() => {
                        const needValue = character.needs?.[key as keyof typeof character.needs];
                        if (typeof needValue === 'number') return needValue;
                        if (needValue && typeof needValue === 'object' && 'current' in needValue && 'max' in needValue) {
                          return (needValue.current / needValue.max) * 100;
                        }
                        return 0;
                      })()}
                      sx={{
                        height: 20,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.success.main,
                        },
                      }}
                    />
                    <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "0.85rem", mt: 0.5, textAlign: "center" }}>
                      {(() => {
                        const needValue = character.needs?.[key as keyof typeof character.needs];
                        if (typeof needValue === 'number') return `${needValue}%`;
                        if (needValue && typeof needValue === 'object' && 'current' in needValue && 'max' in needValue) {
                          return `${Math.round((needValue.current / needValue.max) * 100)}%`;
                        }
                        return '0%';
                      })()}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Equipment Section - RPG Style */}
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              backgroundColor: alpha(theme.palette.secondary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Cinzel, serif",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: theme.palette.secondary.main,
                mb: 2,
              }}
            >
              Equipment
            </Typography>
            
            {/* RPG-style equipment layout */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
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
          </Paper>

          {/* Attributes Section */}
          {character.attributes && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Attributes"
                tooltip="Core character statistics that determine capabilities in all aspects of the game. These base attributes affect combat effectiveness, skill performance, crafting success, and social interactions. Attributes can be improved through training and leveling up."
                color={theme.palette.primary.main}
              />
              {renderStatGrid(character.attributes, 4)}
            </Paper>
          )}

          {/* Battle Stats Section */}
          {character.battleStats && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Battle Stats"
                tooltip="Combat statistics that determine effectiveness in battle. These values are calculated from attributes, equipment, and skills. Higher values improve combat performance."
                color={theme.palette.error.main}
              />
              {renderStatGrid(character.battleStats, 3)}
            </Paper>
          )}

          {/* Elements Section */}
          {character.elements && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.info.main, 0.05),
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Elemental Affinity"
                tooltip="Resistance and affinity to different elemental forces (Fire, Water, Wind, Earth, Light, Dark). Higher values provide resistance to that element and boost related magical abilities."
                color={theme.palette.info.main}
              />
              {renderStatGrid(character.elements, 3)}
            </Paper>
          )}

          {/* Proficiencies Section */}
          {character.proficiencies && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.warning.main, 0.05),
                border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Proficiencies"
                tooltip="Weapon and tool mastery skills. Higher proficiency in a weapon type increases accuracy, damage, and unlocks special techniques. Proficiency improves through training and use."
                color={theme.palette.warning.main}
              />
              {renderStatGrid(character.proficiencies, 4)}
            </Paper>
          )}

          {/* Artisans Section */}
          {character.artisans && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Artisan Skills"
                tooltip="Crafting and profession skills for creating items, gathering resources, and performing specialized tasks. Higher skill levels allow crafting better items and accessing new recipes."
                color={theme.palette.success.main}
              />
              {renderStatGrid(character.artisans, 4)}
            </Paper>
          )}

          {/* Planar Aptitude */}
          {character.planarAptitude !== undefined && (
            <Paper
              elevation={0}
              sx={{
                padding: 2,
                backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <SectionHeader
                title="Planar Aptitude"
                tooltip="The character's natural connection to the planar forces and dimensional energy. Higher aptitude improves magical abilities, allows access to advanced spells, and provides resistance to planar effects. This is an innate ability that can be enhanced through training and special items."
                color={theme.palette.secondary.main}
              />
              <LinearProgress
                variant="determinate"
                value={(() => {
                  const apt = character.planarAptitude;
                  if (typeof apt === 'number') return apt;
                  if (apt && typeof apt === 'object' && 'aptitude' in apt) return apt.aptitude;
                  if (apt && typeof apt === 'object' && 'total' in apt) return apt.total;
                  return 0;
                })()}
                sx={{
                  height: 30,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              />
              <Typography sx={{ fontFamily: "Cinzel, serif", fontSize: "1rem", mt: 1, textAlign: "center" }}>
                {(() => {
                  const apt = character.planarAptitude;
                  if (typeof apt === 'number') return `${apt}%`;
                  if (apt && typeof apt === 'object' && 'aptitude' in apt) return `${apt.aptitude}%`;
                  if (apt && typeof apt === 'object' && 'total' in apt) return `${apt.total}%`;
                  return '0%';
                })()}
              </Typography>
            </Paper>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

