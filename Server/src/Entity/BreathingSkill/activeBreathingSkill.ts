import type { Character } from "../Character/Character";
import { BreathingSkill } from "./BreathinglSkill";
import Report from "src/Utils/Reporter";
import { breathingSkillRepository } from "./repository";

export function activeBreathingSkill(
  character: Character,
  internal: BreathingSkill,
  skillLevel: number,
) {
  internal.activateEffect.on(character, skillLevel);
}

export function deactiveBreathingSkill(
  character: Character,
  internal: BreathingSkill,
  skillLevel: number,
) {
  internal.activateEffect.off(character, skillLevel);
}

export function activateBreathingSkillTurnPassive(actor: Character) {
  const skillId = actor.activeBreathingSkill;
  if (skillId !== null) {
      const characterSkillObj = actor.breathingSkills.get(skillId);
      if (characterSkillObj === undefined) {
          Report.error(`Character trying to access self active skill ID: ${actor.activeBreathingSkill} Object that is active, but can't find`);
          return;
      }
      const skill = breathingSkillRepository[skillId]
      skill.activateEffect.takingTurn(actor, characterSkillObj.level)
  }
}

export function resolveBreathingSkillInBattle(actor: Character, target: Character, damageObj: {damage: number, hit: number, crit: number}) {
  const actorSkill: BreathingSkill | null = actor.activeBreathingSkill ? breathingSkillRepository[actor.activeBreathingSkill] : null;
  if (actorSkill !== null && actor.activeBreathingSkill !== null) {
    const skillLevel = actor.breathingSkills.get(actor.activeBreathingSkill)?.level;
    actorSkill.activateEffect.attacking(actor, target, skillLevel!, damageObj);
  }
  const targetSkill: BreathingSkill | null = target.activeBreathingSkill ? breathingSkillRepository[target.activeBreathingSkill] : null;
  if (targetSkill !== null && target.activeBreathingSkill !== null) {
    const skillLevel = target.breathingSkills.get(target.activeBreathingSkill)?.level;
    targetSkill.activateEffect.attacked(target, actor, skillLevel!, damageObj);
  }
}