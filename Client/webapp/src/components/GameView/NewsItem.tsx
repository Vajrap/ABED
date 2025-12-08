import React from "react";
import { Box, Chip, Typography, alpha, useTheme } from "@mui/material";
import { MockNews, getNewsScopeLabel } from "@/data/mockNewsData";
import { L10NTextRenderer } from "@/components/L10N/L10NTextRenderer";

export interface NewsItemProps {
  news: MockNews;
}

/**
 * Individual news item component
 * Displays news with capsule label for scope type
 * TODO: Parse L10N markup (char, loc, skill, etc.) to render interactive tooltips
 */
export const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
  const theme = useTheme();

  // Color mapping for different news scopes
  const scopeColors: Record<string, string> = {
    Global: theme.palette.primary.main,
    Region: theme.palette.secondary.main,
    "Sub-Region": theme.palette.info?.main || theme.palette.secondary.light,
    Location: theme.palette.secondary.main,
    Party: theme.palette.info?.main || theme.palette.secondary.light,
    Personal: theme.palette.success?.main || theme.palette.primary.light,
    None: theme.palette.text.disabled,
    Unknown: theme.palette.text.disabled,
  };

  const scopeLabel = getNewsScopeLabel(news.scope);
  const scopeColor = scopeColors[scopeLabel] || theme.palette.text.secondary;

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        padding: "0.5rem 0.75rem",
      }}
    >
      {/* Scope Capsule Label */}
      <Chip
        label={scopeLabel}
        size="small"
        sx={{
          fontFamily: "Cinzel, serif",
          fontSize: "0.65rem",
          fontWeight: 700,
          height: 20,
          backgroundColor: alpha(scopeColor, 0.2),
          color: scopeColor,
          border: `1px solid ${alpha(scopeColor, 0.4)}`,
          flexShrink: 0,
          "& .MuiChip-label": {
            padding: "0 6px",
          },
        }}
      />

      {/* News Content - Rendered with L10N markup parsing and tooltips */}
      <L10NTextRenderer
        content={news.content}
        language="en"
        variant="body2"
        sx={{
          fontSize: "0.85rem",
          color: theme.palette.text.primary,
          lineHeight: 1.4,
          flex: 1,
        }}
      />
    </Box>
  );
};

