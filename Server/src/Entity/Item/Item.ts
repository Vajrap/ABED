import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "./Subclass/ItemCost";
import type { ResourceType } from "../Market/types";

export class Item {
  id: string;
  name: string;
  description: string;
  image: string;
  weight: number;
  tier: TierEnum;
  cost: ItemCost;
  isCraftable: boolean = false;
  resource: Map<string, number> = new Map(); // Crafting recipe
  
  /**
   * Primary resource used for dynamic pricing
   * 
   * Items crafted from resources inherit price fluctuations from that resource.
   * Example: Iron Sword uses "ore" as primary resource, so price follows ore market.
   */
  primaryResource?: ResourceType;
  
  constructor(data: {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    weight?: number;
    tier?: TierEnum;
    cost?: ItemCost;
    primaryResource?: ResourceType;
  }) {
    this.id = data.id ?? "";
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.image = data.image ?? "";
    this.weight = data.weight ?? 0;
    this.tier = data.tier ?? TierEnum.common;
    this.cost = data.cost ?? new ItemCost({});
    this.primaryResource = data.primaryResource;
  }
}

export class ItemEquipment extends Item {}
export class Weapon extends ItemEquipment {}
export class Sword extends Weapon {}
// ETC.
export class Armory extends ItemEquipment {}
export class HeadWear extends Armory {}
export class Armor extends Armory {}
// ETC.

export class ItemConsumable extends Item {}
export class Potion extends ItemConsumable {}
export class Food extends ItemConsumable {}
export class Drink extends ItemConsumable {}
// ETC.

export class ItemResource extends Item {}
export class Wood extends ItemResource {}
export class Skin extends ItemResource {}
export class Bone extends ItemResource {}
// ETC.

export class ItemMisc extends Item {}

export enum SwordId {
  ironSword = "ironSword",
}

export enum AxeId {
  ironAxe = "ironAxe",
}

export type WeaponId = SwordId | AxeId;

export enum ArmorId {
  leatherArmor = "leatherArmor",
}
export type EquipmentId = WeaponId | ArmorId;

// Consumables
export enum PotionId {
  healingPotion = "healingPotion",
}
export enum FoodId {
  bread = "bread",
}

export enum UsableId {
  campKit = "campKit",
}

export enum MiscItemId {
  gold = "gold",
}

export enum BookId {}

export type ConsumableId = PotionId | FoodId | UsableId;

// Top-level
export type ItemId = EquipmentId | ConsumableId | MiscItemId;
