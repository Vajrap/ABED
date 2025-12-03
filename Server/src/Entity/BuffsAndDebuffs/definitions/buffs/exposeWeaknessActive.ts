import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const exposeWeaknessActive = new BuffDef({
  name: {
    en: "Expose Weakness Active",
    th: "เปิดเผยจุดอ่อนใช้งาน",
  },
  description: {
    en: "Grants <Formula> bonus hit chance against exposed enemies. ",
    th: "ให้โอกาสตีเพิ่มต่อศัตรูที่ถูกเปิดเผย <Formula> ",
  },
  formula: "<COUNTER> / 2",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const {
      turnsAppending: value,
      universalCounter = 0,
    } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.exposeWeaknessActive);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.exposeWeaknessActive, {
        value: value,
        counter: universalCounter, // Store WIL mod for hit bonus
      });
    } else {
      entry.value += value;
      // Use higher WIL mod
      entry.counter = Math.max(entry.counter, universalCounter);
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

