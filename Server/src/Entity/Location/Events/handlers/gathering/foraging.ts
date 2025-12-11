import { locationRepository } from "src/Entity/Location/Location/repository";
import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { createNews } from "../../../../News/News";
import { statMod } from "src/Utils/statMod";
import { QuestProgressTracker } from "../../../../Quest/QuestProgressTracker";

/**
 * Handle Foraging action
 * - Always yields herbs (base 1-2 + artisan mod)
 * - Rare chance for silk (D20 + artisan mod vs DC 15)
 * - Depletes location stockpile
 * - Applies needs changes: Energy -4, Satiety -2, Mood -1
 */
export function handleForagingAction(
  character: Character,
  context: NewsContext,
): News[] {
  const news: News[] = [];
  const location = locationRepository[context.location];
  
  if (!location) {
    return news;
  }

  // Get artisan stat mod for foraging
  const artisanStat = character.artisans.getTotal("foraging");
  const artisanMod = statMod(artisanStat);

  // Calculate resource yield: base 1-2 + artisan mod (ensure non-negative)
  // Random quantity - don't apply bless/curse
  const baseAmount = character.roll({ amount: 1, face: 2, applyBlessCurse: false });
  const totalAmount = Math.max(1, baseAmount + Math.max(0, artisanMod));

  // Check available stockpile
  const availableHerbs = location.resourceGeneration.stockpile.herbs;
  const gatheredHerbs = Math.min(totalAmount, availableHerbs);

  // Deplete stockpile
  if (gatheredHerbs > 0) {
    location.resourceGeneration.stockpile.herbs = Math.max(0, availableHerbs - gatheredHerbs);
    
    // Add resources to character
    character.addMaterialResource("herbs", gatheredHerbs);
    
    // Update quest progress for collect objectives (herbs)
    QuestProgressTracker.onItemAcquired(character, "herbs", gatheredHerbs, "gather");
  }

  // Check for rare silk (DC 15)
  // Use character.rollTwenty to apply bless/curse automatically, then add artisan mod
  const rareRoll = character.rollTwenty({}) + artisanMod;
  let silkGathered = 0;
  if (rareRoll >= 15 && location.resourceGeneration.stockpile.silk > 0) {
    silkGathered = 1;
    location.resourceGeneration.stockpile.silk = Math.max(0, location.resourceGeneration.stockpile.silk - 1);
    character.addMaterialResource("silk", 1);
    
    // Update quest progress for collect objectives (silk)
    QuestProgressTracker.onItemAcquired(character, "silk", 1, "gather");
  }

  // Apply needs changes: Energy -4, Satiety -2, Mood -1
  character.needs.incEnergy(-4);
  character.needs.incSatiety(-2);
  character.needs.incMood(-1);

  // Create news
  const resourceText = silkGathered > 0
    ? `gathered ${gatheredHerbs} herbs and ${silkGathered} silk`
    : `gathered ${gatheredHerbs} herbs`;

  news.push(
    createNews({
      scope: {
        kind: "privateScope",
        characterId: character.id,
      },
      content: {
        en: `${character.name?.en || character.name} went foraging and ${resourceText}.`,
        th: `${character.name?.th || character.name} ไปหาของป่าและ${resourceText}`,
      },
      context,
    })
  );

  return news;
}

