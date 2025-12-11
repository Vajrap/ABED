import type { L10N } from "../../InterFacesEnumsAndTypes/L10N";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { ItemId } from "../Item/type";
import { QuestType, type QuestObjective } from "./Quest";
import type { QuestReward } from "./Quest";

/**
 * Quest Prerequisites
 */
export interface QuestPrerequisites {
  minLevel?: number;
  completedQuests?: string[]; // Quest IDs that must be completed first
  minReputation?: Record<string, number>; // SubRegion -> min reputation (using Record instead of Map for JSON serialization)
  minRelationship?: Record<string, number>; // NPC ID -> min relationship (using Record instead of Map)
  requiredItems?: Record<string, number>; // ItemId -> quantity (using Record instead of Map)
}

/**
 * Quest Time Limit
 */
export interface QuestTimeLimit {
  type: "gameTime" | "realTime";
  duration: number; // Phases/days or real hours
}

/**
 * Quest Definition
 * Template for predefined quests (similar to NPC templates)
 */
export interface QuestDefinition {
  id: string; // Unique quest ID (e.g., "wayward_inn_innkeeper_intro")
  name: L10N;
  description: L10N;
  type: QuestType;
  tier: TierEnum;
  
  // Quest Giver
  giverId: string; // NPC ID who gives this quest
  giverLocation: LocationsEnum; // Where quest is available
  
  // Prerequisites
  prerequisites?: QuestPrerequisites;
  
  // Objectives (fixed, not procedural)
  objectives: QuestObjective[];
  
  // Rewards (fixed, not procedural)
  rewards: QuestReward;
  
  // Quest Chain Support
  isChainQuest?: boolean;
  chainId?: string; // Group ID for quest chain (e.g., "epic_wayward_inn")
  chainOrder?: number; // Order in chain (1, 2, 3...)
  unlocksQuests?: string[]; // Quest IDs unlocked when this completes
  
  // One-Time Quest Support
  isOneTimeOnly?: boolean; // If true, character can only complete once
  
  // Repeatable Quest Support
  isRepeatable?: boolean;
  cooldownDays?: number; // Game days before quest can be taken again
  
  // Time Limits
  timeLimit?: QuestTimeLimit;
}

