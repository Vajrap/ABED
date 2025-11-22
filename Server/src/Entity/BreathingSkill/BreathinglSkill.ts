import type { ElementKey } from "../../InterFacesEnumsAndTypes/Enums";
import type { L10N } from "../../InterFacesEnumsAndTypes/L10N";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { BreathingSkillId } from "./enum";

export class BreathingSkill {
  id: BreathingSkillId;
  name: L10N;
  type: ElementKey;
  tier: TierEnum;

  // Active / Deactive will be called when player decided to put the internal into internal skill slot (might need to change name into breathing technique)
  activateEffect: {
    on: (selfId: string, skillLevel: number) => void;
    off: (selfId: string, skillLevel: number) => void;
    // Effect on when Attacking and when Attacker will be hooked into the battle steps function
    attacking: (selfId: string, targetId: string, skillLevel: number, damageObj: {damage: number, hit: number, crit: number}) => void;
    attacked: (
      selfId: string,
      attackerId: string,
      skillLevel: number,
      damageObj: {damage: number, hit: number, crit: number}
    ) => void;
    takingTurn: (selfId: string, skillLevel: number) => void;
  };

  constructor(data: {
    id: BreathingSkillId;
    name: L10N;
    type: ElementKey;
    tier: TierEnum;
    activateEffect: {
      on: (selfId: string, skillLevel: number) => void;
      off: (selfId: string, skillLevel: number) => void;
      attacking: (
        selfId: string,
        targetId: string,
        skillLevel: number,
      ) => void;
      attacked: (
        selfId: string,
        attackerId: string,
        skillLevel: number,
        damageObj: {damage: number, hit: number, crit: number}
      ) => void;
      takingTurn: (selfId: string, skillLevel: number) => void;
    };
  }) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.tier = data.tier;
    this.activateEffect = data.activateEffect;
  }
}
