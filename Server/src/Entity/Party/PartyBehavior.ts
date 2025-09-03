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
  combatPolicy: "bold" | "measured" | "careful";

  // During the game, many events may happened, the risk taking behavior of the party will be used as a modifier factor to determine the outcome of the event.
  riskTaking: "bold" | "measured" | "careful";

  // Travel Pace affected the speed of the party when traveling on the map.
  travelPace: "bold" | "measured" | "careful";

  // Event Response flags affect how the party reacts to events.
  eventResponse: "bold" | "measured" | "careful";

  useCampSupplies: boolean = false;

  constructor(init?: Partial<PartyBehavior>) {
    this.type = init?.type ?? PartyType.peasant;
    this.combatPolicy = init?.combatPolicy ?? "measured";
    this.riskTaking = init?.riskTaking ?? "measured";
    this.travelPace = init?.travelPace ?? "measured";
    this.eventResponse = init?.eventResponse ?? "measured";
  }
}
