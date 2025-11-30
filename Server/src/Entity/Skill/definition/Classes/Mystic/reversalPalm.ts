import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MysticSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { MysticSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const reversalPalm = new MysticSkill({
  id: MysticSkillId.ReversalPalm,
  name: {
    en: "Reversal Palm",
    th: "ฝ่ามือพลิก",
  },
  description: {
    text: {
      en: "Assume a defensive stance that redirects incoming attacks back at your foe.\nGain <BuffReversalPalm> for 1 turn.\nWhen attacked, [r]roll WILsave[/r]. If passed, deal <FORMULA> blunt damage to attacker and negate the attack.",
      th: "ใช้ท่าป้องกันที่สะท้อนการโจมตีที่เข้ามากลับไปที่ศัตรู\nได้รับ <BuffReversalPalm> 1 เทิร์น\nเมื่อถูกโจมตี ทอย [r]WILsave[/r] หากสำเร็จ สร้างความเสียหายทื่อ <FORMULA> ต่อผู้โจมตีและยกเลิกการโจมตี",
    },
    formula: {
      en: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <DEXmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply Reversal Palm buff for 1 turn, store skill level in universalCounter
    buffsAndDebuffsRepository.reversalPalm.appender(
      actor,
      {
        turnsAppending: 1,
        universalCounter: skillLevel,
      },
    );

    return {
      content: {
        en: `${actor.name.en} assumes the Reversal Palm stance, ready to counter incoming attacks!`,
        th: `${actor.name.th} ใช้ท่าฝ่ามือพลิก พร้อมตอบโต้การโจมตีที่เข้ามา!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});
