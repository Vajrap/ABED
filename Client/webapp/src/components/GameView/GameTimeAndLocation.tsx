import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { GameTimeInterface } from "@/data/mockNewsData";

export interface GameTimeAndLocationProps {
  gameTime: GameTimeInterface;
  region: string;
  subRegion: string;
  locationName: string;
}

/**
 * Combined Game Time and Location Display
 * Right-aligned, 2 lines:
 * Line 1: Dayofweek - datenum - Season - year - phrase (time of day)
 * Line 2: Region / Sub / Location
 */
export const GameTimeAndLocation: React.FC<GameTimeAndLocationProps> = ({
  gameTime,
  region,
  subRegion,
  locationName,
}) => {
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
  // Matching DayOfWeek enum: laoh, rowana, aftree, udur, matris, seethar
  const getDayName = (dayOfWeek: number): string => {
    const days = ["Laoh", "Rowana", "Aftree", "Udur", "Matris", "Seethar"];
    return days[dayOfWeek - 1] || `Day ${dayOfWeek}`;
  };

  const timeString = formatHour(gameTime.hour);
  const seasonName = getSeasonName(gameTime.season);
  const dayName = getDayName(gameTime.dayOfWeek);

  return (
    <Box
      sx={{
        padding: "0.75rem 1rem",
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        border: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
        borderRadius: 2,
        boxShadow: `0 4px 16px ${alpha("#000", 0.2)}`,
        backdropFilter: "blur(8px)",
        textAlign: "right",
      }}
    >
      {/* Line 1: Day - Date - Season - Year - Time */}
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: theme.palette.secondary.main,
          lineHeight: 1.4,
          whiteSpace: "nowrap",
        }}
      >
        {dayName} - {gameTime.dayOfSeason} - {seasonName} - {gameTime.year} - {timeString}
      </Typography>

      {/* Line 2: Region / SubRegion / Location */}
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: theme.palette.text.primary,
          lineHeight: 1.4,
          whiteSpace: "nowrap",
          mt: 0.25,
        }}
      >
        {region} / {subRegion} / {locationName}
      </Typography>
    </Box>
  );
};

