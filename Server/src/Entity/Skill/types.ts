import type {
  ArtisanKey,
  AttributeKey,
  ElementKey,
  ElementResourceKey,
  ProficiencyKey,
} from "../../InterFacesEnumsAndTypes/Enums";
import type { TraitEnum } from "../Trait/enum";
import type { SkillId } from "./enums";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import type { ActorEffect, TargetEffect } from "./effects";

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

export type SkillConsume = {
  hp: number;
  mp: number;
  sp: number;
  elements: ElementConsume[];
};

export type SkillProduce = {
  hp: number;
  mp: number;
  sp: number;
  elements: ElementProduce[];
};

export type ElementConsume = {
  element: ElementResourceKey;
  value: number;
};

export type ElementProduce = {
  element: ElementResourceKey;
  min: number;
  max: number;
};

export type TurnResult = {
  content: L10N;
  actor: ActorEffectPair;
  targets: TargetEffectPair[];
};

export type ActorEffectPair = {
  actorId: string;
  effect: ActorEffect[];
};

export type TargetEffectPair = {
  actorId: string;
  effect: TargetEffect[];
};
