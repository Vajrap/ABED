import {
  ChaoticAlignmentMap,
  CharacterAlignmentEnum,
  EvilAlignmentMap,
  GoodAlignmentMap,
} from "../../../../InterFacesEnumsAndTypes/Enums";

export class CharacterAlignment {
  good: number = 0;
  evil: number = 0;
  constructor(data: { good?: number; evil?: number }) {
    this.good = data.good ?? 0;
    this.evil = data.evil ?? 0;
  }

  alignment(): CharacterAlignmentEnum {
    // 1. If both value >= 30, and spreading < 30 use Chaotic side Enum
    const diff = Math.abs(this.good - this.evil);
    if (this.good >= 30 && this.evil >= 30 && diff < 30) {
      // Chaotic
      return ChaoticAlignmentMap[turnMax(diff)];
    } else {
      if (this.good > this.evil) {
        // Good
        return GoodAlignmentMap[turnMax(this.good)];
      } else {
        // Evil
        return EvilAlignmentMap[turnMax(this.evil)];
      }
    }
  }
}

const turnMax = (val: number): 29 | 49 | 69 | 89 | 100 => {
  if (val < 30) return 29;
  if (val < 49) return 49;
  if (val < 69) return 69;
  if (val < 89) return 89;
  else return 100;
};
