import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { GameTimeInterface } from "@/data/mockNewsData";

export interface GameTimeDisplayProps {
  gameTime: GameTimeInterface;
}

/**
 * Display component for game time
 * Shows: Day X, Season Y, Year Z - HH:MM format
 */
export const GameTimeDisplay: React.FC<GameTimeDisplayProps> = ({ gameTime }) => {
  const theme = useTheme();

  // Format hour (1-4 represent morning, afternoon, evening, night)
  const formatHour = (hour: number): string => {
    const times = ["Morning", "Afternoon", "Evening", "Night"];
    return times[hour - 1] || `Phase ${hour}`;
  };

  // Get season name (1-7) - matching backend SeasonEnum
  const getSeasonName = (season: number): string => {
    const seasons = ["Seeding", "RainFall", "GreenTide", "HarvestMoon", "SunDry", "Frostveil", "LongDark"];
    return seasons[season - 1] || `Season ${season}`;
  };

  // Get day name (1-6) - game has 6 days per week
  const getDayName = (dayOfWeek: number): string => {
    const days = ["Moonday", "Fireday", "Waterday", "Earthday", "Windday", "Lightday"];
    return days[dayOfWeek - 1] || `Day ${dayOfWeek}`;
  };

  const timeString = formatHour(gameTime.hour);
  const seasonName = getSeasonName(gameTime.season);
  const dayName = getDayName(gameTime.dayOfWeek);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "0.5rem 1rem",
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        border: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
        borderRadius: 2,
        boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
        backdropFilter: "blur(8px)",
        zIndex: 10,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: theme.palette.secondary.main,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {dayName}, Day {gameTime.dayOfSeason}
        <br />
        {seasonName} • Year {gameTime.year}
        <br />
        {timeString}
      </Typography>
    </Box>
  );
};

