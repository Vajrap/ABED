import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponCodex = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "woodworking",
  8,
  0,
);

