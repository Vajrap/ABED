import {MaterialType, WeaponBlueprint} from "src/Entity/Blueprint/Blueprint";
import {Character} from "src/Entity/Character/Character";
import {BoneId, ClothId, GemId, IngotId, LeatherId, PlankId, SkinId, ThreadId,} from "src/Entity/Item/Misc";
import type {ItemId} from "src/Entity/Item/type";
import type {EquipmentId} from "src/Entity/Item/Equipment/types";
import type {CraftMaterialSelection, CraftResult} from "./types";
import {itemRepository} from "src/Entity/Item/repository";
import {statMod} from "src/Utils/statMod";
import {
    createEquipmentCraftingAttributes,
    type EquipmentCraftingAttributes,
} from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";
import {type AttributeKey, ELEMENT_KEYS, type ElementKey, EquipmentSlot,} from "src/InterFacesEnumsAndTypes/Enums";
import {TierEnum} from "src/InterFacesEnumsAndTypes/Tiers";
import {
    appendUnique,
    applyDamageDiceSteps,
    calculateMaterialSuccess,
    cloneWeaponInstance,
    computeCraftingFee,
    computeMaterialCost,
    convertCraftingAttributesToModifier,
    determineGemSlots,
    generateEquipmentInstanceId,
    mergeEquipmentAttributes,
    mergeEquipmentModifiers,
    registerCraftedEquipment,
    resolveBlueprintId,
    resolveWeaponByBlueprint,
} from "./equipmentCraftingUtils";
import {ARMOR_SLOT_BONUS_PROFILE} from "./armorBonusConfig";
import {ItemCost} from "src/Entity/Item/Subclass/ItemCost";
import {persistCraftedItemInstance} from "./itemInstancePersistence";
import Report from "src/Utils/Reporter";
import { QuestProgressTracker } from "../../Entity/Quest/QuestProgressTracker";

const weaponComponentOrder = ["blade", "handle", "grip", "guard", "core"] as const;
type WeaponComponentKey = (typeof weaponComponentOrder)[number];

type ComponentCraftResult = {
  successes: number;
  attributes: EquipmentCraftingAttributes;
  physicalDamageSteps: number;
  magicalDamageSteps: number;
};

type ComponentProjector = (
  source: EquipmentCraftingAttributes,
  target: EquipmentCraftingAttributes,
  successes: number,
) => void;

type DamageKey = keyof EquipmentCraftingAttributes["damage"];
type DefenseKey = keyof EquipmentCraftingAttributes["defense"];
type NeedKey = keyof EquipmentCraftingAttributes["needs"];
type VitalKey = keyof EquipmentCraftingAttributes["vitals"];

const BLADE_DAMAGE_KEYS: DamageKey[] = [
  "pDmg",
  "pHit",
  "pCrit",
  "slash",
  "pierce",
  "mDmg",
  "order",
  "chaos",
  "fire",
  "earth",
  "water",
  "wind",
];

const GRIP_DAMAGE_KEYS: DamageKey[] = ["pHit", "mHit", "pCrit", "mCrit"];

const GUARD_DEFENSE_KEYS: DefenseKey[] = [
  "pDef",
  "slash",
  "pierce",
  "blunt",
  "order",
  "chaos",
  "fire",
  "earth",
  "water",
  "wind",
];

const CORE_DAMAGE_KEYS: DamageKey[] = [
  "pDmg",
  "pHit",
  "pCrit",
  "mDmg",
  "mHit",
  "mCrit",
  "blunt",
  "order",
  "chaos",
  "fire",
  "earth",
  "water",
  "wind",
];

const HANDLE_ATTRIBUTE_KEYS: AttributeKey[] = ["charisma", "dexterity", "control"];
const HANDLE_NEED_KEYS: NeedKey[] = ["moodBonus", "energyBonus"];
const CORE_ELEMENT_KEYS: ElementKey[] = [...ELEMENT_KEYS];
const NEED_KEYS: NeedKey[] = ["moodBonus", "energyBonus", "satietyBonus"];
const VITAL_KEYS: VitalKey[] = ["hp", "mp", "sp"];

const allowedWeaponMaterialsByComponent: Record<WeaponComponentKey, ReadonlySet<MaterialType>> = {
  blade: new Set([MaterialType.Ingot, MaterialType.Bone, MaterialType.Plank, MaterialType.Gem]),
  handle: new Set([
    MaterialType.Plank,
    MaterialType.Bone,
    MaterialType.Leather,
    MaterialType.Thread,
    MaterialType.Skin,
  ]),
  grip: new Set([
    MaterialType.Leather,
    MaterialType.Thread,
    MaterialType.Cloth,
    MaterialType.Skin,
  ]),
  guard: new Set([MaterialType.Ingot, MaterialType.Bone, MaterialType.Plank, MaterialType.Gem]),
  core: new Set([MaterialType.Ingot, MaterialType.Bone, MaterialType.Gem, MaterialType.Plank]),
};

