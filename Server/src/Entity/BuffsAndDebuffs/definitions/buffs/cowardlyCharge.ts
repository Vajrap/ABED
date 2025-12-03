import type { Character } from "src/Entity/Character/Character";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";

export const cowardlyCharge = new BuffDef({
  name: {
    en: "cowardlyCharge",
    th: "โจมตีแบบขี้ขลาด",
  },
  description: {
    en: "Increases <FORMULA>.",
    th: "เพิ่ม <FORMULA>",
  },
  formula: "pATK +2, mATK +2",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.cowardlyCharge);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.cowardlyCharge, {
        value: value,
        counter: 0,
      });
      // Add +2 pAtk and +2 mAtk when first applied
      actor.battleStats.mutateBonus("pATK", 2);
      actor.battleStats.mutateBonus("mATK", 2);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} got cowardly charge buff: pAtk +2, mAtk +2 for ${value} turns`,
      th: `${actor.name.th} ได้รับ "โจมตีแบบขี้ขลาด": pAtk +2, mAtk +2 เป็นเวลา ${value} เทิร์น`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.cowardlyCharge);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      // Remove stat bonuses when buff expires
      actor.battleStats.mutateBonus("pATK", -2);
      actor.battleStats.mutateBonus("mATK", -2);
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.cowardlyCharge);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} cowardly charge decreased: duration goes down by 1 turn`,
        th: `${actor.name.th} "โจมตีแบบขี้ขลาด" ลดลง 1 เทิร์น`,
      },
    };
  },
});

