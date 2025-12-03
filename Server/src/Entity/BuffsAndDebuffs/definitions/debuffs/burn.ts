import type { Character } from "src/Entity/Character/Character";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const burn = new DebuffDef({
  name: {
    en: "burn",
    th: "เผาไหม้",
  },
  description: {
    en: "Take fire damage equal to stack number each turn",
    th: "รับความเสียหายไฟเท่ากับจำนวนสแต็กแต่ละเทิร์น",
  },
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.burn);
    if (!entry) {
      actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.burn, {
        value: value,
        counter: 0,
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
    const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.burn);
    if (entry) {
      if (entry.value > 0) {
        actor.vitals.decHp(entry.value);
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.burn);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} burn decreased: value goes down by 1 and took ${entry?.value ?? 0} damage`,
        th: `${actor.name.th} "เผาไหม้" ลดลง 1 หน่วยและได้รับ ${entry?.value ?? 0} ความเสียหาย`,
      },
    };
  },
});
