/**
 * Damage Resolution System
 * 
 * This module handles the complete damage resolution pipeline, broken down into
 * 9 distinct phases for clarity and maintainability:
 * 
 * Phase 1: Pre-Damage Modifiers
 *   - Breathing skill effects
 *   - Attacker traits (onAttack hooks)
 *   - Curse Mark / Hex Mark interaction
 *   - Expose Weakness / Exposed interaction
 * 
 * Phase 2: Hit/Dodge Check
 *   - Calculate dodge chance (base + agility mod + Dueling Stance)
 *   - Check for auto-hit by crit
 *   - Return early if miss
 * 
 * Phase 3: Pre-Mitigation Modifiers
 *   - Spell casting armor penalty (for magic damage)
 *   - Caster spell effectiveness (aptitude multiplier)
 * 
 * Phase 4: Mitigation (Defense)
 *   - Physical: pDEF + endurance mod
 *   - Magic: mDEF + planar mod + magic resistance aptitude
 *   - True damage bypasses all mitigation
 * 
 * Phase 5: Crit Check
 *   - Check if crit roll >= 20 + crit defense
 *   - Apply crit multiplier (default 1.5x)
 *   - Exposed debuff reduces crit defense by 2
 * 
 * Phase 6: Counter-Attacks
 *   - Reversal Palm (willpower save, can negate and counter)
 *   - Parry & Riposte (control save, can negate and counter)
 *   - Can return early if attack is negated
 * 
 * Phase 7: Shields & Absorption
 *   - Taunt (generate fire resource)
 *   - Spell Parry (reduce magic damage, grant Edge Charge)
 *   - Arcane Shield (absorb damage)
 *   - Aegis Shield (mitigate per stack)
 *   - Planar Absorption (absorb magic, convert to resources)
 * 
 * Phase 8: Final Modifiers
 *   - Exposed debuff (add 1d3 bonus damage)
 * 
 * Phase 9: Apply Damage
 *   - Target traits (onTakingDamage hooks)
 *   - Reduce target HP
 *   - Record statistics
 * 
 * Each phase is implemented as a separate function for clarity and testability.
 */

import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { ElementResourceKey, BattleStatKey } from "src/InterFacesEnumsAndTypes/Enums";
import { getCharacter } from "src/Utils/getCharacter";
import { resolveBreathingSkillInBattle } from "../BreathingSkill/activeBreathingSkill";
import { statMod } from "src/Utils/statMod";
import Report from "src/Utils/Reporter";
import { locationRepository } from "src/Entity/Location/Location/repository.ts";
import {
  BuffAndDebuffEnum,
  BuffEnum,
  DebuffEnum,
} from "../BuffsAndDebuffs/enum";
import { buffsRepository } from "../BuffsAndDebuffs/repository";
import { getBattleStatistics } from "./BattleContext";
import type { BattleStatistics } from "./BattleStatistics";
import { traitRepository } from "src/Entity/Trait/repository";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { ArmorClass } from "../Item/Equipment/Armor/Armor";
import { bodyRepository } from "src/Entity/Item/Equipment/Armor/Body/repository";
import type { Character } from "../Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";

export interface DamageResult {
  actualDamage: number;
  damageType: DamageType;
  isHit: boolean;
  isCrit: boolean;
}

export interface DamageInput {
  damage: number;
  hit: number;
  crit: number;
  type: DamageType;
  isMagic?: boolean;
  trueDamage?: boolean;
}

interface DamageResolutionContext {
  attacker: Character;
  target: Character;
  attackerId: string;
  targetId: string;
  damageOutput: DamageInput;
  location: LocationsEnum;
  critModifier: number;
  stats?: BattleStatistics;
}

const NEUTRAL_AC = 8;

// ============================================================================
// PHASE 1: Pre-Damage Modifiers
// ============================================================================

/**
 * Applies all modifiers that affect damage before the hit/dodge check.
 * 
 * This phase includes:
 * - Breathing skill effects (may modify damageOutput)
 * - Attacker traits (onAttack hooks)
 * - Curse Mark / Hex Mark interaction (adds bonus damage if both active)
 * - Expose Weakness / Exposed interaction (adds hit bonus if both active)
 * 
 * @param context - The damage resolution context containing attacker, target, and damageOutput
 * @modifies context.damageOutput - May modify damage and hit values
 */
