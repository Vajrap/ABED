import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponShortBow = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 2,
    },
  },
  "carpentry",
  9,
  0,
);

