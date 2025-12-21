import type { Character } from "src/Entity/Character/Character";
import { GuardianSkill } from "./index";
import { GuardianSkillId } from "../../../enums";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const fortressStance = new GuardianSkill({
  id: GuardianSkillId.FortressStance,
  name: {
    en: "Fortress Stance",
    th: "ท่าป้อมปราการ",
  },
  description: {
    text: {
      en: "Enter an unbreakable fortress stance.\nGain <BuffFortressStance> for {5}4:3{/} turns.\nDuring Fortress Stance, your turn is SKIPPED, but health is restored every turn for 1d6 + <VITmod> HP.",
      th: "เข้าท่าป้อมปราการที่แข็งแกร่ง\nได้รับ <BuffFortressStance> เป็นเวลา {5}4:3{/} เทิร์น\nระหว่าง Fortress Stance เทิร์นของคุณจะถูกข้าม แต่จะฟื้นฟู HP ทุกเทิร์น 1d6 + <VITmod> HP",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  notExistBuff: [BuffEnum.fortressStance],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 4,
    elements: [
      {
        element: "earth",
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
        element: "neutral",
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
    _location: LocationsEnum,
  ): TurnResult => {
    const duration = skillLevel >= 5 ? 4 : 3;

    buffsRepository.fortressStance.appender(actor, { turnsAppending: duration });

    return {
      content: {
        en: `${actor.name.en} enters Fortress Stance for ${duration} turns! Turn will be skipped but health will be restored each turn.`,
        th: `${actor.name.th} เข้าท่าป้อมปราการเป็นเวลา ${duration} เทิร์น! เทิร์นจะถูกข้ามแต่จะฟื้นฟู HP ทุกเทิร์น`,
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

