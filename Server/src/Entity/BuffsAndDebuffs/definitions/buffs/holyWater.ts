import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const holyWater = new BuffDef({
  name: {
    en: "Holy Water",
    th: "น้ำศักดิ์สิทธิ์",
  },
  description: {
    en: "Weapon attacks deal additional holy damage.",
    th: "การโจมตีด้วยอาวุธสร้างความเสียหายศักดิ์สิทธิ์เพิ่มเติม",
  },
  formula: "Weapon attacks deal additional holy damage",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;

    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.holyWater);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.holyWater, {
        value: value,
        counter: 0,
      });
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} weapon is blessed with Holy Water for ${value} turn(s)!`,
      th: `${actor.name.th} อาวุธได้รับน้ำศักดิ์สิทธิ์เป็นเวลา ${value} เทิร์น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.holyWater);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      }
      if (entry.value === 0) {
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.holyWater);
      }
    }

    return {
      canAct: true,
      content: {
        en: entry && entry.value > 0 ? `${actor.name.en} Holy Water duration decreased` : ``,
        th: entry && entry.value > 0 ? `${actor.name.th} น้ำศักดิ์สิทธิ์ลดลง` : ``,
      },
    };
  },
});

