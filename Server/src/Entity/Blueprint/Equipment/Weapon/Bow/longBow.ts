import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponLongBow = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 2,
    },
  },
  "woodworking",
  10,
  0,
);

