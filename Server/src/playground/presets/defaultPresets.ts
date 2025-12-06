import type { PresetInfo } from "../types/responses";
import type { CharacterConfig } from "../types/requests";
import { MOBEnum } from "src/Entity/Character/MOBs/enums";
import { RaceEnum, ClassEnum } from "src/InterFacesEnumsAndTypes/Enums";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { BattleType } from "src/Entity/Battle/types";

/**
 * Default battle presets extracted from playGround.ts
 */
export const defaultPresets: PresetInfo[] = [
  {
    id: 'goblin-party',
    name: 'Goblin Party',
    description: 'Standard goblin enemy party: Captain, 2x Warriors, Scout, Mage, Cleric',
    isDefault: true,
    partyA: [
      { type: 'mob', mobId: MOBEnum.goblinCaptain, level: 3, name: { en: 'Goblin Captain', th: 'ก๊อปลินกัปตัน' }, position: 0 },
      { type: 'mob', mobId: MOBEnum.goblinWarrior, level: 3, name: { en: 'Goblin Warrior A', th: 'ก๊อปลินนักรบ' }, position: 1 },
      { type: 'mob', mobId: MOBEnum.goblinWarrior, level: 3, name: { en: 'Goblin Warrior B', th: 'ก๊อปลินนักรบ' }, position: 2 },
      { type: 'mob', mobId: MOBEnum.goblinScout, level: 3, name: { en: 'Goblin Scout', th: 'ก๊อปลินสายลับ' }, position: 3 },
      { type: 'mob', mobId: MOBEnum.goblinMage, level: 3, name: { en: 'Goblin Mage', th: 'ก๊อปลินนักเวทย์' }, position: 4 },
      { type: 'mob', mobId: MOBEnum.goblinCleric, level: 3, name: { en: 'Goblin Cleric', th: 'ก๊อปลินนักบวช' }, position: 5 },
    ],
    partyB: [
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Warrior, level: 3, name: { en: 'Human Warrior', th: 'นักรบมนุษย์' }, position: 0 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Paladin, level: 3, name: { en: 'Human Paladin', th: 'พาลาดินมนุษย์' }, position: 1 },
      { type: 'custom', race: RaceEnum.Dwarf, class: ClassEnum.Knight, level: 3, name: { en: 'Dwarf Knight', th: 'อัศวินคนแคระ' }, position: 2 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Guardian, level: 3, name: { en: 'Human Guardian', th: 'ผู้พิทักษ์มนุษย์' }, position: 3 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Cleric, level: 3, name: { en: 'Human Cleric', th: 'นักบวชมนุษย์' }, position: 4 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Druid, level: 3, name: { en: 'Human Druid', th: 'ดรูอิดมนุษย์' }, position: 5 },
    ],
    location: LocationsEnum.WaywardInn,
    battleType: BattleType.Normal,
  },
  {
    id: 'melee-support-party',
    name: 'Melee & Support Focus',
    description: 'Party B from playground: Warrior, Paladin, Knight, Guardian, Cleric, Druid',
    isDefault: true,
    partyA: [
      { type: 'mob', mobId: MOBEnum.goblinCaptain, level: 3, name: { en: 'Goblin Captain', th: 'ก๊อปลินกัปตัน' }, position: 0 },
      { type: 'mob', mobId: MOBEnum.goblinWarrior, level: 3, name: { en: 'Goblin Warrior', th: 'ก๊อปลินนักรบ' }, position: 1 },
      { type: 'mob', mobId: MOBEnum.goblinScout, level: 3, name: { en: 'Goblin Scout', th: 'ก๊อปลินสายลับ' }, position: 2 },
      { type: 'mob', mobId: MOBEnum.goblinMage, level: 3, name: { en: 'Goblin Mage', th: 'ก๊อปลินนักเวทย์' }, position: 3 },
    ],
    partyB: [
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Warrior, level: 3, name: { en: 'Human Warrior', th: 'นักรบมนุษย์' }, position: 0 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Paladin, level: 3, name: { en: 'Human Paladin', th: 'พาลาดินมนุษย์' }, position: 1 },
      { type: 'custom', race: RaceEnum.Dwarf, class: ClassEnum.Knight, level: 3, name: { en: 'Dwarf Knight', th: 'อัศวินคนแคระ' }, position: 2 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Guardian, level: 3, name: { en: 'Human Guardian', th: 'ผู้พิทักษ์มนุษย์' }, position: 3 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Cleric, level: 3, name: { en: 'Human Cleric', th: 'นักบวชมนุษย์' }, position: 4 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Druid, level: 3, name: { en: 'Human Druid', th: 'ดรูอิดมนุษย์' }, position: 5 },
    ],
    location: LocationsEnum.WaywardInn,
    battleType: BattleType.Normal,
  },
  {
    id: 'magic-hybrid-party',
    name: 'Magic & Hybrid Focus',
    description: 'Party C from playground: Mage, Warlock, Witch, Inquisitor, Spellblade, Mystic',
    isDefault: true,
    partyA: [
      { type: 'mob', mobId: MOBEnum.goblinCaptain, level: 3, name: { en: 'Goblin Captain', th: 'ก๊อปลินกัปตัน' }, position: 0 },
      { type: 'mob', mobId: MOBEnum.goblinWarrior, level: 3, name: { en: 'Goblin Warrior', th: 'ก๊อปลินนักรบ' }, position: 1 },
      { type: 'mob', mobId: MOBEnum.goblinMage, level: 3, name: { en: 'Goblin Mage', th: 'ก๊อปลินนักเวทย์' }, position: 2 },
    ],
    partyB: [
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Mage, level: 3, name: { en: 'Human Mage', th: 'นักเวทย์มนุษย์' }, position: 0 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Warlock, level: 3, name: { en: 'Human Warlock', th: 'วาร์ล็อคมนุษย์' }, position: 1 },
      { type: 'custom', race: RaceEnum.Elven, class: ClassEnum.Witch, level: 3, name: { en: 'Elven Witch', th: 'แม่มดเอลฟ์' }, position: 2 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Inquisitor, level: 3, name: { en: 'Human Inquisitor', th: 'นักสืบมนุษย์' }, position: 3 },
      { type: 'custom', race: RaceEnum.Elven, class: ClassEnum.Spellblade, level: 3, name: { en: 'Elven Spellblade', th: 'ดาบเวทย์เอลฟ์' }, position: 4 },
      { type: 'custom', race: RaceEnum.Halfling, class: ClassEnum.Mystic, level: 3, name: { en: 'Halfling Mystic', th: 'นักลึกลับฮาล์ฟลิ่ง' }, position: 5 },
    ],
    location: LocationsEnum.WaywardInn,
    battleType: BattleType.Normal,
  },
  {
    id: 'agile-utility-party',
    name: 'Agile & Utility Focus',
    description: 'Party D from playground: Rogue, Duelist, Monk, Barbarian, Shaman, Scholar',
    isDefault: true,
    partyA: [
      { type: 'mob', mobId: MOBEnum.goblinCaptain, level: 3, name: { en: 'Goblin Captain', th: 'ก๊อปลินกัปตัน' }, position: 0 },
      { type: 'mob', mobId: MOBEnum.goblinWarrior, level: 3, name: { en: 'Goblin Warrior', th: 'ก๊อปลินนักรบ' }, position: 1 },
      { type: 'mob', mobId: MOBEnum.goblinScout, level: 3, name: { en: 'Goblin Scout', th: 'ก๊อปลินสายลับ' }, position: 2 },
    ],
    partyB: [
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Rogue, level: 3, name: { en: 'Human Rogue', th: 'โจรมนุษย์' }, position: 0 },
      { type: 'custom', race: RaceEnum.Elven, class: ClassEnum.Duelist, level: 3, name: { en: 'Elven Duelist', th: 'นักดวลเอลฟ์' }, position: 1 },
      { type: 'custom', race: RaceEnum.Halfling, class: ClassEnum.Monk, level: 3, name: { en: 'Halfling Monk', th: 'นักพรตฮาล์ฟลิ่ง' }, position: 2 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Barbarian, level: 3, name: { en: 'Human Barbarian', th: 'นักรบป่าเถื่อนมนุษย์' }, position: 3 },
      { type: 'custom', race: RaceEnum.Orc, class: ClassEnum.Shaman, level: 3, name: { en: 'Orc Shaman', th: 'ชามานออร์ค' }, position: 4 },
      { type: 'custom', race: RaceEnum.Human, class: ClassEnum.Scholar, level: 3, name: { en: 'Human Scholar', th: 'นักวิชาการมนุษย์' }, position: 5 },
    ],
    location: LocationsEnum.WaywardInn,
    battleType: BattleType.Normal,
  },
];

