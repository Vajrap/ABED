import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffEnum } from "../../enum";
import { BuffDef, type AppenderOptions } from "../../type";

export const taunt = new BuffDef({
  name: {
    en: "taunt",
    th: "ยั่วยุ",
  },
  description: {
    en: "Increases physical defense by 2. When the buff expires, the defense bonus is removed.",
    th: "เพิ่มพลังป้องกันกายภาพ 2 เมื่อบัฟหมดอายุ โบนัสป้องกันจะถูกลบ",
  },
  formula: "pDEF +2 (removed when buff expires)",
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.taunt, {
        value: value,
        counter: 0,
      });
      actor.battleStats.mutateBonus("pDEF", 2);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got taunt buff: value goes up by ${value}`,
      th: `${actor.name.th} ได้รับ "ยั่วยุ" ${value} หน่วย`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.taunt);
      actor.battleStats.mutateBonus("pDEF", -2);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} taunt decreased: value goes down by 1`,
        th: `${actor.name.th} "ยั่วยุ" ลดลง 1 หน่วย`,
      },
    };
  },
});
