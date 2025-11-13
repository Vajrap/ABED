import { RefinementBlueprint } from "../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ClothId, ThreadId } from "src/Entity/Item/Misc";

export const blueprintWeaveLinenCloth = new RefinementBlueprint(
  new Map([
    [ThreadId.LinenThread, 2],
  ]),
  ClothId.LinenCloth,
  "tailoring",
  8,
  TierEnum.common,
);

export const blueprintWeaveCottonCloth = new RefinementBlueprint(
  new Map([[ThreadId.CottonThread, 2]]),
  ClothId.CottonCloth,
  "tailoring",
  8,
  TierEnum.common,
);

export const blueprintWeaveWoolCloth = new RefinementBlueprint(
  new Map([[ThreadId.WoolThread, 2]]),
  ClothId.WoolCloth,
  "tailoring",
  9,
  TierEnum.uncommon,
);

export const blueprintWeaveSilkCloth = new RefinementBlueprint(
  new Map([[ThreadId.SilkThread, 2]]),
  ClothId.SilkCloth,
  "tailoring",
  11,
  TierEnum.rare,
);

export const blueprintWeaveSpiderSilkCloth = new RefinementBlueprint(
  new Map([[ThreadId.SpiderSilk, 2]]),
  ClothId.SpiderSilkCloth,
  "tailoring",
  11,
  TierEnum.rare,
);

export const blueprintWeaveYetiCloth = new RefinementBlueprint(
  new Map([[ThreadId.YetiThread, 2]]),
  ClothId.YetiCloth,
  "tailoring",
  10,
  TierEnum.uncommon,
);

export const blueprintWeavePhoenixCloth = new RefinementBlueprint(
  new Map([[ThreadId.PhoenixThread, 2]]),
  ClothId.PhoenixCloth,
  "tailoring",
  14,
  TierEnum.epic,
);

export const blueprintWeaveSpiritCloth = new RefinementBlueprint(
  new Map([[ThreadId.SpiritThread, 2]]),
  ClothId.SpiritCloth,
  "tailoring",
  12,
  TierEnum.rare,
);

export const blueprintWeaveAetherweave = new RefinementBlueprint(
  new Map([[ThreadId.AetherThread, 2]]),
  ClothId.Aetherweave,
  "tailoring",
  14,
  TierEnum.epic,
);

export const blueprintWeaveFiendcloth = new RefinementBlueprint(
  new Map([
    [ThreadId.SalamanderThread, 1],
    [ThreadId.SpiritThread, 1],
  ]),
  ClothId.Fiendcloth,
  "tailoring",
  14,
  TierEnum.epic,
);

export const blueprintWeaveFluxweaveCloth = new RefinementBlueprint(
  new Map([[ThreadId.FluxWeave, 2]]),
  ClothId.FluxweaveCloth,
  "tailoring",
  12,
  TierEnum.rare,
);

export const blueprintWeaveDragonskin = new RefinementBlueprint(
  new Map([
    [ThreadId.AetherThread, 1],
    [ThreadId.PhoenixThread, 1],
  ]),
  ClothId.DragonskinWeave,
  "tailoring",
  15,
  TierEnum.legendary,
);

export const blueprintWeaveLeviathanLining = new RefinementBlueprint(
  new Map([
    [ThreadId.YetiThread, 1],
    [ThreadId.SpiritThread, 1],
  ]),
  ClothId.LeviathanLining,
  "tailoring",
  15,
  TierEnum.legendary,
);

export const blueprintWeaveHydraWeave = new RefinementBlueprint(
  new Map([
    [ThreadId.SalamanderThread, 1],
    [ThreadId.WoolThread, 1],
  ]),
  ClothId.HydraWeave,
  "tailoring",
  15,
  TierEnum.legendary,
);

