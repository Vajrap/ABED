import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";

export const battleHardened = new BuffDef({
  name: {
    en: "Battle Hardened",
    th: "แข็งแกร่งจากสงคราม",
  },
  description: {
    en: "Grants +2 pDEF. When attacked, Rage duration is extended by 1 turn.",
    th: "ให้ +2 pDEF เมื่อถูกโจมตี ระยะเวลา Rage จะขยายออกไป 1 เทิร์น",
  },
  formula: "pDEF +2, extends Rage on taking damage",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.battleHardened);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.battleHardened, {
        value: value,
        counter: 0,
      });
      actor.battleStats.mutateBonus("pDEF", 2);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} gains Battle Hardened for ${value} turn(s)! (+2 pDEF)`,
      th: `${actor.name.th} ได้รับ Battle Hardened เป็นเวลา ${value} เทิร์น! (+2 pDEF)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.battleHardened);
    
    if (entry && entry.value > 0) {
      entry.value -= 1;

      // Remove if duration reaches 0
      if (entry.value === 0) {
        actor.battleStats.mutateBonus("pDEF", -2);
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.battleHardened);
        return {
          canAct: true,
          content: {
            en: `${actor.name.en}'s Battle Hardened expired.`,
            th: `${actor.name.th} Battle Hardened หมดอายุ`,
          },
        };
      }

      return {
        canAct: true,
        content: {
          en: ``,
          th: ``,
        },
      };
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

