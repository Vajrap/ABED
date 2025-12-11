import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { rollTwenty, roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import type { SkillId } from "../../../../Skill/enums";
import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";

/**
 * Handle School actions
 * - Learn skill action (enhanced learning - 2x progress)
 * - Study action (knowledge gain)
 */
export function handleSchoolAction(
  character: Character,
  context: NewsContext,
  action: "learnSkill" | "study",
  skillId?: SkillId,
): News[] {
  const news: News[] = [];

  if (action === "learnSkill") {
    // Enhanced skill learning: 2x progress gain compared to normal learning
    if (!skillId) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attended classes but no skill was specified.`,
            th: `${character.name?.th || character.name} เข้าเรียนแต่ไม่ได้ระบุทักษะ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    // Get existing progress
    const existingProgress = character.skillLearningProgress.get(skillId) || 0;
    
    // Mock skill repository (should be replaced with actual repository)
    // For now, assume common tier
    const skillTier = TierEnum.common;
    const progressNeeded = progressNeededToLearnSkill(skillTier);
    
    // Enhanced learning: 2x progress gain
    let progressGained = 1;
    const rolled = rollTwenty().total;
    if (rolled === 1) {
      progressGained = 1;
    } else if (rolled === 20) {
      progressGained = ((statMod(character.attribute.getStat("intelligence").total) + rolled) * 2) * 2; // Double the normal
    } else {
      progressGained = (statMod(character.attribute.getStat("intelligence").total) + rolled) * 2; // Double the normal
    }
    
    const newProgress = existingProgress + progressGained;
    let learned = false;
    
    if (newProgress >= progressNeeded) {
      // Skill learned
      learned = true;
      character.skillLearningProgress.delete(skillId);
      character.skills.set(skillId, { id: skillId, level: 1, exp: 0 });
    } else {
      character.skillLearningProgress.set(skillId, newProgress);
    }

    // Apply needs changes: Energy -2, Mood +2 (learning is engaging)
    character.needs.decEnergy(2);
    character.needs.incMood(2);

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} attended classes at the school${learned ? ` and learned ${skillId}!` : ` and made progress learning ${skillId} (${newProgress}/${progressNeeded})`}.`,
          th: `${character.name?.th || character.name} เข้าเรียนที่โรงเรียน${learned ? ` และเรียนรู้ ${skillId}!` : ` และมีความก้าวหน้าในการเรียนรู้ ${skillId} (${newProgress}/${progressNeeded})`}`,
        },
        context,
        significance: learned ? NewsSignificance.MAJOR : NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  } else if (action === "study") {
    // Apply needs changes: Energy -1, Mood +1
    character.needs.decEnergy(1);
    character.needs.incMood(1);

    // Knowledge gain: Add random knowledge entries to character.information
    const knowledgeTypes = [
      `location_info_${context.location}`,
      `world_lore_${context.region}`,
      `skill_hint_${roll(1).d(10).total}`,
      `history_${context.subRegion}`,
    ];
    
    const selectedKnowledge = knowledgeTypes[Math.floor(Math.random() * knowledgeTypes.length)]!;
    character.information[selectedKnowledge] = (character.information[selectedKnowledge] || 0) + 1;
    
    // Small skill learning progress bonus (1-3 points to a random skill or general progress)
    const progressBonus = roll(1).d(3).total;
    const knowledgeKey = `school_study_progress_${Date.now()}`;
    character.information[knowledgeKey] = (character.information[knowledgeKey] || 0) + progressBonus;

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} studied at the school and gained knowledge.`,
          th: `${character.name?.th || character.name} เรียนที่โรงเรียนและได้รับความรู้`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

/**
 * Calculate progress needed to learn a skill based on tier
 */
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
      return 100;
  }
}

