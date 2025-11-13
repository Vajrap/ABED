import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponFalchion = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 6,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  12,
  0,
);

