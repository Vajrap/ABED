import { ArmorBlueprint, MaterialType } from "src/Entity/Blueprint/Blueprint";
import { Character } from "src/Entity/Character/Character";
import {
  IngotId,
  PlankId,
  BoneId,
  LeatherId,
  ThreadId,
  ClothId,
  SkinId,
  GemId,
} from "src/Entity/Item/Misc";
import { itemRepository } from "src/Entity/Repository/Item";
import type { ItemId } from "src/Entity/Item/type";
import type { CraftMaterialSelection, CraftResult } from "./types";
import {
  appendUnique,
  calculateMaterialSuccess,
  cloneArmorInstance,
  computeCraftingFee,
  computeMaterialCost,
  convertCraftingAttributesToModifier,
  determineGemSlots,
  generateEquipmentInstanceId,
  mergeEquipmentAttributes,
  mergeEquipmentModifiers,
  registerCraftedEquipment,
  resolveArmorByBlueprint,
  resolveBlueprintId,
} from "./equipmentCraftingUtils";
import {
  createEquipmentCraftingAttributes,
  type EquipmentCraftingAttributes,
} from "src/Entity/Item/Misc/Resource/EquipmentCraftingAttributes";
import { statMod } from "src/Utils/statMod";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { EquipmentSlot, ATTRIBUTE_KEYS, ELEMENT_KEYS } from "src/InterFacesEnumsAndTypes/Enums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ARMOR_SLOT_BONUS_PROFILE } from "./armorBonusConfig";
import { persistCraftedItemInstance } from "./itemInstancePersistence";
import Report from "src/Utils/Reporter";

const armorComponentOrder = ["primary", "secondary", "tertiary", "accent"] as const;

const allowedArmorMaterialsByComponent: Partial<Record<typeof armorComponentOrder[number], ReadonlySet<MaterialType>>> = {
  primary: new Set([
    MaterialType.Ingot,
    MaterialType.Leather,
    MaterialType.Cloth,
    MaterialType.Plank,
    MaterialType.Bone,
    MaterialType.Skin,
  ]),
  secondary: new Set([
    MaterialType.Cloth,
    MaterialType.Leather,
    MaterialType.Thread,
    MaterialType.Plank,
    MaterialType.Bone,
    MaterialType.Skin,
  ]),
  tertiary: new Set([
    MaterialType.Cloth,
    MaterialType.Leather,
    MaterialType.Thread,
    MaterialType.Gem,
    MaterialType.Skin,
  ]),
  accent: new Set([MaterialType.Thread, MaterialType.Cloth, MaterialType.Gem, MaterialType.Skin]),
};

export function craftArmor(
  actor: Character,
  blueprint: ArmorBlueprint,
  materialSelection: CraftMaterialSelection | undefined,
): CraftResult {
  if (!materialSelection) {
    return { reason: "Invalid or missing material selection" };
  }

  const updatedInventory = new Map(actor.inventory);
  const materialUsage: Map<ItemId, number> = new Map();

  for (const requirement of blueprint.materials) {
    const selection = materialSelection[requirement.key];
    if (!selection) {
      return { reason: "Invalid or missing material selection" };
    }

    const matchedType = requirement.resource.find((type) =>
      itemMatchesMaterialType(selection, type),
    );
    if (!matchedType) {
      return { reason: "Invalid or missing material selection" };
    }

    const allowedMaterials = allowedArmorMaterialsByComponent[requirement.key];
    if (allowedMaterials && !allowedMaterials.has(matchedType)) {
      return { reason: "Invalid or missing material selection" };
    }

    materialUsage.set(
      selection,
      (materialUsage.get(selection) ?? 0) + requirement.amount,
    );

    const available = updatedInventory.get(selection) || 0;
    if (available < requirement.amount) {
      return { reason: "Not enough materials" };
    }

    const newQuantity = available - requirement.amount;
    if (newQuantity === 0) {
      updatedInventory.delete(selection);
    } else {
      updatedInventory.set(selection, newQuantity);
    }
  }

  actor.inventory = updatedInventory;

  return startArmorCraftingCalculation(actor, blueprint, materialSelection, materialUsage);
}

