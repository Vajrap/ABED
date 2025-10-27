import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";

export const herosPose = new Skill({
  id: SkillId.HerosPose,
  name: {
    en: "Hero's Pose",
    th: "ท่าเชิงฮีโร่",
  },
  description: {
    en: "Stand proud like a hero in a battle field. Has small chance (raised by skill level) to heal a small amount of HP.",
    th: "ยืนอย่างมั่นใจ เป็นฮีโร่ในสนามรบ มีโอกาสน้อยเล็กน้อย (ยิ่งเลเวลสกิลสูงขึ้น มีโอกาสยิ่งสูง) ในการรักษา HP เล็กน้อย",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
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
