import { RefinementBlueprint } from "../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { LeatherId, SkinId } from "src/Entity/Item/Misc";

export const blueprintRefineLeather = new RefinementBlueprint(
  new Map([[SkinId.WolfPelt, 1]]),
  LeatherId.Leather,
  "tanning",
  8,
  TierEnum.common,
);

export const blueprintRefineFineLeather = new RefinementBlueprint(
  new Map([[SkinId.StagFur, 1]]),
  LeatherId.FineLeather,
  "tanning",
  9,
  TierEnum.uncommon,
);

export const blueprintRefineThickLeather = new RefinementBlueprint(
  new Map([[SkinId.BearHide, 1]]),
  LeatherId.ThickLeather,
  "tanning",
  9,
  TierEnum.uncommon,
);

export const blueprintRefineRuggedLeather = new RefinementBlueprint(
  new Map([[SkinId.ElephantHide, 1]]),
  LeatherId.RuggedLeather,
  "tanning",
  11,
  TierEnum.rare,
);

export const blueprintRefineScaledLeather = new RefinementBlueprint(
  new Map([[SkinId.CrocodileHide, 1]]),
  LeatherId.ScaledLeather,
  "tanning",
  11,
  TierEnum.rare,
);

export const blueprintRefineWyvernLeather = new RefinementBlueprint(
  new Map([[SkinId.WyvernScale, 1]]),
  LeatherId.WyvernLeather,
  "tanning",
  12,
  TierEnum.rare,
);

export const blueprintRefineDrakeLeather = new RefinementBlueprint(
  new Map([[SkinId.DrakeScale, 1]]),
  LeatherId.DrakeLeather,
  "tanning",
  13,
  TierEnum.epic,
);

export const blueprintRefineHydraLeather = new RefinementBlueprint(
  new Map([[SkinId.HydraSkin, 1]]),
  LeatherId.HydraLeather,
  "tanning",
  15,
  TierEnum.legendary,
);

export const blueprintRefineLeviathanLeather = new RefinementBlueprint(
  new Map([[SkinId.LeviathanScale, 1]]),
  LeatherId.LeviathanLeather,
  "tanning",
  15,
  TierEnum.legendary,
);

export const blueprintRefineFiendLeather = new RefinementBlueprint(
  new Map([[SkinId.FiendHide, 1]]),
  LeatherId.FiendLeather,
  "tanning",
  13,
  TierEnum.epic,
);

export const blueprintRefineAetherLeather = new RefinementBlueprint(
  new Map([[SkinId.AetherSkin, 1]]),
  LeatherId.AetherLeather,
  "tanning",
  13,
  TierEnum.epic,
);

export const blueprintRefineSpiritLeather = new RefinementBlueprint(
  new Map([[SkinId.SpiritHide, 1]]),
  LeatherId.SpiritLeather,
  "tanning",
  12,
  TierEnum.rare,
);

export const blueprintRefineYetiLeather = new RefinementBlueprint(
  new Map([[SkinId.YetiFur, 1]]),
  LeatherId.YetiLeather,
  "tanning",
  11,
  TierEnum.rare,
);

export const blueprintRefineSalamanderLeather = new RefinementBlueprint(
  new Map([[SkinId.SalamanderSkin, 1]]),
  LeatherId.SalamanderLeather,
  "tanning",
  12,
  TierEnum.rare,
);

export const blueprintRefineManticoreLeather = new RefinementBlueprint(
  new Map([[SkinId.ManticoreHide, 1]]),
  LeatherId.ManticoreLeather,
  "tanning",
  13,
  TierEnum.epic,
);

