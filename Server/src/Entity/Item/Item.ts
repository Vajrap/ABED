import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "./Subclass/ItemCost";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { ItemId } from "./type";
import { BlueprintId } from "../Blueprint/enum";

export type ItemCategoryType =
  | "ingot" // Accepts any IngotId
  | "leather" // Accepts any LeatherId
  | "plank" // Accepts any PlankId
  | "thread" // Accepts any ThreadId
  | "cloth" // Accepts any ClothId
  | "gem" // Accepts any GemId
  | "ore" // Accepts any OreId
  | "wood" // Accepts any WoodId
  | "skin" // Accepts any SkinId
  | "bone"; // Accepts any BoneId

export class Item {
  id: ItemId;
  name: L10N;
  description: L10N;
  image: string;
  weight: number;
  tier: TierEnum;
  cost: ItemCost;
  isCraftable: boolean;
  blueprintId: BlueprintId | undefined;

  constructor(data: Item) {
    this.id = data.id;
    this.name = data.name ?? { en: "", th: "" };
    this.description = data.description ?? { en: "", th: "" };
    this.image = data.image ?? "";
    this.weight = data.weight ?? 0;
    this.tier = data.tier ?? TierEnum.common;
    this.cost = data.cost ?? new ItemCost({});
    this.isCraftable = data.isCraftable;
    this.blueprintId = data.blueprintId;
  }
}
