import type { Character } from "src/Entity/Character/Character";
import type { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const burn: BuffsAndDebuffsDef = {
  name: {
    en: "burn",
    th: "เผาไหม้",
  },
  appender: function (
    actor: Character,
    value: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.burn);
    if (!entry) {
      actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.burn, {
        value: value,
        isPerm: false,
        permValue: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got burn debuff: value goes up by ${value}`,
      th: `${actor.name.th} ได้รับ "เผาไหม้" ${value} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.burn);
    // TODO: Take damage based on burn stacks
    if (entry) {
      if (entry.value > 0) {
        actor.vitals.decHp(entry.value);
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.burn);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} burn decreased: value goes down by 1 and took ${entry?.value ?? 0} damage`,
        th: `${actor.name.th} "เผาไหม้" ลดลง 1 หน่วยและได้รับ ${entry?.value ?? 0} ความเสียหาย`,
      },
    };
  },
};
