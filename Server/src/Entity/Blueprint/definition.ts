import { MaterialType, WeaponBlueprint } from "./Blueprint";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";

export const blueprintWeaponDagger = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot, MaterialType.Plank, MaterialType.Bone],
      amount: 1,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  0,
  TierEnum.common,
);
