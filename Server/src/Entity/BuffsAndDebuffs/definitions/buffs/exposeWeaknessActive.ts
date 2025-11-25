import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const exposeWeaknessActive = new BuffDef({
  name: {
    en: "Expose Weakness Active",
    th: "เปิดเผยจุดอ่อนใช้งาน",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.exposeWeaknessActive);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.exposeWeaknessActive, {
        value: value,
        isPerm: isPerm,
        permValue: 0,
        counter: permValue, // Store WIL mod for hit bonus
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      // Use higher WIL mod
      entry.counter = Math.max(entry.counter, permValue);
    }

    return {
      en: `${actor.name.en} gains Expose Weakness Active: bonus hit against exposed enemies!`,
      th: `${actor.name.th} ได้รับ "เปิดเผยจุดอ่อนใช้งาน": hit เพิ่มต่อเป้าหมายที่ถูกเปิดเผย!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.exposeWeaknessActive);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0 && entry.counter === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.exposeWeaknessActive);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Expose Weakness Active duration decreased`,
        th: `${actor.name.th} "เปิดเผยจุดอ่อนใช้งาน" ลดลง`,
      },
    };
  },
});

