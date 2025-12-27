import { eq } from "drizzle-orm";
import { db } from "../Database/connection";
import { parties, type InsertParty } from "../Database/Schema";
import type { Character } from "../Entity/Character/Character";
import { Party } from "../Entity/Party/Party";
import { PartyBehavior } from "../Entity/Party/PartyBehavior";
import { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
import { partyManager } from "../Game/PartyManager";
import Report from "../Utils/Reporter";

export class PartyService {
  /**
   * Create a new party entity (pure function, no DB)
   */
  static createParty(character: Character, location: LocationsEnum): Party {
    const party = new Party({
      leaderId: character.id,
      location: location,
      behavior: new PartyBehavior(),
      characters: [character],
      leader: character,
    });
    return party;
  }

  /**
   * Convert Party entity to InsertParty for database storage
   */
  static partyToInsertParty(party: Party): InsertParty {
    // Convert characters array to array of IDs or "none"
    const characterIds: (string | "none")[] = party.characters.map((char) => 
      char === "none" ? "none" : char.id
    );

    return {
      partyID: party.partyID,
      isTraveling: party.isTraveling,
      location: party.location,
      justArrived: party.justArrived,
      characters: characterIds as any,
      behavior: party.behavior as any,
      informations: party.informations as any,
      actionSequence: party.actionSequence as any,
      leaderID: party.leader.id,
      createdBy: "system",
      updatedBy: "system",
    };
  }

  /**
   * Save party to database
   */
  static async savePartyToDatabase(insertParty: InsertParty): Promise<{ party: InsertParty; id: string }> {
    let savedParty;
    try {
      [savedParty] = await db
        .insert(parties)
        .values(insertParty)
        .returning();
    } catch (error) {
      Report.error(`Failed to save party: ${error}`);
      throw error;
    }

    if (!savedParty) {
      throw new Error("Failed to create party");
    }

    Report.info(`Party saved: ${savedParty.partyID}`);
    return { party: savedParty, id: savedParty.id };
  }

  /**
   * Get party by partyID
   */
  static async getPartyByPartyID(partyID: string): Promise<any | null> {
    const [party] = await db
      .select()
      .from(parties)
      .where(eq(parties.partyID, partyID))
      .limit(1);

    return party || null;
  }

  /**
   * Update party in database
   */
  static async updateParty(
    partyID: string,
    updates: Partial<InsertParty>
  ): Promise<void> {
    await db
      .update(parties)
      .set({
        ...updates,
        updatedAt: new Date(),
        updatedBy: "system",
      })
      .where(eq(parties.partyID, partyID));

    Report.info(`Party updated: ${partyID}`);
  }

  /**
   * Add NPC to party
   * Returns true if successful, false if party is full or NPC already in party
   */
  static addNPCToParty(partyId: string, npcId: string): boolean {
    try {
      const party = partyManager.getPartyByID(partyId);
      if (!party) {
        Report.warn("Party not found", { partyId });
        return false;
      }

      // Check if NPC is already in party
      const existingIndex = party.characters.findIndex(
        (char) => char !== "none" && char.id === npcId
      );
      if (existingIndex !== -1) {
        Report.warn("NPC already in party", { partyId, npcId });
        return false;
      }

      // Find first empty slot
      const emptyIndex = party.characters.findIndex((char) => char === "none");
      if (emptyIndex === -1) {
        Report.warn("Party is full", { partyId });
        return false;
      }

      // Get NPC character
      const { characterManager } = require("../Game/CharacterManager");
      const npc = characterManager.getCharacterByID(npcId);
      if (!npc) {
        Report.warn("NPC not found", { npcId });
        return false;
      }

      // Store original NPC party ID if this is an NPC (userId is null) and they don't already have one stored
      // This allows us to restore them to their original party when they leave
      if (npc.userId === null && !npc.originalNPCPartyID && npc.partyID) {
        // Check if their current partyID is an NPC party (NPCEnums value)
        const { NPCEnums } = require("../Entity/Character/NPCs/enum");
        const npcEnumsValues = Object.values(NPCEnums) as string[];
        if (npcEnumsValues.includes(npc.partyID)) {
          npc.originalNPCPartyID = npc.partyID;
          // Update in database
          const { CharacterService } = require("./CharacterService");
          CharacterService.updateCharacterInDatabase(npc).catch((error: any) => {
            Report.error("Failed to update NPC originalNPCPartyID in database", { error, npcId });
          });
        }
      }

      // Add NPC to party
      party.characters[emptyIndex] = npc;
      npc.partyID = partyId;
      npc.location = party.location;

      // Recalculate party behavior
      party.setup();

      // Update in database
      const insertParty = this.partyToInsertParty(party);
      this.updateParty(partyId, insertParty).catch((error) => {
        Report.error("Failed to update party in database", { error, partyId });
      });

      Report.info("NPC added to party", { partyId, npcId, slot: emptyIndex });
      return true;
    } catch (error) {
      Report.error("Error adding NPC to party", {
        error: error instanceof Error ? error.message : String(error),
        partyId,
        npcId,
      });
      return false;
    }
  }

  /**
   * Remove NPC from party
   * Returns true if successful, false if NPC not in party
   */
  static async removeNPCFromParty(partyId: string, npcId: string): Promise<boolean> {
    try {
      const party = partyManager.getPartyByID(partyId);
      if (!party) {
        Report.warn("Party not found", { partyId });
        return false;
      }

      // Find NPC in party
      const npcIndex = party.characters.findIndex(
        (char) => char !== "none" && char.id === npcId
      );
      if (npcIndex === -1) {
        Report.warn("NPC not in party", { partyId, npcId });
        return false;
      }

      // Don't allow removing the leader
      if (party.leader.id === npcId) {
        Report.warn("Cannot remove party leader", { partyId, npcId });
        return false;
      }

      // Remove NPC from party
      const npcCharacter = party.characters[npcIndex];
      if (npcCharacter === "none" || !npcCharacter) {
        Report.warn("Attempted to remove 'none' or missing character from party", { partyId, npcId });
        return false;
      }

      // TypeScript type narrowing - we know it's a Character here (not "none")
      const npc = npcCharacter as Character;
      party.characters[npcIndex] = "none";
      
      // If this is an NPC with an original party, restore them to it
      if (npc.userId === null && npc.originalNPCPartyID) {
        const { rehydrateNPCParty } = require("../Entity/Character/NPCs/utils/rehydrateNPCParty");
        const originalParty = await rehydrateNPCParty(npc.originalNPCPartyID);
        
        if (originalParty) {
          // Check if NPC is already in the original party (defensive check)
          const existingIndex = originalParty.characters.findIndex(
            (char: any) => char !== "none" && char.id === npcId
          );
          
          if (existingIndex !== -1) {
            // NPC is already in the party - just update their properties
            npc.partyID = originalParty.partyID;
            npc.originalNPCPartyID = originalParty.partyID;
            npc.location = originalParty.location; // Move NPC to party location
            
            // Update NPC in database
            const { CharacterService } = require("./CharacterService");
            CharacterService.updateCharacterInDatabase(npc).catch((error: any) => {
              Report.error("Failed to update NPC in database after restoration (duplicate)", { error, npcId });
            });
            
            Report.info("NPC already in original party, updated properties", { 
              npcId, 
              originalPartyId: npc.originalNPCPartyID 
            });
          } else {
            // NPC is not in the party - find an empty slot
            const emptySlotIndex = originalParty.characters.findIndex((char: any) => char === "none");
            
            if (emptySlotIndex !== -1) {
              // Add NPC to the original party
              originalParty.characters[emptySlotIndex] = npc;
              npc.partyID = originalParty.partyID;
              npc.originalNPCPartyID = originalParty.partyID; // Restore original party ID
              npc.location = originalParty.location; // Move NPC to party location
              
              // Update NPC in database
              const { CharacterService } = require("./CharacterService");
              CharacterService.updateCharacterInDatabase(npc).catch((error: any) => {
                Report.error("Failed to update NPC in database after restoration", { error, npcId });
              });
              
              // Update original party in database
              const insertParty = this.partyToInsertParty(originalParty);
              this.updateParty(originalParty.partyID, insertParty).catch((error) => {
                Report.error("Failed to update original NPC party in database", { 
                  error, 
                  partyId: originalParty.partyID 
                });
              });
              
              Report.info("NPC restored to original party", { 
                npcId, 
                originalPartyId: npc.originalNPCPartyID,
                slot: emptySlotIndex
              });
            } else {
              // Original party is full (6 members) - cannot restore
              Report.warn("Original NPC party is full (6 members), cannot restore NPC", {
                npcId,
                originalPartyId: npc.originalNPCPartyID,
                partySize: originalParty.characters.filter((char: any) => char !== "none").length,
              });
              npc.partyID = null;
              // Keep originalNPCPartyID so we can retry later if space becomes available
              // Don't clear it - the NPC should remember their original party
            }
          }
        } else {
          // Could not rehydrate original party (template not found, etc.)
          Report.warn("Could not rehydrate original NPC party", {
            npcId,
            originalPartyId: npc.originalNPCPartyID,
          });
          npc.partyID = null;
          // Keep originalNPCPartyID in case we can restore later (template might be added)
        }
      } else {
        // Not an NPC or no original party - just remove from party
        npc.partyID = null;
      }
      // Note: NPC location is updated above if restored to original party

      // Recalculate party behavior
      party.setup();

      // Update in database
      const insertParty = this.partyToInsertParty(party);
      this.updateParty(partyId, insertParty).catch((error) => {
        Report.error("Failed to update party in database", { error, partyId });
      });

      Report.info("NPC removed from party", { partyId, npcId });
      return true;
    } catch (error) {
      Report.error("Error removing NPC from party", {
        error: error instanceof Error ? error.message : String(error),
        partyId,
        npcId,
      });
      return false;
    }
  }

  /**
   * Validate party size
   * Returns true if party has space, false if full
   */
  static validatePartySize(partyId: string): boolean {
    try {
      const party = partyManager.getPartyByID(partyId);
      if (!party) {
        return false;
      }

      const emptySlots = party.characters.filter((char) => char === "none").length;
      return emptySlots > 0;
    } catch (error) {
      Report.error("Error validating party size", {
        error: error instanceof Error ? error.message : String(error),
        partyId,
      });
      return false;
    }
  }
}