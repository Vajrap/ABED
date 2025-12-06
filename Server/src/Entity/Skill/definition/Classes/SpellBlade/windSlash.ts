import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SpellbladeSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getWeaponDamageOutput } from "src/Utils/getWeaponDamgeOutput";
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
import { roll, rollTwenty } from "src/Utils/Dice";
import { debuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { BareHandId } from "src/Entity/Item/Equipment/Weapon/type";
import { getWeaponDamageType } from "src/Utils/getWeaponDamageType";

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
    const isBareHand = weapon.id === BareHandId.BareHand;
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const levelScalar = skillLevelMultiplier(skillLevel);

    // Calculate Planar Edge-like damage
    let baseDamage = 0;
    let hitValue = 0;
    let critValue = 0;
    if (isBareHand) {
      // No weapon: use skill level dice
      let diceConfig: { dice: number; face: number };
      if (skillLevel === 1) diceConfig = { dice: 1, face: 6 };
      else if (skillLevel === 2) diceConfig = { dice: 1, face: 6 };
      else if (skillLevel === 3) diceConfig = { dice: 1, face: 8 };
      else if (skillLevel === 4) diceConfig = { dice: 1, face: 8 };
      else diceConfig = { dice: 2, face: 4 }; // level 5+

      baseDamage = roll(diceConfig.dice).d(diceConfig.face).total;
      hitValue = rollTwenty().total + statMod(actor.attribute.getTotal("control"));
      critValue = rollTwenty().total + statMod(actor.attribute.getTotal("luck"));
    } else {
      // Has weapon: use weapon damage
      const type = getWeaponDamageType(weapon.weaponType);
      const weaponDamage = getWeaponDamageOutput(actor, weapon, type);
      baseDamage = weaponDamage.damage;
      hitValue = weaponDamage.hit;
      critValue = weaponDamage.crit;
    }

    let rawDamage = baseDamage + planarMod;
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
    const dc = 7 + planarMod;
    const saveRoll = target.rollSave("endurance");
    let bleedMessage = "";

    if (saveRoll < dc) {
      // Save failed: apply bleed
      const bleedTurns = roll(1).d(2).total;
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

