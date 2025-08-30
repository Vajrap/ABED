import type {
  ArtisanKey,
  AttributeKey,
  ElementKey,
  ProficiencyKey,
} from "../../InterFacesEnumsAndTypes/Enums";
import type { TraitEnum } from "../Trait.ts/enum";
import type { SkillId } from "./enums";

export type SkillLearningRequirement = Partial<{
  reqCharacterLevel: number;
  reqCharacterTrait: TraitEnum[];
  reqSkillId: SkillId[];
  reqElement: { element: ElementKey; value: number }[];
  reqProficiencies: { proficiency: ProficiencyKey; value: number }[];
  reqAttribute: { attribute: AttributeKey; value: number }[];
  reqArtisans: { artisan: ArtisanKey; value: number }[];
}>;

export type SkillLearnResult =
  | { success: true; learned: boolean; progress?: number }
  | { success: false; reason: "already_known" | "missing_requirements" };
