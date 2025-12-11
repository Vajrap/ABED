import type { L10N } from "../../InterFacesEnumsAndTypes/L10N";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { ItemId } from "../Item/type";
import { GoldId } from "../Item";

/**
 * Quest status
 */
export enum QuestStatus {
  Available = "available",
  Active = "active",
  Completed = "completed",
  Failed = "failed",
}

/**
 * Quest types
 */
export enum QuestType {
  Kill = "kill",
  Collect = "collect",
  Deliver = "deliver",
  Explore = "explore",
}

/**
 * Quest objective
 */
export interface QuestObjective {
  type: QuestType;
  target: string; // Target ID (NPC/enemy type, item ID, location ID, etc.)
  required: number; // Required amount
  current: number; // Current progress
}

/**
 * Quest reward
 */
export interface QuestReward {
  gold?: number;
  items?: Map<ItemId, number>;
  experience?: number;
  reputation?: { subRegion: string; amount: number };
}

/**
 * Basic Quest class
 */
export class Quest {
  id: string;
  name: L10N;
  description: L10N;
  type: QuestType;
  tier: TierEnum;
  objectives: QuestObjective[];
  rewards: QuestReward;
  status: QuestStatus;
  giverId?: string; // NPC/character ID who gave the quest
  locationId?: string; // Location where quest can be accepted/turned in

  constructor(data: {
    id: string;
    name: L10N;
    description: L10N;
    type: QuestType;
    tier: TierEnum;
    objectives: QuestObjective[];
    rewards: QuestReward;
    status?: QuestStatus;
    giverId?: string;
    locationId?: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.type = data.type;
    this.tier = data.tier;
    this.objectives = data.objectives;
    this.rewards = data.rewards;
    this.status = data.status ?? QuestStatus.Available;
    this.giverId = data.giverId;
    this.locationId = data.locationId;
  }

  /**
   * Check if all objectives are complete
   */
  isComplete(): boolean {
    return this.objectives.every(obj => obj.current >= obj.required);
  }

  /**
   * Update objective progress
   */
  updateObjective(type: QuestType, target: string, amount: number): void {
    const objective = this.objectives.find(obj => obj.type === type && obj.target === target);
    if (objective) {
      objective.current = Math.min(objective.current + amount, objective.required);
    }
  }
}

