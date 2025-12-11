import type { Character } from "../Character/Character";
import type { NewsContext } from "../News/News";
import { Quest, QuestType, QuestStatus } from "./Quest";
import { QuestOffer } from "./QuestOffer";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { randomUUID } from "crypto";
import { QuestAvailabilityChecker } from "./QuestAvailabilityChecker";
import type { QuestDefinition } from "./QuestDefinition";

/**
 * Create a quest offer from a quest definition
 * Exported for use in guild handler and quest chain unlocking
 */
export function createQuestOfferFromDefinition(
  character: Character,
  questDef: QuestDefinition,
  context: NewsContext,
): QuestOffer {
  // Create Quest instance from definition
  const quest = new Quest({
    id: questDef.id, // Use definition ID
    name: questDef.name,
    description: questDef.description,
    type: questDef.type,
    tier: questDef.tier,
    objectives: questDef.objectives.map(obj => ({ ...obj, current: 0 })),
    rewards: questDef.rewards,
    status: QuestStatus.Available,
    giverId: questDef.giverId,
    locationId: questDef.giverLocation,
  });

  // Create quest offer
  const offeredAt = new Date();
  const expiresAt = new Date(offeredAt.getTime() + 6 * 60 * 60 * 1000); // 6 hours

  return new QuestOffer({
    id: randomUUID(),
    quest,
    offeredAt,
    expiresAt,
    criteria: {
      minLevel: questDef.prerequisites?.minLevel,
    },
    status: "pending",
    giverId: questDef.giverId,
    locationId: questDef.giverLocation,
  });
}

/**
 * Generate a procedural quest offer (fallback when no predefined quests available)
 */
function generateProceduralQuestOffer(
  character: Character,
  context: NewsContext,
): QuestOffer | null {
  // Check if character meets basic criteria
  // For now, generate a simple quest if character is at least level 1
  // In the future, this should check relationships, reputation, etc.

  // Check character level
  if (character.level < 1) {
    return null; // Character too low level
  }

  // Generate a quest based on character level and relationships
  const questTier = character.level >= 10 ? TierEnum.uncommon : TierEnum.common;
  
  // Simple quest generation - in the future, this should be more sophisticated
  const questTypes = [QuestType.Kill, QuestType.Collect, QuestType.Deliver];
  const selectedType = questTypes[Math.floor(Math.random() * questTypes.length)]!;

  let objectives: Array<{ type: QuestType; target: string; required: number; current: number }> = [];
  let rewards: { gold?: number; items?: Map<import("../Item/type").ItemId, number>; experience?: number } = {};

  // Generate objectives and rewards based on quest type
  if (selectedType === QuestType.Kill) {
    const targets = ["goblin", "orc", "bandit"];
    const target = targets[Math.floor(Math.random() * targets.length)]!;
    const required = character.level * 2 + Math.floor(Math.random() * 5);
    objectives.push({
      type: QuestType.Kill,
      target,
      required,
      current: 0,
    });
    rewards = {
      gold: required * 10,
      experience: required * 5,
    };
  } else if (selectedType === QuestType.Collect) {
    const items = ["ore", "herbs", "wood"];
    const item = items[Math.floor(Math.random() * items.length)]!;
    const required = character.level * 3 + Math.floor(Math.random() * 10);
    objectives.push({
      type: QuestType.Collect,
      target: item,
      required,
      current: 0,
    });
    rewards = {
      gold: required * 5,
      experience: required * 3,
    };
  } else if (selectedType === QuestType.Deliver) {
    // Delivery quests are simpler
    objectives.push({
      type: QuestType.Deliver,
      target: "package",
      required: 1,
      current: 0,
    });
    rewards = {
      gold: character.level * 20,
      experience: character.level * 10,
    };
  }

  const quest = new Quest({
    id: randomUUID(),
    name: {
      en: `${selectedType} Quest`,
      th: `เควส${selectedType}`,
    },
    description: {
      en: `A ${selectedType} quest from the Adventure Guild.`,
      th: `เควส${selectedType} จากกิลด์นักผจญภัย`,
    },
    type: selectedType,
    tier: questTier,
    objectives,
    rewards,
    status: QuestStatus.Available,
    locationId: context.location,
  });

  // Create quest offer with 6-hour expiration
  const offeredAt = new Date();
  const expiresAt = new Date(offeredAt.getTime() + 6 * 60 * 60 * 1000); // 6 hours

  const offer = new QuestOffer({
    id: randomUUID(),
    quest,
    offeredAt,
    expiresAt,
    criteria: {
      minLevel: 1, // Basic requirement
    },
    status: "pending",
    locationId: context.location,
  });

  return offer;
}

/**
 * Generate a quest offer for a character based on their relationships, level, and reputation
 * Returns null if no quest can be generated (criteria not met)
 * 
 * @param character - The character to generate quest for
 * @param context - News context for the quest
 * @param giverId - Optional: specific NPC giver ID to check for predefined quests
 */
export function generateQuestOffer(
  character: Character,
  context: NewsContext,
  giverId?: string, // Optional: specific NPC giver
): QuestOffer | null {
  // 1. If giverId provided, check for predefined quests first
  if (giverId) {
    const availablePredefined = QuestAvailabilityChecker.getAvailableQuests(
      character,
      giverId,
    );

    if (availablePredefined.length > 0) {
      // Select random available predefined quest
      const selected = availablePredefined[
        character.roll({ amount: 1, face: availablePredefined.length, applyBlessCurse: false }) - 1
      ]!;

      return createQuestOfferFromDefinition(character, selected, context);
    }
  }

  // 2. Fall back to procedural generation (existing logic)
  return generateProceduralQuestOffer(character, context);
}

