import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const tauntSkill = new Skill({
  id: SkillId.Taunt,
  name: {
    en: "Taunt",
    th: "ยั่วยุ",
  },
  description: {
    en: "Provokes enemies. Grants taunt for 2 turns (+0.5 turns, rounded down, per level).",
    th: "ยั่วยุศัตรู ได้รับสถานะยั่วยุ 2 เทิร์น (+0.5 เทิร์น ต่อเลเวลสกิล ปัดลง)",
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
        element: "fire",
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
    // Calculate taunt duration: 2 + 0.5 per level, rounded down
    const tauntDuration = 2 + Math.floor(0.5 * skillLevel);

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
