import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import {BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const arcaneShield = new BuffDef({
  name: {
    en: "Arcane Shield",
    th: "โล่เวทมนตร์",
  },
  description: {
    en: "When attacked, roll d20 + planar mod (stored in counter) END save. If passed, negate that attack and gain 1 Arcane Charge stack. Removed after checking.",
    th: "เมื่อถูกโจมตี ทอย d20 + planar mod (เก็บไว้ใน counter) END save หากผ่าน จะยกเลิกการโจมตีนั้นและได้รับ 1 สแต็ก Arcane Charge ลบออกหลังการตรวจสอบ",
  },
  formula: "d20 + planar mod (from counter) END save vs attack",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value, universalCounter: planarMod = 0 } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneShield);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.arcaneShield, {
        value: value,
        counter: planarMod, // Store planar mod for save calculation
      });
    } else {
      entry.value += value;
      // Keep the highest planar mod if extending
      if (planarMod > entry.counter) {
        entry.counter = planarMod;
      }
    }

    return {
      en: `${actor.name.en} gained Arcane Shield buff for ${value} turn(s)!`,
      th: `${actor.name.th} ได้รับ "โล่เวทมนตร์" ${value} เทิร์น!`,
    };
  },
  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.arcaneShield);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.arcaneShield);
      }
    }

    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});
