# Equipment to Battle Sprite Mapping

## Armor Types (from Backend)

### Body Armor (BodyId)
- **Cloth:**
  - Tunic
  - Robe
  - MageRobe
- **Light:**
  - PaddedArmor
  - LeatherArmor
  - StuddedLeatherArmor
- **Medium:**
  - HideArmor
  - ChainShirt
  - ScaleMail
- **Heavy:**
  - ChainMail
  - SplintMail
  - PlateArmor

### Head Wear (HeadWearId)
- **Cloth:**
  - SimpleHood
  - ScholarCap
- **Light:**
  - LeatherCap
  - ScoutHood
- **Medium:**
  - ChainCoif
- **Heavy:**
  - SteelHelm

### Hand Armor (HandId)
- **Cloth:**
  - ClothGloves
- **Light:**
  - LeatherGloves
- **Medium:**
  - ReinforcedGloves
- **Heavy:**
  - SteelGauntlets

### Leg Armor (LegId)
- **Cloth:**
  - LinenPants
- **Light:**
  - LeatherPants
- **Medium:**
  - ChainLeggings
- **Heavy:**
  - PlateGreaves

### Foot Armor (FootId)
- **Cloth:**
  - ClothShoes
- **Light:**
  - TravelerBoots
  - LeatherBoots
- **Medium:**
  - ChainBoots
- **Heavy:**
  - PlateSabatons

### Accessories
- **Ear (EarId):** CopperEarring, IronEarring, SilverEarring, GoldEarring
- **Neck (NeckId):** CopperNecklace, SilverNecklace, GoldNecklace
- **Ring (RingId):** CopperRing, IronRing, SilverRing, GoldRing
- **Util (UtilId):** Idol, Relic, Totem, Mechanic

---

## Weapon Types (from Backend)

### Bare Hand (BareHandId)
- BareHand

### Daggers (DaggerId)
- Stiletto
- Knife

### Swords (SwordId)
- ShortSword
- LongSword
- Rapier
- GreatSword

### Blades (BladeId)
- Katana
- Scimitar
- Cutlass
- Falchion

### Axes (AxeId)
- Axe
- BroadAxe
- WarAxe

### Spears (SpearId)
- Dory
- Javelin
- Halberd

### Hammers (HammerId)
- MorningStar
- Hammer
- WarHammer
- Scepter

### Bows (BowId)
- LongBow
- ShortBow
- Crossbow

### Staves (StaffId)
- QuarterStaff
- LongestStaff
- Staff

### Shields (ShieldId)
- Buckler
- KiteShield
- TowerShield

### Books/Tomes (BookWId)
- Bible
- Grimoire
- Codex

### Wands (WandId)
- Wand

### Orbs (OrbId)
- Orb

---

## Current Battle Sprite Assets

### Available Clothing Sprites
- **17 variants:** `cloth1` through `cloth17`
- Each has `/bot/` and `/top/` subdirectories
- Path structure: `/img/battle/cloth/cloth{N}/bot/` and `/img/battle/cloth/cloth{N}/top/`
- Files are named like: `cloth{N}_c{color}_bot.png` and `cloth{N}_c{color}_top.png`

### Available Weapon Sprites
- **5 variants:** `weapon1` through `weapon5`
- Each has `/bot/` and `/top/` subdirectories
- Path structure: `/img/battle/weapon/weapon{N}/bot/` and `/img/battle/weapon/weapon{N}/top/`
- Files are named like: `weapon{N}_c{color}_bot.png` and `weapon{N}_c{color}_top.png`

## Mapping Strategy

### Armor Mapping Needed
You have **12 body armor types** but **17 cloth sprite variants** available. You'll need to map:
- **Cloth armors (3 types):** Tunic, Robe, MageRobe → `cloth1`, `cloth2`, `cloth3`?
- Tunic: 4
- Robe: 1
- MageRobe: 1
- **Light armors (3 types):** PaddedArmor, LeatherArmor, StuddedLeatherArmor → `cloth4`, `cloth5`, `cloth6`?
- Padded: 2
- Leather: 3
- StuddedLeather: 3

- **Medium armors (3 types):** HideArmor, ChainShirt, ScaleMail → `cloth7`, `cloth8`, `cloth9`?
- Hide: 16
- ChainShirt: 16
- Scale: 11
- **Heavy armors (3 types):** ChainMail, SplintMail, PlateArmor → `cloth10`, `cloth11`, `cloth12`?
- Chain 11
- Splint 13
- Plate 13

**Note:** Head, Hand, Leg, Foot armor may need separate sprite sets or might reuse body sprites.

### Weapon Mapping Needed
You have **30+ weapon types** but only **5 weapon sprite variants** available. You'll need to map:
- **Swords (4 types):** ShortSword, LongSword, Rapier, GreatSword → `weapon1`, `weapon2`, `weapon3`, `weapon4`?
- **Blades (4 types):** Katana, Scimitar, Cutlass, Falchion → reuse sword sprites?
- **Daggers (2 types):** Stiletto, Knife → `weapon5`?
- **Axes (3 types):** Axe, BroadAxe, WarAxe → reuse weapon sprites?
- **Spears (3 types):** Dory, Javelin, Halberd → reuse weapon sprites?
- **Hammers (4 types):** MorningStar, Hammer, WarHammer, Scepter → reuse weapon sprites?
- **Bows (3 types):** LongBow, ShortBow, Crossbow → separate sprites needed?
- **Staves (3 types):** QuarterStaff, LongestStaff, Staff → separate sprites needed?
- **Shields (3 types):** Buckler, KiteShield, TowerShield → separate sprites needed?
- **Books (3 types):** Bible, Grimoire, Codex → separate sprites needed?
- **Wands (1 type):** Wand → separate sprite needed?
- **Orbs (1 type):** Orb → separate sprite needed?
- **BareHand (1 type):** BareHand → no sprite (or empty)

- Sword: 1
- Blade: 1 (TODO)
- Dagger: 3
- Axe: 2
- Spear: 4
- Hammer: 1 (TODO)
- Bow: 1 (TODO)
- Staves: 1 (TODO)
- Shield: (TODO) 
- Book: (TODO)
- Wand: 5
- Ord: (TODO)
- Barehand: None

### Accessories
- **Ear, Neck, Ring, Util:** Likely don't need battle sprites (too small/invisible)

## Next Steps

1. **Visual inspection needed:** You'll need to look at the actual sprite images to determine which equipment IDs map to which sprite variants
2. **Create mapping function:** Once you determine the mappings, we'll create a function like:
   ```typescript
   function getArmorSpriteId(armorId: BodyId): string {
     // Map BodyId to cloth{N}
   }
   
   function getWeaponSpriteId(weaponId: WeaponId): string {
     // Map WeaponId to weapon{N}
   }
   ```
3. **Color handling:** Equipment will use the character's base color (c1-c6, or c1 for filtered colors c7/c8)

## Recommendation

Since you have many equipment types but limited sprite variants, you may want to:
- Group similar equipment types together (e.g., all swords use `weapon1`)
- Or create a priority system where only certain equipment types get unique sprites
- Or expand the sprite assets to cover more equipment types

