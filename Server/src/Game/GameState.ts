import { globalEventCardDeck } from "../Entity/Card/GlobalEventCard/definitions";
import type { GlobalEventCard } from "../Entity/Card/GlobalEventCard/GlobalEventCard";
import type { News, NewsDistribution } from "../Entity/News/News";
import { regionEventCardDeck } from "../Entity/Card/RegionEventCard/definitions";
import type { RegionEventCard } from "../Entity/Card/RegionEventCard/RegionEventCard";

export class GameState {
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

  constructor(data?: GameState) {
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
  }

  // TODO: Rethink, some global event shouln't reappear, especially the story-line events
  drawGlobalCard(): NewsDistribution | undefined {
    console.log("Drawing global event card");
    if (this.globalEventCardDeck.length === 0) {
      this.reshuffleGlobalEventCardDeck();
    }
    const card = this.globalEventCardDeck.pop()!;
    this.activeGlobalEventCards = card;
    console.log(`Get Card: ${card.name}`);
    return card.onDraw?.();
  }

  drawRegionCard(): NewsDistribution | null {
    console.log("Drawing region event card");
    if (this.regionEventCardDeck.length === 0) {
      this.reshuffleRegionEventCardDeck();
    }

    const card = this.regionEventCardDeck.pop()!;
    console.log(`Get Card: ${card.name}`);
    this.completedRegionEventCards.push(card);

    // Update global event scale
    this.globalEventScale = Math.min(
      250,
      this.globalEventScale + card.globalEventScale,
    );

    // Execute card effect
    return card.onDraw();
  }

  private reshuffleGlobalEventCardDeck() {
    this.globalEventCardDeck = this.completedGlobalEventCards.sort(
      () => Math.random() - 0.5,
    );
    this.completedGlobalEventCards = [];
  }

  private reshuffleRegionEventCardDeck() {
    this.regionEventCardDeck = this.completedRegionEventCards.sort(
      () => Math.random() - 0.5,
    );
    this.completedRegionEventCards = [];
  }
}

export const gameState = new GameState();
