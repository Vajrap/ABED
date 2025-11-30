import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { GuardianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";
import { GuardianSkill } from "./index";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const taunt = new GuardianSkill({
  id: GuardianSkillId.Taunt,
  name: {
    en: "Taunt",
    th: "ยั่วยุ",
  },
  description: {
    text: {
      en: "Roar defiantly and draw all enemy attention to yourself.\nGain <BuffTaunt> for <FORMULA> turns",
      th: "คำรามท้าทายและดึงความสนใจของศัตรูทั้งหมดมาที่คุณ\nได้รับ <BuffTaunt> เป็นเวลา <FORMULA> เทิร์น",
    },
    formula: {
      en: "2 + floor(0.5 × skill level) + floor(<CHAmod> / 2)",
      th: "2 + floor(0.5 × เลเวลสกิล) + floor(<CHAmod> / 2)",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  notExistBuff: [BuffEnum.taunt],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "earth",
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
  ) => {
    // Calculate taunt duration: 1 + 0.5 per level + charisma mod/2, rounded down
    const charismaMod = statMod(actor.attribute.getTotal("charisma"));
    const charismaBonus = Math.floor(charismaMod / 2);
    const tauntDuration = 2 + Math.floor(0.5 * skillLevel) + charismaBonus;

    // Apply taunt buff to self
    buffsAndDebuffsRepository.taunt.appender(actor, { turnsAppending: tauntDuration });

    let turnResult: TurnResult = {
      content: {
        en: `${actor.name.en} taunted enemies for ${tauntDuration} turns!`,
        th: `${actor.name.th} ยั่วยุศัตรูเป็นเวลา ${tauntDuration} เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Taunt],
      },
      targets: [],
    };

    return turnResult;
  },
});
