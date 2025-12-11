import type { Character } from "../Character/Character";
import type { QuestDefinition } from "./QuestDefinition";
import { questRegistry } from "./QuestRegistry";
import { GameTime } from "../../Game/GameTime/GameTime";
import Report from "../../Utils/Reporter";

/**
 * Quest Availability Checker
 * Determines if a character can receive a quest based on prerequisites
 */
export class QuestAvailabilityChecker {
  /**
   * Check if a character can receive a specific quest
   */
  static canReceiveQuest(
    character: Character,
    questDef: QuestDefinition,
  ): { canReceive: boolean; reason?: string } {
    // Check if one-time quest already completed
    if (questDef.isOneTimeOnly && character.quests.completed.has(questDef.id)) {
      return { canReceive: false, reason: "Quest already completed" };
    }

    // Check cooldown for repeatable quests
    // Note: Quest cooldowns are not yet implemented in Character class
    // For now, skip cooldown check - can be added later when cooldowns are stored
    // if (questDef.isRepeatable && questDef.cooldownDays) {
    //   const cooldownEnd = character.quests.cooldowns?.get(questDef.id);
    //   if (cooldownEnd) {
    //     const currentDay = GameTime.dayPassed;
    //     const cooldownDay = typeof cooldownEnd === "number" ? cooldownEnd : currentDay;
    //     if (currentDay < cooldownDay + questDef.cooldownDays) {
    //       const daysRemaining = (cooldownDay + questDef.cooldownDays) - currentDay;
    //       return { 
    //         canReceive: false, 
    //         reason: `Quest on cooldown for ${daysRemaining} more day(s)` 
    //       };
    //     }
    //   }
    // }

    // Check prerequisites
    if (questDef.prerequisites) {
      const prereq = questDef.prerequisites;

      // Check minimum level
      if (prereq.minLevel && character.level < prereq.minLevel) {
        return { 
          canReceive: false, 
          reason: `Requires level ${prereq.minLevel}` 
        };
      }

      // Check completed quests
      if (prereq.completedQuests && prereq.completedQuests.length > 0) {
        for (const requiredQuestId of prereq.completedQuests) {
          if (!character.quests.completed.has(requiredQuestId)) {
            return { 
              canReceive: false, 
              reason: `Requires completion of quest: ${requiredQuestId}` 
            };
          }
        }
      }

      // Check reputation
      if (prereq.minReputation) {
        for (const [subRegion, minRep] of Object.entries(prereq.minReputation)) {
          // Note: fame.get expects SubRegionEnum, but we're using string keys from quest definition
          // For now, cast to any to allow string keys (quest definitions use flexible string IDs)
          const currentRep = character.fame.get(subRegion as any) || 0;
          if (currentRep < minRep) {
            return { 
              canReceive: false, 
              reason: `Requires ${minRep} reputation in ${subRegion}` 
            };
          }
        }
      }

      // Check relationships
      if (prereq.minRelationship) {
        for (const [npcId, minRel] of Object.entries(prereq.minRelationship)) {
          const relation = character.relations.get(npcId);
          const currentRel = relation?.value || 0;
          if (currentRel < minRel) {
            return { 
              canReceive: false, 
              reason: `Requires ${minRel} relationship with ${npcId}` 
            };
          }
        }
      }

      // Check required items
      if (prereq.requiredItems) {
        for (const [itemId, quantity] of Object.entries(prereq.requiredItems)) {
          const currentQuantity = character.inventory.get(itemId) || 0;
          if (currentQuantity < quantity) {
            return { 
              canReceive: false, 
              reason: `Requires ${quantity} ${itemId}` 
            };
          }
        }
      }
    }

    return { canReceive: true };
  }

  /**
   * Get all available quests from a specific giver (NPC)
   */
  static getAvailableQuests(
    character: Character,
    giverId: string,
  ): QuestDefinition[] {
    // Get all quests from this giver
    const allQuests = questRegistry.getByGiver(giverId);
    
    if (allQuests.length === 0) {
      return [];
    }

    // Filter by availability
    const availableQuests: QuestDefinition[] = [];
    
    for (const questDef of allQuests) {
      const availability = this.canReceiveQuest(character, questDef);
      if (availability.canReceive) {
        availableQuests.push(questDef);
      } else {
        Report.debug(`Quest ${questDef.id} not available: ${availability.reason}`, {
          characterId: character.id,
          questId: questDef.id,
          reason: availability.reason,
        });
      }
    }

    return availableQuests;
  }

  /**
   * Get all available quests from a giver, grouped by availability reason
   * Useful for debugging or UI display
   */
  static getAvailableQuestsWithReasons(
    character: Character,
    giverId: string,
  ): Array<{ quest: QuestDefinition; available: boolean; reason?: string }> {
    const allQuests = questRegistry.getByGiver(giverId);
    
    return allQuests.map(questDef => {
      const availability = this.canReceiveQuest(character, questDef);
      return {
        quest: questDef,
        available: availability.canReceive,
        reason: availability.reason,
      };
    });
  }
}

