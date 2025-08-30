import { CharacterCraftingPreference } from "./subclasses/CharacterCraftingPreference";
import { CharacterTradePolicy } from "./subclasses/CharacterTradePolicy";

export class CharacterBehavior {
  battlePolicy: "engage" | "strategic" | "evasive";
  tradePolicy: CharacterTradePolicy;
  craftingPreference: CharacterCraftingPreference;

  // During the game, many events may happened, the risk taking behavior of the party will be used as a modifier factor to determine the outcome of the event.
  riskTaking: "reckless" | "cautious" | "balanced";

  // Travel Pace affected the speed of the party when traveling on the map.
  travelPace: "fast" | "normal" | "slow";

  // Event Response flags affect how the party reacts to events.
  eventResponse: "friendly" | "neutral" | "hostile";

  useCampSupplies: boolean;

  constructor(init?: Partial<CharacterBehavior>) {
    this.tradePolicy = init?.tradePolicy ?? new CharacterTradePolicy();
    this.battlePolicy = init?.battlePolicy ?? "strategic";
    this.craftingPreference =
      init?.craftingPreference ?? new CharacterCraftingPreference();
    this.riskTaking = init?.riskTaking ?? "balanced";
    this.travelPace = init?.travelPace ?? "normal";
    this.eventResponse = init?.eventResponse ?? "neutral";
    this.useCampSupplies = init?.useCampSupplies ?? false;
  }
}
