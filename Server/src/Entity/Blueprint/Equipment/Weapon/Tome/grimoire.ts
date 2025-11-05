import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponGrimoire = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 1,
    },
  },
  "woodworking",
  9,
  0,
);

