import { FoodId } from "../index";
import { TierEnum } from "src/InterFacesEnumsAndTypes/Tiers";
import { Party } from "src/Entity/Party/Party";
import { ItemCost } from "../../Subclass/ItemCost";
import { Food } from "./Food";


/**
 * ------------------------------------------------------------
 * Helpers: party-scoped distribution of needs
 * ------------------------------------------------------------
 */
function activeMembers(party: Party) {
  // filter out empty slots like "none"
  return party.characters.filter((c) => c !== "none");
}

function allocateSatiety(party: Party, total: number) {
  const members = activeMembers(party);
  if (members.length === 0) return;
  const gain = Math.floor(total / members.length);
  if (gain === 0) return;
  members.forEach((m) => m.needs.incSatiety(gain));
}

function allocateEnergyEven(party: Party, total: number) {
  const members = activeMembers(party);
  if (members.length === 0) return;
  const gain = Math.floor(total / members.length);
  if (gain === 0 && total !== 0) return;
  members.forEach((m) => m.needs.energy.inc(gain));
}

function allocateMoodWeighted(party: Party, valuePerRecipient: number) {
  const members = activeMembers(party);
  if (members.length === 0 || valuePerRecipient === 0) return;
  // Mood is personal; give it to ~half the party (at least 1)
  const count = Math.max(1, Math.floor(members.length / 2));
  // Simple selection: first N shuffled members
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, count);
  chosen.forEach((m) => m.needs.mood.inc(valuePerRecipient));
}

/**
 * ------------------------------------------------------------
 * Foods
 * Effects are modest, realistic, and party-scoped.
 * ------------------------------------------------------------
 */

// Bread — ขนมปัง
export const bread = new Food(
  {
    id: FoodId.bread,
    name: { en: "Bread", th: "ขนมปัง" },
    description: {
      en: "A simple loaf, shared at camp. Restores a small amount of satiety.",
      th: "ขนมปังธรรมดา แบ่งกันกินระหว่างพัก เพิ่มความอิ่มเล็กน้อย",
    },
    cost: new ItemCost({ baseCost: 20 }),
    blueprintId: undefined,
    image: "bread",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 2,
  },
  (party: Party) => {
    allocateSatiety(party, 20);
  },
);

// Jerky — เนื้อแห้ง
export const jerky = new Food(
  {
    id: FoodId.jerky,
    name: { en: "Jerky", th: "เนื้อแห้ง" },
    description: {
      en: "Dried, salty rations. Restores satiety and slightly sustains energy.",
      th: "เสบียงเนื้อแห้งเค็ม เพิ่มความอิ่มและช่วยประคองพลังงานเล็กน้อย",
    },
    cost: new ItemCost({ baseCost: 30 }),
    blueprintId: undefined,
    image: "jerky",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 1,
  },
  (party: Party) => {
    allocateSatiety(party, 24);
    allocateEnergyEven(party, 4);
  },
);

// Stew — สตูว์
export const stew = new Food(
  {
    id: FoodId.stew,
    name: { en: "Stew", th: "สตูว์" },
    description: {
      en: "A warm pot of stew. Good satiety and a small morale lift.",
      th: "สตูว์หม้อร้อน เพิ่มความอิ่มพอสมควร และช่วยให้กำลังใจดีขึ้นเล็กน้อย",
    },
    cost: new ItemCost({ baseCost: 90 }),
    blueprintId: undefined,
    image: "stew",
    isCraftable: false,
    tier: TierEnum.uncommon,
    weight: 3,
  },
  (party: Party) => {
    allocateSatiety(party, 30);
    allocateMoodWeighted(party, 6);
  },
);

// Wine — ไวน์
export const wine = new Food(
  {
    id: FoodId.wine,
    name: { en: "Wine", th: "ไวน์" },
    description: {
      en: "A relaxing drink. Lifts spirits, but makes the party drowsy.",
      th: "เครื่องดื่มช่วยผ่อนคลาย เพิ่มกำลังใจ แต่ทำให้หนังตาหนัก",
    },
    cost: new ItemCost({ baseCost: 110 }),
    blueprintId: undefined,
    image: "wine",
    isCraftable: false,
    tier: TierEnum.uncommon,
    weight: 2,
  },
  (party: Party) => {
    allocateMoodWeighted(party, 10);
    allocateEnergyEven(party, -6);
  },
);

// Fruit — ผลไม้สด
export const fruit = new Food(
  {
    id: FoodId.fruit,
    name: { en: "Fresh Fruit", th: "ผลไม้สด" },
    description: {
      en: "Sweet and refreshing. Restores satiety and lightens the mood.",
      th: "หวานฉ่ำ สดชื่น เพิ่มความอิ่มและอารมณ์ให้ดีขึ้นเล็กน้อย",
    },
    cost: new ItemCost({ baseCost: 24 }),
    blueprintId: undefined,
    image: "fruit",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 1,
  },
  (party: Party) => {
    allocateSatiety(party, 16);
    allocateMoodWeighted(party, 3);
  },
);

