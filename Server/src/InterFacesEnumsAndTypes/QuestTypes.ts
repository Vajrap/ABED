import type { L10N } from "./L10N";
import type { Quest, QuestObjective } from "../Entity/Quest/Quest";

/**
 * Quest State Payload for WebSocket communication
 */
export interface QuestStatePayload {
  type: "QUEST_STATE_UPDATE";
  data: {
    activeQuests: Array<{
      id: string;
      name: L10N;
      objectives: QuestObjective[];
    }>;
    questOffers: Array<{
      id: string;
      quest: Quest;
      expiresAt: Date;
      status: QuestOfferStatus;
    }>;
  };
}

/**
 * Quest Offer Status (re-exported for convenience)
 */
export type QuestOfferStatus = "pending" | "accepted" | "expired" | "declined";

