import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { statMod } from "src/Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { getItem } from "../../../../Item/repository";
import { getEquipment } from "../../../../Item/Equipment/repository";
import { GemId } from "../../../../Item/Misc";
import { BuffEnum, DebuffEnum } from "../../../../BuffsAndDebuffs/enum";
import { randomUUID } from "crypto";
import { getItemInstance } from "../../../../Item/Equipment/ItemInstance/repository";
import { cloneWeaponInstance, cloneArmorInstance, registerCraftedEquipment } from "../../../../../Event/Craft/equipmentCraftingUtils";
import type { Equipment } from "../../../../Item/Equipment/Equipment";
import { Weapon } from "../../../../Item/Equipment/Weapon/Weapon";
import { Armor } from "../../../../Item/Equipment/Armor/Armor";

/**
 * Handle Enchanting action
 * - Requires item selection (equipment with gem slots) and gem selection
 * - Success check: D20 + artisan mod vs DC (higher DC for better gems)
 * - Consumes gem and item
 * - Creates new enchanted item instance with gem slotted
 * - On failure: small chance to apply curse debuff
 */
export function handleEnchantingAction(
  character: Character,
  context: NewsContext,
  itemId?: string,
  gemId?: GemId,
): News[] {
  const news: News[] = [];

  // Find equipment item with gem slots in inventory
  let targetItem: Equipment | null = null;
  let targetItemId: string | null = null;
  let hasGemSlots = false;

  if (itemId) {
    const item = getItem(itemId);
    if (item && (item instanceof Weapon || item instanceof Armor)) {
      targetItem = item as Equipment;
      targetItemId = itemId;
      // Check if item has gem slots
      if (item instanceof Weapon) {
        hasGemSlots = (item.weaponData.gemSlots || 0) > 0;
      } else if (item instanceof Armor) {
        hasGemSlots = (item.armorData.gemSlots || 0) > 0;
      }
    }
  } else {
    // Find first equipment item with gem slots
    for (const [invItemId, quantity] of character.inventory.entries()) {
      if (quantity > 0) {
        const item = getItem(invItemId);
        if (item && (item instanceof Weapon || item instanceof Armor)) {
          const equipment = item as Equipment;
          let slots = 0;
          if (equipment instanceof Weapon) {
            slots = equipment.weaponData.gemSlots || 0;
          } else if (equipment instanceof Armor) {
            slots = equipment.armorData.gemSlots || 0;
          }
          if (slots > 0) {
            targetItem = equipment;
            targetItemId = invItemId as string;
            hasGemSlots = true;
            break;
          }
        }
      }
    }
  }

  if (!targetItem || !targetItemId || !hasGemSlots) {
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} attempted enchanting but doesn't have an item with gem slots.`,
          th: `${character.name?.th || character.name} พยายามใส่เวทย์มนตร์แต่ไม่มีไอเทมที่มีช่องใส่อัญมณี`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Find gem in inventory
  let selectedGem: GemId | null = null;
  const gemIds = Object.values(GemId) as GemId[];

  if (gemId && gemIds.includes(gemId)) {
    const gemQuantity = character.inventory.get(gemId) || 0;
    if (gemQuantity > 0) {
      selectedGem = gemId;
    }
  } else {
    // Find first available gem
    for (const gem of gemIds) {
      const gemQuantity = character.inventory.get(gem) || 0;
      if (gemQuantity > 0) {
        selectedGem = gem;
        break;
      }
    }
  }

  if (!selectedGem) {
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} attempted enchanting but doesn't have a gem.`,
          th: `${character.name?.th || character.name} พยายามใส่เวทย์มนตร์แต่ไม่มีอัญมณี`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Determine DC based on gem tier (simplified: better gems = higher DC)
  // For now, use base DC 15, can be enhanced with gem tier system
  const baseDC = 15;
  const gemTierModifier = 2; // Placeholder: better gems would have higher modifier
  const dc = baseDC + gemTierModifier;

  // Get artisan stat mod
  const artisanStat = character.artisans.getTotal("enchanting");
  const artisanMod = statMod(artisanStat);

  // Roll D20 + artisan mod vs DC
  // Use character.rollTwenty to apply bless/curse automatically, then add artisan mod
  const successRoll = character.rollTwenty({}) + artisanMod;

  // Consume gem regardless of success/failure
  const gemQuantity = character.inventory.get(selectedGem) || 0;
  if (gemQuantity > 0) {
    const newQuantity = gemQuantity - 1;
    if (newQuantity <= 0) {
      character.inventory.delete(selectedGem);
    } else {
      character.inventory.set(selectedGem, newQuantity);
    }
  }

  // Consume original item
  const itemQuantity = character.inventory.get(targetItemId) || 0;
  if (itemQuantity > 0) {
    const newQuantity = itemQuantity - 1;
    if (newQuantity <= 0) {
      character.inventory.delete(targetItemId);
    } else {
      character.inventory.set(targetItemId, newQuantity);
    }
  }

  // Apply needs changes: Energy -6, Mood -2 (strenuous activity)
  character.needs.decEnergy(6);
  character.needs.decMood(2);

  if (successRoll >= dc) {
    // Success: Create enchanted item instance
    // For now, create a new instance ID and add to inventory
    // In the future, this should properly track gem slots and gem effects
    const enchantedInstanceId = `enchant_${character.id}_${Date.now()}_${randomUUID().slice(0, 8)}`;
    
    // Clone the item and create enchanted version
    let enchantedItem: Equipment;
    if (targetItem instanceof Weapon) {
      enchantedItem = cloneWeaponInstance(targetItem);
    } else {
      enchantedItem = cloneArmorInstance(targetItem as Armor);
    }
    
    // Set instance ID
    enchantedItem.setInstanceId(enchantedInstanceId);
    if (targetItem.baseItemId) {
      enchantedItem.setBaseItemId(targetItem.baseItemId);
    }
    
    // Register in item instance repository
    if (targetItem.baseItemId) {
      registerCraftedEquipment(enchantedInstanceId, enchantedItem, targetItem.baseItemId);
    }
    
    // Add to character's item instances and inventory
    character.itemInstances.set(enchantedInstanceId, targetItem.baseItemId || targetItem.id as any);
    character.inventory.set(enchantedInstanceId, (character.inventory.get(enchantedInstanceId) || 0) + 1);

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} successfully enchanted an item with ${selectedGem}!`,
          th: `${character.name?.th || character.name} ใส่เวทย์มนตร์ไอเทมด้วย ${selectedGem} สำเร็จ!`,
        },
        context,
        significance: NewsSignificance.MAJOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  } else {
    // Failure: resources consumed, small chance for curse
    // Random selection - don't apply bless/curse
    const curseChance = character.roll({ amount: 1, face: 20, applyBlessCurse: false });
    if (curseChance === 1) {
      // Apply curse debuff (1-2 phases)
      const curseEntry = character.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed) ?? {
        value: 0,
        counter: 0,
        isPerm: true,
        permValue: 0,
      };
      curseEntry.isPerm = true;
      // Random quantity - don't apply bless/curse
      curseEntry.permValue = (curseEntry.permValue || 0) + character.roll({ amount: 1, face: 2, applyBlessCurse: false }); // 1-2 phases
      character.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.cursed, curseEntry);

      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted enchanting but failed catastrophically. A curse has been placed upon them!`,
            th: `${character.name?.th || character.name} พยายามใส่เวทย์มนตร์แต่ล้มเหลวอย่างร้ายแรง คำสาปถูกวางไว้กับพวกเขา!`,
          },
          context,
          significance: NewsSignificance.MAJOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    } else {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted enchanting but failed. The gem and item were consumed.`,
            th: `${character.name?.th || character.name} พยายามใส่เวทย์มนตร์แต่ล้มเหลว อัญมณีและไอเทมถูกใช้ไป`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }
  }

  return news;
}

