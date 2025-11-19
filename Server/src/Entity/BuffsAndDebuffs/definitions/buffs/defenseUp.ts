import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffEnum } from "../../enum";

export const defenseUp = new BuffDef({
  name: {
    en: "defenseUp",
    th: "เพิ่มพลังป้องกัน",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.defenseUp);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.defenseUp, {
        value,
        isPerm,
        permValue,
      });
      actor.battleStats.mutateBattle("pDEF", 2);
      actor.battleStats.mutateBattle("mDEF", 2);
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} got defenseUp buff: pDEF and mDEF goes up by ${value + permValue}`,
      th: `${actor.name.th} ได้รับ "เพิ่มพลังป้องกัน": pDEF และ mDEF เพิ่มขึ้น ${value + permValue} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    let removed = false;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.defenseUp);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0) {
        actor.battleStats.mutateBattle("pDEF", -2);
        actor.battleStats.mutateBattle("mDEF", -2);
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.defenseUp);
        removed = true;
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} defenseUp decreased by 1 turn. ${removed ? `pDEF and mDEF goes down by 2` : ''}`,
        th: `${actor.name.th} "เพิ่มพลังป้องกัน" ลดลง 1 เทิร์น. ${removed ? `pDEF และ mDEF ลดลง 2 หน่วย` : ''}`,
      },
    };
  },
});
