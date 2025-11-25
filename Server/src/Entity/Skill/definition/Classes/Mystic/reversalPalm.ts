import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MysticSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { MysticSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const reversalPalm = new MysticSkill({
  id: MysticSkillId.ReversalPalm,
  name: {
    en: "Reversal Palm",
    th: "ฝ่ามือพลิก",
  },
  description: {
    en: "After using, give self a buff 'Reverse Palm' for 1 turn: Reverse Palm: when attacked, roll a d20 willpower save, if passed, deal 1d6 blunt damage + dex mod * (1 + 0.1 * skill level) to the attacker and negate that attack, Then remove the buff, if fail, remove the buff and take damage normally.",
    th: "หลังจากใช้ จะได้รับบัฟ 'ฝ่ามือพลิก' เป็นเวลา 1 เทิร์น: เมื่อถูกโจมตี ให้ทอย d20 willpower save หากสำเร็จ จะสร้างความเสียหายทื่อ 1d6 + dex mod * (1 + 0.1 * เลเวลสกิล) ต่อผู้โจมตีและยกเลิกการโจมตีนั้น แล้วลบบัฟ หากล้มเหลว จะลบบัฟและรับความเสียหายตามปกติ",
  },
  requirement: {},
  equipmentNeeded: ["bareHand"],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [{ element: "neutral", min: 1, max: 1 }],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Apply Reversal Palm buff for 1 turn, store skill level in permValue
    buffsAndDebuffsRepository.reversalPalm.appender(
      actor,
      1,
      false,
      skillLevel,
    );

    return {
      content: {
        en: `${actor.name.en} assumes the Reversal Palm stance, ready to counter incoming attacks!`,
        th: `${actor.name.th} ใช้ท่าฝ่ามือพลิก พร้อมตอบโต้การโจมตีที่เข้ามา!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
      },
      targets: [],
    };
  },
});
