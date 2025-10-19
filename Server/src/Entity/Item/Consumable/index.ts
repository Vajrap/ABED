/**
 * Consumable item IDs and enums
 * All consumable items must have an entry here for type safety and repository lookup
 */

export enum PotionId {
  healingPotion = "healingPotion",
}

export enum FoodId {
  bread = "bread",
}

export enum UsableId {
  campKit = "campKit",
}

export type ConsumableId = PotionId | FoodId | UsableId;
