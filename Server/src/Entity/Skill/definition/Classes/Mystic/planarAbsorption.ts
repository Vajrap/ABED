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
    text: {
      en: "Channel planar energy into a protective barrier that absorbs magical harm.\nGain <FORMULA> stacks of <BuffPlanarAbsorption>.",
      th: "ควบคุมพลังงานแห่งระนาบเป็นกำแพงป้องกันที่ดูดซับอันตรายจากเวทมนตร์\nได้รับ <FORMULA> สแตคของ <BuffPlanarAbsorption>",
    },
    formula: {
      en: "(2d3 + <INTmod> + floor(<ControlMod> / 2)) × <SkillLevelMultiplier>",
      th: "(2d3 + <INTmod> + floor(<ControlMod> / 2)) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 3,
    sp: 0,
    elements: [
      { element: "water", value: 2 },
    ],
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
    const intMod = statMod(actor.attribute.getTotal("intelligence"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const diceRoll = roll(2).d(3).total;
    // Stacks = (2d3 + int mod) * levelScalar + control mod / 2
    const baseStacks = (diceRoll + intMod) * levelScalar;
    const controlBonus = Math.floor(controlMod / 2);
    const stacks = Math.floor(baseStacks) + controlBonus;

    buffsAndDebuffsRepository.planarAbsorption.appender(actor, { turnsAppending: stacks });

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

