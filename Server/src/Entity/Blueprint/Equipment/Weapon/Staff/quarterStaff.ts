import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponQuarterStaff = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 2,
    },
  },
  "woodworking",
  9,
  0,
);

