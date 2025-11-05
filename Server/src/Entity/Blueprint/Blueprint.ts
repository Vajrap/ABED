import { ArtisanKey } from "src/InterFacesEnumsAndTypes/Enums";
import { ItemId } from "../Item";
import { IngotId } from "../Item/Misc";

export type Blueprint = IngotBlueprint | WeaponBlueprint;

export class IngotBlueprint {
  needed: Partial<Record<ItemId, number>> = {};
  resultItemId: IngotId;
  artisanType: ArtisanKey;
  difficulty: number;

  constructor(
    needed: Partial<Record<ItemId, number>>,
    resultItemId: IngotId,
    artisanType: ArtisanKey,
    difficulty: number,
  ) {
    this.needed = needed;
    this.resultItemId = resultItemId;
    this.artisanType = artisanType;
    this.difficulty = difficulty;
  }
}

export enum MaterialType {
  Ingot = "Ingot",
  Plank = "Plank",
  Bone = "Bone",
}

export type WeaponBlade = {
  resource: MaterialType[];
  amount: number;
};
export type WeaponHandle = {
  resource: MaterialType[];
  amount: number;
};
export type WeaponGrip = {
  resource: MaterialType[];
  amount: number;
};
export type WeaponGuard = {
  resource: MaterialType[];
  amount: number;
};
export type WeaponCore = {
  resource: MaterialType[];
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
  difficulty: number;
  weightModifier: number;
  constructor(
    data: {
      blade?: WeaponBlade | undefined;
      handle?: WeaponHandle | undefined;
      grip?: WeaponGrip | undefined;
      guard?: WeaponGuard | undefined;
      core?: WeaponCore | undefined;
    },
    artisanType: ArtisanKey,
    difficulty: number,
    weightModifier: number,
  ) {
    this.component = {
      blade: data.blade ?? undefined,
      handle: data.handle ?? undefined,
      grip: data.grip ?? undefined,
      guard: data.guard ?? undefined,
      core: data.core ?? undefined,
    };
    this.artisanType = artisanType;
    this.difficulty = difficulty;
    this.weightModifier = weightModifier;
  }
}
