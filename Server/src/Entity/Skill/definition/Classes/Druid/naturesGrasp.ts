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
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { DruidSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const naturesGrasp = new DruidSkill({
  id: DruidSkillId.NaturesGrasp,
  name: {
    en: "Nature's Grasp",
    th: "มือแห่งธรรมชาติ",
  },
  description: {
    text: {
      en: "Grasp a target with nature's powerful vines.\nDeal <FORMULA> nature damage.\nTarget must [r]roll DC10 + <WILmod> ENDsave[/r] or become <DebuffEntangled> for {5}'3':'2'{/} turns.\nIf target is already Entangled, deal +50% damage.",
      th: "จับเป้าหมายด้วยเถาวัลย์แห่งธรรมชาติที่แข็งแกร่ง\nสร้างความเสียหายธรรมชาติ <FORMULA>\nเป้าหมายต้องทอย [r]ENDsave DC10 + <WILmod>[/r] หรือถูก <DebuffEntangled> {5}'3':'2'{/} เทิร์น\nหากเป้าหมายถูก Entangled อยู่แล้ว ความเสียหายเพิ่มขึ้น +50%",
    },
    formula: {
      en: "(1d8 + <WILmod>) × <SkillLevelMultiplier>",
      th: "(1d8 + <WILmod>) × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  isFallback: false, // Nature's Grasp: consumes 1 earth and 1 water elements
  consume: {
    hp: 0,
    mp: 4,
    sp: 0,
    elements: [
      {
        element: "earth",
        value: 1,
      },
      {
        element: "water",
        value: 1,
      },
    ],
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
          en: `${actor.name.en} tried to use Nature's Grasp but has no target`,
          th: `${actor.name.th} พยายามใช้มือแห่งธรรมชาติแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const willMod = statMod(actor.attribute.getTotal("willpower"));
    const levelScalar = skillLevelMultiplier(skillLevel);
    // Damage dice - should not get bless/curse
    let baseDamage = actor.roll({ amount: 1, face: 8, stat: "willpower", applyBlessCurse: false }) + willMod;
    
    // Check if target is already Entangled for +50% damage bonus
    const isEntangled = target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.entangled);
    if (isEntangled) {
      baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    const totalDamage = Math.floor(baseDamage * levelScalar);

    // Nature magic uses CONTROL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'control'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.nature,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
    let entangledMessage = "";

    // Check for entanglement application (DC10 + WIL mod endurance save)
    if (damageResult.isHit) {
      const entanglementDC = 10 + willMod;
      const saveRoll = target.rollSave("endurance");
      if (saveRoll < entanglementDC) {
        const duration = skillLevel >= 5 ? 3 : 2;
        buffsAndDebuffsRepository.entangled.appender(target, { turnsAppending: duration });
        entangledMessage = ` ${target.name.en} is entangled!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Nature's Grasp", th: "มือแห่งธรรมชาติ" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${entangledMessage}${isEntangled ? " (Bonus damage from Entangled!)" : ""}`,
        th: `${message.th}${entangledMessage ? ` ${target.name.th} ถูกพันกัน!` : ""}${isEntangled ? " (ความเสียหายโบนัสจากการ Entangled!)" : ""}`,
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