function startArmorCraftingCalculation(
  actor: Character,
  blueprint: ArmorBlueprint,
  materialSelection: CraftMaterialSelection,
  materialUsage: Map<ItemId, number>,
): CraftResult {
  const artisanBonus = statMod(actor.artisans.getTotal(blueprint.artisanType));

  const componentResults: ArmorComponentResult[] = [];
  for (const requirement of blueprint.materials) {
    const selection = materialSelection[requirement.key];
    if (!selection) continue;
    componentResults.push(
      craftArmorComponent(selection, requirement.amount, artisanBonus),
    );
  }

  const totalBonuses = createEquipmentCraftingAttributes();
  for (const result of componentResults) {
    mergeEquipmentAttributes(totalBonuses, result.attributes);
  }

  const blueprintId = resolveBlueprintId(blueprint);
  if (!blueprintId) {
    return { reason: "Unknown armor blueprint" };
  }

  const baseArmor = resolveArmorByBlueprint(blueprintId);
  if (!baseArmor) {
    return { reason: "Blueprint not linked to an armor definition" };
  }

  const craftedArmor = cloneArmorInstance(baseArmor);

  const modifierDelta = convertCraftingAttributesToModifier(totalBonuses);
  craftedArmor.modifier = mergeEquipmentModifiers(craftedArmor.modifier, modifierDelta);
  craftedArmor.equipmentCraftingAttributes = totalBonuses;

  const slotProfile = ARMOR_SLOT_BONUS_PROFILE[craftedArmor.slot];
  const updatedGemSlots = determineGemSlots(
    craftedArmor.armorData.gemSlots ?? 0,
    slotProfile?.gemSlot,
    artisanBonus,
  );
  craftedArmor.armorData = {
    ...craftedArmor.armorData,
    gemSlots: updatedGemSlots,
  };

  const materialCost = computeMaterialCost(materialUsage);
  const craftingFee = computeCraftingFee(blueprint.tier);
  const newBaseCost = materialCost + craftingFee;
  const existingBonusCost = craftedArmor.cost.bonusCost ?? 0;
  craftedArmor.cost = new ItemCost({
    baseCost: newBaseCost,
    bonusCost: existingBonusCost,
    cost: newBaseCost + existingBonusCost,
    marketCost: Math.round((newBaseCost + existingBonusCost) * 1.1),
    numberOfSellThisWeek: craftedArmor.cost.numberOfSellThisWeek,
    possibleDeviation: craftedArmor.cost.possibleDeviation,
    seasonalDeviation: craftedArmor.cost.seasonalDeviation,
  });

  const instanceId = generateEquipmentInstanceId(blueprintId, actor.id);
  registerCraftedEquipment(instanceId, craftedArmor);
  actor.addItemInstance(instanceId, craftedArmor.id);
  actor.addItemToInventory(craftedArmor.id, 1);

  if (process.env.NODE_ENV !== "test") {
    void persistCraftedItemInstance({
      instanceId,
      blueprintId,
      baseItemId: craftedArmor.id,
      equipment: craftedArmor,
      crafterId: actor.id,
      materialSelection,
    }).catch((error) => {
      Report.error("❌ Failed to persist crafted armor instance", {
        instanceId,
        error,
      });
    });
  }

  return { item: craftedArmor, amount: 1 };
}

function craftArmorComponent(
  resourceId: ItemId,
  amount: number,
  artisanBonus: number,
): ArmorComponentResult {
  const item = itemRepository[resourceId];

  if (!item?.equipmentCraftingAttributes) {
    return {
      successes: 0,
      attributes: createEquipmentCraftingAttributes(),
    };
  }

  const successes = calculateMaterialSuccess(artisanBonus, item.tier ?? TierEnum.common);
  const attributes = createEquipmentCraftingAttributes();

  if (successes > 0) {
    addEquipmentBonuses(attributes, item.equipmentCraftingAttributes, successes);
    appendUnique(attributes.traits, item.equipmentCraftingAttributes.traits);
    appendUnique(attributes.buffsAndDebuffs, item.equipmentCraftingAttributes.buffsAndDebuffs);
    appendUnique(attributes.tags, item.equipmentCraftingAttributes.tags);
  }

  return { successes, attributes };
}

function addEquipmentBonuses(
  target: EquipmentCraftingAttributes,
  source: EquipmentCraftingAttributes,
  multiplier: number,
): void {
  for (const key of Object.keys(target.damage) as Array<keyof EquipmentCraftingAttributes["damage"]>) {
    target.damage[key] += source.damage[key] * multiplier;
  }

  for (const key of Object.keys(target.defense) as Array<keyof EquipmentCraftingAttributes["defense"]>) {
    target.defense[key] += source.defense[key] * multiplier;
  }

  target.dodge += source.dodge * multiplier;

  for (const key of ATTRIBUTE_KEYS) {
    target.attributes[key] += source.attributes[key] * multiplier;
    target.saves[key] += source.saves[key] * multiplier;
  }

  for (const key of ELEMENT_KEYS) {
    target.elements[key] += source.elements[key] * multiplier;
  }

  const needKeys: Array<keyof EquipmentCraftingAttributes["needs"]> = [
    "moodBonus",
    "energyBonus",
    "satietyBonus",
  ];
  for (const key of needKeys) {
    target.needs[key] += source.needs[key] * multiplier;
  }

  const vitalKeys: Array<keyof EquipmentCraftingAttributes["vitals"]> = ["hp", "mp", "sp"];
  for (const key of vitalKeys) {
    target.vitals[key] += source.vitals[key] * multiplier;
  }

  target.planarAttunement += source.planarAttunement * multiplier;
}

type ArmorComponentResult = {
  successes: number;
  attributes: EquipmentCraftingAttributes;
};

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
