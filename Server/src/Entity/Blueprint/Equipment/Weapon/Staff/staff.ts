import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponStaff = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "carpentry",
  9,
  0,
);

