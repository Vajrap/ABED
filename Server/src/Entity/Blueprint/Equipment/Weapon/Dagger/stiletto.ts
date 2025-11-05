import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponStiletto = new WeaponBlueprint(
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
  8,
  0,
);

