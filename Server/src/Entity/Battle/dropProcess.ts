import { Party } from "../Party/Party";
import { BattleType, battleTypeConfig } from "./types";
import type { Character } from "../Character/Character";
import { CharacterEquipmentSlot } from "../../InterFacesEnumsAndTypes/Enums";
import { remove } from "../Item/Equipment/remove";
import type { ItemId } from "../Item/type";
import type { EquipmentId } from "../Item/Equipment/types";
import { rollTwenty } from "../../Utils/Dice";
import { statMod } from "../../Utils/statMod";
import { mobDropTables } from "../Character/MOBs/dropTables";
import { MOBEnum } from "../Character/MOBs/enums";
import { QuestProgressTracker } from "../Quest/QuestProgressTracker";

/**
 * Loot pool item - item that will be distributed to winning party
 */
type LootPoolItem = {
  itemId: ItemId | string;
  quantity: number;
  isEquipment: boolean;
  slot?: CharacterEquipmentSlot;
};

type DropProcessResult = {
    winner: ItemDropAndLootResult[];
    loser: ItemDropAndLootResult[];
};

type ItemDropAndLootResult = {
    characterId: string;
    itemsGained: { itemId: ItemId | string; quantity: number }[];
    itemsLost: { itemId: ItemId | string; quantity: number }[];
}

/**
 * Process loot and drops from battle
 * Combines LOOT (from defeated party) and DROP (from MOB drop tables)
 * Returns the loot pool for reporting purposes
 */
export function dropProcess(
  winner: Party,
  defeated: Party,
  battleType: BattleType,
): DropProcessResult {
  const config = battleTypeConfig[battleType];
  
  // If battle type doesn't allow loot, return empty
  if (!config.allowLoot) {
    return {
        winner: [],
        loser: [],
    };
  }

  const lootPool: LootPoolItem[] = [];
  const winnerResult: ItemDropAndLootResult[] = [];
  const loserResult: ItemDropAndLootResult[] = [];

  // ============================================================
  // PART 1: LOOT SYSTEM (From Defeated Party)
  // ============================================================
  const losingCharacters = defeated.getCharacters();
  
  for (const character of losingCharacters) {
    // DC7 Luck Save
    const luckSave = character.rollSave("luck");
    if (luckSave < 7) {
      // Character drops something
      const dropped = processLootDrop(character);
      if (dropped) {
        loserResult.push({
            characterId: character.id,
            itemsGained: [],
            itemsLost: [{ itemId: dropped.itemId, quantity: dropped.quantity }],
        })
        lootPool.push(dropped);
      }
    }
  }

  // ============================================================
  // PART 2: DROP SYSTEM (From MOB Drop Tables)
  // ============================================================
  const winningCharacters = winner.getCharacters();
  
  for (const character of losingCharacters) {
    // Check if character is a MOB
    if ((character as any).isMob === true) {
      const mobDrops = processMOBDrops(character, winningCharacters);
      lootPool.push(...mobDrops);
    }
  }

  // ============================================================
  // PART 3: DISTRIBUTE LOOT
  // ============================================================
  if (lootPool.length > 0) {
    const distributionResult = distributeLoot(winner, lootPool);
    winnerResult.push(...distributionResult);
  }

  return {
    winner: winnerResult,
    loser: loserResult,
  };
}

/**
 * Process loot drop from a single character (LOOT system)
 * Returns the dropped item or null
 */
function processLootDrop(character: Character): LootPoolItem | null {
  // Get all droppable items
  const inventoryItems: Array<{ itemId: ItemId | string; quantity: number }> = [];
  const equipmentItems: Array<{ itemId: ItemId | string; slot: CharacterEquipmentSlot }> = [];

  // Collect inventory items
  for (const [itemId, quantity] of character.inventory.entries()) {
    if (quantity > 0) {
      inventoryItems.push({ itemId, quantity });
    }
  }

  // Collect equipped items
  const equipmentSlots: CharacterEquipmentSlot[] = [
    CharacterEquipmentSlot.headWear,
    CharacterEquipmentSlot.body,
    CharacterEquipmentSlot.leg,
    CharacterEquipmentSlot.hand,
    CharacterEquipmentSlot.foot,
    CharacterEquipmentSlot.util,
    CharacterEquipmentSlot.ringL,
    CharacterEquipmentSlot.ringR,
    CharacterEquipmentSlot.earL,
    CharacterEquipmentSlot.earR,
    CharacterEquipmentSlot.neck,
    CharacterEquipmentSlot.rightHand,
    CharacterEquipmentSlot.leftHand,
  ];

  for (const slot of equipmentSlots) {
    const equippedId = character.equipments[slot];
    if (equippedId) {
      equipmentItems.push({ itemId: equippedId, slot });
    }
  }

  // If no items available, return null
  if (inventoryItems.length === 0 && equipmentItems.length === 0) {
    return null;
  }

  // Roll D20 to determine source: 1-4 = equipment (20%), 5-20 = inventory (80%)
  const sourceRoll = rollTwenty().total;
  let selectedItem: { itemId: ItemId | string; quantity?: number; slot?: CharacterEquipmentSlot } | null = null;

  if (sourceRoll >= 1 && sourceRoll <= 4 && equipmentItems.length > 0) {
    // Drop from equipment (20% chance)
    const selected = equipmentItems[Math.floor(Math.random() * equipmentItems.length)];
    if (selected) {
      selectedItem = { itemId: selected.itemId, slot: selected.slot };
    }
  } else if (inventoryItems.length > 0) {
    // Drop from inventory (80% chance, or fallback if no equipment)
    const selected = inventoryItems[Math.floor(Math.random() * inventoryItems.length)];
    if (selected) {
      selectedItem = { itemId: selected.itemId, quantity: selected.quantity };
    }
  } else if (equipmentItems.length > 0) {
    // Fallback: if inventory is empty but equipment exists, drop equipment
    const selected = equipmentItems[Math.floor(Math.random() * equipmentItems.length)];
    if (selected) {
      selectedItem = { itemId: selected.itemId, slot: selected.slot };
    }
  }

  if (!selectedItem) {
    return null;
  }

  // Remove item from character
  if (selectedItem.slot) {
    // Equipment: unequip first, then remove from inventory
    // Only equipment items can be removed via remove() function
    const success = remove(character, selectedItem.itemId as EquipmentId, selectedItem.slot);
    if (success) {
      // Remove from inventory (unequip puts it back in inventory)
      const inInventory = character.inventory.get(selectedItem.itemId) ?? 0;
      if (inInventory > 0) {
        character.removeItemFromInventory(selectedItem.itemId, 1);
        return { itemId: selectedItem.itemId, quantity: 1, isEquipment: true };
      }
      return { itemId: selectedItem.itemId, quantity: 1, isEquipment: true };
    }
  } else if (selectedItem.quantity !== undefined) {
    // Inventory: remove directly
    character.removeItemFromInventory(selectedItem.itemId, 1);
    return { itemId: selectedItem.itemId, quantity: 1, isEquipment: false };
  }

  return null;
}

