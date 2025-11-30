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
import { roll, rollTwenty } from "src/Utils/Dice";
import { WarlockSkill } from "./index";

export const lifeDrain = new WarlockSkill({
  id: WarlockSkillId.LifeDrain,
  name: {
    en: "Life Drain",
    th: "ดูดชีวิต",
  },
  description: {
    text: {
      en: "Drain the very life force from your enemy, converting their vitality into your own.\nDeal <FORMULA> erosion damage.\n[b]Heal yourself[/b] for {5}'75%':'50%'{/} + <VITmod>/10 of damage dealt.",
      th: "ดูดพลังชีวิตจากศัตรู แปลงพลังชีวิตของพวกเขาเป็นของคุณเอง\nสร้างความเสียหายกัดกร่อน <FORMULA>\n[b]ฟื้นฟูตัวเอง[/b] {5}'75%':'50%'{/} + <VITmod>/10 ของความเสียหายที่สร้าง",
    },
    formula: {
      en: "{5}'1d10':'1d8'{/} + <PlanarMod> + <WILmod>",
      th: "{5}'1d10':'1d8'{/} + <PlanarMod> + <WILmod>",
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
        element: "water",
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
          en: `${actor.name.en} tried to use Life Drain but has no target`,
          th: `${actor.name.th} พยายามใช้ดูดชีวิตแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Calculate damage: 1d8 + planar mod + willpower mod
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const willpowerMod = statMod(actor.attribute.getTotal("willpower"));
    const vitalityMod = statMod(actor.attribute.getTotal("vitality"));
    const controlMod = statMod(actor.attribute.getTotal("control"));
    const luckMod = statMod(actor.attribute.getTotal("luck"));
    
    const baseDiceDamage = roll(1).d(skillLevel >= 5 ? 10 : 8).total;
    const totalDamage = Math.max(0, baseDiceDamage + planarMod + willpowerMod);

    const damageOutput = {
      damage: totalDamage,
      hit: rollTwenty().total + controlMod,
      crit: rollTwenty().total + luckMod,
      type: DamageType.erosion,
      isMagic: true,
    };

    const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

    // Heal self for percentage of damage dealt + vitality mod/10
    let healMessage = "";
    if (damageResult.isHit && damageResult.actualDamage > 0) {
      const baseHealPercentage = skillLevel >= 5 ? 0.75 : 0.50;
      const vitalityBonus = vitalityMod / 10; // e.g., +2% per vitality mod
      const healPercentage = Math.min(1.0, baseHealPercentage + vitalityBonus);
      const healAmount = Math.floor(damageResult.actualDamage * healPercentage);
      
      const beforeHp = actor.vitals.hp.current;
      actor.vitals.incHp(healAmount);
      const actualHeal = actor.vitals.hp.current - beforeHp;
      
      if (actualHeal > 0) {
        healMessage = ` ${actor.name.en} drained ${actualHeal} HP!`;
      }
    }

    const message = buildCombatMessage(
      actor,
      target,
      { en: "Life Drain", th: "ดูดชีวิต" },
      damageResult,
    );

    const healAmount = damageResult.isHit && damageResult.actualDamage > 0 
      ? Math.floor(damageResult.actualDamage * (skillLevel >= 5 ? 0.75 : 0.50))
      : 0;

    return {
      content: {
        en: `${message.en}${healMessage}`,
        th: `${message.th}${healAmount > 0 ? ` ${actor.name.th} ดูด ${healAmount} HP!` : ""}`,
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

