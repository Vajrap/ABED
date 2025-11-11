import {
  BoneId,
  ClothId,
  GemId,
  IngotId,
  LeatherId,
  OreId,
  PlankId,
  RawGemId,
  ResourceId,
  SkinId,
  ThreadId,
  WoodId,
} from "../..";

type CraftMap = {
  damage: {
    p: number;
    m: number;
  };
  tags: string[];
};

const baseEntries: Array<[ResourceId, CraftMap]> = [
  [
    IngotId.CopperIngot,
    { damage: { p: 0, m: 1 }, tags: ["conductive", "soft", "common"] },
  ],
  [
    IngotId.TinIngot,
    { damage: { p: 0, m: 0 }, tags: ["soft", "alloy-base"] },
  ],
  [
    IngotId.IronIngot,
    { damage: { p: 1, m: 0 }, tags: ["durable", "sharp", "common"] },
  ],
  [
    IngotId.SilverIngot,
    { damage: { p: 0, m: 2 }, tags: ["holy", "conductive", "anti-undead"] },
  ],
  [
    IngotId.GoldIngot,
    { damage: { p: 0, m: 3 }, tags: ["noble", "soft", "high-magic-conductivity"] },
  ],
  [
    IngotId.BronzeIngot,
    { damage: { p: 1, m: 0 }, tags: ["balanced", "alloy", "durable"] },
  ],
  [
    IngotId.SteelIngot,
    { damage: { p: 2, m: 0 }, tags: ["strong", "tempered", "martial"] },
  ],
  [
    IngotId.ElectrumIngot,
    { damage: { p: 1, m: 3 }, tags: ["hybrid", "arcane-conductor", "rare"] },
  ],
  [
    IngotId.AethersteelIngot,
    { damage: { p: 2, m: 2 }, tags: ["planar-infused", "balanced", "epic"] },
  ],
  [
    IngotId.VoidforgedIngot,
    { damage: { p: 3, m: 3 }, tags: ["void", "lifedrain", "legendary"] },
  ],
];

const craftMap = new Map<ResourceId, CraftMap>(baseEntries);

const allResourceIds: ResourceId[] = [
  ...(Object.values(WoodId) as ResourceId[]),
  ...(Object.values(SkinId) as ResourceId[]),
  ...(Object.values(BoneId) as ResourceId[]),
  ...(Object.values(OreId) as ResourceId[]),
  ...(Object.values(IngotId) as ResourceId[]),
  ...(Object.values(PlankId) as ResourceId[]),
  ...(Object.values(LeatherId) as ResourceId[]),
  ...(Object.values(ThreadId) as ResourceId[]),
  ...(Object.values(ClothId) as ResourceId[]),
  ...(Object.values(GemId) as ResourceId[]),
  ...(Object.values(RawGemId) as ResourceId[]),
];

for (const id of allResourceIds) {
  if (!craftMap.has(id)) {
    craftMap.set(id, { damage: { p: 0, m: 0 }, tags: [] });
  }
}

export const resourceCraftMap = Object.fromEntries(craftMap) as Record<
  ResourceId,
  CraftMap
>;
