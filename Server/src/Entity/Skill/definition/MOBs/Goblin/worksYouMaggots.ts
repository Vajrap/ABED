import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MobSkillId } from "../../../enums";
import { Skill } from "../../../Skill";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll } from "src/Utils/Dice";
import { buffsRepository } from "src/Entity/BuffsAndDebuffs/repository";
import { RaceEnum } from "src/InterFacesEnumsAndTypes/Enums";

export const worksYouMaggots = new Skill({
  id: MobSkillId.WorksYouMaggots,
  name: { en: "Work You Maggots!", th: "ทำงานไอ้หนอน!" },
  description: {
    text: {
      en: "Target one ally 'Goblin' deal 1d3 true damage and add a Buff: Slave Driver to self equal to damage dealt; target get abGauge += 5 + skill level: consume 2 sp : produce 1 chaos",
      th: "เลือกพันธมิตร 'ก๊อปลิน' หนึ่งตัว สร้างความเสียหายจริง 1d3 และเพิ่มบัฟ Slave Driver ให้ตัวเองเท่ากับความเสียหายที่ทำได้; เป้าหมายได้รับ abGauge += 5 + เลเวลสกิล: ใช้ 2 sp : สร้าง 1 chaos",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: { hp: 0, mp: 0, sp: 2, elements: [] },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "chaos", min: 1, max: 1 }],
  },
  exec: (actor: Character, actorParty: Character[], _targetParty: Character[], skillLevel: number, location: LocationsEnum) => {
    const goblinAllies = actorParty.filter(a => a.id !== actor.id && !a.vitals.isDead && a.race === RaceEnum.Goblin);
    if (goblinAllies.length === 0) {
      return {
        content: { en: `${actor.name.en} tried to command but has no goblin allies`, th: `${actor.name.th} พยายามสั่งการแต่ไม่มีเพื่อนร่วมทีมที่เป็นก๊อปลิน` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    const target = goblinAllies[Math.floor(Math.random() * goblinAllies.length)]!;
    const damage = roll(1).d(3).total;
    const damageOutput = { damage, hit: 999, crit: 0, type: DamageType.blunt, trueDamage: true };
    const result = resolveDamage(actor.id, target.id, damageOutput, location);
    buffsRepository.slaveDriver.appender(actor, { turnsAppending: damage });
    target.abGauge += 5 + skillLevel;
    return {
      content: {
        en: `${actor.name.en} commanded ${target.name.en}! Dealt ${result.actualDamage} damage and gained ${damage} Slave Driver stacks. ${target.name.en} gained ${5 + skillLevel} action gauge!`,
        th: `${actor.name.th} สั่งการ ${target.name.th}! สร้างความเสียหาย ${result.actualDamage} หน่วยและได้รับ ${damage} สแต็ก Slave Driver. ${target.name.th} ได้รับ ${5 + skillLevel} action gauge!`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
  },
});


