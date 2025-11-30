import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { GuardianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { GuardianSkill } from ".";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const shieldUp = new GuardianSkill({
  id: GuardianSkillId.ShieldUp,
  name: {
    en: "Shield Up",
    th: "ยกโล่ขึ้น",
  },
  description: {
    text: {
      en: "Raise your shield high, forming an impenetrable barrier.\nGain <BuffDefenseUp> for {5}'4':'3'{/} turns",
      th: "ยกโล่ขึ้นสูง สร้างกำแพงป้องกันที่แข็งแกร่ง\nได้รับ <BuffDefenseUp> เป็นเวลา {5}'4':'3'{/} เทิร์น",
    },
  },
  requirement: {},
  equipmentNeeded: ["shield"],
  notExistBuff: [BuffEnum.defenseUp],
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
        element: "neutral",
        min: 0,
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
    buffsAndDebuffsRepository.defenseUp.appender(
      actor,
      {
        turnsAppending: skillLevel >= 5 ? 4 : 3,
      },
    );

    return {
      content: {
        en: `${actor.name.en} raised their shield!`,
        th: `${actor.name.th} ยกโล่ขึ้น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});
