import { useEffect } from "react";
import { websocketService } from "@/services/websocketService";
import { questService } from "@/services/questService";

export function useGameWebSocket() {
  useEffect(() => {
    if (!websocketService.isConnected()) {
      websocketService.connect();
    }

    const unsubscribeQuestState = websocketService.onMessage("QUEST_STATE_UPDATE", (message) => {
      const questStateData = message.data;
      if (questStateData) {
        const questOffers = questStateData.questOffers?.map((offer: any) => ({
          ...offer,
          expiresAt: typeof offer.expiresAt === "string" 
            ? offer.expiresAt 
            : new Date(offer.expiresAt).toISOString(),
        })) || [];
        
        questService.updateQuestState({
          activeQuests: questStateData.activeQuests || [],
          questOffers: questOffers,
        });
      }
    });

    return () => {
      unsubscribeQuestState();
    };
  }, []);
}

