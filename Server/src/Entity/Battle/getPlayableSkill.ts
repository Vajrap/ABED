import type { Character } from "../Character/Character";
import { basicAttack } from "../Skill/definition/basicAttack";
import { skillRepository } from "../Skill/repository";
import type { Skill } from "../Skill/Skill";

export function getPlayableSkill(actor: Character, i: number = 0): {skill: Skill, skillLevel: number} {
  if (actor.activeSkills.length === 0) return { skill: basicAttack, skillLevel: 1 };
  if (i >= actor.activeSkills.length) return { skill: basicAttack, skillLevel: 1 };

  const skillObj = actor.activeSkills[i]!;
  const skillRep = skillRepository[skillObj.id];

  // Insufficient HP/MP/SP
  if (actor.vitals.hp.current <= skillRep.consume.hp)
    return getPlayableSkill(actor, i + 1);
  if (actor.vitals.mp.current < skillRep.consume.mp)
    return getPlayableSkill(actor, i + 1);
  if (actor.vitals.sp.current < skillRep.consume.sp)
    return getPlayableSkill(actor, i + 1);

  // Elemental resource check
  for (const consume of skillRep.consume.elements) {
    if (actor.resources[consume.element] < consume.value)
      return getPlayableSkill(actor, i + 1);
  }

  // Equipment requirement check
  if (!skillRep.equipmentNeeded.includes(actor.getWeapon().weaponType))
    return getPlayableSkill(actor, i + 1);

  return {skill: skillRep, skillLevel: skillObj.level};
}
