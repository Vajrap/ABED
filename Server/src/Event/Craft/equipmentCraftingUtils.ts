import { randomUUID } from "crypto";
import { BlueprintId } from "src/Entity/Blueprint/enum";
import type { Blueprint } from "src/Entity/Blueprint/Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import {
  ATTRIBUTE_KEYS,
  ELEMENT_KEYS,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { EquipmentModifier } from "src/Entity/Item/Equipment/type";
import type { EquipmentId } from "src/Entity/Item/Equipment/types";
import type { ItemId } from "src/Entity/Item/type";
import { Equipment } from "src/Entity/Item/Equipment/Equipment";
import { Weapon } from "src/Entity/Item/Equipment/Weapon/Weapon";
import { Armor } from "src/Entity/Item/Equipment/Armor/Armor";
import { weaponRepository } from "src/Entity/Item/Equipment/Weapon/repository";
import { blueprintRepository } from "src/Entity/Blueprint/repository";
import { bodyRepository } from "src/Entity/Item/Equipment/Armor/Body/repository";
import { headWearRepository } from "src/Entity/Item/Equipment/Armor/HeadWear/repository";
import { handRepository } from "src/Entity/Item/Equipment/Armor/Hand/repository";
import { legRepository } from "src/Entity/Item/Equipment/Armor/Leg/repository";
import { footRepository } from "src/Entity/Item/Equipment/Armor/Foot/repository";
import { earRepository } from "src/Entity/Item/Equipment/Armor/Ear/repository";
import { necklaceRepository } from "src/Entity/Item/Equipment/Armor/Neck/repository";
import { ringRepository } from "src/Entity/Item/Equipment/Armor/Ring/repository";
import { utilRepository } from "src/Entity/Item/Equipment/Armor/Util/repository";
import { itemInstanceRepository } from "src/Entity/Item/Equipment/ItemInstance/repository";
import { consumableRepository } from "src/Entity/Item/Consumable/repository";
import { miscRepository } from "src/Entity/Item/Misc/repository";
import { equipmentRepository } from "src/Entity/Item/Equipment/repository";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import type { EquipmentCraftingAttributes } from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";
import { roll } from "src/Utils/Dice";
import { difficultyTable } from "./difficultyTable";
import type { ArmorGemSlotProfile } from "./armorBonusConfig";

export const DAMAGE_DICE_LADDER: Array<{ dice: number; face: number }> = [
  { dice: 1, face: 4 },
  { dice: 1, face: 6 },
  { dice: 1, face: 8 },
  { dice: 1, face: 10 },
  { dice: 1, face: 12 },
  { dice: 2, face: 6 },
  { dice: 2, face: 8 },
  { dice: 2, face: 10 },
  { dice: 2, face: 12 },
  { dice: 3, face: 6 },
  { dice: 3, face: 8 },
  { dice: 3, face: 10 },
  { dice: 3, face: 12 },
  { dice: 4, face: 6 },
  { dice: 4, face: 8 },
  { dice: 4, face: 10 },
  { dice: 4, face: 12 },
];

export function applyDamageDiceSteps(
  baseDice: { dice: number; face: number },
  stepAdjustment: number,
): { dice: number; face: number } {
  if (stepAdjustment === 0) {
    return baseDice;
  }

  const baseIndex = DAMAGE_DICE_LADDER.findIndex(
    (entry) => entry.dice === baseDice.dice && entry.face === baseDice.face,
  );

  if (baseIndex === -1) {
    return baseDice;
  }

  const targetIndex = baseIndex + stepAdjustment;
  if (targetIndex < 0) {
    return DAMAGE_DICE_LADDER[0]!;
  }

  if (targetIndex >= DAMAGE_DICE_LADDER.length) {
    return DAMAGE_DICE_LADDER[DAMAGE_DICE_LADDER.length - 1]!;
  }

  return DAMAGE_DICE_LADDER[targetIndex]!;
}

const BASE_CRAFT_FEE = 100;
const CRAFT_FEE_MULTIPLIER: Record<TierEnum, number> = {
  [TierEnum.common]: 1,
  [TierEnum.uncommon]: 1.25,
  [TierEnum.rare]: 1.5,
  [TierEnum.epic]: 2,
  [TierEnum.legendary]: 3,
  [TierEnum.unique]: 4,
  [TierEnum.divine]: 5,
  [TierEnum.primordial]: 6,
};