function applyPreDamageModifiers(
  context: DamageResolutionContext,
): void {
  const { attacker, target, attackerId, targetId, damageOutput } = context;

  // Apply breathing skill effects before damage calculation
  resolveBreathingSkillInBattle(attackerId, targetId, damageOutput);

  // Apply attacker traits on attack
  for (const [traitEnum, value] of attacker.traits) {
    traitRepository[traitEnum].config.onAttack?.(
      attacker,
      target,
      damageOutput,
      value,
    );
  }

  // Curse Mark: Check if attacker has Curse Mark Active buff and target has Hex Mark debuff
  const curseMarkActive = attacker.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.curseMarkActive,
  );
  const hexMark = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.hexMark);

  if (
    curseMarkActive &&
    curseMarkActive.value > 0 &&
    hexMark &&
    hexMark.value > 0
  ) {
    // Both buff and debuff are active - add bonus damage
    const intMod = curseMarkActive.counter || 0;
    // Damage calculation - don't apply bless/curse
    const bonusDamage = Math.floor(intMod / 2) + attacker.roll({ amount: 1, face: 4, applyBlessCurse: false }); // INT mod/2 + 1d4
    damageOutput.damage += bonusDamage;

    Report.debug(
      `        🧙 Curse Mark matched! Bonus damage: ${bonusDamage} (INT mod/2 + 1d4)`,
    );

    // Remove both buff and debuff completely after use
    attacker.buffsAndDebuffs.buffs.entry.delete(BuffEnum.curseMarkActive);
    target.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.hexMark);

    Report.debug(`        🧙 Curse Mark and Hex Mark removed`);
  }

  // Expose Weakness: Check if attacker has Expose Weakness Active buff and target has Exposed debuff
  const exposeWeaknessActive = attacker.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.exposeWeaknessActive,
  );
  const exposedWeakness = target.buffsAndDebuffs.debuffs.entry.get(
    DebuffEnum.exposed,
  );

  if (
    exposeWeaknessActive &&
    exposeWeaknessActive.value > 0 &&
    exposedWeakness &&
    exposedWeakness.value > 0
  ) {
    // Both buff and debuff are active - add hit bonus
    const wilMod = exposeWeaknessActive.counter || 0;
    const hitBonus = Math.floor(wilMod / 2);
    if (hitBonus > 0) {
      damageOutput.hit += hitBonus;
      Report.debug(
        `        ⚖️ Expose Weakness matched! +${hitBonus} hit (WIL mod/2)`,
      );
    }

    // Remove only the buff after use (keep Exposed debuff for JudgmentDay +50% damage and other skills)
    attacker.buffsAndDebuffs.buffs.entry.delete(BuffEnum.exposeWeaknessActive);

    Report.debug(
      `        ⚖️ Expose Weakness Active removed (Exposed persists for JudgmentDay)`,
    );
  }
}

// ============================================================================
// PHASE 2: Hit/Dodge Check
// ============================================================================

