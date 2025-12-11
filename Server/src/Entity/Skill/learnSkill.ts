import type { DiceEnum } from "../../InterFacesEnumsAndTypes/Enums";
import { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import { statMod } from "../../Utils/statMod";
import type { Character } from "../Character/Character";
import type { Skill } from "./Skill";
import type { SkillLearnResult } from "./types";

export function tryTolearnSkill(
  character: Character,
  skill: Skill,
): SkillLearnResult {
  if (checkIfCharacterAlreadyKnownSkill(character, skill)) {
    broadcastSkillUpdate(character, skill, { success: false });
    return { success: false, reason: "already_known" };
  }

  if (!checkSkillLearningRequirement(character, skill)) {
    broadcastSkillUpdate(character, skill, { success: false });
    return { success: false, reason: "missing_requirements" };
  }

  const result = learnSkill(character, skill);
  broadcastSkillUpdate(character, skill, { success: true });
  return { success: true, learned: result };
}

function checkIfCharacterAlreadyKnownSkill(
  character: Character,
  skill: Skill,
): boolean {
  let isKnown =
    character.activeSkills.some((s) => s.id === skill.id) ||
    character.conditionalSkills.some((s) => s.id === skill.id) ||
    character.skills.get(skill.id) !== undefined;

  return isKnown;
}

function checkSkillLearningRequirement(
  character: Character,
  skill: Skill,
): boolean {
  const req = skill.requirement;

  if (
    req.reqCharacterLevel !== undefined &&
    character.level < req.reqCharacterLevel
  ) {
    return false;
  }

  if (req.reqCharacterTrait) {
    for (const trait of req.reqCharacterTrait) {
      if (!character.traits.has(trait)) return false;
    }
  }

  if (req.reqSkillId) {
    for (const reqSkill of req.reqSkillId) {
      const hasSkill =
        character.skills.has(reqSkill) ||
        character.activeSkills.some((s) => s.id === reqSkill) ||
        character.conditionalSkills.some((s) => s.id === reqSkill);

      if (!hasSkill) return false;
    }
  }

  if (req.reqElement) {
    for (const { element, value } of req.reqElement) {
      if (character.elements.getTotal(element) < value) return false;
    }
  }

  if (req.reqProficiencies) {
    for (const { proficiency, value } of req.reqProficiencies) {
      if (character.proficiencies.getTotal(proficiency) < value) return false;
    }
  }

  if (req.reqAttribute) {
    for (const { attribute, value } of req.reqAttribute) {
      if (character.attribute.getTotal(attribute) < value) return false;
    }
  }

  if (req.reqArtisans) {
    for (const { artisan, value } of req.reqArtisans) {
      if (character.artisans.getTotal(artisan) < value) return false;
    }
  }

  return true;
}

function learnSkill(character: Character, skill: Skill): boolean {
  const rawProgress = character.skillLearningProgress.get(skill.id);
  let progress: number = rawProgress !== undefined ? rawProgress : 0;
  const { base, bonusDice } = getBaseAndBonusRange(skill.tier);
  // Random bonus - don't apply bless/curse (it's progress gain, not a skill check)
  const randomBonus = character.roll({ amount: 1, face: bonusDice, applyBlessCurse: false });
  const intBonus = Math.round(
    statMod(character.attribute.getTotal("intelligence") / 2),
  );
  progress += base + randomBonus + intBonus;

  if (progress >= 100) {
    character.skills.set(skill.id, { id: skill.id, level: 1, exp: 0 });
    character.skillLearningProgress.delete(skill.id);
    broadcastSkillUpdate(character, skill, { success: true });
    return true;
  } else {
    character.skillLearningProgress.set(skill.id, progress);
    broadcastSkillUpdate(character, skill, { success: true });
    return false;
  }
}

function getBaseAndBonusRange(tier: TierEnum): {
  base: number;
  bonusDice: number;
} {
  switch (tier) {
    case TierEnum.common:
      return { base: 30, bonusDice: 6 };
    case TierEnum.uncommon:
      return { base: 25, bonusDice: 6 };
    case TierEnum.rare:
      return { base: 20, bonusDice: 6 };
    case TierEnum.epic:
      return { base: 15, bonusDice: 4 };
    case TierEnum.legendary:
      return { base: 10, bonusDice: 4 };
    case TierEnum.unique:
      return { base: 5, bonusDice: 4 };
    case TierEnum.divine:
      return { base: 1, bonusDice: 2 };
    default:
      return { base: 0, bonusDice: 2 };
  }
}

function broadcastSkillUpdate(
  character: Character,
  skill: Skill,
  result: any,
): void {
  // trait: Implement
}
