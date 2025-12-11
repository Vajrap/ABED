import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { blueprintRepository } from "src/Entity/Blueprint/repository";
import { BlueprintId } from "src/Entity/Blueprint/enum";
import type { RefinementBlueprint } from "src/Entity/Blueprint/Blueprint";
import { statMod } from "src/Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { QuestProgressTracker } from "../../../../Quest/QuestProgressTracker";

/**
 * Handle Weaving action
 * - Requires blueprintId parameter (character selects when setting action)
 * - Success check: D20 + artisan stat mod vs DC (varies by blueprint tier)
 * - Consumes required resources (thread) from character's inventory
 * - On success: adds refined cloth to inventory; on failure: consumes resources but no item
 */
export function handleWeavingAction(
  character: Character,
  context: NewsContext,
  blueprintId?: BlueprintId,
): News[] {
  const news: News[] = [];

  // List of weaving blueprint IDs
  const weavingBlueprints: BlueprintId[] = [
    BlueprintId.Weave_Cloth_Linen,
    BlueprintId.Weave_Cloth_Cotton,
    BlueprintId.Weave_Cloth_Wool,
    BlueprintId.Weave_Cloth_Silk,
    BlueprintId.Weave_Cloth_SpiderSilk,
    BlueprintId.Weave_Cloth_Yeti,
    BlueprintId.Weave_Cloth_Phoenix,
    BlueprintId.Weave_Cloth_Spirit,
    BlueprintId.Weave_Cloth_Aether,
    BlueprintId.Weave_Cloth_Fiend,
    BlueprintId.Weave_Cloth_Fluxweave,
    BlueprintId.Weave_Cloth_Dragonskin,
    BlueprintId.Weave_Cloth_LeviathanLining,
    BlueprintId.Weave_Cloth_Hydra,
  ];

  let selectedBlueprint: RefinementBlueprint | null = null;
  let selectedBlueprintId: BlueprintId | null = null;

  // If blueprintId provided, use it; otherwise find first available
  if (blueprintId && weavingBlueprints.includes(blueprintId)) {
    const blueprint = blueprintRepository[blueprintId];
    // Blueprints use "tailoring" as artisanType
    if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'tailoring') {
      selectedBlueprint = blueprint as RefinementBlueprint;
      selectedBlueprintId = blueprintId;
    }
  }

  // If no blueprint selected, find first available weaving blueprint character can craft
  if (!selectedBlueprint) {
    for (const bpId of weavingBlueprints) {
      const blueprint = blueprintRepository[bpId];
      // Blueprints use "tailoring" as artisanType
      if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'tailoring') {
        const weavingBlueprint = blueprint as RefinementBlueprint;
        
        // Check if character has required materials (threads are in inventory)
        let hasMaterials = true;
        for (const [itemId, amount] of weavingBlueprint.needed) {
          const inventoryAmount = character.inventory.get(itemId) || 0;
          if (inventoryAmount < amount) {
            hasMaterials = false;
            break;
          }
        }

        if (hasMaterials) {
          selectedBlueprint = weavingBlueprint;
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
          en: `${character.name?.en || character.name} attempted weaving but lacks the required materials.`,
          th: `${character.name?.th || character.name} พยายามทอผ้าแต่ขาดวัสดุที่จำเป็น`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Get artisan stat mod (use "weaving" for character stat, blueprint uses "tailoring")
  const artisanStat = character.artisans.getTotal("weaving");
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
    // Success: add cloth to inventory
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
            en: `${character.name?.en || character.name} successfully wove ${selectedBlueprint.resultItemId}.`,
            th: `${character.name?.th || character.name} ทอผ้า ${selectedBlueprint.resultItemId} สำเร็จ`,
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
          en: `${character.name?.en || character.name} attempted weaving but failed. Materials were consumed.`,
          th: `${character.name?.th || character.name} พยายามทอผ้าแต่ล้มเหลว วัสดุถูกใช้ไป`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

