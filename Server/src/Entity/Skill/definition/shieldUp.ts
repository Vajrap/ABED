import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const shieldUp = new Skill({
  id: SkillId.ShieldUp,
  name: {
    en: "Shield Up",
    th: "ยกโล่ขึ้น",
  },
  description: {
    en: "Raise your shield and prepare for incoming attacks. Consumes 2 Earth and produces 1 None. Adds a defense buff (to be implemented).",
    th: "ยกโล่ขึ้นและเตรียมรับการโจมตี ใช้ 2 Earth ได้ 1 None เพิ่มบัฟป้องกัน (รอการพัฒนาต่อ)",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
      {
        element: "earth",
        value: 2,
      },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "none",
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
    // TODO: Implement defense buff logic when defenseUp buff is added
    buffsAndDebuffsRepository.defenseUp.appender(actor, 1, false, 0);

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