export function craftWeapon(
  actor: Character,
  blueprint: WeaponBlueprint,
  materialSelection: CraftMaterialSelection | undefined,
): CraftResult {
  if (!materialSelection) {
    return { reason: "Invalid or missing material selection" };
  }

  const updatedInventory = new Map(actor.inventory);
  const materialUsage: Map<ItemId, number> = new Map();

  for (const componentKey of weaponComponentOrder) {
    const component = blueprint.component[componentKey];
    if (!component) continue;

    const selection = materialSelection[componentKey];
    if (!selection) {
      return { reason: "Invalid or missing material selection" };
    }

    const matchedType = component.resource.find((type) =>
      itemMatchesMaterialType(selection, type),
    );
    if (!matchedType) {
      return { reason: "Invalid or missing material selection" };
    }

    const allowedMaterials = allowedWeaponMaterialsByComponent[componentKey];
    if (!allowedMaterials.has(matchedType)) {
      return { reason: "Invalid or missing material selection" };
    }

    materialUsage.set(
      selection,
      (materialUsage.get(selection) ?? 0) + component.amount,
    );

    const currentQuantity = updatedInventory.get(selection) || 0;
    if (currentQuantity < component.amount) {
      return { reason: "Not enough materials" };
    }

    const newQuantity = currentQuantity - component.amount;
    if (newQuantity === 0) {
      updatedInventory.delete(selection);
    } else {
      updatedInventory.set(selection, newQuantity);
    }
  }

  actor.inventory = updatedInventory;

  return startWeaponCraftingCalculation(actor, blueprint, materialSelection, materialUsage);
}

