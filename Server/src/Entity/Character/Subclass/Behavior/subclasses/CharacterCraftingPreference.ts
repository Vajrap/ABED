// =================================================
// 3) CharacterCraftingPreference (personal intent)
// =================================================
/*
  How should a character determine what to craft?
  Chracter Action input is just 'Craft' that means the config *here* should determine what to craft
  and how many to craft, also the order of crafting.
  1. Character has a list of blueprints+config for each blueprint,
  2. We must know the priority of crafting, so the list is ordered
  3. Crafting start from the top of the list and fall below,
  4. Should have limited quantity range, so we don't need to deal with like list of 1000 blueprints,
  5. So, should be just like, 4 blueprints,
  6. Each blue print have quantity of items that can be crafted in one instance.

*/
export class CharacterCraftingPreference {
  // List of item character want to craft in order;
  craftingList: {
    [order in 1 | 2 | 3 | 4]: {
      bluePrintID: BlueprintId;
      strategy: "craftInRange" | "craftAll" | "craftOne";
      quantityLow: number; // craft up to Low..High
      quantityHigh: number;
      willTradeForMaterials: boolean; // personally okay with buying mats
    };
  } = {
    1: {
      bluePrintID: 0,
      strategy: "craftInRange",
      quantityLow: 0,
      quantityHigh: 0,
      willTradeForMaterials: false
    },
    2: {
      bluePrintID: 0,
      strategy: "craftInRange",
      quantityLow: 0,
      quantityHigh: 0,
      willTradeForMaterials: false
    },
    3: {
      bluePrintID: 0,
      strategy: "craftInRange",
      quantityLow: 0,
      quantityHigh: 0,
      willTradeForMaterials: false
    },
    4: {
      bluePrintID: 0,
      strategy: "craftInRange",
      quantityLow: 0,
      quantityHigh: 0,
      willTradeForMaterials: false
    }
  };

  constructor(init?: Partial<CharacterCraftingPreference>) {
    if (init?.craftingList) this.craftingList = init.craftingList;
  }
}

enum BlueprintId {}
