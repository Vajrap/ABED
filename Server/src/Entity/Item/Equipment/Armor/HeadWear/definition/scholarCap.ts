import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { HeadWearId } from "../../type";
import { HeadWear } from "../HeadWear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const scholarCap = new HeadWear(
  {
    id: HeadWearId.ScholarCap,
    name: { en: "Scholar Cap", th: "" },
    description: {
      en: "A light cloth cap worn by scholars and travelers.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 240, bonusCost: 0 }),
    image: "scholarCap",
    isCraftable: true,
    weight: 2, // 0.2 kg
    blueprintId: BlueprintId.Armor_Head_ScholarCap,
  },
  {},
  {
    armorClass: ArmorClass.Cloth,
    pDef: { slash: 0, pierce: 0, blunt: 0 },
    mDef: { order: 0, chaos: 0, fire: 0, earth: 0, water: 0, air: 0 },
    dodge: 0,
  },
);
