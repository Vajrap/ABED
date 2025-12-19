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
import { buildCombatMessage } from "src/Utils/buildCombatMessage";
import { statMod } from "src/Utils/statMod";
import { ClericSkill } from "./index";
import { BuffEnum } from "src/Entity/BuffsAndDebuffs/enum";

export const turnUndead = new ClericSkill({
  id: ClericSkillId.TurnUndead,
  name: {
    en: "Turn Undead",
    th: "ขับไล่ผี",
  },
  description: {
    text: {
      en: "Cast a holy spell to destroy undead. \nDeal <FORMULA> true holy damage to non-undead targets. \nAgainst undead, target makes a [r](DC {5}'12':'10'{/}) WILsave roll[/r]. \nIf it failed to save, take 9999 true damage (instant kill). \nElse take [b]1d12 + <WILmod>[/b] holy damage.",
      th: "ร่ายเวทย์มนต์ศักดิ์สิทธิ์เพื่อทำลาย undead \nสร้างความเสียหายจริง <FORMULA> ต่อเป้าหมายที่ไม่ใช่ undead \nหากเป้าหมายเป็น undead เป้าหมายจะต้องทอย [r](DC {5}'12':'10'{/}) WILsave[/r] \nหากล้มเหลว สร้างความเสียหายจริง 9999 (ฆ่าทันที) \nหากสำเร็จ สร้างความเสียหายศักดิ์สิทธิ์ [b]1d12 + <WILmod>[/b]",
    },
    formula: {
      en: "1d4 + <WILmod>",
      th: "1d4 + <WILmod>",
    },
  },
  requirement: {},
  equipmentNeeded: [],
  tier: TierEnum.uncommon,
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
    elements: [
      {
        element: "neutral",
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
      const damage = actor.roll({
        amount: 1,
        face: 4,
        stat: "willpower",
      });
      const damageOutput = {
        damage,
        hit: actor.rollTwenty({stat: "control"}),
        crit: actor.rollTwenty({stat: "luck"}),
        type: DamageType.radiance,
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

    // Undead target: target makes willpower saving throw
    // DC = 10 + faith stacks (12 at level 5)
    const faithEntry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.faith);
    const faithStacks = faithEntry?.value || 0;
    const baseDC = skillLevel >= 5 ? 12 : 10;
    const dc = baseDC + faithStacks;
    const saveRoll = target.rollSave("willpower");

    if (saveRoll < dc) {
      // Save failed: instant kill with 9999 true damage
      const damageOutput = {
        damage: 9999,
        hit: 999,
        crit: 0,
        type: DamageType.radiance,
        trueDamage: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);

      // Consume 1 Faith stack
      if (faithEntry && faithEntry.value > 0) {
        faithEntry.value -= 1;
        if (faithEntry.value === 0) {
          actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.faith);
        }
      }

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
      const damage = actor.roll({
        amount: 1,
        face: 12,
        stat: "willpower",
      });
      const damageOutput = {
        damage,
        hit: 999,
        crit: 0,
        type: DamageType.radiance,
        isMagic: true,
      };

      const damageResult = resolveDamage(actor.id, target.id, damageOutput, location);
      
      // Consume 1 Faith stack (even on successful save)
      if (faithEntry && faithEntry.value > 0) {
        faithEntry.value -= 1;
        if (faithEntry.value === 0) {
          actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.faith);
        }
      }

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

