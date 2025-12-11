import type { Character } from "../../../../Character/Character";
import type { NewsContext, News } from "../../../../News/News";
import { createNews } from "../../../../News/News";
import { roll, rollTwenty } from "../../../../../Utils/Dice";
import { statMod } from "../../../../../Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { GoldId } from "../../../../Item";

/**
 * Handle Tavern action
 * - Energy -2, Mood +3 (fun but tiring)
 * - Social encounters, rumors, gold finds
 */
export function resolveTavernAction(
  characters: Character[],
  context: NewsContext,
): News[] {
  const news: News[] = [];

  for (const character of characters) {
    // Apply needs changes: Energy -2, Mood +3
    character.needs.decEnergy(2);
    character.needs.incMood(3);

    // Calculate luck modifier for events
    const luckMod = statMod(character.attribute.getTotal("luck"));
    const eventRoll = rollTwenty().total + luckMod;

    // Major events (using location randomEvents if available)
    // For now, implement simple logic for minor events
    
    // Social encounters (common, 60% chance)
    if (roll(1).d(10).total <= 6) {
      // Small mood boost from socializing
      character.needs.incMood(roll(1).d(3).total);
      
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} enjoyed socializing at the tavern.`,
            th: `${character.name?.th || character.name} สนุกกับการเข้าสังคมที่โรงเตี๊ยม`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }

    // Rumors (30% chance)
    if (roll(1).d(10).total <= 3) {
      // Add location-specific rumor to information
      const rumorKey = `rumor_${context.location}_${Date.now()}`;
      character.information[rumorKey] = 1;
      
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} overheard interesting rumors at the tavern.`,
            th: `${character.name?.th || character.name} ได้ยินข่าวลือที่น่าสนใจที่โรงเตี๊ยม`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }

    // Gold finds (10% chance, small amounts)
    if (roll(1).d(10).total === 1) {
      const goldFound = roll(1).d(10).total; // 1-10 gold
      const currentGold = character.inventory.get(GoldId.gold) || 0;
      character.inventory.set(GoldId.gold, currentGold + goldFound);
      
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} found ${goldFound} gold while at the tavern!`,
            th: `${character.name?.th || character.name} พบทอง ${goldFound} เหรียญที่โรงเตี๊ยม!`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }

    // Major event check (luck-based, 5% chance for good events)
    if (eventRoll >= 18) {
      // Good event: larger gold find or valuable information
      if (eventRoll === 20) {
        const goldFound = roll(1).d(20).total + 10; // 11-30 gold
        const currentGold = character.inventory.get(GoldId.gold) || 0;
        character.inventory.set(GoldId.gold, currentGold + goldFound);
        
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} had an exceptional night at the tavern and found ${goldFound} gold!`,
              th: `${character.name?.th || character.name} มีค่ำคืนที่ยอดเยี่ยมที่โรงเตี๊ยมและพบทอง ${goldFound} เหรียญ!`,
            },
            context,
            significance: NewsSignificance.MAJOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      } else {
        // Valuable information
        const infoKey = `valuable_info_${context.location}`;
        character.information[infoKey] = (character.information[infoKey] || 0) + 1;
        
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} learned valuable information from a traveler at the tavern.`,
              th: `${character.name?.th || character.name} ได้รับข้อมูลที่มีค่าจากนักเดินทางที่โรงเตี๊ยม`,
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