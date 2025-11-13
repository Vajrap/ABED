import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponWarHammer = new WeaponBlueprint(
  {
    core: {
      resource: [MaterialType.Ingot],
      amount: 6,
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

