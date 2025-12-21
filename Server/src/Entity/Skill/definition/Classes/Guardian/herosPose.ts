import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { GuardianSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { GuardianSkill } from ".";
import { basicAttack } from "../../basicAttack";

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
    // Check if HP is full - if so, do basic attack instead
    const isHpFull = actor.vitals.hp.current >= actor.vitals.hp.max;
    
    if (isHpFull) {
      // Do basic attack when HP is full
      return basicAttack.exec(actor, actorParty, targetParty, skillLevel, location);
    }

    // Calculate DC: DC(15 - skill level) normally, DC(10 - skill level) at level 5
    const DC = skillLevel >= 5 ? 10 - skillLevel : 15 - skillLevel;
    // Skill check - uses vitality for channeling inner strength, should get bless/curse
    const roll = actor.rollTwenty({stat: 'vitality'});
    const success = roll >= DC;

    if (success) {
      const vitMod = statMod(actor.attribute.getStat("vitality").total);
      const healAmount = vitMod + skillLevel;
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
      // On fail, do basic attack
      return basicAttack.exec(actor, actorParty, targetParty, skillLevel, location);
    }
  },
});
