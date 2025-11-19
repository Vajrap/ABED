import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MysticSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { roll } from "src/Utils/Dice";
import { MysticSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { skillLevelMultiplier } from "src/Utils/skillScaling";

export const planarAbsorption = new MysticSkill({
  id: MysticSkillId.PlanarAbsorption,
  name: {
    en: "Planar Absorption",
    th: "ดูดซับพลัง",
  },
  description: {
    en: "Gain 'Planar Absorption' buff for 2d3 stacks + intelligence mod + 0.01 times per skill level. If attacked by a magic spell, absorb damage up to the stacks of planar absorption buff. Every 4 damage of each type that is absorbed turned into 1 resource of that element type.",
    th: "ได้รับบัฟ 'ดูดซับพลัง' 2d3 หน่วย + intelligence mod + 0.01 ต่อเลเวลสกิล หากถูกโจมตีด้วยเวทมนตร์ จะดูดซับความเสียหายตามจำนวนหน่วยที่เหลือ ทุก 4 ความเสียหายที่ดูดซับจะกลายเป็นทรัพยากรธาตุ 1 หน่วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 6,
    sp: 0,
    elements: [
      { element: "neutral", value: 2 },
    ],
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
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const diceRoll = roll(2).d(3).total;
    const stacks = (diceRoll + intMod) * levelScalar ;

    buffsAndDebuffsRepository.planarAbsorption.appender(actor, stacks, false, 0);

    return {
      content: {
        en: `${actor.name.en} channels planar energy, gaining ${stacks} stacks of Planar Absorption!`,
        th: `${actor.name.th} ควบคุมพลังแห่งระนาบ ได้รับ ${stacks} หน่วยของดูดซับพลัง!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [],
    };
  },
});

