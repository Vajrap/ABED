import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const haste = new BuffDef({
  name: {
    en: "haste",
    th: "เร่งความเร็ว",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.haste);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.haste, {
        value,
        isPerm,
        permValue,
      });
    } else {
      if (!entry.isPerm && isPerm) {
        entry.isPerm = true;
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    actor.attribute.mutateBattle("agility", value + permValue);
    return {
      en: `${actor.name.en} got hasted buff: agi goes up by ${value + permValue}`,
      th: `${actor.name.th} ได้รับ "เร่งความเร็ว": agi เพิ่มขึ้น ${value + permValue} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.haste);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
        actor.attribute.mutateBattle("agility", -1);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} hasted decreased: agi goes down by 1`,
        th: `${actor.name.th} "เร่งความเร็ว" ลดลง: agi ลดลง 1 หน่วย`,
      },
    };
  },
});
