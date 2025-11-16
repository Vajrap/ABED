import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import { Skill } from "../../../Skill";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { statMod } from "src/Utils/statMod";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { roll, rollTwenty } from "src/Utils/Dice";

export const chaoticBlessing = new Skill({
  id: ShamanSkillId.ChaoticBlessing,
  name: {
    en: "Chaotic Blessing",
    th: "พรแห่งความยุ่งเหยิง",
  },
  description: {
    en: "Has 50% chance to deal damage to all enemies or heal the whole team for 1d6 + ((willpower mod + planar mod )/2) * (1 + (0.1 * skillLevel)). At level 5 the dice is 1d8: heal target roll DC10, if success, gain +1 chaos, attacked target roll DC10 willpower save if fail remove random resource by 1.",
    th: "มี 50% โอกาสที่สร้างความเสียหายให้ศัตรูทั้งหมดหรือรักษาเพื่อนร่วมทีม ความเสียหายคือ 1d6 + willpower mod, การรักษาคือ 1d3 + willpower mod; + ค่า planar + skill Level * 0.5 ที่เลเวล 5 ความเสียหายคือ 1d8, การรักษาคือ 1d4",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
  consume: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [
      { element: "chaos", value: 1 },
      { element: "order", value: 1 },
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
    
    const additionalDamage = (statMod(actor.attribute.getTotal("planar")) + statMod(actor.attribute.getTotal("willpower")) ) / 2;
    
    let messages: string[] = [];

    if (isDamage) {
      for (const target of targetParty) {
        const total = roll(1).d(skillLevel >= 5 ? 8 : 6).total + additionalDamage * (1 + (0.1 * skillLevel));
        const damageOutput = {
          damage: Math.floor(total),
          hit: 999,
          crit: 0,
          type: DamageType.chaos,
          isMagic: true,
        };
        
        const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
        const saved = rollTwenty().total + target.saveRolls.getTotal('willpower') >= 10;
        const msg = buildCombatMessage(actor, target, { en: "Chaotic Blessing", th: "พรแห่งความยุ่งเหยิง" }, damageResult);
        if (!saved) {
          const resource = Object.keys(target.resources)[Math.floor(Math.random() * Object.keys(target.resources).length)];
          if (target.resources[resource as keyof typeof target.resources] > 0) { 
            target.resources[resource as keyof typeof target.resources] -= 1;
            msg.en += ` ${target.name.en} lost 1 ${resource}!`;
            msg.th += ` ${target.name.th} สูญเสีย 1 ${resource}!`;
          }
        }
        messages.push(msg.en);
      }
    } else {
      // Heal whole team
      for (const ally of actorParty) {
        if (!ally.vitals.isDead) {
          const total = roll(1).d(skillLevel >= 5 ? 8 : 6).total + additionalDamage * (1 + (0.1 * skillLevel));
          ally.vitals.incHp(Math.floor(total));
          const getChaos = rollTwenty().total;
          let msg = `${ally.name.en} healed for ${total} HP!`;
          if (getChaos >= 10) {
            ally.resources.chaos += 1;
            msg += ` ${ally.name.en} gained 1 Chaos!`;
          }
          messages.push(msg);
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

