# L10N Auto-Entity System - Complete Guide ✅

## 🎉 What You Get

**Super simple API** - Just pass entities, tooltips are auto-generated!

```typescript
content: L10NWithEntities(
  {
    en: `[char:${char.id}]${char.name}[/char] learned [skill:${skill.id}]${skill.name}[/skill]`,
    th: `[char:${char.id}]${char.name}[/char] เรียนรู้ [skill:${skill.id}]${skill.name}[/skill]`
  },
  { characters: [char], skills: [skill] }  // ← Auto-builds tooltips!
)
```

**System automatically extracts:**
- ✅ Character: name, level, title, portrait, last location
- ✅ Location: name, description, region, subregion
- ✅ Item: name, description, rarity, stats, icon
- ✅ Skill: name, description, tier, cost, icon
- ✅ Party: name, member count, member list

## 📝 Basic Usage

### Simple Text (No Entities)
```typescript
import { L10N } from "../../InterFacesEnumsAndTypes/L10N";

content: L10N({
  en: "The kingdom is at peace",
  th: "อาณาจักรสงบสุข"
})
```

### With Character Tooltip
```typescript
import { L10NWithEntities } from "../../InterFacesEnumsAndTypes/L10N";

const character = /* ... Character object ... */;

content: L10NWithEntities(
  {
    en: `[char:${character.id}]${character.name}[/char] has rested`,
    th: `[char:${character.id}]${character.name}[/char] พักผ่อน`
  },
  { characters: [character] }  // ← Tooltip data auto-extracted!
)
```

**Frontend receives:**
```json
{
  "en": "[char:reis]Reis[/char] has rested",
  "th": "[char:reis]ไรส์[/char] พักผ่อน",
  "entities": {
    "chars": {
      "reis": {
        "name": { "en": "Reis", "th": "ไรส์" },
        "level": 5,
        "title": "Novice Swordsman",
        "lastSeenLocation": "FyonarCity",
        "portraitUrl": "/portraits/reis.png"
      }
    }
  }
}
```

**Frontend renders:**
```
Reis has rested
└─ Hover shows tooltip:
   ┌──────────────────┐
   │ [Portrait]       │
   │ Reis             │
   │ Level 5          │
   │ Novice Swordsman │
   │ Last seen: City  │
   └──────────────────┘
```

## 🎨 Real-World Examples

### Example 1: Travel (from TravelManager)
```typescript
const leader = party.party.leader;
const locId = party.currentLocation;
const locName = locationRepository.get(locId)?.name || locId;

content: L10NWithEntities(
  {
    en: `[char:${leader.id}]${leader.name}[/char]'s party has reached [loc:${locId}]${locName}[/loc]`,
    th: `ปาร์ตี้ของ [char:${leader.id}]${leader.name}[/char] เดินทางมาถึง [loc:${locId}]${locName}[/loc]`
  },
  {
    characters: [leader],
    locations: [locId]
  }
)
```

### Example 2: Skill Learning
```typescript
const character = /* ... */;
const skill = /* ... */;

content: L10NWithEntities(
  {
    en: `[char:${character.id}]${character.name}[/char] has learned [skill:${skill.id}]${skill.name}[/skill]!`,
    th: `[char:${character.id}]${character.name}[/char] ได้เรียนรู้ [skill:${skill.id}]${skill.name}[/skill]!`
  },
  {
    characters: [character],
    skills: [skill]
  }
)
```

### Example 3: Item Crafted
```typescript
const character = /* ... */;
const item = /* ... */;

content: L10NWithEntities(
  {
    en: `[char:${character.id}]${character.name}[/char] crafted [item:${item.id} rarity:${item.tier}]${item.name}[/item]!`,
    th: `[char:${character.id}]${character.name}[/char] สร้าง [item:${item.id} rarity:${item.tier}]${item.name}[/item]!`
  },
  {
    characters: [character],
    items: [item]
  }
)
```

### Example 4: Combat
```typescript
const attacker = /* ... */;
const defender = /* ... */;

