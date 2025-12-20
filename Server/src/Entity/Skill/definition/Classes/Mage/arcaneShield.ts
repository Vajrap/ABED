import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { statMod } from "src/Utils/statMod";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { MageSkill } from "./index";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const arcaneShield = new MageSkill({
  id: MageSkillId.ArcaneShield,
  name: {
    en: "Arcane Shield",
    th: "โล่เวทมนตร์",
  },
  description: {
    text: {
      en: "Shield yourself with arcane energy. Gain Arcane Shield buff for 1 turn. When attacked, roll <FORMULA>. If passed, negate that attack and gain 1 Arcane Charge stack.",
      th: "ป้องกันตัวเองด้วยพลังงานอาร์เคน ได้รับบัฟ Arcane Shield เป็นเวลา 1 เทิร์น เมื่อถูกโจมตี ทอย <FORMULA> หากผ่าน จะยกเลิกการโจมตีนั้นและได้รับ 1 สแต็ก Arcane Charge",
    },
    formula: {
      en: "d20 + <PlanarMod> END save vs attacker's hit roll",
      th: "d20 + <PlanarMod> END save เทียบกับ hit roll ของผู้โจมตี",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  notExistBuff: [BuffEnum.arcaneShield],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
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
        element: "neutral",
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
    const planarMod = statMod(actor.attribute.getTotal("planar"));

    // Gain Arcane Shield buff for 1 turn, store planar mod in counter for save calculation
    buffsAndDebuffsRepository.arcaneShield.appender(
      actor,
      {
        turnsAppending: 1,
        universalCounter: planarMod, // Store planar mod for save calculation
      },
    );

    let turnResult: TurnResult = {
      content: {
        en: `${actor.name.en} cast Arcane Shield on themselves!`,
        th: `${actor.name.th} ใช้โล่เวทมนตร์กับตัวเอง!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Focus],
      },
      targets: [],
    };

    return turnResult;
  },
});
