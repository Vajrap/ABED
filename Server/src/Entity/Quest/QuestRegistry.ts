import type { QuestDefinition } from "./QuestDefinition";
import Report from "../../Utils/Reporter";

/**
 * Quest Registry
 * Stores all quest definitions in memory
 * Similar to NPC template registry
 */
export class QuestRegistry {
  private quests: Map<string, QuestDefinition> = new Map();
  private questsByGiver: Map<string, Set<string>> = new Map(); // giverId -> Set<questId>
  private questsByChain: Map<string, Set<string>> = new Map(); // chainId -> Set<questId>

  /**
   * Register a quest definition
   */
  register(definition: QuestDefinition): void {
    if (this.quests.has(definition.id)) {
      Report.warn(`Quest definition already registered: ${definition.id}`);
      return;
    }

    this.quests.set(definition.id, definition);

    // Index by giver
    if (!this.questsByGiver.has(definition.giverId)) {
      this.questsByGiver.set(definition.giverId, new Set());
    }
    this.questsByGiver.get(definition.giverId)!.add(definition.id);

    // Index by chain
    if (definition.chainId) {
      if (!this.questsByChain.has(definition.chainId)) {
        this.questsByChain.set(definition.chainId, new Set());
      }
      this.questsByChain.get(definition.chainId)!.add(definition.id);
    }
  }

  /**
   * Get a quest definition by ID
   */
  get(questId: string): QuestDefinition | null {
    return this.quests.get(questId) || null;
  }

  /**
   * Get all quests from a specific giver (NPC)
   */
  getByGiver(giverId: string): QuestDefinition[] {
    const questIds = this.questsByGiver.get(giverId);
    if (!questIds) {
      return [];
    }

    const quests: QuestDefinition[] = [];
    for (const questId of questIds) {
      const quest = this.quests.get(questId);
      if (quest) {
        quests.push(quest);
      }
    }

    return quests;
  }

  /**
   * Get all quests in a chain
   */
  getByChain(chainId: string): QuestDefinition[] {
    const questIds = this.questsByChain.get(chainId);
    if (!questIds) {
      return [];
    }

    const quests: QuestDefinition[] = [];
    for (const questId of questIds) {
      const quest = this.quests.get(questId);
      if (quest) {
        quests.push(quest);
      }
    }

    // Sort by chainOrder if available
    return quests.sort((a, b) => {
      const orderA = a.chainOrder || 0;
      const orderB = b.chainOrder || 0;
      return orderA - orderB;
    });
  }

  /**
   * Get all quest definitions
   */
  getAll(): QuestDefinition[] {
    return Array.from(this.quests.values());
  }

  /**
   * Clear all registered quests (useful for testing)
   */
  clear(): void {
    this.quests.clear();
    this.questsByGiver.clear();
    this.questsByChain.clear();
  }

  /**
   * Get count of registered quests
   */
  getCount(): number {
    return this.quests.size;
  }
}

// Singleton instance
export const questRegistry = new QuestRegistry();