// Feast — ชุดอาหารเลี้ยงฉลอง
export const feast = new Food(
  {
    id: FoodId.feast,
    name: { en: "Feast", th: "ชุดอาหารเลี้ยงฉลอง" },
    description: {
      en: "A lavish spread for the whole party. Great satiety, morale, and a touch of vigor.",
      th: "งานเลี้ยงจัดเต็มสำหรับทั้งคณะ อิ่มมาก กำลังใจดี และเพิ่มเรี่ยวแรงเล็กน้อย",
    },
    cost: new ItemCost({ baseCost: 600 }),
    blueprintId: undefined,
    image: "feast",
    isCraftable: false,
    tier: TierEnum.rare,
    weight: 8,
  },
  (party: Party) => {
    allocateSatiety(party, 80);
    allocateMoodWeighted(party, 12);
    allocateEnergyEven(party, 5);
  },
);

// Herb Soup — ซุปสมุนไพร
export const herbSoup = new Food(
  {
    id: FoodId.herbSoup,
    name: { en: "Herb Soup", th: "ซุปสมุนไพร" },
    description: {
      en: "Bitter but invigorating. Restores a bit of energy at the cost of mood.",
      th: "ขมแต่กระตุ้นกำลัง ฟื้นพลังงานเล็กน้อย แลกกับอารมณ์ที่ลดลง",
    },
    cost: new ItemCost({ baseCost: 40 }),
    blueprintId: undefined,
    image: "herbSoup",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 2,
  },
  (party: Party) => {
    allocateSatiety(party, 8);
    allocateEnergyEven(party, 10);
    allocateMoodWeighted(party, -4);
  },
);

// Dried Fish — ปลาแห้ง
export const driedFish = new Food(
  {
    id: FoodId.driedFish,
    name: { en: "Dried Fish", th: "ปลาแห้ง" },
    description: {
      en: "Preserved for the road. Fills the belly, if not the heart.",
      th: "เสบียงสำหรับการเดินทาง อิ่มท้องแม้ไม่ชื่นใจนัก",
    },
    cost: new ItemCost({ baseCost: 28 }),
    blueprintId: undefined,
    image: "driedFish",
    isCraftable: false,
    tier: TierEnum.common,
    weight: 1,
  },
  (party: Party) => {
    allocateSatiety(party, 22);
    allocateMoodWeighted(party, -2);
  },
);

// Honey — น้ำผึ้ง
export const honey = new Food(
  {
    id: FoodId.honey,
    name: { en: "Honey", th: "น้ำผึ้ง" },
    description: {
      en: "Pure sweetness. A small bite for the stomach, a good lift for the heart.",
      th: "หวานบริสุทธิ์ อิ่มเล็กน้อยแต่ชื่นใจมาก",
    },
    cost: new ItemCost({ baseCost: 70 }),
    blueprintId: undefined,
    image: "honey",
    isCraftable: false,
    tier: TierEnum.uncommon,
    weight: 1,
  },
  (party: Party) => {
    allocateSatiety(party, 6);
    allocateMoodWeighted(party, 8);
  },
);

// Spiced Tea — ชาชงเครื่องเทศ
export const spicedTea = new Food(
  {
    id: FoodId.spicedTea,
    name: { en: "Spiced Tea", th: "ชาชงเครื่องเทศ" },
    description: {
      en: "Warm and aromatic. Soothes the mind and keeps eyes open a little longer.",
      th: "อุ่นหอม ผ่อนคลายความคิด และช่วยให้อยู่ได้นานขึ้นอีกนิด",
    },
    cost: new ItemCost({ baseCost: 60 }),
    blueprintId: undefined,
    image: "spicedTea",
    isCraftable: false,
    tier: TierEnum.uncommon,
    weight: 1,
  },
  (party: Party) => {
    allocateSatiety(party, 4);
    allocateMoodWeighted(party, 5);
    allocateEnergyEven(party, 6);
  },
);

// Coffee — กาแฟ
export const coffee = new Food(
  {
    id: FoodId.coffee,
    name: { en: "Coffee", th: "กาแฟ" },
    description: {
      en: "Bitter stimulant. Sharply boosts alertness with a slight edge on mood.",
      th: "ขมแต่เร้าใจ เพิ่มความตื่นตัวอย่างชัดเจน แต่อารมณ์หงุดหงิดเล็กน้อย",
    },
    cost: new ItemCost({ baseCost: 70 }),
    blueprintId: undefined,
    image: "coffee",
    isCraftable: false,
    tier: TierEnum.uncommon,
    weight: 1,
  },
  (party: Party) => {
    allocateEnergyEven(party, 14);
    allocateMoodWeighted(party, -3);
  },
);
