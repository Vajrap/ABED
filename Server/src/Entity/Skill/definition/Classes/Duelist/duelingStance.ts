import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DuelistSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { DuelistSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const duelingStance = new DuelistSkill({
  id: DuelistSkillId.DuelingStance,
  name: {
    en: "Dueling Stance",
    th: "ท่าดวล",
  },
  description: {
    en: "Adopt a focused dueling stance, enhancing your precision. Gain Dueling Stance buff for 2 turns (3 at level 5). While active: +control mod/2 to hit rolls, +agility mod/2 to dodge. At level 5, also gain +2 crit.",
    th: "ใช้ท่าดวลที่มุ่งเน้น เพิ่มความแม่นยำ ได้รับบัฟ Dueling Stance 2 เทิร์น (3 เทิร์นที่เลเวล 5) ขณะที่ใช้งาน: +control mod/2 ต่อ hit rolls, +agility mod/2 ต่อ dodge ที่เลเวล 5 จะได้รับ +2 crit ด้วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [
      {
        element: "neutral",
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
        element: "wind",
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
  ): TurnResult => {
    // Apply Dueling Stance buff for 2 turns (3 at level 5)
    const duration = skillLevel >= 5 ? 3 : 2;
    // Store level 5 indicator in permValue (1 = level 5+, 0 = not level 5)
    const permValue = skillLevel >= 5 ? 1 : 0;
    buffsAndDebuffsRepository.duelingStance.appender(actor, duration, false, permValue);

    const level5Bonus = skillLevel >= 5 ? " Gains +2 crit!" : "";

    return {
      content: {
        en: `${actor.name.en} adopts a focused dueling stance!${level5Bonus}`,
        th: `${actor.name.th} ใช้ท่าดวลที่มุ่งเน้น!${skillLevel >= 5 ? " ได้รับ +2 crit!" : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});

