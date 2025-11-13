import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponHalberd = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 6,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 2,
    },
  },
  "smithing",
  13,
  0,
);

