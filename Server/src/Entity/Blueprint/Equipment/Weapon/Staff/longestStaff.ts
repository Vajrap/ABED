import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponLongestStaff = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 3,
    },
  },
  "woodworking",
  10,
  0,
);

