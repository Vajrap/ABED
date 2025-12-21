import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const wildInstinct = new BuffDef({
  name: {
    en: "Wild Instinct",
    th: "สัญชาตญาณดิบ",
  },
  description: {
    en: "Gain <FORMULA>.",
    th: "เพิ่ม <FORMULA>",
  },
  formula: "+2 STR, +2 AGI",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.wildInstinct);
    let isFirst = false;
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.wildInstinct, {
        value: value,
        counter: 0,
      });
      // Wild Instinct gives +2 STR and +2 AGI
      actor.attribute.mutateBattle("strength", 2);
      actor.attribute.mutateBattle("agility", 2);
      isFirst = true;
    } else {
      entry.value += value;
      // Keep the stat bonuses (they're already applied on first application)
    }

    return {
      en: `${actor.name.en} taps into Wild Instinct! +2 STR, +2 AGI`,
      th: `${actor.name.th} ปลดปล่อยสัญชาตญาณดิบ! +2 STR, +2 AGI`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.wildInstinct);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      // Remove stat bonuses when buff expires
      actor.attribute.mutateBattle("strength", -2);
      actor.attribute.mutateBattle("agility", -2);
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.wildInstinct);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} wild instinct decreased: value goes down by 1`,
        th: `${actor.name.th} "สัญชาตญาณดิบ" ลดลง 1 หน่วย`,
      },
    };
  },
});

