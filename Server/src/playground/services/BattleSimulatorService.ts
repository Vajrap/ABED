import { Battle } from "src/Entity/Battle/Battle";
import { BattleType } from "src/Entity/Battle/types";
import { Party } from "src/Entity/Party/Party";
import { PartyBehavior } from "src/Entity/Party/PartyBehavior";
import { locationRepository } from "src/Entity/Location/Location/repository";
import { GameTime } from "src/Game/GameTime/GameTime";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { Character } from "src/Entity/Character/Character";
import { CharacterBuilderService } from "./CharacterBuilderService";
import type { SimulateBattleRequest } from "../types/requests";
import type { SimulateBattleResponse, TurnDetail, CharacterSnapshot, StructuredBattleStatistics, CharacterStructuredStats, TurnAction } from "../types/responses";
import type { CharacterBattleStats } from "src/Entity/Battle/BattleStatistics";
import type { TurnResult } from "src/Entity/Skill/types";
import { skillRepository } from "src/Entity/Skill/repository";
import type { SkillId } from "src/Entity/Skill/enums";

export class BattleSimulatorService {
  /**
   * Simulate a battle and return structured results
   */
  static async simulateBattle(request: SimulateBattleRequest): Promise<SimulateBattleResponse> {
    const characterIds: string[] = [];

    try {
      // Build characters for both parties
      const partyACharacters = CharacterBuilderService.buildCharacters(request.partyA);
      const partyBCharacters = CharacterBuilderService.buildCharacters(request.partyB);

      // Track all character IDs for cleanup
      characterIds.push(...partyACharacters.map(c => c.id));
      characterIds.push(...partyBCharacters.map(c => c.id));

      // Ensure parties have at least one character
      if (partyACharacters.length === 0 || partyBCharacters.length === 0) {
        throw new Error('Both parties must have at least one character');
      }

      // Ensure we have leaders
      const partyALeader = partyACharacters[0];
      const partyBLeader = partyBCharacters[0];
      if (!partyALeader || !partyBLeader) {
        throw new Error('Both parties must have at least one character');
      }

      // Create parties - Party constructor will handle positioning based on character.position
      const partyA = new Party({
        leader: partyALeader,
        leaderId: partyALeader.id,
        behavior: new PartyBehavior(),
        characters: partyACharacters,
        location: request.location,
      });

      const partyB = new Party({
        leader: partyBLeader,
        leaderId: partyBLeader.id,
        behavior: new PartyBehavior(),
        characters: partyBCharacters,
        location: request.location,
      });

      // Get location
      const location = locationRepository[request.location as keyof typeof locationRepository];
      if (!location) {
        throw new Error(`Unknown location: ${request.location}`);
      }

      // Create and run battle
      const battle = new Battle(
        partyA,
        partyB,
        location,
        GameTime,
        request.battleType,
      );

      await battle.startBattle();

      // Extract turn details from battle report
      // Track skills used per character in order to map them to specific turns
      const characterSkillHistory = new Map<string, Array<{ turnNumber: number; skillId: string }>>();
      
      // First pass: build skill history by tracking when each skill was used
      let turnNumber = 1;
      for (const turnResult of battle.battleReport.turnResults) {
        const charStats = battle.battleStatistics.getCharacterStats(turnResult.actor.actorId);
        if (charStats && charStats.skillsUsed) {
          // Find which skill was used in this turn by comparing skill counts
          // We need to track the order, so we'll infer from content or use the most likely skill
          const skillId = this.getSkillForTurn(turnResult, charStats, turnNumber, characterSkillHistory);
          if (skillId) {
            if (!characterSkillHistory.has(turnResult.actor.actorId)) {
              characterSkillHistory.set(turnResult.actor.actorId, []);
            }
            characterSkillHistory.get(turnResult.actor.actorId)!.push({ turnNumber, skillId });
          }
        }
        turnNumber++;
      }
      
      // Second pass: extract turn details with accurate skill information
      const turns: TurnDetail[] = [];
      turnNumber = 1;
      for (const turnResult of battle.battleReport.turnResults) {
        turns.push(this.extractTurnDetail(turnResult, turnNumber, battle, characterSkillHistory));
        turnNumber++;
      }

      // Get character snapshots at battle end (only living characters)
      const partyASnapshots = this.getCharacterSnapshots(
        partyA.characters.filter((c): c is Character => c !== "none")
      );
      const partyBSnapshots = this.getCharacterSnapshots(
        partyB.characters.filter((c): c is Character => c !== "none")
      );

      // Determine winner based on battle report
      let winner: 'partyA' | 'partyB' | 'draw' = 'draw';
      if (battle.battleReport.winnerPartyId) {
        // Check which party won by comparing partyID (leaderId)
        const partyAWon = battle.partyA.partyID === battle.battleReport.winnerPartyId;
        const partyBWon = battle.partyB.partyID === battle.battleReport.winnerPartyId;
        if (partyAWon) {
          winner = 'partyA';
        } else if (partyBWon) {
          winner = 'partyB';
        }
      }
      
      // Calculate survivors count
      const partyASurvivors = partyASnapshots.filter(c => !c.isDead).length;
      const partyBSurvivors = partyBSnapshots.filter(c => !c.isDead).length;
      
      // Fallback: check survivors if winner not set or empty
      if (!battle.battleReport.winnerPartyId || winner === 'draw') {
        if (partyASurvivors === 0 && partyBSurvivors === 0) {
          winner = 'draw';
        } else if (partyASurvivors === 0) {
          winner = 'partyB';
        } else if (partyBSurvivors === 0) {
          winner = 'partyA';
        } else {
          // Both have survivors - draw (turn limit reached)
          winner = 'draw';
        }
      }

      // Get statistics
      const characterStats = battle.battleStatistics.getAllStats();
      const summary = battle.battleStatistics.getSummary();
      const structuredStats = this.buildStructuredStatistics(battle, turns);

      return {
        battleId: battle.id,
        outcome: {
          winner,
          message: battle.battleReport.outcome,
          duration: battle.battleReport.duration,
        },
        partyA: {
          characters: partyASnapshots,
          survivors: partyASurvivors,
        },
        partyB: {
          characters: partyBSnapshots,
          survivors: partyBSurvivors,
        },
        turns,
        statistics: {
          characters: characterStats,
          summary,
          structured: structuredStats,
        },
      };
    } finally {
      // Clean up characters from registry
      CharacterBuilderService.cleanupCharacters(characterIds);
    }
  }

