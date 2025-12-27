import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellbladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { SpellbladeSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const chargeSurge = new SpellbladeSkill({
  id: SpellbladeSkillId.ChargeSurge,
  name: {
    en: "Charge Surge",
    th: "ระเบิดประจุ",
  },
  description: {
    text: {
      en: "Surge with edge charges, building up power through accumulated energy.\nGain {5}'2':'1'{/} <BuffEdgeCharge>.\nAlso gain <BuffChargeSurge> for 3 turns, each turn gain +1 <BuffEdgeCharge>.",
      th: "ระเบิดด้วย edge charge สร้างพลังผ่านพลังงานที่สะสม\nได้รับ {5}'2':'1'{/} <BuffEdgeCharge>\nนอกจากนี้ยังได้รับ <BuffChargeSurge> เป็นเวลา 3 เทิร์น แต่ละเทิร์นได้รับ +1 <BuffEdgeCharge>",
    },
  },
  requirement: {},
  notExistBuff: [BuffEnum.chargeSurge],
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 3,
    elements: [
        { element: "neutral", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "fire", min: 1, max: 1 },
    ],
  },
  cooldown: 3,
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Gain Edge Charge immediately
    const immediateCharges = skillLevel >= 5 ? 2 : 1;
    buffsAndDebuffsRepository.edgeCharge.appender(actor, { turnsAppending: immediateCharges });

    // Gain ChargeSurge buff for 3 turns (each turn gains +1 Edge Charge)
    buffsAndDebuffsRepository.chargeSurge.appender(actor, { turnsAppending: 3 });

    return {
      content: {
        en: `${actor.name.en} surges with power! Gains ${immediateCharges} Edge Charge(s) and Charge Surge for 3 turns!`,
        th: `${actor.name.th} ระเบิดด้วยพลัง! ได้รับ Edge Charge ${immediateCharges} หน่วยและ Charge Surge เป็นเวลา 3 เทิร์น!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});

