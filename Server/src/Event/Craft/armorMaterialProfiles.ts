import { MaterialType } from "src/Entity/Blueprint/Blueprint";

export type ArmorMaterialContribution = {
  defense?: Partial<
    Record<
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
      | "wind",
      number
    >
  >;
  attack?: Partial<
    Record<
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
      | "wind",
      number
    >
  >;
  attributes?: Partial<Record<string, number>>;
  elements?: Partial<Record<string, number>>;
  vitals?: Partial<Record<"hp" | "mp" | "sp", number>>;
  needs?: Partial<Record<"moodBonus" | "energyBonus" | "satietyBonus", number>>;
  planarAttunement?: number;
  dodge?: number;
  gemSlotBonus?: number;
};

export const armorMaterialContribution: Record<MaterialType, ArmorMaterialContribution> = {
  [MaterialType.Ingot]: {
    defense: { pDef: 2, slash: 1, pierce: 1, blunt: 1, mDef: 1 },
    attack: { slash: 1, pierce: 1 },
    attributes: { strength: 1, endurance: 1 },
    vitals: { hp: 2 },
  },
  [MaterialType.Leather]: {
    defense: { pDef: 1, slash: 1 },
    attack: { pHit: 1 },
    attributes: { agility: 1, dexterity: 1 },
    dodge: 1,
    needs: { moodBonus: 1 },
  },
  [MaterialType.Cloth]: {
    defense: { mDef: 1 },
    attributes: { intelligence: 1, charisma: 1 },
    needs: { energyBonus: 1 },
  },
  [MaterialType.Thread]: {
    attack: { pHit: 1, mHit: 1 },
    attributes: { dexterity: 1, control: 1 },
  },
  [MaterialType.Skin]: {
    defense: { blunt: 1 },
    needs: { satietyBonus: 1, moodBonus: 1 },
    attributes: { vitality: 1 },
  },
  [MaterialType.Plank]: {
    defense: { blunt: 1, pDef: 1 },
    attributes: { strength: 1 },
    vitals: { sp: 1 },
  },
  [MaterialType.Bone]: {
    defense: { pierce: 1, order: 1 },
    attack: { pierce: 1, pCrit: 1 },
    attributes: { willpower: 1 },
    planarAttunement: 1,
  },
  [MaterialType.Gem]: {
    attack: { mDmg: 1, mCrit: 1, fire: 1, water: 1, earth: 1, wind: 1 },
    elements: { fire: 1, water: 1, earth: 1, wind: 1 },
    planarAttunement: 2,
    gemSlotBonus: 1,
  },
};

