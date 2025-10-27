import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { SkillId } from "../enums";
import { Skill } from "../Skill";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";

export const chaoticBlessing = new Skill({
  id: SkillId.ChaoticBlessing,
  name: {
    en: "Chaotic Blessing",
    th: "พรแห่งความยุ่งเหยิง",
  },
  description: {
    en: "Has 50% chance to deal damage to all enemies or heal the whole team. Damage is 1d6, heal is 1d3; +planar Mod + skill Level * 0.5. At level 5 damage is 1d8, heal is 1d4",
    th: "มี 50% โอกาสที่สร้างความเสียหายให้ศัตรูทั้งหมดหรือรักษาเพื่อนร่วมทีม ความเสียหายคือ 1d6 การรักษาคือ 1d3; + ค่า planar + skill Level * 0.5 ที่เลเวล 5 ความเสียหายคือ 1d8 การรักษาคือ 1d4",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "chaos", value: 2 },
      { element: "order", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      {
        element: "neutral",
        min: 0,
        max: 2,
      },
    ],
  },
  exec: (
    actor: Character,
    actorParty: Character[],
    targetParty: Character[],
    skillLevel: number,
    location: LocationsEnum,
  ) => {
    // 50/50 chance to damage or heal
    const isDamage = rollTwenty().total <= 10;
    const planarMod = statMod(actor.attribute.getTotal("planar"));
    const bonus = skillLevel * 0.5;

    let messages: string[] = [];

    if (isDamage) {
      // Deal damage to all enemies
      const diceSize = skillLevel >= 5 ? 8 : 6;
      const damage = roll(1).d(diceSize).total + planarMod + bonus;
      
      for (const target of targetParty) {
        const damageOutput = {
          damage: Math.floor(damage),
          hit: 999,
          crit: 0,
          type: DamageType.chaos,
        };
        
        const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
        const msg = buildCombatMessage(actor, target, { en: "Chaotic Blessing", th: "พรแห่งความยุ่งเหยิง" }, damageResult);
        messages.push(msg.en);
      }
    } else {
      // Heal whole team
      const diceSize = skillLevel >= 5 ? 4 : 3;
      const healAmount = Math.floor(roll(1).d(diceSize).total + planarMod + bonus);
      
      for (const ally of actorParty) {
        if (!ally.vitals.isDead) {
          ally.vitals.incHp(healAmount);
          messages.push(`${ally.name.en} healed for ${healAmount} HP!`);
        }
      }
    }

    return {
      content: {
        en: `${actor.name.en} used Chaotic Blessing! ${messages.join(" ")}`,
        th: `${actor.name.th} ใช้พรแห่งความยุ่งเหยิง!`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: [...targetParty, ...actorParty].map(char => ({
        actorId: char.id,
        effect: [TargetEffect.ChaosTwo, TargetEffect.OrderTwo],
      })),
    };
  },
});

