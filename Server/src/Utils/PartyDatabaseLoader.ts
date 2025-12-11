import { db } from "../Database/connection";
import { parties } from "../Database/Schema/party";
import { partyManager } from "../Game/PartyManager";
import { Party } from "../Entity/Party/Party";
import { PartyBehavior } from "../Entity/Party/PartyBehavior";
import { characterManager } from "../Game/CharacterManager";
import { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
import { defaultPartyAction } from "../Entity/Party/ActionlSequence/PartyActionSequence";
import { locationRepository } from "../Entity/Location/Location/repository";
import Report from "./Reporter";

/**
 * Load all parties from database into PartyManager
 * Must be called after characters are loaded
 */
export async function loadPartiesFromDatabase(): Promise<void> {
  try {
    const partyRecords = await db.select().from(parties);
    
    Report.info(`Loading ${partyRecords.length} parties from database...`);
    
    if (partyRecords.length === 0) {
      Report.warn("⚠️  No parties found in database!");
      return;
    }
    
    let loadedCount = 0;
    let failedCount = 0;
    
    for (const record of partyRecords) {
      try {
        const party = restorePartyFromDatabase(record);
        partyManager.addParty(party);
        
        // Register party at its location
        const location = locationRepository[party.location];
        if (location) {
          location.partyMovesIn(party);
          Report.debug("Party registered at location during load", {
            partyId: party.partyID,
            locationId: party.location,
          });
        } else {
          Report.warn("Location not found when registering party during load", {
            locationId: party.location,
            partyId: party.partyID,
          });
        }
        
        loadedCount++;
        Report.info(`✓ Loaded party: ${party.partyID} | location: ${party.location} | leader: ${party.leader.id}`);
      } catch (error) {
        failedCount++;
        Report.error(`✗ Failed to load party ${record.partyID}`, { 
          error, 
          partyID: record.partyID,
          errorMessage: error instanceof Error ? error.message : String(error)
        });
        // Continue loading other parties even if one fails
      }
    }
    
    Report.info(`✅ Party loading complete: ${loadedCount} loaded, ${failedCount} failed, ${partyManager.parties.length} total in manager`);
  } catch (error) {
    Report.error("❌ Error loading parties from database", { error });
    throw error;
  }
}

/**
 * Restore a Party entity from a database record
 */
function restorePartyFromDatabase(record: typeof parties.$inferSelect): Party {
  // Get leader character from characterManager (must be loaded first)
  const leader = characterManager.getCharacterByID(record.leaderID);
  if (!leader) {
    throw new Error(`Leader character ${record.leaderID} not found in characterManager`);
  }
  
  // Get all party members from characterManager
  const characterIds = record.characters as (string | "none")[];
  const partyCharactersArray: (typeof leader | "none")[] = [];
  
  // Ensure we have exactly 6 slots
  for (let i = 0; i < 6; i++) {
    const charId = characterIds[i];
    if (!charId || charId === "none") {
      partyCharactersArray[i] = "none";
    } else {
      try {
        const character = characterManager.getCharacterByID(charId);
        partyCharactersArray[i] = character;
      } catch (error) {
        Report.warn(`Character ${charId} not found in party ${record.partyID} at slot ${i}, replacing with 'none'`);
        partyCharactersArray[i] = "none";
      }
    }
  }
  
  // Get actual Character objects (filter out "none")
  const actualCharacters = partyCharactersArray.filter((char): char is typeof leader => char !== "none");
  
  // Restore behavior
  const behavior = new PartyBehavior(record.behavior as any);
  
  // Restore action sequence
  const actionSequence = record.actionSequence as any || defaultPartyAction;
  
  // Restore informations
  const informations = record.informations as Record<string, number> || {};
  
  // Create party with actual characters array
  const party = new Party({
    leaderId: record.leaderID,
    location: record.location as LocationsEnum,
    behavior,
    characters: actualCharacters,
    leader,
  });
  
  // Manually set the party characters array to preserve slot positions
  party.characters = partyCharactersArray as any;
  
  // Set additional properties
  party.isTraveling = record.isTraveling;
  party.justArrived = record.justArrived;
  party.informations = informations;
  party.actionSequence = actionSequence;
  
  return party;
}

