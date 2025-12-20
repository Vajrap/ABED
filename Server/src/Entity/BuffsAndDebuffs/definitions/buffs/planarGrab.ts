import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const planarGrab = new BuffDef({
  name: {
    en: "Planar Grab",
    th: "คว้าแรงระนาบ",
  },
  description: {
    en: "Required for ThreadBacklash skill. Remove after using ThreadBacklash.",
    th: "จำเป็นสำหรับทักษะ ThreadBacklash ลบออกหลังใช้ ThreadBacklash",
  },
  formula: "Required for ThreadBacklash",
  appender: function (actor: Character, options: AppenderOptions): L10N {
    const { turnsAppending: value } = options;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarGrab);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.planarGrab, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gained Planar Grab buff!`,
      th: `${actor.name.th} ได้รับการคว้าแรงระนาบ!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    // PlanarGrab doesn't decrease automatically - it persists until ThreadBacklash is used
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.planarGrab);
    if (entry && entry.value === 0) {
      actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.planarGrab);
    }

    return {
      canAct: true,
      content: {
        en: ``,
        th: ``,
      },
    };
  },
});

