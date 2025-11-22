import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MonkSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { roll } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { MonkSkill } from "./index";

export const meditation = new MonkSkill({
  id: MonkSkillId.Meditation,
  name: {
    en: "Meditation",
    th: "สมาธิ",
  },
  description: {
    en: "Restore 1d4 + skillLevel + control mod/2 to HP or MP or SP, whichever is lowest (in percent).",
    th: "ฟื้นฟู 1d4 + skillLevel + control mod/2 ให้กับ HP หรือ MP หรือ SP ตามค่าที่ต่ำที่สุด (เป็นเปอร์เซ็นต์)",
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
        element: "order",
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
  ): TurnResult => {
    // Calculate percentage for each resource
    const hpPercent = actor.vitals.hp.current / actor.vitals.hp.max;
    const mpPercent = actor.vitals.mp.current / actor.vitals.mp.max;
    const spPercent = actor.vitals.sp.current / actor.vitals.sp.max;

    // Find which is lowest
    let lowestResource: "hp" | "mp" | "sp" = "hp";
    let lowestPercent = hpPercent;
    
    if (mpPercent < lowestPercent) {
      lowestPercent = mpPercent;
      lowestResource = "mp";
    }
    if (spPercent < lowestPercent) {
      lowestPercent = spPercent;
      lowestResource = "sp";
    }

    // Restore 1d4 + skillLevel + control mod/2 to the lowest resource (in percent)
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const controlBonus = Math.floor(controlMod / 2);
    const restorePercent = (roll(1).d(4).total + skillLevel + controlBonus) / 100;
    
    let restoredAmount = 0;
    let resourceName = "";
    
    if (lowestResource === "hp") {
      const maxRestore = Math.floor(actor.vitals.hp.max * restorePercent);
      const before = actor.vitals.hp.current;
      actor.vitals.incHp(maxRestore);
      restoredAmount = actor.vitals.hp.current - before;
      resourceName = "HP";
    } else if (lowestResource === "mp") {
      const maxRestore = Math.floor(actor.vitals.mp.max * restorePercent);
      const before = actor.vitals.mp.current;
      actor.vitals.incMp(maxRestore);
      restoredAmount = actor.vitals.mp.current - before;
      resourceName = "MP";
    } else {
      const maxRestore = Math.floor(actor.vitals.sp.max * restorePercent);
      const before = actor.vitals.sp.current;
      actor.vitals.incSp(maxRestore);
      restoredAmount = actor.vitals.sp.current - before;
      resourceName = "SP";
    }

    return {
      content: {
        en: `${actor.name.en} meditates and restores ${restoredAmount} ${resourceName}!`,
        th: `${actor.name.th} นั่งสมาธิและฟื้นฟู ${restoredAmount} ${resourceName}!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Focus],
      },
      targets: [
        {
          actorId: actor.id,
          effect: [TargetEffect.TestSkill],
        },
      ],
    };
  },
});