  /**
   * Get the skill ID used in a specific turn
   */
  private static getSkillForTurn(
    turnResult: TurnResult,
    charStats: any,
    turnNumber: number,
    characterSkillHistory: Map<string, Array<{ turnNumber: number; skillId: string }>>
  ): string | null {
    // First, try to match skill name from content against all skills
    const content = turnResult.content.en;
    for (const [skillId, skill] of Object.entries(skillRepository)) {
      if (skill && skill.name && skill.name.en && content.includes(skill.name.en)) {
        return skillId;
      }
    }
    
    // If we can't match by name, infer from content patterns
    return this.inferSkillFromContent(content);
  }

  /**
   * Extract turn detail from TurnResult
   */
  private static extractTurnDetail(
    turnResult: TurnResult,
    turnNumber: number,
    battle: Battle,
    characterSkillHistory?: Map<string, Array<{ turnNumber: number; skillId: string }>>
  ): TurnDetail {
    const actor = battle.allParticipants.find(c => c.id === turnResult.actor.actorId);
    const actorName = actor?.name.en || 'Unknown';

    // Get current resources (approximation)
    const resourcesBefore = actor ? {
      hp: actor.vitals.hp.current,
      mp: actor.vitals.mp.current,
      sp: actor.vitals.sp.current,
    } : undefined;

    // Extract skill used from turn content by matching against all skills in repository
    let skillUsed;
    const content = turnResult.content.en;
    
    // First, try to match skill name from content against all skills in repository
    for (const [skillId, skill] of Object.entries(skillRepository)) {
      if (skill && skill.name && skill.name.en && content.includes(skill.name.en)) {
        skillUsed = {
          id: skillId as SkillId,
          name: skill.name.en,
          level: 1,
        };
        break;
      }
    }
    
    // If we couldn't find by exact name match, try the skill history
    if (!skillUsed && characterSkillHistory) {
      const history = characterSkillHistory.get(turnResult.actor.actorId);
      if (history) {
        const turnSkill = history.find(h => h.turnNumber === turnNumber);
        if (turnSkill) {
          const skill = skillRepository[turnSkill.skillId as keyof typeof skillRepository];
          if (skill && skill.name && skill.name.en) {
            skillUsed = {
              id: turnSkill.skillId as SkillId,
              name: skill.name.en,
              level: 1,
            };
          }
        }
      }
    }
    
    // Fallback: infer from content patterns
    if (!skillUsed) {
      const skillId = this.inferSkillFromContent(content);
      if (skillId && skillId in skillRepository) {
        const skill = skillRepository[skillId as keyof typeof skillRepository];
        if (skill && skill.name && skill.name.en) {
          skillUsed = {
            id: skillId as SkillId,
            name: skill.name.en,
            level: 1,
          };
        }
      }
    }
    
    // Last resort: use "Unknown" or "Basic"
    if (!skillUsed) {
      const basicSkill = skillRepository['Basic' as keyof typeof skillRepository];
      skillUsed = {
        id: 'Basic' as SkillId,
        name: (basicSkill && basicSkill.name && basicSkill.name.en) ? basicSkill.name.en : 'Basic Attack',
        level: 1,
      };
    }

    // Extract target information
    const targets = turnResult.targets.map(target => {
      const targetChar = battle.allParticipants.find(c => c.id === target.actorId);
      const targetName = targetChar?.name.en || 'Unknown';
      
      // Parse effects
      const effects = target.effect.map(e => e.toString());
      
      // Try to extract damage/healing from content
      const damage = this.extractDamageFromContent(turnResult.content.en, targetName);
      const healing = this.extractHealingFromContent(turnResult.content.en, targetName);
      
      // Check if it's a crit or hit based on effects
      const isCrit = effects.some(e => e.includes('Crit') || e.includes('Critical') || e.toLowerCase().includes('crit'));
      const isHit = damage !== undefined || healing !== undefined || !turnResult.content.en.toLowerCase().includes('missed');
      
      return {
        id: target.actorId,
        name: targetName,
        effects: effects.length > 0 ? effects : [],
        damage: damage !== undefined ? damage : undefined,
        healing: healing !== undefined ? healing : undefined,
        isCrit,
        isHit,
      };
    }).filter(t => t.effects.length > 0 || t.damage !== undefined || t.healing !== undefined);

    return {
      turnNumber,
      actorId: turnResult.actor.actorId,
      actorName,
      summary: turnResult.content.en, // One-line summary
      details: {
        resourcesBefore,
        skillUsed,
        targets: targets.length > 0 ? targets : undefined,
      },
    };
  }

