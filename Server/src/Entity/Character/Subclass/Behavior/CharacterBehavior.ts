import { CharacterCraftingPreference } from "./subclasses/CharacterCraftingPreference";
import { CharacterTradePolicy } from "./subclasses/CharacterTradePolicy";

export class CharacterBehavior {
  battlePolicy: "bold" | "measured" | "careful";
  tradePolicy: CharacterTradePolicy;
  craftingPreference: CharacterCraftingPreference;

  // During the game, many events may happened, the risk taking behavior of the party will be used as a modifier factor to determine the outcome of the event.
  riskTaking: "bold" | "measured" | "careful";

  // Travel Pace affected the speed of the party when traveling on the map.
  travelPace: "bold" | "measured" | "careful";

  // Event Response flags affect how the party reacts to events.
  eventResponse: "bold" | "measured" | "careful";

  useCampSupplies: boolean;

  constructor(init?: Partial<CharacterBehavior>) {
    this.tradePolicy = init?.tradePolicy ?? new CharacterTradePolicy();
    this.battlePolicy = init?.battlePolicy ?? "measured";
    this.craftingPreference =
      init?.craftingPreference ?? new CharacterCraftingPreference();
    this.riskTaking = init?.riskTaking ?? "measured";
    this.travelPace = init?.travelPace ?? "measured";
    this.eventResponse = init?.eventResponse ?? "measured";
    this.useCampSupplies = init?.useCampSupplies ?? false;
  }
}
