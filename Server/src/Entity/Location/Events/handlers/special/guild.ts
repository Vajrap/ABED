import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { QuestStatus } from "../../../../Quest/Quest";
import { generateQuestOffer, createQuestOfferFromDefinition } from "../../../../Quest/QuestGenerator";
import { GoldId } from "../../../../Item";
import { questStatePostman } from "../../../../Quest/QuestStatePostman";
import { questRegistry } from "../../../../Quest/QuestRegistry";
import { QuestAvailabilityChecker } from "../../../../Quest/QuestAvailabilityChecker";

/**
 * Handle Adventure Guild actions
 * - Generate offer: Create a quest offer (6-hour window to accept)
 * - Accept quest action: Accept a quest offer and add to active quests
 * - Turn in quest action: Check objectives, apply rewards, move to completed
 * - View available quests: Return list of available/active quests
 */
export function handleGuildAction(
  character: Character,
  context: NewsContext,
  action: "generateOffer" | "acceptQuest" | "turnInQuest" | "viewQuests",
  questId?: string,
): News[] {
  const news: News[] = [];

  if (action === "generateOffer") {
    // Try to generate from predefined quests first (if giverId available)
    // For now, check if character is at Adventure Guild location
    // In the future, this could be passed as a parameter or determined from context
    let offer = null;
    
    // Check for predefined quests from NPCs at this location
    // For Adventure Guild, we might want to check for specific NPCs
    // For now, fall back to procedural generation
    offer = generateQuestOffer(character, context);
    
    if (offer) {
      character.questOffers.set(offer.id, offer);
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} received a quest offer: ${offer.quest.name.en}. You have 6 hours to accept it.`,
            th: `${character.name?.th || character.name} ได้รับข้อเสนอเควส: ${offer.quest.name.th} คุณมีเวลา 6 ชั่วโมงในการยอมรับ`,
          },
          context,
          significance: NewsSignificance.MAJOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      
      // Send quest state update via WebSocket
      questStatePostman.sendQuestStateUpdate(character);
    } else {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} visited the Adventure Guild but no quests are available at this time.`,
            th: `${character.name?.th || character.name} ไปที่กิลด์นักผจญภัยแต่ไม่มีเควสให้ตอนนี้`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }
  } else if (action === "acceptQuest") {
    // Accept a quest from questOffers
    if (!questId) {
      // Find first available offer
      for (const [offerId, offer] of character.questOffers.entries()) {
        if (offer.canAccept()) {
          questId = offerId;
          break;
        }
      }
    }

    if (!questId) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to accept a quest but has no available quest offers.`,
            th: `${character.name?.th || character.name} พยายามรับเควสแต่ไม่มีข้อเสนอเควส`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    const offer = character.questOffers.get(questId);
    if (!offer) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to accept quest offer ${questId} but it wasn't found.`,
            th: `${character.name?.th || character.name} พยายามรับข้อเสนอเควส ${questId} แต่ไม่พบ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    if (!offer.canAccept()) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to accept quest offer ${offer.quest.name.en} but it has expired or already been processed.`,
            th: `${character.name?.th || character.name} พยายามรับข้อเสนอเควส ${offer.quest.name.th} แต่หมดอายุหรือถูกประมวลผลแล้ว`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    // Move quest from offer to active
    const quest = offer.quest;
    quest.status = QuestStatus.Active;
    character.quests.active.set(quest.id, quest);
    offer.status = "accepted";
    character.questOffers.delete(questId);

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} accepted quest: ${quest.name.en}`,
          th: `${character.name?.th || character.name} รับเควส: ${quest.name.th}`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    
    // Send quest state update via WebSocket
    questStatePostman.sendQuestStateUpdate(character);
  } else if (action === "turnInQuest") {
    if (!questId) {
      // Find first completed quest
      for (const [qId, quest] of character.quests.active.entries()) {
        if (quest.isComplete()) {
          questId = qId;
          break;
        }
      }
    }

    if (!questId) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to turn in a quest but has no completed quests.`,
            th: `${character.name?.th || character.name} พยายามส่งเควสแต่ไม่มีเควสที่เสร็จสมบูรณ์`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    const quest = character.quests.active.get(questId);
    if (!quest) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to turn in quest ${questId} but it wasn't found.`,
            th: `${character.name?.th || character.name} พยายามส่งเควส ${questId} แต่ไม่พบ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    if (!quest.isComplete()) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to turn in quest ${quest.name.en} but objectives are not complete.`,
            th: `${character.name?.th || character.name} พยายามส่งเควส ${quest.name.th} แต่เป้าหมายยังไม่เสร็จสมบูรณ์`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    // Apply rewards
    if (quest.rewards.gold) {
      const currentGold = character.inventory.get(GoldId.gold) || 0;
      character.inventory.set(GoldId.gold, currentGold + quest.rewards.gold);
    }
    if (quest.rewards.items) {
      for (const [itemId, quantity] of quest.rewards.items.entries()) {
        const currentQuantity = character.inventory.get(itemId) || 0;
        character.inventory.set(itemId, currentQuantity + quantity);
      }
    }

    // Move to completed
    character.quests.active.delete(questId);
    character.quests.completed.add(questId);
    
    // Get quest definition for chain unlocking
    const questDef = questRegistry.get(quest.id);
    
    // Note: Quest cooldowns are not yet implemented in Character class
    // Cooldown tracking can be added later when cooldowns are stored
    // if (questDef?.isRepeatable && questDef.cooldownDays) {
    //   const currentDay = GameTime.dayPassed;
    //   character.quests.cooldowns?.set(quest.id, currentDay);
    // }

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} turned in quest ${quest.name.en} and received rewards!`,
          th: `${character.name?.th || character.name} ส่งเควส ${quest.name.th} และได้รับรางวัล!`,
        },
        context,
        significance: NewsSignificance.MAJOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    
    // Check if quest unlocks other quests (quest chain)
    if (questDef?.unlocksQuests && questDef.unlocksQuests.length > 0) {
      // Unlock next quests in chain
      for (const unlockedQuestId of questDef.unlocksQuests) {
        const unlockedQuestDef = questRegistry.get(unlockedQuestId);
        if (unlockedQuestDef) {
          // Check if character can receive it
          const availability = QuestAvailabilityChecker.canReceiveQuest(
            character,
            unlockedQuestDef,
          );
          if (availability.canReceive) {
            // Create quest offer for next quest in chain
            const chainOffer = createQuestOfferFromDefinition(
              character,
              unlockedQuestDef,
              context,
            );
            character.questOffers.set(chainOffer.id, chainOffer);
            
            news.push(
              createNews({
                scope: {
                  kind: "privateScope",
                  characterId: character.id,
                },
                content: {
                  en: `${character.name?.en || character.name} unlocked a new quest: ${unlockedQuestDef.name.en}`,
                  th: `${character.name?.th || character.name} ปลดล็อกเควสใหม่: ${unlockedQuestDef.name.th}`,
                },
                context,
                significance: NewsSignificance.MAJOR,
                propagation: NewsPropagation.PRIVATE,
              })
            );
          }
        }
      }
    }
    
    // Send quest state update via WebSocket
    questStatePostman.sendQuestStateUpdate(character);
  } else if (action === "viewQuests") {
    // Return list of available/active quests
    const activeQuests = Array.from(character.quests.active.values());
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} viewed available quests. Active: ${activeQuests.length}`,
          th: `${character.name?.th || character.name} ดูเควสที่มีอยู่ กำลังทำ: ${activeQuests.length}`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

