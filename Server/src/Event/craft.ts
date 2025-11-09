import {
  Blueprint,
  IngotBlueprint,
  WeaponBlueprint,
  MaterialType,
} from "src/Entity/Blueprint/Blueprint";
import { BlueprintId } from "src/Entity/Blueprint/enum";
import { blueprintRepository } from "src/Entity/Blueprint/repository";
import { Character } from "src/Entity/Character/Character";
import { Item, ItemId } from "src/Entity/Item";
import { IngotId, PlankId, BoneId, ResourceId } from "src/Entity/Item/Misc";
import { resourceCraftMap } from "src/Entity/Item/Misc/Resource/Ingot/craftMap";
import { itemRepository } from "src/Entity/Repository/Item";

/**
 * Checks if an ItemId matches a MaterialType category
 * E.g., IngotId.IronIngot matches MaterialType.Ingot
 */
function itemMatchesMaterialType(
  itemId: ItemId,
  materialType: MaterialType,
): boolean {
  switch (materialType) {
    case MaterialType.Ingot:
      return Object.values(IngotId).includes(itemId as IngotId);
    case MaterialType.Plank:
      return Object.values(PlankId).includes(itemId as PlankId);
    case MaterialType.Bone:
      return Object.values(BoneId).includes(itemId as BoneId);
    default:
      return false;
  }
}

function validateArtisanLevel(blueprint: Blueprint, actor: Character): boolean {
  return actor.artisans.getTotal(blueprint.artisanType) >= blueprint.difficulty;
}

/**
 * Validates that the player's material selection matches the blueprint requirements
 * Returns true if all required components have valid material selections
 */
function validateWeaponMaterialSelection(
  blueprint: WeaponBlueprint,
  materialSelection:
    | Partial<{
        blade: ItemId;
        handle: ItemId;
        grip: ItemId;
        guard: ItemId;
        core: ItemId;
      }>
    | undefined,
): boolean {
  if (!materialSelection) {
    return false; // No material selection provided
  }

  if (blueprint.component.blade) {
    if (!materialSelection.blade) return false;
    const acceptedTypes = blueprint.component.blade.resource;
    const matches = acceptedTypes.some((type) =>
      itemMatchesMaterialType(materialSelection.blade!, type),
    );
    if (!matches) return false;
  }

  if (blueprint.component.handle) {
    if (!materialSelection.handle) return false;
    const acceptedTypes = blueprint.component.handle.resource;
    const matches = acceptedTypes.some((type) =>
      itemMatchesMaterialType(materialSelection.handle!, type),
    );
    if (!matches) return false;
  }

  if (blueprint.component.grip) {
    if (!materialSelection.grip) return false;
    const acceptedTypes = blueprint.component.grip.resource;
    const matches = acceptedTypes.some((type) =>
      itemMatchesMaterialType(materialSelection.grip!, type),
    );
    if (!matches) return false;
  }

  if (blueprint.component.guard) {
    if (!materialSelection.guard) return false;
    const acceptedTypes = blueprint.component.guard.resource;
    const matches = acceptedTypes.some((type) =>
      itemMatchesMaterialType(materialSelection.guard!, type),
    );
    if (!matches) return false;
  }

  if (blueprint.component.core) {
    if (!materialSelection.core) return false;
    const acceptedTypes = blueprint.component.core.resource;
    const matches = acceptedTypes.some((type) =>
      itemMatchesMaterialType(materialSelection.core!, type),
    );
    if (!matches) return false;
  }

  return true;
}

/**
 * Determines how many items to craft based on strategy and available materials
 */
