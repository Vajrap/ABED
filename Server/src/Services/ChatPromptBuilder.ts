/**
 * Chat Prompt Builder Service
 * 
 * Builds comprehensive prompts for NPC chat interactions.
 * Includes NPC context, player information, chat history, and relationship data.
 */

import type { Character } from "../Entity/Character/Character";
import { getNPCMemory } from "./NPCMemoryService";
import { getChatHistoryWithSummary } from "./ChatSummarizationService";
import { getNPCImpression, type NPCImpression } from "./NPCCharacterRelationService";
import { getEquipment } from "../Entity/Item/Equipment/repository";
import { SubRegionEnum } from "../InterFacesEnumsAndTypes/Enums/SubRegion";
import { getJoinCriteria } from "./NPCPartyJoinService";
import { getNPCLifeSummary } from "./NPCSummaryService";
import type { ChatHistoryEntry } from "./ChatHistoryService";
import { getJoinPartyToolDefinition } from "./NPCPartyJoinService";
import { getBattleInitiationToolDefinition } from "./BattleInitiationService";
import type { LMStudioTool } from "./LMStudioService";
import Report from "../Utils/Reporter";

/**
 * Get available tools for NPC chat
 * Returns array of tool definitions that the LLM can call
 */
export function getAvailableTools(npcId: string): LMStudioTool[] {
  const tools: LMStudioTool[] = [];
  
  // Add checkJoinParty tool if NPC can join parties
  const joinCriteria = getJoinCriteria(npcId);
  if (joinCriteria && joinCriteria.canJoin) {
    tools.push(getJoinPartyToolDefinition());
  }
  
  // Add initiateBattle tool - all NPCs can defend themselves
  tools.push(getBattleInitiationToolDefinition());
  
  return tools;
}

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

    // 1a. NPC Life Summary (what they've been through)
    const lifeSummary = await getNPCLifeSummary(npcId);
    if (lifeSummary) {
      promptParts.push(`Your Recent Experiences:\n${lifeSummary}\n`);
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

    // 3. Get NPC impression (used in both player context and impression sections)
    const impression = await getNPCImpression(npcId, character.id);

    // 4. Get join party criteria (if NPC can join parties)
    const joinCriteria = getJoinCriteria(npcId);
    if (joinCriteria) {
      Report.debug("Join party criteria found for NPC", {
        npcId,
        canJoin: joinCriteria.canJoin,
        hasHiring: !!joinCriteria.hiring,
        hiringAmount: joinCriteria.hiring,
      });
    }

    // 5. Player Character Information
    promptParts.push("About the Player:\n");
    promptParts.push(formatPlayerContext(character, npcId, impression));
    promptParts.push("\n");

    // 6. NPC-Character Impression
    promptParts.push("Your Impression of This Player:\n");
    promptParts.push(formatNPCImpression(impression));
    promptParts.push("\n");

    // 7. Join Party Information (if applicable)
    if (joinCriteria && joinCriteria.canJoin) {
      promptParts.push("Party Joining:\n");
      promptParts.push(formatJoinPartyInfo(joinCriteria, impression));
      promptParts.push("\n");
    }

    // 8. Chat History (with summary if available)
    const { summary, recentMessages } = await getChatHistoryWithSummary(npcId, character.id, 10);
    
    promptParts.push("Recent Conversation:\n");
    if (summary) {
      promptParts.push(`Previous conversation summary: ${summary}\n\n`);
    }
    promptParts.push(formatChatHistory(recentMessages));
    promptParts.push("\n");

    // 9. Behavioral Guidelines
    promptParts.push("Important Behavioral Guidelines:\n");
    promptParts.push("- Stay true to your character's personality, values, and boundaries\n");
    promptParts.push("- You have the right to refuse inappropriate requests\n");
    promptParts.push("- If someone makes threats, sexual advances, or disrespects you, respond assertively\n");
    promptParts.push("- You can call for help (like Thomas or guards) if threatened\n");
    promptParts.push("- You can refuse service or ask someone to leave if they're being inappropriate\n");
    promptParts.push("- If someone becomes violent or threatening, you may need to defend yourself\n");
    promptParts.push("- Do NOT be overly accommodating to inappropriate behavior - maintain your dignity and boundaries\n");
    promptParts.push("\n");

    // 9. Available Tools (if any)
    const availableTools = getAvailableTools(npcId);
    if (availableTools.length > 0) {
      promptParts.push("Available Actions (USE THESE TOOLS WHEN APPROPRIATE):\n");
      availableTools.forEach((tool) => {
        promptParts.push(`- ${tool.function.name}: ${tool.function.description}\n`);
      });
      promptParts.push("\n");
      promptParts.push("CRITICAL INSTRUCTIONS FOR TOOL USE:\n");
      promptParts.push("\n");
      promptParts.push("1. PARTY JOINING:\n");
      promptParts.push("If the player asks you to join their party, go on an adventure together, requests you to be part of their group, or says things like:\n");
      promptParts.push("- 'join my party'\n");
      promptParts.push("- 'come with me'\n");
      promptParts.push("- 'let's go together'\n");
      promptParts.push("- 'come on join my party'\n");
      promptParts.push("- 'will you join me'\n");
      promptParts.push("You MUST call the checkJoinParty tool FIRST before responding. Do NOT just agree or decline - use the tool to check requirements.\n");
      promptParts.push(`To call the tool, use: checkJoinParty(npcId="${npcId}", playerId="${character.id}")\n\n`);
      promptParts.push("2. BATTLE INITIATION:\n");
      promptParts.push("If the player threatens you, attacks you, or makes violent/aggressive statements, you MUST call the initiateBattle tool. Examples:\n");
      promptParts.push("- 'I'll kill you', 'Die now', 'Attack you'\n");
      promptParts.push("- Threats with commands like 'Die now, woman!'\n");
      promptParts.push("- Any violent or aggressive language directed at you\n");
      promptParts.push("You have the right to defend yourself. Call initiateBattle when threatened.\n");
      promptParts.push(`To call the tool, use: initiateBattle(npcId="${npcId}", playerId="${character.id}", reason="Player threatened me: [their message]")\n\n`);
    }

    // 10. Current User Message
    promptParts.push(`Player says: "${userMessage}"\n\n`);
    promptParts.push("Respond naturally as this NPC character would, maintaining your character's boundaries and dignity:");

    const fullPrompt = promptParts.join("");

    Report.debug("Built NPC chat prompt", {
      npcId,
      characterId: character.id,
      promptLength: fullPrompt.length,
      hasHistory: recentMessages.length > 0,
      hasSummary: !!summary,
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
function formatPlayerContext(player: Character, npcId: string, impression: NPCImpression | null): string {
  const context: string[] = [];

  // Basic info
  const playerName = typeof player.name === 'string' 
    ? player.name 
    : player.name?.en || "Unknown";
  context.push(`Name: ${playerName}`);

  // Level, Race, Gender
  context.push(`Level: ${player.level}`);
  context.push(`Race: ${player.race}`);
  context.push(`Gender: ${player.gender}`);

  // Title
  const titleStr = player.title.string();
  if (titleStr.en || titleStr.th) {
    context.push(`Title: ${titleStr.en || titleStr.th}`);
  }

  // Fame - format properly with regions and tiers
  const fameInfo = formatFame(player.fame);
  if (fameInfo) {
    context.push(`Fame: ${fameInfo}`);
  } else {
    context.push(`Fame: Unknown or no reputation yet`);
  }

  // NPC-Character Relation (from NPC's perspective, from database)
  if (impression) {
    const relationTitle = impression.relationTitle || "stranger";
    context.push(`How you know them: ${relationTitle} (Affection: ${impression.affection}/100, Closeness: ${impression.closeness}/100)`);
    if (impression.conversationCount > 0) {
      context.push(`Times you've spoken: ${impression.conversationCount}`);
    }
  } else {
    context.push(`How you know them: This is your first meeting (stranger)`);
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

  // Equipment (all visible items)
  const equipment = formatEquipment(player.equipments);
  if (equipment) {
    context.push(`Appearance/Equipment: ${equipment}`);
  }

  return context.join("\n");
}

/**
 * Format equipment for AI context
 * Includes all visible equipment slots
 */
function formatEquipment(equipments: Character["equipments"]): string {
  const items: string[] = [];

  // Weapons
  if (equipments.rightHand) {
    const weapon = getEquipment(equipments.rightHand);
    if (weapon) {
      const weaponName = typeof weapon.name === 'string' ? weapon.name : weapon.name?.en || equipments.rightHand;
      items.push(`Right hand: ${weaponName}`);
    }
  }
  if (equipments.leftHand && equipments.leftHand !== equipments.rightHand) {
    const weapon = getEquipment(equipments.leftHand);
    if (weapon) {
      const weaponName = typeof weapon.name === 'string' ? weapon.name : weapon.name?.en || equipments.leftHand;
      items.push(`Left hand: ${weaponName}`);
    }
  }

  // Armor pieces
  const armorPieces: string[] = [];
  if (equipments.headWear) {
    const armor = getEquipment(equipments.headWear);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.headWear;
      armorPieces.push(`Head: ${armorName}`);
    }
  }
  if (equipments.body) {
    const armor = getEquipment(equipments.body);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.body;
      armorPieces.push(`Body: ${armorName}`);
    }
  }
  if (equipments.leg) {
    const armor = getEquipment(equipments.leg);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.leg;
      armorPieces.push(`Legs: ${armorName}`);
    }
  }
  if (equipments.hand) {
    const armor = getEquipment(equipments.hand);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.hand;
      armorPieces.push(`Hands: ${armorName}`);
    }
  }
  if (equipments.foot) {
    const armor = getEquipment(equipments.foot);
    if (armor) {
      const armorName = typeof armor.name === 'string' ? armor.name : armor.name?.en || equipments.foot;
      armorPieces.push(`Feet: ${armorName}`);
    }
  }

  // Accessories
  const accessories: string[] = [];
  if (equipments.util) {
    const util = getEquipment(equipments.util);
    if (util) {
      const utilName = typeof util.name === 'string' ? util.name : util.name?.en || equipments.util;
      accessories.push(`Utility: ${utilName}`);
    }
  }
  if (equipments.ringL) {
    const ring = getEquipment(equipments.ringL);
    if (ring) {
      const ringName = typeof ring.name === 'string' ? ring.name : ring.name?.en || equipments.ringL;
      accessories.push(`Ring (L): ${ringName}`);
    }
  }
  if (equipments.ringR) {
    const ring = getEquipment(equipments.ringR);
    if (ring) {
      const ringName = typeof ring.name === 'string' ? ring.name : ring.name?.en || equipments.ringR;
      accessories.push(`Ring (R): ${ringName}`);
    }
  }
  if (equipments.earL) {
    const ear = getEquipment(equipments.earL);
    if (ear) {
      const earName = typeof ear.name === 'string' ? ear.name : ear.name?.en || equipments.earL;
      accessories.push(`Earring (L): ${earName}`);
    }
  }
  if (equipments.earR) {
    const ear = getEquipment(equipments.earR);
    if (ear) {
      const earName = typeof ear.name === 'string' ? ear.name : ear.name?.en || equipments.earR;
      accessories.push(`Earring (R): ${earName}`);
    }
  }
  if (equipments.neck) {
    const neck = getEquipment(equipments.neck);
    if (neck) {
      const neckName = typeof neck.name === 'string' ? neck.name : neck.name?.en || equipments.neck;
      accessories.push(`Necklace: ${neckName}`);
    }
  }

  if (armorPieces.length > 0) {
    items.push(...armorPieces);
  }
  if (accessories.length > 0) {
    items.push(...accessories);
  }

  return items.length > 0 ? items.join("; ") : "";
}

