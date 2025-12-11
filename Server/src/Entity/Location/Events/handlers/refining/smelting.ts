import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { blueprintRepository } from "src/Entity/Blueprint/repository";
import { BlueprintId } from "src/Entity/Blueprint/enum";
import type { IngotBlueprint } from "src/Entity/Blueprint/Blueprint";
import { statMod } from "src/Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { QuestProgressTracker } from "../../../../Quest/QuestProgressTracker";

/**
 * Handle Smelting action
 * - Requires blueprintId parameter (character selects when setting action)
 * - Success check: D20 + artisan stat mod vs DC (varies by blueprint tier)
 * - Consumes required resources from character's resource map
 * - On success: adds refined item to inventory; on failure: consumes resources but no item
 */
export function handleSmeltingAction(
  character: Character,
  context: NewsContext,
  blueprintId?: BlueprintId,
): News[] {
  const news: News[] = [];

  // List of smelting blueprint IDs
  const smeltingBlueprints: BlueprintId[] = [
    BlueprintId.Smelting_CopperIngot,
    BlueprintId.Smelting_TinIngot,
    BlueprintId.Smelting_IronIngot,
    BlueprintId.Smelting_SilverIngot,
    BlueprintId.Smelting_GoldIngot,
  ];

  let selectedBlueprint: IngotBlueprint | null = null;
  let selectedBlueprintId: BlueprintId | null = null;

  // If blueprintId provided, use it; otherwise find first available
  if (blueprintId && smeltingBlueprints.includes(blueprintId)) {
    const blueprint = blueprintRepository[blueprintId];
    if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'smithing') {
      selectedBlueprint = blueprint as IngotBlueprint;
      selectedBlueprintId = blueprintId;
    }
  }

  // If no blueprint selected, find first available smelting blueprint character can craft
  if (!selectedBlueprint) {
    for (const bpId of smeltingBlueprints) {
      const blueprint = blueprintRepository[bpId];
      if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'smithing') {
        const ingotBlueprint = blueprint as IngotBlueprint;
        
        // Check if character has required materials
        // Blueprints use OreId (ItemId), but ores are stored in materialResources as "ore" ResourceType
        // Check both inventory (for OreId items) and materialResources (for "ore" ResourceType)
        let hasMaterials = true;
        for (const [itemId, amount] of ingotBlueprint.needed) {
          // Check inventory first (for OreId items)
          const inventoryAmount = character.inventory.get(itemId) || 0;
          // Also check materialResources if it's an ore resource type
          // Note: materialResources uses "ore" as ResourceType, not OreId
          // For now, assume ore items are in inventory
          if (inventoryAmount < amount) {
            hasMaterials = false;
            break;
          }
        }

        if (hasMaterials) {
          selectedBlueprint = ingotBlueprint;
          selectedBlueprintId = bpId;
          break;
        }
      }
    }
  }

  if (!selectedBlueprint || !selectedBlueprintId) {
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} attempted smelting but lacks the required materials.`,
          th: `${character.name?.th || character.name} พยายามหลอมแต่ขาดวัสดุที่จำเป็น`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Get artisan stat mod
  const artisanStat = character.artisans.getTotal("smithing");
  const artisanMod = statMod(artisanStat);

  // Roll D20 + artisan mod vs DC (default 15, higher for better tiers)
  // Use character.rollTwenty to apply bless/curse automatically, then add artisan mod
  const roll = character.rollTwenty({}) + artisanMod;
  const dc = 15; // Default DC, can be adjusted based on blueprint tier

  // Consume resources regardless of success/failure
  for (const [itemId, amount] of selectedBlueprint.needed) {
    const currentAmount = character.inventory.get(itemId) || 0;
    if (currentAmount >= amount) {
      const newAmount = currentAmount - amount;
      if (newAmount <= 0) {
        character.inventory.delete(itemId);
      } else {
        character.inventory.set(itemId, newAmount);
      }
    }
  }

  // Apply needs changes: Energy -6, Mood -2 (strenuous activity)
  character.needs.decEnergy(6);
  character.needs.decMood(2);

  if (roll >= dc) {
    // Success: add item to inventory
    const currentAmount = character.inventory.get(selectedBlueprint.resultItemId) || 0;
    character.inventory.set(selectedBlueprint.resultItemId, currentAmount + 1);
    
    // Update quest progress for craft objectives
    QuestProgressTracker.onItemAcquired(character, selectedBlueprint.resultItemId, 1, "craft");

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} successfully smelted ${selectedBlueprint.resultItemId}.`,
          th: `${character.name?.th || character.name} หลอม ${selectedBlueprint.resultItemId} สำเร็จ`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  } else {
    // Failure: resources consumed but no item
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} attempted smelting but failed. Materials were consumed.`,
          th: `${character.name?.th || character.name} พยายามหลอมแต่ล้มเหลว วัสดุถูกใช้ไป`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

