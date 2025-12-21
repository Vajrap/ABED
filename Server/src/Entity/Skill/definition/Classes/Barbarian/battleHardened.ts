import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { BarbarianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BarbarianSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { statMod } from "src/Utils/statMod";

export const battleHardened = new BarbarianSkill({
  id: BarbarianSkillId.BattleHardened,
  name: {
    en: "Battle Hardened",
    th: "แข็งแกร่งจากสงคราม",
  },
  description: {
    text: {
      en: "Gain defensive resilience through battle experience.\nGain <BuffBattleHardened> buff for 3 turns: +2 pDEF.\nWhen attacked during <BuffBattleHardened>, Rage duration is extended by 1 turn.\n{5}Also heal for 1d4 + <ENDmod> HP.{/}\nCooldown: 3 turns.",
      th: "ได้รับความแข็งแกร่งในการป้องกันผ่านประสบการณ์การต่อสู้\nได้รับ <BuffBattleHardened> buff เป็นเวลา 3 เทิร์น: +2 pDEF\nเมื่อถูกโจมตีระหว่าง <BuffBattleHardened> ระยะเวลา Rage จะขยายออกไป 1 เทิร์น\n{5}ยังรักษา 1d4 + <ENDmod> HP ด้วย{/}\nคูลดาวน์: 3 เทิร์น",
    },
    formula: {
      en: "Battle Hardened buff for 3 turns",
      th: "Battle Hardened buff เป็นเวลา 3 เทิร์น",
    },
  },
  requirement: {},
  notExistBuff: [BuffEnum.battleHardened],
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  cooldown: 3,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      { element: "earth", value: 1 },
      { element: "neutral", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply Battle Hardened buff for 3 turns
    buffsAndDebuffsRepository.battleHardened.appender(actor, { turnsAppending: 3 });

    let message = `${actor.name.en} becomes battle hardened!`;
    let messageTh = `${actor.name.th} กลายเป็นแข็งแกร่งจากสงคราม!`;

    // Level 5 Bonus: Also heal for 1d4 + END mod HP
    if (skillLevel >= 5) {
      const endMod = statMod(actor.attribute.getTotal("endurance"));
      // Healing dice - should not get bless/curse
      const healAmount = actor.roll({ amount: 1, face: 4, stat: "endurance", applyBlessCurse: false }) + endMod;
      actor.vitals.incHp(healAmount);
      message += ` Healed for ${healAmount} HP!`;
      messageTh += ` รักษา ${healAmount} HP!`;
    }

    return {
      content: {
        en: message,
        th: messageTh,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

