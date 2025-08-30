import { CharacterAlignmentEnum } from "../../../../InterFacesEnumsAndTypes/Enums";

export class CharacterAlignment {
  law: number = 0;
  chaos: number = 0;
  good: number = 0;
  evil: number = 0;
  constructor(data:{
    law?: number,
    chaos?: number,
    good?: number,
    evil?: number,
  }) {
    this.law = data.law ?? 0;
    this.chaos = data.chaos ?? 0;
    this.good = data.good ?? 0;
    this.evil = data.evil ?? 0;
  }

  alignment(): CharacterAlignmentEnum {
    let lawChaos: "LAWFUL" | "NEUTRAL" | "CHAOTIC" = "NEUTRAL";
    let goodEvil: "GOOD" | "NEUTRAL" | "EVIL" = "NEUTRAL";

    if (this.law - this.chaos > 10) {
      lawChaos = "LAWFUL";
    } else if (this.chaos - this.law > 10) {
      lawChaos = "CHAOTIC";
    }

    if (this.good - this.evil > 10) {
      goodEvil = "GOOD";
    } else if (this.evil - this.good > 10) {
      goodEvil = "EVIL";
    }

    const alignmentKey =
      `${lawChaos}_${goodEvil}` as keyof typeof CharacterAlignmentEnum;

    if (!(alignmentKey in CharacterAlignmentEnum)) {
      throw new Error(`Invalid alignment: ${alignmentKey}`);
    }

    return CharacterAlignmentEnum[alignmentKey];
  }
}
