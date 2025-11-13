import { PotionId } from "../index";
import { Potion } from "./Potion";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Character } from "src/Entity/Character/Character";
import { ItemCost } from "../../Subclass/ItemCost";

export const healingPotion = new Potion(
    {
      id: PotionId.healingPotion,
      name: { en: "Minor Healing Potion", th: "ยารักษาเบื้องต้น" },
      description: {
        en: "Restores a modest amount of health when consumed.",
        th: "ฟื้นฟูพลังชีวิตเล็กน้อยเมื่อดื่ม",
      },
      cost: new ItemCost({ baseCost: 150, bonusCost: 0 }),
      blueprintId: { resource: new Map(), item: new Map() },
      image: "healingPotion",
      isCraftable: true,
      tier: TierEnum.common,
      weight: 2,
    },
    (actor: Character) => {
      actor.vitals.incHp(10);
    },
);
  

export const manaPotion = new Potion(
    {
      id: PotionId.manaPotion,
      name: { en: "Minor Mana Potion", th: "ยาฟื้นมานาเบื้องต้น" },
      description: {
        en: "Restores a modest amount of mana when consumed.",
        th: "ฟื้นฟูพลังมานาเล็กน้อยเมื่อดื่ม",
      },
      cost: new ItemCost({ baseCost: 150, bonusCost: 0 }),
      blueprintId: { resource: new Map(), item: new Map() },
      image: "manaPotion",
      isCraftable: true,
      tier: TierEnum.common,
      weight: 2,
    },
    (actor: Character) => {
      actor.vitals.incMp(10);
    },
);


export const staminaPotion = new Potion(
    {
      id: PotionId.staminaPotion,
      name: { en: "Minor Stamina Potion", th: "ยาฟื้นกำลังเบื้องต้น" },
      description: {
        en: "Restores a modest amount of stamina when consumed.",
        th: "ฟื้นฟูความอึดเล็กน้อยเมื่อดื่ม",
      },
      cost: new ItemCost({ baseCost: 140, bonusCost: 0 }),
      blueprintId: { resource: new Map(), item: new Map() },
      image: "staminaPotion",
      isCraftable: true,
      tier: TierEnum.common,
      weight: 2,
    },
    (actor: Character) => {
      actor.vitals.incSp(10);
    },
);