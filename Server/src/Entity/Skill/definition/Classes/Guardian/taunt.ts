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
    en: "Provokes enemies. Grants taunt for 2 turns (+0.5 turns, rounded down, per level) + charisma mod/2. When taunt, enemies will attack you and if attacked during taunt get +1 fire resource",
    th: "ยั่วยุศัตรู ได้รับสถานะยั่วยุ 2 เทิร์น (+0.5 เทิร์น ต่อเลเวลสกิล ปัดลง) + charisma mod/2. เมื่ออยู่ในสถานะ taunt จะถูกศัตรูเล็งเป็นเป้าหมาย หากถูกโจมตีขณะที่มีสถานะ taunt จะได้รับ fire 1 หน่วย",
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
    buffsAndDebuffsRepository.taunt.appender(actor, tauntDuration, false, 0);

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
