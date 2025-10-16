/**
 * L10N Usage Examples - Real-World Patterns
 * 
 * This file demonstrates how to use L10NWithEntities in different scenarios
 */

import { L10N, L10NWithEntities } from "./L10N";
import { createNews } from "../Entity/News/News";
import type { Character } from "../Entity/Character/Character";
import type { LocationsEnum } from "./Enums/Location";
import { RegionEnum } from "./Enums/Region";
import { SubRegionEnum } from "./Enums/SubRegion";

// ============================================
// Example 1: Simple Text (No Entities)
// ============================================

export function exampleSimpleText() {
  return createNews({
    scope: { kind: "worldScope" },
    content: L10N({
      en: "The kingdom is at peace",
      th: "อาณาจักรสงบสุข"
    }),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location: "FyonarCity" as LocationsEnum,
      partyId: "",
      characterIds: []
    }
  });
}

// ============================================
// Example 2: Character Rest (With Tooltip)
// ============================================

export function exampleCharacterRest(character: Character, location: LocationsEnum) {
  return createNews({
    scope: { kind: "privateScope", characterId: character.id },
    content: L10NWithEntities(
      {
        en: `[char:${character.id}]${character.name}[/char] has taken a rest`,
        th: `[char:${character.id}]${character.name}[/char] พักผ่อน`
      },
      {
        characters: [character]  // ← Auto-generates tooltip!
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location,
      partyId: character.partyID || "",
      characterIds: [character.id]
    }
  });
}

// FE receives:
// {
//   en: "[char:reis]Reis[/char] has taken a rest",
//   th: "[char:reis]ไรส์[/char] พักผ่อน",
//   entities: {
//     chars: {
//       reis: {
//         name: { en: "Reis", th: "ไรส์" },
//         level: 5,
//         title: "Novice Swordsman",
//         lastSeenLocation: "FyonarCity",
//         portraitUrl: "/portraits/reis.png"
//       }
//     }
//   }
// }

// ============================================
// Example 3: Travel (Character + Location)
// ============================================

export function exampleTravel(character: Character, fromLoc: LocationsEnum, toLoc: LocationsEnum) {
  const toLocName = "Fyonar City"; // Would get from locationRepository
  
  return createNews({
    scope: { kind: "partyScope", partyId: character.partyID || "" },
    content: L10NWithEntities(
      {
        en: `[char:${character.id}]${character.name}[/char] traveled to [loc:${toLoc}]${toLocName}[/loc]`,
        th: `[char:${character.id}]${character.name}[/char] เดินทางไป [loc:${toLoc}]${toLocName}[/loc]`
      },
      {
        characters: [character],
        locations: [toLoc]
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location: toLoc,
      partyId: character.partyID || "",
      characterIds: [character.id]
    }
  });
}

// ============================================
// Example 4: Skill Learning (Character + Skill)
// ============================================

export function exampleSkillLearning(character: Character, skill: any) {
  return createNews({
    scope: { kind: "partyScope", partyId: character.partyID || "" },
    content: L10NWithEntities(
      {
        en: `[char:${character.id}]${character.name}[/char] has learned [skill:${skill.id}]${skill.name}[/skill]!`,
        th: `[char:${character.id}]${character.name}[/char] ได้เรียนรู้ [skill:${skill.id}]${skill.name}[/skill]!`
      },
      {
        characters: [character],
        skills: [skill]
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location: "FyonarCity" as LocationsEnum,
      partyId: character.partyID || "",
      characterIds: [character.id]
    }
  });
}

// ============================================
// Example 5: Item Crafted (Character + Item)
// ============================================

export function exampleItemCrafted(character: Character, item: any, location: LocationsEnum) {
  return createNews({
    scope: { kind: "locationScope", location },
    content: L10NWithEntities(
      {
        en: `[char:${character.id}]${character.name}[/char] crafted [item:${item.id} rarity:${item.tier}]${item.name}[/item]!`,
        th: `[char:${character.id}]${character.name}[/char] สร้าง [item:${item.id} rarity:${item.tier}]${item.name}[/item]!`
      },
      {
        characters: [character],
        items: [item]
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location,
      partyId: character.partyID || "",
      characterIds: [character.id]
    }
  });
}

// ============================================
// Example 6: Combat (Multiple Characters)
// ============================================

export function exampleCombat(attacker: Character, defender: Character, location: LocationsEnum) {
  return createNews({
    scope: { kind: "locationScope", location },
    content: L10NWithEntities(
      {
        en: `[char:${attacker.id}]${attacker.name}[/char] attacks [char:${defender.id}]${defender.name}[/char]!`,
        th: `[char:${attacker.id}]${attacker.name}[/char] โจมตี [char:${defender.id}]${defender.name}[/char]!`
      },
      {
        characters: [attacker, defender]  // ← Both characters get tooltips!
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location,
      partyId: attacker.partyID || "",
      characterIds: [attacker.id, defender.id]
    }
  });
}

// ============================================
// Example 7: Regional Event (Location Only)
// ============================================

export function exampleRegionalEvent(location: LocationsEnum) {
  const locName = "Fyonar City"; // From repository
  
  return createNews({
    scope: { kind: "regionScope", region: RegionEnum.CentralPlain },
    content: L10NWithEntities(
      {
        en: `[color:red]Flooding[/color] reported in [loc:${location}]${locName}[/loc]!`,
        th: `พบ[color:red]น้ำท่วม[/color]ใน [loc:${location}]${locName}[/loc]!`
      },
      {
        locations: [location]
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location,
      partyId: "",
      characterIds: []
    }
  });
}

// ============================================
// Example 8: Complex Combat + Loot
// ============================================

export function exampleCombatWithLoot(
  winner: Character,
  loser: Character,
  loot: any,
  location: LocationsEnum
) {
  return createNews({
    scope: { kind: "locationScope", location },
    content: L10NWithEntities(
      {
        en: `[char:${winner.id}]${winner.name}[/char] defeated [char:${loser.id}]${loser.name}[/char] and obtained [item:${loot.id} rarity:${loot.tier}]${loot.name}[/item]!`,
        th: `[char:${winner.id}]${winner.name}[/char] ได้เอาชนะ [char:${loser.id}]${loser.name}[/char] และได้รับ [item:${loot.id} rarity:${loot.tier}]${loot.name}[/item]!`
      },
      {
        characters: [winner, loser],
        items: [loot]
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location,
      partyId: winner.partyID || "",
      characterIds: [winner.id, loser.id]
    }
  });
}

// ============================================
// Example 9: Formatted Text
// ============================================

export function exampleFormattedText() {
  return createNews({
    scope: { kind: "worldScope" },
    content: L10N({
      en: "[b]Important[/b]: The [color:gold]Golden Age[/color] has begun!",
      th: "[b]สำคัญ[/b]: [color:gold]ยุคทอง[/color] เริ่มต้นแล้ว!"
    }),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location: "FyonarCity" as LocationsEnum,
      partyId: "",
      characterIds: []
    }
  });
}

// ============================================
// Example 10: Real TravelManager Pattern
// ============================================

export function exampleTravelPattern(party: any) {
  const leader = party.party.leader;
  const locId = party.currentLocation;
  const locName = "City Name"; // From repository
  
  return createNews({
    scope: {
      kind: "partyScope",
      partyId: party.party.partyID
    },
    content: L10NWithEntities(
      {
        en: `[char:${leader.id}]${leader.name}[/char]'s party has reached [loc:${locId}]${locName}[/loc]`,
        th: `ปาร์ตี้ของ [char:${leader.id}]${leader.name}[/char] เดินทางมาถึง [loc:${locId}]${locName}[/loc]`
      },
      {
        characters: [leader],
        locations: [locId]
      }
    ),
    context: {
      region: RegionEnum.CentralPlain,
      subRegion: SubRegionEnum.FyonarCapitalDistrict,
      location: party.currentLocation,
      partyId: party.party.partyID,
      characterIds: party.party.characters
        .filter((c: any) => c !== "none")
        .map((c: any) => c.id)
    }
  });
}

/**
 * KEY TAKEAWAYS
 * 
 * 1. Use L10N() for simple text without entities
 * 2. Use L10NWithEntities() when you have clickable entities
 * 3. Add [char:id], [loc:id] markup for tooltips
 * 4. Pass entity objects/IDs in second parameter
 * 5. System auto-extracts ALL tooltip data
 * 6. Both languages (en + th) sent together
 * 7. FE picks language and renders with tooltips
 * 
 * That's it! 🎉
 */

