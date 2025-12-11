import type { Quest } from "./Quest";

/**
 * Quest Offer Criteria
 */
export interface QuestOfferCriteria {
  minRelationship?: Map<string, number>; // NPC ID -> min relationship value
  minLevel?: number;
  minReputation?: Map<string, number>; // SubRegion -> min reputation
  requiredQuests?: string[]; // Quest IDs that must be completed
}

/**
 * Quest Offer Status
 */
export type QuestOfferStatus = "pending" | "accepted" | "expired" | "declined";

/**
 * Quest Offer class
 * Represents a quest that has been offered to a character but not yet accepted
 */
export class QuestOffer {
  id: string;
  quest: Quest;
  offeredAt: Date; // Real time when quest was offered
  expiresAt: Date; // 6 hours after offeredAt (real time)
  criteria: QuestOfferCriteria;
  status: QuestOfferStatus;
  giverId?: string; // NPC who offered the quest
  locationId?: string; // Location where quest was offered

  constructor(data: {
    id: string;
    quest: Quest;
    offeredAt: Date;
    expiresAt: Date;
    criteria?: QuestOfferCriteria;
    status?: QuestOfferStatus;
    giverId?: string;
    locationId?: string;
  }) {
    this.id = data.id;
    this.quest = data.quest;
    this.offeredAt = data.offeredAt;
    this.expiresAt = data.expiresAt;
    this.criteria = data.criteria || {};
    this.status = data.status || "pending";
    this.giverId = data.giverId;
    this.locationId = data.locationId;
  }

  /**
   * Check if the offer has expired (6 real hours)
   */
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * Check if the offer can still be accepted
   */
  canAccept(): boolean {
    return this.status === "pending" && !this.isExpired();
  }
}

