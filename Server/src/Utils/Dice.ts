export function roll(amount: number) {
  if (amount < 1) throw new Error("Invalid amount");

  return {
    d: (faces: number) => {
      if (faces < 1) throw new Error("Invalid face");

      const doRoll = (seed?: number): DiceRollResult => {
        const rng = seed !== undefined ? seededRNG(seed) : Math.random;
        const rolls = Array.from(
          { length: amount },
          () => Math.floor(rng() * faces) + 1,
        );
        return new DiceRollResult(rolls, { amount, faces });
      };

      // Roll immediately with no seed
      const result = doRoll();

      // Attach .seed to the result
      return Object.assign(result, {
        seed: (s: number) => doRoll(s),
      });
    },
  };
}

export function rollTwenty(seed?: number): DiceRollResult {
  let res = roll(1).d(20);
  if (seed) res.seed(seed);
  return res;
}

class DiceRollResult {
  rolls: number[];
  from: { amount: number; faces: number };
  constructor(rolls: number[], from: { amount: number; faces: number }) {
    this.rolls = rolls;
    this.from = from;
  }

  get total(): number {
    return this.rolls.reduce((acc, curr) => acc + curr, 0);
  }

  highest(): number;
  highest(count: number): number[];
  highest(count?: number): number | number[] {
    if (count === undefined) {
      return Math.max(...this.rolls);
    }
    return this.rolls.sort((a, b) => b - a).slice(0, count);
  }

  lowest(): number;
  lowest(count: number): number[];
  lowest(count?: number): number | number[] {
    if (count === undefined) {
      return Math.min(...this.rolls);
    }
    return this.rolls.sort((a, b) => a - b).slice(0, count);
  }

  adv(): DiceRollResult {
    const secondRoll = roll(this.from.amount).d(this.from.faces);
    const chosen = this.total > secondRoll.total ? this : secondRoll;
    return chosen;
  }

  dis(): DiceRollResult {
    const secondRoll = roll(this.from.amount).d(this.from.faces);
    const chosen = this.total < secondRoll.total ? this : secondRoll;
    return chosen;
  }
}

function seededRNG(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}
