import { WeaponBlueprint, MaterialType } from "../../../Blueprint";

export const blueprintWeaponTowerShield = new WeaponBlueprint(
  {
    handle: {
      resource: [MaterialType.Plank],
      amount: 3,
    },
  },
  "carpentry",
  10,
  0,
);

