import { ELEMENT_KEYS } from "../../InterFacesEnumsAndTypes/Enums";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../Character/Character";
import { BreathingSkillId } from "./enum";
import { BreathingSkill } from "./BreathinglSkill";

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

// From the looks of it, this means when character 'train' the internal skill, or when it level goes up, we need to deactive it first, to make sure the passive stats given won't be wrong
const testInt = new BreathingSkill({
  id: BreathingSkillId.test,
  name: {
    en: "Test Internal",
    th: "ทดสอบภายใน"
  },
  type: ELEMENT_KEYS[0],
  tier: TierEnum.common,
  activateEffect: {
    on: (character: Character, skillLevel: number) => {
      character.attribute.mutateBonus("strength", skillLevel);
    },
    off: (character: Character, skillLevel: number) => {
      character.attribute.mutateBonus("strength", -skillLevel);
    },
    attacking: (
      character: Character,
      target: Character,
      skillLevel: number,
    ) => {
      // should return some thing that aking to battle Report, so that user can read what happen
      return;
      // has no effect, this is a defensive internal
      // The same goes to this as in the attacked
    },
    attacked: (character: Character, target: Character, skillLevel: number) => {
      // should return some thing that aking to battle Report, so that user can read what happen
      /*
        Maybe we need to send a damage object here too, well actually internal effect can change many things
        from damage, to effect in battle so... we might need to send all of those context in, and let the internal itself decided what to change
        and return the mutated things?
        let's say
        DamageObject: {
          damage: number,
          type: DamageType
        }
        if damage.type === fire, damage.damage = Math.min(damage.damage - skillLevel, 0)

        return damage, buff, character, attacker etc
      */
    },
    takingTurn: (self: Character, skillLevel: number) => {
      self.vitals.incHp(skillLevel);
      self.vitals.incMp(skillLevel);
      self.vitals.incSp(skillLevel);
    },
  },
});
