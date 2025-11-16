import type { Character } from "../Character/Character";
import { basicAttack } from "../Skill/definition/basicAttack";
import { skillRepository } from "../Skill/repository";
import type { Skill } from "../Skill/Skill";
import { isUsingConditionDeck } from "../Character/Subclass/DeckCondition/isUsingConditionDeck";
import type { Party } from "../Party/Party";
import Report from "src/Utils/Reporter";

export function getPlayableSkill(actor: Character, actorParty: Party, i: number = 0): {skill: Skill, skillLevel: number} {
  // Check if we should use conditional deck
  const useConditionalDeck = isUsingConditionDeck(actor, actorParty);
  const skillDeck = useConditionalDeck ? actor.conditionalSkills : actor.activeSkills;
  
  // Initialize logging on first call
  if (i === 0) {
    if (skillDeck.length === 0) {
      return { skill: basicAttack, skillLevel: 1 };
    }
  }
  
  if (i >= skillDeck.length) {
    return { skill: basicAttack, skillLevel: 1 };
  }

  const skillObj = skillDeck[i]!;
  const skillRep = skillRepository[skillObj.id];
  
  // Debug logging for skill selection
  if (i === 0) {
    Report.debug(`  Skill Selection for ${actor.name.en}:`);
  }
  Report.debug(`    Checking skill ${i + 1}/${skillDeck.length}: ${skillRep.name.en}`);

  // Insufficient HP/MP/SP
  if (actor.vitals.hp.current <= skillRep.consume.hp) {
    Report.debug(`      ❌ Skipped: Insufficient HP (${actor.vitals.hp.current} <= ${skillRep.consume.hp})`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }
  if (actor.vitals.mp.current < skillRep.consume.mp) {
    Report.debug(`      ❌ Skipped: Insufficient MP (${actor.vitals.mp.current} < ${skillRep.consume.mp})`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }
  if (actor.vitals.sp.current < skillRep.consume.sp) {
    Report.debug(`      ❌ Skipped: Insufficient SP (${actor.vitals.sp.current} < ${skillRep.consume.sp})`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }

  // Elemental resource check
  for (const consume of skillRep.consume.elements) {
    if (actor.resources[consume.element] < consume.value) {
      Report.debug(`      ❌ Skipped: Insufficient ${consume.element} element (${actor.resources[consume.element]} < ${consume.value})`);
      return getPlayableSkill(actor, actorParty, i + 1);
    }
  }


  // Buff/Debuff requirement check
  if (skillRep.existBuffDebuffs && skillRep.existBuffDebuffs.length > 0) {
    for (const buff of skillRep.existBuffDebuffs) {
      if (!actor.buffsAndDebuffs.entry.has(buff)) {
        Report.debug(`      ❌ Skipped: Buff/Debuff ${buff} must exist`);
        return getPlayableSkill(actor, actorParty, i + 1);
      }
    }
  }

  // Buff/Debuff requirement check
  if (skillRep.notExistBuffDebuffs && skillRep.notExistBuffDebuffs.length > 0) {
    for (const buff of skillRep.notExistBuffDebuffs) {
      if (actor.buffsAndDebuffs.entry.has(buff)) {
        Report.debug(`      ❌ Skipped: Buff/Debuff ${buff} must not exist`);
        return getPlayableSkill(actor, actorParty, i + 1);
      }
    }
  }

  // Equipment requirement check
  // If equipmentNeeded is empty [], allow any weapon. Otherwise, check if weapon is in the list.
  const weapon = actor.getWeapon();
  if (skillRep.equipmentNeeded.length > 0 && !skillRep.equipmentNeeded.includes(weapon.weaponType)) {
    Report.debug(`      ❌ Skipped: Wrong weapon type (has ${weapon.weaponType}, needs ${skillRep.equipmentNeeded.join(' or ')})`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }

  // Success - can use this skill!
  Report.debug(`      ✅ Selected: ${skillRep.name.en}`);
  return {skill: skillRep, skillLevel: skillObj.level};
}
