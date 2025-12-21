import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WarlockSkillId } from "../../../enums";
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
import { WarlockSkill } from "./index";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const corruption = new WarlockSkill({
  id: WarlockSkillId.Corruption,
  name: {
    en: "Corruption",
    th: "การเสื่อมสลาย",
  },
  description: {
    text: {
      en: "Channel dark energy to corrupt your enemy's very essence.\nDeal <FORMULA> dark damage immediately.\nTarget must [r]roll DC10 + <ControlMod> ENDsave[/r] or get <DebuffCursed> for 3 turns and <DebuffHexed> for 2 turns.\n{5}\nAlso applies [r]2 stacks of <DebuffBurn>[/r].{/}",
      th: "ควบคุมพลังงานมืดเพื่อทำให้แก่นแท้ของศัตรูเสื่อมสลาย\nสร้างความเสียหายมืด <FORMULA> ทันที\nเป้าหมายต้องทอย [r]ENDsave DC10 + <ControlMod>[/r] หรือถูก <DebuffCursed> 3 เทิร์น และ <DebuffHexed> 2 เทิร์น\n{5}\nยังเพิ่ม [r]<DebuffBurn> 2 สแตค[/r] ด้วย{/}",
    },
    formula: {
      en: "1d4 + <PlanarMod>",
      th: "1d4 + <PlanarMod>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  isFallback: false, // Corruption: consumes 2 neutral elements
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
          en: `${actor.name.en} tried to use Corruption but has no target`,
          th: `${actor.name.th} พยายามใช้การเสื่อมสลายแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate immediate damage: 1d4 + planar mod × skill level multiplier
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelMultiplier = skillLevelMultiplier(skillLevel);
    
    // Damage dice - should not get bless/curse
    const baseDiceDamage = actor.roll({ amount: 1, face: 4, stat: "planar", applyBlessCurse: false });
    const totalDamage = Math.max(0, Math.floor((baseDiceDamage + planarMod) * levelMultiplier));

    // Curse/chaos magic uses WIL for hit, LUCK for crit
    const damageOutput = {
      damage: totalDamage,
      hit: actor.rollTwenty({stat: 'willpower'}),
      crit: actor.rollTwenty({stat: 'luck'}),
      type: DamageType.arcane, // Enum says arcane damage
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check if target already has Cursed debuff BEFORE applying new one (for bonus)
    const hadCursedBefore = target.buffsAndDebuffs.debuffs.entry.has(DebuffEnum.cursed);
    
    // Check for debuff application (DC10 + planar mod WIL save) - enum says WIL save, not END
    let debuffMessage = "";
    const willpowerDC = 10 + planarMod;
    const saveRoll = target.rollSave("willpower");
    
    if (saveRoll < willpowerDC) {
      // Apply Cursed for 2 turns (enum says 2 turns, not 3)
      buffsAndDebuffsRepository.cursed.appender(target, { turnsAppending: 2 });
      debuffMessage = ` ${target.name.en} is cursed!`;
      
      // Bonus: If target already has Cursed debuff, also apply Hexed debuff for 2 turns
      if (hadCursedBefore) {
        buffsAndDebuffsRepository.hexed.appender(target, { turnsAppending: 2 });
        debuffMessage += ` ${target.name.en} is also hexed!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Corruption", th: "การเสื่อมสลาย" },
      damageResult,
    );

    return {
      content: {
        en: `${message.en}${debuffMessage}`,
        th: `${message.th}${debuffMessage}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [
        {
          actorId: target.id,
          effect: [TargetEffect.ChaosOne],
        },
      ],
    };
  },
});

