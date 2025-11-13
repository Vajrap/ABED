import { ArtisanKey } from "src/InterFacesEnumsAndTypes/Enums";
import { ItemId } from "../Item";
import { IngotId, RawGemId } from "../Item/Misc";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

export type GemStage = "flawed" | "polished" | "brilliant" | "perfect";

export type Blueprint =
  | IngotBlueprint
  | WeaponBlueprint
  | ArmorBlueprint
  | RefinementBlueprint
  | GemCuttingBlueprint;

export class IngotBlueprint {
  needed: Map<ItemId, number> = new Map();
  resultItemId: IngotId;
  artisanType: ArtisanKey;
  workload: number;
  tier: TierEnum;

  constructor(
    needed: Map<ItemId, number>,
    resultItemId: IngotId,
    artisanType: ArtisanKey,
    workload: number = 0,
    tier: TierEnum = TierEnum.common,
  ) {
    this.needed = new Map(needed);
    this.resultItemId = resultItemId;
    this.artisanType = artisanType;
    this.workload = workload;
    this.tier = tier;
  }
}

export enum MaterialType {
  Ingot = "Ingot",
  Plank = "Plank",
  Bone = "Bone",
  Leather = "Leather",
  Thread = "Thread",
  Cloth = "Cloth",
  Skin = "Skin",
  Gem = "Gem",
}

export type BladeMaterialType =
  | MaterialType.Ingot
  | MaterialType.Plank
  | MaterialType.Bone
  | MaterialType.Gem;
export type HandleMaterialType =
  | MaterialType.Plank
  | MaterialType.Bone
  | MaterialType.Leather
  | MaterialType.Thread
  | MaterialType.Skin;
export type GripMaterialType =
  | MaterialType.Leather
  | MaterialType.Thread
  | MaterialType.Cloth
  | MaterialType.Skin;
export type GuardMaterialType =
  | MaterialType.Ingot
  | MaterialType.Plank
  | MaterialType.Bone
  | MaterialType.Gem;
export type CoreMaterialType =
  | MaterialType.Ingot
  | MaterialType.Bone
  | MaterialType.Gem
  | MaterialType.Plank;

export type ArmorMaterialType = MaterialType;

export type WeaponBlade = {
  resource: BladeMaterialType[];
  amount: number;
};
export type WeaponHandle = {
  resource: HandleMaterialType[];
  amount: number;
};
export type WeaponGrip = {
  resource: GripMaterialType[];
  amount: number;
};
export type WeaponGuard = {
  resource: GuardMaterialType[];
  amount: number;
};
export type WeaponCore = {
  resource: CoreMaterialType[];
  amount: number;
};

export class WeaponBlueprint {
  component: {
    blade: WeaponBlade | undefined;
    handle: WeaponHandle | undefined;
    grip: WeaponGrip | undefined;
    guard: WeaponGuard | undefined;
    core: WeaponCore | undefined;
  };
  artisanType: ArtisanKey;
  weightModifier: number;
  tier: TierEnum;
  constructor(
    data: {
      blade?: WeaponBlade | undefined;
      handle?: WeaponHandle | undefined;
      grip?: WeaponGrip | undefined;
      guard?: WeaponGuard | undefined;
      core?: WeaponCore | undefined;
    },
    artisanType: ArtisanKey,
    weightModifier: number,
    tier: TierEnum = TierEnum.common,
  ) {
    this.component = {
      blade: data.blade ?? undefined,
      handle: data.handle ?? undefined,
      grip: data.grip ?? undefined,
      guard: data.guard ?? undefined,
      core: data.core ?? undefined,
    };
    this.artisanType = artisanType;
    this.weightModifier = weightModifier;
    this.tier = tier;
  }
}

export type ArmorComponent = {
  resource: ArmorMaterialType[];
  amount: number;
};

export type ArmorComponentKey = "primary" | "secondary" | "tertiary" | "accent";

export type ArmorMaterialRequirement = {
  key: ArmorComponentKey;
  resource: ArmorMaterialType[];
  amount: number;
};

export class ArmorBlueprint {
  components: Partial<Record<ArmorComponentKey, ArmorComponent>>;
  materials: ArmorMaterialRequirement[];
  artisanType: ArtisanKey;
  resultItemId: ItemId;
  workload: number;
  tier: TierEnum;

  constructor(
    materials: ArmorMaterialRequirement[],
    resultItemId: ItemId,
    artisanType: ArtisanKey,
    workload: number = 0,
    tier: TierEnum = TierEnum.common,
  ) {
    this.materials = materials.map((requirement) => ({
      key: requirement.key,
      resource: requirement.resource,
      amount: requirement.amount,
    }));
    this.components = this.materials.reduce<Partial<Record<ArmorComponentKey, ArmorComponent>>>(
      (acc, requirement) => {
        acc[requirement.key] = {
          resource: [...requirement.resource],
          amount: requirement.amount,
        };
        return acc;
      },
      {},
    );
    this.resultItemId = resultItemId;
    this.artisanType = artisanType;
    this.workload = workload;
    this.tier = tier;
  }
}

export class RefinementBlueprint {
  needed: Map<ItemId, number> = new Map();
  resultItemId?: ItemId;
  artisanType: ArtisanKey;
  workload: number;
  tier: TierEnum;

  constructor(
    needed: Map<ItemId, number>,
    resultItemId: ItemId | undefined,
    artisanType: ArtisanKey,
    workload: number,
    tier: TierEnum,
  ) {
    this.needed = new Map(needed);
    this.resultItemId = resultItemId;
    this.artisanType = artisanType;
    this.workload = workload;
    this.tier = tier;
  }
}

export class GemCuttingBlueprint {
  needed: Map<ItemId, number>;
  artisanType: ArtisanKey;
  workload: number;
  tier: TierEnum;
  stageTable: Array<{ min: number; max: number; stage: GemStage }>;

  constructor(
    needed: Map<ItemId, number>,
    artisanType: ArtisanKey,
    workload: number,
    tier: TierEnum,
    stageTable: Array<{ min: number; max: number; stage: GemStage }>,
  ) {
    this.needed = new Map(needed);
    this.artisanType = artisanType;
    this.workload = workload;
    this.tier = tier;
    this.stageTable = stageTable;
  }

  static basic(): GemCuttingBlueprint {
    return new GemCuttingBlueprint(
      new Map([[RawGemId.RoughGem, 1]]),
      "jewelry",
      0,
      TierEnum.common,
      [],
    );
  }
}