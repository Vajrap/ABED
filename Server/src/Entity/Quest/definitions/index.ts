import type { QuestDefinition } from "../QuestDefinition";
import { QuestType } from "../Quest";
import { TierEnum } from "../../../InterFacesEnumsAndTypes/Tiers";
import { LocationsEnum } from "../../../InterFacesEnumsAndTypes/Enums/Location";
import { QuestItemId } from "../../Item/Misc";
import { SwordId } from "../../Item/Equipment/Weapon/type";

/**
 * Quest Definitions
 * Predefined quests that NPCs can offer
 * Similar to NPC template definitions
 */
export const questDefinitions: QuestDefinition[] = [
  // Example: Simple repeatable quest from innkeeper
  {
    id: "wayward_inn_innkeeper_intro",
    name: { 
      en: "Welcome to Wayward Inn", 
      th: "ยินดีต้อนรับสู่โรงแรมเวย์เวิร์ด" 
    },
    description: { 
      en: "Help the innkeeper gather supplies for the inn. Collect 5 herbs from the nearby forest.",
      th: "ช่วยเจ้าของโรงแรมรวบรวมเสบียงสำหรับโรงแรม รวบรวมสมุนไพร 5 ชิ้นจากป่าใกล้เคียง"
    },
    type: QuestType.Collect,
    tier: TierEnum.common,
    giverId: "wayward_inn_innkeeper",
    giverLocation: LocationsEnum.WaywardInn,
    prerequisites: { 
      minLevel: 1 
    },
    objectives: [
      { 
        type: QuestType.Collect, 
        target: "herbs", 
        required: 5, 
        current: 0 
      }
    ],
    rewards: {
      gold: 50,
      experience: 25,
    },
    isOneTimeOnly: false,
    isRepeatable: true,
    cooldownDays: 1,
  },
  
  // Example: Epic chain quest part 1
  {
    id: "epic_wayward_inn_part1",
    name: { 
      en: "The Ancient Artifact", 
      th: "สิ่งประดิษฐ์โบราณ" 
    },
    description: { 
      en: "The innkeeper has discovered an ancient artifact. Investigate its origins by exploring the nearby ruins.",
      th: "เจ้าของโรงแรมพบสิ่งประดิษฐ์โบราณ สำรวจที่มาของมันโดยการสำรวจซากปรักหักพังใกล้เคียง"
    },
    type: QuestType.Explore,
    tier: TierEnum.epic,
    giverId: "wayward_inn_innkeeper",
    giverLocation: LocationsEnum.WaywardInn,
    prerequisites: { 
      minLevel: 5,
      completedQuests: ["wayward_inn_innkeeper_intro"],
    },
    objectives: [
      { 
        type: QuestType.Explore, 
        target: "BlackrootHamlet", // Location ID as string
        required: 1, 
        current: 0 
      }
    ],
    rewards: {
      gold: 500,
      experience: 200,
      items: new Map([[QuestItemId.ancientKey, 1]]),
    },
    isChainQuest: true,
    chainId: "epic_wayward_inn",
    chainOrder: 1,
    unlocksQuests: ["epic_wayward_inn_part2"],
    isOneTimeOnly: true,
  },
  
  // Example: Epic chain quest part 2 (unlocked by part 1)
  {
    id: "epic_wayward_inn_part2",
    name: { 
      en: "The Key's Secret", 
      th: "ความลับของกุญแจ" 
    },
    description: { 
      en: "The ancient key opens a hidden chamber. Explore it and defeat the guardian to claim the ancient relic.",
      th: "กุญแจโบราณเปิดห้องลับ สำรวจมันและเอาชนะผู้พิทักษ์เพื่ออ้างสิทธิ์สิ่งประดิษฐ์โบราณ"
    },
    type: QuestType.Kill,
    tier: TierEnum.epic,
    giverId: "wayward_inn_innkeeper",
    giverLocation: LocationsEnum.WaywardInn,
    prerequisites: { 
      completedQuests: ["epic_wayward_inn_part1"],
      requiredItems: { [QuestItemId.ancientKey]: 1 },
    },
    objectives: [
      { 
        type: QuestType.Kill, 
        target: "ancient_guardian", 
        required: 1, 
        current: 0 
      },
      { 
        type: QuestType.Collect, 
        target: "ancient_relic", 
        required: 1, 
        current: 0 
      },
    ],
    rewards: {
      gold: 1000,
      experience: 500,
      items: new Map([[SwordId.RelicSword, 1]]),
    },
    isChainQuest: true,
    chainId: "epic_wayward_inn",
    chainOrder: 2,
    isOneTimeOnly: true,
  },
  
  // Example: One-time quest - unique character experience
  {
    id: "wayward_inn_innkeeper_secret",
    name: { 
      en: "The Innkeeper's Secret", 
      th: "ความลับของเจ้าของโรงแรม" 
    },
    description: { 
      en: "The innkeeper needs help with a personal matter. Deliver a package to a contact in the next town.",
      th: "เจ้าของโรงแรมต้องการความช่วยเหลือในเรื่องส่วนตัว ส่งพัสดุไปยังผู้ติดต่อในเมืองถัดไป"
    },
    type: QuestType.Deliver,
    tier: TierEnum.rare,
    giverId: "wayward_inn_innkeeper",
    giverLocation: LocationsEnum.WaywardInn,
    prerequisites: { 
      minLevel: 3,
      minRelationship: { "wayward_inn_innkeeper": 20 }, // Requires good relationship
    },
    objectives: [
      { 
        type: QuestType.Deliver, 
        target: QuestItemId.secretPackage, 
        required: 1, 
        current: 0 
      }
    ],
    rewards: {
      gold: 200,
      experience: 100,
      reputation: { subRegion: "wayward_region", amount: 10 },
    },
    isOneTimeOnly: true,
  },
];

