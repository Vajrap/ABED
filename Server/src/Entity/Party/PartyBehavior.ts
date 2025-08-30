export enum PartyType {
  wanderer = "wanderer",
  merchant = "merchant",
  rogue = "rogue",
  raider = "raider",
  bandit = "bandit",
  criminal = "criminal",
  mercenary = "mercenary",
  nobleRetinue = "nobleRetinue",
  pilgrim = "pilgrim",
  scholar = "scholar",
  hermit = "hermit",
  peasant = "peasant",
  artisan = "artisan",
  knight = "knight",
  soldier = "soldier",
  // Ocean Tide Kingdom
  oceanTideSoldier = "oceanTideSoldier",
  oceanTideKnight = "oceanTideKnight",
  // Fyonar
  fyonarSoldier = "fyonarSoldier",
  fyonarKnight = "fyonarKnight",
  // Jadinthar
  jadintharSoldier = "jadintharSoldier",
  jadintharKnight = "jadintharKnight",
}

export class PartyBehavior {
  type: PartyType;
  /*
	Combat Policy: When two parties encounter each other and pass the 'hostile' test,
	there is a chance that battle will take place.

	If both parties have different Combat Policies:
		- The battle is determined by each party's 'Combat Initiative'.
		- Combat Initiative is calculated as:
		  Combat Initiative = (partyAvgAgilityModifier) + 1D6
		- If the party with **higher** Combat Initiative has **Combat Policy = 'engage'**, battle **will** occur.
		- If the party with **lower** Combat Initiative has **Combat Policy = 'evasive'**, battle **will not** occur.

	If both parties have the same Combat Policy:
		- If **both** are 'engage' → Battle **always** occurs.
		- If **both** are 'evasive' → Battle **never** occurs.

	Strategic Combat Policy:
		- The party will assess the enemy’s strength before deciding to **engage** or **evade**.
		- **Formula for Party Strength (PS):**
		  PS = (partySize * avgLevel)
		- When evaluating another party's strength, intelligence is factored in:
		  - The character with the **highest Intelligence** in the party makes the assessment.
		  - **Formula for Estimated Party Strength (EPS):**
		    EPS = (otherPartySize * otherAvgLevel) ± (5 - Math.min(mostIntelligent.intModifier(), 5))
		  - This ensures parties with higher Intelligence make better assessments.

		- Decision Process:
			- If `EPS > PS`, the party acts as if its Combat Policy is **'evasive'**.
			- If `EPS ≤ PS`, the party acts as if its Combat Policy is **'engage'**.

	This ensures intelligent leaders assess battles **more accurately**,
	while agility influences reaction speed in encounters.
	*/
  combatPolicy: "engage" | "strategic" | "evasive";