/**
 * Format fame values for AI context
 * Shows fame per sub-region with tier names
 */
function formatFame(fame: Character["fame"]): string {
  if (!fame || typeof fame !== 'object') {
    return "";
  }

  // Check if fame has the get method (CharacterFame instance)
  if (typeof (fame as any).get !== 'function') {
    return "";
  }

  // CharacterFame has a private Map, but we can access it through the get method
  // We need to iterate through all possible SubRegionEnum values
  const fameEntries: string[] = [];
  
  // Get all subregion enum values
  const subRegions = Object.values(SubRegionEnum) as SubRegionEnum[];
  
  for (const region of subRegions) {
    const fameValue = (fame as any).get(region);
    if (fameValue > 0) {
      const tier = getFameTier(fameValue);
      const regionName = formatSubRegionName(region);
      fameEntries.push(`${regionName}: ${fameValue} (${tier})`);
    }
  }

  return fameEntries.length > 0 ? fameEntries.join(", ") : "";
}

/**
 * Get fame tier name based on value
 */
function getFameTier(value: number): string {
  if (value >= 12000) return "Legendary";
  if (value >= 6000) return "Heroic";
  if (value >= 2500) return "Famous";
  if (value >= 1000) return "Renowned";
  if (value >= 400) return "Recognized";
  if (value >= 150) return "Familiar";
  if (value >= 50) return "Known";
  return "No name";
}

