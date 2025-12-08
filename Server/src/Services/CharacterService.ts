import { eq, sql } from "drizzle-orm";
import { db } from "../Database/connection";
import { characters, type InsertCharacter } from "../Database/Schema";
import { eq } from "drizzle-orm";
import { CharacterType,RaceEnum } from "../InterFacesEnumsAndTypes/Enums";
import { Character } from "../Entity/Character/Character";
import { CharacterAlignment } from "../Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterAttributes } from "../Entity/Character/Subclass/Stats/CharacterAttributes";
import { CharacterBattleStats } from "../Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterProficiencies } from "../Entity/Character/Subclass/Stats/CharacterProficiencies";
import { CharacterNeeds } from "../Entity/Character/Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "../Entity/Character/Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "../Entity/Character/Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../Entity/Character/Subclass/Action/CharacterAction";
import { randomUUID } from "crypto";
import { addBaseVitals } from "../Entity/Character/Subclass/Vitals/addBaseVitals";
import { PartyService } from "./PartyService";
import { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
import { partyManager } from "../Game/PartyManager";
import { characterManager } from "../Game/CharacterManager";
import { PlayableBackgroundEnum, PlayableClassEnum, PlayableRaceEnum } from "src/API/characterCreation/enums";
import { classBonus } from "src/API/characterCreation/classes";
import { backgroundBonus } from "src/API/characterCreation/background";
import { racesBonus } from "src/API/characterCreation/races";
import { equip } from "src/Utils/equip";
import { activeEpithet } from "src/Entity/Character/Subclass/Title/logics/active";
import { activeRole } from "src/Entity/Character/Subclass/Title/logics/active";

export interface CharacterCreationData {
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: PlayableRaceEnum;
  portrait: string; // e.g., "m_human01"
  background: PlayableBackgroundEnum;
  startingClass: PlayableClassEnum;
}

export class CharacterService {
  /**
   * Handle complete character creation flow: create + save to DB
   * Returns the saved character ready for the frontend
   */
  static async handleCreateCharacter(
    userId: string,
    characterData: CharacterCreationData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // 1. Create the Character entity
      const character = this.createCharacter(userId, characterData);

      // 2. Create party for the character
      const party = PartyService.createParty(character, LocationsEnum.WaywardInn);
      character.partyID = party.partyID;
      character.location = LocationsEnum.WaywardInn; // Set character location

      // 3. Manager are for easy access to characters and parties
      characterManager.addCharacter(character);
      partyManager.addParty(party);

      // 4. Save to database
      const insertCharacter = this.characterToInsertCharacter(character);
      await this.saveCharacterToDatabase(insertCharacter);

      const insertParty = PartyService.partyToInsertParty(party);
      await PartyService.savePartyToDatabase(insertParty);

      // 5. Return success, no need for character data, FE will fetch it later
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Convert Character entity to InsertCharacter for database storage
   */
  private static characterToInsertCharacter(character: Character): InsertCharacter {
    return {
      id: character.id,
      userId: character.userId!,
      partyID: character.partyID,

      // Basic info
      name: character.name.en,
      gender: character.gender,
      race: character.race!,
      type: character.type,
      level: character.level,
      portrait: character.portrait,
      background: character.background,
      location: character.location || null,

      // Character systems - serialize to JSON
      alignment: character.alignment as any,
      artisans: character.artisans as any,
      attribute: character.attribute as any,
      battleStats: character.battleStats as any,
      elements: character.elements as any,
      proficiencies: character.proficiencies as any,
      needs: character.needs as any,
      vitals: character.vitals as any,
      fame: character.fame as any,
      behavior: character.behavior as any,
      title: character.title as any,
      possibleEpithets: character.possibleEpithets as any,
      possibleRoles: character.possibleRoles as any,
      actionSequence: character.actionSequence as any,
      informations: character.information as any,

      // Skills
      skills: character.skills as any,
      activeSkills: character.activeSkills as any,
      conditionalSkills: character.conditionalSkills as any,
      conditionalSkillsCondition: character.conditionalSkillsCondition as any,
      skillLearningProgress: character.skillLearningProgress as any,
      breathingSkills: character.breathingSkills as any,
      activeBreathingSkill: character.activeBreathingSkill as any,
      breathingSkillsLearningProgress: character.breathingSkillsLearningProgress as any,
      planarAptitude: character.planarAptitude as any,

      // Social
      relations: character.relations as any,
      traits: character.traits as any,

      // Inventory
      inventorySize: character.inventorySize as any,
      inventory: character.inventory as any,
      equipments: character.equipments as any,

      // State
      statTracker: character.statTracker,
      abGuage: character.abGauge,

      // Audit
      createdBy: "system",
      updatedBy: "system",
    };
  }

  static createCharacter(
    userId: string,
    characterData: CharacterCreationData
  ): Character {
    // TODO: Update CharacterService.createCharacter to use new enum-based structures
    // The old RACES/CLASSES/BACKGROUNDS structures have been removed
    // Need to refactor to use racesBonus, classBonus, backgroundBonus from API/characterCreation    
    const raceDef = racesBonus[characterData.race];
    const classDef = classBonus[characterData.startingClass];
    const backgroundDef = backgroundBonus[characterData.background];

    const character = new Character({
      id: randomUUID(),
      name: { en: characterData.name, th: characterData.name },
      type: CharacterType.humanoid,
      gender: characterData.gender,
      level: 1,
      portrait: characterData.portrait,
      background: characterData.background,

      alignment: new CharacterAlignment({}),
      artisans: new CharacterArtisans(),
      attribute: new CharacterAttributes(),
      proficiencies: new CharacterProficiencies(),
      saveRolls: new CharacterAttributes(),

      battleStats: new CharacterBattleStats(),
      elements: new CharacterElements(),
      needs: new CharacterNeeds(),
      vitals: new CharacterVitals({}),
      fame: new CharacterFame(),
      actionSequence: defaultActionSequence(),
    });

    character.userId = userId;

    // Race
    character.race = characterData.race as unknown as RaceEnum;
    character.planarAptitude.aptitude = raceDef.planarAptitude;
    character.vitals.hp.setBase(raceDef.baseHP);
    character.vitals.sp.setBase(raceDef.baseSP);
    character.vitals.mp.setBase(raceDef.baseMP);
    character.attribute.mutateBase(raceDef.attributes.three, 3);
    character.attribute.mutateBase(raceDef.attributes.two, 2);
    character.attribute.mutateBase(raceDef.attributes.one, 1);

    // Class
    character.proficiencies.mutateBase(classDef.proficiencies.three, 3);
    character.proficiencies.mutateBase(classDef.proficiencies.two, 2);
    character.proficiencies.mutateBase(classDef.proficiencies.one, 1);
    for (const skill of classDef.startingSkills) {
      character.activeSkills.push({
        id: skill,
        level: 1,
        exp: 0
      })
    }
    for (const item of classDef.startingEquipments) {
      character.inventory.set(item.id, 1);
      equip(character, item.id, item.slot);
    }

    // Background
    character.artisans.mutateBase(backgroundDef.artisans.three, 3);
    character.artisans.mutateBase(backgroundDef.artisans.two, 2);
    character.artisans.mutateBase(backgroundDef.artisans.one, 1);
    
    // Add epithet to available list and set it
    character.addEpithet(backgroundDef.epithet);
    activeEpithet(character, backgroundDef.epithet);
    
    // Set alignment from background
    character.alignment.good = backgroundDef.alignment.good;
    character.alignment.evil = backgroundDef.alignment.evil;
    
    // Add role to available list and set it
    character.addRole(classDef.role);
    activeRole(character, classDef.role);
    
    // Add starting items from background
    for (const item of backgroundDef.startingItems) {
      const currentQuantity = character.inventory.get(item.item) || 0;
      character.inventory.set(item.item, currentQuantity + item.quantity);
    }

    addBaseVitals(character);

    return character;
  }

  static async saveCharacterToDatabase(character: InsertCharacter): Promise<{ character: InsertCharacter; id: string }> {
    let savedCharacter;
    try {
      [savedCharacter] = await db
        .insert(characters)
        .values(character)
        .returning();
    } catch (error) {
      throw error;
    }

    if (!savedCharacter) {
      throw new Error("Failed to create character");
    }

    return { character: savedCharacter, id: savedCharacter.id };
  }

  /**
   * Update an existing character in the database
   */
  static async updateCharacterInDatabase(character: Character): Promise<void> {
    const insertCharacter = this.characterToInsertCharacter(character);
    
    try {
      await db
        .update(characters)
        .set({
          ...insertCharacter,
          updatedAt: new Date(),
          updatedBy: "system",
        })
        .where(eq(characters.id, character.id));
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get the user's character (returns null if no character exists)
   */

  static async getUserCharacter(userId: string): Promise<any | null> {
    try {
      const [character] = await db
        .select()
        .from(characters)
        .where(eq(characters.userId, userId))
        .limit(1);

      return character || null;
    } catch (error) {
      // If party_id column doesn't exist yet (during migration), use raw SQL
      // This handles the migration transition period
      try {
        const result = await db.execute(sql`
          SELECT * FROM characters WHERE user_id = ${userId} LIMIT 1
        `);
        
        if (result.rows && result.rows.length > 0) {
          return result.rows[0];
        }
      } catch (fallbackError) {
        // If raw SQL also fails, log and return null
        console.error("Error fetching character (fallback also failed):", fallbackError);
      }
      
      return null;
    }
  }

  static async isCharacterNameAvailable(name: string): Promise<boolean> {
    const [existing] = await db
      .select()
      .from(characters)
      .where(eq(characters.name, name))
      .limit(1);

    return !existing;
  }
}
