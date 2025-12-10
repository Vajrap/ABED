/**
 * Chat Prompt Builder Service
 * 
 * Builds comprehensive prompts for NPC chat interactions.
 * Includes NPC context, player information, chat history, and relationship data.
 */

import type { Character } from "../Entity/Character/Character";
import { getNPCMemory } from "./NPCMemoryService";
import { getChatHistoryForAI } from "./ChatHistoryService";
import { getNPCImpression } from "./NPCCharacterRelationService";
import { getEquipment } from "../Entity/Item/Equipment/repository";
import Report from "../Utils/Reporter";

/**
 * Build comprehensive prompt for NPC chat
 */
export async function buildNPCChatPrompt(
  npcId: string,
  character: Character,
  userMessage: string
): Promise<string> {
  try {
    const promptParts: string[] = [];

    // 1. NPC Character Prompt
    const npcMemory = await getNPCMemory(npcId, true);
    if (npcMemory?.personalPrompt) {
      promptParts.push(`NPC Character: ${npcMemory.personalPrompt}\n`);
    } else {
      const npcName = typeof character.name === 'string' ? character.name : character.name?.en || "NPC";
      promptParts.push(`You are ${npcName}, a character in this world.\n`);
    }

    // 2. Known News Context
    if (npcMemory?.newsDetails && npcMemory.newsDetails.length > 0) {
      promptParts.push("Your Knowledge:\n");
      npcMemory.newsDetails.forEach((news) => {
        if (news.context) {
          promptParts.push(`- ${news.context}\n`);
        }
      });
      promptParts.push("\n");
    }

    // 3. Player Character Information
    promptParts.push("About the Player:\n");
    promptParts.push(formatPlayerContext(character, npcId));
    promptParts.push("\n");

    // 4. NPC-Character Impression
    promptParts.push("Your Impression of This Player:\n");
    const impression = await getNPCImpression(npcId, character.id);
    promptParts.push(formatNPCImpression(impression));
    promptParts.push("\n");

    // 5. Chat History
    promptParts.push("Recent Conversation:\n");
    const chatHistory = await getChatHistoryForAI(npcId, character.id, 10);
    promptParts.push(formatChatHistory(chatHistory));
    promptParts.push("\n");

    // 6. Current User Message
    promptParts.push(`Player says: "${userMessage}"\n\n`);
    promptParts.push("Respond naturally as this NPC character would:");

    const fullPrompt = promptParts.join("");

    Report.debug("Built NPC chat prompt", {
      npcId,
      characterId: character.id,
      promptLength: fullPrompt.length,
      hasHistory: chatHistory.length > 0,
      hasImpression: !!impression,
    });

    return fullPrompt;
  } catch (error) {
    Report.error("Error building NPC chat prompt", {
      error: error instanceof Error ? error.message : String(error),
      npcId,
      characterId: character.id,
    });
    // Fallback to simple prompt
    return `Player says: "${userMessage}"\n\nRespond naturally:`;
  }
}

/**
 * Format player character context for AI
 */
function formatPlayerContext(player: Character, npcId: string): string {
  const context: string[] = [];

  // Name
  const playerName = typeof player.name === 'string' 
    ? player.name 
    : player.name?.en || "Unknown";
  context.push(`Name: ${playerName}`);

  // Title
  const titleStr = player.title.string();
  if (titleStr.en || titleStr.th) {
    context.push(`Title: ${titleStr.en || titleStr.th}`);
  }

  // Fame
  // CharacterFame is a private Map, but we can note that player has fame
  // The NPC will see the player's reputation through their actions and title
  // For now, we'll note general fame status
  context.push(`Fame: ${typeof player.fame === 'object' ? 'Has reputation in various regions' : 'Unknown'}`);

  // Relation with NPC (from character's perspective)
  const relation = player.relations.get(npcId);
  if (relation) {
    context.push(`Your relationship with this NPC: ${relation.status} (closeness: ${relation.value})`);
  } else {
    context.push(`Your relationship with this NPC: No established relationship yet`);
  }

  // Traits
  if (player.traits && player.traits.size > 0) {
    const traitsList: string[] = [];
    player.traits.forEach((value, trait) => {
      traitsList.push(`${trait}: ${value}`);
    });
    if (traitsList.length > 0) {
      context.push(`Traits: ${traitsList.join(", ")}`);
    }
  }

  // Equipment (visible items)
  const equipment = formatEquipment(player.equipments);
  if (equipment) {
    context.push(`Visible Equipment: ${equipment}`);
  }

  return context.join("\n");
}

/**
 * Format equipment for AI context
 */
function formatEquipment(equipments: Character["equipments"]): string {
  const items: string[] = [];

  // Weapon
  if (equipments.rightHand) {
    const weapon = getEquipment(equipments.rightHand);
    if (weapon) {
      const weaponName = typeof weapon.name === 'string' ? weapon.name : weapon.name?.en || equipments.rightHand;
      items.push(`Weapon: ${weaponName}`);
    }
  }
  if (equipments.leftHand && equipments.leftHand !== equipments.rightHand) {
    const weapon = getEquipment(equipments.leftHand);
    if (weapon) {
      const weaponName = typeof weapon.name === 'string' ? weapon.name : weapon.name?.en || equipments.leftHand;
      items.push(`Off-hand: ${weaponName}`);
    }
  }

  // Armor pieces
  const armorPieces: string[] = [];
  if (equipments.headWear) {
    const armor = getEquipment(equipments.headWear);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.headWear;
      armorPieces.push(armorName);
    }
  }
  if (equipments.body) {
    const armor = getEquipment(equipments.body);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.body;
      armorPieces.push(armorName);
    }
  }

  if (armorPieces.length > 0) {
    items.push(`Armor: ${armorPieces.join(", ")}`);
  }

  return items.length > 0 ? items.join("; ") : "";
}

/**
 * Format NPC impression for AI context
 */
function formatNPCImpression(impression: Awaited<ReturnType<typeof getNPCImpression>>): string {
  if (!impression) {
    return "You don't recognize this person yet. This might be your first meeting.";
  }

  const parts: string[] = [];

  // Relationship status
  if (impression.relationTitle) {
    parts.push(`You consider them: ${impression.relationTitle}`);
  } else {
    parts.push(`You consider them: A stranger or acquaintance`);
  }

  // Affection and closeness
  parts.push(`Your feelings: Affection ${impression.affection}/100, Closeness ${impression.closeness}/100`);

  // Last conversation summary
  if (impression.lastConversationSummary) {
    parts.push(`Recent interactions: ${impression.lastConversationSummary}`);
  }

  // Important events
  if (impression.importantEvents && impression.importantEvents.length > 0) {
    const eventDescriptions = impression.importantEvents
      .map((event: any) => event.description || JSON.stringify(event))
      .join(", ");
    parts.push(`Notable events: ${eventDescriptions}`);
  }

  return parts.join("\n");
}

/**
 * Format chat history for AI context
 */
function formatChatHistory(history: Awaited<ReturnType<typeof getChatHistoryForAI>>): string {
  if (history.length === 0) {
    return "No previous conversation history.";
  }

  const formatted = history.map(entry => {
    const role = entry.role === "user" ? "Player" : "You";
    return `${role}: ${entry.content}`;
  }).join("\n");

  return formatted;
}

