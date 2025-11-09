import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { AxeId } from "../../type";
import { Axe } from "../Axe";
import { SeasonEnum } from "src/InterFacesEnumsAndTypes/Time";
import { DamageType } from "src/InterFacesEnumsAndTypes/DamageTypes";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const axe = new Axe(
  {
    id: AxeId.Axe,
    name: { en: "Axe", th: "ขวาน" },
    description: { en: "A standard axe.", th: "ขวานมาตรฐาน" },
    tier: TierEnum.common,
    cost: {
      baseCost: 505, // TEMP: ore: 40*10=400 + wood: 1*5=5 + handicraft: 100 = 505
      bonusCost: 0,
      cost: 505,
      marketCost: 505,
      numberOfSellThisWeek: 0,
    },
    image: "ironAxe",
    isCraftable: true,
    weight: 10,
    blueprintId: BlueprintId.Weapon_Axe,
  },
  {},
  {
    handle: 1,
    damage: {
      physicalDamageDice: { face: 8, dice: 1 },
      magicalDamageDice: { face: 4, dice: 1 },
      physicalDamageType: DamageType.slash,
      magicalDamageType: DamageType.arcane,
      physicalDamageStat: ["strength"],
      magicalDamageStat: ["planar"],
      physicalHitStat: ["dexterity"],
      magicalHitStat: ["control"],
      physicalCritStat: ["luck"],
      magicalCritStat: ["luck"],
    },
  },
);
