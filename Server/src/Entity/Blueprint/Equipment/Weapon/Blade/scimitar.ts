import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponScimitar = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 3,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  11,
  0,
);