function determineCraftQuantity(
  blueprint: IngotBlueprint,
  actor: Character,
  strategy: "craftInRange" | "craftAll" | "craftOne",
  quantityLow: number,
  quantityHigh: number,
): number {
  // First, calculate how many we CAN craft based on available materials
  let maxPossibleCrafts = Infinity;

  for (const [itemId, neededPerCraft] of Object.entries(blueprint.needed)) {
    if (!neededPerCraft) continue;

    const available = actor.inventory.get(itemId as ItemId) || 0;
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
 * Crafts a single item from a blueprint
 * Consumes materials and adds the result item to inventory
 *
 * @param actor - The character attempting to craft
 * @param blueprintId - The blueprint to craft from
 * @param materialSelection - For weapon blueprints: specific materials to use for each component
 * @returns Meaningful CraftResult text
 */

type CraftSuccess = {
  item: Item;
  amount: number;
};

type CraftFail = {
  reason: string;
};

type CraftResult = CraftSuccess | CraftFail;

export function craft(
  actor: Character,
  blueprintId: BlueprintId,
  materialSelection?: Partial<{
    blade: ItemId;
    handle: ItemId;
    grip: ItemId;
    guard: ItemId;
    core: ItemId;
  }>,
): CraftResult {
  const blueprint: Blueprint = blueprintRepository[blueprintId];
  if (!validateArtisanLevel(blueprint, actor)) {
    return { reason: "Insufficient artisan level" };
  }

  if (blueprint instanceof IngotBlueprint) {
    const newActorInventory = new Map(actor.inventory);
    for (const [itemId, quantityNeeded] of Object.entries(blueprint.needed)) {
      if (!quantityNeeded) continue;

      const actorItem = actor.inventory.get(itemId as ItemId) || 0;
      if (actorItem < quantityNeeded) {
        return { reason: "Not enough materials" };
      }
    }

    for (const [itemId, quantityNeeded] of Object.entries(blueprint.needed)) {
      if (!quantityNeeded) continue;

      const currentQuantity = newActorInventory.get(itemId as ItemId) || 0;
      const newQuantity = currentQuantity - quantityNeeded;

      if (newQuantity <= 0) {
        newActorInventory.delete(itemId as ItemId);
      } else {
        newActorInventory.set(itemId as ItemId, newQuantity);
      }
    }

    const resultItemId = blueprint.resultItemId;
    const currentResult = newActorInventory.get(resultItemId) || 0;
    newActorInventory.set(resultItemId, currentResult + 1);

    actor.inventory = newActorInventory;

    return { item: itemRepository[blueprint.resultItemId], amount: 1 };
  } else if (blueprint instanceof WeaponBlueprint) {
    // Validate material selection
    if (!validateWeaponMaterialSelection(blueprint, materialSelection)) {
      return { reason: "Invalid or missing material selection" };
    }

    if (!materialSelection) {
      return { reason: "Material selection is required for weapon crafting" };
    }

    // Create a copy of inventory to modify
    const newActorInventory = new Map(actor.inventory);

    // Collect required materials based on materialSelection
    const materialsNeeded: Map<ItemId, number> = new Map();

    if (blueprint.component.blade && materialSelection.blade) {
      const current = materialsNeeded.get(materialSelection.blade) || 0;
      materialsNeeded.set(
        materialSelection.blade,
        current + blueprint.component.blade.amount,
      );
    }

    if (blueprint.component.handle && materialSelection.handle) {
      const current = materialsNeeded.get(materialSelection.handle) || 0;
      materialsNeeded.set(
        materialSelection.handle,
        current + blueprint.component.handle.amount,
      );
    }

    if (blueprint.component.grip && materialSelection.grip) {
      const current = materialsNeeded.get(materialSelection.grip) || 0;
      materialsNeeded.set(
        materialSelection.grip,
        current + blueprint.component.grip.amount,
      );
    }

    if (blueprint.component.guard && materialSelection.guard) {
      const current = materialsNeeded.get(materialSelection.guard) || 0;
      materialsNeeded.set(
        materialSelection.guard,
        current + blueprint.component.guard.amount,
      );
    }

    if (blueprint.component.core && materialSelection.core) {
      const current = materialsNeeded.get(materialSelection.core) || 0;
      materialsNeeded.set(
        materialSelection.core,
        current + blueprint.component.core.amount,
      );
    }

    // Check if we have all required materials
    for (const [itemId, quantityNeeded] of materialsNeeded.entries()) {
      const available = actor.inventory.get(itemId) || 0;
      if (available < quantityNeeded) {
        return { reason: "Not enough materials" };
      }
    }

    // Consume materials
    for (const [itemId, quantityNeeded] of materialsNeeded.entries()) {
      const currentQuantity = newActorInventory.get(itemId) || 0;
      const newQuantity = currentQuantity - quantityNeeded;

      if (newQuantity <= 0) {
        newActorInventory.delete(itemId);
      } else {
        newActorInventory.set(itemId, newQuantity);
      }
    }

    // TODO: Create weapon using craftWeapon function
    // For now, we'll need to implement the full weapon creation logic
    // This requires creating a Weapon instance with calculated stats based on materials

    // Update actor's inventory
    actor.inventory = newActorInventory;

    // return { item: itemRepository[blueprint.], amount: 1 };
    // TODO: This needs to create actual new instance of the weapon
    return { reason: "Weapon crafting not implemented" };
  }

  return { reason: "Invalid blueprint" };
}

/**
 * Rounds a dice face value to the nearest allowed even value
 * Formula: 4 + value, if result is odd (has decimal when divided by 2), subtract 1
 * Allowed values: 4, 6, 8, 10, 12, 14, 16, 18, 20 (even numbers from 4-20)
 */
function roundDiceFaceToAllowed(face: number): number {
  // Ensure minimum is 4
  if (face < 4) {
    return 4;
  }

  // If the value divided by 2 has a decimal (i.e., it's odd), subtract 1 to make it even
  const isOdd = (face / 2) % 1 !== 0;
  const roundedFace = isOdd ? face - 1 : face;

  // Ensure maximum is 20
  return Math.min(Math.max(roundedFace, 4), 20);
}

function craftWeapon(data: {
  blade?: { material: ResourceId; amount: number };
  handle?: { material: ResourceId; amount: number };
  grip?: { material: ResourceId; amount: number };
  guard?: { material: ResourceId; amount: number };
  core?: { material: ResourceId; amount: number };
  actor: Character;
}) {
  // we get all those things, blades, handles, grips, guards, cores, and we need to craft them all, and then we need to combine them all into a weapon.
  // all the stats will be calculated based on the materials used on each part.

  // Start with base damage dice: 1d4 for both physical and magical
  const baseFace = 4;
  let totalPhysicalDamage = 0;
  let totalMagicalDamage = 0;

  // Accumulate damage from all components (only if they exist)
  // Blade contributes to damage
  if (data.blade) {
    const bladeDamage = resourceCraftMap[data.blade.material].damage;
    totalPhysicalDamage += bladeDamage.p;
    totalMagicalDamage += bladeDamage.m;
  }

  // Handle, grip, guard, and core also contribute
  if (data.handle) {
    const handleDamage = resourceCraftMap[data.handle.material].damage;
    totalPhysicalDamage += handleDamage.p;
    totalMagicalDamage += handleDamage.m;
  }

  if (data.grip) {
    const gripDamage = resourceCraftMap[data.grip.material].damage;
    totalPhysicalDamage += gripDamage.p;
    totalMagicalDamage += gripDamage.m;
  }

  if (data.guard) {
    const guardDamage = resourceCraftMap[data.guard.material].damage;
    totalPhysicalDamage += guardDamage.p;
    totalMagicalDamage += guardDamage.m;
  }

  if (data.core) {
    const coreDamage = resourceCraftMap[data.core.material].damage;
    totalPhysicalDamage += coreDamage.p;
    totalMagicalDamage += coreDamage.m;
  }

  // Calculate final dice faces: base face + accumulated damage
  const physicalFace = baseFace + totalPhysicalDamage;
  const magicalFace = baseFace + totalMagicalDamage;

  // Round down to allowed values: 4, 6, 8, 10, 12, 14, 16, 18, 20
  const finalPhysicalFace = roundDiceFaceToAllowed(physicalFace);
  const finalMagicalFace = roundDiceFaceToAllowed(magicalFace);

  // Final damage dice
  const physicalDamageDice = { dice: 1, face: finalPhysicalFace };
  const magicalDamageDice = { dice: 1, face: finalMagicalFace };

  // TODO: Continue with weapon creation using these damage dice

  return {
    physicalDamageDice,
    magicalDamageDice,
  };
}

/**
 * Processes a character's crafting preferences during crafting period
 * Only executes for player characters
 * Loops through all 4 slots and executes immediately for non-null blueprints
 *
 * @param actor - The character whose crafting preferences to process
 * @returns Total number of items crafted across all slots
 */

export function processCharacterCraftingPreferences(actor: Character): number {
  // Only player characters craft (NPCs skip to avoid calculation overhead)
  if (!actor.userId) {
    return 0;
  }

  const craftingList = actor.behavior.craftingPreference.craftingList;
  let totalCrafted = 0;

  // Loop through slots 1-4 in order
  for (const slotNumber of [1, 2, 3, 4] as const) {
    const slot = craftingList[slotNumber];

    // Skip if blueprint ID is null
    if (!slot.bluePrintID) {
      continue;
    }

    const blueprintId = slot.bluePrintID;
    const blueprint = blueprintRepository[blueprintId];

    // Handle IngotBlueprint
    if (blueprint instanceof IngotBlueprint) {
      // Determine how many to craft based on strategy
      const craftQuantity = determineCraftQuantity(
        blueprint,
        actor,
        slot.strategy,
        slot.quantityLow,
        slot.quantityHigh,
      );

      if (craftQuantity === 0) {
        continue; // Can't craft any, skip to next slot
      }

      // Execute crafting immediately (craft one at a time)
      let craftedThisSlot = 0;
      for (let i = 0; i < craftQuantity; i++) {
        const result = craft(actor, blueprintId);
        if ("item" in result) {
          craftedThisSlot += result.amount;
        } else {
          // Ran out of materials mid-craft, stop
          break;
        }
      }

      totalCrafted += craftedThisSlot;
      continue;
    }

    // Handle WeaponBlueprint
    if (blueprint instanceof WeaponBlueprint) {
      // Weapon blueprints require material selection
      if (!slot.materialSelection) {
        continue; // No material selection, skip
      }

      // Validate material selection
      if (!validateWeaponMaterialSelection(blueprint, slot.materialSelection)) {
        continue; // Invalid material selection, skip
      }

      // For weapons, we always craft one at a time (or based on strategy)
      // Since weapon crafting is more complex, we'll simplify to "craftOne" for now
      // TODO: Implement quantity calculation for weapon crafting
      const result = craft(actor, blueprintId, slot.materialSelection);
      if ("item" in result) {
        totalCrafted += result.amount;
      }

      continue;
    }

    // If we reach here, the blueprint type is not handled
    // (This shouldn't happen, but handle gracefully)
    continue;
  }

  return totalCrafted;
}
