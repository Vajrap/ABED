import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WitchSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { WitchSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const bewitch = new WitchSkill({
  id: WitchSkillId.Bewitch,
  name: {
    en: "Bewitch",
    th: "สะกดจิต",
  },
  description: {
    text: {
      en: "Weave a subtle charm that clouds your enemy's judgment and makes them see you as an ally.\nTarget must [r]roll DC10 + <ControlMod> WILsave[/r].\nIf failed, target gets <BuffCharm> for {5}'2':'1'{/} turn.",
      th: "ถักทอเสน่ห์ที่ทำให้จิตใจของศัตรูมืดมัวและทำให้พวกเขาเห็นคุณเป็นพันธมิตร\nเป้าหมายต้องทอย [r]WILsave DC10 + <ControlMod>[/r]\nหากล้มเหลว เป้าหมายได้รับ <BuffCharm> {5}'2':'1'{/} เทิร์น",
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to use Bewitch but has no target`,
          th: `${actor.name.th} พยายามใช้สะกดจิตแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const controlMod = statMod(actor.attribute.getTotal("control"));
    
    // Check for bewitch effect (DC10 + control mod willpower save)
    const willpowerDC = 10 + controlMod;
    const willpowerSave = target.rollSave("willpower");
    
    const targetEffects: { actorId: string; effect: TargetEffect[] }[] = [];
    let bewitchMessage = "";

    if (willpowerSave < willpowerDC) {
      // Save failed: apply charm buff to target
      const charmDuration = skillLevel >= 5 ? 2 : 1;
      buffsAndDebuffsRepository.charm.appender(target, { turnsAppending: charmDuration });
      bewitchMessage = ` ${target.name.en} is charmed!`;
      
      // At level 5, also apply hexed debuff
      if (skillLevel >= 5) {
        buffsAndDebuffsRepository.hexed.appender(target, { turnsAppending: 1 });
        bewitchMessage += ` ${target.name.en} is also hexed!`;
      }
      
      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    } else {
      bewitchMessage = ` ${target.name.en} resisted the bewitchment!`;
      targetEffects.push({
        actorId: target.id,
        effect: [TargetEffect.TestSkill],
      });
    }

    return {
      content: {
        en: `${actor.name.en} attempts to bewitch ${target.name.en}!${bewitchMessage}`,
        th: `${actor.name.th} พยายามสะกดจิต ${target.name.th}!${bewitchMessage}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

