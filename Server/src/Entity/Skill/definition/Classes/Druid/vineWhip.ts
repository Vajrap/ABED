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
    en: "Deal 1d6 + (willpower mod) * (1 + 0.1 * skill level) nature damage. Target must roll DC7 + control mod endurance save or get entangled for 1 turn. Entangled: when taking turns, must roll DC10 strength save or skip the turn.",
    th: "สร้างความเสียหายธรรมชาติ 1d6 + (willpower mod) * (1 + 0.1 * skill level) เป้าหมายต้องทอย endurance save DC7 + control mod หรือถูกพันกัน 1 เทิร์น เมื่อถูกพันกัน ต้องทอย strength save DC10 หรือข้ามเทิร์น",
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
        buffsAndDebuffsRepository.entangled.appender(target, 1, false, 0);
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

