import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClericSkillId } from "../../../enums";
import { CharacterType } from "src/InterFacesEnumsAndTypes/Enums";
import type { Character } from "src/Entity/Character/Character";
import type { TurnResult } from "../../../types";
import { getTarget } from "src/Entity/Battle/getTarget";
import { ActorEffect, TargetEffect } from "../../../effects";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { resolveDamage } from "src/Entity/Battle/damageResolution";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { roll } from "src/Utils/Dice";
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { statMod } from "src/Utils/statMod";
import { ClericSkill } from "./index";

export const turnUndead = new ClericSkill({
  id: ClericSkillId.TurnUndead,
  name: {
    en: "Turn Undead",
    th: "ขับไล่ผี",
  },
  description: {
    en: "Deal 1d4 (+caster willpower mod) true holy damage to non-undead targets. Against undead, target makes a willpower saving throw (DC 10, or DC 12 at level 5+). If it failed to save, take 9999 true damage (instant kill). else take deal 1d12 (+caster willpower mod) holy damage.",
    th: "สร้างความเสียหายจริง 1d4 ต่อเป้าหมายที่ไม่ใช่ undead, หากเป้าหมายเป็น undead เป้าหมายทำการทดสอบ willpower (DC 10 หรือ DC 12 ที่เลเวล 5+) หากล้มเหลว สร้างความเสียหายจริง 9999 (ฆ่าทันที) หากสำเร็จ สร้างความเสียหายศักดิ์สิทธิ์ 1d12 (+ค่า willpower ของผู้ใช้)",
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.rare,
  consume: {
    hp: 0,
    mp: 5,
    sp: 0,
    elements: [
      { element: "order", value: 2 },
    ],
  },
  produce: {
    hp: 0,
    mp: 0,
    sp: 0,
    elements: [],
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
          en: `${actor.name.en} tried to use Turn Undead but has no target`,
          th: `${actor.name.th} พยายามใช้ขับไล่ผีแต่ไม่พบเป้าหมาย`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.TestSkill],
        },
        targets: [],
      };
    }

    // Check if target is undead
    const isUndead = target.type === CharacterType.undead;
    const willpowerMod = statMod(actor.attribute.getTotal("willpower"));

    if (!isUndead) {
      // Non-undead: deal 1d4 true damage
      const damage = roll(1).d(4).total + willpowerMod;
      const damageOutput = {
        damage,
        hit: roll(1).d(20).total + statMod(actor.attribute.getTotal("control")),
        crit: roll(1).d(20).total + statMod(actor.attribute.getTotal("luck")),
        type: DamageType.holy,
        trueDamage: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

      return {
        content: buildCombatMessage(actor, target, { en: "Turn Undead", th: "ขับไล่ผี" }, damageResult),
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: target.id,
            effect: [TargetEffect.OrderOne],
          },
        ],
      };
    }

    // Undead target: caster makes willpower saving throw
    const dc = skillLevel >= 5 ? 12 : 10;
    const saveRoll = target.rollSave("willpower");

    if (saveRoll < dc) {
      // Save failed: instant kill with 9999 true damage
      const damageOutput = {
        damage: 9999,
        hit: 999,
        crit: 0,
        type: DamageType.holy,
        trueDamage: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

      const combatMsg = buildCombatMessage(actor, target, { en: "Turn Undead", th: "ขับไล่ผี" }, damageResult);
      return {
        content: {
          en: `${actor.name.en} channels divine power! ${target.name.en} is turned by holy light! ${combatMsg.en}`,
          th: `${actor.name.th} ปล่อยพลังศักดิ์สิทธิ์! ${target.name.th} ถูกขับไล่ด้วยแสงศักดิ์สิทธิ์! ${combatMsg.th}`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: target.id,
            effect: [TargetEffect.OrderOne],
          },
        ],
      };
    } else {
      // Save failed: deal 1d12 holy damage
      const damage = roll(1).d(12).total + willpowerMod;
      const damageOutput = {
        damage,
        hit: 999,
        crit: 0,
        type: DamageType.holy,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      const combatMsg = buildCombatMessage(actor, target, { en: "Turn Undead", th: "ขับไล่ผี" }, damageResult);

      return {
        content: {
          en: `${actor.name.en} attempts to turn ${target.name.en}, but the undead resists! ${combatMsg.en}`,
          th: `${actor.name.th} พยายามขับไล่ ${target.name.th} แต่ผีต้านทานได้! ${combatMsg.th}`,
        },
        actor: {
          actorId: actor.id,
          effect: [ActorEffect.Cast],
        },
        targets: [
          {
            actorId: target.id,
            effect: [TargetEffect.OrderOne],
          },
        ],
      };
    }
  },
});