  /**
   * Infer skill ID from turn content
   */
  private static inferSkillFromContent(content: string): string | null {
    // First, try to match against all skills in repository by name
    for (const [skillId, skill] of Object.entries(skillRepository)) {
      if (skill && skill.name && skill.name.en) {
        // Check if content contains the skill name
        if (content.includes(skill.name.en)) {
          return skillId;
        }
        // Also check for common variations (case insensitive, with/without spaces)
        const skillNameLower = skill.name.en.toLowerCase();
        const contentLower = content.toLowerCase();
        if (contentLower.includes(skillNameLower) || 
            contentLower.includes(skillNameLower.replace(/\s+/g, ''))) {
          return skillId;
        }
      }
    }

    // Fallback to pattern matching for common skills
    const skillPatterns: Record<string, string[]> = {
      'Basic': ['Basic Attack', 'attacked', 'strikes', 'basic'],
      'Heal': ['healed', 'restored', 'Heal'],
      'FireBolt': ['Fire Bolt', 'fire bolt', 'FireBolt'],
      'WarCry': ['War Cry', 'WarCry', 'war cry'],
      'Taunt': ['taunted', 'Taunt'],
      'PowerStrike': ['Power Strike', 'PowerStrike'],
    };

    for (const [skillId, patterns] of Object.entries(skillPatterns)) {
      if (patterns.some(pattern => content.toLowerCase().includes(pattern.toLowerCase()))) {
        return skillId;
      }
    }

    return null;
  }

  /**
   * Extract damage amount from content
   */
  private static extractDamageFromContent(content: string, targetName: string): number | undefined {
    // Look for patterns like "dealing X damage" or "X damage" near target name
    const patterns = [
      new RegExp(`${targetName}.*?(?:dealing|dealt|deals)\\s+(\\d+)\\s+(?:\\w+\\s+)?damage`, 'i'),
      new RegExp(`attacked\\s+${targetName}.*?(?:dealing|dealt|deals)\\s+(\\d+)\\s+(?:\\w+\\s+)?damage`, 'i'),
      new RegExp(`${targetName}.*?(\\d+)\\s+(?:\\w+\\s+)?damage`, 'i'),
    ];

    for (const regex of patterns) {
      const match = content.match(regex);
      if (match && match[1]) {
        const damage = parseInt(match[1], 10);
        if (!isNaN(damage)) {
          return damage;
        }
      }
    }
    return undefined;
  }

