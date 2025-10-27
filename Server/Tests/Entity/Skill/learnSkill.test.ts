import { expect, describe, beforeEach, afterEach, it } from "@jest/globals";
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
} from "../../../src/InterFacesEnumsAndTypes/Enums";
import { ElementKey } from "../../../src/InterFacesEnumsAndTypes/Enums";
import { CharacterAttributes } from "../../../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { TurnResult } from "src/Entity/Skill/types";

jest.mock("../../../src/Utils/Dice", () => ({
  roll: jest.fn((amount: number) => ({
    d: jest.fn(() => ({
      total: 10,
      seed: () => ({ total: 10 }),
      rolls: Array(amount).fill(5),
    })),
  })),
  rollTwenty: jest.fn(() => ({
    total: 10,
    rolls: [10],
  })),
}));

let skill = new Skill({
  id: SkillId.Basic,
  name: {en: "Test", th: "ทดสอบ"},
  tier: TierEnum.common,
  description: {en: "Testing skill", th: "ทดสอบทักษะ"},
  requirement: {},
  equipmentNeeded: [],
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: () => {
    return {
      content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
      actor: {
        actorId: "",
        effect: []
      },
      targets: []
    }
  },
});

const mutReqSkills: [string, Skill][] = [
  [
    "character level",
    new Skill({
      id: SkillId.Basic,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},
      requirement: { reqCharacterLevel: 10 },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
  [
    "trait",
    new Skill({
      id: SkillId.Basic,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},
      requirement: { reqCharacterTrait: [TraitEnum.Test] },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
  [
    "skill prerequisite",
    new Skill({
      id: SkillId.ThrowPebble,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},
      requirement: { reqSkillId: [SkillId.Basic] },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
  [
    "element value",
    new Skill({
      id: SkillId.Basic,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},
      requirement: { reqElement: [{ element: "fire", value: 10 }] },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
  [
    "attribute",
    new Skill({
      id: SkillId.Basic,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},
      requirement: { reqAttribute: [{ attribute: "strength", value: 10 }] },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
  [
    "artisan",
    new Skill({
      id: SkillId.Basic,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},  
      requirement: { reqArtisans: [{ artisan: "alchemy", value: 10 }] },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
  [
    "proficiency",
    new Skill({
      id: SkillId.Basic,
      name: {en: "Test", th: "ทดสอบ"},
      tier: TierEnum.common,
      description: {en: "Testing skill", th: "ทดสอบทักษะ"},
      requirement: { reqProficiencies: [{ proficiency: "sword", value: 10 }] },
      equipmentNeeded: [],
      consume: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      produce: {
        hp: 0,
        mp: 0,
        sp: 0,
        elements: [],
      },
      exec: () => {
        return {
          content: {en: "Skill learned", th: "ทักษะเรียนรู้แล้ว"},
          actor: {
            actorId: "",
            effect: []
          },
          targets: []
        }
      },
    }),
  ],
];

describe("learn skill", () => {
  it("should tick progression", () => {
    const char = CharacterFactory.create().build();
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(SkillId.Basic);
    expect(result.success).toBe(true);
    if (result.success) expect(result.learned).toBe(false);
    expect(progress).not.toBeUndefined();
    expect(char.skills.has(SkillId.Basic)).toBe(false);
  });

  it("should learn if progression surpassed 100", () => {
    const char = CharacterFactory.create().build();
    char.skillLearningProgress.set(SkillId.Basic, 99);
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(SkillId.Basic);
    expect(result.success).toBe(true);
    if (result.success) expect(result.learned).toBe(true);
    expect(progress).toBeUndefined();
    expect(char.skills.has(SkillId.Basic)).toBe(true);
  });

  it("should not learn if already learned", () => {
    const char = CharacterFactory.create().build();
    char.skills.set(SkillId.Basic, { id: SkillId.Basic, level: 1, exp: 0 });
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(SkillId.Basic);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect((result as { success: false; reason: string }).reason).toBe("already_known");
    }
    expect(progress).toBeUndefined();
    expect(char.skills.has(SkillId.Basic)).toBe(true);
  });

  it.each(mutReqSkills)("should not learn if missing %s", (_: string, skill: Skill) => {
    const char = CharacterFactory.create().build();
    const result = tryTolearnSkill(char, skill);
    const progress = char.skillLearningProgress.get(skill.id);
    expect(result.success).toBe(false);
    expect(progress).toBeUndefined();
    expect(char.skills.has(SkillId.Basic)).toBe(false);
  });

  it.each(mutReqSkills)("should learn if surpassed %s", (_: string, skill: Skill) => {
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
    char.traits.set(TraitEnum.Test, 1);
    char.traits.set(TraitEnum.Test2, 1);
    
    // Add prerequisite skill for skill prerequisite test
    if (skill.requirement.reqSkillId) {
      char.skills.set(SkillId.Basic, { id: SkillId.Basic, level: 1, exp: 0 });
    }

    const result = tryTolearnSkill(char, skill);
    expect(result.success).toBe(true);
  });
});