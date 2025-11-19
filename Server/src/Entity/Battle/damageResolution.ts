import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { ElementResourceKey } from "src/InterFacesEnumsAndTypes/Enums";
import { getCharacter } from "src/Utils/getCharacter";
import { resolveBreathingSkillInBattle } from "../BreathingSkill/activeBreathingSkill";
import { statMod } from "src/Utils/statMod";
import Report from "src/Utils/Reporter";
import { locationRepository } from "src/Entity/Location/Location/repository.ts";
import { BuffAndDebuffEnum, BuffEnum, DebuffEnum } from "../BuffsAndDebuffs/enum";
import { buffsRepository } from "../BuffsAndDebuffs/repository";
import { getBattleStatistics } from "./BattleContext";
import type { BattleStatistics } from "./BattleStatistics";
import {traitRepository} from "src/Entity/Trait/repository";
import { roll } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

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

const NEUTRAL_AC = 8;

export function resolveDamage(
  attackerId: string,
  targetId: string,
  damageOutput: DamageInput,
  location: LocationsEnum,
  critModifier: number = 1.5,
  battleStatistics?: BattleStatistics, // Optional parameter for explicit passing
): DamageResult {
  // Use provided battleStatistics or get from context
  const stats = battleStatistics || getBattleStatistics();
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

  Report.debug(`      Damage Calculation:`);
  Report.debug(
    `        Base Damage: ${damageOutput.damage} | Hit: ${damageOutput.hit} | Crit: ${damageOutput.crit} | Type: ${damageOutput.type} | IsMagic: ${damageOutput.isMagic ?? false}`,
  );

  // Apply breathing skill effects before damage calculation, might change something
  resolveBreathingSkillInBattle(attackerId, targetId, damageOutput);

  for (const [traitEnum, value] of attacker.traits) {
    traitRepository[traitEnum].config.onAttack?.(
        attacker,
        target,
        damageOutput,
        value
    )
  }

  // --- HIT / DODGE ---
  // If you mean "nat 20 can't be dodged", you need a raw die or a boolean flag.
  // Here we treat 20+ as "auto-hit" only if that's your rule; adjust as needed.
  // Neutral AC is added to the dodge chance to prevent the player from always hitting;
  const dodgeChance =
    target.battleStats.getTotal("dodge") +
    statMod(target.attribute.getTotal("agility")) +
    NEUTRAL_AC;

  // Attacker's 'hit' already includes their bonuses
  const critDefense = statMod(target.attribute.getTotal("endurance"));
  const autoHitByCrit = damageOutput.crit >= 20 + critDefense; // ideally: damageOutput.isNat20 === true

  Report.debug(
    `        Hit Check: Hit(${damageOutput.hit}) vs Dodge(${dodgeChance})`,
  );

  // not auto hit and dodge > hit ==> miss
  if (!autoHitByCrit && dodgeChance >= damageOutput.hit) {
    Report.debug(`        ❌ MISSED!`);

    // Record miss in statistics
    if (stats) {
      stats.recordDamageDealt(
        attackerId,
        targetId,
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

  // Aptitude
  if (damageOutput.isMagic) {
    damageOutput.damage =
      damageOutput.damage *
      target.planarAptitude.getSpellEffectivenessAptitude();
  }

  // --- MITIGATION ---
  let damage: number;
  if (damageOutput.trueDamage) {
    // True damage bypasses all mitigation
    damage = damageOutput.damage;
    Report.debug(`        True Damage: ${damage} (no mitigation applied)`);
  } else {
    const { baseMitigation, ifMagicAptitudeMultiplier } = !damageOutput.isMagic
    ? {
        baseMitigation:
          target.battleStats.getTotal("pDEF") +
          statMod(target.attribute.getTotal("endurance")),
        ifMagicAptitudeMultiplier: 1,
      }
    : {
        baseMitigation:
          target.battleStats.getTotal("mDEF") +
          statMod(target.attribute.getTotal("planar")),
        ifMagicAptitudeMultiplier:
          target.planarAptitude.getMagicResistanceAptitude(),
      };

  const effectiveMitigation = Math.max(baseMitigation, 0);
  Report.debug(
    `        Mitigation: ${effectiveMitigation} (baseMitigation: ${baseMitigation} ifMagicAptitudeMultiplier: ${ifMagicAptitudeMultiplier})`,
  );

    damage = Math.max(
    (damageOutput.damage / ifMagicAptitudeMultiplier) - effectiveMitigation,
    0,
  );

  Report.debug(
    `        Damage after mitigation: ${damage.toFixed(1)} (${damageOutput.damage} - ${effectiveMitigation})`,
  );
  }

  // --- CRIT CHECK ---
  // Keep stat usage consistent: use statMod(endurance) if dodge used statMod(agility)
  // Exposed debuff reduces critical defense at skill level 5+
  const exposed = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.exposed);
  const exposedCritPenalty = exposed && exposed.permValue > 0 ? 2 : 0;
  const effectiveCritDefense = critDefense - exposedCritPenalty;
  
  let isCrit = false;
  if (damageOutput.crit - effectiveCritDefense >= 20) {
    damage *= critModifier;
    isCrit = true;
    Report.debug(`        💥 CRITICAL HIT! Damage × ${critModifier}${exposedCritPenalty > 0 ? ` (Exposed: -${exposedCritPenalty} crit defense)` : ""}`);
  }

  // --- BUFFS/DEBUFFS/TRAITS (future hooks) ---
  const taunt = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt);
  if (taunt) {
    if (taunt.value > 0) {
      target.resources.fire += 1;
    }
  }

  // Spell Parry: Reduce spell damage and grant Edge Charge
  const spellParry = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.spellParry);
  if (spellParry && spellParry.value > 0 && damageOutput.isMagic) {
    const intMod = statMod(target.attribute.getTotal("intelligence"));
    const reduction = 5 + intMod;
    damage = Math.max(0, damage - reduction);
    Report.debug(`        🛡️ Spell Parry! Damage reduced by ${reduction} (${damage} remaining)`);
    
    // Grant Edge Charge: 1 if damage taken, 2 if 0 damage
    const edgeChargeGain = damage === 0 ? 2 : 1;
    buffsRepository.edgeCharge.appender(target, edgeChargeGain, false, 0);
    
    // Remove Spell Parry buff (consumed)
    target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.spellParry);
  }

  // Reversal Palm: Check before other damage mitigation
  // If save passes, negate attack and counter-attack
  const reversalPalm = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.reversalPalm);
  if (reversalPalm && reversalPalm.value > 0 && !damageOutput.isMagic) {
    const saveRoll = target.rollSave("willpower");
    const dc = 10; // Base DC for reversal palm
    
    if (saveRoll >= dc) {
      // Save passed: negate attack and counter-attack
      const skillLevel = reversalPalm.permValue || 1; // Use stored skill level
      const dexMod = statMod(target.attribute.getTotal("dexterity"));
      const levelScalar = skillLevelMultiplier(skillLevel);
      const counterDamage = roll(1).d(6).total + dexMod * levelScalar;
      
      // Deal counter damage to attacker
      const counterDamageOutput: DamageInput = {
        damage: Math.max(0, Math.floor(counterDamage)),
        hit: 999, // Auto-hit counter
        crit: 0,
        type: DamageType.blunt,
        isMagic: false,
      };
      
      // Should remove the buff before resolving the counter damage, in case both characters have reversal palm buff, it's going to be infinite loop
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.reversalPalm);
      
      const counterResult = resolveDamage(
        targetId,
        attackerId,
        counterDamageOutput,
        location,
        critModifier,
        stats || undefined,
      );
      
      Report.debug(`        🥋 Reversal Palm! ${target.name.en} countered for ${counterResult.actualDamage} damage!`);
      
      // Remove buff and negate original attack
      
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
      Report.debug(`        ❌ Reversal Palm failed! ${target.name.en} failed the willpower save.`);
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.reversalPalm);
    }
  }

  const arcaneShield = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.arcaneShield,
  );
  if (arcaneShield) {
    const absorbed = Math.min(damage, arcaneShield.value);
    damage -= absorbed; // reduce damage by the absorbed amount
    arcaneShield.value -= absorbed; // reduce shield by absorbed amount

    if (arcaneShield.value <= 0) {
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneShield);
    }
  }

  // Planar Absorption: Only works on magic attacks
  const planarAbsorption = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarAbsorption);
  if (planarAbsorption && damageOutput.isMagic && planarAbsorption.value > 0) {
    const stacks = planarAbsorption.value;
    const absorbed = Math.min(damage, stacks);
    damage -= absorbed; // reduce damage by the absorbed amount
    planarAbsorption.value -= absorbed; // reduce stacks by absorbed amount

    Report.debug(`        🔮 Planar Absorption absorbed ${absorbed} damage (${planarAbsorption.value} stacks remaining)`);

    // Convert absorbed damage to elemental resources: 4 damage = 1 resource
    // Map damage type to element type
    const damageTypeToElement: Partial<Record<DamageType, ElementResourceKey>> = {
      [DamageType.fire]: "fire",
      [DamageType.water]: "water",
      [DamageType.earth]: "earth",
      [DamageType.air]: "wind",
      [DamageType.order]: "order",
      [DamageType.chaos]: "chaos",
      [DamageType.arcane]: "neutral",
    };

    const elementType = damageTypeToElement[damageOutput.type] || "neutral";
    const resourcesGained = Math.floor(absorbed / 4);
    
    if (resourcesGained > 0 && elementType in target.resources) {
      target.resources[elementType as ElementResourceKey] += resourcesGained;
      Report.debug(`        💎 Converted ${absorbed} absorbed damage to ${resourcesGained} ${elementType} resource(s)`);
    }

    if (planarAbsorption.value <= 0) {
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.planarAbsorption);
    }
  }

  // Exposed debuff: Add 1d3 extra damage from all sources
  if (exposed && exposed.value > 0) {
    const exposedBonus = roll(1).d(3).total;
    damage += exposedBonus;
    Report.debug(`        🎯 Exposed! Additional ${exposedBonus} damage (1d3)`);
  }

  // TODO: Location-based effects (damage type vs weather)
  // Example pattern:
  // damage = this.applyElementalInteractions(damage, damageType);
  // damage = this.applyShieldsAndAbsorbs(damage);

  // --- ROUND & APPLY ---
  const finalDamage = Math.max(Math.floor(damage), 0);

  Report.debug(
    `        Final Damage: ${finalDamage} (${damage.toFixed(1)} rounded down)`,
  );


  for (const [traitEnum, value] of target.traits) {
      traitRepository[traitEnum].config.onTakingDamage?.(target, attacker, damageOutput, value, finalDamage)
  }

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
