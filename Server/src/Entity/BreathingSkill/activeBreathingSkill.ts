import { BreathingSkill } from "./BreathinglSkill";
import Report from "src/Utils/Reporter";
import { breathingSkillRepository } from "./repository";
import { getCharacter } from "../../Utils/getCharacter";

export function activeBreathingSkill(
  characterId: string,
  internal: BreathingSkill,
  skillLevel: number,
) {
  const character = getCharacter(characterId);
  if (character === undefined) {
    Report.error(`Character with ID ${characterId} not found`);
    return;
  }
  internal.activateEffect.on(characterId, skillLevel);
}

export function deactiveBreathingSkill(
  characterId: string,
  internal: BreathingSkill,
  skillLevel: number,
) {
  const character = getCharacter(characterId);
  if (character === undefined) {
    Report.error(`Character with ID ${characterId} not found`);
    return;
  }
  internal.activateEffect.off(characterId, skillLevel);
}

export function activateBreathingSkillTurnPassive(actorId: string) {
  const actor = getCharacter(actorId);
  if (actor === undefined) {
    Report.error(`Character with ID ${actorId} not found`);
    return;
  }
  const skillId = actor.activeBreathingSkill;
  if (skillId !== null) {
      const characterSkillObj = actor.breathingSkills.get(skillId);
      if (characterSkillObj === undefined) {
          Report.error(`Character trying to access self active skill ID: ${actor.activeBreathingSkill} Object that is active, but can't find`);
          return;
      }
      const skill = breathingSkillRepository[skillId]
      skill.activateEffect.takingTurn(actorId, characterSkillObj.level)
  }
}

export function resolveBreathingSkillInBattle(actorId: string, targetId: string, damageObj: {damage: number, hit: number, crit: number}) {
  const actor = getCharacter(actorId);
  if (actor === undefined) {
    Report.error(`Character with ID ${actorId} not found`);
    return;
  }
  const target = getCharacter(targetId);
  if (target === undefined) {
    Report.error(`Character with ID ${targetId} not found`);
    return;
  }
  const actorSkill: BreathingSkill | null = actor.activeBreathingSkill ? breathingSkillRepository[actor.activeBreathingSkill] : null;
  if (actorSkill !== null && actor.activeBreathingSkill !== null) {
    const skillLevel = actor.breathingSkills.get(actor.activeBreathingSkill)?.level;
    actorSkill.activateEffect.attacking(actorId, targetId, skillLevel!, damageObj);
  }
  const targetSkill: BreathingSkill | null = target.activeBreathingSkill ? breathingSkillRepository[target.activeBreathingSkill] : null;
  if (targetSkill !== null && target.activeBreathingSkill !== null) {
    const skillLevel = target.breathingSkills.get(target.activeBreathingSkill)?.level;
    targetSkill.activateEffect.attacked(targetId, actorId, skillLevel!, damageObj);
  }
}