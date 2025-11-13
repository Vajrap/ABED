import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { EarId } from "../../type";
import { Ear } from "../Ear";
import { ArmorClass } from "../../Armor";
import { ItemCost } from "src/Entity/Item/Subclass/ItemCost";
import { BlueprintId } from "src/Entity/Blueprint/enum";

export const copperEarring = new Ear(
  {
    id: EarId.CopperEarring,
    name: { en: "Copper Earring", th: "" },
    description: {
      en: "A simple copper earring with minor aesthetic appeal.",
      th: "",
    },
    tier: TierEnum.common,
    cost: new ItemCost({ baseCost: 140, bonusCost: 0 }),
    image: "copperEarring",
    isCraftable: true,
    weight: 1,
    blueprintId: BlueprintId.Jewelry_Earring_Copper,
  },
  {},
  { armorClass: ArmorClass.Cloth },
);
