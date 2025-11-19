import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MageSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect } from "../../../effects";
import { statMod } from "src/Utils/statMod";
import { roll } from "src/Utils/Dice";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { MageSkill } from "./index";

export const arcaneShield = new MageSkill({
  id: MageSkillId.ArcaneShield,
  name: {
    en: "Arcane Shield",
    th: "โล่เวทมนตร์",
  },
  description: {
    en: "Creates a protective magical barrier around yourself for (1d3 + planar mod/2 + 0.5 per skill level) stacks. Each arcane shield stack can mitigate 1 point of incoming damage. At level 5 the stacks increase by 1d3.",
    th: "สร้างโล่ป้องกันเวทมนตร์รอบตัวเอง (1d3 + planar mod/2 + 0.5 ต่อเลเวลสกิล) หน่วย แต่ละหน่วยสามารถลดความเสียหายที่ได้รับลง 1 หน่วย. เมื่อเลเวลสกิลถึง 5 จะได้รับโล่ห์เวทย์มนต์เพิ่มอีก 1d3 หน่วย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      {
        element: "neutral",
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
        element: "chaos",
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
    const planarMod = statMod(actor.attribute.getTotal("planar"));

    // Calculate shield duration: 1d3 + planar mod/2 + 0.5 per skill level
    const diceRoll = roll(1).d(3).total;
    const planarBonus = Math.floor(planarMod / 2);
    const skillLevelBonus = Math.floor(0.5 * skillLevel);
    const shiftedBonus = skillLevel >= 5 ? roll(1).d(3).total : 0;

    // TODO: Implement arcaneShield buff/debuff
    buffsAndDebuffsRepository.arcaneShield.appender(
      actor,
      diceRoll + planarBonus + skillLevelBonus + shiftedBonus,
      false,
      0,
    );

    let turnResult: TurnResult = {
      content: {
        en: `${actor.name.en} cast Arcane Shield on themselves! got ${diceRoll + planarBonus + skillLevelBonus + shiftedBonus} stack of arcane shield`,
        th: `${actor.name.th} ใช้โล่เวทมนตร์กับตัวเอง! ได้รับโล่ห์เวทย์มนต์ ${diceRoll + planarBonus + skillLevelBonus + shiftedBonus} หน่วย`,
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
