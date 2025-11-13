import {
  ATTRIBUTE_KEYS,
  type AttributeKey,
  type BattleStatKey,
  ELEMENT_KEYS,
  type ElementKey,
  EquipmentSlot,
} from "src/InterFacesEnumsAndTypes/Enums";
import { MaterialType } from "src/Entity/Blueprint/Blueprint";

export type ArmorGemSlotProfile = {
  /** Base DC checked against (d20 + smith/tailor mod) for granting an empty gem slot. */
  baseDC: number;
  /** Maximum number of slots that can be granted via crafting (0 means slotless). */
  maxSlots: number;
};

export type ArmorBonusProfile = {
  focus: {
    physicalDefense?: boolean;
    elementalDefense?: ElementKey[];
    dodge?: boolean;
    physicalOffense?: boolean;
    elementalOffense?: ElementKey[];
    attributes?: AttributeKey[];
    battleStats?: BattleStatKey[];
    vitals?: Array<"hp" | "mp" | "sp">;
    needs?: Array<"moodBonus" | "energyBonus" | "satietyBonus">;
    saves?: AttributeKey[];
    planarAttunement?: boolean;
    charisma?: boolean;
  };
  gemSlot?: ArmorGemSlotProfile;
};

/**
 * Desired bonus palettes per armor equipment slot.
 * These profiles will steer both material balancing and bonus aggregation later in the pipeline.
 */
export const ARMOR_SLOT_BONUS_PROFILE: Record<EquipmentSlot, ArmorBonusProfile> = {
  [EquipmentSlot.body]: {
    focus: {
      physicalDefense: true,
      elementalDefense: [...ELEMENT_KEYS],
      attributes: ["vitality", "endurance", "strength"],
      vitals: ["hp"],
      saves: ["vitality", "willpower"],
    },
    gemSlot: { baseDC: 20, maxSlots: 1 },
  },
  [EquipmentSlot.headWear]: {
    focus: {
      elementalDefense: ["order", "chaos", "fire", "wind", "water", "earth"],
      attributes: ["intelligence", "willpower", "planar"],
      battleStats: ["mHIT", "mCRT"],
      saves: ["intelligence", "willpower"],
    },
    gemSlot: { baseDC: 19, maxSlots: 0 },
  },
  [EquipmentSlot.hand]: {
    focus: {
      physicalDefense: true,
      physicalOffense: true,
      attributes: ["dexterity", "control"],
      battleStats: ["pHIT", "pCRT", "mHIT"],
    },
    gemSlot: { baseDC: 21, maxSlots: 0 },
  },
  [EquipmentSlot.leg]: {
    focus: {
      physicalDefense: true,
      dodge: true,
      attributes: ["agility", "endurance"],
      vitals: ["sp"],
      battleStats: ["dodge", "pHIT"],
    },
    gemSlot: { baseDC: 21, maxSlots: 0 },
  },
  [EquipmentSlot.foot]: {
    focus: {
      dodge: true,
      attributes: ["agility"],
      needs: ["energyBonus"],
      saves: ["dexterity"],
    },
    gemSlot: { baseDC: 22, maxSlots: 0 },
  },
  [EquipmentSlot.util]: {
    focus: {
      physicalDefense: true,
      attributes: ["endurance", "strength"],
      needs: ["satietyBonus"],
      battleStats: ["pDEF"],
    },
    gemSlot: { baseDC: 22, maxSlots: 0 },
  },
  [EquipmentSlot.ring]: {
    focus: {
      attributes: ["luck", "charisma"],
      planarAttunement: true,
      elementalOffense: [...ELEMENT_KEYS],
    },
    gemSlot: { baseDC: 18, maxSlots: 1 },
  },
  [EquipmentSlot.ear]: {
    focus: {
      attributes: ["charisma", "planar"],
      elementalDefense: ["order", "chaos", "fire", "water"],
      battleStats: ["mDEF", "mCRT"],
    },
    gemSlot: { baseDC: 19, maxSlots: 1 },
  },
  [EquipmentSlot.neck]: {
    focus: {
      elementalDefense: [...ELEMENT_KEYS],
      elementalOffense: ["order", "chaos"],
      planarAttunement: true,
      attributes: ["leadership", "willpower"],
    },
    gemSlot: { baseDC: 18, maxSlots: 1 },
  },
  [EquipmentSlot.weapon]: {
    focus: {
      physicalOffense: true,
      elementalOffense: [...ELEMENT_KEYS],
    },
    gemSlot: { baseDC: 18, maxSlots: 2 },
  },
};

export type MaterialTheme = {
  defense?: "physical" | "elemental" | "hybrid";
  mobility?: boolean;
  comfort?: boolean;
  finesse?: boolean;
  resilience?: boolean;
  magicAffinity?: boolean;
  charisma?: boolean;
};

/**
 * Thematic roles for each material category.
 * Later steps will tune `equipmentCraftingAttributes` so these themes translate into concrete stats.
 */
export const MATERIAL_THEMES: Record<MaterialType, MaterialTheme> = {
  [MaterialType.Ingot]: {
    defense: "physical",
    resilience: true,
  },
  [MaterialType.Plank]: {
    defense: "physical",
    resilience: true,
  },
  [MaterialType.Bone]: {
    defense: "elemental",
    magicAffinity: true,
  },
  [MaterialType.Leather]: {
    defense: "hybrid",
    mobility: true,
  },
  [MaterialType.Thread]: {
    comfort: true,
    finesse: true,
  },
  [MaterialType.Cloth]: {
    comfort: true,
    charisma: true,
  },
  [MaterialType.Skin]: {
    mobility: true,
    resilience: true,
  },
  [MaterialType.Gem]: {
    magicAffinity: true,
    charisma: true,
  },
};

export const DEFAULT_GEM_SLOT_DC = 20;
export const MAX_GEM_SLOTS = 2;

export function isArmorSlot(slot: EquipmentSlot): boolean {
  return slot !== EquipmentSlot.weapon;
}

