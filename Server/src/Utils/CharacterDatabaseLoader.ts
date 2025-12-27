import { db } from "../Database/connection";
import { characters } from "../Database/Schema/character";
import { sql } from "drizzle-orm";
import { characterManager } from "../Game/CharacterManager";
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
import { CharacterBehavior } from "../Entity/Character/Subclass/Behavior/CharacterBehavior";
import { CharacterTitle } from "../Entity/Character/Subclass/Title/Title";
import { defaultActionSequence } from "../Entity/Character/Subclass/Action/CharacterAction";
import { DeckCondition } from "../Entity/Character/Subclass/DeckCondition/DeckCondition";
import { L10N } from "../InterFacesEnumsAndTypes/L10N";
import { CharacterType } from "../InterFacesEnumsAndTypes/Enums";
import { LocationsEnum } from "../InterFacesEnumsAndTypes/Enums/Location";
import Report from "./Reporter";
import { SkillId } from "src/Entity/Skill/enums";
import { TraitEnum } from "src/Entity/Trait/enum";
import { PortraitData } from "src/InterFacesEnumsAndTypes/PortraitData";

/**
 * Load all characters from database into CharacterManager
 * Also syncs location from party if character location is missing
 */
export async function loadCharactersFromDatabase(): Promise<void> {
  try {
    // Use raw SQL to handle migration period where location column might not exist
    let characterRecords;
    try {
      characterRecords = await db.select().from(characters);
    } catch (error: any) {
      // If location column doesn't exist yet, use raw SQL without it
      if (error?.code === "42703" && error?.message?.includes("location")) {
        Report.warn("Location column not found, using fallback query. Migration may need to run.");
        const result = await db.execute(sql`
          SELECT "id", "user_id", "party_id", "name", "gender", "race", "type", "level", "portrait", "background", 
                 "alignment", "artisans", "attribute", "battle_stats", "elements", "proficiencies", "save_rolls", 
                 "needs", "vitals", "fame", "behavior", "title", "possible_epithets", "possible_roles", 
                 "action_sequence", "informations", "skills", "active_skills", "conditional_skills", 
                 "conditional_skills_condition", "skill_learning_progress", "breathing_skills", 
                 "active_breathing_skill", "breathing_skills_learning_progress", "planar_aptitude", 
                 "relations", "traits", "inventory_size", "inventory", "equipments", "stat_tracker", 
                 "ab_guage", "created_at", "updated_at", "created_by", "updated_by"
          FROM "characters"
        `);
        // Map snake_case to camelCase to match Drizzle schema expectations
        characterRecords = result.rows.map((row: any) => ({
          ...row,
          userId: row.user_id,
          partyID: row.party_id,
          battleStats: row.battle_stats,
          saveRolls: row.save_rolls,
          possibleEpithets: row.possible_epithets,
          possibleRoles: row.possible_roles,
          actionSequence: row.action_sequence,
          activeSkills: row.active_skills,
          conditionalSkills: row.conditional_skills,
          conditionalSkillsCondition: row.conditional_skills_condition,
          skillLearningProgress: row.skill_learning_progress,
          breathingSkills: row.breathing_skills,
          activeBreathingSkill: row.active_breathing_skill,
          breathingSkillsLearningProgress: row.breathing_skills_learning_progress,
          planarAptitude: row.planar_aptitude,
          inventorySize: row.inventory_size,
          statTracker: row.stat_tracker,
          abGuage: row.ab_guage,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          createdBy: row.created_by,
          updatedBy: row.updated_by,
        })) as any[];
      } else {
        throw error;
      }
    }
    
    Report.info(`Loading ${characterRecords.length} characters from database...`);
    
    if (characterRecords.length === 0) {
      Report.warn("⚠️  No characters found in database!");
      return;
    }
    
    // First pass: Load all characters
    let loadedCount = 0;
    let failedCount = 0;
    for (const record of characterRecords) {
      try {
        const character = restoreCharacterFromDatabase(record);
        characterManager.addCharacter(character);
        loadedCount++;
        Report.info(`✓ Loaded character: ${character.id} | userId: ${character.userId} | name: ${typeof character.name === 'string' ? character.name : character.name.en || 'unknown'}`);
      } catch (error) {
        failedCount++;
        Report.error(`✗ Failed to load character ${record.id}`, { 
          error, 
          recordId: record.id,
          userId: (record as any).userId,
          errorMessage: error instanceof Error ? error.message : String(error)
        });
        // Continue loading other characters even if one fails
      }
    }
    
    Report.info(`✅ Character loading complete: ${loadedCount} loaded, ${failedCount} failed, ${characterManager.characters.length} total in manager`);
    
    // Log all userIds in manager for debugging
    const userIds = characterManager.characters.map(c => c.userId).filter(Boolean);
    Report.info(`📋 Characters in manager with userIds: ${userIds.length}`, { userIds });
    
    // Second pass: Sync location from party if character location is missing
    // Import here to avoid circular dependencies
    const { partyManager } = await import("../Game/PartyManager");
    for (const character of characterManager.characters) {
      if (!character.location && character.partyID) {
        try {
          const party = partyManager.getPartyByID(character.partyID);
          if (party && party.location) {
            character.location = party.location as LocationsEnum;
            Report.debug(`Synced location from party for character ${character.id}: ${party.location}`);
          }
        } catch (error) {
          // Party might not be loaded yet, that's okay - will sync later
          Report.debug(`Party not found for character ${character.id}, location sync deferred`);
        }
      }
      
      // If still no location and this is a player character, default to WaywardInn
      if (!character.location && character.userId) {
        character.location = LocationsEnum.WaywardInn;
        Report.debug(`Set default location (WaywardInn) for character ${character.id}`);
      }
    }
    
    Report.info(`✅ Successfully loaded ${characterManager.characters.length} characters into CharacterManager`);
  } catch (error) {
    Report.error("❌ Error loading characters from database", { error });
    throw error;
  }
}

