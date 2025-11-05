import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponOrb = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 1,
    },
  },
  "smithing",
  9,
  0,
);