function startWeaponCraftingCalculation(
  actor: Character,
  blueprint: WeaponBlueprint,
  materialSelection: CraftMaterialSelection,
  materialUsage: Map<ItemId, number>,
): CraftResult {
  const artisanBonus = statMod(actor.artisans.getTotal(blueprint.artisanType));

  const componentResults: ComponentCraftResult[] = [];

  if (blueprint.component.blade && materialSelection.blade) {
    componentResults.push(
      craftBlade(materialSelection.blade, blueprint.component.blade.amount, artisanBonus),
    );
  }

  if (blueprint.component.handle && materialSelection.handle) {
    componentResults.push(
      craftHandle(materialSelection.handle, blueprint.component.handle.amount, artisanBonus),
    );
  }

  if (blueprint.component.grip && materialSelection.grip) {
    componentResults.push(
      craftGrip(materialSelection.grip, blueprint.component.grip.amount, artisanBonus),
    );
  }

  if (blueprint.component.guard && materialSelection.guard) {
    componentResults.push(
      craftGuard(materialSelection.guard, blueprint.component.guard.amount, artisanBonus),
    );
  }

  if (blueprint.component.core && materialSelection.core) {
    componentResults.push(
      craftCore(materialSelection.core, blueprint.component.core.amount, artisanBonus),
    );
  }

  const totalBonuses = createEquipmentCraftingAttributes();
  let physicalDamageStepBonus = 0;
  let magicalDamageStepBonus = 0;

  for (const result of componentResults) {
    mergeEquipmentAttributes(totalBonuses, result.attributes);
    physicalDamageStepBonus += result.physicalDamageSteps;
    magicalDamageStepBonus += result.magicalDamageSteps;
  }

  const blueprintId = resolveBlueprintId(blueprint);
  if (!blueprintId) {
    return { reason: "Unknown weapon blueprint" };
  }

  const baseWeapon = resolveWeaponByBlueprint(blueprintId);
  if (!baseWeapon) {
    return { reason: "Blueprint not linked to a weapon definition" };
  }

  const craftedWeapon = cloneWeaponInstance(baseWeapon);

  const newPhysicalDice = applyDamageDiceSteps(
    craftedWeapon.weaponData.damage.physicalDamageDice,
    physicalDamageStepBonus,
  );
  const newMagicalDice = applyDamageDiceSteps(
    craftedWeapon.weaponData.damage.magicalDamageDice,
    magicalDamageStepBonus,
  );

  craftedWeapon.weaponData = {
    ...craftedWeapon.weaponData,
    damage: {
      ...craftedWeapon.weaponData.damage,
      physicalDamageDice: newPhysicalDice,
      magicalDamageDice: newMagicalDice,
    },
  };

  craftedWeapon.weight = Math.max(1, craftedWeapon.weight + blueprint.weightModifier);

  const modifierDelta = convertCraftingAttributesToModifier(totalBonuses);
  craftedWeapon.modifier = mergeEquipmentModifiers(craftedWeapon.modifier, modifierDelta);
  craftedWeapon.equipmentCraftingAttributes = totalBonuses;

  const materialCost = computeMaterialCost(materialUsage);
  const smithingFee = computeCraftingFee(blueprint.tier);
  const newBaseCost = materialCost + smithingFee;
  const existingBonusCost = craftedWeapon.cost.bonusCost ?? 0;
    craftedWeapon.cost = new ItemCost({
      baseCost: newBaseCost,
      bonusCost: existingBonusCost,
      cost: newBaseCost + existingBonusCost,
      marketCost: Math.round((newBaseCost + existingBonusCost) * 1.1),
      numberOfSellThisWeek: craftedWeapon.cost.numberOfSellThisWeek,
      possibleDeviation: craftedWeapon.cost.possibleDeviation,
      seasonalDeviation: craftedWeapon.cost.seasonalDeviation,
  });

  const gemProfile = ARMOR_SLOT_BONUS_PROFILE[EquipmentSlot.weapon]?.gemSlot;
  const updatedGemSlots = determineGemSlots(
    craftedWeapon.weaponData.gemSlots ?? 0,
    gemProfile,
    artisanBonus,
  );
  craftedWeapon.weaponData = {
    ...craftedWeapon.weaponData,
    gemSlots: updatedGemSlots,
  };

  // Store the base item ID before we change the id to the unique instance ID
  const baseItemId = craftedWeapon.id as EquipmentId;
  const instanceId = generateEquipmentInstanceId(blueprintId, actor.id);
  
  // Register the crafted equipment (this sets id = instanceId and baseItemId = baseItemId)
  registerCraftedEquipment(instanceId, craftedWeapon, baseItemId);
  
  // Use the unique instance ID for inventory and tracking
  // addItemInstance maps instanceId -> baseItemId for lookup
  actor.addItemInstance(instanceId, baseItemId);
  actor.addItemToInventory(instanceId, 1);
  
  // Update quest progress for craft objectives
  QuestProgressTracker.onItemAcquired(actor, baseItemId, 1, "craft");

  if (process.env.NODE_ENV !== "test") {
    void persistCraftedItemInstance({
      instanceId,
      blueprintId,
      baseItemId: baseItemId,
      equipment: craftedWeapon,
      crafterId: actor.id,
      materialSelection,
    }).catch((error) => {
      Report.error("❌ Failed to persist crafted weapon instance", {
        instanceId,
        error,
      });
    });
  }

  return { item: craftedWeapon, amount: 1 };
}

function craftBlade(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
): ComponentCraftResult {
  const result = craftComponent(resourceId, amount, artisanBonus, (source, target, successes) => {
    addDamageBonuses(target, source, successes, BLADE_DAMAGE_KEYS);
  });

  const item = itemRepository[resourceId];
  if (item?.equipmentCraftingAttributes) {
    const materialDamage = item.equipmentCraftingAttributes.damage;
    if (result.successes > 0) {
      result.physicalDamageSteps += (materialDamage.pDmg ?? 0) * result.successes;
      result.magicalDamageSteps += (materialDamage.mDmg ?? 0) * result.successes;
    }
  }

  return result;
}

function craftHandle(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
): ComponentCraftResult {
  return craftComponent(resourceId, amount, artisanBonus, (source, target, successes) => {
    addAttributeBonuses(target, source, successes, HANDLE_ATTRIBUTE_KEYS);
    addNeedsBonuses(target, source, successes, HANDLE_NEED_KEYS);
  });
}

function craftGrip(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
): ComponentCraftResult {
  return craftComponent(resourceId, amount, artisanBonus, (source, target, successes) => {
    addDamageBonuses(target, source, successes, GRIP_DAMAGE_KEYS);
    addDodgeBonus(target, source, successes);
  });
}

function craftGuard(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
): ComponentCraftResult {
  return craftComponent(resourceId, amount, artisanBonus, (source, target, successes) => {
    addDefenseBonuses(target, source, successes, GUARD_DEFENSE_KEYS);
    addDodgeBonus(target, source, successes);
  });
}

