import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponLongBow = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 3,
    },
  },
  "carpentry",
  10,
  0,
);

