import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { DruidSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const vineWhip = new DruidSkill({
  id: DruidSkillId.VineWhip,
  name: {
    en: "Vine Whip",
    th: "เถาวัลย์",
  },
  description: {
    text: {
      en: "Lashed a magical vine whip at an enemy.\nDeal <FORMULA> nature damage. \nTarget must [r]roll DC7 + <ControlMod> endurance save[/r] or get <DebuffEntangled> for 1 turn.",
      th: "ฟาดเป้าหมายด้วยเถาวัลย์เวทย์มนต์\nสร้างความเสียหายธรรมชาติ <FORMULA> \nเป้าหมายต้องทอย endurance save [r]DC7 + <ControlMod>[/r] หรือถูก <DebuffEntangled> 1 เทิร์น",
    },
    formula: {
      en: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d6 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0,
    mp: 2,
    sp: 0,
    elements: [],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
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
          en: `${actor.name.en} tried to use Vine Whip but has no target`,
          th: `${actor.name.th} พยายามใช้เถาวัลย์แต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    const baseDamage = roll(1).d(6).total + willMod;
    const totalDamage = Math.floor(baseDamage * levelScalar);

    const damageOutput = {
      damage: totalDamage,
      hit: rollTwenty().total + controlMod,
      crit: rollTwenty().total + statMod(actor.attribute.getTotal("luck")),
      type: DamageType.nature,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    let entangledMessage = "";

    // Check for entanglement application (DC7 + control mod endurance save)
    if (damageResult.isHit) {
      const entanglementDC = 7 + controlMod;
      const saveRoll = target.rollSave("endurance");
      if (saveRoll < entanglementDC) {
        buffsAndDebuffsRepository.entangled.appender(target, { turnsAppending: 1 });
        entangledMessage = ` ${target.name.en} is entangled!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Vine Whip", th: "เถาวัลย์" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${entangledMessage}`,
        th: `${message.th}${entangledMessage ? ` ${target.name.th} ถูกพันกัน!` : ""}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.TestSkill],
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