function craftCore(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
): ComponentCraftResult {
  const result = craftComponent(resourceId, amount, artisanBonus, (source, target, successes) => {
    addDamageBonuses(target, source, successes, CORE_DAMAGE_KEYS);
    addElementBonuses(target, source, successes, CORE_ELEMENT_KEYS);
    addPlanarAttunement(target, source, successes);
    addVitals(target, source, successes);
  });

  const item = itemRepository[resourceId];
  if (item?.equipmentCraftingAttributes && result.successes > 0) {
    const materialDamage = item.equipmentCraftingAttributes.damage;
    result.physicalDamageSteps += (materialDamage.pDmg ?? 0) * result.successes;
    result.magicalDamageSteps += (materialDamage.mDmg ?? 0) * result.successes;
  }

  return result;
}

function craftComponent(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
  projector: ComponentProjector,
): ComponentCraftResult {
  const item = itemRepository[resourceId];
  
  if (!item?.equipmentCraftingAttributes) {
    return {
      successes: 0,
      attributes: createEquipmentCraftingAttributes(),
      physicalDamageSteps: 0,
      magicalDamageSteps: 0,
    };
  }

  const successes = calculateComponentSuccesses(amount, artisanBonus, item.tier);
  const attributes = createEquipmentCraftingAttributes();

  if (successes > 0) {
    projector(item.equipmentCraftingAttributes, attributes, successes);
    appendUnique(attributes.traits, item.equipmentCraftingAttributes.traits);
    appendUnique(attributes.buffsAndDebuffs, item.equipmentCraftingAttributes.buffsAndDebuffs);
    appendUnique(attributes.tags, item.equipmentCraftingAttributes.tags);
  }

  return { successes, attributes, physicalDamageSteps: 0, magicalDamageSteps: 0 };
}

function calculateComponentSuccesses(_amount: number, artisanBonus: number, tier: TierEnum): number {
  return calculateMaterialSuccess(artisanBonus, tier);
}

function addDamageBonuses(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
  keys: DamageKey[],
): void {
  for (const key of keys) {
    const bonus = source.damage[key];
    if (bonus !== 0) {
      target.damage[key] += bonus * successes;
    }
  }
}

function addDefenseBonuses(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
  keys: DefenseKey[],
): void {
  for (const key of keys) {
    const bonus = source.defense[key];
    if (bonus !== 0) {
      target.defense[key] += bonus * successes;
    }
  }
}

function addAttributeBonuses(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
  keys: AttributeKey[],
): void {
  for (const key of keys) {
    const bonus = source.attributes[key];
    if (bonus !== 0) {
      target.attributes[key] += bonus * successes;
    }
  }
}

function addNeedsBonuses(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
  keys: NeedKey[],
): void {
  for (const key of keys) {
    const bonus = source.needs[key];
    if (bonus !== 0) {
      target.needs[key] += bonus * successes;
    }
  }
}

function addElementBonuses(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
  keys: ElementKey[],
): void {
  for (const key of keys) {
    const bonus = source.elements[key];
    if (bonus !== 0) {
      target.elements[key] += bonus * successes;
    }
  }
}

function addVitals(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
): void {
  for (const key of VITAL_KEYS) {
    const bonus = source.vitals[key];
    if (bonus !== 0) {
      target.vitals[key] += bonus * successes;
    }
  }
}

function addDodgeBonus(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
): void {
  if (source.dodge !== 0) {
    target.dodge += source.dodge * successes;
  }
}

function addPlanarAttunement(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  successes: number,
): void {
  if (source.planarAttunement !== 0) {
    target.planarAttunement += source.planarAttunement * successes;
  }
}


function itemMatchesMaterialType(itemId: ItemId, materialType: MaterialType): boolean {
  switch (materialType) {
    case MaterialType.Ingot:
      return Object.values(IngotId).includes(itemId as IngotId);
    case MaterialType.Plank:
      return Object.values(PlankId).includes(itemId as PlankId);
    case MaterialType.Bone:
      return Object.values(BoneId).includes(itemId as BoneId);
    case MaterialType.Leather:
      return Object.values(LeatherId).includes(itemId as LeatherId);
    case MaterialType.Thread:
      return Object.values(ThreadId).includes(itemId as ThreadId);
    case MaterialType.Cloth:
      return Object.values(ClothId).includes(itemId as ClothId);
    case MaterialType.Skin:
      return Object.values(SkinId).includes(itemId as SkinId);
    case MaterialType.Gem:
      return Object.values(GemId).includes(itemId as GemId);
    default:
      return false;
  }
}