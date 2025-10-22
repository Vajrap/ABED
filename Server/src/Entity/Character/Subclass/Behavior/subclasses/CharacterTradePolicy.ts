// =================================================
// 1) CharacterTradePolicy (personal, consent-driven)
// =================================================

import type { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers.ts";
import type { ItemId } from "../../../../Item/type";

/*
		Trade System Flags:
		This system determines how a party engages in trade, including buying and selling behavior.

		TradeEngagement - Determines if the party will engage in trade.
			- "trade": The party participates in trade.
			- "noTrade": The party does not engage in trade.

		-------------------
		SELLING CONFIGURATION
		-------------------
		Selling.strategy - Defines how the party sells items.
			- "sellSome": The party sells items if they meet stock and rarity criteria.
			- "sellNone": The party does not sell items.
			- "sellAtMarkUp": The party sells items if their price exceeds a certain threshold (based on market price)
			while also meeting stock and rarity criteria.

		Selling.markupPercentage - The percentage above the base price at which items will be sold (only applies to "sellAtMarkUp").
		Selling.rarityThreshold - The **maximum** rarity of an item that can be sold.
		Selling.itemList - List of items the party is willing to sell.
			- Each entry contains:
				- `itemName: string` → Name of the item.
				- `stockThreshold: number` → Minimum stock required before selling.

		- **"sellSome" and "sellAtMarkUp"** always follow `stockThreshold`, `rarityThreshold`, and `itemList`.

		-------------------
		BUYING CONFIGURATION
		-------------------
		Buying.strategy - Defines how the party buys items.
			- "buySome": The party buys items if they meet stock and rarity criteria.
			- "buyNone": The party does not buy items.
			- "buyAtDiscount": The party buys items if their price drops below a certain threshold (based on market price)
			while also meeting stock and rarity criteria.

		Buying.discountPercentage - The percentage below the base price at which items will be purchased (only applies to "buyAtDiscount").
		Buying.rarityThreshold - The **minimum** rarity of an item that can be purchased.
		Buying.itemList - List of items the party is willing to buy.
			- Each entry contains:
				- `itemName: string` → Name of the item.
				- `stockThreshold: number` → Maximum stock the party wants to keep.

		- **"buySome" and "buyAtDiscount"** always follow `stockThreshold`, `rarityThreshold`, and `itemList`.

		: autoBuyEssentials - Determines if the party will **automatically** buy essential items (e.g., food, water).
			- `true`: The party will always buy essential items when available.
			- `false`: The party does not auto-buy essentials.
	*/
export class CharacterTradePolicy {
  // “Will I participate in party trading at all?”
  engagement: "trade" | "noTrade" = "noTrade";

  // Selling rules (apply to *my* items)
  selling: {
    strategy: SellStrategy;
    markupPercentage: number; // for sellAtMarkUp (e.g., 20 = +20%)
    rarityMaxToSell: TierEnum; // don’t sell rarer than this
    sellingList: Partial<Record<ItemId, number>>; // min quantity to keep before selling
  };

  // Buying rules (what I want acquired for me)
  buying: {
    strategy: BuyStrategy;
    discountPercentage: number; // for buyAtDiscount (e.g., 15 = −15%)
    rarityMinToBuy: TierEnum; // don’t buy below this rarity (junk filter)
    buyingList: Partial<Record<ItemId, number>>; // target stock for my kit (consumables)
    autoBuyEssentials: boolean; // food/water/etc. for me
  };

  constructor(init?: Partial<CharacterTradePolicy>) {
    this.selling = {
      strategy: init?.selling?.strategy ?? "sellNone",
      markupPercentage: init?.selling?.markupPercentage ?? 0,
      rarityMaxToSell: init?.selling?.rarityMaxToSell ?? 0,
      sellingList: init?.selling?.sellingList ?? {},
    };
    this.buying = {
      strategy: init?.buying?.strategy ?? "buyNone",
      discountPercentage: init?.buying?.discountPercentage ?? 0,
      rarityMinToBuy: init?.buying?.rarityMinToBuy ?? 0,
      buyingList: init?.buying?.buyingList ?? {},
      autoBuyEssentials: init?.buying?.autoBuyEssentials ?? false,
    };
    this.engagement = init?.engagement ?? "noTrade";
  }
}

type SellStrategy = "sellNone" | "sellSome" | "sellAtMarkUp";
type BuyStrategy = "buyNone" | "buySome" | "buyAtDiscount";