  /*
		Trade System Flags:
		This system determines how a party engages in trade, including buying and selling behavior.

		: tradeEngagement - Determines if the party will engage in trade.
			- "trade": The party participates in trade.
			- "noTrade": The party does not engage in trade.

		-------------------
		SELLING CONFIGURATION
		-------------------
		: selling.strategy - Defines how the party sells items.
			- "sellSome": The party sells items if they meet stock and rarity criteria.
			- "sellNone": The party does not sell items.
			- "sellAtMarkUp": The party sells items if their price exceeds a certain threshold (based on market price)
			while also meeting stock and rarity criteria.

		: selling.markupPercentage - The percentage above the base price at which items will be sold (only applies to "sellAtMarkUp").
		: selling.rarityThreshold - The **maximum** rarity of an item that can be sold.
		: selling.itemList - List of items the party is willing to sell.
			- Each entry contains:
				- `itemName: string` → Name of the item.
				- `stockThreshold: number` → Minimum stock required before selling.

		- **"sellSome" and "sellAtMarkUp"** always follow `stockThreshold`, `rarityThreshold`, and `itemList`.

		-------------------
		BUYING CONFIGURATION
		-------------------
		: buying.strategy - Defines how the party buys items.
			- "buySome": The party buys items if they meet stock and rarity criteria.
			- "buyNone": The party does not buy items.
			- "buyAtDiscount": The party buys items if their price drops below a certain threshold (based on market price)
			while also meeting stock and rarity criteria.

		: buying.discountPercentage - The percentage below the base price at which items will be purchased (only applies to "buyAtDiscount").
		: buying.rarityThreshold - The **minimum** rarity of an item that can be purchased.
		: buying.itemList - List of items the party is willing to buy.
			- Each entry contains:
				- `itemName: string` → Name of the item.
				- `stockThreshold: number` → Maximum stock the party wants to keep.

		- **"buySome" and "buyAtDiscount"** always follow `stockThreshold`, `rarityThreshold`, and `itemList`.

		: autoBuyEssentials - Determines if the party will **automatically** buy essential items (e.g., food, water).
			- `true`: The party will always buy essential items when available.
			- `false`: The party does not auto-buy essentials.
	*/
  trade: {
    engagement: "trade" | "noTrade";
    selling: {
      strategy: "sellSome" | "sellNone" | "sellAtMarkUp";
      markupPercentage: number;
      rarityThreshold: number;
      itemList: Record<string, number>;
    };
    buying: {
      strategy: "buySome" | "buyNone" | "buyAtDiscount";
      discountPercentage: number;
      rarityThreshold: number;
      itemList: Record<string, number>;
      autoBuyEssentials: boolean;
    };
  };
  /*
	Crafting System Configuration:
	The crafting system determines how a party will engage in crafting activities.
	When the party has the 'craft' action set, at the designated time, the party will evaluate the `craftingList` to determine if crafting is possible.

	- If the `craftingList` is empty, the party will not craft anything and will fall back to resting.
	- If the `craftingList` contains items, the party will evaluate whether crafting is possible.

	**Criteria for Crafting:**
	1. The party must have enough resources to craft the item.
	2. The crafting strategy must be met:
	   - **"craftAll"**: Craft as many as possible with available resources.
	   - **"craftInRange"**: Craft if the item quantity is below `quantityLow` but does not exceed `quantityHigh`.
	   - **"craftOne"**: Craft a single item only if its quantity is 0.
	3. If resources are insufficient but `allowTradeForMaterials` is `true`, the party will attempt to buy materials from the market. If materials are successfully acquired, crafting will proceed.

	If none of the items in `craftingList` meet these criteria (including after trade attempts), the party will default to a rest action.

	**Crafting Execution:**
	- The party will assign crafting to the character with the highest skill in the required crafting category.
	- Some blueprints may require specific facilities such as a **Blacksmith**, **Alchemy Lab**, or **Cooking Station**.
	*/
  craft: {
    craftingList: {
      [order: number]: {
        bluePrintID: string;
        quantityLow: number;
        quantityHigh: number;
        allowTradeForMaterials: boolean;
        strategy: "craftInRange" | "craftAll" | "craftOne";
      };
    };
  };

  // During the game, many events may happened, the risk taking behavior of the party will be used as a modifier factor to determine the outcome of the event.
  riskTaking: "reckless" | "cautious" | "balanced";

  // Travel Pace affected the speed of the party when traveling on the map.
  travelPace: "fast" | "normal" | "slow";

  // Event Response flags affect how the party reacts to events.
  eventResponse: "friendly" | "neutral" | "hostile";

  useCampSupplies: boolean = false;

  constructor(init?: Partial<PartyBehavior>) {
    this.type = init?.type ?? PartyType.peasant;
    this.combatPolicy = init?.combatPolicy ?? "strategic";
    this.trade = init?.trade ?? {
      engagement: "noTrade",
      selling: {
        strategy: "sellNone",
        markupPercentage: 0,
        rarityThreshold: 0,
        itemList: {},
      },
      buying: {
        strategy: "buyNone",
        discountPercentage: 0,
        rarityThreshold: 0,
        itemList: {},
        autoBuyEssentials: false,
      },
    };
    this.riskTaking = init?.riskTaking ?? "balanced";
    this.travelPace = init?.travelPace ?? "normal";
    this.eventResponse = init?.eventResponse ?? "neutral";
    this.craft = init?.craft ?? {
      craftingList: {},
    };
  }
}
