/**
 * Seed Script for NPCs (Non-Player Characters)
 * 
 * This script creates initial NPCs based on templates defined in code.
 * It's idempotent - running it multiple times won't create duplicates.
 * 
 * Usage:
 *   bun run scripts/seed-npcs.ts
 * 
 * To seed specific location:
 *   bun run scripts/seed-npcs.ts --location=WaywardInn
 */

import { eq, } from "drizzle-orm";
import dotenv from "dotenv";
import { createHash } from "crypto";
import { db } from "../src/Database/connection";
import { characters, npcMemory } from "../src/Database/Schema";
import { Character } from "../src/Entity/Character/Character";
import { CharacterAlignment } from "../src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterArtisans } from "../src/Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterAttributes } from "../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { CharacterBattleStats } from "../src/Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterProficiencies } from "../src/Entity/Character/Subclass/Stats/CharacterProficiencies";
import { CharacterElements } from "../src/Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterNeeds } from "../src/Entity/Character/Subclass/Needs/CharacterNeeds";
import { CharacterVitals } from "../src/Entity/Character/Subclass/Vitals/CharacterVitals";
import { CharacterFame } from "../src/Entity/Character/Subclass/Fame/CharacterFame";
import { defaultActionSequence } from "../src/Entity/Character/Subclass/Action/CharacterAction";
import { CharacterType, RaceEnum } from "../src/InterFacesEnumsAndTypes/Enums";
import { LocationsEnum } from "../src/InterFacesEnumsAndTypes/Enums/Location";
import {
  getNPCTemplatesForLocation,
  type NPCTemplate,
} from "../src/Entity/Character/NPCs/definitions";
import Report from "../src/Utils/Reporter";
import type { InsertCharacter } from "../src/Database/Schema";
import { racesBonus } from "../src/API/characterCreation/races";
import { addBaseVitals } from "../src/Entity/Character/Subclass/Vitals/addBaseVitals";
import { activeEpithet, activeRole } from "../src/Entity/Character/Subclass/Title/logics/active";
import { equip } from "../src/Utils/equip";
import { makeAttribute, makeProficiencies } from "../src/Entity/Character/MOBs/helpers";

dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

/**
 * Generate a deterministic UUID from a string (template ID)
 * Uses SHA-256 hash to create a consistent UUID v4-like format
 * This ensures the same template ID always generates the same UUID
 */
