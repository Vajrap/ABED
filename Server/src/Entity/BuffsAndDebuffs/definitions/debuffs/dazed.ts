import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const dazed = new DebuffDef({
    name: {
        en: "dazed",
        th: "สับสน",
    },
    description: {
        en: "Reduces physical and magical hit chance by 2. When the debuff expires, the penalties are removed.",
        th: "ลดโอกาสตีกายภาพและเวทมนตร์ 2 เมื่อดีบัฟหมดอายุ โทษจะถูกลบ",
    },
    formula: "pHIT -2, mHIT -2 (removed when debuff expires)",
    appender: function (actor: Character, options: AppenderOptions): L10N {
        const { turnsAppending: value } = options;
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.dazed);
        if (!entry) {
            actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.dazed, {
                value: value,
                counter: 0,
            });
            actor.battleStats.mutateBattle('pHIT', -2);
            actor.battleStats.mutateBattle('mHIT', -2);
        } else {
            entry.value += value;
        }
        
        return {
            en: `${actor.name.en} got dazed buff: value goes up by ${value}`,
            th: `${actor.name.th} ได้รับ "สับสน" ${value} หน่วย`,
        };
    },
    
    resolver: function (actor: Character): { canAct: boolean; content: L10N; } {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.dazed);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.battleStats.mutateBattle('pHIT', 2);
            actor.battleStats.mutateBattle('mHIT', 2);
            actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.dazed);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} dazed decreased: value goes down by 1`,
                th: `${actor.name.th} "สับสน" ลดลง 1 หน่วย`,
            },
        };
    }
});