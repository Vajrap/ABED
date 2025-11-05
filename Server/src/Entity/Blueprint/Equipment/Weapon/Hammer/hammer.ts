import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponHammer = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 3,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  10,
  0,
);

