import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponWarAxe = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 5,
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

