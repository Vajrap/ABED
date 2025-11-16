import type { Character } from "src/Entity/Character/Character";
import type { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const slaveDriver: BuffsAndDebuffsDef = {
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
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.slaveDriver);
    if (!entry) {
      actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.slaveDriver, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
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
};

