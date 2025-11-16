import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { MobSkillId } from "../../../enums";
import { Skill } from "../../../Skill";
import type { Character } from "src/Entity/Character/Character";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll } from "src/Utils/Dice";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { BuffsAndDebuffsEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const whip = new Skill({
  id: MobSkillId.Whip,
  name: { en: "Whip!", th: "แส้!" },
  description: {
    en: "Attack one enemy deal 1d6 damage + all (Slave Drive) stacks*2 * (1+(skillLevel*0.1)), after attack, remove slave driver stacks",
    th: "โจมตีศัตรูหนึ่งตัว สร้างความเสียหาย 1d6 + (สแต็ค Slave Driver ทั้งหมด)*2 * (1+(เลเวลสกิล*0.1)), หลังโจมตี ลบสแต็ค Slave Driver ทั้งหมด",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.common,
  consume: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "earth", value: 1 }],
  },
  produce: {
    hp: 0, mp: 0, sp: 0,
    elements: [{ element: "chaos", min: 1, max: 1 }],
  },
  exec: (actor: Character, _ally: Character[], enemies: Character[], skillLevel: number, location: LocationsEnum) => {
    const target = getTarget(actor, enemies).one();
    if (!target) {
      return {
        content: { en: `${actor.name.en} tried to whip but has no target`, th: `${actor.name.th} พยายามใช้แส้แต่ไม่พบเป้าหมาย` },
        actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
        targets: [],
      };
    }
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.slaveDriver);
    const stacks = entry?.value || 0;
    const baseDamage = (roll(1).d(6).total + stacks * 2) * (1 + skillLevel * 0.1);
    const damageOutput = { damage: baseDamage, hit: 999, crit: 0, type: DamageType.blunt, trueDamage: true };
    const result = resolveDamage(actor.id, target.id, damageOutput, location);
    if (entry) actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.slaveDriver);
    return {
      content: buildCombatMessage(actor, target, { en: "Whip!", th: "แส้!" }, result),
      actor: { actorId: actor.id, effect: [ActorEffect.TestSkill] },
      targets: [{ actorId: target.id, effect: [TargetEffect.TestSkill] }],
    };
  },
});


