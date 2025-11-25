import type { Character } from "src/Entity/Character/Character";
import { BuffDef } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { statMod } from "src/Utils/statMod";

export const duelingStance = new BuffDef({
  name: {
    en: "Dueling Stance",
    th: "ท่าดวล",
  },
  appender: function (
    actor: Character,
    value: number,
    isPerm: boolean,
    permValue: number,
  ): L10N {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.duelingStance);
    if (!entry) {
      actor.battleStats.mutateBattle('pHIT', 2);
      actor.battleStats.mutateBattle('mHIT', 2);
      actor.battleStats.mutateBattle('dodge', -2);
      if (isPerm) {
        actor.battleStats.mutateBattle('pCRT', 2);
        actor.battleStats.mutateBattle('mCRT', 2);
      }
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.duelingStance, {
        value: value,
        isPerm: isPerm,
        permValue: permValue,
      });
    } else {
      if (isPerm) {
        entry.isPerm = true;
        actor.battleStats.mutateBattle('pCRT', 2);
        actor.battleStats.mutateBattle('mCRT', 2);
      }
      entry.value += value;
      entry.permValue += permValue;
    }

    return {
      en: `${actor.name.en} adopts a focused dueling stance!`,
      th: `${actor.name.th} ใช้ท่าดวลที่มุ่งเน้น!`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.duelingStance);
    if (entry) {
      if (entry.value > 0) {
        entry.value -= 1;
      } else if (entry.value === 0) {
        actor.battleStats.mutateBattle('pHIT', -2);
        actor.battleStats.mutateBattle('mHIT', -2);
        actor.battleStats.mutateBattle('dodge', 2);
        if (entry.isPerm) {
          actor.battleStats.mutateBattle('pCRT', -2);
          actor.battleStats.mutateBattle('mCRT', -2);
        }
        actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.duelingStance);
      }
    }

    return {
      canAct: true,
      content: {
        en: `${actor.name.en} Dueling Stance duration decreased`,
        th: `${actor.name.th} "ท่าดวล" ลดลง`,
      },
    };
  },
});