/**
 * Process MOB drops from drop tables (DROP system)
 * Returns array of dropped items
 */
function processMOBDrops(
  mobCharacter: Character,
  winningCharacters: Character[],
): LootPoolItem[] {
  const drops: LootPoolItem[] = [];

  // Try to identify MOB type from character ID
  // MOB IDs are formatted as: `${MOBEnum}_${uuid}`
  const mobIdMatch = mobCharacter.id.match(/^([^_]+)_/);
  if (!mobIdMatch) {
    return drops; // Can't identify MOB type
  }

  const mobIdString = mobIdMatch[1];
  const mobId = Object.values(MOBEnum).find((id) => id === mobIdString) as MOBEnum | undefined;
  
  if (!mobId || !mobDropTables[mobId]) {
    return drops; // MOB not found in drop tables
  }

  const dropTable = mobDropTables[mobId];
  
  // Process each drop entry in the table
  for (const dropEntry of dropTable.drops) {
    // Find highest artisan skill in winning party for this drop's bonusArtisan
    let highestArtisanMod = 0;
    let highestLuckMod = 0;

    for (const winner of winningCharacters) {
      const artisanMod = statMod(winner.artisans.getTotal(dropEntry.bonusArtisan));
      const luckMod = statMod(winner.attribute.getTotal("luck"));
      
      if (artisanMod > highestArtisanMod) {
        highestArtisanMod = artisanMod;
      }
      if (luckMod > highestLuckMod) {
        highestLuckMod = luckMod;
      }
    }

    // Roll D20 + Luck Mod + Artisan Mod
    const roll = rollTwenty();
    const rollValue = roll.total;
    const total = rollValue + highestLuckMod + highestArtisanMod;

    // Check critical rolls
    if (rollValue === 1) {
      // Nat 1: Auto fail, no drop
      continue;
    }

    if (rollValue === 20) {
      // Nat 20: Success, drop 2x amount
      drops.push({
        itemId: dropEntry.item,
        quantity: dropEntry.amount * 2,
        isEquipment: false,
        slot: undefined,
      });
      continue;
    }

    // Normal roll: check against DC
    if (total >= dropEntry.dc) {
      drops.push({
        itemId: dropEntry.item,
        quantity: dropEntry.amount,
        isEquipment: false,
        slot: undefined,
      });
    }
  }

  return drops;
}

/**
 * Distribute loot to winning party (shuffle + round-robin)
 * Returns array of ItemDropAndLootResult tracking what each winner received
 */
function distributeLoot(winner: Party, lootPool: LootPoolItem[]): ItemDropAndLootResult[] {
  const winningCharacters = winner.getCharacters();
  const result: ItemDropAndLootResult[] = [];
  
  if (winningCharacters.length === 0 || lootPool.length === 0) {
    return result;
  }

  // Initialize result entries for each winner
  const winnerMap = new Map<string, ItemDropAndLootResult>();
  for (const char of winningCharacters) {
    winnerMap.set(char.id, {
      characterId: char.id,
      itemsGained: [],
      itemsLost: [],
    });
  }

  // Shuffle winning party order
  const shuffled: Character[] = winningCharacters.filter((c): c is Character => c !== undefined && c !== null);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }

  // Distribute round-robin
  let currentIndex = 0;
  for (const loot of lootPool) {
    if (shuffled.length === 0) break;
    const recipient = shuffled[currentIndex % shuffled.length];
    if (recipient) {
      recipient.addItemToInventory(loot.itemId, loot.quantity);
      
      // Update quest progress for collect objectives
      QuestProgressTracker.onItemAcquired(recipient, loot.itemId, loot.quantity, "loot");
      
      // Track what this winner received
      const winnerEntry = winnerMap.get(recipient.id);
      if (winnerEntry) {
        winnerEntry.itemsGained.push({
          itemId: loot.itemId,
          quantity: loot.quantity,
        });
      }
      
      currentIndex++;
    }
  }

  // Convert map to array
  return Array.from(winnerMap.values());
}
