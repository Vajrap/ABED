import type { ArmorComponentKey } from "src/Entity/Blueprint/Blueprint";
import type { AttributeKey, ElementKey } from "src/InterFacesEnumsAndTypes/Enums";

export type ArmorEquipmentSlot =
  | "body"
  | "head"
  | "hand"
  | "leg"
  | "foot"
  | "neck"
  | "ring"
  | "ear";

export type ArmorBonusProfile = {
  defenseKeys?: Array<
    | "pDef"
    | "slash"
    | "pierce"
    | "blunt"
    | "mDef"
    | "order"
    | "chaos"
    | "fire"
    | "earth"
    | "water"
    | "wind"
  >;
  attackKeys?: Array<
    | "pDmg"
    | "pHit"
    | "pCrit"
    | "mDmg"
    | "mHit"
    | "mCrit"
    | "slash"
    | "pierce"
    | "blunt"
    | "order"
    | "chaos"
    | "fire"
    | "earth"
    | "water"
    | "wind"
  >;
  attributeKeys?: AttributeKey[];
  elementKeys?: ElementKey[];
  vitalKeys?: Array<"hp" | "mp" | "sp">;
  needKeys?: Array<"moodBonus" | "energyBonus" | "satietyBonus">;
  allowPlanarAttunement?: boolean;
  allowDodge?: boolean;
  // Optional mapping from armor blueprint component (shell, lining, etc.)
  // to weight multipliers when aggregating materials.
  componentWeights?: Partial<Record<ArmorComponentKey, number>>;
};

export const armorBonusProfileBySlot: Record<ArmorEquipmentSlot, ArmorBonusProfile> = {
  body: {
    defenseKeys: ["pDef", "slash", "pierce", "blunt", "mDef"],
    attackKeys: ["slash", "pierce", "blunt"],
    attributeKeys: ["vitality", "endurance", "strength"],
    vitalKeys: ["hp", "sp"],
    componentWeights: {
      shell: 1,
      reinforcement: 0.75,
      lining: 0.5,
      padding: 0.5,
    },
  },
  head: {
    defenseKeys: ["mDef", "order", "chaos"],
    attributeKeys: ["intelligence", "willpower", "planar"],
    elementKeys: ["order", "chaos"],
    allowPlanarAttunement: true,
    needKeys: ["energyBonus"],
    componentWeights: {
      shell: 1,
      lining: 0.6,
      trim: 0.4,
    },
  },
  hand: {
    attackKeys: ["pHit", "pCrit", "mHit", "mCrit"],
    attributeKeys: ["dexterity", "control"],
    needKeys: ["moodBonus"],
    componentWeights: {
      shell: 1,
      padding: 0.5,
      trim: 0.3,
    },
  },
  leg: {
    defenseKeys: ["pDef", "mDef"],
    attributeKeys: ["strength", "endurance"],
    vitalKeys: ["sp"],
    allowDodge: true,
    componentWeights: {
      shell: 1,
      padding: 0.5,
    },
  },
  foot: {
    defenseKeys: ["slash", "pierce"],
    attributeKeys: ["agility", "dexterity"],
    allowDodge: true,
    elementKeys: ["earth", "wind"],
    componentWeights: {
      shell: 1,
      lining: 0.5,
      trim: 0.3,
    },
  },
  neck: {
    attributeKeys: ["charisma", "planar", "leadership"],
    elementKeys: ["order", "chaos", "fire", "water"],
    allowPlanarAttunement: true,
    needKeys: ["moodBonus"],
  },
  ring: {
    attributeKeys: ["luck", "intelligence", "willpower"],
    elementKeys: ["order", "chaos", "fire", "earth", "water", "wind"],
    allowPlanarAttunement: true,
    needKeys: ["energyBonus"],
  },
  ear: {
    attributeKeys: ["charisma", "control"],
    elementKeys: ["order", "wind"],
    needKeys: ["moodBonus"],
    allowPlanarAttunement: true,
  },
};

