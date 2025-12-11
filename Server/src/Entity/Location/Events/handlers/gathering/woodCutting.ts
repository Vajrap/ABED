import { locationRepository } from "src/Entity/Location/Location/repository";
import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { createNews } from "../../../../News/News";
import { statMod } from "src/Utils/statMod";
import { QuestProgressTracker } from "../../../../Quest/QuestProgressTracker";

/**
 * Handle WoodCutting action
 * - Always yields wood (base 1-2 + artisan mod)
 * - Depletes location stockpile
 * - Applies needs changes: Energy -4, Satiety -2, Mood -1
 */
export function handleWoodCuttingAction(
  character: Character,
  context: NewsContext,
): News[] {
  const news: News[] = [];
  const location = locationRepository[context.location];
  
  if (!location) {
    return news;
  }

  // Get artisan stat mod for woodCutting
  const artisanStat = character.artisans.getTotal("woodCutting");
  const artisanMod = statMod(artisanStat);

  // Calculate resource yield: base 1-2 + artisan mod (ensure non-negative)
  // Random quantity - don't apply bless/curse
  const baseAmount = character.roll({ amount: 1, face: 2 });
  const totalAmount = Math.max(1, baseAmount + Math.max(0, artisanMod));

  // Check available stockpile
  const availableWood = location.resourceGeneration.stockpile.wood;
  const gatheredWood = Math.min(totalAmount, availableWood);

  // Deplete stockpile
  if (gatheredWood > 0) {
    location.resourceGeneration.stockpile.wood = Math.max(0, availableWood - gatheredWood);
    
    // Add resources to character
    character.addMaterialResource("wood", gatheredWood);
    
    // Update quest progress for collect objectives (wood)
    QuestProgressTracker.onItemAcquired(character, "wood", gatheredWood, "gather");
  }

  // Apply needs changes: Energy -4, Satiety -2, Mood -1
  character.needs.incEnergy(-4);
  character.needs.incSatiety(-2);
  character.needs.incMood(-1);

  // Create news
  news.push(
    createNews({
      scope: {
        kind: "privateScope",
        characterId: character.id,
      },
      content: {
        en: `${character.name?.en || character.name} went woodcutting and gathered ${gatheredWood} wood.`,
        th: `${character.name?.th || character.name} ไปตัดไม้และเก็บได้ ${gatheredWood} ไม้`,
      },
      context,
    })
  );

  return news;
}

