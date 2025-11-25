import type { Character } from "src/Entity/Character/Character";
import { DebuffDef } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { roll } from "src/Utils/Dice";

export const bleed = new DebuffDef({
  name: {
    en: "Bleed",
    th: "เลือดไหล",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bleed);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.bleed, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
        counter: 0,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} is bleeding! ${value + permValue} stack(s)`,
      th: `${actor.name.th} กำลังเลือดไหล! ${value + permValue} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.bleed);
    if (entry && entry.value > 0) {
      // Deal 1d3 damage per stack
      const stacks = entry.value;
      let totalDamage = 0;
      for (let i = 0; i < stacks; i++) {
        totalDamage += roll(1).d(3).total;
      }
      actor.vitals.decHp(totalDamage);
      entry.value -= 1; // Reduce duration by 1 turn
      
      return {
        canAct: true,
        content: {
          en: `${actor.name.en} bleeds for ${totalDamage} damage (${stacks} stack(s), ${entry.value} turn(s) remaining)`,
          th: `${actor.name.th} เลือดไหล ${totalDamage} หน่วย (${stacks} หน่วย, เหลือ ${entry.value} เทิร์น)`,
        },
      };
    }
    
    if (entry && entry.value === 0 && entry.permValue === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.bleed);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} bleed decreased`,
        th: `${actor.name.th} "เลือดไหล" ลดลง`,
      },
    };
  },
});

