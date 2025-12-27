/**
 * NPC Party Rehydration Utilities
 * 
 * Helper functions to restore NPCs to their original parties
 * and recreate NPC parties from templates when needed.
 */

import { Party } from "../../../Party/Party";
import { PartyBehavior } from "../../../Party/PartyBehavior";
import { generateDeterministicUUID } from "../repository";
import { getAllNPCTemplates, getNPCsByLocation } from "../repository";
import { NPCEnums } from "../enum";
import type { NPCsParty } from "../types";
import { locationRepository } from "../../../Location/repository";
import { partyManager } from "../../../../Game/PartyManager";
import { PartyService } from "../../../../Services/PartyService";
import Report from "../../../../Utils/Reporter";
import type { Character } from "../../Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { restorePartyFromDatabase } from "../../../../Utils/PartyDatabaseLoader";

/**
 * Find which NPCsParty template an NPC belongs to by their template ID
 */
export function findNPCsPartyTemplateForNPC(templateId: NPCEnums): NPCsParty | null {
  // Search through all locations to find the NPCsParty containing this template
  const allTemplates = getAllNPCTemplates();
  const npcTemplate = allTemplates.find(t => t.id === templateId);
  
  if (!npcTemplate) {
    return null;
  }

  // Search through all locations
  const { LocationsEnum } = require("src/InterFacesEnumsAndTypes/Enums/Location");
  
  for (const location of Object.values(LocationsEnum)) {
    const npcsByLoc = getNPCsByLocation(location as LocationsEnum);
    if (!npcsByLoc) continue;

    for (const npcsParty of npcsByLoc.npcsParty) {
      const hasNPC = npcsParty.npcs.some(template => template.id === templateId);
      if (hasNPC) {
        return npcsParty;
      }
    }
  }

  return null;
}

/**
 * Rehydrate/recreate an NPC party from its template
 * Returns the party if successful, null otherwise
 */
export async function rehydrateNPCParty(partyId: NPCEnums): Promise<Party | null> {
  try {
    // First, check if party already exists in memory (partyManager)
    try {
      const existingParty = partyManager.getPartyByID(partyId);
      if (existingParty) {
        // Party exists in memory, return it directly
        return existingParty;
      }
    } catch {
      // Party not in memory, continue to check DB
    }

    // If not in memory, check database
    try {
      const dbRecord = await PartyService.getPartyByPartyID(partyId);
      if (dbRecord) {
        // Party exists in DB - restore it as a Party entity
        const restoredParty = restorePartyFromDatabase(dbRecord);
        
        // Ensure it's in partyManager
        try {
          partyManager.getPartyByID(partyId);
          // Already in memory (shouldn't happen, but defensive)
        } catch {
          // Not in memory, add it
          partyManager.addParty(restoredParty);
          
          // Register party at its location
          const locationEntity = locationRepository[restoredParty.location as LocationsEnum];
          if (locationEntity) {
            locationEntity.partyMovesIn(restoredParty);
          }
        }
        
        return restoredParty;
      }
    } catch (error) {
      // DB lookup failed or party doesn't exist in DB, continue to create from template
      Report.debug(`Party ${partyId} not found in database, will create from template`);
    }

    // Find the NPCsParty template
    const npcsPartyTemplate = findNPCsPartyTemplateForNPC(partyId);
    if (!npcsPartyTemplate) {
      Report.warn("Cannot rehydrate NPC party: template not found", { partyId });
      return null;
    }

    // Get all NPC characters for this party
    const { characterManager } = require("../../../../Game/CharacterManager");
    const partyNPCs: Character[] = [];

    for (const template of npcsPartyTemplate.npcs) {
      const npcId = generateDeterministicUUID(template.id);
      const npc = characterManager.getCharacterByID(npcId);

      if (npc && !npc.userId) {
        // Only add if NPC is not currently in a player party
        // (they might be in a player party, in which case we skip them)
        partyNPCs.push(npc);
      }
    }

    if (partyNPCs.length === 0) {
      Report.debug(`No NPCs available for rehydration of party ${partyId}`);
      return null;
    }

    // Determine location - use the home location from travel schedule if available,
    // otherwise use the NPC's current location, or default to the template location
    let partyLocation = npcsPartyTemplate.npcs[0]?.travelSchedule?.homeLocation;
    
    if (!partyLocation) {
      // Try to get location from first NPC's current location
      partyLocation = partyNPCs[0]?.location ?? undefined;
    }

    if (!partyLocation) {
      // Fallback: find location from npcsByLocRepository
      const { LocationsEnum } = require("src/InterFacesEnumsAndTypes/Enums/Location");
      for (const location of Object.values(LocationsEnum)) {
        const npcsByLoc = getNPCsByLocation(location as LocationsEnum);
        if (npcsByLoc?.npcsParty.some(p => p.partyId === partyId)) {
          partyLocation = location as LocationsEnum;
          break;
        }
      }
    }

    if (!partyLocation) {
      Report.warn("Cannot rehydrate NPC party: no location found", { partyId });
      return null;
    }

    // Create the party
    const leader = partyNPCs[0];
    if (!leader) {
      Report.warn("Cannot rehydrate NPC party: no leader found", { partyId });
      return null;
    }

    const party = new Party({
      leaderId: leader.id,
      location: partyLocation,
      behavior: new PartyBehavior(),
      characters: partyNPCs,
      leader: leader,
    });

    // Override partyID with the template's partyId
    party.partyID = partyId;

    // Set party action sequence from template if provided
    if (npcsPartyTemplate.defaultPartyActionSequence) {
      party.actionSequence = npcsPartyTemplate.defaultPartyActionSequence;
    }

    // Set partyID and originalNPCPartyID on all NPCs in the party
    for (const npc of partyNPCs) {
      npc.partyID = party.partyID;
      npc.originalNPCPartyID = party.partyID;
    }

    // Save party to database
    const insertParty = PartyService.partyToInsertParty(party);
    await PartyService.savePartyToDatabase(insertParty);

    // Update NPCs in database
    const { db } = require("../../../../Database/db");
    const { characters } = require("../../../../Database/Schema/character");
    const { eq } = require("drizzle-orm");

    for (const npc of partyNPCs) {
      await db
        .update(characters)
        .set({ 
          partyID: party.partyID,
          originalNPCPartyID: party.partyID, // Store original party ID in database
        })
        .where(eq(characters.id, npc.id));
    }

    // Register party in partyManager
    partyManager.addParty(party);

    // Register party at its location
    const locationEntity = locationRepository[partyLocation];
    if (locationEntity) {
      locationEntity.partyMovesIn(party);
    }

    Report.info(`✅ Rehydrated NPC party: ${party.partyID} with ${partyNPCs.length} NPCs at ${partyLocation}`);
    return party;
  } catch (error) {
    Report.error("Error rehydrating NPC party", {
      error: error instanceof Error ? error.message : String(error),
      partyId,
    });
    return null;
  }
}


