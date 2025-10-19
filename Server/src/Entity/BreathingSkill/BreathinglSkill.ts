import type { ElementKey } from "../../InterFacesEnumsAndTypes/Enums";
import type { L10N } from "../../InterFacesEnumsAndTypes/L10N";
import type { TierEnum } from "../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../Character/Character";
import type { BreathingSkillId } from "./enum";

export class BreathingSkill {
  id: BreathingSkillId;
  name: L10N;
  type: ElementKey;
  tier: TierEnum;

  // Active / Deactive will be called when player decided to put the internal into internal skill slot (might need to change name into breathing technique)
  activateEffect: {
    on: (self: Character, skillLevel: number) => void;
    off: (self: Character, skillLevel: number) => void;
    // Effect on when Attacking and when Attacker will be hooked into the battle steps function
    attacking: (self: Character, target: Character, skillLevel: number) => void;
    attacked: (
      self: Character,
      attacker: Character,
      skillLevel: number,
    ) => void;
    takingTurn: (self: Character, skillLevel: number) => void;
  };

  constructor(data: {
    id: BreathingSkillId;
    name: L10N;
    type: ElementKey;
    tier: TierEnum;
    activateEffect: {
      on: (self: Character, skillLevel: number) => void;
      off: (self: Character, skillLevel: number) => void;
      attacking: (
        self: Character,
        target: Character,
        skillLevel: number,
      ) => void;
      attacked: (
        self: Character,
        attacker: Character,
        skillLevel: number,
      ) => void;
      takingTurn: (self: Character, skillLevel: number) => void;
    };
  }) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.tier = data.tier;
    this.activateEffect = data.activateEffect;
  }
}