function checkHitAndDodge(
  context: DamageResolutionContext,
): DamageResult | null {
  const { target, damageOutput } = context;
  // Precognition auto dodge
  const precognition = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.precognition,
  );
  if (precognition && precognition.value > 0) {
    const saveRoll = target.rollSave("luck");
    const dc = 10;
    const dodged = saveRoll >= dc;
    if (dodged) {
      if (precognition.counter === 1) {
        // Gain 1 order
        target.resources.order += 1;
      }
      // Remove precognition
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.precognition);
      // Return missed
      return {
        actualDamage: 0,
        damageType: damageOutput.type,
        isHit: false,
        isCrit: false,
      };
    }
  }

  // Calculate dodge chance
  let dodgeChance =
    target.battleStats.getTotal("dodge") +
    statMod(target.attribute.getTotal("agility")) +
    NEUTRAL_AC;

  // Dueling Stance: Add dodge bonus from target's buff
  const duelingStanceTarget = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.duelingStance,
  );
  if (duelingStanceTarget && duelingStanceTarget.value > 0) {
    const agilityMod = statMod(target.attribute.getTotal("agility"));
    const dodgeBonus = Math.floor(agilityMod / 2);
    dodgeChance += dodgeBonus;
    Report.debug(`        ⚔️ Dueling Stance: +${dodgeBonus} dodge`);
  }

  // Check for auto-hit by crit
  const critDefense = statMod(target.attribute.getTotal("endurance"));
  const autoHitByCrit = damageOutput.crit >= 20 + critDefense;

  Report.debug(
    `        Hit Check: Hit(${damageOutput.hit}) vs Dodge(${dodgeChance})`,
  );

  // Not auto hit and dodge >= hit ==> miss
  if (!autoHitByCrit && dodgeChance >= damageOutput.hit) {
    Report.debug(`        ❌ MISSED!`);

    // Record miss in statistics
    if (context.stats) {
      context.stats.recordDamageDealt(
        context.attackerId,
        context.targetId,
        0,
        false,
        false, // isHit is false
      );
    }

    return {
      actualDamage: 0,
      damageType: damageOutput.type,
      isHit: false,
      isCrit: false,
    };
  }

  Report.debug(`        ✅ HIT!`);
  return null; // Continue with damage resolution
}

// ============================================================================
// PHASE 3: Pre-Mitigation Modifiers
// ============================================================================

function applyPreMitigationModifiers(
  context: DamageResolutionContext,
): void {
  const { attacker, damageOutput } = context;

  // Spell Casting Armor Penalty: Reduce magic damage if caster wears non-cloth armor
  if (damageOutput.isMagic && !damageOutput.trueDamage) {
    const spellCastingArmorPenaltyMultiplier: Record<ArmorClass, number> = {
      [ArmorClass.Cloth]: 1.0, // No penalty for cloth armor
      [ArmorClass.Light]: 0.9, // 10% damage reduction for light armor
      [ArmorClass.Medium]: 0.8, // 20% damage reduction for medium armor
      [ArmorClass.Heavy]: 0.7, // 30% damage reduction for heavy armor
    };

    let armorPenaltyMultiplier = 1.0;
    if (attacker.equipments.body) {
      const armor = bodyRepository[attacker.equipments.body];
      if (armor) {
        armorPenaltyMultiplier =
          spellCastingArmorPenaltyMultiplier[armor.armorData.armorClass] ?? 1.0;
        if (armorPenaltyMultiplier < 1.0) {
          const originalDamage = damageOutput.damage;
          damageOutput.damage = Math.floor(
            damageOutput.damage * armorPenaltyMultiplier,
          );
          const reductionPercent = Math.round(
            (1 - armorPenaltyMultiplier) * 100,
          );
          Report.debug(
            `        🛡️ Spell Casting Armor Penalty: ${armor.armorData.armorClass} armor reduces magic damage by ${reductionPercent}% (${originalDamage} → ${damageOutput.damage})`,
          );
        }
      }
    }
  }

  // Aptitude: Apply caster's spell effectiveness
  if (damageOutput.isMagic) {
    const casterSpellEffectiveness =
      attacker.planarAptitude.getSpellEffectivenessAptitude();
    damageOutput.damage = damageOutput.damage * casterSpellEffectiveness;
    Report.debug(
      `        Caster Spell Effectiveness: ${casterSpellEffectiveness.toFixed(2)} (aptitude: ${attacker.planarAptitude.aptitude})`,
    );
  }
}

// ============================================================================
// PHASE 4: Mitigation (Defense)
// ============================================================================

function applyMitigation(context: DamageResolutionContext): number {
  const { target, damageOutput } = context;

  if (damageOutput.trueDamage) {
    // True damage bypasses all mitigation
    Report.debug(`        True Damage: ${damageOutput.damage} (no mitigation applied)`);
    return damageOutput.damage;
  }

  let { baseMitigation, ifMagicAptitudeMultiplier } = !damageOutput.isMagic
    ? getPhysicalMitigation(context)
    : getMagicMitigation(context);
  baseMitigation += mapDamageTypeToDefense(damageOutput.type, target);

  const effectiveMitigation = Math.max(baseMitigation, 0);
  Report.debug(
    `        Mitigation: ${effectiveMitigation} (baseMitigation: ${baseMitigation} ifMagicAptitudeMultiplier: ${ifMagicAptitudeMultiplier})`,
  );

  const damage = Math.max(
    damageOutput.damage / ifMagicAptitudeMultiplier - effectiveMitigation,
    0,
  );

  Report.debug(
    `        Damage after mitigation: ${damage.toFixed(1)} (${damageOutput.damage} - ${effectiveMitigation})`,
  );

  return damage;
}

