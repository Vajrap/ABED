import type { Character } from "../Character/Character";

/**
 * Statistics for a single character during battle
 */
export interface CharacterBattleStats {
  characterId: string;
  characterName: string;
  position: number; // Character's position in party
  turnsTaken: number;
  damageDealt: number;
  damageTaken: number;
  healingDone: number;
  healingReceived: number;
  critsDealt: number;
  critsReceived: number;
  hitsDealt: number;
  hitsReceived: number;
  missesDealt: number;
  missesReceived: number;
  skillsUsed: Record<string, number>; // skillId -> count
  // Position-based targeting stats
  targetsHitByPosition: Record<number, number>; // position -> count of hits
  targetsMissedByPosition: Record<number, number>; // position -> count of misses
  damageDealtByPosition: Record<number, number>; // position -> total damage
  damageTakenByPosition: Record<number, number>; // position -> total damage taken from
}

/**
 * Battle statistics tracker
 * Tracks per-character statistics throughout a battle
 */
export class BattleStatistics {
  private stats: Map<string, CharacterBattleStats> = new Map();
  private hpBeforeTurn: Map<string, number> = new Map();

  /**
   * Initialize statistics for a character
   */
  initializeCharacter(character: Character): void {
    if (!this.stats.has(character.id)) {
      this.stats.set(character.id, {
        characterId: character.id,
        characterName: character.name.en,
        position: character.position,
        turnsTaken: 0,
        damageDealt: 0,
        damageTaken: 0,
        healingDone: 0,
        healingReceived: 0,
        critsDealt: 0,
        critsReceived: 0,
        hitsDealt: 0,
        hitsReceived: 0,
        missesDealt: 0,
        missesReceived: 0,
        skillsUsed: {},
        targetsHitByPosition: {},
        targetsMissedByPosition: {},
        damageDealtByPosition: {},
        damageTakenByPosition: {},
      });
    }
  }

  /**
   * Record HP before a turn (to calculate healing)
   */
  recordHpBeforeTurn(character: Character): void {
    this.hpBeforeTurn.set(character.id, character.vitals.hp.current);
  }

  /**
   * Record HP after a turn (to calculate healing)
   */
  recordHpAfterTurn(character: Character): void {
    const beforeHp = this.hpBeforeTurn.get(character.id) ?? character.vitals.hp.current;
    const afterHp = character.vitals.hp.current;
    const hpChange = afterHp - beforeHp;

    if (hpChange > 0) {
      // Healing received
      const stats = this.stats.get(character.id);
      if (stats) {
        stats.healingReceived += hpChange;
      }
    }
  }

  /**
   * Record a turn taken by a character
   */
  recordTurn(characterId: string, skillId: string): void {
    const stats = this.stats.get(characterId);
    if (stats) {
      stats.turnsTaken++;
      stats.skillsUsed[skillId] = (stats.skillsUsed[skillId] || 0) + 1;
    }
  }

  /**
   * Record damage dealt by attacker to target
   */
  recordDamageDealt(
    attackerId: string,
    targetId: string,
    damage: number,
    isCrit: boolean,
    isHit: boolean,
  ): void {
    const attackerStats = this.stats.get(attackerId);
    const targetStats = this.stats.get(targetId);

    if (attackerStats && targetStats) {
      const targetPosition = targetStats.position;
      
      // Update attacker stats
      attackerStats.damageDealt += damage;
      if (isHit) {
        attackerStats.hitsDealt++;
        attackerStats.targetsHitByPosition[targetPosition] = 
          (attackerStats.targetsHitByPosition[targetPosition] || 0) + 1;
        attackerStats.damageDealtByPosition[targetPosition] = 
          (attackerStats.damageDealtByPosition[targetPosition] || 0) + damage;
      } else {
        attackerStats.missesDealt++;
        attackerStats.targetsMissedByPosition[targetPosition] = 
          (attackerStats.targetsMissedByPosition[targetPosition] || 0) + 1;
      }
      if (isCrit) {
        attackerStats.critsDealt++;
      }
      
      // Update target stats
      const attackerPosition = attackerStats.position;
      targetStats.damageTaken += damage;
      if (isHit) {
        targetStats.hitsReceived++;
      } else {
        targetStats.missesReceived++;
      }
      if (isCrit) {
        targetStats.critsReceived++;
      }
      targetStats.damageTakenByPosition[attackerPosition] = 
        (targetStats.damageTakenByPosition[attackerPosition] || 0) + damage;
    }
  }

  /**
   * Record healing done by healer to target
   */
  recordHealingDone(healerId: string, targetId: string, healing: number): void {
    const healerStats = this.stats.get(healerId);
    if (healerStats) {
      healerStats.healingDone += healing;
    }
  }

  /**
   * Get statistics for a specific character
   */
  getCharacterStats(characterId: string): CharacterBattleStats | undefined {
    return this.stats.get(characterId);
  }

  /**
   * Get all statistics
   */
  getAllStats(): CharacterBattleStats[] {
    return Array.from(this.stats.values());
  }

