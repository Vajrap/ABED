import type { Character } from "src/Entity/Character/Character";
import type { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const cowardlyCharge: BuffsAndDebuffsDef = {
  name: {
    en: "cowardlyCharge",
    th: "โจมตีแบบขี้ขลาด",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.cowardlyCharge);
    if (!entry) {
      actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.cowardlyCharge, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
      // Add +2 pAtk and +2 mAtk when first applied
      actor.battleStats.mutateBonus("pATK", 2);
      actor.battleStats.mutateBonus("mATK", 2);
    } else {
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} got cowardly charge buff: pAtk +2, mAtk +2 for ${value} turns`,
      th: `${actor.name.th} ได้รับ "โจมตีแบบขี้ขลาด": pAtk +2, mAtk +2 เป็นเวลา ${value} เทิร์น`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.cowardlyCharge);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
    }
    if (entry && entry.value === 0) {
      // Remove stat bonuses when buff expires
      actor.battleStats.mutateBonus("pATK", -2);
      actor.battleStats.mutateBonus("mATK", -2);
      actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.cowardlyCharge);
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} cowardly charge decreased: duration goes down by 1 turn`,
        th: `${actor.name.th} "โจมตีแบบขี้ขลาด" ลดลง 1 เทิร์น`,
      },
    };
  },
};