function getPhysicalMitigation(context: DamageResolutionContext): { baseMitigation: number, ifMagicAptitudeMultiplier: number } {
  const { target } = context;
  return {
    baseMitigation:
      target.battleStats.getTotal("pDEF") +
      statMod(target.attribute.getTotal("endurance")),
    ifMagicAptitudeMultiplier: 1,
  }
}

function getMagicMitigation(context: DamageResolutionContext): { baseMitigation: number, ifMagicAptitudeMultiplier: number } {
  const { target } = context;
  return {
    baseMitigation:
      target.battleStats.getTotal("mDEF") +
      statMod(target.attribute.getTotal("planar")),
    ifMagicAptitudeMultiplier: target.planarAptitude.getMagicResistanceAptitude(),
  };
}

// Type-safe mapping of damage types to their corresponding defense stats
const DAMAGE_TYPE_TO_DEFENSE: Record<DamageType, readonly BattleStatKey[]> = {
  [DamageType.slash]: ['slashDEF'] as const,
  [DamageType.blunt]: ['bluntDEF'] as const,
  [DamageType.pierce]: ['pierceDEF'] as const,
  [DamageType.order]: ['orderDEF'] as const,
  [DamageType.chaos]: ['chaosDEF'] as const,
  [DamageType.fire]: ['fireDEF'] as const,
  [DamageType.earth]: ['earthDEF'] as const,
  [DamageType.water]: ['waterDEF'] as const,
  [DamageType.wind]: ['windDEF'] as const,
  [DamageType.ice]: ['orderDEF', 'waterDEF'] as const,
  [DamageType.mist]: ['waterDEF', 'windDEF'] as const,
  [DamageType.lightning]: ['windDEF', 'chaosDEF'] as const,
  [DamageType.inferno]: ['chaosDEF', 'fireDEF'] as const,
  [DamageType.metal]: ['fireDEF', 'earthDEF'] as const,
  [DamageType.crystal]: ['earthDEF', 'orderDEF'] as const,
  [DamageType.nature]: ['earthDEF', 'waterDEF'] as const,
  [DamageType.spirit]: ['orderDEF', 'windDEF'] as const,
  [DamageType.dark]: ['waterDEF', 'chaosDEF'] as const,
  [DamageType.erosion]: ['windDEF', 'fireDEF'] as const,
  [DamageType.poison]: ['earthDEF', 'chaosDEF'] as const,
  [DamageType.radiance]: ['orderDEF', 'fireDEF'] as const,
  [DamageType.arcane]: ['orderDEF', 'chaosDEF', 'fireDEF', 'earthDEF', 'waterDEF', 'windDEF'] as const,
} as const;

function mapDamageTypeToDefense(damageType: DamageType, target: Character): number {
  const defenses = DAMAGE_TYPE_TO_DEFENSE[damageType];

  if (!defenses || defenses.length === 0) {
    return 0;
  }

  let totalDefense = 0;
  for (const defense of defenses) {
    totalDefense += target.battleStats.getTotal(defense);
  }
  totalDefense /= defenses.length;
  return totalDefense;
}

// ============================================================================
// PHASE 5: Crit Check
// ============================================================================

function checkCrit(
  context: DamageResolutionContext,
  damage: number,
): { damage: number; isCrit: boolean } {
  const { target, damageOutput, critModifier } = context;

  const critDefense = statMod(target.attribute.getTotal("endurance"));
  const critDefDebuff = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.critDef);
  const critDefPenalty = critDefDebuff ? critDefDebuff.counter : 0;
  const effectiveCritDefense = critDefense - critDefPenalty;

  let isCrit = false;
  if (damageOutput.crit - effectiveCritDefense >= 20) {
    damage *= critModifier;
    isCrit = true;
    Report.debug(
      `        💥 CRITICAL HIT! Damage × ${critModifier}${critDefPenalty > 0 ? ` (CritDef debuff: -${critDefPenalty} crit defense)` : ""}`,
    );
  }

  return { damage, isCrit };
}

