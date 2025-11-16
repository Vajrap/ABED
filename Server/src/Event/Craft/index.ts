import {
  IngotBlueprint,
  WeaponBlueprint,
  ArmorBlueprint,
  RefinementBlueprint,
  GemCuttingBlueprint,
} from "src/Entity/Blueprint/Blueprint";
import { blueprintRepository } from "src/Entity/Blueprint/repository";
import { Character } from "src/Entity/Character/Character";
import type { ItemId } from "src/Entity/Item/type";
import { craftIngot } from "./ingot";
import { craftWeapon } from "./weapon";
import { craftArmor } from "./armor";
import { craftRefinement } from "./refinement";
import { craftGem } from "./gem";
import { itemRepository } from "src/Entity/Item/repository";
import { getItem } from "src/Entity/Item";

/**
 * Determines how many items to craft based on strategy and available materials
 */
function determineCraftQuantity(
  blueprint: IngotBlueprint | RefinementBlueprint,
  actor: Character,
  strategy: "craftInRange" | "craftAll" | "craftOne",
  quantityLow: number,
  quantityHigh: number,
): number {
  // First, calculate how many we CAN craft based on available materials
  let maxPossibleCrafts = Infinity;

  for (const [itemId, neededPerCraft] of blueprint.needed.entries()) {
    if (!neededPerCraft) continue;

    const available = actor.inventory.get(itemId) || 0;
    const possibleFromThisItem = Math.floor(available / neededPerCraft);
    maxPossibleCrafts = Math.min(maxPossibleCrafts, possibleFromThisItem);
  }

  if (maxPossibleCrafts === Infinity || maxPossibleCrafts === 0) {
    return 0; // No materials available
  }

  // Now apply strategy
  switch (strategy) {
    case "craftOne":
      return Math.min(1, maxPossibleCrafts);

    case "craftAll":
      return maxPossibleCrafts;

    case "craftInRange":
      // Craft between quantityLow and quantityHigh, but not more than possible
      const targetQuantity = Math.floor(
        Math.random() * (quantityHigh - quantityLow + 1) + quantityLow,
      );
      return Math.min(targetQuantity, maxPossibleCrafts);

    default:
      return 0;
  }
}

/**
 * Processes a character's crafting preferences during crafting period
 * Only executes for player characters
 * Loops through all 4 slots and executes immediately for non-null blueprints
 * Returns a map of item ids and the amount of items crafted
*/
// TODO: Actually, we have multiple characters helping each other craft, so we need to handle that. Should be helping in like... each character roll their own dice and use the highest + mod
export function processCharacterCraftingPreferences(mainActor: Character, otherCharacters: Character[]): Map<ItemId | string, number> {
    // TODO: Deal with other characters
    void otherCharacters
  // Only player characters craft (NPCs skip to avoid calculation overhead)
  if (!mainActor.userId) {
    return new Map();
  }

  const craftingList = mainActor.behavior.craftingPreference.craftingList;
  let totalCrafted:Map<ItemId | string, number> = new Map();

  // Loop through slots 1-4 in order
  for (const slotNumber of [1, 2, 3, 4] as const) {
    const slot = craftingList[slotNumber];
    if (!slot.bluePrintID) continue;

    const blueprint = blueprintRepository[slot.bluePrintID];


    // Handle Refinement, Craft multiple
    if (blueprint instanceof IngotBlueprint || blueprint instanceof RefinementBlueprint) {
      const craftQuantity = determineCraftQuantity(
        blueprint,
        mainActor,
        slot.strategy,
        slot.quantityLow,
        slot.quantityHigh,
      );
      if (craftQuantity === 0) {
        continue; // Can't craft any, skip to next slot
      }
      for (let i = 0; i < craftQuantity; i++) {
        if (blueprint instanceof IngotBlueprint) {
          const result = craftIngot(mainActor, blueprint);
          if ("item" in result) {
            const existing = totalCrafted.get(result.item.id) || 0;
            totalCrafted.set(result.item.id, existing + result.amount);
          }
        } else {
          const result = craftRefinement(mainActor, blueprint);
          if ("item" in result) {
            const item = getItem(result.item.id)
            if (!item) {
              continue;
            }
            const existing = totalCrafted.get(item.id) || 0;
            totalCrafted.set(result.item.id, existing + result.amount);
          }
        }
      }
      continue;
    }

    if (blueprint instanceof GemCuttingBlueprint) {
      const result = craftGem(mainActor, blueprint);
      if (result.item) {
        const existing = totalCrafted.get(result.item.id) || 0;
        totalCrafted.set(result.item.id, existing + result.amount);
      }
      continue;
    }

    // Handle WeaponBlueprint
    if (blueprint instanceof WeaponBlueprint) {
      if (!slot.materialSelection) {
        continue;
      }

      const result = craftWeapon(mainActor, blueprint, slot.materialSelection);
      if ("item" in result) {
        const existing = totalCrafted.get(result.item.id) || 0;
        totalCrafted.set(result.item.id, existing + result.amount);
      }

      continue;
    }

    // Handle ArmorBlueprint
    if (blueprint instanceof ArmorBlueprint) {
      if (!slot.materialSelection) {
        continue;
      }

      const result = craftArmor(mainActor, blueprint, slot.materialSelection);
      if ("item" in result) {
        const existing = totalCrafted.get(result.item.id) || 0;
        totalCrafted.set(result.item.id, existing + result.amount);
      }

      continue;
    }

    continue;
  }

  return totalCrafted;
}