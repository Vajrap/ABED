"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, alpha, useTheme, CircularProgress, Alert } from "@mui/material";
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
import { actionService } from "@/services/actionService";
import { gameDataService } from "@/services/gameDataService";
import type { PartyInterface, CharacterInterface, GameTimeInterface, News } from "@/types/api";
import type { LocationData } from "@/services/locationService";
import type { CharacterStatsView } from "@/types/game";

export default function GameView() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [newsModalOpen, setNewsModalOpen] = useState(false);

  // Data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [party, setParty] = useState<PartyInterface | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [unseenNews, setUnseenNews] = useState<News[]>([]);
  const [gameTime, setGameTime] = useState<GameTimeInterface | null>(null);

  // Fetch game data on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await gameDataService.fetchGameData();
        
        if (response.success && response.data) {
          setParty(response.data.party);
          setLocation(response.data.location);
          setNews(response.data.news);
          setUnseenNews(response.data.unseenNews);
          
          // Extract game time from response (location or news)
          if (response.data.gameTime) {
            setGameTime(response.data.gameTime);
          } else if (response.data.news.length > 0) {
            setGameTime(response.data.news[0].ts);
          } else {
            // Default game time if unavailable (shouldn't happen in production)
            console.warn("No game time available, using default");
            setGameTime({
              hour: 3,
              dayOfWeek: 2,
              dayOfSeason: 15,
              season: 1,
              dayPassed: 14,
              year: 1,
            });
          }
        } else {
          // Handle partial errors
          const errorMessages = response.errors 
            ? Object.values(response.errors).filter(Boolean).join(", ")
            : "Failed to load game data";
          setError(errorMessages);
          
          // Still try to set partial data if available
          if (response.data) {
            if (response.data.party) setParty(response.data.party);
            if (response.data.location) setLocation(response.data.location);
            if (response.data.news) setNews(response.data.news);
            if (response.data.unseenNews) setUnseenNews(response.data.unseenNews);
          }
        }
      } catch (err) {
        console.error("Error fetching game data:", err);
        setError(err instanceof Error ? err.message : "Failed to load game data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Map backend CharacterInterface to component props
  const mapCharacterToMember = (character: CharacterInterface | null, isPlayer: boolean): CharacterStatsView | null => {
    if (!character) return null;
    
    return {
      id: character.id,
      name: character.name,
      gender: character.gender,
      race: character.race,
      type: character.type,
      level: character.level,
      portrait: character.portrait || null,
      background: character.background,
      alignment: character.alignment as any, // Alignment is already in the right format
      title: character.title,
      possibleEpithets: character.possibleEpithets ? character.possibleEpithets.map(e => String(e)) : [],
      possibleRoles: character.possibleRoles ? character.possibleRoles.map(r => String(r)) : [],
      attributes: character.attributes,
      battleStats: character.battleStats,
      elements: character.elements,
      proficiencies: character.proficiencies,
      artisans: character.artisans,
      vitals: character.vitals ? {
        hp: {
          current: character.vitals.hp.current,
          base: (character.vitals.hp as any).base || 0,
          bonus: (character.vitals.hp as any).bonus || 0,
        },
        mp: {
          current: character.vitals.mp.current,
          base: (character.vitals.mp as any).base || 0,
          bonus: (character.vitals.mp as any).bonus || 0,
        },
        sp: {
          current: character.vitals.sp.current,
          base: (character.vitals.sp as any).base || 0,
          bonus: (character.vitals.sp as any).bonus || 0,
        },
      } : undefined,
      needs: character.needs,
      planarAptitude: character.planarAptitude,
      equipment: character.equipments, // Will be processed by CharacterStatsModal
    };
  };

  // Get party members array from party data
  const partyMembers = party?.characters.map((char, index) => {
    const isPlayer = char?.id === party.playerCharacterId;
    return mapCharacterToMember(char, isPlayer);
  }) || [];

  const handleScheduleSave = async (schedule: Record<string, string>) => {
    console.log("[GameView] Schedule saved:", schedule);
    
    try {
      // Map UI day indices (0-5) to DayOfWeek enum values
      const dayOfWeekMap = [
        "laoh",      // Day 0
        "rowana",    // Day 1
        "aftree",    // Day 2
        "udur",      // Day 3
        "matris",    // Day 4
        "seethar",   // Day 5
      ];
      
      // Map UI phase indices (0-3) to TimeOfDay enum values
      // UI order: Morning (0), Afternoon (1), Evening (2), Night (3)
      const timeOfDayMap = [
        "morning",   // Phase 0 - Morning
        "afternoon", // Phase 1 - Afternoon
        "evening",   // Phase 2 - Evening
        "night",     // Phase 3 - Night
      ];
      
      // Map backend ActionInput enum values to CharacterAction objects
      // The schedule contains backend ActionInput enum values (from ActionSelectionModal)
      // Format: "actionId" or "actionId|parameterValue" for actions with sub-selection
      const mapActionToCharacterAction = (actionInputValue: string | null): any => {
        if (!actionInputValue) {
          return { type: "None" };
        }
        
        // Check if action has a parameter (format: "actionId|parameterValue")
        const [actionId, parameterValue] = actionInputValue.includes("|")
          ? actionInputValue.split("|")
          : [actionInputValue, null];
        
        // Build CharacterAction object based on action type
        switch (actionId) {
          // Simple actions without parameters
          case "None":
            return { type: "None" };
          case "Rest":
            return { type: "Rest" };
          case "Inn":
            return { type: "Inn" };
          case "Camping":
            return { type: "Camping" };
          case "House Rest":
            return { type: "House Rest" };
          case "Socialize":
            return { type: "Socialize" };
          case "Stroll":
            return { type: "Stroll" };
          case "Tavern":
            return { type: "Tavern" };
          case "Mining":
            return { type: "Mining" };
          case "Wood Cutting":
            return { type: "Wood Cutting" };
          case "Foraging":
            return { type: "Foraging" };
          case "Smelting":
            return { type: "Smelting" };
          case "Tanning":
            return { type: "Tanning" };
          case "Carpentry":
            return { type: "Carpentry" };
          case "Weaving":
            return { type: "Weaving" };
          case "Enchanting":
            return { type: "Enchanting" };
          
          // Actions that need parameters
          case "Train Attribute":
            return parameterValue
              ? { type: "Train Attribute", attribute: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          case "Train Proficiency":
            return parameterValue
              ? { type: "Train Proficiency", proficiency: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          case "Train Artisan":
            return parameterValue
              ? { type: "Train Artisan", artisan: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          case "Train Skill":
            return parameterValue
              ? { type: "Train Skill", skillId: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          case "Learn Skill":
            return parameterValue
              ? { type: "Learn Skill", skillId: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          case "Read":
            return parameterValue
              ? { type: "Read", bookId: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          case "Craft":
            return parameterValue
              ? { type: "Craft", itemId: parameterValue }
              : { type: "None" }; // Invalid - missing parameter
          
          // Organization/Sect actions that need sub-selection
          case "Heavens Decree":
            return parameterValue
              ? { type: "Heavens Decree", action: parameterValue }
              : { type: "None" };
          case "Church of Laoh":
            return parameterValue
              ? { type: "Church of Laoh", action: parameterValue }
              : { type: "None" };
          case "Great Temple of Laoh":
            return parameterValue
              ? { type: "Great Temple of Laoh", action: parameterValue }
              : { type: "None" };
          case "Cult of Nizarith":
            return parameterValue
              ? { type: "Cult of Nizarith", action: parameterValue }
              : { type: "None" };
          case "Shrine of Gelthoran":
          case "Shrine of Aqorath":
          case "Shrine of Valthoria":
          case "Shrine of Pyrnthanas":
            return parameterValue
              ? { type: actionId, action: parameterValue }
              : { type: "None" };
          case "Major Shrine of Gelthoran":
          case "Major Shrine of Aqorath":
          case "Major Shrine of Valthoria":
          case "Major Shrine of Pyrnthanas":
            return parameterValue
              ? { type: actionId, action: parameterValue }
              : { type: "None" };
          case "Knight Order":
            return parameterValue
              ? { type: "Knight Order", action: parameterValue }
              : { type: "None" };
          case "Magic School":
            return parameterValue
              ? { type: "Magic School", action: parameterValue }
              : { type: "None" };
          case "Arcane Academia":
            return parameterValue
              ? { type: "Arcane Academia", action: parameterValue }
              : { type: "None" };
          
          default:
            // Unknown action - log warning and default to None
            console.warn(`[GameView] Unknown ActionInput value: ${actionId}, defaulting to None`);
            return { type: "None" };
        }
      };
      
      // Build actionSequence structure: Record<DayOfWeek, Record<TimeOfDay, CharacterAction>>
      const actionSequence: Record<string, Record<string, any>> = {};
      
      // Initialize all days with empty time slots
      dayOfWeekMap.forEach((day) => {
        actionSequence[day] = {};
        timeOfDayMap.forEach((time) => {
          actionSequence[day][time] = { type: "None" };
        });
      });
      
      // Fill in scheduled actions
      Object.entries(schedule).forEach(([key, actionId]) => {
        const [dayIndexStr, phaseIndexStr] = key.split("-");
        const dayIndex = parseInt(dayIndexStr, 10);
        const phaseIndex = parseInt(phaseIndexStr, 10);
        
        if (
          dayIndex >= 0 &&
          dayIndex < dayOfWeekMap.length &&
          phaseIndex >= 0 &&
          phaseIndex < timeOfDayMap.length
        ) {
          const day = dayOfWeekMap[dayIndex];
          const time = timeOfDayMap[phaseIndex];
          actionSequence[day][time] = mapActionToCharacterAction(actionId);
        }
      });
      
      // Build complete request payload
      const request = {
        actionSequence,
        // Optional fields for travel planning (not implemented yet)
        // travelPath: undefined,
        // travelMethod: undefined,
        // railTravelTo: undefined,
        // haltTravel: false,
      };
      
      console.log("[GameView] Built request payload:", request);
      
      // Send API request to backend
      const response = await actionService.updateActions(request);
      console.log("[GameView] Actions updated successfully:", response);
      
      // TODO: Handle response (e.g., show converted actions to user, update UI)
      if (response.status === "SUCCESS") {
        console.log("[GameView] Schedule saved successfully");
        if (response.convertedActions && response.convertedActions.length > 0) {
          console.warn("[GameView] Some actions were converted:", response.convertedActions);
          // TODO: Show notification to user about converted actions
        }
      } else {
        console.error("[GameView] Schedule save failed:", response.reason);
        // TODO: Show error notification to user
      }
    } catch (error) {
      console.error("[GameView] Error saving schedule:", error);
      // TODO: Show error toast/notification to user
    }
  };

  const handleTravelClick = () => {
    console.log("Travel clicked - open travel planning modal");
    // TODO: Open travel planning modal
  };

  const handleRailTravelClick = () => {
    console.log("Rail travel clicked - open rail travel modal");
    // TODO: Open rail travel modal
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
            <ChatPanel currentUserId={party.playerCharacterId} />
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
        hasRailStation={location?.hasRailStation}
        availableActionsByPhase={location?.availableActionsByPhase}
        characterSkills={(() => {
          // Find player character
          const playerCharacter = party.characters.find(
            (char) => char && char.id === party.playerCharacterId
          );
          
          if (!playerCharacter) return undefined;
          
          const skillsMap: Record<string, { level: number; exp: number }> = {};
          
          // Add active skills
          if (playerCharacter.activeSkills) {
            playerCharacter.activeSkills.forEach((skill) => {
              skillsMap[skill.id] = { level: skill.level, exp: skill.exp };
            });
          }
          
          // Add conditional skills (avoid duplicates)
          if (playerCharacter.conditionalSkills) {
            playerCharacter.conditionalSkills.forEach((skill) => {
              if (!skillsMap[skill.id]) {
                skillsMap[skill.id] = { level: skill.level, exp: skill.exp };
              }
            });
          }
          
          return Object.keys(skillsMap).length > 0 ? skillsMap : undefined;
        })()}
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

    </Box>
  );
}

