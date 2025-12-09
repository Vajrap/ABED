import { clamp } from "../../../../Utils/clamp";

class CharacterNeed {
  // For need, the concept is a bit different from other thing with base
  // The Bonus was meant to be the cap on the lowest value of that need instead of 0;
  // The upper cap is 100, and the lower cap is 0;
  bonus: number;
  current: number;
  constructor(data: { bonus?: number; current?: number }) {
    this.bonus = data.bonus ?? 0;
    this.current = data.current ?? 50;
  }
  cap() {
    if (this.current < this.bonus) {this.current = this.bonus}
    if (this.current > 100) {this.current = 100}
  }

  inc(value: number) {
    this.current += value;
    this.cap();
  }

  dec(value: number) {
    this.current -= value;
    this.cap();
  }

  get modifier(): number {
    if (this.current <= 20) {
      return -2;
    }
    if (this.current <= 40) {
      return -1;
    }
    if (this.current <= 60) {
      return 0;
    }
    if (this.current <= 80) {
      return 1;
    }
    if (this.current <= 100) {
      return 2;
    }
    return 0;
  }

  toJSON() {
    return {
      bonus: this.bonus,
      current: this.current,
    };
  }
  static fromJSON(data: Partial<CharacterNeed> = {}) {
    return new CharacterNeed({ bonus: data.bonus ?? 0, current: data.current ?? 50 });
  }
}

export class CharacterNeeds {
  mood: CharacterNeed = new CharacterNeed({ bonus: 0, current: 50 });
  energy: CharacterNeed = new CharacterNeed({ bonus: 0, current: 50 });
  satiety: CharacterNeed = new CharacterNeed({ bonus: 0, current: 50 });

  constructor(data: Partial<CharacterNeeds> = {}) {
    // Handle both CharacterNeed instances and plain objects
    if (data.mood instanceof CharacterNeed) {
      this.mood = data.mood;
    } else if (data.mood && typeof data.mood === 'object') {
      this.mood = CharacterNeed.fromJSON(data.mood);
    } else {
      this.mood = new CharacterNeed({ bonus: 0, current: 50 });
    }

    if (data.energy instanceof CharacterNeed) {
      this.energy = data.energy;
    } else if (data.energy && typeof data.energy === 'object') {
      this.energy = CharacterNeed.fromJSON(data.energy);
    } else {
      this.energy = new CharacterNeed({ bonus: 0, current: 50 });
    }

    if (data.satiety instanceof CharacterNeed) {
      this.satiety = data.satiety;
    } else if (data.satiety && typeof data.satiety === 'object') {
      this.satiety = CharacterNeed.fromJSON(data.satiety);
    } else {
      this.satiety = new CharacterNeed({ bonus: 0, current: 50 });
    }
  }

  toJSON() {
    return {
      mood: this.mood instanceof CharacterNeed ? this.mood.toJSON() : this.mood,
      energy: this.energy instanceof CharacterNeed ? this.energy.toJSON() : this.energy,
      satiety: this.satiety instanceof CharacterNeed ? this.satiety.toJSON() : this.satiety,
    };
  }

  static fromJSON(data: Partial<CharacterNeeds> = {}) {
    return new CharacterNeeds({ mood: CharacterNeed.fromJSON(data.mood), energy: CharacterNeed.fromJSON(data.energy), satiety: CharacterNeed.fromJSON(data.satiety) });
  }

  incMood(value: number = 1) {
    this.mood.inc(value);
    return this;
  }
  decMood(value: number = 1) {
    this.mood.dec(value);
    return this;
  }
  incEnergy(value: number = 1) {
    this.energy.inc(value);
    return this;
  }
  decEnergy(value: number = 1) {
    this.energy.dec(value);
    return this;
  }
  incSatiety(value: number = 1) {
    this.satiety.inc(value);
    return this;
  }
  decSatiety(value: number = 1) {
    this.satiety.dec(value);
    return this;
  }
}
