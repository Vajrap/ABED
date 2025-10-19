import { eq } from "drizzle-orm";
import { db } from "../Database/connection";
import { characters, type InsertCharacter } from "../Database/Schema";
import { RACES, type RaceKey } from "../Game/CharacterCreation/Races";
import { CLASSES, type ClassKey } from "../Game/CharacterCreation/Classes";
import { BACKGROUNDS, type BackgroundKey } from "../Game/CharacterCreation/Backgrounds";
import { ATTRIBUTE_KEYS, CharacterType, PROFICIENCY_KEYS, ARTISAN_KEYS } from "../InterFacesEnumsAndTypes/Enums";
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

export interface CharacterCreationData {
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: RaceKey;
  portrait: string; // e.g., "m_human01"
  background: BackgroundKey;
  startingClass: ClassKey;
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
      const party = PartyService.createParty(character, LocationsEnum.None);
      character.partyID = party.partyID;

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
      name: character.name,
      gender: character.gender,
      race: character.race!,
      type: character.type,
      level: character.level,
      portrait: character.portrait,
      background: character.background,

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
    // Validate inputs
    if (!RACES[characterData.race]) {
      throw new Error(`Invalid race: ${characterData.race}`);
    }
    if (!CLASSES[characterData.startingClass]) {
      throw new Error(`Invalid class: ${characterData.startingClass}`);
    }
    if (!BACKGROUNDS[characterData.background]) {
      throw new Error(`Invalid background: ${characterData.background}`);
    }

    // Get race, class, and background definitions
    const raceDef = RACES[characterData.race];
    const classDef = CLASSES[characterData.startingClass];
    const backgroundDef = BACKGROUNDS[characterData.background];

    if (!raceDef || !classDef || !backgroundDef) {
      throw new Error("Invalid race, class, or background definition");
    }

    // Create character data (matching Character entity structure)
    const newCharacter = new Character({
      // random uuid as string
      id: randomUUID(),
      name: characterData.name,
      type: CharacterType.humanoid,
      gender: characterData.gender,
      level: 1,
      portrait: characterData.portrait,
      background: characterData.background,

      alignment: new CharacterAlignment({}),

      // Character systems
      artisans: new CharacterArtisans(),
      attribute: new CharacterAttributes(),
      proficiencies: new CharacterProficiencies(),

      battleStats: new CharacterBattleStats(),
      elements: new CharacterElements(),
      needs: new CharacterNeeds(),
      vitals: new CharacterVitals({}),
      fame: new CharacterFame(),
      actionSequence: defaultActionSequence(),
    })

    newCharacter.userId = userId;

    // Race
    newCharacter.race = raceDef.name;
    newCharacter.planarAptitude.aptitude = raceDef.planarAptitude;
    newCharacter.vitals.hp.setBase(raceDef.baseHP);
    newCharacter.vitals.sp.setBase(raceDef.baseSP);
    newCharacter.vitals.mp.setBase(raceDef.baseMP);

    for (const attrKey of ATTRIBUTE_KEYS) {
      newCharacter.attribute.setBase(attrKey, raceDef.attributes[attrKey]);
    }

    // Class
    newCharacter.title.role = classDef.role;
    for (const profKey of PROFICIENCY_KEYS) {
      newCharacter.proficiencies.setBase(profKey, classDef.proficiencies[profKey]);
    }
    newCharacter.activeSkills = classDef.startingSkills.map(skill => {
      return {
        id: skill,
        level: 1,
        exp: 0,
      }
    })
    for (const item of classDef.startingItems) {
      newCharacter.addItemToInventory(item.id, item.quantity);
    }
    newCharacter.addRole(classDef.role);

    // Background
    for (const artisanKey of ARTISAN_KEYS) {
      newCharacter.artisans.setBase(artisanKey, backgroundDef.artisanBonuses[artisanKey]);
    }
    newCharacter.title.epithet = backgroundDef.epithet;
    for (const item of backgroundDef.startingItems) {
      newCharacter.addItemToInventory(item.id, item.quantity);
    }
    newCharacter.addEpithet(backgroundDef.epithet);

    addBaseVitals(newCharacter);

    return newCharacter;
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
   * Get the user's character (returns null if no character exists)
   */
  static async getUserCharacter(userId: string): Promise<any | null> {
    const [character] = await db
      .select()
      .from(characters)
      .where(eq(characters.userId, userId))
      .limit(1);

    return character || null;
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
