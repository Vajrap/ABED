import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { MageSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const stoneSkin = new MageSkill({
  id: MageSkillId.StoneSkin,
  name: { en: "Stone Skin", th: "ผิวหิน" },
  description: {
    text: {
      en: "Harden your skin with stone-like protection. Give self Stone Skin buff for 2 turns.",
      th: "ทำให้ผิวหนังแข็งเหมือนหิน ให้บัฟ Stone Skin กับตัวเอง 2 เทิร์น",
    },
    formula: {
      en: "Stone Skin: pDEF +2",
      th: "Stone Skin: pDEF +2",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 2, sp: 0, elements: [{ element: "earth", value: 1 }] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "order", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], _enemies: Character[], _skillLevel: number, _location) => {
    // Give self Stone Skin buff for 2 turns
    const stoneSkinResult = buffsAndDebuffsRepository.stoneSkin.appender(actor, { turnsAppending: 2 });

    const turnResult: TurnResult = {
      content: {
        en: stoneSkinResult.en,
        th: stoneSkinResult.th,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [],
    };
    return turnResult;
  },
});

