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
import { getNPCLifeSummary } from "./NPCSummaryService";
import type { ChatHistoryEntry } from "./ChatHistoryService";
// Note: getJoinPartyToolDefinition removed - party joining is now a direct player action via UI, not an AI tool
import { getBattleInitiationToolDefinition } from "./BattleInitiationService";
import { getImpressionUpdateToolDefinition } from "./ImpressionUpdateTool";
import type { LLMTool } from "./LLMService";
import Report from "../Utils/Reporter";
import { characterManager } from "src/Game/CharacterManager";

/**
 * Get available tools for NPC chat
 * Returns array of tool definitions that the LLM can call
 */
export function getAvailableTools(npcId: string): LLMTool[] {
  const tools: LLMTool[] = [];
  
  // Note: checkJoinParty is NOT an AI tool - it's a direct player action via UI button
  // Players initiate party invitations through the UI, not through chat
  
  // Add initiateBattle tool - all NPCs can defend themselves
  tools.push(getBattleInitiationToolDefinition());
  
  // Add updateImpression tool - AI can update impressions (slowly, sparingly)
  tools.push(getImpressionUpdateToolDefinition());
  
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
    // Load all required data upfront
    const npc = characterManager.getCharacterByID(npcId);
    const npcMemory = await getNPCMemory(npcId, true);
    const impression = await getNPCImpression(npcId, character.id);
    const { summary, recentMessages } = await getChatHistoryWithSummary(npcId, character.id,5);

    // Build each section using helper functions
    const promptParts: string[] = [];
    promptParts.push(await buildNPCCharacterSection(npcId, npc, npcMemory));
    promptParts.push(buildNPCKnowledgeSection(npcMemory));
    promptParts.push(buildPlayerContextSection(character, npcId, impression));
    promptParts.push(buildImpressionSection(impression));
    promptParts.push(buildConversationHistorySection(summary, recentMessages));
    promptParts.push(buildBehavioralGuidelinesSection());
    promptParts.push(buildToolsSection(npcId, character.id));
    promptParts.push(buildUserMessageSection(userMessage));

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
 * Build NPC character and personality section
 */
async function buildNPCCharacterSection(
  npcId: string,
  npc: Character,
  npcMemory: Awaited<ReturnType<typeof getNPCMemory>>
): Promise<string> {
  const parts: string[] = [];

  if (npcMemory?.personalPrompt) {
    parts.push(`NPC Character: ${npcMemory.personalPrompt}\n`);
  } else {
    parts.push(`You are ${npc.name.en}, a character in this world.\n`);
  }

  parts.push("You speak and act based on your own experiences and observations, not on hidden system rules.\n");
  parts.push("You are a living character who can change your mind, reassess situations, and respond to new information. Past interactions inform you but don't lock you into patterns. Each conversation is a fresh opportunity to respond authentically.\n");

  const lifeSummary = await getNPCLifeSummary(npcId);
  if (lifeSummary) {
    parts.push(`These experiences inform your perspective, but do not dictate how you must respond in this conversation.\n:\n${lifeSummary}\n`);
  }

  return parts.join("");
}

/**
 * Build NPC knowledge/news section
 */
function buildNPCKnowledgeSection(
  npcMemory: Awaited<ReturnType<typeof getNPCMemory>>
): string {
  if (!npcMemory?.newsDetails || npcMemory.newsDetails.length === 0) {
    return "";
  }

  const parts: string[] = ["Your Knowledge:\n"];
  npcMemory.newsDetails.forEach((news) => {
    if (news.context) {
      parts.push(`- ${news.context}\n`);
    }
  });
  parts.push("\n");

  return parts.join("");
}

/**
 * Build player context section
 */
function buildPlayerContextSection(
  character: Character,
  npcId: string,
  impression: NPCImpression | null
): string {
  const parts: string[] = [
    "The player who's talking to you is:\n",
    formatPlayerContext(character, npcId, impression),
    "\n"
  ];
  return parts.join("");
}

/**
 * Build NPC impression section
 */
function buildImpressionSection(impression: NPCImpression | null): string {
  const parts: string[] = [
    formatNPCImpression(impression),
    "\n"
  ];
  return parts.join("");
}

/**
 * Build conversation history section
 */
function buildConversationHistorySection(
  summary: string | null,
  recentMessages: ChatHistoryEntry[]
): string {
  const parts: string[] = ["Recent Conversation:\n"];

  if (summary) {
    parts.push(`Previous conversations (older than recent messages below): ${summary}\n\n`);
    parts.push("Focus on the recent messages below - they represent the current state of your relationship.\n\n");
  }

  parts.push(formatChatHistory(recentMessages));
  parts.push("\n");

  return parts.join("");
}

/**
 * Build behavioral guidelines section
 */
function buildBehavioralGuidelinesSection(): string {
  const parts: string[] = [
    "Important Behavioral Guidelines:\n",
    "- Stay true to your character's personality, values, and boundaries\n",
    "- You can change your opinion of someone based on their current actions, not just past interactions\n",
    "- You have the right to refuse inappropriate requests\n",
    "- Act as if you are an actual character in the world with free will and emotions\n",
    "\n"
  ];
  return parts.join("");
}

/**
 * Build available tools section
 */
function buildToolsSection(npcId: string, playerId: string): string {
  const availableTools = getAvailableTools(npcId);
  if (availableTools.length === 0) {
    return "";
  }

  const parts: string[] = [
    "Available Actions (USE THESE TOOLS WHEN APPROPRIATE):\n"
  ];

  availableTools.forEach((tool) => {
    parts.push(`- ${tool.function.name}: ${tool.function.description}\n`);
  });

  parts.push("\n");
  parts.push("CRITICAL INSTRUCTIONS FOR TOOL USE:\n");
  parts.push("\n");
  parts.push("1. BATTLE INITIATION:\n");
  parts.push("If the player threatens you, attacks you, or makes violent/aggressive statements, you MUST call the initiateBattle tool. Examples:\n");
  parts.push("- 'I'll kill you', 'Die now', 'Attack you'\n");
  parts.push("- Threats with commands like 'Die now, woman!'\n");
  parts.push("- Any violent or aggressive language directed at you\n");
  parts.push("You have the right to defend yourself. Call initiateBattle when threatened.\n");
  parts.push(`To call the tool, use: initiateBattle(npcId="${npcId}", playerId="${playerId}", reason="Player threatened me: [their message]")\n\n`);

  return parts.join("");
}

/**
 * Build user message section
 */
function buildUserMessageSection(userMessage: string): string {
  return `Player says: "${userMessage}"\n\nRespond naturally as this NPC character would, maintaining your character's boundaries and dignity:`;
}

/**
 * Format player character context for AI
 */
function formatPlayerContext(player: Character, npcId: string, impression: NPCImpression | null): string {
  const context: string[] = [];

  context.push(`Level: ${player.level}, `);
  context.push(`Gender: ${player.gender}, `);
  context.push(`Race: ${player.race}\n`);
  // Basic info
  const playerName = typeof player.name === 'string' 
    ? player.name 
    : player.name?.en || "Unknown";
  context.push(`Name: ${playerName}\n`);

  // Level, Race, Gender

  // Title
  const titleStr = player.title.string();
  if (titleStr.en || titleStr.th) {
    context.push(`Title: ${titleStr.en || titleStr.th}\n`);
  }

  // Fame - format properly with regions and tiers
  const fameInfo = formatFame(player.fame);
  if (fameInfo) {
    context.push(`Fame: ${fameInfo}\n`);
  } else {
    context.push(`Fame: Unknown or no reputation yet\n`);
  }

  // Simple relationship label only (no numbers, detailed info is in impression section)
  if (impression) {
    const relationTitle = impression.relationTitle || "stranger";
    context.push(`You know them as: ${relationTitle}\n`);
  } else {
    context.push(`You know them as: stranger (first meeting)\n`);
  }

  // Equipment (all visible items)
  const equipment = formatEquipment(player.equipments);
  if (equipment) {
    context.push(`Equipping with: ${equipment}, `);
  }

  return context.join("");
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
 * Format NPC impression for AI context
 */
function formatNPCImpression(impression: Awaited<ReturnType<typeof getNPCImpression>>): string {
  if (!impression) {
    return "You don't recognize this person yet. This is your first meeting - they are a stranger to you.\nRemember: Your impression can evolve. New interactions matter more than past assumptions.";
  }

  const parts: string[] = [];

  // Relationship status - explicitly show "stranger" if null
  const relationTitle = impression.relationTitle || "stranger";
  parts.push(`You consider them: ${relationTitle}`);

  // Affection and closeness - present as current state
  parts.push(`Current feelings: Affection ${impression.affection}/100, Closeness ${impression.closeness}/100`);

  // If this is first time
  if (impression.conversationCount === 0) {
    parts.push(`This is your first conversation with them`);
  }

  // Important events (keep these as they're factual)
  if (impression.importantEvents && impression.importantEvents.length > 0) {
    const eventDescriptions = impression.importantEvents
      .map((event: any) => event.description || JSON.stringify(event))
      .join(", ");
    parts.push(`Notable events: ${eventDescriptions}`);
  }

  // Add closing agency language
  parts.push("Remember: Your impression can evolve. New interactions matter more than past summaries.");

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
