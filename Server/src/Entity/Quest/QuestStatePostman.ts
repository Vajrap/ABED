import { connectionManager } from "../Connection/connectionManager";
import type { Character } from "../Character/Character";
import type { QuestStatePayload } from "../../InterFacesEnumsAndTypes/QuestTypes";
import Report from "../../Utils/Reporter";

/**
 * Quest State Postman
 * Sends quest state updates via WebSocket to connected clients
 */
class QuestStatePostman {
  /**
   * Send quest state to a specific user
   */
  sendQuestStateToUser(userId: string, character: Character): void {
    try {
      const connection = connectionManager.getConnectionByUserId(userId);
      if (!connection) {
        return; // User not connected
      }

      const questState: QuestStatePayload = {
        type: "QUEST_STATE_UPDATE",
        data: {
          activeQuests: Array.from(character.quests.active.values()).map((quest) => ({
            id: quest.id,
            name: quest.name,
            objectives: quest.objectives,
          })),
          questOffers: Array.from(character.questOffers.values())
            .filter((offer) => offer.status === "pending" && !offer.isExpired())
            .map((offer) => ({
              id: offer.id,
              quest: offer.quest,
              expiresAt: offer.expiresAt,
              status: offer.status,
            })),
        },
      };

      const payload = JSON.stringify(questState);
      connection.ws.send(payload);
    } catch (error) {
      Report.error("Error sending quest state to user", {
        userId,
        characterId: character.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Send quest state update to all connected users for a character
   */
  sendQuestStateUpdate(character: Character): void {
    // Find user ID from character
    if (!character.userId) {
      return; // NPC or no user associated
    }

    this.sendQuestStateToUser(character.userId, character);
  }

  /**
   * Send quest state to user on connection (initial sync)
   */
  sendInitialQuestState(userId: string, character: Character): void {
    this.sendQuestStateToUser(userId, character);
  }
}

export const questStatePostman = new QuestStatePostman();

