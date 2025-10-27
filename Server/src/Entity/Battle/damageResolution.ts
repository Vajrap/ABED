import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getCharacter } from "src/Utils/getCharacter";
import { resolveBreathingSkillInBattle } from "../BreathingSkill/activeBreathingSkill";
import { statMod } from "src/Utils/statMod";
import Report from "src/Utils/Reporter";
import { locationRepository } from "src/Entity/Location/Location/repository.ts";
import { BuffsAndDebuffsEnum } from "../BuffsAndDebuffs/enum";

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
}

const NEUTRAL_AC = 10;

export function resolveDamage(
  attackerId: string,
  targetId: string,
  damageOutput: DamageInput,
  location: LocationsEnum,
  critModifier: number = 1.5,
  isMagic: boolean = false,
): DamageResult {
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

  console.log(`      Damage Calculation:`);
  console.log(`        Base Damage: ${damageOutput.damage} | Hit: ${damageOutput.hit} | Crit: ${damageOutput.crit} | Type: ${damageOutput.type}`);

  // Apply breathing skill effects before damage calculation, might change something
  resolveBreathingSkillInBattle(attackerId, targetId, damageOutput);

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

  console.log(`        Hit Check: Hit(${damageOutput.hit}) vs Dodge(${dodgeChance})`);

  // not auto hit and dodge > hit ==> miss
  if (!autoHitByCrit && dodgeChance >= damageOutput.hit) {
    console.log(`        ❌ MISSED!`);
    return {
      actualDamage: 0,
      damageType: damageOutput.type,
      isHit: false,
      isCrit: false,
    };
  }

  console.log(`        ✅ HIT!`);

  // Aptitude
  if (isMagic) {
    damageOutput.damage =
      damageOutput.damage *
      target.planarAptitude.getSpellEffectivenessAptitude();
  }

  // --- MITIGATION ---
  const { baseMitigation, ifMagicAptitudeMultiplier } = !isMagic
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
  console.log(`        Mitigation: ${baseMitigation} (pDEF: ${target.battleStats.getTotal("pDEF")} + Endurance: ${statMod(target.attribute.getTotal("endurance"))}) = effective ${effectiveMitigation}`);

  let damage = Math.max(
    damageOutput.damage / ifMagicAptitudeMultiplier -
      effectiveMitigation,
    0,
  );

  console.log(`        Damage after mitigation: ${damage.toFixed(1)} (${damageOutput.damage} - ${effectiveMitigation})`);

  // --- CRIT CHECK ---
  // Keep stat usage consistent: use statMod(endurance) if dodge used statMod(agility)
  let isCrit = false;
  if (damageOutput.crit - critDefense >= 20) {
    damage *= critModifier;
    isCrit = true;
    console.log(`        💥 CRITICAL HIT! Damage × ${critModifier}`);
  }

  // --- BUFFS/DEBUFFS/TRAITS (future hooks) ---
  const taunt = target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt);
  if (taunt) {
    if (taunt.value > 0) {
      target.resources.fire += 1;
    }
  }

  const arcaneShield = target.buffsAndDebuffs.entry.get(
    BuffsAndDebuffsEnum.arcaneShield,
  );
  if (arcaneShield) {
    const absorbed = Math.min(damage, arcaneShield.value);
    damage -= absorbed; // reduce damage by the absorbed amount
    arcaneShield.value -= absorbed; // reduce shield by absorbed amount

    if (arcaneShield.value <= 0) {
      target.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.arcaneShield);
    }
  }

  // TODO: Location-based effects (damage type vs weather)
  // Example pattern:
  // damage = this.applyElementalInteractions(damage, damageType);
  // damage = this.applyShieldsAndAbsorbs(damage);

  // --- ROUND & APPLY ---
  const finalDamage = Math.max(Math.floor(damage), 0);
  
  console.log(`        Final Damage: ${finalDamage} (${damage.toFixed(1)} rounded down)`);
  
  target.vitals.decHp(finalDamage);

  return {
    actualDamage: finalDamage,
    damageType: damageOutput.type,
    isHit: true,
    isCrit,
  };
}
