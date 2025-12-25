import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { createNews } from "../../../../News/News";
import { locationRepository } from "src/Entity/Location/repository";
import { statMod } from "src/Utils/statMod";
import { QuestProgressTracker } from "../../../../Quest/QuestProgressTracker";

/**
 * Handle Mining action
 * - Always yields ore (base 1-2 + artisan mod)
 * - Rare chance for gemstone (D20 + artisan mod vs DC 15)
 * - Depletes location stockpile
 * - Applies needs changes: Energy -4, Satiety -2, Mood -1
 */
export function handleMiningAction(
  character: Character,
  context: NewsContext,
): News[] {
  const news: News[] = [];
  const location = locationRepository[context.location];
  
  if (!location) {
    return news;
  }

  // Get artisan stat mod for mining
  const artisanStat = character.artisans.getTotal("mining");
  const artisanMod = statMod(artisanStat)

  // Calculate resource yield: base 1-2 + artisan mod (ensure non-negative)
  // Random quantity - don't apply bless/curse
  const baseAmount = character.roll({ amount: 1, face: 2, applyBlessCurse: false });
  const totalAmount = Math.max(1, baseAmount + Math.max(0, artisanMod));

  // Check available stockpile
  const availableOre = location.resourceGeneration.stockpile.ore;
  const gatheredOre = Math.min(totalAmount, availableOre);

  // Deplete stockpile
  if (gatheredOre > 0) {
    location.resourceGeneration.stockpile.ore = Math.max(0, availableOre - gatheredOre);
    
    // Add resources to character
    character.addMaterialResource("ore", gatheredOre);
    
    // Update quest progress for collect objectives (ore)
    QuestProgressTracker.onItemAcquired(character, "ore", gatheredOre, "gather");
  }

  // Check for rare gemstone (DC 15)
  // Use character.rollTwenty to apply bless/curse automatically, then add artisan mod
  const rareRoll = character.rollTwenty({}) + artisanMod;
  let gemstoneGathered = 0;
  if (rareRoll >= 15 && location.resourceGeneration.stockpile.gemstone > 0) {
    gemstoneGathered = 1;
    location.resourceGeneration.stockpile.gemstone = Math.max(0, location.resourceGeneration.stockpile.gemstone - 1);
    character.addMaterialResource("gemstone", 1);
    
    // Update quest progress for collect objectives (gemstone)
    QuestProgressTracker.onItemAcquired(character, "gemstone", 1, "gather");
  }

  // Apply needs changes: Energy -4, Satiety -2, Mood -1
  character.needs.incEnergy(-4);
  character.needs.incSatiety(-2);
  character.needs.incMood(-1);

  // Create news
  const resourceText = gemstoneGathered > 0
    ? `gathered ${gatheredOre} ore and ${gemstoneGathered} gemstone`
    : `gathered ${gatheredOre} ore`;

  news.push(
    createNews({
      scope: {
        kind: "privateScope",
        characterId: character.id,
      },
      content: {
        en: `${character.name?.en || character.name} went mining and ${resourceText}.`,
        th: `${character.name?.th || character.name} ไปขุดแร่และ${resourceText}`,
      },
      context,
    })
  );

  return news;
}

