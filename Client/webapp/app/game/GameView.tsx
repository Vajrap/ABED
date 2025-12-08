"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  GameSidebar,
  PartyMemberCard,
  SettingsButton,
  SettingsModal,
  NewsModal,
  ChatPanel,
  GameTimeAndLocation,
} from "@/components/GameView";
import { ActionScheduleModal } from "@/components/GameView/ActionScheduleModal";
import { CharacterStatsModal } from "@/components/GameView/CharacterStatsModal";
import { MockPartyMember } from "@/data/mockPartyData";
import { mockNews, GameTimeInterface } from "@/data/mockNewsData";

interface GameViewProps {
  mockPartyData?: MockPartyMember[]; // Optional mock data for UI development
}

// Location data structure for frontend
interface LocationData {
  name: string;
  region: string;
  subRegion: string;
  situation: string; // Image identifier (e.g., "demo" maps to /img/demo.png)
}

// Mock game time - will come from backend later
const mockGameTime: GameTimeInterface = {
  hour: 3,
  dayOfWeek: 2,
  dayOfSeason: 15,
  season: 1,
  dayPassed: 14,
  year: 1,
};

export default function GameView({ mockPartyData }: GameViewProps = {} as GameViewProps) {
  const theme = useTheme();
  const router = useRouter();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);

  // Mock location data - will come from backend later
  const location: LocationData = {
    name: "Wayward Inn",
    region: "Central",
    subRegion: "Capital",
    situation: "demo", // Maps to /img/demo.png
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "c":
          // Focus chat - chat panel is always visible, could scroll to it later
          // For now, just a placeholder (chat is always visible)
          break;
        case "s":
          // Open Skills - placeholder for now
          console.log("Skills clicked - S key");
          break;
        case "i":
          // Open Inventory - placeholder for now
          console.log("Inventory clicked - I key");
          break;
        case "n":
          setNewsModalOpen(true);
          break;
        case "t":
          setScheduleModalOpen(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Use provided mock data, or default mock data, or will be fetched from API later
  const mockParty = mockPartyData || [
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

  const handleTravelClick = () => {
    console.log("Travel clicked - open travel planning modal");
    // TODO: Open travel planning modal
  };

  const handleRailTravelClick = () => {
    console.log("Rail travel clicked - open rail travel modal");
    // TODO: Open rail travel modal
  };


  return (
    <Box
      sx={{
        height: "100vh", // Use fixed height instead of minHeight to prevent scrolling
        maxHeight: "100vh", // Ensure it never exceeds viewport
        display: "flex",
        flexDirection: "column",
        background: "var(--gradient-arcane)",
        backgroundAttachment: "fixed",
        padding: 2,
        gap: 2,
        overflow: "hidden", // Prevent page-level scrolling
        position: "relative",
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          gap: 2,
          minHeight: 0, // Important: allows flex children to shrink below content size
          overflow: "hidden", // Prevent overflow
          position: "relative",
        }}
      >
        {/* Left: Sidebar */}
        <GameSidebar
          onScheduleClick={() => setScheduleModalOpen(true)}
          onSkillsClick={() => console.log("Skills clicked")}
          onInventoryClick={() => console.log("Inventory clicked")}
          onNewsClick={() => setNewsModalOpen(true)}
        />

        {/* Center: Party Display with Location Image Box */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0, // Important: allows flex children to shrink
            position: "relative",
            overflow: "hidden",
          }}
        >

          {/* Top Right: Game Time + Location + Settings - Floating inside image box */}
          <Box
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1.5,
            }}
          >
            <GameTimeAndLocation
              gameTime={mockGameTime}
              region={location.region}
              subRegion={location.subRegion}
              locationName={location.name}
            />
            <SettingsButton onClick={() => setSettingsModalOpen(true)} />
          </Box>

          {/* Party Members - Single Row, Left Aligned - Floating inside image box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "flex-start",
              padding: 4,
              paddingTop: 6, // Extra padding to account for negative top of image
              position: "relative",
              zIndex: 20,
            }}
          >
            {mockParty
              .map((member, originalIndex) => ({ member, originalIndex }))
              .filter(({ member }) => member.name) // Only show members with names
              .map(({ member, originalIndex }) => (
                <PartyMemberCard
                  key={originalIndex}
                  portrait={member.portrait || undefined}
                  name={member.name || undefined}
                  title={member.title || undefined}
                  level={member.level || undefined}
                  isPlayer={member.isPlayer}
                  isSelected={selectedMemberIndex === originalIndex}
                  isEmpty={!member.name}
                  needs={member.needs}
                  nextAction={
                    originalIndex === 0
                      ? "Craft Magic Staff"
                      : originalIndex === 1
                      ? "Train Strength"
                      : originalIndex === 2
                      ? "Rest"
                      : undefined
                  }
                  actionType={
                    originalIndex === 0
                      ? "crafting"
                      : originalIndex === 1
                      ? "training"
                      : originalIndex === 2
                      ? "resting"
                      : undefined
                  }
                  onClick={() => {
                    setSelectedMemberIndex(originalIndex);
                    setStatsModalOpen(true);
                  }}
                />
              ))}
          </Box>

          {/* Location Situation Image - Fixed Height with Game Time and Location Overlay */}
          {location.situation && (
            <Box
              sx={{
                width: "100%",
                marginTop: "-185px",
                height: "55vh", // Fixed viewport height
                minHeight: 200, // Minimum height for smaller screens
                maxHeight: 500, // Maximum height for very large screens
                borderRadius: 2,
                overflow: "hidden",
                border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                boxShadow: `0 4px 16px ${alpha("#000", 0.1)}`,
                mb: 3,
                position: "relative", // For absolute positioning of game time and location
              }}
            >
              <img
                src={`/img/${location.situation}.png`}
                alt={location.name}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover", // Maintain aspect ratio, crop if needed
                  objectPosition: "center",
                }}
              />
              {/* Game Time and Location Display - Top Right */}
              <GameTimeAndLocation
                gameTime={mockGameTime}
                region={location.region}
                subRegion={location.subRegion}
                locationName={location.name}
              />
            </Box>
          )}

          {/* Chat Panel - Below image box */}
          <Box
            sx={{
              flex: 1, // Take remaining space
              display: "flex",
              flexDirection: "column",
              minHeight: 0, // Important: allows flex children to shrink
              overflow: "hidden",
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              border: `2px solid ${theme.palette.tertiary?.main || theme.palette.secondary.main}`,
              borderRadius: 2,
              padding: 2,
              boxShadow: `
                0 4px 16px ${alpha("#000", 0.1)},
                inset 0 1px 0 ${alpha("#fff", 0.3)}
              `,
              position: "relative",
              zIndex: 10,
            }}
          >
            <ChatPanel currentUserId="mock-character-001" />
          </Box>
        </Box>
      </Box>

      {/* Action Schedule Modal */}
      <ActionScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSave={handleScheduleSave}
        onTravelClick={handleTravelClick}
        onRailTravelClick={handleRailTravelClick}
        hasRailStation={true} // TODO: Get from party/location data - for now, leave active
      />

      {/* Character Stats Modal */}
      <CharacterStatsModal
        open={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        character={mockParty[selectedMemberIndex] || null}
      />

      {/* Settings Modal */}
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      {/* News Modal */}
      <NewsModal
        open={newsModalOpen}
        onClose={() => setNewsModalOpen(false)}
        news={mockNews}
      />

    </Box>
  );
}

