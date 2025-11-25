import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffEnum } from "../../enum";

export const slaveDriver = new BuffDef({
  name: {
    en: "slaveDriver",
    th: "ขับทาส",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.slaveDriver);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.slaveDriver, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
        counter: 0,
      });
    } else {
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} got slave driver buff: stacks increased by ${value}`,
      th: `${actor.name.th} ได้รับ "ขับทาส" ${value} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // SlaveDriver stacks don't decrease by turn
    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

