import type { Character } from "../Character/Character";
import { basicAttack } from "../Skill/definition/basicAttack";
import { skillRepository } from "../Skill/repository";
import type { Skill } from "../Skill/Skill";
import { isUsingConditionDeck } from "../Character/Subclass/DeckCondition/isUsingConditionDeck";
import type { Party } from "../Party/Party";
import Report from "src/Utils/Reporter";

export function getPlayableSkill(
  actor: Character,
  actorParty: Party,
): { skill: Skill; skillLevel: number } {
  // Check if we should use conditional deck
  const useConditionalDeck = isUsingConditionDeck(actor, actorParty);
  const skillDeck = useConditionalDeck
    ? actor.conditionalSkills
    : actor.activeSkills;

  if (skillDeck.length === 0) {
    return { skill: basicAttack, skillLevel: 1 };
  }

  // Initialize logging (equivalent to i === 0)

  for (let i = 0; i < skillDeck.length; i++) {
    // Safely get skillId (no undefined)
    const skillId = skillDeck[i];
    if (!skillId) {
      continue;
    }

    // Safely get skillRep
    const skillRep = skillRepository[skillId];
    if (!skillRep) {
      continue;
    }

    // info logging for skill selection

    // Insufficient HP/MP/SP
    if (actor.vitals.hp.current <= skillRep.consume.hp) {
      continue;
    }
    if (actor.vitals.mp.current < skillRep.consume.mp) {
      continue;
    }
    if (actor.vitals.sp.current < skillRep.consume.sp) {
      continue;
    }

    // Elemental resource check
    let canUseSkill = true;
    for (const consume of skillRep.consume.elements) {
      if (actor.resources[consume.element] < consume.value) {
        canUseSkill = false;
        break;
      }
    }
    if (!canUseSkill) continue;

    // Buff requirement check (must exist ALL)
    if (skillRep.existBuff && skillRep.existBuff.length > 0) {
      canUseSkill = true;
      for (const buff of skillRep.existBuff) {
        if (!actor.buffsAndDebuffs.buffs.entry.has(buff)) {
          canUseSkill = false;
          break;
        }
      }
      if (!canUseSkill) continue;
    }

    // Debuff requirement check (must exist ALL)
    if (skillRep.existDebuff && skillRep.existDebuff.length > 0) {
      canUseSkill = true;
      for (const debuff of skillRep.existDebuff) {
        if (!actor.buffsAndDebuffs.debuffs.entry.has(debuff)) {
          canUseSkill = false;
          break;
        }
      }
      if (!canUseSkill) continue;
    }

    // Buff not-exist check (must NOT exist ANY)
    if (skillRep.notExistBuff && skillRep.notExistBuff.length > 0) {
      canUseSkill = true;
      for (const buff of skillRep.notExistBuff) {
        if (actor.buffsAndDebuffs.buffs.entry.has(buff)) {
          canUseSkill = false;
          break;
        }
      }
      if (!canUseSkill) continue;
    }

    // Debuff not-exist check (must NOT exist ANY)
    if (skillRep.notExistDebuff && skillRep.notExistDebuff.length > 0) {
      canUseSkill = true;
      for (const debuff of skillRep.notExistDebuff) {
        if (actor.buffsAndDebuffs.debuffs.entry.has(debuff)) {
          canUseSkill = false;
          break;
        }
      }
      if (!canUseSkill) continue;
    }
    
    // Equipment requirement check
    // If equipmentNeeded is empty [], allow any weapon. Otherwise, check if weapon is in the list.
    if (skillRep.equipmentNeeded.length > 0) {
      const expectedShield = skillRep.equipmentNeeded.includes("shield");
      const weapon = actor.getWeapon(expectedShield);
      if (!skillRep.equipmentNeeded.includes(weapon.weaponType)) {
        continue;
      }
    }
    
    // Cooldown check
    const cooldownRemaining = actor.cooldowns.get(skillId);
    if (cooldownRemaining !== undefined && cooldownRemaining > 0) {
      continue;
    }
    
    // Lookup skill level from skills Map (O(1) lookup)
    const skillData = actor.skills.get(skillId);
    const skillLevel = skillData?.level ?? 1;
    
    // Success - can use this skill!
    return { skill: skillRep, skillLevel };
  }
  
  // No playable skill found
  return { skill: basicAttack, skillLevel: 1 };
}
