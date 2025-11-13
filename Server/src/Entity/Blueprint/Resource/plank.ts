import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { WoodId, PlankId } from "src/Entity/Item/Misc";
import { RefinementBlueprint } from "../Blueprint";

export const blueprintRefinePinePlank = new RefinementBlueprint(
  new Map([[WoodId.Pine, 1]]),
  PlankId.PinePlank,
  "carpentry",
  8,
  TierEnum.common,
);

export const blueprintRefineOakPlank = new RefinementBlueprint(
  new Map([[WoodId.Oak, 1]]),
  PlankId.OakPlank,
  "carpentry",
  8,
  TierEnum.common,
);

export const blueprintRefineMaplePlank = new RefinementBlueprint(
  new Map([[WoodId.Maple, 1]]),
  PlankId.MaplePlank,
  "carpentry",
  10,
  TierEnum.uncommon,
);

export const blueprintRefineIronwoodPlank = new RefinementBlueprint(
  new Map([[WoodId.Ironwood, 1]]),
  PlankId.IronwoodPlank,
  "carpentry",
  12,
  TierEnum.rare,
);

