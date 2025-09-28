import { expect, describe, beforeEach, afterEach, it, mock } from "bun:test";
import { roll, rollTwenty } from "../../../src/Utils/Dice";
import {
  CharacterArtisansFactory,
  CharacterAttributesFactory,
  CharacterElementsFactory,
  CharacterFactory,
  CharacterProficienciesFactory,
} from "../../Helper/Character";
import { Skill } from "../../../src/Entity/Skill/Skill";
import { SkillId } from "../../../src/Entity/Skill/enums";
import { TierEnum } from "../../../src/InterFacesEnumsAndTypes/Tiers";
import { tryTolearnSkill } from "../../../src/Entity/Skill/learnSkill";
import { TraitEnum } from "../../../src/Entity/Trait.ts/enum";
import {
  ELEMENT_KEYS,
  type ElementKey,
} from "../../../src/InterFacesEnumsAndTypes/Enums";
import type { CharacterAttributes } from "../../../src/Entity/Character/Subclass/Stats/CharacterAttributes";

mock.module("../../../../../Utils/Dice", () => ({
  rollDice: () => ({ totoal: 10 }),
}));

let skill = new Skill({
  id: SkillId.Test,
  name: "Test",
  tier: TierEnum.common,
  description: "Testing skill",
  requirement: {},
});

const mutReqSkills: [string, Skill][] = [
  [
    "character level",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqCharacterLevel: 10 },
    }),
  ],
  [
    "trait",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqCharacterTrait: [TraitEnum.Test] },
    }),
  ],
  [
    "skill prerequisite",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqSkillId: [SkillId.Test2] },
    }),
  ],
  [
    "element value",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqElement: [{ element: "fire", value: 10 }] },
    }),
  ],
  [
    "attribute",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqAttribute: [{ attribute: "strength", value: 10 }] },
    }),
  ],
  [
    "artisan",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqArtisans: [{ artisan: "alchemy", value: 10 }] },
    }),
  ],
  [
    "proficiency",
    new Skill({
      id: SkillId.Test,
      name: "Test",
      tier: TierEnum.common,
      description: "Testing skill",
      requirement: { reqProficiencies: [{ proficiency: "sword", value: 10 }] },
    }),
  ],
];

describe("learn skill", () => {
  it("should tick progression", () => {
    const char = CharacterFactory.create().build();
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(SkillId.Test);
    expect(result.success).toBe(true);
    if (result.success) expect(result.learned).toBe(false);
    expect(progress).not.toBeUndefined();
    expect(char.skills.has(SkillId.Test)).toBe(false);
  });

  it("should learn if progression surpassed 100", () => {
    const char = CharacterFactory.create().build();
    char.skillLearningProgress.set(SkillId.Test, 99);
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(SkillId.Test);
    expect(result.success).toBe(true);
    if (result.success) expect(result.learned).toBe(true);
    expect(progress).toBeUndefined();
    expect(char.skills.has(SkillId.Test)).toBe(true);
  });

  it("should not learn if already learned", () => {
    const char = CharacterFactory.create().build();
    char.skills.set(SkillId.Test, { id: SkillId.Test, level: 1, exp: 0 });
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(SkillId.Test);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.reason).toBe("already_known");
    expect(progress).toBeUndefined();
    expect(char.skills.has(SkillId.Test)).toBe(true);
  });

  it.each(mutReqSkills)("should not learn if missing %s", (_, skill) => {
    const char = CharacterFactory.create().build();
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(skill.id);
    expect(result.success).toBe(false);
    expect(progress).toBeUndefined();
    expect(char.skills.has(SkillId.Test)).toBe(false);
  });

  it.each(mutReqSkills)("should learn if surpassed %s", (_, skill) => {
    const obj = { base: 20, exp: 0 };
    const attrs = CharacterAttributesFactory.create()
      .with("strength", obj)
      .build();
    const arts = CharacterArtisansFactory.create().with("alchemy", obj).build();
    const prof = CharacterProficienciesFactory.create()
      .with("sword", obj)
      .build();
    const element = CharacterElementsFactory.create().with("fire", obj).build();
    const char = CharacterFactory.create()
      .withLevel(20)
      .withAttributes(attrs)
      .withArtisans(arts)
      .withProficiencies(prof)
      .withElements(element)
      .build();
    char.traits.push(TraitEnum.Test);
    char.traits.push(TraitEnum.Test2);
    console.log(char.traits);
    char.skills.set(SkillId.Test2, { id: SkillId.Test2, level: 1, exp: 0 });

    const result = tryTolearnSkill(char, skill);
    expect(result.success).toBe(true);
  });
});
