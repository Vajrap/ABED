import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponKatana = new WeaponBlueprint(
  {
    blade: {
      resource: [MaterialType.Ingot],
      amount: 5,
    },
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "smithing",
  12,
  0,
);

