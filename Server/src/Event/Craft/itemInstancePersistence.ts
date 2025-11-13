import { db } from "src/Database/connection";
import { itemInstances } from "src/Database/Schema/item_instances";
import type { BlueprintId } from "src/Entity/Blueprint/enum";
import type { ItemId } from "src/Entity/Item/type";
import { Weapon } from "src/Entity/Item/Equipment/Weapon/Weapon";
import { Armor } from "src/Entity/Item/Equipment/Armor/Armor";
import type { CraftMaterialSelection } from "./types";
import Report from "src/Utils/Reporter";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import type { EquipmentModifier } from "src/Entity/Item/Equipment/type";
import { TraitEnum } from "src/Entity/Trait.ts/enum";

type PersistContext = {
  instanceId: string;
  blueprintId: BlueprintId;
  baseItemId: ItemId;
  equipment: Weapon | Armor;
  crafterId?: string | null;
  materialSelection: CraftMaterialSelection;
};

export async function persistCraftedItemInstance({
  instanceId,
  blueprintId,
  baseItemId,
  equipment,
  crafterId,
  materialSelection,
}: PersistContext): Promise<void> {
  const itemType = equipment instanceof Weapon ? "weapon" : "armor";
  const itemData =
    equipment instanceof Weapon
      ? {
          weaponData: equipment.weaponData,
          cost: serializeItemCost(equipment.cost),
          weight: equipment.weight,
        }
      : {
          armorData: equipment.armorData,
          cost: serializeItemCost(equipment.cost),
          weight: equipment.weight,
        };
  const modifiers = serializeEquipmentModifier(equipment.modifier);
  const selection = sanitizeMaterialSelection(materialSelection);
  const baseItemIdString: string = String(baseItemId);

  try {
    await db
      .insert(itemInstances)
      .values({
        id: instanceId,
        itemType,
        baseItemId: baseItemIdString,
        crafterId: crafterId ?? null,
        blueprintId,
        materialSelection: selection,
        itemData,
        modifiers,
      })
      .onConflictDoNothing();
  } catch (error) {
    Report.error("❌ Failed to persist crafted item instance", {
      instanceId,
      error,
    });
  }
}

export function serializeEquipmentModifier(
  modifier: EquipmentModifier,
): Record<string, unknown> {
  return {
    attributes: modifier.attributes ?? {},
    proficiencies: modifier.proficiencies ?? {},
    artisans: modifier.artisans ?? {},
    battleStatus: modifier.battleStatus ?? {},
    saves: modifier.saves ?? {},
    vitals: modifier.vitals ?? {},
    buffsAndDebuffs: modifier.buffsAndDebuffs
      ? Object.fromEntries(modifier.buffsAndDebuffs.entries())
      : {},
    traits: modifier.traits ?? [],
  };
}

export function deserializeEquipmentModifier(
  data: Record<string, unknown> | null | undefined,
): EquipmentModifier {
  if (!data) {
    return {};
  }

  const modifier: EquipmentModifier = {
    attributes: (data.attributes as Record<string, number>) ?? {},
    proficiencies: (data.proficiencies as Record<string, number>) ?? {},
    artisans: (data.artisans as Record<string, number>) ?? {},
    battleStatus: (data.battleStatus as Record<string, number>) ?? {},
    saves: (data.saves as Record<string, number>) ?? {},
    vitals: (data.vitals as Record<string, number>) ?? {},
    traits: (data.traits as TraitEnum[]) ?? [],
  };

  const buffs = data.buffsAndDebuffs as Record<string, number> | undefined;
  if (buffs) {
    modifier.buffsAndDebuffs = new Map(Object.entries(buffs)) as Map<any, number>;
  }

  return modifier;
}

export function sanitizeMaterialSelection(
  selection: CraftMaterialSelection,
): Record<string, string> | null {
  const entries = Object.entries(selection).filter(
    ([, value]) => value !== undefined,
  ) as Array<[string, string]>;

  return entries.length > 0 ? Object.fromEntries(entries) : null;
}

function serializeItemCost(cost: ItemCost): Record<string, unknown> {
  return {
    baseCost: cost.baseCost,
    bonusCost: cost.bonusCost ?? 0,
    cost: cost.cost ?? cost.baseCost + (cost.bonusCost ?? 0),
    marketCost: cost.marketCost ?? cost.cost ?? 0,
    numberOfSellThisWeek: cost.numberOfSellThisWeek ?? 0,
    possibleDeviation: cost.possibleDeviation ?? 0,
    seasonalDeviation: cost.seasonalDeviation ?? {},
  };
}

export function deserializeItemCost(
  data: Record<string, unknown> | null | undefined,
): ItemCost {
  if (!data) {
    return new ItemCost();
  }

  return new ItemCost({
    baseCost: typeof data.baseCost === "number" ? data.baseCost : undefined,
    bonusCost: typeof data.bonusCost === "number" ? data.bonusCost : undefined,
    cost: typeof data.cost === "number" ? data.cost : undefined,
    marketCost: typeof data.marketCost === "number" ? data.marketCost : undefined,
    numberOfSellThisWeek:
      typeof data.numberOfSellThisWeek === "number" ? data.numberOfSellThisWeek : undefined,
    possibleDeviation:
      typeof data.possibleDeviation === "number" ? data.possibleDeviation : undefined,
    seasonalDeviation: (data.seasonalDeviation as Record<string, number>) ?? undefined,
  });
}

