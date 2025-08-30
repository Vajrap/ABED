import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { ItemCost } from "./Subclass/ItemCost";

export class Item {
  id: string;
  name: string;
  description: string;
  image: string;
  weight: number;
  tier: TierEnum;
  cost: ItemCost;
  isCraftable: boolean = false;
  resource: Map<string, number> = new Map();
  constructor(data: {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    weight?: number;
    tier?: TierEnum;
    cost?: ItemCost;
  }) {
    this.id = data.id ?? "";
    this.name = data.name ?? "";
    this.description = data.description ?? "";
    this.image = data.image ?? "";
    this.weight = data.weight ?? 0;
    this.tier = data.tier ?? TierEnum.common;
    this.cost = data.cost ?? new ItemCost({});
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
  ironSword = "iron_sword",
}

export enum AxeId {
  ironAxe = "iron_axe",
}

export type WeaponId = SwordId | AxeId;

export enum ArmorId {
  LeatherArmor = "leather_armor",
}
export type EquipmentId = WeaponId | ArmorId;

// Consumables
export enum PotionId {
  HealingPotion = "healing_potion",
}
export enum FoodId {
  Bread = "bread",
}
export type ConsumableId = PotionId | FoodId;

// Top-level
export type ItemId = EquipmentId | ConsumableId;
