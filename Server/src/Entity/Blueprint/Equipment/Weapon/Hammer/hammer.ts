import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponHammer = new WeaponBlueprint(
  {
    core: {
      resource: [MaterialType.Ingot],
      amount: 4,
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

