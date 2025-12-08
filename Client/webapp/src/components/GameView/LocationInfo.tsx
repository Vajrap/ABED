import React from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";

export interface LocationInfoProps {
  region: string;
  subRegion: string;
  locationName: string;
}

/**
 * Location information display component
 * Shows: Region / SubRegion / Location Name
 */
export const LocationInfo: React.FC<LocationInfoProps> = ({
  region,
  subRegion,
  locationName,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "0.75rem 1rem",
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        borderRadius: 1,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: theme.palette.text.primary,
          textAlign: "center",
        }}
      >
        {region} / {subRegion} / {locationName}
      </Typography>
    </Box>
  );
};

