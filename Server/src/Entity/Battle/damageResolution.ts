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
  if (!autoHitByCrit && dodgeChance >= damageOutput.hit) {
    return {
      actualDamage: 0,
      damageType: damageOutput.type,
      isHit: false,
      isCrit: false,
    };
  }

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

  let damage = Math.max(
    damageOutput.damage / ifMagicAptitudeMultiplier -
      Math.max(baseMitigation, 0),
    0,
  );

  // --- CRIT CHECK ---
  // Keep stat usage consistent: use statMod(endurance) if dodge used statMod(agility)
  let isCrit = false;
  if (damageOutput.crit - critDefense >= 20) {
    damage *= critModifier;
    isCrit = true;
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
  target.vitals.decHp(finalDamage);

  return {
    actualDamage: finalDamage,
    damageType: damageOutput.type,
    isHit: true,
    isCrit,
  };
}
