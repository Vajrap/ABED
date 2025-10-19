/**
 * Miscellaneous item IDs
 * All misc items must have an entry here for type safety and repository lookup
 */

// Resource IDs
export enum WoodId {
  // Add wood types here as needed
  // oak = "oak",
  // pine = "pine",
}

export enum SkinId {
  // Add skin types here as needed
  // leather = "leather",
}

export enum BoneId {
  // Add bone types here as needed
  // bone = "bone",
}

export type ResourceId = WoodId | SkinId | BoneId;

// Other Misc IDs
export enum GoldId {
  gold = "gold",
}

export type MiscItemId = ResourceId | GoldId;

