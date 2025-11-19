import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarriorSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { WarriorSkill } from ".";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const warCry = new WarriorSkill({
  id: WarriorSkillId.WarCry,
  name: {
    en: "War Cry",
    th: "เสียงร้องศึก",
  },
  description: {
    en: "Battle shout that boosts self or team morale. Increases agility and strength by +2 for 2 turns (3 turns at level 5).",
    th: "เสียงร้องศึกที่เพิ่มขวัญกำลังใจให้ตัวเองหรือทีม เพิ่ม agility และ strength +2 เป็นเวลา 2 เทิร์น (3 เทิร์นที่เลเวล 5)",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
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
    elements: [],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply War Cry buff to self
    const duration = skillLevel >= 5 ? 3 : 2;
    buffsAndDebuffsRepository.warCry.appender(actor, duration, false, 0);

    return {
      content: {
        en: `${actor.name.en} lets out a mighty War Cry! +2 agility, +2 strength for ${duration} turn(s)!`,
        th: `${actor.name.th} เปล่งเสียงร้องศึก! +2 agility, +2 strength เป็นเวลา ${duration} เทิร์น!`,
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

