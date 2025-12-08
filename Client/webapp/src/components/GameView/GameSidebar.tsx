import React, { useState } from "react";
import { Box, alpha, useTheme } from "@mui/material";
import {
  AutoAwesome,
  Inventory,
  Article,
  CalendarMonth,
} from "@mui/icons-material";
import { GameViewIcon } from "./GameViewIcon";

export interface GameSidebarProps {
  onScheduleClick?: () => void;
  onSkillsClick?: () => void;
  onInventoryClick?: () => void;
  onNewsClick?: () => void;
}

/**
 * Left sidebar for game view
 * Container for navigation buttons
 */
export const GameSidebar: React.FC<GameSidebarProps> = ({
  onScheduleClick,
  onSkillsClick,
  onInventoryClick,
  onNewsClick,
}) => {
  const theme = useTheme();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string, callback?: () => void) => {
    setActiveButton(buttonName);
    if (callback) {
      callback();
    }
  };

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        border: `2px solid ${theme.palette.secondary.main}`,
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        boxShadow: `
          0 4px 16px ${alpha("#000", 0.1)},
          inset 0 1px 0 ${alpha("#fff", 0.3)}
        `,
      }}
    >
      {/* Planning Section */}
      <GameViewIcon
        icon={CalendarMonth}
        text="Schedule"
        onClick={() => handleButtonClick("schedule", onScheduleClick)}
        active={activeButton === "schedule"}
      />

      {/* Divider */}
      <Box
        sx={{
          height: 2,
          backgroundColor: alpha(theme.palette.text.disabled, 0.2),
          my: 1,
          borderRadius: 1,
        }}
      />

      {/* Character Section */}
      <GameViewIcon
        icon={AutoAwesome}
        text="Skills"
        onClick={() => handleButtonClick("skills", onSkillsClick)}
        active={activeButton === "skills"}
      />

      <GameViewIcon
        icon={Inventory}
        text="Inventory"
        onClick={() => handleButtonClick("inventory", onInventoryClick)}
        active={activeButton === "inventory"}
      />

      {/* Divider */}
      <Box
        sx={{
          height: 2,
          backgroundColor: alpha(theme.palette.text.disabled, 0.2),
          my: 1,
          borderRadius: 1,
        }}
      />

      {/* World Section */}
      <GameViewIcon
        icon={Article}
        text="News"
        onClick={() => handleButtonClick("news", onNewsClick)}
        active={activeButton === "news"}
      />
    </Box>
  );
};

