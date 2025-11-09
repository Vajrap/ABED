export function roll(diceAmount: number): Dice {
  return new Dice(diceAmount).d(6);
}

export function rollTwenty(): Dice {
  return new Dice(1).d(20);
}
class Dice {
  face: number = 6;
  rolls: number[] = [];
  constructor(public amount: number){}

  get total() {
    return this.rolls.reduce((acc, curr) => acc + curr, 0);
  }

  from() {
    return { amount: this.amount, faces: this.face };
  }

  highest(): number;
  highest(count: number): number[];
  highest(count?: number): number | number[] {
    if (count === undefined) {
      return Math.max(...this.rolls);
    }
    return [...this.rolls].sort((a, b) => b - a).slice(0, count);
  }

  lowest(): number;
  lowest(count: number): number[];
  lowest(count?: number): number | number[] {
    if (count === undefined) {
      return Math.min(...this.rolls);
    }
    return [...this.rolls].sort((a, b) => a - b).slice(0, count);
  }


  d(face: number) {
    if (this.amount < 1) throw new Error("Invalid dice amount");
    if (face < 1) throw new Error("Invalid face count");

    this.face = face;
    this.rolls = [];
    for (let i = 0; i < this.amount; i++) {
      this.rolls.push(Math.floor(Math.random() * this.face) + 1);
    }
    return this
  }

  adv() {
    const secondRoll = roll(this.amount).d(this.face);
    if (this.total > secondRoll.total) {
      return this;
    }
    return secondRoll;
  }

  dis() {
    const secondRoll = roll(this.amount).d(this.face);
    if (this.total < secondRoll.total) {
      return this;
    }
    return secondRoll;
  }

}