import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { getCharacter } from "src/Utils/getCharacter";
import { resolveBreathingSkillInBattle } from "../BreathingSkill/activeBreathingSkill";
import { statMod } from "src/Utils/statMod";
import Report from "src/Utils/Reporter";
import {locationRepository} from "src/Entity/Location/Location/repository.ts";

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

export function resolveDamage(
  attackerId: string,
  targetId: string,
  damageOutput: DamageInput,
  location: LocationsEnum,
  critModifier: number = 1.5,
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

    // Apply breathing skill effects before damage calculation, might change something
    resolveBreathingSkillInBattle(attackerId, targetId, damageOutput);

  // --- HIT / DODGE ---
  // If you mean "nat 20 can't be dodged", you need a raw die or a boolean flag.
  // Here we treat 20+ as "auto-hit" only if that's your rule; adjust as needed.
  const dodgeChance =
    target.battleStats.getTotal("dodge") +
    statMod(target.attribute.getTotal("agility"));

  // Attacker's 'hit' already includes their bonuses
  const critDefense = statMod(target.attribute.getTotal("endurance"));
  const autoHitByCrit = damageOutput.crit >= 20 + critDefense; // ideally: damageOutput.isNat20 === true

  // not auto hit and dodge > hit ==> miss
  if (!autoHitByCrit && (dodgeChance >= damageOutput.hit)) {
    return {
      actualDamage: 0,
      damageType: damageOutput.type,
      isHit: false,
      isCrit: false,
    };
  }

  // --- MITIGATION ---
  const isPhysical =
    damageOutput.type === DamageType.pierce ||
    damageOutput.type === DamageType.slash ||
    damageOutput.type === DamageType.blunt;

  const mitigation = isPhysical
    ? target.battleStats.getTotal("pDEF") +
      statMod(target.attribute.getTotal("endurance"))
    : target.battleStats.getTotal("mDEF") +
      statMod(target.attribute.getTotal("planar"));

  let damage = Math.max(damageOutput.damage - Math.max(mitigation, 0), 0);

  // --- CRIT CHECK ---
  // Keep stat usage consistent: use statMod(endurance) if dodge used statMod(agility)
  let isCrit = false;
  if (damageOutput.crit - critDefense >= 20) {
    damage *= critModifier;
    isCrit = true;
  }

  // TODO: Location-based effects (damage type vs weather)
  // --- BUFFS/DEBUFFS/TRAITS (future hooks) ---
  // Example pattern:
  // damage = this.applyElementalInteractions(damage, damageType);
  // damage = this.applyShieldsAndAbsorbs(damage);

  // --- ROUND & APPLY ---
  const finalDamage = Math.max(Math.floor(damage), 0);
  target.vitals.decHp(finalDamage);

  return {
    actualDamage: finalDamage,
    damageType: damageOutput.type,
    isHit: true,
    isCrit,
  };
}