content: L10NWithEntities(
  {
    en: `[char:${attacker.id}]${attacker.name}[/char] attacks [char:${defender.id}]${defender.name}[/char]!`,
    th: `[char:${attacker.id}]${attacker.name}[/char] โจมตี [char:${defender.id}]${defender.name}[/char]!`
  },
  {
    characters: [attacker, defender]
  }
)
```

### Example 5: Regional Event
```typescript
const location = /* ... */;

content: L10NWithEntities(
  {
    en: `Flooding reported in [loc:${location.id}]${location.name}[/loc]!`,
    th: `พบน้ำท่วมใน [loc:${location.id}]${location.name}[/loc]!`
  },
  {
    locations: [location.id]
  }
)
```

## 🏷️ Supported Markup

### Entity Tags (with auto-tooltips)
```
[char:id]Name[/char]      ← Character tooltip auto-generated
[loc:id]Place[/loc]        ← Location tooltip auto-generated
[item:id]Item[/item]       ← Item tooltip auto-generated
[skill:id]Skill[/skill]    ← Skill tooltip auto-generated
[party:id]Party[/party]    ← Party tooltip auto-generated
```

### Formatting Tags
```
[color:red]Text[/color]
[color:#FF5733]Text[/color]
[b]Bold[/b]
[i]Italic[/i]
[u]Underline[/u]
[rarity:legendary]Item[/rarity]  ← Auto-colors by tier
```

## 🔧 What Gets Auto-Extracted

### From Character
```typescript
{
  name: { en: char.name, th: char.nameThai || char.name },
  level: char.level,
  title: char.title.string(),
  lastSeenLocation: char.currentLocation,
  portraitUrl: char.portrait
}
```

### From Location ID
```typescript
// Looks up in locationRepository
{
  name: { en: loc.name, th: loc.nameThai || loc.name },
  description: { en: loc.description, th: loc.descriptionThai },
  region: loc.region,
  subRegion: loc.subRegion
}
```

### From Item
```typescript
{
  name: { en: item.name, th: item.nameThai || item.name },
  description: { en: item.description, th: item.descriptionThai },
  rarity: item.tier,
  stats: item.stats,
  iconUrl: item.icon
}
```

### From Skill
```typescript
{
  name: { en: skill.name, th: skill.nameThai || skill.name },
  description: { en: skill.description, th: skill.descriptionThai },
  tier: skill.tier,
  cost: skill.cost,
  iconUrl: skill.icon
}
```

### From Party
```typescript
{
  name: { en: party.name, th: party.nameThai || party.name },
  memberCount: party.characters.length,
  members: party.characters.slice(0, 5).map(c => ({
    name: c.name,
    level: c.level
  }))
}
```

## ✨ Key Benefits

### 1. Zero Boilerplate
```typescript
// You write:
{ characters: [char] }

// System generates:
{
  chars: {
    [char.id]: {
      name: { en: "...", th: "..." },
      level: 5,
      title: "...",
      // ... everything needed
    }
  }
}
```

### 2. Always Complete
- Auto-extracts ALL tooltip fields
- No missing data
- Consistent structure

### 3. Easy Maintenance
- Change tooltip structure in one place
- All news update automatically
- No manual mapping needed

### 4. Type-Safe
```typescript
// TypeScript knows Character has:
// - name, level, title, portrait, etc.
// Auto-extraction uses these fields
```

## 🎯 Frontend Usage

```tsx
// React component
function NewsItem({ news, locale }: { news: News, locale: 'en' | 'th' }) {
  const text = news.content[locale];
  const entities = news.content.entities || {};
  
  // Parse markup
  return (
    <ParseMarkup text={text}>
      {/* [char:reis]Reis[/char] becomes: */}
      <CharacterTooltip data={entities.chars?.reis}>
        <CharacterLink id="reis">Reis</CharacterLink>
      </CharacterTooltip>
      
      {/* [loc:city]City[/loc] becomes: */}
      <LocationTooltip data={entities.locs?.city}>
        <LocationLink id="city">City</LocationLink>
      </LocationTooltip>
    </ParseMarkup>
  );
}
```

## 📊 Complete Example

```typescript
import { L10NWithEntities } from "../../InterFacesEnumsAndTypes/L10N";

// Complex scenario: Combat + Item Drop
const attacker = getCharacter("reis");
const enemy = getCharacter("bandit");
const item = getItem("goldenSword");

const news = createNews({
  scope: { kind: "worldScope" },
  content: L10NWithEntities(
    {
      en: `[char:${attacker.id}]${attacker.name}[/char] defeated [char:${enemy.id}]${enemy.name}[/char] and obtained [item:${item.id} rarity:${item.tier}]${item.name}[/item]!`,
      th: `[char:${attacker.id}]${attacker.name}[/char] ได้เอาชนะ [char:${enemy.id}]${enemy.name}[/char] และได้รับ [item:${item.id} rarity:${item.tier}]${item.name}[/item]!`
    },
    {
      characters: [attacker, enemy],  // Auto-extracts 2 char tooltips
      items: [item]                   // Auto-extracts 1 item tooltip
    }
  ),
  significance: NewsSignificance.MAJOR,
  propagation: NewsPropagation.REGIONAL,
  context: { /* ... */ }
});
```

**Result sent to FE:**
```json
{
  "content": {
    "en": "[char:reis]Reis[/char] defeated [char:bandit]Bandit[/char] and obtained [item:sword rarity:legendary]Golden Sword[/item]!",
    "th": "[char:reis]ไรส์[/char] ได้เอาชนะ [char:bandit]โจร[/char] และได้รับ [item:sword rarity:legendary]ดาบทอง[/item]!",
    "entities": {
      "chars": {
        "reis": {
          "name": { "en": "Reis", "th": "ไรส์" },
          "level": 5,
          "title": "Novice Swordsman",
          "portraitUrl": "/portraits/reis.png"
        },
        "bandit": {
          "name": { "en": "Bandit", "th": "โจร" },
          "level": 3,
          "title": "Outlaw"
        }
      },
      "items": {
        "sword": {
          "name": { "en": "Golden Sword", "th": "ดาบทอง" },
          "description": { "en": "A legendary blade", "th": "ดาบในตำนาน" },
          "rarity": "legendary",
          "stats": { "attack": 50, "durability": 100 },
          "iconUrl": "/items/golden-sword.png"
        }
      }
    }
  }
}
```

## 🚀 Migration Path

### Step 1: Import
```typescript
import { L10NWithEntities } from "../../InterFacesEnumsAndTypes/L10N";
```

### Step 2: Use Markup
```typescript
// Add [char:id], [loc:id] tags
en: `[char:${char.id}]${char.name}[/char] ...`
```

### Step 3: Pass Entities
```typescript
// Just pass the objects!
{ characters: [char], locations: [locId] }
```

### Step 4: Done!
- Tooltips auto-generated ✅
- Both languages included ✅
- Type-safe ✅

## 💡 Pro Tips

### Tip 1: Reuse Variables
```typescript
const char = party.party.leader;
const loc = party.currentLocation;

content: L10NWithEntities(
  {
    en: `[char:${char.id}]${char.name}[/char] at [loc:${loc}]${loc}[/loc]`,
    th: `[char:${char.id}]${char.name}[/char] ที่ [loc:${loc}]${loc}[/loc]`
  },
  { characters: [char], locations: [loc] }
)
```

### Tip 2: Optional Entities
```typescript
// If no entities, omit the parameter
content: L10NWithEntities(
  {
    en: "Simple text",
    th: "ข้อความง่ายๆ"
  },
  {}  // No entities
)

// Or just use L10N
content: L10N({
  en: "Simple text",
  th: "ข้อความง่ายๆ"
})
```

### Tip 3: Mixed Entities
```typescript
// Multiple types at once
content: L10NWithEntities(
  {
    en: `[char:${char.id}]${char.name}[/char] used [skill:${skill.id}]${skill.name}[/skill] on [char:${enemy.id}]${enemy.name}[/char] at [loc:${loc}]${loc}[/loc]`,
    th: `...`  // Thai version
  },
  {
    characters: [char, enemy],
    skills: [skill],
    locations: [loc]
  }
)
```

## 🔍 How It Works

### Auto-Extraction Process

```typescript
// 1. You pass Character object
{ characters: [char] }

// 2. System extracts fields
{
  id: char.id,
  name: char.name,
  nameThai: char.nameThai,
  level: char.level,
  title: char.title.string(),
  portrait: char.portrait,
  currentLocation: char.location
}

// 3. Builds tooltip data
{
  chars: {
    [char.id]: {
      name: { en: "Reis", th: "ไรส์" },
      level: 5,
      title: "Novice Swordsman",
      lastSeenLocation: "FyonarCity",
      portraitUrl: "/portraits/reis.png"
    }
  }
}

// 4. Returns complete L10N object
{
  en: "...",
  th: "...",
  entities: { chars: {...} }
}
```

### Location Lookup

```typescript
// You pass LocationsEnum
{ locations: [LocationsEnum.FyonarCity] }

// System looks up in locationRepository
const loc = locationRepository.get(LocationsEnum.FyonarCity);

// Extracts data
{
  locs: {
    FyonarCity: {
      name: { en: loc.name, th: loc.nameThai },
      description: { en: loc.description, th: loc.descriptionThai },
      region: loc.region,
      subRegion: loc.subRegion
    }
  }
}
```

## 📦 What Gets Included

### Character Tooltip
```json
{
  "name": { "en": "Reis", "th": "ไรส์" },
  "level": 5,
  "title": "Novice Swordsman",
  "lastSeenLocation": "FyonarCity",
  "portraitUrl": "/portraits/reis.png"
}
```

**Frontend shows on hover:**
- Portrait image
- Localized name
- Level & title
- Last known location (click to map!)

### Location Tooltip
```json
{
  "name": { "en": "Fyonar City", "th": "เมืองฟีอานาร์" },
  "description": { "en": "Capital city", "th": "เมืองหลวง" },
  "region": "CentralPlain",
  "subRegion": "FyonarCapitalDistrict"
}
```

**Frontend shows on hover:**
- Localized name
- Description
- Region/subregion
- Mini map preview (optional)

### Item Tooltip
```json
{
  "name": { "en": "Golden Sword", "th": "ดาบทอง" },
  "description": { "en": "A legendary blade", "th": "ดาบในตำนาน" },
  "rarity": "legendary",
  "stats": { "attack": 50, "durability": 100 },
  "iconUrl": "/items/golden-sword.png"
}
```

**Frontend shows on hover:**
- Item icon
- Localized name & description
- Stats (attack, defense, etc.)
- Rarity color

### Skill Tooltip
```json
{
  "name": { "en": "Flame Sword", "th": "ดาบเพลิง" },
  "description": { "en": "A fiery technique", "th": "เทคนิคไฟ" },
  "tier": "rare",
  "cost": 10,
  "iconUrl": "/skills/flame-sword.png"
}
```

**Frontend shows on hover:**
- Skill icon
- Localized name & description
- Tier/rarity
- Mana/stamina cost

## ✅ Benefits

1. **Zero Boilerplate** - Just pass the entity objects
2. **Always Complete** - All tooltip fields extracted
3. **Type-Safe** - TypeScript validates entity structure
4. **Consistent** - Same tooltip format everywhere
5. **Maintainable** - Change extraction logic in one place
6. **Efficient** - Only extracts what's referenced in markup
7. **Flexible** - Add new entity types easily

## 🎉 Result

**Before (13 lines):**
```typescript
tokens: [
  { t: "char", v: [{ 
    name: char.name,
    level: char.level,
    title: char.title.string(),
    portrait: char.portrait,
    location: char.location
  }] },
  { t: "text", v: " has learned " },
  { t: "skill", id: skill.id, label: skill.name }
]
```

**After (4 lines):**
```typescript
content: L10NWithEntities(
  { en: `[char:${char.id}]${char.name}[/char] learned [skill:${skill.id}]${skill.name}[/skill]`, th: `...` },
  { characters: [char], skills: [skill] }
)
```

**✨ Automatic tooltip generation FTW!** 🚀

