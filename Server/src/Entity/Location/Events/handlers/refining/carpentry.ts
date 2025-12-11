import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { blueprintRepository } from "src/Entity/Blueprint/repository";
import { BlueprintId } from "src/Entity/Blueprint/enum";
import type { RefinementBlueprint } from "src/Entity/Blueprint/Blueprint";
import { statMod } from "src/Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { WoodId } from "../../../../Item/Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { QuestProgressTracker } from "../../../../Quest/QuestProgressTracker";

/**
 * Handle Carpentry action
 * - Requires blueprintId parameter (character selects when setting action)
 * - Success check: D20 + artisan stat mod vs DC (varies by blueprint tier)
 * - Consumes required resources (wood) from character's inventory or materialResources
 * - On success: adds refined plank to inventory; on failure: consumes resources but no item
 */
export function handleCarpentryAction(
  character: Character,
  context: NewsContext,
  blueprintId?: BlueprintId,
): News[] {
  const news: News[] = [];

  // List of carpentry blueprint IDs
  const carpentryBlueprints: BlueprintId[] = [
    BlueprintId.Refine_Plank_Pine,
    BlueprintId.Refine_Plank_Oak,
    BlueprintId.Refine_Plank_Maple,
    BlueprintId.Refine_Plank_Ironwood,
  ];

  let selectedBlueprint: RefinementBlueprint | null = null;
  let selectedBlueprintId: BlueprintId | null = null;

  // If blueprintId provided, use it; otherwise find first available
  if (blueprintId && carpentryBlueprints.includes(blueprintId)) {
    const blueprint = blueprintRepository[blueprintId];
    if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'carpentry') {
      selectedBlueprint = blueprint as RefinementBlueprint;
      selectedBlueprintId = blueprintId;
    }
  }

  // If no blueprint selected, find first available carpentry blueprint character can craft
  if (!selectedBlueprint) {
    for (const bpId of carpentryBlueprints) {
      const blueprint = blueprintRepository[bpId];
      if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'carpentry') {
        const carpentryBlueprint = blueprint as RefinementBlueprint;
        
        // Check if character has required materials
        // Blueprints use WoodId (ItemId), check both inventory and materialResources
        let hasMaterials = true;
        for (const [itemId, amount] of carpentryBlueprint.needed) {
          // Check inventory first (for WoodId items)
          const inventoryAmount = character.inventory.get(itemId) || 0;
          // Also check materialResources if it's a wood resource type
          // Note: materialResources uses "wood" as ResourceType, not WoodId
          // For now, assume wood items are in inventory
          if (inventoryAmount < amount) {
            hasMaterials = false;
            break;
          }
        }

        if (hasMaterials) {
          selectedBlueprint = carpentryBlueprint;
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
          en: `${character.name?.en || character.name} attempted carpentry but lacks the required materials.`,
          th: `${character.name?.th || character.name} พยายามทำไม้แต่ขาดวัสดุที่จำเป็น`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Get artisan stat mod
  const artisanStat = character.artisans.getTotal("carpentry");
  const artisanMod = statMod(artisanStat);

  // Roll D20 + artisan mod vs DC (base 15, adjusted by tier)
  // Use character.rollTwenty to apply bless/curse automatically, then add artisan mod
  const roll = character.rollTwenty({}) + artisanMod;
  const baseDC = 15;
  const tierMultiplier = selectedBlueprint.tier === TierEnum.common ? 0 : 
                        selectedBlueprint.tier === TierEnum.uncommon ? 2 :
                        selectedBlueprint.tier === TierEnum.rare ? 4 :
                        selectedBlueprint.tier === TierEnum.epic ? 6 : 8;
  const dc = baseDC + tierMultiplier;

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
    // Success: add plank to inventory
    if (selectedBlueprint.resultItemId) {
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
            en: `${character.name?.en || character.name} successfully crafted ${selectedBlueprint.resultItemId}.`,
            th: `${character.name?.th || character.name} ทำ ${selectedBlueprint.resultItemId} สำเร็จ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }
  } else {
    // Failure: resources consumed but no item
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} attempted carpentry but failed. Materials were consumed.`,
          th: `${character.name?.th || character.name} พยายามทำไม้แต่ล้มเหลว วัสดุถูกใช้ไป`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

