import type { Character } from "../Character/Character";
import { basicAttack } from "../Skill/definition/basicAttack";
import { skillRepository } from "../Skill/repository";
import type { Skill } from "../Skill/Skill";
import { isUsingConditionDeck } from "../Character/Subclass/DeckCondition/isUsingConditionDeck";
import type { Party } from "../Party/Party";

export function getPlayableSkill(actor: Character, actorParty: Party, i: number = 0): {skill: Skill, skillLevel: number} {
  // Check if we should use conditional deck
  const useConditionalDeck = isUsingConditionDeck(actor, actorParty);
  const skillDeck = useConditionalDeck ? actor.conditionalSkills : actor.activeSkills;
  
  // Initialize logging on first call
  if (i === 0) {
    if (skillDeck.length === 0) {
      console.log(`    No skills available, using Basic Attack`);
      return { skill: basicAttack, skillLevel: 1 };
    }
    console.log(`    ${useConditionalDeck ? '⚡ Conditional' : '📜 Active'} Deck: Checking ${skillDeck.length} available skills...`);
  }
  
  if (i >= skillDeck.length) {
    console.log(`    No skills available, using Basic Attack`);
    return { skill: basicAttack, skillLevel: 1 };
  }

  const skillObj = skillDeck[i]!;
  const skillRep = skillRepository[skillObj.id];
  
  console.log(`    Skill [${i + 1}/${skillDeck.length}]: ${skillRep.name.en}`);

  // Insufficient HP/MP/SP
  if (actor.vitals.hp.current <= skillRep.consume.hp) {
    console.log(`      ❌ Cannot use: HP (${actor.vitals.hp.current}/${actor.vitals.hp.max}) <= ${skillRep.consume.hp}`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }
  if (actor.vitals.mp.current < skillRep.consume.mp) {
    console.log(`      ❌ Cannot use: MP (${actor.vitals.mp.current}/${actor.vitals.mp.max}) < ${skillRep.consume.mp}`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }
  if (actor.vitals.sp.current < skillRep.consume.sp) {
    console.log(`      ❌ Cannot use: SP (${actor.vitals.sp.current}/${actor.vitals.sp.max}) < ${skillRep.consume.sp}`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }

  // Elemental resource check
  for (const consume of skillRep.consume.elements) {
    if (actor.resources[consume.element] < consume.value) {
      console.log(`      ❌ Cannot use: ${consume.element} (${actor.resources[consume.element]}) < ${consume.value}`);
      return getPlayableSkill(actor, actorParty, i + 1);
    }
  }

  // Equipment requirement check
  // If equipmentNeeded is empty [], allow any weapon. Otherwise, check if weapon is in the list.
  const weapon = actor.getWeapon();
  if (skillRep.equipmentNeeded.length > 0 && !skillRep.equipmentNeeded.includes(weapon.weaponType)) {
    console.log(`      ❌ Cannot use: Weapon (${weapon.weaponType}) not in required types [${skillRep.equipmentNeeded.join(', ')}]`);
    return getPlayableSkill(actor, actorParty, i + 1);
  }

  // Success - can use this skill!
  console.log(`      ✅ Can use!`);
  return {skill: skillRep, skillLevel: skillObj.level};
}