export function cloneEquipmentModifier(
  modifier: EquipmentModifier = {},
): EquipmentModifier {
  return {
    attributes: modifier.attributes ? { ...modifier.attributes } : undefined,
    proficiencies: modifier.proficiencies ? { ...modifier.proficiencies } : undefined,
    artisans: modifier.artisans ? { ...modifier.artisans } : undefined,
    battleStatus: modifier.battleStatus ? { ...modifier.battleStatus } : undefined,
    saves: modifier.saves ? { ...modifier.saves } : undefined,
    vitals: modifier.vitals ? { ...modifier.vitals } : undefined,
    buffsAndDebuffs: modifier.buffsAndDebuffs ? new Map(modifier.buffsAndDebuffs) : undefined,
    traits: modifier.traits ? [...modifier.traits] : undefined,
  };
}

function mergeNumericRecord<T extends string>(
  base: Partial<Record<T, number>> | undefined,
  delta: Partial<Record<T, number>>,
): Partial<Record<T, number>> {
  const output: Partial<Record<T, number>> = { ...(base ?? {}) };
  for (const [key, value] of Object.entries(delta) as Array<[T, number]>) {
    if (value !== 0) {
      output[key] = (output[key] ?? 0) + value;
    }
  }
  return output;
}

export function mergeEquipmentModifiers(
  base: EquipmentModifier | undefined,
  delta: EquipmentModifier,
): EquipmentModifier {
  const result = cloneEquipmentModifier(base);

  if (delta.attributes) {
    result.attributes = mergeNumericRecord(result.attributes, delta.attributes);
  }

  if (delta.proficiencies) {
    result.proficiencies = mergeNumericRecord(result.proficiencies, delta.proficiencies);
  }

  if (delta.artisans) {
    result.artisans = mergeNumericRecord(result.artisans, delta.artisans);
  }

  if (delta.battleStatus) {
    result.battleStatus = mergeNumericRecord(result.battleStatus, delta.battleStatus);
  }

  if (delta.saves) {
    result.saves = mergeNumericRecord(result.saves, delta.saves);
  }

  if (delta.vitals) {
    result.vitals = mergeNumericRecord(result.vitals, delta.vitals);
  }

  if (delta.buffsAndDebuffs) {
    const baseMap = result.buffsAndDebuffs ?? new Map();
    for (const [key, value] of delta.buffsAndDebuffs.entries()) {
      baseMap.set(key, (baseMap.get(key) ?? 0) + value);
    }
    result.buffsAndDebuffs = baseMap;
  }

  if (delta.traits) {
    const baseTraits = new Set(result.traits ?? []);
    for (const trait of delta.traits) {
      baseTraits.add(trait);
    }
    result.traits = Array.from(baseTraits);
  }

  return result;
}

export function computeMaterialCost(materialUsage: Map<ItemId, number>): number {
  // Use individual repositories to avoid circular dependency with Item/repository.ts
  let total = 0;
  for (const [itemId, quantity] of materialUsage.entries()) {
    const item = 
      equipmentRepository[itemId as keyof typeof equipmentRepository] ||
      miscRepository[itemId as keyof typeof miscRepository] ||
      consumableRepository[itemId as keyof typeof consumableRepository];
    if (!item) continue;
    total += (item.cost.baseCost ?? 0) * quantity;
  }
  return total;
}

export function computeCraftingFee(tier: TierEnum): number {
  const multiplier = CRAFT_FEE_MULTIPLIER[tier] ?? 1;
  return Math.round(BASE_CRAFT_FEE * multiplier);
}

export function resolveBlueprintId(target: Blueprint): BlueprintId | undefined {
  for (const [id, entry] of Object.entries(blueprintRepository)) {
    if (entry === target) {
      return id as BlueprintId;
    }
  }
  return undefined;
}

export function resolveWeaponByBlueprint(blueprintId: BlueprintId): Weapon | undefined {
  return Object.values(weaponRepository).find(
    (weapon) => weapon.blueprintId === blueprintId,
  );
}

