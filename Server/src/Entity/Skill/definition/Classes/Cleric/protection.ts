import { ClericSkillId } from "src/Entity/Skill/enums";
import { ClericSkill } from ".";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { ActorEffect, TargetEffect } from "src/Entity/Skill/effects";
import { getTarget } from "src/Entity/Battle/getTarget";

export const protection = new ClericSkill({
  id: ClericSkillId.Protection,
  name: {
    en: "Protection",
    th: "ปกป้อง",
  },
  description: {
    text: {
      en: "Grant a random front line ally <BuffDefenseUp> for {5}'3':'2'{/} turns.",
      th: "ให้พันธมิตรในแถวหน้าสุ่มได้รับ <BuffDefenseUp> เป็นเวลา {5}'3':'2'{/} เทิร์น",
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
      { element: "order", value: 1 },
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
    _targetParty: Character[],
    skillLevel: number,
    _location: LocationsEnum,
  ) => {
    // Get a random front line ally (position <= 2)
    const target = getTarget(actor, actorParty, _targetParty, "ally")
      .from("frontOnly")
      .one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to cast Protection but has no front line ally to protect`,
          th: `${actor.name.th} พยายามใช้ปกป้องแต่ไม่มีพันธมิตรในแถวหน้าให้ปกป้อง`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Grant DefenseUp buff for 2 turns (3 at level 5)
    const duration = skillLevel >= 5 ? 3 : 2;
    buffsRepository[BuffEnum.defenseUp].appender(target, { turnsAppending: duration });

    return {
      content: {
        en: `${actor.name.en} granted Protection to ${target.name.en} for ${duration} turns.`,
        th: `${actor.name.th} ให้การปกป้องแก่ ${target.name.th} เป็นเวลา ${duration} เทิร์น`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

