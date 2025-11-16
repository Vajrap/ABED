import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { ActorEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const tauntSkill = new Skill({
  id: SkillId.Taunt,
  name: {
    en: "Taunt",
    th: "ยั่วยุ",
  },
  description: {
    en: "Provokes enemies. Grants taunt for 1 turns (+0.5 turns, rounded down, per level). When taunt, enemies will attack you and if attacked during taunt get +1 fire resource",
    th: "ยั่วยุศัตรู ได้รับสถานะยั่วยุ 1 เทิร์น (+0.5 เทิร์น ต่อเลเวลสกิล ปัดลง). เมื่ออยู่ในสถานะ taunt จะถูกศัตรูเล็งเป็นเป้าหมาย หากถูกโจมตีขณะที่มีสถานะ taunt จะได้รับ fire 1 หน่วย",
  },
  requirement: {},
  equipmentNeeded: [],
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
    // Calculate taunt duration: 2 + 0.5 per level, rounded down
    const tauntDuration = 1 + Math.floor(0.5 * skillLevel);

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
