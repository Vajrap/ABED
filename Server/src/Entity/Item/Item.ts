import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { ItemCost, type ItemCostInit } from "./Subclass/ItemCost";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { ItemId } from "./type";
import { BlueprintId } from "../Blueprint/enum";
import type { ResourceType } from "src/InterFacesEnumsAndTypes/ResourceTypes";
import type { EquipmentCraftingAttributes } from "./Misc/Resource/EquipmentCraftingAttributes";

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

export type BlueprintRequirement = {
  resource: Map<ResourceType, number>;
  item: Map<ItemCategoryType, number>;
};

export type BlueprintReference = BlueprintId | BlueprintRequirement;

export interface ItemDefinition {
  id: ItemId;
  name?: L10N;
  description?: L10N;
  image?: string;
  weight?: number;
  tier?: TierEnum;
  cost?: ItemCost | ItemCostInit;
  isCraftable?: boolean;
  blueprintId?: BlueprintReference;
  primaryResource?: ResourceType | null;
  equipmentCraftingAttributes?: EquipmentCraftingAttributes;
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
  blueprintId?: BlueprintReference;
  primaryResource?: ResourceType | null;
  equipmentCraftingAttributes?: EquipmentCraftingAttributes;

  constructor(data: ItemDefinition) {
    this.id = data.id;
    this.name = data.name ?? { en: "", th: "" };
    this.description = data.description ?? { en: "", th: "" };
    this.image = data.image ?? "";
    this.weight = data.weight ?? 0;
    this.tier = data.tier ?? TierEnum.common;
    this.cost =
      data.cost instanceof ItemCost ? data.cost : new ItemCost(data.cost ?? {});
    this.isCraftable = data.isCraftable ?? false;
    this.blueprintId = data.blueprintId;
    this.primaryResource = data.primaryResource ?? null;
    this.equipmentCraftingAttributes = data.equipmentCraftingAttributes;
  }
}
