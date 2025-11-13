import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponLongestStaff = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 6,
    },
  },
  "carpentry",
  10,
  0,
);

