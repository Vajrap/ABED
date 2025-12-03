import { Character } from "src/Entity/Character/Character";
import { L10N } from "src/InterFacesEnumsAndTypes/L10N";
import { DebuffDef, type AppenderOptions } from "../../type";
import { DebuffEnum } from "../../enum";

export const cursed = new DebuffDef({
    name: {
        en: "cursed",
        th: "ถูกสาป",
    },
    description: {
        en: "A curse that affects the target. The curse value decreases by 1 each turn.",
        th: "คำสาปที่ส่งผลต่อเป้าหมาย ค่าคำสาปลดลง 1 ในแต่ละเทิร์น",
    },
    appender: function (actor: Character, options: AppenderOptions): L10N {
        const { turnsAppending: value } = options;
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed);
        if (!entry) {
            actor.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.cursed, {
                value: value,
                counter: 0,
            });
        } else {
            entry.value += value;
        }
        
        return {
            en: `${actor.name.en} got cursed debuff: value goes up by ${value}`,
            th: `${actor.name.th} ได้รับ "ถูกสาป" ${value} หน่วย`,
        };
    },
    
    resolver: function (actor: Character): { canAct: boolean; content: L10N; } {
        const entry = actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed);
        if (entry) {
            if (entry.value > 0) {
                entry.value -= 1;
            }
        }
        if (entry && entry.value === 0) {
            actor.buffsAndDebuffs.debuffs.entry.delete(DebuffEnum.cursed);
        }

        return {
            canAct: true,
            content: {
                en: `${actor.name.en} cursed decreased: value goes down by 1`,
                th: `${actor.name.th} "ถูกสาป" ลดลง 1 หน่วย`,
            },
        };
    }
});