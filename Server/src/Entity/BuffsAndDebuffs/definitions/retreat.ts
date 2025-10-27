import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";

export const retreat: BuffsAndDebuffsDef = {
  name: {
    en: "retreat",
    th: "ถอยก่อน",
  },
  appender: function (actor: Character, value: number): L10N {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.retreat);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.retreat, {
        value: value,
        isPerm: false,
        permValue: 0,
      });
      actor.battleStats.mutateBattle("dodge", 3);
      isFirst = true;
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got retreat buff${value}${isFirst ? ", dodge in crease by 3" : "."}`,
      th: `${actor.name.th} ได้รับ "ถอยก่อน" ${value} หน่วย `,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    let isRemoved = false;
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.retreat);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.battleStats.mutateBattle("dodge", -3);
      actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.retreat);
      isRemoved = true;
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} retreat went down by one stack${isRemoved ? ". Dodge goes down by 3" : "."}`,
        th: `${actor.name.th} "ถอยก่อน" ลดลง 1 หน่วย${isRemoved ? ", หลบหลีกลดลง 3" : "."}`,
      },
    };
  },
};
