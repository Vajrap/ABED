import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponCrossbow = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 3,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 2,
    },
  },
  "smithing",
  11,
  0,
);

