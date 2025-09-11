import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import { rollTwenty } from "../../../../../Utils/Dice";
import { statMod } from "../../../../../Utils/statMod";
import type { Character } from "../../../../Character/Character";
import { createNews, type NewsContext, type NewsWithScope } from "../../../../News/News";
import type { SkillId } from "../../../../Skill/enums";

// Mocked skill repository for demonstration purposes
type SkillRepository = {
  get: (id: SkillId) => Skill | undefined;
};

class Skill {
  constructor(
    public id: SkillId, 
    public maxLevel: number, 
    public tier: TierEnum
    ) {}
}

const skillRepository: SkillRepository = {
  get: (id: SkillId) => {
    // Mock implementation, replace with actual data retrieval
    return new Skill(id, 10, TierEnum.common); // Example skill with max level 10
  }
};

export function handleLearnSkill(character: Character, skillId: SkillId, context: NewsContext): NewsWithScope | null {
    // TODO
    const existingProgress = character.skillLearningProgress.get(skillId) || 0;
    const skillTier = skillRepository.get(skillId)?.tier;
    if (!skillTier) return null; //Need to report error, skill not found
    let learned = false;
    const progressNeeded = progressNeededToLearnSkill(skillTier);
    let progressGained = 1;
    let rolled = rollTwenty().total;
    if (rolled === 1) {
        progressGained = 1;
    } else if (rolled === 20) {
        progressGained = (statMod(character.attribute.getStat("intelligence").total) + rolled) * 2;
    } else {
        progressGained = statMod(character.attribute.getStat("intelligence").total) + rolled;
    }
    const newProgress = existingProgress + progressGained;
    if (newProgress >= progressNeeded) {
        // Skill learned
        learned = true;
        character.skillLearningProgress.delete(skillId);
        character.skills.set(skillId, { id: skillId, level: 1, exp: 0 }); // Assuming new skill starts at level 1 with 0 exp
        const news: NewsWithScope = {
            scope: {
                kind: "private",
                characterIds: [character.id],
            },
            news: createNews({
                scope: {
                    kind: "private",
                    characterIds: [character.id],
                },
                tokens: [
                    {
                        t: "char",
                        v: [character.intoNewsInterface(context.subRegion)]
                    },
                    {
                        t: "text",
                        v: `${learned ? "has learned" : "progressed towards learning"}`
                    },
                    {
                        t: "skill",
                        id: skillId
                    }
                ],
                context,
            }),
        };

        return news;
    }

    return null;
}

function progressNeededToLearnSkill(tier: TierEnum): number {
    switch (tier) {
        case TierEnum.common:
            return 100;
        case TierEnum.uncommon:
            return 200;
        case TierEnum.rare:
            return 300;
        case TierEnum.epic:
            return 400;
        case TierEnum.legendary:
            return 500;
        default:
            return 0;
    }
}