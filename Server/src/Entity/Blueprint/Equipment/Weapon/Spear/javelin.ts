import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponJavelin = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 2,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  9,
  0,
);

