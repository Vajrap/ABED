import React, { useState, useEffect } from "react";
import { Box, alpha, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  GameSidebar,
  PartyMemberCard,
} from "@/components/GameView";
import { ActionScheduleModal } from "@/components/GameView/ActionScheduleModal";
import { websocketService } from "@/services/websocketService";

export const GameView: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  // Mock party data (will be fetched from API later)
  const mockParty = [
    { name: "Hero", level: 5, portrait: null, isPlayer: true },
    { name: "Warrior", level: 4, portrait: null, isPlayer: false },
    { name: "Mage", level: 3, portrait: null, isPlayer: false },
    { name: null, level: null, portrait: null, isPlayer: false }, // Empty slot
    { name: null, level: null, portrait: null, isPlayer: false }, // Empty slot
    { name: null, level: null, portrait: null, isPlayer: false }, // Empty slot
  ];

  const handleScheduleSave = (schedule: Record<string, string>) => {
    console.log("Schedule saved:", schedule);
    // TODO: Send schedule to backend
  };

  // Initialize WebSocket connection when entering game view
  useEffect(() => {
    websocketService.connect();

    // Cleanup: disconnect WebSocket when leaving game view
    return () => {
      websocketService.disconnect();
    };
  }, []);

  const handleLogout = () => {
    // Disconnect WebSocket before logout
    websocketService.disconnect();
    localStorage.removeItem("sessionToken");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--gradient-arcane)",
        backgroundAttachment: "fixed",
        padding: 2,
        gap: 2,
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          gap: 2,
        }}
      >
        {/* Left: Sidebar */}
        <GameSidebar
          onScheduleClick={() => setScheduleModalOpen(true)}
          onStatsClick={() => console.log("Stats clicked")}
          onSkillsClick={() => console.log("Skills clicked")}
          onInventoryClick={() => console.log("Inventory clicked")}
          onNewsClick={() => console.log("News clicked")}
          onTravelClick={() => console.log("Travel clicked")}
          onSettingsClick={() => console.log("Settings clicked")}
          onLogoutClick={handleLogout}
        />

        {/* Center: Party Display */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            border: `2px solid ${theme.palette.tertiary.main}`,
            borderRadius: 2,
            padding: 4,
            boxShadow: `
              0 4px 16px ${alpha("#000", 0.1)},
              inset 0 1px 0 ${alpha("#fff", 0.3)}
            `,
          }}
        >
          {/* Party Members Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 4,
              justifyItems: "center",
              mb: 4,
            }}
          >
            {mockParty.map((member, index) => (
              <PartyMemberCard
                key={index}
                portrait={member.portrait || undefined}
                name={member.name || undefined}
                level={member.level || undefined}
                isPlayer={member.isPlayer}
                isSelected={selectedMemberIndex === index}
                isEmpty={!member.name}
                onClick={() => setSelectedMemberIndex(index)}
              />
            ))}
          </Box>

          {/* Selected Character Details - TODO: Implement */}
          <Box
            sx={{
              mt: 4,
              padding: 3,
              backgroundColor: alpha("#fff", 0.3),
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.tertiary.main, 0.3)}`,
            }}
          >
            {/* Character details will go here */}
          </Box>
        </Box>
      </Box>

      {/* Action Schedule Modal */}
      <ActionScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSave={handleScheduleSave}
      />
    </Box>
  );
};