function generateDeterministicUUID(input: string): string {
  // Create a namespace UUID for NPCs (arbitrary but consistent)
  const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // NPC namespace
  
  // Hash the namespace + input
  const hash = createHash("sha256")
    .update(namespace + input)
    .digest("hex");
  
  // Format as UUID v4 (but deterministic)
  // Take first 32 hex chars and format as UUID
  const hex = hash.substring(0, 32);
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    "4" + hex.substring(13, 16), // Version 4
    ((parseInt(hex.substring(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0") + hex.substring(18, 20), // Variant bits
    hex.substring(20, 32),
  ].join("-");
}

/**
 * Convert Character to InsertCharacter format
 * (Similar to CharacterService.characterToInsertCharacter but public)
 */
function convertCharacterToInsert(character: Character): InsertCharacter {
  const insertData: any = {
    id: character.id,
    userId: character.userId, // Can be null for NPCs
    partyID: character.partyID,
    location: character.location,
    name: String(character.name?.en || character.name || '').substring(0, 255),
    gender: String(character.gender || '').substring(0, 10),
    race: String(character.race || '').substring(0, 50),
    type: String(character.type || 'humanoid').substring(0, 50),
    level: character.level,
    portrait: character.portrait,
    background: String(character.background || '').substring(0, 100),
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
    skills: character.skills as any,
    activeSkills: character.activeSkills as any,
    conditionalSkills: character.conditionalSkills as any,
    conditionalSkillsCondition: character.conditionalSkillsCondition as any,
    skillLearningProgress: character.skillLearningProgress as any,
    breathingSkills: character.breathingSkills as any,
    activeBreathingSkill: character.activeBreathingSkill ? String(character.activeBreathingSkill).substring(0, 50) : null,
    breathingSkillsLearningProgress: character.breathingSkillsLearningProgress as any,
    planarAptitude: character.planarAptitude as any,
    relations: character.relations as any,
    traits: character.traits as any,
    inventorySize: character.inventorySize as any,
    inventory: character.inventory as any,
    equipments: character.equipments as any,
    statTracker: character.statTracker,
    abGuage: character.abGauge,
    createdBy: "system".substring(0, 255),
    updatedBy: "system".substring(0, 255),
  };
  
  return insertData as InsertCharacter;
}

/**
 * Create a Character entity from an NPC template
 * This creates a full-featured character with all systems initialized
 */
function createNPCFromTemplate(template: NPCTemplate): Character {
  // Get race bonuses (cast to PlayableRaceEnum since template uses RaceEnum)
  // RaceEnum and PlayableRaceEnum should have same values for Human, Elven, Orc
  const raceDef = racesBonus[template.race as unknown as keyof typeof racesBonus];
  if (!raceDef) {
    throw new Error(`Race definition not found for: ${template.race}`);
  }

  // Build attributes: Start with base 7, apply race mods, then template mods
  const attributeData: any = {
    charisma: 7,
    luck: 7,
    intelligence: 7,
    leadership: 7,
    vitality: 7,
    willpower: 7,
    planar: 7,
    control: 7,
    dexterity: 7,
    agility: 7,
    strength: 7,
    endurance: 7,
  };

  // Apply race attribute bonuses
  attributeData[raceDef.attributes.three] += 3;
  attributeData[raceDef.attributes.two] += 2;
  attributeData[raceDef.attributes.one] += 1;

  // Apply template attribute modifications
  if (template.attributeMods) {
    for (const [key, value] of Object.entries(template.attributeMods)) {
      if (value !== undefined) {
        attributeData[key] += value;
      }
    }
  }

  // Build artisans: Start with base 7, apply template mods
  const artisanData: any = {
    blacksmith: 7,
    tailor: 7,
    alchemist: 7,
    enchanter: 7,
    jeweler: 7,
    carpenter: 7,
    leatherworker: 7,
    scribe: 7,
  };

  if (template.artisanMods) {
    for (const [key, value] of Object.entries(template.artisanMods)) {
      if (value !== undefined) {
        artisanData[key] += value;
      }
    }
  }

  // Generate deterministic UUID from template ID
  const npcId = generateDeterministicUUID(template.id);
  
  // Create character with all systems
  const character = new Character({
    id: npcId,
    name: template.name,
    type: CharacterType.humanoid,
    gender: template.gender,
    level: template.level,
    portrait: template.portraitData || undefined,
    background: template.background || undefined,
    race: template.race as RaceEnum,
    alignment: new CharacterAlignment(template.alignment || {}),
    artisans: new CharacterArtisans(artisanData),
    attribute: makeAttribute(attributeData),
    battleStats: new CharacterBattleStats(),
    proficiencies: template.proficiencies
      ? makeProficiencies(template.proficiencies)
      : new CharacterProficiencies(),
    elements: new CharacterElements(),
    needs: new CharacterNeeds(),
    vitals: new CharacterVitals({}),
    fame: new CharacterFame(),
    saveRolls: new CharacterAttributes(),
    actionSequence: defaultActionSequence(),
  });

  // Set location and userId (null for NPCs)
  character.location = template.location;
  character.userId = null;

  // Set race-based vitals
  character.planarAptitude.aptitude = template.planarAptitude ?? raceDef.planarAptitude;
  
  // Set vitals from template or use defaults
  if (template.vitals) {
    if (template.vitals.hp?.base !== undefined) {
      character.vitals.hp.setBase(template.vitals.hp.base);
    } else {
      character.vitals.hp.setBase(raceDef.baseHP);
    }
    if (template.vitals.mp?.base !== undefined) {
      character.vitals.mp.setBase(template.vitals.mp.base);
    } else {
      character.vitals.mp.setBase(raceDef.baseMP);
    }
    if (template.vitals.sp?.base !== undefined) {
      character.vitals.sp.setBase(template.vitals.sp.base);
    } else {
      character.vitals.sp.setBase(raceDef.baseSP);
    }
    
    // Set current values
    character.vitals.hp.current = template.vitals.hp?.current ?? character.vitals.hp.base;
    character.vitals.mp.current = template.vitals.mp?.current ?? character.vitals.mp.base;
    character.vitals.sp.current = template.vitals.sp?.current ?? character.vitals.sp.base;
  } else {
    // Use race defaults and calculate from attributes
    character.vitals.hp.setBase(raceDef.baseHP);
    character.vitals.mp.setBase(raceDef.baseMP);
    character.vitals.sp.setBase(raceDef.baseSP);
    // Add base vitals from attributes (this calculates bonuses from vitality/planar/endurance)
    addBaseVitals(character);
    // Set current to base
    character.vitals.hp.current = character.vitals.hp.base;
    character.vitals.mp.current = character.vitals.mp.base;
    character.vitals.sp.current = character.vitals.sp.base;
  }

  // Add title epithets and roles
  if (template.possibleEpithets) {
    for (const epithet of template.possibleEpithets) {
      character.addEpithet(epithet);
    }
  }
  if (template.possibleRoles) {
    for (const role of template.possibleRoles) {
      character.addRole(role);
    }
  }

  // Set active title
  if (template.title?.epithet) {
    activeEpithet(character, template.title.epithet);
  }
  if (template.title?.role) {
    activeRole(character, template.title.role);
  }

  // Add active skills
  if (template.activeSkills) {
    for (const skill of template.activeSkills) {
      character.activeSkills.push({
        id: skill.id,
        level: skill.level,
        exp: skill.exp ?? 0,
      });
    }
  }

  // Add relations with other NPCs
  if (template.relations) {
    for (const relation of template.relations) {
      character.relations.set(relation.npcId, {
        value: relation.value,
        status: (relation.status || "neutral") as unknown as any,
      } as any);
    }
  }

  // Add traits
  if (template.traits) {
    for (const trait of template.traits) {
      character.traits.set(trait.trait as any, trait.value);
    }
  }

  // Add starting equipment
  if (template.startingEquipment) {
    for (const equipment of template.startingEquipment) {
      // Add to inventory first if not already there
      const currentQuantity = character.inventory.get(equipment.equipmentId) || 0;
      character.inventory.set(equipment.equipmentId, currentQuantity + 1);
      // Equip it
      try {
        const equipped = equip(character, equipment.equipmentId, equipment.slot);
        if (!equipped) {
          Report.warn(`Failed to equip ${equipment.equipmentId} to ${equipment.slot} for NPC ${template.id}`);
        }
      } catch (error) {
        Report.warn(`Error equipping ${equipment.equipmentId} to ${equipment.slot} for NPC ${template.id}`, { error });
      }
    }
  }

  // Add starting inventory
  if (template.startingInventory) {
    for (const item of template.startingInventory) {
      const currentQuantity = character.inventory.get(item.itemId) || 0;
      character.inventory.set(item.itemId, currentQuantity + item.quantity);
    }
  }

  return character;
}

/**
 * Seed NPCs for a specific location
 */
async function seedNPCsForLocation(location: LocationsEnum): Promise<{ created: number; skipped: number }> {
  const templates = getNPCTemplatesForLocation(location);
  let created = 0;
  let skipped = 0;

  for (const template of templates) {
    try {
      // Generate deterministic UUID from template ID
      const npcId = generateDeterministicUUID(template.id);
      
      // Check if NPC already exists
      const existing = await db
        .select()
        .from(characters)
        .where(eq(characters.id, npcId))
        .limit(1);

      if (existing.length > 0) {
        Report.debug(`NPC ${template.id} already exists, skipping`);
        skipped++;
        continue;
      }

      // Check if memory record exists (shouldn't happen if character doesn't exist, but check anyway)
      const existingMemory = await db
        .select()
        .from(npcMemory)
        .where(eq(npcMemory.npcId, npcId))
        .limit(1);

      if (existingMemory.length > 0) {
        Report.warn(`NPC memory record already exists for ${template.id}, this shouldn't happen if character doesn't exist`);
      }

      // Create NPC character
      const npc = createNPCFromTemplate(template);
      
      // Ensure userId is null for NPCs
      npc.userId = null;

      // Convert to database format using a helper function
      // Note: characterToInsertCharacter is private, so we'll create our own version
      const insertData = convertCharacterToInsert(npc);

      // Insert character into database
      await db.insert(characters).values(insertData);

      // Create NPC memory record (prompt and known news)
      const memoryData = {
        npcId: npc.id,
        personalPrompt: template.characterPrompt || null,
        knownNews: template.initialKnownNews || [],
      };

      await db.insert(npcMemory).values(memoryData);

      Report.info(`✅ Created NPC: ${template.name.en} (${template.id}) at ${location}`);
      Report.debug(`   Prompt: ${template.characterPrompt ? 'Yes' : 'No'}, Known News: ${(template.initialKnownNews || []).length}`);
      created++;
    } catch (error) {
      Report.error(`❌ Failed to create NPC ${template.id}:`, {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }

  return { created, skipped };
}

/**
 * Main seeding function
 */
async function seedNPCs() {
  console.log("🌱 Starting NPC seeding...\n");

  // Get location from command line args if provided
  const locationArg = process.argv.find((arg) => arg.startsWith("--location="));
  const targetLocation = locationArg
    ? (locationArg.split("=")[1] as LocationsEnum)
    : null;

  try {
    if (targetLocation) {
      // Seed specific location
      console.log(`📍 Seeding NPCs for location: ${targetLocation}`);
      const result = await seedNPCsForLocation(targetLocation);
      console.log(`\n✅ Created: ${result.created}, Skipped: ${result.skipped}`);
    } else {
      // Seed all locations
      console.log("📍 Seeding NPCs for all locations...\n");
      const locations = Object.values(LocationsEnum);
      let totalCreated = 0;
      let totalSkipped = 0;

      for (const location of locations) {
        console.log(`\n📍 Location: ${location}`);
        const result = await seedNPCsForLocation(location);
        totalCreated += result.created;
        totalSkipped += result.skipped;
      }

      console.log(`\n🎉 Seeding complete!`);
      console.log(`✅ Total created: ${totalCreated}`);
      console.log(`⏭️  Total skipped: ${totalSkipped}`);
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seed script
seedNPCs().catch(console.error);