// ============================================================================
// PHASE 6: Counter-Attacks (can return early)
// ============================================================================

function checkCounterAttacks(
  context: DamageResolutionContext,
  damage: number,
): DamageResult | null {
  const { attacker, target, attackerId, targetId, damageOutput, location, critModifier, stats } = context;

  // Reversal Palm: Check before other damage mitigation
  const reversalPalm = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.reversalPalm,
  );
  if (reversalPalm && reversalPalm.value > 0 && !damageOutput.isMagic) {
    const saveRoll = target.rollSave("willpower");
    const dc = 10; // Base DC for reversal palm

    if (saveRoll >= dc) {
      // Save passed: negate attack and counter-attack
      const skillLevel = reversalPalm.counter || 1;
      const dexMod = statMod(target.attribute.getTotal("dexterity"));
      const bareHaneMod = statMod(target.proficiencies.getTotal("bareHand"));
      const levelScalar = skillLevelMultiplier(skillLevel);
      // Damage calculation - don't apply bless/curse
      const counterDamage =
        (target.roll({ amount: 1, face: 6, applyBlessCurse: false }) + dexMod + bareHaneMod) * levelScalar;

      const counterDamageOutput: DamageInput = {
        damage: Math.max(0, Math.floor(counterDamage)),
        hit: 999, // Auto-hit counter
        crit: 0,
        type: DamageType.blunt,
        isMagic: false,
      };

      // Remove the buff before resolving the counter damage to prevent infinite loops
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.reversalPalm);

      const counterResult = resolveDamage(
        targetId,
        attackerId,
        counterDamageOutput,
        location,
        critModifier,
        stats || undefined,
      );

      console.log(
        `        🥋 Reversal Palm! ${target.name.en} countered for ${counterResult.actualDamage} damage!`,
      );

      // Record the negated attack as a miss
      if (stats) {
        stats.recordDamageDealt(attackerId, targetId, 0, false, false);
      }

      return {
        actualDamage: 0,
        damageType: damageOutput.type,
        isHit: false, // Attack was negated
        isCrit: false,
      };
    } else {
      // Save failed: remove buff and continue with normal damage
      Report.debug(
        `        ❌ Reversal Palm failed! ${target.name.en} failed the willpower save.`,
      );
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.reversalPalm);
    }
  }

  // Parry & Riposte: Check before other damage mitigation
  const parry = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.parry);
  if (parry && parry.value > 0 && !damageOutput.isMagic) {
    const dc = 13;
    const saveRoll = target.rollSave("control");

    if (saveRoll >= dc) {
      // Save passed: negate attack and counter-attack
      const skillLevel = parry.counter || 1;
      const levelScalar = skillLevelMultiplier(skillLevel);
      const weapon = target.getWeapon();
      const counterDamage = getWeaponDamageOutput(target, weapon, "physical").damage * levelScalar;

      const counterDamageOutput: DamageInput = {
        damage: Math.max(0, Math.floor(counterDamage)),
        hit: 999, // Auto-hit counter
        crit: 0,
        type: weapon.weaponData.damage.physicalDamageType,
        isMagic: false,
      };

      // Remove the buff before resolving the counter damage to prevent infinite loops
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.parry);

      const counterResult = resolveDamage(
        targetId,
        attackerId,
        counterDamageOutput,
        location,
        critModifier,
        stats || undefined,
      );

      Report.debug(
        `        ⚔️ Parry & Riposte! ${target.name.en} countered for ${counterResult.actualDamage} damage!`,
      );

      // Record the negated attack as a miss
      if (stats) {
        stats.recordDamageDealt(attackerId, targetId, 0, false, false);
      }

      return {
        actualDamage: 0,
        damageType: damageOutput.type,
        isHit: false, // Attack was negated
        isCrit: false,
      };
    } else {
      // Save failed: remove buff and continue with normal damage
      Report.debug(
        `        ❌ Parry & Riposte failed! ${target.name.en} failed the willpower save (DC${dc}).`,
      );
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.parry);
    }
  }

  return null; // Continue with damage resolution
}

