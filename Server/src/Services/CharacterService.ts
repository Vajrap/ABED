import { eq, sql } from "drizzle-orm";
import { db } from "../Database/connection";
import { characters, type InsertCharacter } from "../Database/Schema";
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
import { locationRepository } from "../Entity/Location/repository";
import { PlayableBackgroundEnum, PlayableClassEnum, PlayableRaceEnum } from "src/API/characterCreation/enums";
import { classBonus } from "src/API/characterCreation/classes";
import { backgroundBonus } from "src/API/characterCreation/background";
import { racesBonus } from "src/API/characterCreation/races";
import { equip } from "src/Utils/equip";
import { activeEpithet } from "src/Entity/Character/Subclass/Title/logics/active";
import { activeRole } from "src/Entity/Character/Subclass/Title/logics/active";
import type { PortraitData } from "../InterFacesEnumsAndTypes/PortraitData";
import Report from "../Utils/Reporter";
import { initializeRateLimit } from "./ChatRateLimitService";

export interface CharacterCreationData {
  name: string;
  gender: "MALE" | "FEMALE" | "NONE";
  race: PlayableRaceEnum;
  portrait: PortraitData | string; // Support both new PortraitData and legacy string format
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

      // 3.5. Register party at location
      const location = locationRepository[LocationsEnum.WaywardInn];
      if (location) {
        location.partyMovesIn(party);
        Report.debug("Party registered at location", {
          partyId: party.partyID,
          locationId: location.id,
        });
      } else {
        Report.warn("Location not found when registering party", {
          locationId: LocationsEnum.WaywardInn,
          partyId: party.partyID,
        });
      }

      // 4. Save to database
      const insertCharacter = this.characterToInsertCharacter(character);
      await this.saveCharacterToDatabase(insertCharacter);

      const insertParty = PartyService.partyToInsertParty(party);
      await PartyService.savePartyToDatabase(insertParty);

      // 4.5. Initialize rate limit for player
      await initializeRateLimit(character.id);

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
    // Build insert object - truncate all varchar fields to their schema limits
    const insertData: any = {
      id: character.id,
      userId: character.userId, // Can be null for NPCs
      partyID: character.partyID,
      location: character.location || null, // Include location if it exists

      // Basic info - truncate all varchar fields
      name: String(character.name?.en || character.name || '').substring(0, 255),
      gender: String(character.gender || '').substring(0, 10),
      race: String(character.race || '').substring(0, 50),
      type: String(character.type || 'humanoid').substring(0, 50),
      level: character.level,
      portrait: character.portrait,
      background: String(character.background || '').substring(0, 100),
      // characterPrompt is not in characters table - it's in npc_memory table

      // Character systems - serialize to JSON
      alignment: character.alignment as any,
      artisans: character.artisans as any,
      attribute: character.attribute as any,
      battleStats: character.battleStats as any,
      elements: character.elements as any,
      proficiencies: character.proficiencies as any,
      saveRolls: character.saveRolls as any,
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
      activeBreathingSkill: character.activeBreathingSkill ? String(character.activeBreathingSkill).substring(0, 50) : null,
      breathingSkillsLearningProgress: character.breathingSkillsLearningProgress as any,
      planarAptitude: character.planarAptitude as any,

      // Social
      relations: character.relations as any,
      traits: character.traits as any,

      // Inventory
      inventorySize: character.inventorySize as any,
      inventory: character.inventory as any,
      equipments: character.equipments as any,
      materialResources: character.materialResources as any,

      // State
      statTracker: character.statTracker,
      abGuage: character.abGauge,

      // Audit - truncate to 255
      createdBy: "system".substring(0, 255),
      updatedBy: "system".substring(0, 255),
    };
    
    return insertData as InsertCharacter;
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
    // Use raw SQL to avoid issues with missing columns (like location) in older database schemas
    const char = character as any;
    
