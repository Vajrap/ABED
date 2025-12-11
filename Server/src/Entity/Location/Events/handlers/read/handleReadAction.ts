import type { Character } from "../../../../Character/Character";
import type { News, NewsContext } from "../../../../News/News";
import { createNews } from "../../../../News/News";
import { roll, rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import type { BookId } from "../../../../Item/Books";
import { BookId as BookIdEnum } from "../../../../Item/Books";

/**
 * Handle Read action
 * - Energy -1
 * - Mood ±3 (random: 50% chance +3 interesting, 50% chance -3 boring)
 * - Book-specific benefits: skill progress or knowledge gain
 */
export function handleReadAction(
  character: Character,
  bookId: BookId,
  context: NewsContext,
): News[] {
  const news: News[] = [];

  // Apply needs changes: Energy -1, Mood ±3 (random)
  character.needs.decEnergy(1);
  
  // Random mood change: 50% chance interesting (+3), 50% chance boring (-3)
  const isInteresting = roll(1).d(2).total === 1;
  const moodChange = isInteresting ? 3 : -3;
  if (moodChange > 0) {
    character.needs.incMood(moodChange);
  } else {
    character.needs.decMood(Math.abs(moodChange));
  }

  // Check if character has the book in inventory
  const bookQuantity = character.inventory.get(bookId) || 0;
  if (bookQuantity === 0) {
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} tried to read but doesn't have the book.`,
          th: `${character.name?.th || character.name} พยายามอ่านหนังสือแต่ไม่มีหนังสือ`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Handle empty BookId enum (graceful fallback)
  if (Object.keys(BookIdEnum).length === 0) {
    // Generic reading: give small knowledge gain
    const knowledgeKey = `reading_${Date.now()}`;
    character.information[knowledgeKey] = 1;
    
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} read a book and gained some knowledge.`,
          th: `${character.name?.th || character.name} อ่านหนังสือและได้รับความรู้`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
    return news;
  }

  // Book-specific logic (when BookId enum has entries)
  // For now, implement generic logic that can be extended with book repository
  // Books can give:
  // 1. Skill learning progress (skill books)
  // 2. Knowledge/information (knowledge books)
  // 3. Both (mixed books)

  // Determine book type based on bookId (simple heuristic for now)
  // In the future, this should come from a book repository
  const bookType = determineBookType(bookId);
  
  if (bookType === "skill" || bookType === "mixed") {
    // Give skill learning progress to a random skill or specific skill
    // For now, give small progress bonus (can be enhanced with book repository)
    const intMod = statMod(character.attribute.getTotal("intelligence"));
    const progressGain = rollTwenty().total + intMod;
    
    // Add to a random skill learning progress or create generic progress
    // In the future, books should specify which skill they teach
    const knowledgeKey = `book_skill_progress_${bookId}`;
    character.information[knowledgeKey] = (character.information[knowledgeKey] || 0) + progressGain;
    
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} read a skill book and gained ${progressGain} learning progress.`,
          th: `${character.name?.th || character.name} อ่านหนังสือทักษะและได้รับความก้าวหน้าในการเรียนรู้ ${progressGain} หน่วย`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }
  
  if (bookType === "knowledge" || bookType === "mixed") {
    // Add knowledge/information
    const knowledgeKey = `book_knowledge_${bookId}`;
    character.information[knowledgeKey] = (character.information[knowledgeKey] || 0) + 1;
    
    if (bookType === "knowledge") {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} read a knowledge book and learned something new.`,
            th: `${character.name?.th || character.name} อ่านหนังสือความรู้และเรียนรู้สิ่งใหม่`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }
  }

  return news;
}

/**
 * Determine book type based on bookId
 * This is a placeholder - should be replaced with book repository lookup
 */
function determineBookType(bookId: BookId): "skill" | "knowledge" | "mixed" {
  // Simple heuristic: check bookId name patterns
  const idStr = String(bookId).toLowerCase();
  
  if (idStr.includes("skill") || idStr.includes("technique") || idStr.includes("manual")) {
    return "skill";
  }
  if (idStr.includes("knowledge") || idStr.includes("lore") || idStr.includes("history")) {
    return "knowledge";
  }
  if (idStr.includes("guide") || idStr.includes("tome") || idStr.includes("codex")) {
    return "mixed";
  }
  
  // Default to knowledge
  return "knowledge";
}