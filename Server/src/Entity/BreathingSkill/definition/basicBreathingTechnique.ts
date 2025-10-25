import { BreathingSkill } from "../BreathinglSkill";
import { BreathingSkillId } from "../enum";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import Report from "src/Utils/Reporter";
import { getCharacter } from "src/Utils/getCharacter";

export const basicBreathingTechnique = new BreathingSkill({
    id: BreathingSkillId.basicBreathingTechnique,
    name: {
        en: "Basic Breathing Technique, recover small amount of SP and MP every turn",
        th: "เทคนิคการหายใจพื้นฐาน ฟื้นฟู SP และ MP เล็กน้อยทุกเทิร์น",
    },
    type: "water",
    tier: TierEnum.common,
    activateEffect: {
        on: (selfId, skillLevel) => {
            const character = getCharacter(selfId);
            if (character === undefined) {
                Report.error(`Character with ID ${selfId} not found`);
                return;
            }
            // When activated - basic breathing technique starts
            console.log(`${character.name.en} activates Basic Breathing Technique`);
        },
        off: (selfId, skillLevel) => {
            const character = getCharacter(selfId);
            if (character === undefined) {
                Report.error(`Character with ID ${selfId} not found`);
                return;
            }
            // When deactivated - basic breathing technique ends
            console.log(`${character.name.en} deactivates Basic Breathing Technique`);
        },
        attacking: (self, target, skillLevel) => {
            // Effect when attacking - basic breathing provides slight focus
            // Could add small accuracy bonus or similar
        },
        attacked: (self, attacker, skillLevel) => {
            // Effect when attacked - basic breathing provides slight calm
            // Could add small defense bonus or similar
        },
        takingTurn: (selfId, skillLevel) => {
            const character = getCharacter(selfId);
            if (character === undefined) {
                Report.error(`Character with ID ${selfId} not found`);
                return;
            }
            // Effect when taking turn - basic breathing provides slight stamina recovery
            // Small SP recovery per turn
            const spRecovery = Math.floor(skillLevel * 0.5) + 1;
            const mpRecovery = Math.floor(skillLevel * 0.5) + 1;
            character.vitals.incSp(spRecovery);
            character.vitals.incMp(mpRecovery);
        },
    },
});