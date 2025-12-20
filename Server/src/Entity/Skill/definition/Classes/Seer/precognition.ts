import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { statMod } from "src/Utils/statMod";

export const precognition = new SeerSkill({
  id: SeerSkillId.Precognition,
  name: {
    en: "Precognition",
    th: "คาดการณ์",
  },
  description: {
    text: {
      en: "See the future, gain Precognition buff for 1 turn. Next attacker that targets you must roll their LUK save vs DC10 + your LUK mod + (skill level - 1) or it will miss.{5} If the attacker misses, you gain 1 order.{7} When used, roll a d20 + LUK mod. If passed (DC10), gain 1 more turn of Precognition buff.",
      th: "คาดการณ์อนาคต, ได้รับพระการันตี Precognition ของ 1 รอบ: การคาดการณ์: ศัตรูต� procon",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
        {element: 'order', value: 1},
        {element: 'wind', value: 1},
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
        {element: 'water', min: 1, max: 1},
    ],
  },
  exec: (user: Character, userParty: Character[], targetParty: Character[], skillLevel: number, location: LocationsEnum): TurnResult => {
    let turns = 1;
    
    // At level 7: roll d20 + LUK mod, if passed (DC10), gain 1 more turn
    if (skillLevel >= 7) {
      const luckMod = statMod(user.attribute.getTotal("luck"));
      const roll = user.rollTwenty({}) + luckMod;
      if (roll > 10) {
        turns = 2;
      }
    }
    
    // Store skill level in counter, and flag for level 5 upgrade (gain order on miss)
    // We'll calculate LUK mod in damageResolution when needed
    buffsAndDebuffsRepository.precognition.appender(user, { 
      turnsAppending: turns, 
      universalCounter: skillLevel, // Store skill level
    });
    
    return {
      content: {
        en: `${user.name.en} sees into the future, gaining Precognition for ${turns} turn(s)!`,
        th: `${user.name.th} มองเห็นอนาคต ได้รับการคาดการณ์ ${turns} เทิร์น!`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: user.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});