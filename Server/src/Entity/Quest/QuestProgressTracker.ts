import type { Character } from "../Character/Character";
import type { Party } from "../Party/Party";
import type { Quest, QuestObjective } from "./Quest";
import { QuestType, QuestStatus } from "./Quest";
import type { ItemId } from "../Item/type";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { createNews, type News } from "../News/News";
import { NewsSignificance, NewsPropagation } from "../../InterFacesEnumsAndTypes/NewsEnums";
import Report from "../../Utils/Reporter";
import { questStatePostman } from "./QuestStatePostman";

/**
 * Quest Progress Tracker
 * Automatically updates quest objectives when characters complete actions
 */
export class QuestProgressTracker {
  // Static collection for quest completion news generated during a phase
  // This gets flushed and added to news distribution during phase processing
  private static questCompletionNews: News[] = [];
  /**
   * Handle battle completion - update kill objectives
   */
  static onBattleComplete(
    character: Character,
    defeatedEnemies: Character[],
  ): void {
    try {
      if (!character.quests || character.quests.active.size === 0) {
        return; // No active quests
      }

      for (const quest of character.quests.active.values()) {
        for (const objective of quest.objectives) {
          if (objective.type === QuestType.Kill) {
            this.updateKillObjective(quest, objective, defeatedEnemies);
          }
        }
        
        // Check if quest is now complete
        this.checkQuestCompletion(character, quest);
      }
      
      // Send quest state update via WebSocket
      questStatePostman.sendQuestStateUpdate(character);
    } catch (error) {
      Report.error("Error updating quest progress after battle", {
        characterId: character.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Handle item acquisition - update collect objectives
   */
  static onItemAcquired(
    character: Character,
    itemId: ItemId | string,
    quantity: number,
    source: "loot" | "craft" | "purchase" | "gather" | "quest" | "shop",
  ): void {
    try {
      if (!character.quests || character.quests.active.size === 0) {
        return; // No active quests
      }

      // Skip quest rewards to avoid circular updates
      if (source === "quest") {
        return;
      }

      for (const quest of character.quests.active.values()) {
        for (const objective of quest.objectives) {
          if (objective.type === QuestType.Collect) {
            this.updateCollectObjective(quest, objective, itemId, quantity);
          }
        }
        
        // Check if quest is now complete
        this.checkQuestCompletion(character, quest);
      }
      
      // Send quest state update via WebSocket
      questStatePostman.sendQuestStateUpdate(character);
    } catch (error) {
      Report.error("Error updating quest progress after item acquisition", {
        characterId: character.id,
        itemId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Handle location arrival - update travel/explore objectives
   */
  static onLocationArrival(
    party: Party,
    location: LocationsEnum,
  ): void {
    try {
      const characters = party.characters.filter((c): c is Character => c !== "none");
      
      for (const character of characters) {
        if (!character.quests || character.quests.active.size === 0) {
          continue; // No active quests
        }

        for (const quest of character.quests.active.values()) {
          for (const objective of quest.objectives) {
            if (objective.type === QuestType.Deliver || objective.type === QuestType.Explore) {
              this.updateTravelObjective(quest, objective, location);
            }
          }
          
          // Check if quest is now complete
          this.checkQuestCompletion(character, quest);
        }
      }
      
      // Send quest state update via WebSocket for each character
      for (const character of characters) {
        questStatePostman.sendQuestStateUpdate(character);
      }
    } catch (error) {
      Report.error("Error updating quest progress after location arrival", {
        partyId: party.partyID,
        location,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Handle crafting completion - update craft objectives (if quest type supports it)
   * Note: Currently handled via onItemAcquired with source: "craft"
   * This method is kept for future expansion if craft-specific quest types are added
   */
  static onCraftComplete(
    character: Character,
    itemId: ItemId | string,
    quantity: number,
  ): void {
    // For now, crafting is handled via onItemAcquired with source: "craft"
    // This method can be expanded if craft-specific quest objectives are added
    this.onItemAcquired(character, itemId, quantity, "craft");
  }

  /**
   * Update kill objective progress
   */
  private static updateKillObjective(
    quest: Quest,
    objective: QuestObjective,
    enemies: Character[],
  ): void {
    for (const enemy of enemies) {
      if (enemy.vitals.isDead) {
        // Match by type (e.g., "goblin", "orc") or by ID (for specific NPCs)
        // objective.target can be CharacterType enum value or character ID
        if (
          objective.target === enemy.type ||
          objective.target === enemy.id ||
          objective.target.toLowerCase() === enemy.type.toLowerCase()
        ) {
          const beforeProgress = objective.current;
          quest.updateObjective(QuestType.Kill, objective.target, 1);
          const afterProgress = objective.current;
          
          if (afterProgress > beforeProgress) {
            Report.debug(`Quest progress: ${quest.name.en} - Kill objective updated: ${afterProgress}/${objective.required}`);
          }
        }
      }
    }
  }

  /**
   * Update collect objective progress
   */
  private static updateCollectObjective(
    quest: Quest,
    objective: QuestObjective,
    itemId: ItemId | string,
    quantity: number,
  ): void {
    // Match item ID (exact match or base item ID)
    // objective.target can be ItemId or resource type string (e.g., "ore", "wood", "herbs")
    const targetLower = objective.target.toLowerCase();
    const itemIdLower = String(itemId).toLowerCase();
    
    if (
      objective.target === itemId ||
      targetLower === itemIdLower ||
      // Also check for resource types (ore, wood, herbs)
      (targetLower === "ore" && itemIdLower.includes("ore")) ||
      (targetLower === "wood" && itemIdLower.includes("wood")) ||
      (targetLower === "herbs" && itemIdLower.includes("herb"))
    ) {
      const beforeProgress = objective.current;
      quest.updateObjective(QuestType.Collect, objective.target, quantity);
      const afterProgress = objective.current;
      
      if (afterProgress > beforeProgress) {
        Report.debug(`Quest progress: ${quest.name.en} - Collect objective updated: ${afterProgress}/${objective.required}`);
      }
    }
  }

  /**
   * Update travel/explore objective progress
   */
  private static updateTravelObjective(
    quest: Quest,
    objective: QuestObjective,
    location: LocationsEnum,
  ): void {
    // Match location ID
    // objective.target can be LocationsEnum or location name
    if (
      objective.target === location ||
      objective.target.toLowerCase() === location.toLowerCase()
    ) {
      const beforeProgress = objective.current;
      quest.updateObjective(objective.type, objective.target, 1);
      const afterProgress = objective.current;
      
      if (afterProgress > beforeProgress) {
        Report.debug(`Quest progress: ${quest.name.en} - Travel/Explore objective updated: ${afterProgress}/${objective.required}`);
      }
    }
  }

  /**
   * Check if quest is complete and generate news if so
   * Returns the news if quest was just completed, null otherwise
   */
  static checkQuestCompletion(
    character: Character,
    quest: Quest,
  ): News | null {
    if (quest.isComplete() && quest.status === QuestStatus.Active) {
      // Generate news that quest is ready to turn in
      // Note: Quest remains in "active" until manually turned in at guild
      try {
        if (!character.location) {
          return null; // Can't generate news without location
        }

        // Lazy import to avoid circular dependency
        // Location/repository → Location → handleArtisans → foraging → QuestProgressTracker
        const { locationRepository } = require("../Location/Location/repository");
        const location = locationRepository[character.location];
        if (!location) {
          return null; // Location not found
        }

        const context = {
          region: location.region,
          subRegion: location.subRegion,
          location: character.location,
          partyId: character.partyID || "",
          characterIds: [character.id],
        };

        const news = createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} has completed all objectives for "${quest.name.en}". Return to the Adventure Guild to claim your rewards!`,
            th: `${character.name?.th || character.name} เสร็จสิ้นเป้าหมายทั้งหมดสำหรับ "${quest.name.th}" แล้ว กลับไปที่กิลด์นักผจญภัยเพื่อรับรางวัล!`,
          },
          context,
          significance: NewsSignificance.MAJOR,
          propagation: NewsPropagation.PRIVATE,
        });

        // Store news for collection during phase processing
        this.questCompletionNews.push(news);
        
        Report.debug(`Quest completed: ${quest.name.en} for character ${character.id}`);
        return news;
      } catch (error) {
        Report.error("Error generating quest completion news", {
          characterId: character.id,
          questId: quest.id,
          error: error instanceof Error ? error.message : String(error),
        });
        return null;
      }
    }
    return null;
  }

  /**
   * Collect and flush all quest completion news generated during the current phase
   * This should be called during phase processing to add quest news to the distribution
   */
  static flushQuestCompletionNews(): News[] {
    const news = [...this.questCompletionNews];
    this.questCompletionNews = [];
    return news;
  }
}


