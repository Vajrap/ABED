import { clamp } from "src/Utils/clamp.ts";

export class Vital {
  base: number;
  bonus: number;
  current: number;
  constructor(data: { base?: number; bonus?: number; current?: number }) {
    this.base = data.base ?? 10;
    this.bonus = data.bonus ?? 0;
    this.current = data.current ?? this.max;
  }
  get max() {
    return Math.max(1, this.base + this.bonus);
  }

  setBase(n: number) {
    this.base = Math.max(0, n);
    this.current = clamp(this.current, 0, this.max);
    return this;
  }
  setBonus(n: number) {
    this.bonus = n;
    this.current = clamp(this.current, 0, this.max);
    return this;
  }
  setCurrent(n: number) {
    this.current = clamp(n, 0, this.max);
    return this;
  }

  addBase(n: number) {
    this.base = Math.max(1, this.base + n);
    this.current = clamp(this.current, 0, this.max);
    return this;
  }
  addBonus(n: number) {
    this.bonus += n;
    this.current = clamp(this.current, 0, this.max);
    return this;
  }

  inc(n = 1) {
    this.current = clamp(this.current + n, 0, this.max);
    return this;
  }
  dec(n = 1) {
    this.current = clamp(this.current - n, 0, this.max);
    return this;
  }

  toJSON() {
    return { base: this.base, bonus: this.bonus, current: this.current };
  }

  static fromJSON(data: Partial<Vital> = {}) {
    return new Vital({
      base: data.base,
      bonus: data.bonus,
      current: data.current,
    });
  }
}

export class CharacterVitals {
  hp: Vital;
  mp: Vital;
  sp: Vital;
  constructor(data: { hp?: Vital | any; mp?: Vital | any; sp?: Vital | any } = {}) {
    // Handle both Vital instances and plain objects
    if (data.hp instanceof Vital) {
      this.hp = data.hp;
    } else if (data.hp && typeof data.hp === 'object') {
      this.hp = Vital.fromJSON(data.hp);
    } else {
      this.hp = new Vital({});
    }

    if (data.mp instanceof Vital) {
      this.mp = data.mp;
    } else if (data.mp && typeof data.mp === 'object') {
      this.mp = Vital.fromJSON(data.mp);
    } else {
      this.mp = new Vital({});
    }

    if (data.sp instanceof Vital) {
      this.sp = data.sp;
    } else if (data.sp && typeof data.sp === 'object') {
      this.sp = Vital.fromJSON(data.sp);
    } else {
      this.sp = new Vital({});
    }
  }

  get isDead() {
    return this.hp.current <= 0;
  }
  incHp(n: number) {
    this.hp.inc(n);
    return this;
  }
  decHp(n: number) {
    this.hp.dec(n);
    return this;
  }
  incMp(n: number) {
    this.mp.inc(n);
    return this;
  }
  decMp(n: number) {
    this.mp.dec(n);
    return this;
  }
  incSp(n: number) {
    this.sp.inc(n);
    return this;
  }
  decSp(n: number) {
    this.sp.dec(n);
    return this;
  }

  toJSON() {
    return {
      hp: this.hp instanceof Vital ? this.hp.toJSON() : this.hp,
      mp: this.mp instanceof Vital ? this.mp.toJSON() : this.mp,
      sp: this.sp instanceof Vital ? this.sp.toJSON() : this.sp,
    };
  }

  static fromJSON(data: any = {}) {
    return new CharacterVitals({
      hp: Vital.fromJSON(data.hp),
      mp: Vital.fromJSON(data.mp),
      sp: Vital.fromJSON(data.sp),
    });
  }
}
