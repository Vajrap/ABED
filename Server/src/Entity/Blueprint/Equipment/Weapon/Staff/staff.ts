import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponStaff = new WeaponBlueprint(
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

