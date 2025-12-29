import React from "react";
import { Box, LinearProgress, Typography, alpha, useTheme, Tooltip } from "@mui/material";

export interface CharacterNeedsBarProps {
  mood: number; // 0-100
  energy: number; // 0-100
  satiety: number; // 0-100
  compact?: boolean; // If true, show more compact version
}

/**
 * Character needs bars component
 * Shows mood, energy, and satiety as progress bars
 */
export const CharacterNeedsBar: React.FC<CharacterNeedsBarProps> = ({
  mood,
  energy,
  satiety,
  compact = false,
}) => {
  const theme = useTheme();

  // Get color based on value (green = good, yellow = medium, red = low)
  const getColor = (value: number): string => {
    if (value >= 70) return theme.palette.success.main;
    if (value >= 40) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  // Get label for tooltip
  const getStatusLabel = (value: number, type: string): string => {
    const roundedValue = Math.round(value);
    if (roundedValue >= 70) return `${type}: Good (${roundedValue}%)`;
    if (roundedValue >= 40) return `${type}: Moderate (${roundedValue}%)`;
    return `${type}: Low (${roundedValue}%)`;
  };

  if (compact) {
    // Compact horizontal bars
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width: "100%" }}>
        <Tooltip title={getStatusLabel(mood, "Mood")} arrow>
          <Box>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.7rem",
                color: theme.palette.text.secondary,
                mb: 0.25,
              }}
            >
              Mood
            </Typography>
            <LinearProgress
              variant="determinate"
              value={mood}
              sx={{
                height: 6,
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.background.default, 0.3),
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getColor(mood),
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        </Tooltip>
        <Tooltip title={getStatusLabel(energy, "Energy")} arrow>
          <Box>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.7rem",
                color: theme.palette.text.secondary,
                mb: 0.25,
              }}
            >
              Energy
            </Typography>
            <LinearProgress
              variant="determinate"
              value={energy}
              sx={{
                height: 6,
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.background.default, 0.3),
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getColor(energy),
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        </Tooltip>
        <Tooltip title={getStatusLabel(satiety, "Satiety")} arrow>
          <Box>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.7rem",
                color: theme.palette.text.secondary,
                mb: 0.25,
              }}
            >
              Satiety
            </Typography>
            <LinearProgress
              variant="determinate"
              value={satiety}
              sx={{
                height: 6,
                borderRadius: 1,
                backgroundColor: alpha(theme.palette.background.default, 0.3),
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getColor(satiety),
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Box>
    );
  }

  // Regular version (for stats modal or larger displays)
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {/* Mood */}
      <Tooltip title={getStatusLabel(mood, "Mood")} arrow>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                color: theme.palette.text.primary,
              }}
            >
              Mood
            </Typography>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: getColor(mood),
              }}
            >
              {mood}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={mood}
            sx={{
              height: 8,
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.background.default, 0.3),
              "& .MuiLinearProgress-bar": {
                backgroundColor: getColor(mood),
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Tooltip>

      {/* Energy */}
      <Tooltip title={getStatusLabel(energy, "Energy")} arrow>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                color: theme.palette.text.primary,
              }}
            >
              Energy
            </Typography>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: getColor(energy),
              }}
            >
              {energy}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={energy}
            sx={{
              height: 8,
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.background.default, 0.3),
              "& .MuiLinearProgress-bar": {
                backgroundColor: getColor(energy),
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Tooltip>

      {/* Satiety */}
      <Tooltip title={getStatusLabel(satiety, "Satiety")} arrow>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                color: theme.palette.text.primary,
              }}
            >
              Satiety
            </Typography>
            <Typography
              sx={{
                fontFamily: "Crimson Text, serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: getColor(satiety),
              }}
            >
              {satiety}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={satiety}
            sx={{
              height: 8,
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.background.default, 0.3),
              "& .MuiLinearProgress-bar": {
                backgroundColor: getColor(satiety),
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

