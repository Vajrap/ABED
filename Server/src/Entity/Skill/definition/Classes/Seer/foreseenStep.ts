import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getTarget } from "src/Entity/Battle/getTarget";
import { statMod } from "src/Utils/statMod";

export const foreseenStep = new SeerSkill({
  id: SeerSkillId.ForeseenStep,
  name: {
    en: "Foreseen Step",
    th: "ก้าวมองเห็นล่วงหน้า",
  },
  description: {
    text: {
      en: "Mark an ally with Foreseen buff for 1 turn. First attack or debuff that would hit the target must roll a LUK save vs DC8 + your LUK mod. If failed, the effect misses. Remove Foreseen after triggering.",
      th: "ทำเครื่องหมายพันธมิตรด้วย Foreseen เป็นเวลา 1 เทิร์น การโจมตีหรือการลดสถานะครั้งแรกที่จะโดนเป้าหมาย ต้องทอย LUK save เทียบกับ DC8 + LUK mod ของคุณ หากล้มเหลว ผลกระทบจะพลาด จะลบ Foreseen หลังจากการใช้",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
        { element: 'order', value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: 'wind', min: 1, max: 1 },
    ],
  },
  exec: (
    user: Character,
    userParty: Character[],
    _targetParty: Character[],
    _skillLevel: number,
    _location: LocationsEnum,
  ): TurnResult => {
    // Get an ally target
    const target = getTarget(user, userParty, _targetParty, "ally").one();

    if (!target) {
      return {
        content: {
          en: `${user.name.en} tried to mark an ally with Foreseen but has no ally to target`,
          th: `${user.name.th} พยายามทำเครื่องหมายพันธมิตรด้วย Foreseen แต่ไม่มีพันธมิตรให้กำหนดเป้าหมาย`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Get caster's LUK mod to store in the buff
    const casterLuckMod = statMod(user.attribute.getTotal("luck"));

    // Apply Foreseen buff for 1 turn, storing caster's LUK mod in counter
    buffsRepository[BuffEnum.foreseen].appender(target, {
      turnsAppending: 1,
      universalCounter: casterLuckMod,
    });

    return {
      content: {
        en: `${user.name.en} marks ${target.name.en} with Foreseen, protecting them from the next attack or debuff!`,
        th: `${user.name.th} ทำเครื่องหมาย ${target.name.th} ด้วย Foreseen ป้องกันพวกเขาจากการโจมตีหรือการลดสถานะครั้งถัดไป!`,
      },
      actor: {
        actorId: user.id,
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