// ============================================================================
// PHASE 7: Shields & Absorption
// ============================================================================

function applyShieldsAndAbsorption(
  context: DamageResolutionContext,
  damage: number,
): number {
  const { target, damageOutput } = context;

  // Taunt: Generate fire resource when taking damage
  const taunt = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt);
  if (taunt && taunt.value > 0) {
    target.resources.fire += 1;
  }

  // Spell Parry: Reduce spell damage and grant Edge Charge
  const spellParry = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.spellParry,
  );
  if (spellParry && spellParry.value > 0 && damageOutput.isMagic) {
    const intMod = statMod(target.attribute.getTotal("intelligence"));
    const reduction = 5 + intMod;
    damage = Math.max(0, damage - reduction);
    Report.debug(
      `        🛡️ Spell Parry! Damage reduced by ${reduction} (${damage} remaining)`,
    );

    // Grant Edge Charge: 1 if damage taken, 2 if 0 damage
    buffsRepository.edgeCharge.appender(target, { turnsAppending: 1 });

    // Remove Spell Parry buff (consumed)
    target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.spellParry);
  }

  // Arcane Shield: Absorb damage up to shield value
  const arcaneShield = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.arcaneShield,
  );
  if (arcaneShield) {
    const absorbed = Math.min(damage, arcaneShield.value);
    damage -= absorbed;
    arcaneShield.value -= absorbed;

    if (arcaneShield.value <= 0) {
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneShield);
    }
  }

  // Aegis Shield: Each stack can mitigate 5 + (willpower mod) points of incoming damage
  const aegisShield = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.aegisShield,
  );
  if (aegisShield && aegisShield.value > 0 && damage > 0) {
    const willMod = statMod(target.attribute.getTotal("willpower"));
    const mitigationPerStack = 5 + willMod;
    let remainingDamage = damage;
    let stacksUsed = 0;

    // Calculate how many stacks are needed to fully mitigate damage
    while (remainingDamage > 0 && aegisShield.value > 0) {
      const mitigated = Math.min(remainingDamage, mitigationPerStack);
      remainingDamage -= mitigated;
      aegisShield.value -= 1;
      stacksUsed += 1;
    }

    const originalDamage = damage;
    damage = remainingDamage;
    const totalMitigated = originalDamage - damage;

    if (stacksUsed > 0) {
      Report.debug(
        `        🛡️ Aegis Shield mitigated ${totalMitigated} damage using ${stacksUsed} stack(s) (${damage} remaining)`,
      );
    }

    if (aegisShield.value <= 0) {
      // When Aegis Shield is depleted, add Aegis Pulse buff for 1 turn
      buffsRepository.aegisPulse.appender(target, { turnsAppending: 1 });
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.aegisShield);
    }
  }

  // Planar Absorption: Only works on magic attacks
  const planarAbsorption = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.planarAbsorption,
  );
  if (planarAbsorption && damageOutput.isMagic && planarAbsorption.value > 0) {
    const stacks = planarAbsorption.value;
    const absorbed = Math.min(damage, stacks);
    damage -= absorbed;
    planarAbsorption.value -= absorbed;

    Report.debug(
      `        🔮 Planar Absorption absorbed ${absorbed} damage (${planarAbsorption.value} stacks remaining)`,
    );

    // Convert absorbed damage to elemental resources: 4 damage = 1 resource
    const damageTypeToElement: Partial<Record<DamageType, ElementResourceKey>> =
      {
        [DamageType.fire]: "fire",
        [DamageType.water]: "water",
        [DamageType.earth]: "earth",
        [DamageType.wind]: "wind",
        [DamageType.order]: "order",
        [DamageType.chaos]: "chaos",
        [DamageType.arcane]: "neutral",
      };

    const elementType = damageTypeToElement[damageOutput.type] || "neutral";
    const resourcesGained = Math.floor(absorbed / 4);

    if (resourcesGained > 0 && elementType in target.resources) {
      target.resources[elementType as ElementResourceKey] += resourcesGained;
      Report.debug(
        `        💎 Converted ${absorbed} absorbed damage to ${resourcesGained} ${elementType} resource(s)`,
      );
    }

    if (planarAbsorption.value <= 0) {
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.planarAbsorption);
    }
  }

  return damage;
}

