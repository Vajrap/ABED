import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellbladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { statMod } from "src/Utils/statMod";
import { skillLevelMultiplier } from "src/Utils/skillScaling";
import { SpellbladeSkill } from "./index";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { getPlanarEdgeLikeDamage } from "src/Utils/getPlanarEdgeLikeDamage";

export const windSlash = new SpellbladeSkill({
  id: SpellbladeSkillId.WindSlash,
  name: {
    en: "Wind Slash",
    th: "ฟันลม",
  },
  description: {
    text: {
      en: "Slice through the air with a blade of wind-infused arcane energy.\nDeal <FORMULA> wind damage.\nTarget must [r]roll DC7 + <PlanarMod> ENDsave[/r] or get <DebuffBleed> for 1d2 turns.\n{5}\nIf <BuffEdgeCharge> stacks > 0, [r]deal +0.5 damage per stack[/r] (rounded down).{/}",
      th: "ฟันผ่านอากาศด้วยใบมีดพลังงานอาร์เคนที่ผสมลม\nสร้างความเสียหายลม <FORMULA>\nเป้าหมายต้องทอย [r]ENDsave DC7 + <PlanarMod>[/r] หรือถูก <DebuffBleed> 1d2 เทิร์น\n{5}\nหากสแตค <BuffEdgeCharge> > 0 [r]สร้างความเสียหายเพิ่ม +0.5 ต่อสแตค[/r] (ปัดลง){/}",
    },
    formula: {
      en: "Planar Edge damage × <SkillLevelMultiplier>",
      th: "ความเสียหาย Planar Edge × <SkillLevelMultiplier>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 2,
    sp: 2,
    elements: [
      { element: "wind", value: 1 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "neutral", min: 1, max: 1 },
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
          en: `${actor.name.en} tried to use Wind Slash but has no target`,
          th: `${actor.name.th} พยายามใช้ฟันลมแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const weapon = actor.getWeapon();
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Get Planar Edge-like damage (base dice + planar mod, no skill multiplier yet)
    const { baseDamage, hit: hitValue, crit: critValue } = getPlanarEdgeLikeDamage(actor, weapon);

    let rawDamage = baseDamage;
    // At level 5, add 0.5 damage per edge charge stack (rounded down)
    if (skillLevel >= 5) {
      const edgeChargeEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.edgeCharge);
      const edgeChargeStacks = edgeChargeEntry?.value || 0;
      const edgeChargeBonus = Math.floor(edgeChargeStacks * 0.5);
      rawDamage += edgeChargeBonus;
    }

    const scaledDamage = Math.max(0, rawDamage * levelScalar);

    const damageOutput = {
      damage: Math.floor(scaledDamage),
      hit: hitValue,
      crit: critValue,
      type: DamageType.wind,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Check for bleed application
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const dc = 7 + planarMod;
    const saveRoll = target.rollSave("endurance");
    let bleedMessage = "";

    if (saveRoll < dc) {
      // Save failed: apply bleed
      // Random quantity - don't apply bless/curse
      const bleedTurns = target.roll({ amount: 1, face: 2, applyBlessCurse: false });
      debuffsRepository.bleed.appender(target, { turnsAppending: bleedTurns });
      bleedMessage = ` ${target.name.en} failed the save and is bleeding!`;
    }

    const combatMsg = buildCombatMessage(actor, target, { en: "Wind Slash", th: "ฟันลม" }, damageResult);

    return {
      content: {
        en: `${combatMsg.en}${bleedMessage}`,
        th: `${combatMsg.th}${bleedMessage ? ` ${target.name.th} ล้มเหลวในการทดสอบและเลือดไหล!` : ""}`,
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

