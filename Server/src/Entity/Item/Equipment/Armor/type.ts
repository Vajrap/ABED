/**
 * Armor item IDs
 * All armor items must have an entry here for type safety and repository lookup
 */

export enum BodyId {
  // Add body armor IDs here as needed
}

export enum EarId {
  // Add earring IDs here as needed
}

export enum FootId {
  // Add footwear IDs here as needed
}

export enum HandId {
  // Add hand armor/glove IDs here as needed
}

export enum HeadWearId {
  // Add headwear IDs here as needed
}

export enum LegId {
  // Add leg armor IDs here as needed
}

export enum NeckId {
  // Add necklace IDs here as needed
}

export enum RingId {
  // Add ring IDs here as needed
}

export enum UtilId {
  // Add utility item IDs here as needed
}

export type ArmorId =
  | BodyId
  | EarId
  | FootId
  | HandId
  | HeadWearId
  | LegId
  | NeckId
  | RingId
  | UtilId;
