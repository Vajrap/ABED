import { clamp } from "../../../../Utils/clamp";

export class CharacterNeeds {
  mood: number;
  energy: number;
  satiety: number;

  constructor(data: Partial<CharacterNeeds> = {}) {
    this.mood = data.mood ?? 50;
    this.energy = data.energy ?? 50;
    this.satiety = data.satiety ?? 50;
  }

  set(partial: Partial<Pick<CharacterNeeds, "mood" | "energy" | "satiety">>) {
    if (partial.mood !== undefined) this.mood = clamp(partial.mood, 0, 100);
    if (partial.energy !== undefined)
      this.energy = clamp(partial.energy, 0, 100);
    if (partial.satiety !== undefined)
      this.satiety = clamp(partial.satiety, 0, 100);
    return this;
  }

  decrease(target: "mood" | "energy" | "satiety", value: number) {
    this[target] = clamp(this[target] - value, 0, 100);
  }

  increase(target: "mood" | "energy" | "satiety", value: number) {
    this[target] = clamp(this[target] + value, 0, 100);
  }

  getBonus(target: "mood" | "energy" | "satiety"): number {
    const targetValue = this[target];
    if (targetValue <= 20) {
      return -2;
    }
    if (targetValue <= 40) {
      return -1;
    }
    if (targetValue <= 60) {
      return 0;
    }
    if (targetValue <= 80) {
      return 1;
    }
    if (targetValue <= 100) {
      return 2;
    }
    return 0;
  }

  // Json Helper
  toJSON() {
    return { mood: this.mood, energy: this.energy, satiety: this.satiety };
  }
  static fromJSON(data: Partial<CharacterNeeds> = {}) {
    return new CharacterNeeds(data);
  }
}
