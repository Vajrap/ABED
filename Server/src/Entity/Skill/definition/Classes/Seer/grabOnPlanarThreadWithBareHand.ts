import type { Character } from "src/Entity/Character/Character";
import { SeerSkill } from ".";
import { SeerSkillId } from "../../../enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const grabOnPlanarThreadWithBareHand = new SeerSkill({
  id: SeerSkillId.GrabOnPlanarThreadWithBareHand,
  name: {
    en: "Grab On Planar Thread With Bare Hand",
    th: "คว้าสายใยพลังระนาบด้วยมือเปล่า",
  },
  description: {
    text: {
      en: "Grab onto the planar thread with bare hands, risking misfortune. Roll DC 15 - skill level LUK save. On fail, gain 2 stacks of BadLuck. On success, roll 3d3 (each die represents order, water, and wind). Gain resource equal to (roll - 1) for each (0-2). Gain PlanarGrab buff.",
      th: "คว้าสายใยพลังระนาบด้วยมือเปล่า เสี่ยงโชคร้าย ทอย DC 15 - ระดับทักษะ LUK save หากล้มเหลว ได้รับ 2 สแต็ก BadLuck หากสำเร็จ ทอย 3d3 (แต่ละลูกแทน order, water, และ wind) ได้รับทรัพยากรเท่ากับ (ทอย - 1) สำหรับแต่ละตัว (0-2) ได้รับบัฟ PlanarGrab",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "wind", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
  },
  exec: (
    user: Character,
    userParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ): TurnResult => {
    // Roll LUK save: DC 15 - skill level
    const dc = 15 - skillLevel;
    const saveRoll = user.rollSave("luck");
    const success = saveRoll >= dc;

    if (!success) {
      // On fail: Gain 2 stacks of BadLuck
      buffsAndDebuffsRepository.badLuck.appender(user, { turnsAppending: 2 });

      return {
        content: {
          en: `${user.name.en} tried to grab the planar thread but failed! Gained 2 BadLuck stacks!`,
          th: `${user.name.th} พยายามคว้าสายใยพลังระนาบแต่ล้มเหลว! ได้รับ 2 สแต็ก BadLuck!`,
        },
        actor: {
          actorId: user.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: user.id,
            effect: [TargetEffect.TestSkill],
          },
        ],
      };
    }

    // On success: Roll 3d3, each die represents order, water, and wind
    // Gain resource equal to (roll - 1) for each (0-2)
    const orderRoll = user.roll({ amount: 1, face: 3, applyBlessCurse: false });
    const waterRoll = user.roll({ amount: 1, face: 3, applyBlessCurse: false });
    const windRoll = user.roll({ amount: 1, face: 3, applyBlessCurse: false });

    const orderGain = Math.max(0, orderRoll - 1);
    const waterGain = Math.max(0, waterRoll - 1);
    const windGain = Math.max(0, windRoll - 1);

    // Add resources
    user.resources.order = (user.resources.order || 0) + orderGain;
    user.resources.water = (user.resources.water || 0) + waterGain;
    user.resources.wind = (user.resources.wind || 0) + windGain;

    // Gain PlanarGrab buff
    buffsAndDebuffsRepository.planarGrab.appender(user, { turnsAppending: 1 });

    const resourcesGained: string[] = [];
    if (orderGain > 0) resourcesGained.push(`${orderGain} order`);
    if (waterGain > 0) resourcesGained.push(`${waterGain} water`);
    if (windGain > 0) resourcesGained.push(`${windGain} wind`);

    if (resourcesGained.length === 0) {
      resourcesGained.push("1 neutral");
    }

    const resourcesText = ` and gained ${resourcesGained.join(", ")}!`;

    return {
      content: {
        en: `${user.name.en} successfully grabbed the planar thread${resourcesText} Gained PlanarGrab buff!`,
        th: `${user.name.th} คว้าสายใยพลังระนาบสำเร็จ${resourcesText.length > 0 ? ` และได้รับ ${resourcesGained.join(", ")}` : ""}! ได้รับบัฟ PlanarGrab!`,
      },
      actor: {
        actorId: user.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: user.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

