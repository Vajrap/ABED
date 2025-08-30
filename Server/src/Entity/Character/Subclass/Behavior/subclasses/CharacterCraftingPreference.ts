// =================================================
// 3) CharacterCraftingPreference (personal intent)
// =================================================
export class CharacterCraftingPreference {
  // List of item character want to craft in order;
  craftingList: {
    [order: number]: {
      bluePrintID: BlueprintId;
      strategy: "craftInRange" | "craftAll" | "craftOne";
      quantityLow: number; // craft up to Low..High
      quantityHigh: number;
      willTradeForMaterials: boolean; // personally okay with buying mats
    };
  } = {};

  constructor(init?: Partial<CharacterCraftingPreference>) {
    if (init?.craftingList) this.craftingList = init.craftingList;
  }
}

enum BlueprintId {}
