import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponWand = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 2,
    },
  },
  "carpentry",
  8,
  0,
);

