/**
 * Quest Service
 * Manages quest state (active quests and quest offers)
 * Updates via WebSocket messages from backend
 */

export interface QuestObjective {
  type: string;
  target: string;
  required: number;
  current: number;
}

export interface Quest {
  id: string;
  name: { en: string; th: string };
  description: { en: string; th: string };
  type: string;
  tier: string;
  objectives: QuestObjective[];
  rewards: {
    gold?: number;
    items?: Record<string, number>;
    experience?: number;
    reputation?: { subRegion: string; amount: number };
  };
  status: string;
  giverId?: string;
  locationId?: string;
}

export interface QuestOffer {
  id: string;
  quest: Quest;
  expiresAt: string; // ISO date string
  status: "pending" | "accepted" | "expired" | "declined";
}

export interface QuestState {
  activeQuests: Quest[];
  questOffers: QuestOffer[];
}

class QuestService {
  private questState: QuestState = {
    activeQuests: [],
    questOffers: [],
  };

  private listeners: Set<(state: QuestState) => void> = new Set();

  /**
   * Get current quest state
   */
  getQuestState(): QuestState {
    return { ...this.questState };
  }

  /**
   * Update quest state (called from WebSocket handler)
   */
  updateQuestState(state: QuestState): void {
    this.questState = {
      activeQuests: [...state.activeQuests],
      questOffers: [...state.questOffers],
    };
    
    // Notify all listeners
    this.listeners.forEach((listener) => {
      try {
        listener(this.questState);
      } catch (error) {
        console.error("Error in quest state listener:", error);
      }
    });
  }

  /**
   * Subscribe to quest state updates
   * Returns unsubscribe function
   */
  onQuestStateUpdate(listener: (state: QuestState) => void): () => void {
    this.listeners.add(listener);
    
    // Immediately call with current state
    listener(this.questState);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get active quests
   */
  getActiveQuests(): Quest[] {
    return [...this.questState.activeQuests];
  }

  /**
   * Get quest offers
   */
  getQuestOffers(): QuestOffer[] {
    return [...this.questState.questOffers];
  }

  /**
   * Get a specific active quest by ID
   */
  getActiveQuest(questId: string): Quest | undefined {
    return this.questState.activeQuests.find((q) => q.id === questId);
  }

  /**
   * Get a specific quest offer by ID
   */
  getQuestOffer(offerId: string): QuestOffer | undefined {
    return this.questState.questOffers.find((o) => o.id === offerId);
  }
}

// Export singleton instance
export const questService = new QuestService();

