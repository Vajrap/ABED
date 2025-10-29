import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "./Subclass/ItemCost";
import type { ResourceType } from "../../InterFacesEnumsAndTypes/ResourceTypes";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { ItemId } from "./type";

/**
 * Base Item class for all items in the game
 * All item types (Equipment, Consumable, Books, Misc, etc.) extend from this
 */
type CraftingRecipe = {
    resource: Map<ResourceType, number>;
    item: Map<ItemId, number>
}


export class Item {
  id: ItemId;
  name: L10N;
  description: L10N;
  image: string;
  weight: number;
  tier: TierEnum;
  cost: ItemCost;
  isCraftable: boolean;
  craftingRecipe: CraftingRecipe;

  /**
   * Primary resource used for dynamic pricing
   *
   * Items crafted from resources inherit price fluctuations from that resource.
   * Example: Iron Sword uses "ore" as primary resource, so price follows ore market.
   */
  constructor(data: {
    id: ItemId;
    name: L10N;
    description: L10N;
    image: string;
    weight: number;
    tier: TierEnum;
    cost: ItemCost;
    isCraftable?: boolean;
    craftingRecipe: CraftingRecipe;
  }) {
    this.id = data.id;
    this.name = data.name ?? { en: "", th: "" };
    this.description = data.description ?? { en: "", th: "" };
    this.image = data.image ?? "";
    this.weight = data.weight ?? 0;
    this.tier = data.tier ?? TierEnum.common;
    this.cost = data.cost ?? new ItemCost({});
    this.isCraftable = data.isCraftable ?? false;
    this.craftingRecipe = data.craftingRecipe ?? {};
  }
}
