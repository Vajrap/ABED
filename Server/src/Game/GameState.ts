import { globalEventCardDeck } from "../Entity/Card/GlobalEventCard/definitions";
import type { GlobalEventCard } from "../Entity/Card/GlobalEventCard/GlobalEventCard";
import type { News, NewsDistribution } from "../Entity/News/News";
import { regionEventCardDeck } from "../Entity/Card/RegionEventCard/definitions";
import type { RegionEventCard } from "../Entity/Card/RegionEventCard/RegionEventCard";
import Report from "../Utils/Reporter";

export class GameState {
  id: string | null;

  // Global Event Cards
  lastGlobalEventCardCompleted: boolean;
  activeGlobalEventCards: GlobalEventCard | undefined;
  globalEventCardDeck: GlobalEventCard[];
  completedGlobalEventCards: GlobalEventCard[];

  // Region Event Cards
  regionEventCardDeck: RegionEventCard[];
  completedRegionEventCards: RegionEventCard[];

  // Global Event Scale (0-250)
  globalEventScale: number;

  // Loop progression
  lastProcessedPhaseIndex: number;

  constructor(data?: GameState) {
    this.id = data?.id ?? null;
    this.lastGlobalEventCardCompleted =
      data?.lastGlobalEventCardCompleted ?? false;
    this.activeGlobalEventCards = data?.activeGlobalEventCards ?? undefined;
    this.completedGlobalEventCards = data?.completedGlobalEventCards ?? [];
    this.globalEventCardDeck = data?.globalEventCardDeck ?? globalEventCardDeck;

    this.regionEventCardDeck = data?.regionEventCardDeck ?? [
      ...regionEventCardDeck,
    ];
    this.completedRegionEventCards = data?.completedRegionEventCards ?? [];
    this.globalEventScale = data?.globalEventScale ?? 0;
    this.lastProcessedPhaseIndex = data?.lastProcessedPhaseIndex ?? 0;
  }

  // TODO: Rethink, some global event shouln't reappear, especially the story-line events
  drawGlobalCard(): NewsDistribution | undefined {
    Report.debug("Drawing global event card");
    if (this.globalEventCardDeck.length === 0) {
      this.reshuffleGlobalEventCardDeck();
    }
    const card = this.globalEventCardDeck.pop()!;
    this.activeGlobalEventCards = card;
    Report.debug(`Get Card: ${card.name}`);
    return card.onDraw?.();
  }

  drawRegionCard(): NewsDistribution | null {
    Report.debug("Drawing region event card");
    if (this.regionEventCardDeck.length === 0) {
      this.reshuffleRegionEventCardDeck();
    }

    const card = this.regionEventCardDeck.pop();
    if (!card) {
      Report.error('No card available in region event card deck');
      return null;
    }
    
    // Check if card has onDraw method (might be missing after DB deserialization)
    if (typeof card.onDraw !== 'function') {
      Report.warn(`Region card "${card.name?.en || card.id || 'Unknown'}" missing onDraw method, re-initializing deck`);
      // Re-initialize the deck with fresh card instances
      this.regionEventCardDeck = [...regionEventCardDeck];
      if (this.regionEventCardDeck.length === 0) {
        Report.error('Region event card deck is empty after re-initialization');
        return null;
      }
      const newCard = this.regionEventCardDeck.pop()!;
      this.completedRegionEventCards.push(newCard);
      
      const cardScale = newCard.globalEventScale ?? 0;
      this.globalEventScale = Math.min(250, this.globalEventScale + cardScale);
      
      return newCard.onDraw?.() ?? null;
    }
    
    Report.debug(`Get Card: ${typeof card.name === 'object' ? card.name?.en : card.name || 'Unknown'}`);
    this.completedRegionEventCards.push(card);

    // Update global event scale
    const cardScale = card.globalEventScale ?? 0;
    this.globalEventScale = Math.min(
      250,
      this.globalEventScale + cardScale,
    );

    // Execute card effect - use optional chaining as safety
    return card.onDraw?.() ?? null;
  }

  private reshuffleGlobalEventCardDeck() {
    // Filter out any invalid cards
    const validCards = this.completedGlobalEventCards.filter(card => card != null);
    
    // If cards are missing onDraw (deserialized from DB), re-instantiate from original deck
    if (validCards.length > 0 && typeof validCards[0]?.onDraw !== 'function' && validCards[0]?.onDraw !== undefined) {
      Report.warn('Global cards may be missing onDraw after deserialization, re-initializing deck');
      this.globalEventCardDeck = [...globalEventCardDeck];
      this.completedGlobalEventCards = [];
      return;
    }
    
    this.globalEventCardDeck = validCards.sort(() => Math.random() - 0.5);
    this.completedGlobalEventCards = [];
  }

  private reshuffleRegionEventCardDeck() {
    // Filter out any invalid cards (e.g., from deserialization) and re-instantiate if needed
    const validCards = this.completedRegionEventCards.filter(card => card != null);
    
    // If cards are missing onDraw (deserialized from DB), re-instantiate from original deck
    if (validCards.length > 0 && typeof validCards[0]?.onDraw !== 'function') {
      Report.warn('Region cards missing onDraw after deserialization, re-initializing deck');
      this.regionEventCardDeck = [...regionEventCardDeck];
      this.completedRegionEventCards = [];
      return;
    }
    
    this.regionEventCardDeck = validCards.sort(() => Math.random() - 0.5);
    this.completedRegionEventCards = [];
  }
}

export const gameState = new GameState();
