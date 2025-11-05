import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponKnife = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 1,
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

