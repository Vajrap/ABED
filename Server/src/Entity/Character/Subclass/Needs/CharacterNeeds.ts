import { clamp } from "../../../../Utils/clamp";

export class CharacterNeeds {
  mood: number;
  energy: number;
  satiety: number;

  constructor(data: Partial<CharacterNeeds> = {}) {
    this.mood    = data.mood    ?? 50;
    this.energy  = data.energy  ?? 50;
    this.satiety = data.satiety ?? 50;
  }

  add(partial: Partial<Pick<CharacterNeeds, "mood" | "energy" | "satiety">>) {
    if (partial.mood    !== undefined) this.mood    = clamp(this.mood    + partial.mood,    0, 100);
    if (partial.energy  !== undefined) this.energy  = clamp(this.energy  + partial.energy,  0, 100);
    if (partial.satiety !== undefined) this.satiety = clamp(this.satiety + partial.satiety, 0, 100);
    return this;
  }

  set(partial: Partial<Pick<CharacterNeeds, "mood" | "energy" | "satiety">>) {
    if (partial.mood    !== undefined) this.mood    = clamp(partial.mood,    0, 100);
    if (partial.energy  !== undefined) this.energy  = clamp(partial.energy,  0, 100);
    if (partial.satiety !== undefined) this.satiety = clamp(partial.satiety, 0, 100);
    return this;
  }

  tick({ mood = 0, energy = 0, satiety = 0 }: { mood?: number; energy?: number; satiety?: number } = {}) {
    return this.add({ mood, energy, satiety });
  }

  // Json Helper
  toJSON() {
    return { mood: this.mood, energy: this.energy, satiety: this.satiety };
  }
  static fromJSON(data: Partial<CharacterNeeds> = {}) {
    return new CharacterNeeds(data);
  }
}
