import { GemCuttingBlueprint } from "../Blueprint";
import { RawGemId } from "src/Entity/Item/Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

export const blueprintCutRoughGem = new GemCuttingBlueprint(
  new Map([[RawGemId.RoughGem, 1]]),
  "jewelry",
  12,
  TierEnum.common,
  [
    { min: 11, max: 15, stage: "flawed" },
    { min: 16, max: 18, stage: "polished" },
    { min: 19, max: 21, stage: "brilliant" },
    { min: 22, max: 100, stage: "perfect" },
  ],
);

