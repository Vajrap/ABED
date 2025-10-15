import { globalEventCardDeck } from "../Entity/Card/GlobalEventCard/definitions";
import type { GlobalEventCard } from "../Entity/Card/GlobalEventCard/GlobalEventCard";
import type { News, NewsEmittedFromLocationStructure } from "../Entity/News/News";

class GameState {
    lastGlobalEventCardCompleted: boolean;
    activeGlobalEventCards: GlobalEventCard | undefined;
    completedGlobalEventCards: GlobalEventCard[];
    globalEventCardDeck: GlobalEventCard[]; 

    constructor(data?: GameState) {
        this.lastGlobalEventCardCompleted = data?.lastGlobalEventCardCompleted ?? false;
        this.activeGlobalEventCards = data?.activeGlobalEventCards ?? undefined;
        this.completedGlobalEventCards = data?.completedGlobalEventCards ?? [];
        this.globalEventCardDeck = data?.globalEventCardDeck ?? globalEventCardDeck
    }

    drawGlobalCard(): NewsEmittedFromLocationStructure | undefined {
        if (this.globalEventCardDeck.length === 0) {
            this.reshuffleGlobalEventCardDeck();
        }
        const card = this.globalEventCardDeck.pop()!;
        this.activeGlobalEventCards = card;

        return card.onDraw?.();
    }

    private reshuffleGlobalEventCardDeck() {
        this.globalEventCardDeck = this.completedGlobalEventCards.sort(() => Math.random() - 0.5);
        this.completedGlobalEventCards = [];
    }
}

export const gameState = new GameState();