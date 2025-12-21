import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ScholarSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { ScholarSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const mentalInterference = new ScholarSkill({
  id: ScholarSkillId.MentalInterference,
  name: {
    en: "Mental Interference",
    th: "รบกวนจิตใจ",
  },
  description: {
    text: {
      en: "Interfere with the target's mental processes.\nTarget must [r]roll DC10 + <INTmod> WILsave[/r] or gain <DebuffDazed> for {5}'2':'1'{/} turn.\nAdditionally, reduce target's AB gauge by 10.",
      th: "รบกวนกระบวนการทางจิตใจของเป้าหมาย\nเป้าหมายต้องทอย [r]WILsave DC10 + <INTmod>[/r] หรือได้รับ <DebuffDazed> {5}'2':'1'{/} เทิร์น\nนอกจากนี้ ยังลด AB gauge ของเป้าหมาย 10 หน่วย",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // MentalInterference: consumes 1 neutral element
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [
      {
        element: "neutral",
        value: 1,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "order",
        min: 1,
        max: 1,
      },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Mental Interference but has no target`,
          th: `${actor.name.th} พยายามรบกวนจิตใจแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const willpowerDC = 10 + intMod;
    const willpowerSave = target.rollSave("willpower");

    // AB Reduction: Additionally, reduce target's AB gauge by 10
    const initialGauge = target.abGauge;
    target.abGauge = Math.max(0, target.abGauge - 10);
    const reduced = initialGauge - target.abGauge;

    let dazedMessage = "";
    if (willpowerSave < willpowerDC) {
      // Save failed: Apply Dazed debuff for 1 turn (2 turns at level 5)
      const dazedDuration = skillLevel >= 5 ? 2 : 1;
      buffsAndDebuffsRepository.dazed.appender(target, { turnsAppending: dazedDuration });
      dazedMessage = ` ${target.name.en} is dazed!`;
    }

    return {
      content: {
        en: `${actor.name.en} interferes with ${target.name.en}'s mental processes! ${target.name.en}'s AB gauge reduced by ${reduced}.${dazedMessage}`,
        th: `${actor.name.th} รบกวนกระบวนการทางจิตใจของ ${target.name.th}! AB gauge ของ ${target.name.th} ลดลง ${reduced}${dazedMessage ? ` ${target.name.th} สับสน!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

