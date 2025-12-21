import type { Character } from "src/Entity/Character/Character";
import { BuffDef, type AppenderOptions } from "../../type";
import { BuffEnum } from "../../enum";
import type { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { statMod } from "src/Utils/statMod";
import { roll } from "src/Utils/Dice";

export const fortressStance = new BuffDef({
  name: {
    en: "Fortress Stance",
    th: "ท่าป้อมปราการ",
  },
  description: {
    en: "Grants +3 pDEF and +2 mDEF, -3 pATK -3 mATK. Turn is skipped, but health is restored every turn for 1d6 + VIT mod HP.",
    th: "ให้ +3 pDEF และ +2 mDEF, -3 pATK -3 mATK เทิร์นจะถูกข้าม แต่จะฟื้นฟู HP ทุกเทิร์น 1d6 + VIT mod HP",
  },
  formula: "pDEF +3, mDEF +2, pATK -3, mATK -3, Skip turn, Restore 1d6 + VIT mod HP per turn",
  appender: function (
    actor: Character,
    options: AppenderOptions,
  ): L10N {
    const { turnsAppending: value } = options;
    
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.fortressStance);
    if (!entry) {
      actor.buffsAndDebuffs.buffs.entry.set(BuffEnum.fortressStance, {
        value,
        counter: 0,
      });
      // Apply stat bonuses/penalties
      actor.battleStats.mutateBattle("pDEF", 3);
      actor.battleStats.mutateBattle("mDEF", 2);
      actor.battleStats.mutateBattle("pATK", -3);
      actor.battleStats.mutateBattle("mATK", -3);
    } else {
      entry.value += value;
    }

    return {
      en: `${actor.name.en} enters Fortress Stance! (+3 pDEF, +2 mDEF, -3 pATK, -3 mATK, turn skipped, health restored per turn)`,
      th: `${actor.name.th} เข้าท่าป้อมปราการ! (+3 pDEF, +2 mDEF, -3 pATK, -3 mATK, ข้ามเทิร์น, ฟื้นฟู HP ทุกเทิร์น)`,
    };
  },

  resolver: function (actor: Character): { canAct: boolean; content: L10N } {
    let removed = false;
    const entry = actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.fortressStance);
    if (entry) {
      if (entry.value > 0) {
        // Restore health every turn: 1d6 + VIT mod
        const healAmount = actor.roll({
          amount: 1,
          face: 6,
          stat: "vitality",
        });
        actor.vitals.incHp(healAmount);
        
        entry.value -= 1;
        
        // Remove if duration reaches 0
        if (entry.value === 0) {
          // Remove stat bonuses/penalties
          actor.battleStats.mutateBattle("pDEF", -3);
          actor.battleStats.mutateBattle("mDEF", -2);
          actor.battleStats.mutateBattle("pATK", 3);
          actor.battleStats.mutateBattle("mATK", 3);
          actor.buffsAndDebuffs.buffs.entry.delete(BuffEnum.fortressStance);
          removed = true;
        }
        
        // Turn is skipped (canAct = false) but health is restored
        return {
          canAct: false, // Skip turn
          content: {
            en: `${actor.name.en} maintains Fortress Stance and restored ${healAmount} HP! Turn skipped.${removed ? " Stance ended." : ""}`,
            th: `${actor.name.th} รักษาท่าป้อมปราการและฟื้นฟู ${healAmount} HP! ข้ามเทิร์น${removed ? " ท่าสิ้นสุดลงแล้ว" : ""}`,
          },
        };
      }
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

