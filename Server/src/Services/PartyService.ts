import { eq } from "drizzle-orm";
import { db } from "../Database/connection";
import { parties, type InsertParty } from "../Database/Schema";
import type { Character } from "../Entity/Character/Character";
import { Party } from "../Entity/Party/Party";
import { PartyBehavior } from "../Entity/Party/PartyBehavior";
import { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
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
}