// ============================================================================
// PHASE 8: Final Modifiers
// ============================================================================

function applyFinalModifiers(
  context: DamageResolutionContext,
  damage: number,
): number {
  const { target, damageOutput } = context;

  // Exposed debuff: Add 1d3 extra damage from all sources
  const exposed = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
  if (exposed && exposed.value > 0) {
    // Damage calculation - don't apply bless/curse
    const exposedBonus = target.roll({ amount: 1, face: 3, applyBlessCurse: false });
    damage += exposedBonus;
    Report.debug(`        🎯 Exposed! Additional ${exposedBonus} damage (1d3)`);
  }

  return damage;
}

// ============================================================================
// PHASE 9: Apply Damage
// ============================================================================

function applyDamage(
  context: DamageResolutionContext,
  finalDamage: number,
  isCrit: boolean,
): DamageResult {
  const { attacker, target, attackerId, targetId, damageOutput, stats } = context;

  // Apply target traits on taking damage
  for (const [traitEnum, value] of target.traits) {
    traitRepository[traitEnum].config.onTakingDamage?.(
      target,
      attacker,
      damageOutput,
      value,
      finalDamage,
    );
  }

  // Reduce target HP
  target.vitals.decHp(finalDamage);

  // Record statistics if tracker is provided
  if (stats) {
    stats.recordDamageDealt(
      attackerId,
      targetId,
      finalDamage,
      isCrit,
      true, // isHit is true if we got here
    );
  }

  return {
    actualDamage: finalDamage,
    damageType: damageOutput.type,
    isHit: true,
    isCrit,
  };
}

// ============================================================================
// MAIN RESOLUTION FUNCTION
// ============================================================================

export function resolveDamage(
  attackerId: string,
  targetId: string,
  damageOutput: DamageInput,
  location: LocationsEnum,
  critModifier: number = 1.5,
  battleStatistics?: BattleStatistics,
): DamageResult {
  // Initialize context
  const stats = battleStatistics || getBattleStatistics() || undefined;
  const attacker = getCharacter(attackerId);
  const target = getCharacter(targetId);

  const locationObject = locationRepository[location];
  if (!locationObject) Report.error(`What happened?`);

  if (!attacker || !target) {
    Report.error(`Character with ID ${attackerId} or ${targetId} not found`);
    return {
      actualDamage: 0,
      damageType: damageOutput.type,
      isHit: false,
      isCrit: false,
    };
  }

  const context: DamageResolutionContext = {
    attacker,
    target,
    attackerId,
    targetId,
    damageOutput,
    location,
    critModifier,
    stats,
  };

  // Log initial state
  Report.debug(`      Damage Calculation:`);
  Report.debug(
    `        Base Damage: ${damageOutput.damage} | Hit: ${damageOutput.hit} | Crit: ${damageOutput.crit} | Type: ${damageOutput.type} | IsMagic: ${damageOutput.isMagic ?? false}`,
  );

  // Phase 1: Pre-damage modifiers
  applyPreDamageModifiers(context);

  // Phase 2: Hit/Dodge check (can return early)
  const hitCheckResult = checkHitAndDodge(context);
  if (hitCheckResult) return hitCheckResult;

  // Phase 3: Pre-mitigation modifiers
  applyPreMitigationModifiers(context);

  // Phase 4: Mitigation (defense)
  let damage = applyMitigation(context);

  // Phase 5: Crit check
  const { damage: damageAfterCrit, isCrit } = checkCrit(context, damage);
  damage = damageAfterCrit;

  // Phase 6: Counter-attacks (can return early)
  const counterResult = checkCounterAttacks(context, damage);
  if (counterResult) return counterResult;

  // Phase 7: Shields & Absorption
  damage = applyShieldsAndAbsorption(context, damage);

  // Phase 8: Final modifiers
  damage = applyFinalModifiers(context, damage);

  // Phase 9: Round and apply damage
  const finalDamage = Math.max(Math.floor(damage), 0);
  Report.debug(
    `        Final Damage: ${finalDamage} (${damage.toFixed(1)} rounded down)`,
  );

  return applyDamage(context, finalDamage, isCrit);
}