    // Prepare JSON values as strings for casting
    const portraitJson = JSON.stringify(char.portrait || null);
    const alignmentJson = JSON.stringify(char.alignment || {});
    const artisansJson = JSON.stringify(char.artisans || {});
    const attributeJson = JSON.stringify(char.attribute || {});
    const battleStatsJson = JSON.stringify(char.battleStats || {});
    const elementsJson = JSON.stringify(char.elements || {});
    const proficienciesJson = JSON.stringify(char.proficiencies || {});
    const saveRollsJson = JSON.stringify(char.saveRolls || {});
    const needsJson = JSON.stringify(char.needs || {});
    const vitalsJson = JSON.stringify(char.vitals || {});
    const fameJson = JSON.stringify(char.fame || {});
    const behaviorJson = JSON.stringify(char.behavior || {});
    const titleJson = JSON.stringify(char.title || {});
    const possibleEpithetsJson = JSON.stringify(char.possibleEpithets || []);
    const possibleRolesJson = JSON.stringify(char.possibleRoles || []);
    const actionSequenceJson = JSON.stringify(char.actionSequence || {});
    const informationsJson = JSON.stringify(char.informations || {});
    const skillsJson = JSON.stringify(char.skills || {});
    const activeSkillsJson = JSON.stringify(char.activeSkills || []);
    const conditionalSkillsJson = JSON.stringify(char.conditionalSkills || []);
    const conditionalSkillsConditionJson = JSON.stringify(char.conditionalSkillsCondition || {});
    const skillLearningProgressJson = JSON.stringify(char.skillLearningProgress || {});
    const breathingSkillsJson = JSON.stringify(char.breathingSkills || {});
    const breathingSkillsLearningProgressJson = JSON.stringify(char.breathingSkillsLearningProgress || {});
    const planarAptitudeJson = JSON.stringify(char.planarAptitude || {});
    const relationsJson = JSON.stringify(char.relations || {});
    const traitsJson = JSON.stringify(char.traits || []);
    const inventorySizeJson = JSON.stringify(char.inventorySize || { base: 20, bonus: 0 });
    const inventoryJson = JSON.stringify(char.inventory || {});
    const equipmentsJson = JSON.stringify(char.equipments || {});
    const materialResourcesJson = JSON.stringify(char.materialResources || {});

    // Use parameterized queries with proper JSON casting
    // Pass JSON strings as parameters and cast them in SQL
    const result = await db.execute(sql`
      INSERT INTO characters (
        id, user_id, party_id, name, gender, race, type, level, portrait, background,
        alignment, artisans, attribute, battle_stats, elements, proficiencies, save_rolls,
        needs, vitals, fame, behavior, title, possible_epithets, possible_roles,
        action_sequence, informations, skills, active_skills, conditional_skills,
        conditional_skills_condition, skill_learning_progress, breathing_skills,
        active_breathing_skill, breathing_skills_learning_progress, planar_aptitude,
        relations, traits, inventory_size, inventory, equipments, material_resources, stat_tracker, ab_guage,
        created_at, updated_at, created_by, updated_by
      ) VALUES (
        ${char.id}, ${char.userId}, ${char.partyID || null},
        ${String(char.name || '').substring(0, 255)}, ${String(char.gender || '').substring(0, 10)}, ${String(char.race || '').substring(0, 50)}, ${String(char.type || '').substring(0, 50)},
        ${char.level}, ${sql.raw(`'${portraitJson.replace(/'/g, "''")}'::jsonb`)}, ${String(char.background || '').substring(0, 100)},
        ${sql.raw(`'${alignmentJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${artisansJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${attributeJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${battleStatsJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${elementsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${proficienciesJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${saveRollsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${needsJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${vitalsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${fameJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${behaviorJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${titleJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${possibleEpithetsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${possibleRolesJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${actionSequenceJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${informationsJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${skillsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${activeSkillsJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${conditionalSkillsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${conditionalSkillsConditionJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${skillLearningProgressJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${breathingSkillsJson.replace(/'/g, "''")}'::jsonb`)},
        ${char.activeBreathingSkill ? String(char.activeBreathingSkill).substring(0, 50) : null}, ${sql.raw(`'${breathingSkillsLearningProgressJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${planarAptitudeJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${relationsJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${traitsJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${inventorySizeJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${inventoryJson.replace(/'/g, "''")}'::jsonb`)}, ${sql.raw(`'${equipmentsJson.replace(/'/g, "''")}'::jsonb`)},
        ${sql.raw(`'${materialResourcesJson.replace(/'/g, "''")}'::jsonb`)}, ${char.statTracker || 0}, ${char.abGuage || 0},
        NOW(), NOW(), ${String(char.createdBy || 'system').substring(0, 255)}, ${String(char.updatedBy || 'system').substring(0, 255)}
      ) RETURNING *
    `);
    
    const savedCharacter = result.rows[0] as any;
    
    if (!savedCharacter) {
      throw new Error("Failed to create character");
    }

    return { character: savedCharacter as InsertCharacter, id: savedCharacter.id as string };
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
    // Only select id to avoid issues with missing columns
    const [existing] = await db
      .select({ id: characters.id })
      .from(characters)
      .where(eq(characters.name, name))
      .limit(1);

    return !existing;
  }
}
