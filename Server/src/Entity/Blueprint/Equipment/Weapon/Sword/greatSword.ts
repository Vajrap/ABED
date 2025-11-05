import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponGreatSword = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 6,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  13,
  0,
);

