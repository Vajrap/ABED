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
 * Handle Tanning action
 * - Requires blueprintId parameter (character selects when setting action)
 * - Success check: D20 + artisan stat mod vs DC (varies by blueprint tier)
 * - Consumes required resources (skins) from character's inventory
 * - On success: adds refined leather to inventory; on failure: consumes resources but no item
 */
export function handleTanningAction(
  character: Character,
  context: NewsContext,
  blueprintId?: BlueprintId,
): News[] {
  const news: News[] = [];

  // List of tanning blueprint IDs
  const tanningBlueprints: BlueprintId[] = [
    BlueprintId.Refine_Leather_Leather,
    BlueprintId.Refine_Leather_Fine,
    BlueprintId.Refine_Leather_Thick,
    BlueprintId.Refine_Leather_Rugged,
    BlueprintId.Refine_Leather_Scaled,
    BlueprintId.Refine_Leather_Wyvern,
    BlueprintId.Refine_Leather_Drake,
    BlueprintId.Refine_Leather_Hydra,
    BlueprintId.Refine_Leather_Leviathan,
    BlueprintId.Refine_Leather_Fiend,
    BlueprintId.Refine_Leather_Aether,
    BlueprintId.Refine_Leather_Spirit,
    BlueprintId.Refine_Leather_Yeti,
    BlueprintId.Refine_Leather_Salamander,
    BlueprintId.Refine_Leather_Manticore,
  ];

  let selectedBlueprint: RefinementBlueprint | null = null;
  let selectedBlueprintId: BlueprintId | null = null;

  // If blueprintId provided, use it; otherwise find first available
  if (blueprintId && tanningBlueprints.includes(blueprintId)) {
    const blueprint = blueprintRepository[blueprintId];
    if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'tanning') {
      selectedBlueprint = blueprint as RefinementBlueprint;
      selectedBlueprintId = blueprintId;
    }
  }

  // If no blueprint selected, find first available tanning blueprint character can craft
  if (!selectedBlueprint) {
    for (const bpId of tanningBlueprints) {
      const blueprint = blueprintRepository[bpId];
      if (blueprint && 'artisanType' in blueprint && blueprint.artisanType === 'tanning') {
        const tanningBlueprint = blueprint as RefinementBlueprint;
        
        // Check if character has required materials (skins are in inventory)
        let hasMaterials = true;
        for (const [itemId, amount] of tanningBlueprint.needed) {
          const inventoryAmount = character.inventory.get(itemId) || 0;
          if (inventoryAmount < amount) {
            hasMaterials = false;
            break;
          }
        }

        if (hasMaterials) {
          selectedBlueprint = tanningBlueprint;
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
          en: `${character.name?.en || character.name} attempted tanning but lacks the required materials.`,
          th: `${character.name?.th || character.name} พยายามฟอกหนังแต่ขาดวัสดุที่จำเป็น`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Get artisan stat mod
  const artisanStat = character.artisans.getTotal("tanning");
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
    // Success: add leather to inventory
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
            en: `${character.name?.en || character.name} successfully tanned ${selectedBlueprint.resultItemId}.`,
            th: `${character.name?.th || character.name} ฟอกหนัง ${selectedBlueprint.resultItemId} สำเร็จ`,
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
          en: `${character.name?.en || character.name} attempted tanning but failed. Materials were consumed.`,
          th: `${character.name?.th || character.name} พยายามฟอกหนังแต่ล้มเหลว วัสดุถูกใช้ไป`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

