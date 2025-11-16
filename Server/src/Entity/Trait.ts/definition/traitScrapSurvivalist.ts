import {Trait} from "src/Entity/Trait.ts";
import {TraitEnum} from "src/Entity/Trait.ts/enum.ts";

export const traitScrapSurvivalist = new Trait({
    id: TraitEnum.ScrapSurvivalist,
    name: {
        en: "Scrap Survivalist",
        th: "เอาตัวรอด",
    },
    description: {
        en: "I'm not dying, just repurpose my wounds: Before being attacked, will restore hp equal to the stack of this trait, but not more than the damage taken.",
        th: "ข้าไม่เจ็บ!: ก่อนถูกโจมตีจะกัดฟันแน่น เกร็งตัว ฟื้นฟูพลังชีวิตเท่ากับจำนวนชั้นของ trait นี้ แต่ไม่เกินความเสียหายที่จะได้รับ",
    },
    onTakingDamage: (actor, attacker, damageObject, value, finalDamage) => {
        if (finalDamage <= 0 || value <= 0) return;

        const healAmount = Math.min(value, finalDamage);
        actor.vitals.incHp(healAmount);
    }
})