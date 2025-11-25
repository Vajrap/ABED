import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { ElementResourceKey } from "src/InterFacesEnumsAndTypes/Enums";
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
import { roll } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { ArmorClass } from "../Item/Equipment/Armor/Armor";
import { bodyRepository } from "../Item/Equipment/Armor/Body/repository";

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
      value,
    );
  }

  // Curse Mark: Check if attacker has Curse Mark Active buff and target has Hex Mark debuff
  // If matched, add bonus damage and remove both buff/debuff
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
    // Bonus damage based on INT mod stored in permValue
    const intMod = curseMarkActive.permValue || 0;
    const bonusDamage = Math.floor(intMod / 2) + roll(1).d(4).total; // INT mod/2 + 1d4
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
  // If matched, add hit bonus and remove the buff (keep Exposed for JudgmentDay +50% damage)
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
    // Hit bonus based on WIL mod stored in permValue
    const wilMod = exposeWeaknessActive.permValue || 0;
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

  // --- HIT / DODGE ---
  // If you mean "nat 20 can't be dodged", you need a raw die or a boolean flag.
  // Here we treat 20+ as "auto-hit" only if that's your rule; adjust as needed.
  // Neutral AC is added to the dodge chance to prevent the player from always hitting;
  let dodgeChance =
    target.battleStats.getTotal("dodge") +
    statMod(target.attribute.getTotal("agility")) +
    NEUTRAL_AC;

  // Dueling Stance: Add dodge bonus from target's buff
  const duelingStanceTarget = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.duelingStance,
  );
  if (duelingStanceTarget && duelingStanceTarget.value > 0) {
    // Recalculate agility mod from current attributes
    const agilityMod = statMod(target.attribute.getTotal("agility"));

    // +agility mod/2 to dodge
    const dodgeBonus = Math.floor(agilityMod / 2);
    dodgeChance += dodgeBonus;

    Report.debug(`        ⚔️ Dueling Stance: +${dodgeBonus} dodge`);
  }

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

  // Spell Casting Armor Penalty: Reduce magic damage if caster wears non-cloth armor
  // True damage bypasses this penalty as it cannot be reduced
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

  // Aptitude: Apply caster's spell effectiveness and target's magic resistance
  if (damageOutput.isMagic) {
    // Caster's spell effectiveness: how well they cast spells
    const casterSpellEffectiveness =
      attacker.planarAptitude.getSpellEffectivenessAptitude();
    damageOutput.damage = damageOutput.damage * casterSpellEffectiveness;
    Report.debug(
      `        Caster Spell Effectiveness: ${casterSpellEffectiveness.toFixed(2)} (aptitude: ${attacker.planarAptitude.aptitude})`,
    );
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
      damageOutput.damage / ifMagicAptitudeMultiplier - effectiveMitigation,
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
    Report.debug(
      `        💥 CRITICAL HIT! Damage × ${critModifier}${exposedCritPenalty > 0 ? ` (Exposed: -${exposedCritPenalty} crit defense)` : ""}`,
    );
  }

  // --- BUFFS/DEBUFFS/TRAITS (future hooks) ---
  const taunt = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt);
  if (taunt) {
    if (taunt.value > 0) {
      target.resources.fire += 1;
    }
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
    const edgeChargeGain = damage === 0 ? 2 : 1;
    buffsRepository.edgeCharge.appender(target, edgeChargeGain, false, 0);

    // Remove Spell Parry buff (consumed)
    target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.spellParry);
  }

  // Reversal Palm: Check before other damage mitigation
  // If save passes, negate attack and counter-attack
  const reversalPalm = target.buffsAndDebuffs.buffs.entry.get(
    BuffEnum.reversalPalm,
  );
  if (reversalPalm && reversalPalm.value > 0 && !damageOutput.isMagic) {
    const saveRoll = target.rollSave("willpower");
    const dc = 10; // Base DC for reversal palm

    if (saveRoll >= dc) {
      // Save passed: negate attack and counter-attack
      const skillLevel = reversalPalm.permValue || 1; // Use stored skill level
      const dexMod = statMod(target.attribute.getTotal("dexterity"));
      const bareHaneMod = statMod(target.proficiencies.getTotal("bareHand"));
      const levelScalar = skillLevelMultiplier(skillLevel);
      const counterDamage =
        (roll(1).d(6).total + dexMod + bareHaneMod) * levelScalar;

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

      console.log(
        `        🥋 Reversal Palm! ${target.name.en} countered for ${counterResult.actualDamage} damage!`,
      );

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
      Report.debug(
        `        ❌ Reversal Palm failed! ${target.name.en} failed the willpower save.`,
      );
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.reversalPalm);
    }
  }

  // Parry & Riposte: Check before other damage mitigation
  // If save passes, negate attack and counter-attack with slash damage
  const parry = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.parry);
  if (parry && parry.value > 0 && !damageOutput.isMagic) {
    const dc = 13;
    const saveRoll = target.rollSave("control");

    if (saveRoll >= dc) {
      // Save passed: negate attack and counter-attack
      const skillLevel = parry.permValue || 1; // Use stored skill level
      const dexMod = statMod(target.attribute.getTotal("dexterity"));
      const levelScalar = skillLevelMultiplier(skillLevel);
      const weaponDamge =
        target.getWeapon().weaponData.damage.physicalDamageDice;
      const counterDamage =
        (roll(weaponDamge.dice).d(weaponDamge.face).total + dexMod) *
        levelScalar;

      // Deal counter damage to attacker
      const counterDamageOutput: DamageInput = {
        damage: Math.max(0, Math.floor(counterDamage)),
        hit: 999, // Auto-hit counter
        crit: 0,
        type: DamageType.slash,
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
      buffsRepository.aegisPulse.appender(target, 1, false, 0);
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
    damage -= absorbed; // reduce damage by the absorbed amount
    planarAbsorption.value -= absorbed; // reduce stacks by absorbed amount

    Report.debug(
      `        🔮 Planar Absorption absorbed ${absorbed} damage (${planarAbsorption.value} stacks remaining)`,
    );

    // Convert absorbed damage to elemental resources: 4 damage = 1 resource
    // Map damage type to element type
    const damageTypeToElement: Partial<Record<DamageType, ElementResourceKey>> =
      {
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
      Report.debug(
        `        💎 Converted ${absorbed} absorbed damage to ${resourcesGained} ${elementType} resource(s)`,
      );
    }

    if (planarAbsorption.value <= 0) {
      target.buffsAndDebuffs.buffs.entry.delete(BuffEnum.planarAbsorption);
    }
  }

  // Exposed debuff: Add 1d3 extra damage from all sources
  // Note: exposed variable is already defined earlier for crit defense, reuse it
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
    traitRepository[traitEnum].config.onTakingDamage?.(
      target,
      attacker,
      damageOutput,
      value,
      finalDamage,
    );
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
