import { RefinementBlueprint } from "../Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { ThreadId, SkinId, IngotId } from "src/Entity/Item/Misc";

export const blueprintSpinWoolThread = new RefinementBlueprint(
  new Map([[SkinId.GoatHide, 1]]),
  ThreadId.WoolThread,
  "weaving",
  8,
  TierEnum.common,
);

export const blueprintSpinLinenThread = new RefinementBlueprint(
  new Map([[SkinId.StagFur, 1]]),
  ThreadId.LinenThread,
  "weaving",
  8,
  TierEnum.uncommon,
);

export const blueprintSpinSilkThread = new RefinementBlueprint(
  new Map([[SkinId.GriffonFeatheredHide, 1]]),
  ThreadId.SilkThread,
  "weaving",
  10,
  TierEnum.rare,
);

export const blueprintSpinCottonThread = new RefinementBlueprint(
  new Map([[SkinId.DeerHide, 1]]),
  ThreadId.CottonThread,
  "weaving",
  8,
  TierEnum.common,
);

export const blueprintSpinSpiderSilkThread = new RefinementBlueprint(
  new Map([[SkinId.Chitin, 1]]),
  ThreadId.SpiderSilk,
  "weaving",
  11,
  TierEnum.rare,
);

export const blueprintSpinYetiThread = new RefinementBlueprint(
  new Map([[SkinId.YetiFur, 1]]),
  ThreadId.YetiThread,
  "weaving",
  11,
  TierEnum.uncommon,
);

export const blueprintSpinPhoenixThread = new RefinementBlueprint(
  new Map([[SkinId.PhoenixFeatheredHide, 1]]),
  ThreadId.PhoenixThread,
  "weaving",
  13,
  TierEnum.epic,
);

export const blueprintSpinSalamanderThread = new RefinementBlueprint(
  new Map([[SkinId.SalamanderSkin, 1]]),
  ThreadId.SalamanderThread,
  "weaving",
  12,
  TierEnum.rare,
);

export const blueprintSpinSpiritThread = new RefinementBlueprint(
  new Map([[SkinId.SpiritHide, 1]]),
  ThreadId.SpiritThread,
  "weaving",
  12,
  TierEnum.rare,
);

export const blueprintSpinAetherThread = new RefinementBlueprint(
  new Map([[SkinId.AetherSkin, 1]]),
  ThreadId.AetherThread,
  "weaving",
  13,
  TierEnum.epic,
);

export const blueprintSpinSteamspunFiber = new RefinementBlueprint(
  new Map([[IngotId.SteelIngot, 1]]),
  ThreadId.SteamspunFiber,
  "tinkering",
  11,
  TierEnum.uncommon,
);

export const blueprintSpinFluxWeave = new RefinementBlueprint(
  new Map([[IngotId.ElectrumIngot, 1]]),
  ThreadId.FluxWeave,
  "electrics",
  12,
  TierEnum.rare,
);