export function resolveArmorByBlueprint(blueprintId: BlueprintId): Armor | undefined {
  const sources: Armor[] = [
    ...Object.values(bodyRepository),
    ...Object.values(headWearRepository),
    ...Object.values(handRepository),
    ...Object.values(legRepository),
    ...Object.values(footRepository),
    ...Object.values(earRepository),
    ...Object.values(necklaceRepository),
    ...Object.values(ringRepository),
    ...Object.values(utilRepository),
  ];
  return sources.find((armor) => armor.blueprintId === blueprintId);
}

export function cloneWeaponInstance(base: Weapon): Weapon {
  const clone = Object.create(Object.getPrototypeOf(base)) as Weapon;
  Object.assign(clone, base);

  clone.weaponData = {
    ...base.weaponData,
    damage: {
      ...base.weaponData.damage,
      physicalDamageDice: { ...base.weaponData.damage.physicalDamageDice },
      magicalDamageDice: { ...base.weaponData.damage.magicalDamageDice },
    },
  };

  clone.modifier = cloneEquipmentModifier(base.modifier);
  clone.cost = new ItemCost({
    baseCost: base.cost.baseCost,
    bonusCost: base.cost.bonusCost,
    cost: base.cost.cost,
    marketCost: base.cost.marketCost,
    numberOfSellThisWeek: base.cost.numberOfSellThisWeek,
    possibleDeviation: base.cost.possibleDeviation,
    seasonalDeviation: base.cost.seasonalDeviation,
  });
  clone.equipmentCraftingAttributes = base.equipmentCraftingAttributes
    ? { ...base.equipmentCraftingAttributes }
    : undefined;

  clone.instanceId = null;
  return clone;
}

export function cloneArmorInstance(base: Armor): Armor {
  const clone = Object.create(Object.getPrototypeOf(base)) as Armor;
  Object.assign(clone, base);

  clone.armorData = {
    ...base.armorData,
    pDef: base.armorData.pDef ? { ...base.armorData.pDef } : undefined,
    mDef: base.armorData.mDef ? { ...base.armorData.mDef } : undefined,
    mAtk: base.armorData.mAtk ? { ...base.armorData.mAtk } : undefined,
    pAtk: base.armorData.pAtk ? { ...base.armorData.pAtk } : undefined,
    requirement: base.armorData.requirement ? { ...base.armorData.requirement } : undefined,
  };

  clone.modifier = cloneEquipmentModifier(base.modifier);
  clone.cost = new ItemCost({
    baseCost: base.cost.baseCost,
    bonusCost: base.cost.bonusCost,
    cost: base.cost.cost,
    marketCost: base.cost.marketCost,
    numberOfSellThisWeek: base.cost.numberOfSellThisWeek,
    possibleDeviation: base.cost.possibleDeviation,
    seasonalDeviation: base.cost.seasonalDeviation,
  });
  clone.equipmentCraftingAttributes = base.equipmentCraftingAttributes
    ? { ...base.equipmentCraftingAttributes }
    : undefined;

  clone.instanceId = null;
  return clone;
}

export function generateEquipmentInstanceId(
  blueprintId: BlueprintId,
  crafterId?: string | null,
): string {
  const prefix = crafterId ? `${crafterId}-` : "";
  return `${prefix}${blueprintId}-${randomUUID()}`;
}

export function registerCraftedEquipment(instanceId: string, equipment: Equipment, baseItemId: EquipmentId): void {
  // Store the original base item ID before changing the id to the unique instance ID
  equipment.setBaseItemId(baseItemId);
  // Set the unique instance ID as the main id
  equipment.setInstanceId(instanceId);
  itemInstanceRepository.set(instanceId, equipment as Weapon | Armor);
}

