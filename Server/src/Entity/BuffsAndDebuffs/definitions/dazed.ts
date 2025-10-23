import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { BuffsAndDebuffsDef } from "../type";
import { BuffsAndDebuffsEnum } from "../enum";

export const dazed: BuffsAndDebuffsDef = {
    name: {
        en: "dazed",
        th: "สับสน",
    },
    appender: function (actor: Character, value: number): L10N {
        const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.dazed);
        if (!entry) {
            actor.buffsAndDebuffs.entry.set(BuffsAndDebuffsEnum.dazed, {
                value: value,
                isPerm: false,
                permValue: 0,
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
        const entry = actor.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.dazed);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.battleStats.mutateBattle('pHIT', 2);
            actor.battleStats.mutateBattle('mHIT', 2);
            actor.buffsAndDebuffs.entry.delete(BuffsAndDebuffsEnum.dazed);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} dazed decreased: value goes down by 1`,
                th: `${actor.name.th} "สับสน" ลดลง 1 หน่วย`,
            },
        };
    }
}