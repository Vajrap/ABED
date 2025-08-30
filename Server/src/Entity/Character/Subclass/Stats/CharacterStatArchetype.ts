export class StatBlock {
  constructor(
    public base: number,
    public bonus: number,
    public battle: number,
    public exp: number,
  ) {}

  get total(): number {
    return this.base + this.bonus + this.battle;
  }

  static from(data: Partial<StatBlock>): StatBlock {
    return new StatBlock(
      data.base ?? 0,
      data.bonus ?? 0,
      data.battle ?? 0,
      data.exp ?? 0,
    );
  }
}

export class CharacterStatArchetype<T extends string> {
  protected readonly stats: Record<T, StatBlock>;
  private readonly keys: readonly T[];

  constructor(
    keys: readonly T[],
    initial?: Partial<Record<T, Partial<StatBlock>>>,
  ) {
    this.keys = keys;
    this.stats = {} as Record<T, StatBlock>;
    for (const key of keys) {
      this.stats[key] = StatBlock.from(initial?.[key] ?? {});
    }
  }

  setBase(attr: T, value: number): void {
    this.stats[attr].base = value;
  }

  applyBattleChange(attr: T, value: number): void {
    this.stats[attr].battle += value;
  }

  applyBonusChange(attr: T, value: number): void {
    this.stats[attr].bonus += value;
  }

  clearBattle(): this {
    for (const key of this.keys) {
      this.stats[key].battle = 0;
    }
    return this;
  }

  getTotal(attr: T): number {
    return this.stats[attr].total;
  }

  getStat(attr: T): StatBlock {
    return this.stats[attr];
  }

  toJSON(): Record<T, StatBlock> {
    return this.stats;
  }

  mutateBase(attr: T, value: number): void {
    this.stats[attr].base += value;
  }

  mutateBattle(attr: T, value: number): void {
    this.stats[attr].battle += value;
  }

  mutateBonus(attr: T, value: number): void {
    this.stats[attr].bonus += value;
  }
}