/**
 * Restore a Character entity from a database record
 */
function restoreCharacterFromDatabase(record: typeof characters.$inferSelect): Character {
  // Restore complex objects from JSONB
  const alignment = new CharacterAlignment(record.alignment as any || {});
  const artisans = new CharacterArtisans(record.artisans as any || {});
  const attribute = new CharacterAttributes(record.attribute as any || {});
  const battleStats = new CharacterBattleStats(record.battleStats as any || {});
  const elements = new CharacterElements(record.elements as any || {});
  const proficiencies = new CharacterProficiencies(record.proficiencies as any || {});
  const saveRolls = new CharacterAttributes(record.saveRolls as any || {});
  const needs = new CharacterNeeds(record.needs as any || {});
  const vitals = new CharacterVitals(record.vitals as any || {});
  const fame = new CharacterFame(record.fame as any || {});
  const behavior = new CharacterBehavior(record.behavior as any || {});
  // Title will be restored below (moved after character creation to access it properly)
  const actionSequence = record.actionSequence as any || defaultActionSequence();

  // Restore L10N name (database stores as string, convert to L10N)
  const name: L10N = typeof record.name === 'string'
    ? { en: record.name, th: record.name }
    : record.name as L10N;

  // Restore title - handle both object format {role, epithet} and separate params
  let title: CharacterTitle;
  if (record.title && typeof record.title === 'object') {
    const titleData = record.title as any;
    // If it's an object with role/epithet properties, use them
    if ('role' in titleData || 'epithet' in titleData) {
      title = new CharacterTitle(
        titleData.epithet as any,
        titleData.role as any
      );
    } else {
      title = new CharacterTitle();
    }
  } else {
    title = new CharacterTitle();
  }

  // Create character
  const character = new Character({
    id: record.id,
    name,
    type: (record.type as CharacterType) || CharacterType.humanoid,
    gender: record.gender as "MALE" | "FEMALE" | "NONE",
    level: record.level,
    portrait: record.portrait as PortraitData || undefined,
    background: record.background || undefined,
    alignment,
    artisans,
    attribute,
    battleStats,
    proficiencies,
    saveRolls,
    elements,
    needs,
    vitals,
    fame,
    actionSequence,
    createdAt: record.createdAt ? new Date(record.createdAt) : new Date(),
    updatedAt: record.updatedAt ? new Date(record.updatedAt) : new Date(),
    createdBy: record.createdBy || "system",
    updatedBy: record.updatedBy || "system",
  });

  // Set user, party IDs, location, race, and title (not in constructor)
  character.userId = record.userId;
  character.partyID = record.partyID || null;
  character.originalNPCPartyID = ((record as any).originalNPCPartyID as string | undefined) || null;
  character.location = ((record as any).location as LocationsEnum | undefined) || null;
  character.race = (record.race as any) || ""; // Restore race from database
  // Note: characterPrompt is stored in DB but not loaded into Character entity yet
  // This can be added to Character entity later if needed for runtime access
  character.title = title; // Use the restored title

  // Restore skills (database stores as JSONB, convert to Map)
  if (record.skills) {
    // Skills loaded from database
    const skillsData = record.skills as any;
    if (typeof skillsData === 'object' && !Array.isArray(skillsData)) {
      for (const [skillId, skillData] of Object.entries(skillsData)) {
        character.skills.set(skillId as SkillId, skillData as any);
      }
    }
  }

  // Restore active skills and conditional skills (database stores as arrays)
  // Handle migration from old format (objects) to new format (IDs)
  if (record.activeSkills && Array.isArray(record.activeSkills)) {
    if (record.activeSkills.length > 0) {
      // Check if old format (objects with id, level, exp) or new format (strings/IDs)
      const firstItem = record.activeSkills[0];
      if (typeof firstItem === 'object' && firstItem !== null && 'id' in firstItem) {
        // Old format: extract IDs and add to skills Map
        const skillIds: SkillId[] = [];
        for (const skillObj of record.activeSkills) {
          const skillId = (skillObj as any).id as SkillId;
          const level = (skillObj as any).level ?? 1;
          const exp = (skillObj as any).exp ?? 0;
          
          // Add to skills Map if not already present
          if (!character.skills.has(skillId)) {
            character.skills.set(skillId, { id: skillId, level, exp });
          }
          skillIds.push(skillId);
        }
        character.activeSkills = skillIds;
      } else {
        // New format: array of IDs
        const skillIds = record.activeSkills as SkillId[];
        // Ensure all skills in deck are also in skills Map
        for (const skillId of skillIds) {
          if (!character.skills.has(skillId)) {
            // If skill is in deck but not in skills Map, add it with default values
            character.skills.set(skillId, { id: skillId, level: 1, exp: 0 });
          }
        }
        character.activeSkills = skillIds;
      }
    } else {
      character.activeSkills = [];
    }
  }
  
  if (record.conditionalSkills && Array.isArray(record.conditionalSkills)) {
    if (record.conditionalSkills.length > 0) {
      // Check if old format (objects with id, level, exp) or new format (strings/IDs)
      const firstItem = record.conditionalSkills[0];
      if (typeof firstItem === 'object' && firstItem !== null && 'id' in firstItem) {
        // Old format: extract IDs and add to skills Map
        const skillIds: SkillId[] = [];
        for (const skillObj of record.conditionalSkills) {
          const skillId = (skillObj as any).id as SkillId;
          const level = (skillObj as any).level ?? 1;
          const exp = (skillObj as any).exp ?? 0;
          
          // Add to skills Map if not already present
          if (!character.skills.has(skillId)) {
            character.skills.set(skillId, { id: skillId, level, exp });
          }
          skillIds.push(skillId);
        }
        character.conditionalSkills = skillIds;
      } else {
        // New format: array of IDs
        const skillIds = record.conditionalSkills as SkillId[];
        // Ensure all skills in deck are also in skills Map
        for (const skillId of skillIds) {
          if (!character.skills.has(skillId)) {
            // If skill is in deck but not in skills Map, add it with default values
            character.skills.set(skillId, { id: skillId, level: 1, exp: 0 });
          }
        }
        character.conditionalSkills = skillIds;
      }
    } else {
      character.conditionalSkills = [];
    }
  }

  // Restore conditional skills condition
  if (record.conditionalSkillsCondition) {
    character.conditionalSkillsCondition = new DeckCondition(record.conditionalSkillsCondition as any);
  }

  // Restore other optional fields
  character.possibleEpithets = (record.possibleEpithets as any[]) || [];
  character.possibleRoles = (record.possibleRoles as any[]) || [];
  character.information = (record.informations as Record<string, number>) || {};
  character.traits = (record.traits as Map<TraitEnum, number>) || new Map();
  
  // Restore planar aptitude (if stored as object with aptitude property)
  if (record.planarAptitude) {
    const planarData = record.planarAptitude as any;
    if (typeof planarData === 'object' && 'aptitude' in planarData) {
      character.planarAptitude.aptitude = planarData.aptitude;
    } else if (typeof planarData === 'number') {
      character.planarAptitude.aptitude = planarData;
    }
  }

  // Restore inventory (database stores as JSONB)
  if (record.inventory) {
    const inventoryData = record.inventory as any;
    if (typeof inventoryData === 'object' && !Array.isArray(inventoryData)) {
      for (const [itemId, quantity] of Object.entries(inventoryData)) {
        character.inventory.set(itemId, quantity as number);
      }
    }
  }

  // Restore inventory size
  if (record.inventorySize) {
    character.inventorySize = record.inventorySize as any;
  }

  // Restore equipment (database stores as JSONB)
  if (record.equipments) {
    character.equipments = record.equipments as any;
  }

  // Restore resources (database stores as JSONB)
  if ((record as any).material_resources) {
    const resourcesData = (record as any).material_resources as any;
    if (typeof resourcesData === 'object' && !Array.isArray(resourcesData)) {
      for (const [resourceType, amount] of Object.entries(resourcesData)) {
        character.materialResources.set(resourceType as any, amount as number);
      }
    }
  }

  // Restore relations (database stores as JSONB)
  if (record.relations) {
    character.relations = record.relations as any;
  }

  // Mark as player if it has a userId
  character.isPlayer = !!character.userId;

  return character;
}

