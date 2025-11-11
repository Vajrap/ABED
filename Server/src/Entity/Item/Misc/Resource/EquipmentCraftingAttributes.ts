import { TraitEnum } from "src/Entity/Trait.ts/enum";
import { BuffsAndDebuffsEnum } from "src/Entity/BuffsAndDebuffs/enum";
import {
  ATTRIBUTE_KEYS,
  ELEMENT_KEYS,
  type AttributeKey,
  type ElementKey,
} from "src/InterFacesEnumsAndTypes/Enums";

export type EquipmentCraftingAttributes = {
  damage: {
    pDmg: number;
    pHit: number;
    pCrit: number;
    slash: number;
    pierce: number;
    blunt: number;
    mDmg: number;
    mHit: number;
    mCrit: number;
    order: number;
    chaos: number;
    fire: number;
    earth: number;
    water: number;
    wind: number;
  };
  defense: {
    pDef: number;
    slash: number;
    pierce: number;
    blunt: number;
    mDef: number;
    order: number;
    chaos: number;
    fire: number;
    earth: number;
    water: number;
    wind: number;
  };
  dodge: number;
  attributes: Record<AttributeKey, number>;
  elements: Record<ElementKey, number>;
  saves: Record<AttributeKey, number>;
  vitals: {
    hp: number;
    mp: number;
    sp: number;
  };
  needs: {
    moodBonus: number;
    energyBonus: number;
    satietyBonus: number;
  };
  planarAttunement: number;
  traits: TraitEnum[];
  buffsAndDebuffs: BuffsAndDebuffsEnum[];
  tags: string[];
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<U>
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

const ZERO_DAMAGE = {
  pDmg: 0,
  pHit: 0,
  pCrit: 0,
  slash: 0,
  pierce: 0,
  blunt: 0,
  mDmg: 0,
  mHit: 0,
  mCrit: 0,
  order: 0,
  chaos: 0,
  fire: 0,
  earth: 0,
  water: 0,
  wind: 0,
};

const ZERO_DEFENSE = {
  pDef: 0,
  slash: 0,
  pierce: 0,
  blunt: 0,
  mDef: 0,
  order: 0,
  chaos: 0,
  fire: 0,
  earth: 0,
  water: 0,
  wind: 0,
};

const ZERO_ATTRIBUTES = Object.fromEntries(
  ATTRIBUTE_KEYS.map((key) => [key, 0]),
) as Record<AttributeKey, number>;

const ZERO_ELEMENTS = Object.fromEntries(
  ELEMENT_KEYS.map((key) => [key, 0]),
) as Record<ElementKey, number>;

const ZERO_SAVES = { ...ZERO_ATTRIBUTES };

const ZERO_VITALS = {
  hp: 0,
  mp: 0,
  sp: 0,
};

export function createEquipmentCraftingAttributes(
  overrides: DeepPartial<EquipmentCraftingAttributes> = {},
): EquipmentCraftingAttributes {
  const base: EquipmentCraftingAttributes = {
    damage: { ...ZERO_DAMAGE },
    defense: { ...ZERO_DEFENSE },
    dodge: 0,
    attributes: { ...ZERO_ATTRIBUTES },
    elements: { ...ZERO_ELEMENTS },
    saves: { ...ZERO_SAVES },
    vitals: { ...ZERO_VITALS },
    needs: {
      moodBonus: 0,
      energyBonus: 0,
      satietyBonus: 0,
    },
    planarAttunement: 0,
    traits: [],
    buffsAndDebuffs: [],
    tags: [],
  };

  return mergeAttributes(base, overrides);
}

function mergeAttributes<T>(base: T, overrides: DeepPartial<T>): T {
  const result: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };

  for (const key in overrides) {
    if (!Object.prototype.hasOwnProperty.call(overrides, key)) continue;
    const overrideValue = overrides[key];
    if (overrideValue === undefined) continue;

    if (Array.isArray(overrideValue)) {
      result[key] = [...overrideValue];
      continue;
    }

    if (overrideValue !== null && typeof overrideValue === "object") {
      const baseValue = (base as any)[key];
      result[key] = mergeAttributes(
        baseValue ?? {},
        overrideValue as DeepPartial<typeof baseValue>,
      );
      continue;
    }

    result[key] = overrideValue;
  }

  return result;
}