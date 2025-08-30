import { clamp } from "../../../../Utils/clamp";

class Vital {
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
  constructor(data: { hp?: Vital; mp?: Vital; sp?: Vital }) {
    this.hp = data.hp ?? new Vital({});
    this.mp = data.mp ?? new Vital({});
    this.sp = data.sp ?? new Vital({});
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
    return { hp: this.hp.toJSON(), mp: this.mp.toJSON(), sp: this.sp.toJSON() };
  }

  static fromJSON(data: any = {}) {
    return new CharacterVitals({
      hp: Vital.fromJSON(data.hp),
      mp: Vital.fromJSON(data.mp),
      sp: Vital.fromJSON(data.sp),
    });
  }
}
