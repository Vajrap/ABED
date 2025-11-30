import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { GuardianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { GuardianSkill } from ".";

export const herosPose = new GuardianSkill({
  id: GuardianSkillId.HerosPose,
  name: {
    en: "Hero's Pose",
    th: "ท่าเชิงฮีโร่",
  },
  description: {
    text: {
      en: "Strike a heroic pose, channeling your inner strength.\nRoll DC{5}'10 - skill level':'15 - skill level'{/}. On success, restore <FORMULA> HP.\nThe higher your skill, the easier it becomes to inspire yourself.",
      th: "ใช้ท่าเชิงฮีโร่ ปลุกพลังภายใน\nทอย DC{5}'10 - เลเวลสกิล':'15 - เลเวลสกิล'{/} หากสำเร็จ ฟื้นฟู <FORMULA> HP\nยิ่งเลเวลสกิลสูง ยิ่งง่ายต่อการปลุกแรงใจ",
    },
    formula: {
      en: "<VITmod> + skill level",
      th: "<VITmod> + เลเวลสกิล",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 2,
    elements: [{ element: "neutral", value: 1 }],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "earth",
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
    const DC = 15 - skillLevel;
    const roll = rollTwenty().total;
    const success = roll >= DC;

    if (success) {
      const healAmount = Math.floor(
        statMod(actor.attribute.getStat("vitality").total) + skillLevel,
      );
      actor.vitals.incHp(healAmount);

      return {
        content: {
          en: `${actor.name.en} struck a heroic pose and healed ${healAmount} HP!`,
          th: `${actor.name.th} ใช้ท่าเชิงฮีโร่และรักษา ${healAmount} HP!`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    } else {
      return {
        content: {
          en: `${actor.name.en} struck a heroic pose but nothing happened.`,
          th: `${actor.name.th} ใช้ท่าเชิงฮีโร่แต่ไม่มีอะไรเกิดขึ้น`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }
  },
});
