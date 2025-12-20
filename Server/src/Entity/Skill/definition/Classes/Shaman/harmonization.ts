import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ShamanSkillId } from "../../../enums";
import type { Character } from "src/Entity/Character/Character";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll } from "src/Utils/Dice";
import { ShamanSkill } from "./index";

export const harmonization = new ShamanSkill({
  id: ShamanSkillId.Harmonization,
  name: {
    en: "Harmonization",
    th: "ความกลมกลืน",
  },
  description: {
    text: {
      en: "Harmonize the opposing forces of Order and Chaos.\n\n**Balancing:**\nIf you have both Order and Chaos, reduce the higher one until they are equal.\n- Example: Order 3, Chaos 1 → Order 2, Chaos 2\n- Example: Order 5, Chaos 0 → Order 3, Chaos 2\n\n**Damage:**\nDeal damage based on the amount balanced:\n- Deal 1d6 damage of the *converted type*\n- Gain +1 damage per resource shifted\n\n**Perfect Balance:**\nIf Order and Chaos are equal and greater than 0:\n- Deal 1d4 Order damage **and** 1d4 Chaos damage\n- Gain +1 damage per Order and Chaos resource\n\n**Fallback:**\nIf you have no Order and no Chaos:\n- Deal 1d6 blunt damage",
      th: "ทำให้พลังตรงข้ามของ Order และ Chaos กลมกลืนกัน\n\n**การปรับสมดุล:**\nหากคุณมีทั้ง Order และ Chaos ให้ลดค่าที่สูงกว่าจนเท่ากัน\n- ตัวอย่าง: Order 3, Chaos 1 → Order 2, Chaos 2\n- ตัวอย่าง: Order 5, Chaos 0 → Order 3, Chaos 2\n\n**ความเสียหาย:**\nสร้างความเสียหายตามจำนวนที่ปรับสมดุล:\n- สร้างความเสียหาย 1d6 ประเภท *ที่ถูกแปลง*\n- เพิ่มความเสียหาย +1 ต่อทรัพยากรที่ถูกเปลี่ยน\n\n**สมดุลสมบูรณ์:**\nหาก Order และ Chaos เท่ากันและมากกว่า 0:\n- สร้างความเสียหาย Order 1d4 **และ** Chaos 1d4\n- เพิ่มความเสียหาย +1 ต่อทรัพยากร Order และ Chaos\n\n**กรณีอื่น:**\nหากคุณไม่มี Order และไม่มี Chaos:\n- สร้างความเสียหาย neutral 1d6",
    },
    formula: {
      en: "Damage varies based on resource balance",
      th: "ความเสียหายแตกต่างกันตามการปรับสมดุลทรัพยากร",
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
        element: "chaos",
        min: 0,
        max: 1,
      },
      {
        element: "order",
        min: 0,
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
    const target = getTarget(actor, actorParty, targetParty, "enemy").one();

    if (!target) {
      return {
        content: {
          en: `${actor.name.en} tried to harmonize but has no target`,
          th: `${actor.name.th} พยายามทำให้กลมกลืนแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    const order = actor.resources.order;
    const chaos = actor.resources.chaos;
    
    // Perfect Balance: Order == Chaos > 0
    if (order > 0 && order === chaos) {
      // Deal 1d4 Order damage AND 1d4 Chaos damage
      // Gain +1 damage per Order and Chaos resource
      const orderDamage = actor.roll({ amount: 1, face: 4, stat: 'planar' }) + order;
      const chaosDamage = actor.roll({ amount: 1, face: 4, stat: 'planar' }) + chaos;
      // attack twice
      const orderDamageOutput = {
        damage: orderDamage,
        hit: actor.rollTwenty({stat: 'intelligence'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.order,
        isMagic: true,
      };
      const chaosDamageOutput = {
        damage: chaosDamage,
        hit: actor.rollTwenty({stat: 'intelligence'}),
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.chaos,
        isMagic: true,
      };
      const orderDamageResult = resolveDamage(actor.id, target.id, orderDamageOutput, location);
      const chaosDamageResult = resolveDamage(actor.id, target.id, chaosDamageOutput, location);
      
      return {
        content: {
          en: `${actor.name.en} used Harmonization. Perfect balance! Dealt ${orderDamageResult.actualDamage} Order and ${chaosDamageResult.actualDamage} Chaos damage!`,
          th: `${actor.name.th} ใช้ความกลมกลืน. สมดุลสมบูรณ์! สร้างความเสียหาย Order ${orderDamageResult.actualDamage} และ Chaos ${chaosDamageResult.actualDamage}`,
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
    }
    // Both exist but not equal - balance them
    else if ((order > 0 || chaos > 0) && order !== chaos) {

      const higherRes = order > chaos ? 'order' : 'chaos';
      const lowerRes = higherRes === 'order' ? 'chaos' : 'order';
      const higher = higherRes === 'order' ? actor.resources.order : actor.resources.chaos;
      const lower = higherRes === 'chaos' ? actor.resources.chaos : actor.resources.order;
      const balancedValue = Math.floor((higher + lower) / 2);
      // These two should be equal in math
      const shiftAmount = higher - balancedValue;

      // Update resources
      actor.resources[higherRes] -= shiftAmount;
      actor.resources[lowerRes] += shiftAmount;
      
      // Deal 1d6 damage of the converted type (the one that was reduced)
      const damageType = higherRes === 'order' ? DamageType.chaos : DamageType.order;
      const baseDamage = actor.roll({ amount: 1, face: 6, stat: 'planar' });
      const totalDamage = baseDamage + shiftAmount;

      const damageOutput = {
        damage: totalDamage,
        hit: actor.rollTwenty({stat: 'intelligence'}), // Auto-hit spell
        crit: actor.rollTwenty({stat: 'luck'}),
        type: damageType,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      
      return {
        content: {
          en: `${actor.name.en} used Harmonization. Balanced resources! Shifted ${shiftAmount} resources and dealt ${damageResult.actualDamage} ${damageType} damage!`,
          th: `${actor.name.th} ใช้ความกลมกลืน. ปรับสมดุล ${shiftAmount} ทรัพยากรและสร้างความเสียหาย ${damageResult.actualDamage} ${damageType}`,
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
    }
    // Fallback: No Order and no Chaos
    else {
      const baseDamage = roll(1).d(6).total;
      const damageOutput = {
        damage: baseDamage,
        hit: actor.rollTwenty({stat: 'intelligence'}), // Auto-hit spell
        crit: actor.rollTwenty({stat: 'luck'}),
        type: DamageType.blunt,
        isMagic: true,
      };
      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

      return {
        content: {
          en: `${actor.name.en} used Harmonization. Dealt ${damageResult.actualDamage} neutral damage (no resources to harmonize).`,
          th: `${actor.name.th} ใช้ความกลมกลืน. สร้างความเสียหาย ${damageResult.actualDamage} neutral (ไม่มีทรัพยากรให้กลมกลืน)`,
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
    }
  }
});

