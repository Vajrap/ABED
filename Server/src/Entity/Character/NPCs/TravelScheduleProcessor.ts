/**
 * NPC Travel Schedule Processor
 * 
 * Processes travel schedules for NPCs, moving them between locations
 * based on their defined schedules. NPCs "teleport" instantly rather
 * than using the full travel system.
 * 
 * Works at the party level - the party leader's travel schedule determines
 * the party's movement. NPCs that are currently in player parties are
 * skipped (their partyID will not match an NPCEnums value).
 */

import { DayOfWeek, TimeOfDay } from "src/InterFacesEnumsAndTypes/Time";
import type { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { NPCTravelScheduleEvent } from "./types";
import type { Party } from "../../Party/Party";
import { locationRepository } from "../../Location/repository";
import { partyManager } from "../../../Game/PartyManager";
import { getNPCTemplateByUUID } from "./repository";
import { NPCEnums } from "./enum";
import Report from "../../../Utils/Reporter";

/**
 * Process all NPC travel schedules for the current phase
 */
export async function processNPCTravelSchedules(
  day: DayOfWeek,
  phase: TimeOfDay,
): Promise<void> {
  // Get all parties (including NPC parties)
  const allParties = partyManager.parties;
  
  for (const party of allParties) {
    // Skip parties with player characters (NPCs in player parties should not move via schedules)
    const hasPlayerCharacters = party.characters.some(
      (char) => char !== "none" && char.userId !== null
    );
    
    if (hasPlayerCharacters) {
      continue; // Skip player parties
    }

    // Check if this is an NPC party by checking if partyID matches an NPCEnums value
    // NPC parties have partyID = NPCEnums value (e.g., "thomas", "edda")
    // Player parties have UUID partyIDs
    const isNPCParty = Object.values(NPCEnums).includes(party.partyID as NPCEnums);
    
    if (!isNPCParty) {
      continue; // Not an NPC party (might be a temporary party or orphaned)
    }

    // Get party leader (first NPC in party)
    const leader = party.leader;
    if (!leader || leader.userId !== null) {
      continue; // No valid leader or leader is a player
    }

    // Get travel schedule from leader's template
    const template = getNPCTemplateByUUID(leader.id);
    
    if (!template || !template.travelSchedule) {
      continue; // No travel schedule defined for this NPC
    }

    const schedule = template.travelSchedule;
    
    // Find matching travel event for current day/phase
    const matchingEvent = findMatchingTravelEvent(
      schedule.events,
      day,
      phase,
      party.location
    );

    if (matchingEvent) {
      await movePartyToLocation(party, matchingEvent.destination);
    } else {
      // Check if party should return home (if not already there)
      // Simple logic: if at a non-home location and no event scheduled, return home at end of day
      if (
        party.location !== schedule.homeLocation &&
        phase === TimeOfDay.night
      ) {
        // Check if there's a return event scheduled for tomorrow
        const shouldReturnHome = !schedule.events.some((event) => {
          // If there's an event tomorrow that would keep them away, don't return
          const nextDay = getNextDay(day);
          return (
            event.destination !== schedule.homeLocation &&
            (event.day === undefined || event.day === nextDay) &&
            event.phase === TimeOfDay.morning
          );
        });

        if (shouldReturnHome) {
          await movePartyToLocation(party, schedule.homeLocation);
        }
      }
    }
  }
}

/**
 * Find a travel event that matches the current day/phase
 */
function findMatchingTravelEvent(
  events: NPCTravelScheduleEvent[],
  day: DayOfWeek,
  phase: TimeOfDay,
  currentLocation: LocationsEnum, // Party's current location
): NPCTravelScheduleEvent | null {
  for (const event of events) {
    // Check if phase matches
    if (event.phase !== phase) {
      continue;
    }

    // Check if day matches (if specified)
    if (event.day !== undefined && event.day !== day) {
      continue;
    }

    // Check frequency
    if (event.frequency === 'daily') {
      // Matches every day at this phase
      return event;
    } else if (event.frequency === 'weekly') {
      // Matches this day of week at this phase
      if (event.day === undefined || event.day === day) {
        return event;
      }
    } else if (event.frequency === 'conditional') {
      // For now, treat conditional as weekly (can be expanded later)
      if (event.day === undefined || event.day === day) {
        return event;
      }
    }
  }

  return null;
}

/**
 * Move a party to a new location
 */
async function movePartyToLocation(
  party: Party,
  destination: LocationsEnum,
): Promise<void> {
  const currentLocation = party.location;
  
  if (currentLocation === destination) {
    return; // Already at destination
  }

  const fromLocationEntity = locationRepository[currentLocation];
  const toLocationEntity = locationRepository[destination];

  if (!fromLocationEntity || !toLocationEntity) {
    Report.error("Location not found when moving NPC party", {
      partyId: party.partyID,
      fromLocation: currentLocation,
      destination,
    });
    return;
  }

  // Remove party from current location
  fromLocationEntity.partyMoveOut(party);

  // Move party to new location (this updates party.location and all character.locations)
  toLocationEntity.partyMovesIn(party);

  const leader = party.leader;
  const leaderName = leader && typeof leader.name !== 'string' ? leader.name?.en : (typeof leader?.name === 'string' ? leader.name : party.partyID);

  Report.info("NPC party moved via travel schedule", {
    partyId: party.partyID,
    leaderName,
    fromLocation: currentLocation,
    toLocation: destination,
  });
}

/**
 * Get the next day of the week
 */
function getNextDay(day: DayOfWeek): DayOfWeek {
  const days: DayOfWeek[] = [
    DayOfWeek.laoh,
    DayOfWeek.rowana,
    DayOfWeek.aftree,
    DayOfWeek.udur,
    DayOfWeek.matris,
    DayOfWeek.seethar,
  ];
  
  const currentIndex = days.indexOf(day);
  if (currentIndex === -1) {
    // Fallback (should never happen, but TypeScript doesn't know that)
    return DayOfWeek.laoh;
  }
  
  const nextIndex = (currentIndex + 1) % days.length;
  return days[nextIndex]!; // Safe to use ! since we're using modulo
}

