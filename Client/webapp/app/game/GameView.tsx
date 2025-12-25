"use client";

import React, { useState } from "react";
import { Box, Typography, alpha, useTheme, CircularProgress, Alert } from "@mui/material";
import {
  GameSidebar,
  PartyMemberCard,
  SettingsButton,
  SettingsModal,
  NewsModal,
  ChatPanel,
  GameTimeAndLocation,
  SkillsModal,
} from "@/components/GameView";
import { ActionScheduleModal } from "@/components/GameView/ActionScheduleModal";
import { CharacterStatsModal } from "@/components/GameView/CharacterStatsModal";
import { useGameAuth } from "@/hooks/useGameAuth";
import { useGameData } from "@/hooks/useGameData";
import { useGameWebSocket } from "@/hooks/useGameWebSocket";
import { useGameKeyboardShortcuts } from "@/hooks/useGameKeyboardShortcuts";
import { getPartyMembers } from "@/utils/characterMapping";
import { convertActionSequenceToSchedule } from "@/utils/actionSequence";
import { handleScheduleSave } from "@/utils/scheduleHandling";
import { getCharacterSkillsMap } from "@/utils/characterHelpers";
import type { CharacterInterface } from "@/types/api";

const ENABLE_REDIRECTS = process.env.NEXT_PUBLIC_ENABLE_GAME_REDIRECTS !== "false";

export default function GameView() {
  const theme = useTheme();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);

  // Custom hooks
  const { isCheckingAuth } = useGameAuth();
  const {
    loading,
    error,
    party,
    setParty,
    location,
    news,
    gameTime,
  } = useGameData(isCheckingAuth);
  
  useGameWebSocket();
  useGameKeyboardShortcuts({
    onNewsOpen: () => setNewsModalOpen(true),
    onScheduleOpen: () => setScheduleModalOpen(true),
  });

  // Derived data
  const partyMembers = getPartyMembers(party);
  
  const playerCharacter = party?.characters.find(
    (char) => char && char.id === party.playerCharacterId
  );

  const handleScheduleSaveWrapper = async (schedule: Record<string, string>) => {
    try {
      await handleScheduleSave(schedule);
    } catch (error) {
      console.error("[GameView] Error saving schedule:", error);
    }
  };

  const handleTravelClick = () => {
    console.log("Travel clicked - open travel planning modal");
  };

  const handleRailTravelClick = () => {
    console.log("Rail travel clicked - open rail travel modal");
  };


  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--gradient-arcane)",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Show error state
  if (error && !party && !location) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--gradient-arcane)",
          padding: 4,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Failed to load game data
          </Typography>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  // If we don't have critical data, show error
  if (!party || !location || !gameTime) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--gradient-arcane)",
          padding: 4,
        }}
      >
        <Alert severity="warning" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Missing game data
          </Typography>
          <Typography>Required data not available. Please try refreshing.</Typography>
        </Alert>
      </Box>
    );
  }

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
          onSkillsClick={() => setSkillsModalOpen(true)}
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
              zIndex: 5, // Lower z-index so fullscreen chat (9999) appears above
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 1.5,
            }}
          >
            <GameTimeAndLocation
              gameTime={gameTime}
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
              zIndex: 5, // Lower z-index so fullscreen chat (9999) appears above
            }}
          >
            {partyMembers
              .map((member, originalIndex) => ({ member, originalIndex }))
              .filter(({ member }) => member && member.name) // Only show members with names
              .map(({ member, originalIndex }) => {
                const isPlayer = member?.id === party.playerCharacterId;
                return (
                  <PartyMemberCard
                    key={member?.id || originalIndex}
                    portrait={member?.portrait || undefined}
                    name={typeof member?.name === 'string' ? member.name : (member?.name as any)?.en || undefined}
                    title={typeof member?.title === 'string' ? member.title : (member?.title as any)?.en || undefined}
                    level={member?.level || undefined}
                    isPlayer={isPlayer}
                    isSelected={selectedMemberIndex === originalIndex}
                    isEmpty={!member}
                    needs={member?.needs}
                    equipment={member?.equipment}
                    onClick={() => {
                      setSelectedMemberIndex(originalIndex);
                      setStatsModalOpen(true);
                    }}
                  />
                );
              })}
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
                gameTime={gameTime}
                region={location.region}
                subRegion={location.subRegion}
                locationName={location.name}
              />
            </Box>
          )}

          {/* Chat Panel - Below image box */}
          <Box
            sx={{
              height: "50vh", // Take 60% of viewport height
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
            <ChatPanel currentUserId={party.playerCharacterId} />
          </Box>
        </Box>
      </Box>

      {/* Action Schedule Modal */}
      <ActionScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSave={handleScheduleSaveWrapper}
        onTravelClick={handleTravelClick}
        onRailTravelClick={handleRailTravelClick}
        hasRailStation={location?.hasRailStation}
        availableActionsByPhase={location?.availableActionsByPhase}
        initialSchedule={
          playerCharacter?.actionSequence
            ? convertActionSequenceToSchedule(playerCharacter.actionSequence)
            : undefined
        }
        currentDay={gameTime ? gameTime.dayOfWeek - 1 : undefined}
        currentPhase={gameTime ? gameTime.hour - 1 : undefined}
        characterSkills={getCharacterSkillsMap(playerCharacter || null)}
      />

      {/* Character Stats Modal */}
      <CharacterStatsModal
        open={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        character={partyMembers[selectedMemberIndex] || null}
        onCharacterUpdate={(updatedCharacter) => {
          // Update the party state with the updated character
          if (party && updatedCharacter.id) {
            const updatedCharacters = party.characters.map((char, index) => {
              if (index === selectedMemberIndex && char?.id === updatedCharacter.id && char) {
                // Map the updated CharacterStatsView back to CharacterInterface
                // Preserve all original character fields and update title-related fields
                return {
                  ...char,
                  title: updatedCharacter.title,
                  possibleEpithets: updatedCharacter.possibleEpithets || char.possibleEpithets || [],
                  possibleRoles: updatedCharacter.possibleRoles || char.possibleRoles || [],
                } as CharacterInterface;
              }
              return char;
            });
            
            setParty({
              ...party,
              characters: updatedCharacters,
            });
          }
        }}
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
        news={news}
      />

      {/* Skills Modal */}
      <SkillsModal
        open={skillsModalOpen}
        onClose={() => setSkillsModalOpen(false)}
        character={playerCharacter || null}
      />

    </Box>
  );
}

