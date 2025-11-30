import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MobSkillId } from "../../../enums";
import { Skill } from "../../../Skill";
import type { Character } from "src/Entity/Character/Character";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { buffsAndDebuffsRepository } from "src/Entity/BuffsAndDebuffs/repository";

export const commanderScream = new Skill({
  id: MobSkillId.CommanderScream,
  name: { en: "Commander Scream!", th: "คำสั่งกรีดร้อง!" },
  description: {
    en: "Target all allies, each rolls DC15 willpower; on fail gain Fear 2t and Cowardly Charge 2t: consume 2 chaos, 2 sp: produce 1 earth",
    th: "เลือกพันธมิตรทั้งหมด ทอย DC15 willpower ถ้าล้มเหลวได้ Fear 2 เทิร์น และ Cowardly Charge 2 เทิร์น: ใช้ 2 chaos, 2 sp: สร้าง 1 earth",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0, mp: 0, sp: 2,
    elements: [{ element: "chaos", value: 2 }],
  },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "earth", min: 1, max: 1 }],
  },
  exec: (actor: Character, actorParty: Character[], _targetParty: Character[], _skillLevel: number, _location: LocationsEnum) => {
    const allies = actorParty.filter(a => a.id !== actor.id && !a.vitals.isDead);
    if (allies.length === 0) {
      return {
        content: { en: `${actor.name.en} screamed but has no allies`, th: `${actor.name.th} กรีดร้องแต่ไม่มีเพื่อนร่วมทีม` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    const targets: { actorId: string; effect: TargetEffect[] }[] = [];
    const affected: Character[] = [];
    for (const ally of allies) {
      const save = rollTwenty().total + statMod(ally.saveRolls.getStat("willpower").total);
      if (save < 15) {
        buffsAndDebuffsRepository.fear.appender(ally, { turnsAppending: 2 });
        buffsAndDebuffsRepository.cowardlyCharge.appender(ally, { turnsAppending: 2 });
        affected.push(ally);
        targets.push({ actorId: ally.id, effect: [TargetEffect.Fear] });
      } else {
        targets.push({ actorId: ally.id, effect: [TargetEffect.TestSkill] });
      }
    }
    const affectedNames = affected.length ? affected.map(t => t.name.en).join(", ") : "none";
    return {
      content: {
        en: `${actor.name.en} screamed! ${affected.length ? `${affectedNames} failed their willpower save and gained fear and cowardly charge!` : "All allies resisted!"}`,
        th: `${actor.name.th} กรีดร้อง! ${affected.length ? `${affectedNames} ล้มเหลวในการทอย willpower save และได้รับ fear และ cowardly charge!` : "เพื่อนร่วมทีมทั้งหมดต้านทานได้!"}`,
      },
      actor: { actorId: actor.id, effect: [ActorEffect.Shout] },
      targets,
    };
  },
});