  /**
   * Extract healing amount from content
   */
  private static extractHealingFromContent(content: string, targetName: string): number | undefined {
    // Look for patterns like "healed for X HP" or "restored X HP"
    const patterns = [
      new RegExp(`${targetName}.*?(?:healed|restored)\\s+for\\s+(\\d+)\\s+HP`, 'i'),
      new RegExp(`${targetName}.*?(?:healed|restored)\\s+(\\d+)\\s+HP`, 'i'),
      new RegExp(`healed\\s+${targetName}.*?for\\s+(\\d+)\\s+HP`, 'i'),
    ];

    for (const regex of patterns) {
      const match = content.match(regex);
      if (match && match[1]) {
        const healing = parseInt(match[1], 10);
        if (!isNaN(healing)) {
          return healing;
        }
      }
    }
    return undefined;
  }

  /**
   * Get character snapshots at battle end
   */
  private static getCharacterSnapshots(characters: Character[]): CharacterSnapshot[] {
    return characters.map(char => ({
      id: char.id,
      name: char.name.en,
      position: char.position,
      hp: {
        current: char.vitals.hp.current,
        max: char.vitals.hp.max,
      },
      mp: {
        current: char.vitals.mp.current,
        max: char.vitals.mp.max,
      },
      sp: {
        current: char.vitals.sp.current,
        max: char.vitals.sp.max,
      },
      isDead: char.vitals.isDead,
    }));
  }

  /**
   * Build structured statistics for UI rendering
   */
  private static buildStructuredStatistics(
    battle: Battle,
    turns: TurnDetail[]
  ): StructuredBattleStatistics {
    const characterStats = battle.battleStatistics.getAllStats();
    const characters: Record<string, CharacterStructuredStats> = {};
    
    // Initialize character stats
    for (const stats of characterStats) {
      // Calculate front/back row targets
      const frontRowTargets = [0, 1, 2].reduce((sum, pos) => 
        sum + (stats.targetsHitByPosition[pos] || 0), 0
      );
      const backRowTargets = Object.entries(stats.targetsHitByPosition)
        .filter(([pos]) => parseInt(pos) >= 3)
        .reduce((sum, [, count]) => sum + count, 0);

      characters[stats.characterId] = {
        characterId: stats.characterId,
        characterName: stats.characterName,
        position: stats.position,
        overallDamage: stats.damageDealt,
        overallHealing: stats.healingDone,
        damageTaken: stats.damageTaken,
        healingReceived: stats.healingReceived,
        turns: [],
        frontRowTargets,
        backRowTargets,
        skillsUsed: { ...stats.skillsUsed },
      };
    }

    // Build turn-by-turn actions for each character
    for (const turn of turns) {
      const charStats = characters[turn.actorId];
      if (!charStats) continue;

      // Extract actions from this turn
      if (turn.details.targets) {
        for (const target of turn.details.targets) {
          const action: TurnAction = {
            turnNumber: turn.turnNumber,
            type: target.damage !== undefined ? 'damage' : (target.healing !== undefined ? 'heal' : 'other'),
            value: target.damage ?? target.healing ?? 0,
            skill: turn.details.skillUsed?.name || String(turn.details.skillUsed?.id || 'Unknown'),
            targetId: target.id,
            targetName: target.name,
            isCrit: target.isCrit,
            isHit: target.isHit,
          };
          charStats.turns.push(action);
        }
      } else if (turn.details.skillUsed) {
        // Action with no targets (buff, self-heal, etc.)
        const action: TurnAction = {
          turnNumber: turn.turnNumber,
          type: 'other',
          value: 0,
          skill: turn.details.skillUsed.name || String(turn.details.skillUsed.id || 'Unknown'),
        };
        charStats.turns.push(action);
      }
    }

    // Calculate front-back ratio from all characters' targeting
    let totalFrontRowDamage = 0;
    let totalBackRowDamage = 0;
    
    for (const stats of characterStats) {
      // Sum damage dealt to front row (positions 0-2)
      for (let pos = 0; pos <= 2; pos++) {
        totalFrontRowDamage += stats.damageDealtByPosition[pos] || 0;
      }
      // Sum damage dealt to back row (positions 3+)
      for (const [posStr, damage] of Object.entries(stats.damageDealtByPosition)) {
        const pos = parseInt(posStr);
        if (pos >= 3) {
          totalBackRowDamage += damage;
        }
      }
    }

    // Calculate ratio (front:back), avoid division by zero
    const frontBackRatio = totalBackRowDamage > 0 
      ? totalFrontRowDamage / totalBackRowDamage 
      : (totalFrontRowDamage > 0 ? 1 : 0);

    return {
      frontBackRatio: Math.round(frontBackRatio * 100) / 100, // Round to 2 decimal places
      characters,
    };
  }
}

