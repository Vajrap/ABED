export const roll(diceAmount: number) {

}


class Dice {
  face: number = 6;
  rolls: number[] = [];
  constructor(public amount: number){}

  d(face: number) {
    this.face = face;
    for (let i = 0; i < this.amount; i++) {
      this.rolls.push(Math.floor(Math.random() * this.face) + 1);
    }
    return this
  }


}
