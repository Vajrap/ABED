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
  static removeNPCFromParty(partyId: string, npcId: string): boolean {
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
      const npc = party.characters[npcIndex];
      party.characters[npcIndex] = "none";
      
      if (npc !== "none") {
        npc.partyID = null;
        // Keep location for now - NPC might stay in same location
      }

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