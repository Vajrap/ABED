import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponCodex = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "carpentry",
  8,
  0,
);

