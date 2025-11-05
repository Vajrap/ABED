import { BoneId, GemId, IngotId, LeatherId, OreId, PlankId, RefinedResourceID, ResourceId, SkinId, ThreadId, WoodId } from "../..";

type CraftMap = {
  damage: {
    p: number;
    m: number;
  };
  tags: string[];
};

export const resourceCraftMap: Record<ResourceId, CraftMap> = {
  [IngotId.CopperIngot]: {
    damage: { p: 0, m: 1 },
    tags: ["conductive", "soft", "common"],
  },
  [IngotId.TinIngot]: {
    damage: { p: 0, m: 0 },
    tags: ["soft", "alloy-base"],
  },
  [IngotId.IronIngot]: {
    damage: { p: 1, m: 0 },
    tags: ["durable", "sharp", "common"],
  },
  [IngotId.SilverIngot]: {
    damage: { p: 0, m: 2 },
    tags: ["holy", "conductive", "anti-undead"],
  },
  [IngotId.GoldIngot]: {
    damage: { p: 0, m: 3 },
    tags: ["noble", "soft", "high-magic-conductivity"],
  },
  [IngotId.BronzeIngot]: {
    damage: { p: 1, m: 0 },
    tags: ["balanced", "alloy", "durable"],
  },
  [IngotId.SteelIngot]: {
    damage: { p: 2, m: 0 },
    tags: ["strong", "tempered", "martial"],
  },
  [IngotId.ElectrumIngot]: {
    damage: { p: 1, m: 3 },
    tags: ["hybrid", "arcane-conductor", "rare"],
  },
  [IngotId.AethersteelIngot]: {
    damage: { p: 2, m: 2 },
    tags: ["planar-infused", "balanced", "epic"],
  },
  [IngotId.VoidforgedIngot]: {
    damage: { p: 3, m: 3 },
    tags: ["void", "lifedrain", "legendary"],
  },
  [PlankId.OakPlank]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [PlankId.PinePlank]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [PlankId.MaplePlank]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [PlankId.IronwoodPlank]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [LeatherId.Leather]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [LeatherId.FineLeather]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [LeatherId.ScaledLeather]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [ThreadId.WoolThread]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [ThreadId.SilkThread]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [ThreadId.LinenThread]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [GemId.RoughGem]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [GemId.CutGem]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [WoodId.Oak]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [WoodId.Pine]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [WoodId.Maple]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [WoodId.Ironwood]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [SkinId.Hide]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [SkinId.Fur]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [SkinId.Scale]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [BoneId.Bone]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [BoneId.Fang]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [BoneId.Horn]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.CopperOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.TinOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.IronOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.SilverOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.GoldOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.PlanariteOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  },
  [OreId.ErebiteOre]: {
    damage: {
      p: 0,
      m: 0
    },
    tags: []
  }
};