  /**
   * Get statistics as a map
   */
  getStatsMap(): Map<string, CharacterBattleStats> {
    return this.stats;
  }

  /**
   * Get a summary string for all characters
   */
  getSummary(): string {
    const lines: string[] = [];
    lines.push("\n========== BATTLE STATISTICS ==========");
    
    // Average Damage Summary
    lines.push("\n--- AVERAGE DAMAGE PER CHARACTER ---");
    const damageStats = this.getAllStats()
      .map(stats => {
        const avgDamagePerHit = stats.hitsDealt > 0 
          ? (stats.damageDealt / stats.hitsDealt)
          : 0;
        return {
          name: stats.characterName,
          avgDamage: avgDamagePerHit,
          totalDamage: stats.damageDealt,
          hits: stats.hitsDealt,
        };
      })
      .sort((a, b) => b.avgDamage - a.avgDamage); // Sort by avg damage descending
    
    for (const stat of damageStats) {
      lines.push(`  ${stat.name}: ${stat.avgDamage.toFixed(1)} avg damage/hit (${stat.totalDamage} total, ${stat.hits} hits)`);
    }
    
    for (const stats of this.getAllStats()) {
      lines.push(`\n${stats.characterName} (Pos ${stats.position}, ${stats.characterId.slice(0, 8)}...):`);
      lines.push(`  Turns Taken: ${stats.turnsTaken}`);
      
      // Calculate average damage per hit
      const avgDamagePerHit = stats.hitsDealt > 0 
        ? (stats.damageDealt / stats.hitsDealt).toFixed(1)
        : "0.0";
      const avgDamageTakenPerHit = stats.hitsReceived > 0
        ? (stats.damageTaken / stats.hitsReceived).toFixed(1)
        : "0.0";
      
      lines.push(`  Damage Dealt: ${stats.damageDealt} (${stats.hitsDealt} hits, ${stats.missesDealt} misses, ${stats.critsDealt} crits) - Avg: ${avgDamagePerHit} per hit`);
      lines.push(`  Damage Taken: ${stats.damageTaken} (${stats.hitsReceived} hits, ${stats.missesReceived} misses, ${stats.critsReceived} crits) - Avg: ${avgDamageTakenPerHit} per hit`);
      lines.push(`  Healing Done: ${stats.healingDone}`);
      lines.push(`  Healing Received: ${stats.healingReceived}`);
      
      // Position-based targeting stats
      const frontRowHits = [0, 1, 2].reduce((sum, pos) => sum + (stats.targetsHitByPosition[pos] || 0), 0);
      const backRowHits = Object.entries(stats.targetsHitByPosition)
        .filter(([pos]) => parseInt(pos) >= 3)
        .reduce((sum, [, count]) => sum + count, 0);
      const frontRowDamage = [0, 1, 2].reduce((sum, pos) => sum + (stats.damageDealtByPosition[pos] || 0), 0);
      const backRowDamage = Object.entries(stats.damageDealtByPosition)
        .filter(([pos]) => parseInt(pos) >= 3)
        .reduce((sum, [, dmg]) => sum + dmg, 0);
      
      if (frontRowHits > 0 || backRowHits > 0) {
        lines.push(`  Targeting: Front Row (${frontRowHits} hits, ${frontRowDamage} dmg) | Back Row (${backRowHits} hits, ${backRowDamage} dmg)`);
      }
      
      if (Object.keys(stats.skillsUsed).length > 0) {
        lines.push(`  Skills Used: ${Object.entries(stats.skillsUsed).map(([skill, count]) => `${skill}(${count})`).join(", ")}`);
      }
    }
    
    // Position summary
    lines.push("\n--- POSITION ANALYSIS ---");
    const positionStats = new Map<number, { damageTaken: number; hitsReceived: number; characterCount: number }>();
    
    for (const stats of this.getAllStats()) {
      const pos = stats.position;
      const existing = positionStats.get(pos) || { damageTaken: 0, hitsReceived: 0, characterCount: 0 };
      existing.damageTaken += stats.damageTaken;
      existing.hitsReceived += stats.hitsReceived;
      existing.characterCount++;
      positionStats.set(pos, existing);
    }
    
    const frontRowTotal = [0, 1, 2].reduce((sum, pos) => {
      const stats = positionStats.get(pos);
      return sum + (stats?.damageTaken || 0);
    }, 0);
    const backRowTotal = Array.from(positionStats.entries())
      .filter(([pos]) => pos >= 3)
      .reduce((sum, [, stats]) => sum + stats.damageTaken, 0);
    
    lines.push(`Front Row (0-2): ${frontRowTotal} total damage taken`);
    lines.push(`Back Row (3+): ${backRowTotal} total damage taken`);
    lines.push(`Front/Back Ratio: ${frontRowTotal > 0 ? (frontRowTotal / Math.max(backRowTotal, 1)).toFixed(2) : "N/A"}:1`);
    
    lines.push("\n========================================\n");
    return lines.join("\n");
  }
}

