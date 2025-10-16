import { quietSeason } from "./quietSeason";
import { merchantCaravan } from "./merchantCaravan";
import { banditRaids } from "./banditRaids";
import { regionalConflict } from "./regionalConflict";

// Region Event Card Deck
// Drawn twice per season (8 times per year)
// Average scale per card: ~15 → ~120 scale per year → reaches 250 in ~2 years
export const regionEventCardDeck = [
  // Scale 0 cards (30% of deck)
  quietSeason,
  quietSeason,
  quietSeason,
  
  // Scale 10 cards (30% of deck)
  merchantCaravan,
  merchantCaravan,
  merchantCaravan,
  
  // Scale 20 cards (30% of deck)
  banditRaids,
  banditRaids,
  banditRaids,
  
  // Scale 30 cards (10% of deck)
  regionalConflict,
];

