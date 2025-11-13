import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

export const difficultyTable: Record<TierEnum, number> = {
  [TierEnum.common]: 6,
  [TierEnum.uncommon]: 8,
  [TierEnum.rare]: 10,
  [TierEnum.epic]: 12,
  [TierEnum.legendary]: 18,
  [TierEnum.unique]: 20,
  [TierEnum.divine]: 22,
  [TierEnum.primordial]: 25,
};