/**
 * Format subregion enum name to readable string
 * e.g., "GoldenPlains" -> "Golden Plains"
 */
function formatSubRegionName(region: SubRegionEnum): string {
  return region
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
}

/**
 * Format join party information for AI context
 */
function formatJoinPartyInfo(
  criteria: Awaited<ReturnType<typeof getJoinCriteria>>,
  impression: NPCImpression | null
): string {
  if (!criteria) {
    return "You cannot join parties.";
  }

  const parts: string[] = [];

  if (!criteria.canJoin) {
    return "You cannot join parties.";
  }

  parts.push("You are available to join this player's party, but there are conditions:");

  // Payment requirement
  if (criteria.hiring && criteria.hiring > 0) {
    parts.push(`- They must pay you ${criteria.hiring} gold to hire you as a mercenary`);
  }

  // Relationship requirements
  if (impression) {
    if (criteria.closeness !== undefined) {
      const met = impression.closeness >= criteria.closeness;
      parts.push(
        `- ${met ? "✓" : "✗"} Closeness requirement: ${criteria.closeness} (current: ${impression.closeness})`
      );
    }
    if (criteria.affection !== undefined) {
      const met = impression.affection >= criteria.affection;
      parts.push(
        `- ${met ? "✓" : "✗"} Affection requirement: ${criteria.affection} (current: ${impression.affection})`
      );
    }
  } else {
    if (criteria.closeness && criteria.closeness > 0) {
      parts.push(`- ✗ Closeness requirement: ${criteria.closeness} (current: 0 - first meeting)`);
    }
    if (criteria.affection && criteria.affection > 0) {
      parts.push(`- ✗ Affection requirement: ${criteria.affection} (current: 0 - first meeting)`);
    }
  }

  // Quest requirement
  if (criteria.haveQuest) {
    parts.push(`- ✗ Must complete quest: ${criteria.haveQuest}`);
  }

  // Custom conditions
  if (criteria.customConditions && criteria.customConditions.length > 0) {
    criteria.customConditions.forEach((condition) => {
      parts.push(`- ${condition.description}`);
    });
  }

  parts.push("\nIf the player asks you to join their party, evaluate these conditions. If they're met (or if payment is offered), you can agree. Otherwise, explain what's needed.");

  return parts.join("\n");
}

/**
 * Format NPC impression for AI context
 */
function formatNPCImpression(impression: Awaited<ReturnType<typeof getNPCImpression>>): string {
  if (!impression) {
    return "You don't recognize this person yet. This is your first meeting - they are a stranger to you.";
  }

  const parts: string[] = [];

  // Relationship status - explicitly show "stranger" if null
  const relationTitle = impression.relationTitle || "stranger";
  parts.push(`You consider them: ${relationTitle}`);

  // Affection and closeness
  parts.push(`Your feelings: Affection ${impression.affection}/100, Closeness ${impression.closeness}/100`);

  // Conversation count
  if (impression.conversationCount > 0) {
    parts.push(`You have spoken ${impression.conversationCount} time${impression.conversationCount > 1 ? 's' : ''} before`);
  } else {
    parts.push(`This is your first conversation with them`);
  }

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
function formatChatHistory(history: ChatHistoryEntry[]): string {
  if (history.length === 0) {
    return "No previous conversation history.";
  }

  const formatted = history.map(entry => {
    const role = entry.role === "user" ? "Player" : "You";
    return `${role}: ${entry.content}`;
  }).join("\n");

  return formatted;
}

