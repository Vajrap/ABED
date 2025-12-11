import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { createNews } from "../../../../News/News";
import { roll, rollTwenty } from "../../../../../Utils/Dice";
import { statMod } from "../../../../../Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { FoodId } from "../../../../Item/Consumable";
import { OreId } from "src/Entity/Item";

/**
 * Handle Stroll action
 * - Energy -1, Mood +1 (light activity)
 * - Random discoveries: items, location info
 */
export function resolveStrollingAction(
  characters: Character[],
  context: NewsContext,
): News[] {
  const news: News[] = [];

  for (const character of characters) {
    // Apply needs changes: Energy -1, Mood +1
    character.needs.decEnergy(1);
    character.needs.incMood(1);

    // Calculate luck modifier for discoveries
    const luckMod = statMod(character.attribute.getTotal("luck"));
    const discoveryRoll = rollTwenty().total + luckMod;

    // Item finds (20% chance for common items)
    if (roll(1).d(10).total <= 2) {
      // Common items: food or small resources
      const itemType = roll(1).d(2).total;
      if (itemType === 1) {
        // Food item
        const foodItems = [FoodId.bread, FoodId.fruit, FoodId.jerky];
        const foundFood = foodItems[Math.floor(Math.random() * foodItems.length)]!;
        const currentQuantity = character.inventory.get(foundFood) || 0;
        character.inventory.set(foundFood, currentQuantity + 1);
        
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} found some ${foundFood} while strolling.`,
              th: `${character.name?.th || character.name} พบ${foundFood}ขณะเดินเล่น`,
            },
            context,
            significance: NewsSignificance.MINOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      } else {
        // Small resource (ore)
        const commonOres = [OreId.CopperOre, OreId.TinOre];
        const foundOre = commonOres[Math.floor(Math.random() * commonOres.length)]!;
        const currentQuantity = character.inventory.get(foundOre) || 0;
        character.inventory.set(foundOre, currentQuantity + 1);
        
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} found a piece of ${foundOre} while strolling.`,
              th: `${character.name?.th || character.name} พบ${foundOre}ชิ้นหนึ่งขณะเดินเล่น`,
            },
            context,
            significance: NewsSignificance.MINOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      }
    }

    // Location discoveries (30% chance)
    if (roll(1).d(10).total <= 3) {
      // Add information about nearby locations or current location
      const discoveryKey = `location_discovery_${context.location}`;
      character.information[discoveryKey] = (character.information[discoveryKey] || 0) + 1;
      
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} discovered something interesting about ${context.location} while strolling.`,
            th: `${character.name?.th || character.name} ค้นพบสิ่งที่น่าสนใจเกี่ยวกับ${context.location}ขณะเดินเล่น`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }

    // Major discovery (luck-based, 5% chance)
    if (discoveryRoll >= 18) {
      if (discoveryRoll === 20) {
        // Rare item or valuable resource
        const rareOres = [OreId.SilverOre, OreId.IronOre];
        const foundOre = rareOres[Math.floor(Math.random() * rareOres.length)]!;
        const quantity = roll(1).d(3).total; // 1-3 pieces
        const currentQuantity = character.inventory.get(foundOre) || 0;
        character.inventory.set(foundOre, currentQuantity + quantity);
        
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} made an exceptional discovery while strolling: ${quantity} pieces of ${foundOre}!`,
              th: `${character.name?.th || character.name} ค้นพบสิ่งพิเศษขณะเดินเล่น: ${foundOre} ${quantity} ชิ้น!`,
            },
            context,
            significance: NewsSignificance.MAJOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      } else {
        // Valuable location information
        const infoKey = `valuable_location_info_${context.location}`;
        character.information[infoKey] = (character.information[infoKey] || 0) + 1;
        
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} discovered valuable information about ${context.location} while exploring.`,
              th: `${character.name?.th || character.name} ค้นพบข้อมูลที่มีค่ากับ${context.location}ขณะสำรวจ`,
            },
            context,
            significance: NewsSignificance.MINOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      }
    }
  }

  return news;
}