export function convertCraftingAttributesToModifier(
  bonuses: EquipmentCraftingAttributes,
): EquipmentModifier {
  const modifier: EquipmentModifier = {};

  if (Object.values(bonuses.attributes).some((value) => value !== 0)) {
    modifier.attributes = { ...bonuses.attributes };
  }

  const battleStatus: Record<string, number> = {};

  const damageBattleMap: Record<string, string> = {
    pDmg: "pATK",
    pHit: "pHIT",
    pCrit: "pCRT",
    mDmg: "mATK",
    mHit: "mHIT",
    mCrit: "mCRT",
    slash: "slashATK",
    pierce: "pierceATK",
    blunt: "bluntATK",
    order: "orderATK",
    chaos: "chaosATK",
    fire: "fireATK",
    earth: "earthATK",
    water: "waterATK",
    wind: "windATK",
  };

  for (const [key, statKey] of Object.entries(damageBattleMap)) {
    const value = bonuses.damage[key as keyof typeof bonuses.damage];
    if (value !== 0) {
      battleStatus[statKey] = (battleStatus[statKey] ?? 0) + value;
    }
  }

  const defenseBattleMap: Record<string, string> = {
    pDef: "pDEF",
    slash: "slashDEF",
    pierce: "pierceDEF",
    blunt: "bluntDEF",
    mDef: "mDEF",
    order: "orderDEF",
    chaos: "chaosDEF",
    fire: "fireDEF",
    earth: "earthDEF",
    water: "waterDEF",
    wind: "windDEF",
  };

  for (const [key, statKey] of Object.entries(defenseBattleMap)) {
    const value = bonuses.defense[key as keyof typeof bonuses.defense];
    if (value !== 0) {
      battleStatus[statKey] = (battleStatus[statKey] ?? 0) + value;
    }
  }

  if (bonuses.dodge !== 0) {
    battleStatus.dodge = (battleStatus.dodge ?? 0) + bonuses.dodge;
  }

  if (Object.keys(battleStatus).length > 0) {
    modifier.battleStatus = battleStatus;
  }

  if (Object.values(bonuses.saves).some((value) => value !== 0)) {
    modifier.saves = { ...bonuses.saves };
  }

  if (
    bonuses.vitals.hp !== 0 ||
    bonuses.vitals.mp !== 0 ||
    bonuses.vitals.sp !== 0
  ) {
    modifier.vitals = { ...bonuses.vitals };
  }

  if (bonuses.traits.length > 0) {
    modifier.traits = [...bonuses.traits];
  }

  if (bonuses.buffsAndDebuffs.length > 0) {
    modifier.buffsAndDebuffs = new Map(bonuses.buffsAndDebuffs.map((entry) => [entry, 1]));
  }

  return modifier;
}

export function mergeEquipmentAttributes(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
): void {
  for (const key of Object.keys(target.damage) as Array<keyof EquipmentCraftingAttributes["damage"]>) {
    target.damage[key] += source.damage[key];
  }

  for (const key of Object.keys(target.defense) as Array<keyof EquipmentCraftingAttributes["defense"]>) {
    target.defense[key] += source.defense[key];
  }

  target.dodge += source.dodge;

  for (const key of ATTRIBUTE_KEYS) {
    target.attributes[key] += source.attributes[key];
    target.saves[key] += source.saves[key];
  }

  for (const key of ELEMENT_KEYS) {
    target.elements[key] += source.elements[key];
  }

  const needKeys: Array<keyof EquipmentCraftingAttributes["needs"]> = [
    "moodBonus",
    "energyBonus",
    "satietyBonus",
  ];
  for (const key of needKeys) {
    target.needs[key] += source.needs[key];
  }

  const vitalKeys: Array<keyof EquipmentCraftingAttributes["vitals"]> = ["hp", "mp", "sp"];
  for (const key of vitalKeys) {
    target.vitals[key] += source.vitals[key];
  }

  target.planarAttunement += source.planarAttunement;
  appendUnique(target.traits, source.traits);
  appendUnique(target.buffsAndDebuffs, source.buffsAndDebuffs);
  appendUnique(target.tags, source.tags);
}

export function appendUnique<T>(target: T[], source: T[]): void {
  for (const entry of source) {
    if (!target.includes(entry)) {
      target.push(entry);
    }
  }
}

export function determineGemSlots(
  currentSlots: number,
  profile: ArmorGemSlotProfile | undefined,
  artisanBonus: number,
): number {
  if (!profile || profile.maxSlots <= currentSlots) {
    return currentSlots;
  }

  const attempt = roll(1).d(20).rolls[0] ?? 0;
  const total = attempt + artisanBonus;
  if (total >= profile.baseDC) {
    return Math.min(profile.maxSlots, currentSlots + 1);
  }

  return currentSlots;
}

export function calculateMaterialSuccess(
  artisanBonus: number,
  tier: TierEnum,
): number {
  const difficulty = difficultyTable[tier] ?? 10;
  const attempt = roll(1).d(20).rolls[0] ?? 0;
  return attempt + artisanBonus >= difficulty ? 1 : 0;
}

