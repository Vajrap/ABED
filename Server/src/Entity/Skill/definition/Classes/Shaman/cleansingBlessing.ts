import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { DebuffEnum } from "src/Entity/BuffsAndDebuffs/enum";
import { ShamanSkill } from "./index";
import { getTarget } from "src/Entity/Battle/getTarget";

export const cleansingBlessing = new ShamanSkill({
  id: ShamanSkillId.CleansingBlessing,
  name: {
    en: "Cleansing Blessing",
    th: "พรแห่งการชำระล้าง",
  },
  description: {
    text: {
      en: "Cleanse an ally with blessing energy.\nTarget {5}2:1{/} random allies.\nRemove {5}2:1{/} random debuff from target.\nIf debuff removed, heal target for 1d4 + <WILmod> HP.\nIf no debuffs to remove, grant <BuffBless> buff for 1 turn instead.",
      th: "ชำระล้างพันธมิตรด้วยพลังงานพร\nเป้าหมาย {5}2:1{/} พันธมิตรแบบสุ่มที่มี debuff\nลบ debuff แบบสุ่ม {5}2:1{/} จากเป้าหมาย\nหากลบ debuff แล้ว จะรักษาเป้าหมาย 1d4 + <WILmod> HP\nหากไม่มี debuff ให้ลบ จะให้ <BuffBless> buff เป็นเวลา 1 เทิร์นแทน",
    },
    formula: {
      en: "Heal: 1d4 + <WILmod> HP (if debuff removed)",
      th: "รักษา: 1d4 + <WILmod> HP (หากลบ debuff แล้ว)",
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
        element: "order",
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
  ) => {
    const numTargets = skillLevel >= 5 ? 2 : 1;
    const numDebuffsToRemove = skillLevel >= 5 ? 2 : 1;

    const targets = getTarget(actor, actorParty, targetParty, "ally").many(numTargets);

    const wilMod = statMod(actor.attribute.getTotal("willpower"));
    const messages: string[] = [];
    const targetEffects: Array<{ actorId: string; effect: TargetEffect[] }> = [];

    for (const target of targets) {
      // Get list of non-cooldown debuffs
      if (target.buffsAndDebuffs.debuffs.entry.size > 0) {
        // Case Remove Debuff
        for (let i = 0; i < numDebuffsToRemove; i++) {
            const debuffList = Array.from(target.buffsAndDebuffs.debuffs.entry.keys());
            const randomIndex = Math.floor(Math.random() * debuffList.length);
            const randomDebuff = debuffList[randomIndex]!;
            target.buffsAndDebuffs.debuffs.entry.delete(randomDebuff);
            messages.push(`${target.name.en} was cleansed of a debuff.`);
            targetEffects.push({
              actorId: target.id,
              effect: [TargetEffect.OrderOne],
            });
            break;
        }
      } else {
        //Case Heal
        // Healing dice - should not get bless/curse
        const healAmount = actor.roll({ amount: 1, face: 4, stat: "willpower", applyBlessCurse: false }) + wilMod;
        target.vitals.incHp(healAmount);
        messages.push(`${target.name.en} was cleansed and healed for ${healAmount} HP.`);
        targetEffects.push({
          actorId: target.id,
          effect: [TargetEffect.OrderOne],
        });
      }        
    }
    

    return {
      content: {
        en: `${actor.name.en} used Cleansing Blessing. ${messages.join(" ")}`,
        th: `${actor.name.th} ใช้พรแห่งการชำระล้าง. ${messages.join(" ")}`,
      },
      actor: {
        actorId: actor.id,
        effect: [ActorEffect.Cast],
      },
      targets: targetEffects,
    };
  },
});

