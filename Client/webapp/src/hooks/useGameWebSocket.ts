import { useEffect } from "react";
import { websocketService } from "@/services/websocketService";
import { questService } from "@/services/questService";
import type { PartyInterface, GameTimeInterface } from "@/types/api";
import type { LocationData } from "@/services/locationService";

export interface UseGameWebSocketOptions {
  onGameStateUpdate?: (data: {
    party: PartyInterface;
    location: LocationData;
    gameTime: GameTimeInterface;
  }) => void;
}

export function useGameWebSocket(options?: UseGameWebSocketOptions) {
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

    const unsubscribeGameState = websocketService.onMessage("GAME_STATE_UPDATE", (message) => {
      const gameStateData = message.data;
      if (gameStateData && options?.onGameStateUpdate) {
        options.onGameStateUpdate({
          party: gameStateData.party,
          location: gameStateData.location,
          gameTime: gameStateData.gameTime,
        });
      }
    });

    return () => {
      unsubscribeQuestState();
      unsubscribeGameState();
    };
  }, [options?.onGameStateUpdate]);
}

