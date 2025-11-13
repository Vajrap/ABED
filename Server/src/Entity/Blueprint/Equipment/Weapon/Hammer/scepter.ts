import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponScepter = new WeaponBlueprint(
  {
    core: {
      resource: [MaterialType.Ingot],
      amount: 3,
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

