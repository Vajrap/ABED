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
    en: "Raise your shield and prepare for incoming attacks. Adds a defense up buff to self for 3 turns, at level 5 the buff lasts 4 turns. \n Defense up: pDEF and mDEF goes up by 2 effect don't stack.",
    th: "ยกโล่ขึ้นและเตรียมรับการโจมตี เพิ่มบัฟป้องกัน (เพิ่มพลังป้องกัน) ตัวเอง 1 เทิร์น เมื่อเลเวล 5 จะรักษาได้ 2 เทิร์น บัฟไม่ซ้อนทับ",
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
    // TODO: Implement defense buff logic when defenseUp buff is added
    buffsAndDebuffsRepository.defenseUp.appender(
      actor,
      skillLevel >= 5 ? 4 : 3,
      false,
      0,
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
