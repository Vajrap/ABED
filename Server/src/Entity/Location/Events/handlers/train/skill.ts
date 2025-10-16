import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import { rollTwenty } from "../../../../../Utils/Dice";
import { statMod } from "../../../../../Utils/statMod";
import type { Character } from "../../../../Character/Character";
import {
  createNews,
  type NewsContext,
  type News,
} from "../../../../News/News";
import type { SkillId } from "../../../../Skill/enums";
import { getExpNeededForSkill } from "./getExpNeeded";
import { gainStatTracker } from "./statTracker";

type SkillRepository = {
  get: (id: SkillId) => Skill | undefined;
};

class Skill {
  constructor(
    public id: SkillId,
    public maxLevel: number,
    public tier: TierEnum,
  ) {}
}

const skillRepository: SkillRepository = {
  get: (id: SkillId) => {
    // Mock implementation, replace with actual data retrieval
    return new Skill(id, 10, TierEnum.common); // Example skill with max level 10
  },
};

export function handleTrainSkill(
  characters: Character[],
  target: SkillId,
  context: NewsContext,
): News[] {
  let results: News[] = [];
  for (const character of characters) {
    let skill = character.skills.get(target);
    if (!skill) continue;

    if (character.level >= 20) continue;

    // TODO:
    const skillObj = skillRepository.get(target); // This should give us skill object, not done yet
    if (!skillObj) continue;
    if (skill.level >= skillObj.maxLevel) continue;

    const expNeeded = getExpNeededForSkill(skill.level, skillObj.tier);
    const expGained =
      rollTwenty().total +
      statMod(character.attribute.getStat("intelligence").total);

    skill.exp += expGained;
    if (skill.exp >= expNeeded) {
      skill.exp -= expNeeded;
      skill.level += 1;

      const statTrackGain = Math.max(statMod(skill.level), 0) + 1;

      gainStatTracker(character, statTrackGain);
    }

    const news = createNews({
      scope: {
        kind: "privateScope",
        characterId: character.id,
      },
      tokens: [
        {
          t: "char",
          v: [
            {
              name: character.name,
              title: character.title.string(),
              fame: character.fame.getString(context.subRegion),
              portrait: character.portrait ? character.portrait : "",
              level: character.level,
            },
          ],
        },
      ],
      context,
      secretTier: TierEnum.common
    });
    results.push(news);
  }
  return results;
}
