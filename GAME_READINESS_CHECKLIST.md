# Game Readiness Checklist

## ✅ Core Systems (Ready)

### Server Infrastructure
- ✅ Express server setup (`Server/src/index.ts`)
- ✅ Database initialization (`Server/src/Database/init.ts`)
- ✅ Game loop system (`Server/src/Game/GameLoop.ts`)
- ✅ API routes structure (`Server/src/API/index.ts`)
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Environment variable support

### Game Systems
- ✅ Character creation (all 20 classes with balanced skills)
- ✅ Battle system (damage resolution, turn order, skills)
- ✅ Skill system (189 skill files, all classes have skills)
- ✅ Buff/Debuff system (49 definitions)
- ✅ Location system (with events and actions)
- ✅ Market system (dynamic pricing)
- ✅ News system (propagation and decay)
- ✅ Game time system (phases, days, seasons, years)
- ✅ Party system
- ✅ Travel system (including rail)

### Database
- ✅ Schema definitions (11 tables)
- ✅ Migration system (Drizzle ORM)
- ✅ Connection pooling

---

## ⚠️ Critical for Basic Gameplay

### 1. API Endpoints - Character Actions
**Status:** ✅ Fully implemented

**Current Implementation:**
- [✅] Character action sequence endpoint (`/api/actions/update`) - Players set their CharacterActionSequence (CAS) for rest, train, craft, etc.
- [✅] Location actions are handled via CAS - all location actions (Rest, Train, Craft, etc.) are set through the action sequence

**Note:** 
- **Battles are automatic** - They occur when parties encounter each other during game loop processing (`GameLoop.processEvents` → `locationManager.processEncounters`). No player-initiated battle endpoint needed (though BattleSimulatorService exists in playground for testing).
- **Skills are automatic** - During battle, skills are selected automatically from the character's skill deck via `getPlayableSkill()`. No manual skill selection endpoint needed.
- **Item management** - Equipment functions exist (`equip`, `removeEquipment` in `Server/src/Utils/equip.ts`) but **no API endpoints exist** for players to manage inventory/equipment. May need endpoints for:
  - Equip item from inventory
  - Unequip item to inventory
  - View inventory
  - Use consumable items (if applicable)

### 2. Battle Rewards & Looting
**Status:** TODO marked in code

**Location:** `Server/src/Entity/Battle/Battle.ts` lines 281, 491

**Needed:**
- [ ] Experience rewards calculation
- [ ] Gold rewards calculation
- [ ] Item drop system
- [ ] Loot distribution logic

### 3. Character Progression
**Status:** Partially implemented

**Needed:**
- [ ] Level up logic (exp thresholds)
- [ ] Stat increases on level up
- [ ] Skill point allocation
- [ ] Attribute point allocation

### 4. Authentication & Session
**Status:** Basic implementation exists

**Needed:**
- [ ] Password hashing (bcrypt) - TODO in `login/index.ts`
- [ ] Session management
- [ ] JWT token system (if using)
- [ ] User authentication middleware

---

## 🔧 Important but Not Blocking

### 5. Gathering & Refining Actions
**Status:** Enums defined, no handlers

**Location:** `Server/src/Entity/Location/Location.ts` lines 614-622

**Actions Missing:**
- [ ] Mining (ore, gemstones)
- [ ] WoodCutting
- [ ] Foraging
- [ ] Smelting
- [ ] Tanning
- [ ] Carpentry
- [ ] Weaving
- [ ] Enchanting

**Impact:** Players can't gather resources or refine materials

### 6. Special Location Actions
**Status:** No handlers implemented

**Missing:**
- [ ] Religious site actions
- [ ] Adventure Guild actions
- [ ] Bounty Board actions
- [ ] School actions

### 7. Item Management API
**Status:** Functions exist, but no API endpoints

**Location:** `Server/src/Utils/equip.ts`, `Server/src/Utils/removeEquipment.ts`

**Needed:**
- [ ] Equip item endpoint (use existing `equip` function)
- [ ] Unequip item endpoint (use existing `removeEquipment` function)
- [ ] Get inventory endpoint (expose character inventory/equipment data)
- [ ] Use consumable item endpoint (if consumables are implemented)

### 8. Item Shop System
**Status:** Market exists, but no buy/sell interface

**Needed:**
- [ ] Shop inventory management
- [ ] Buy item endpoint
- [ ] Sell item endpoint
- [ ] Shop refresh logic

### 9. Quest System
**Status:** Enums defined, no implementation

**Needed:**
- [ ] Quest class/interface
- [ ] Quest tracking on Character
- [ ] Quest database schema
- [ ] Quest giver NPCs
- [ ] Quest objectives
- [ ] Quest rewards

---

## 🎮 Nice to Have (Future Features)

### 10. Dialogue System
**Status:** Enum defined, needs implementation

**Needed:**
- [ ] NPCDialogue class
- [ ] Dialogue tree system
- [ ] Dialogue outcomes

### 11. World Event Escalation
**Status:** Types exist, no checking logic

**Needed:**
- [ ] Escalation checking
- [ ] Climax event triggering
- [ ] Escalation effects

### 12. Storyline System
**Status:** Mentioned in TODOs

**Needed:**
- [ ] Storyline tracking
- [ ] Storyline progression
- [ ] Storyline-specific events

### 13. Knowledge Exchange
**Status:** Logic commented out

**Needed:**
- [ ] Party-to-party knowledge sharing
- [ ] Trade events
- [ ] Relationship system

---

## 🐛 Known Issues to Fix

### Battle System
- [ ] Location-based damage effects (weather interactions)
- [ ] Some skill buffs not fully implemented:
  - Arcane Shield buff
  - Shield Up defense buff
  - Retreat Dash evasion + movement
  - Hex of Rot endurance debuff
  - Spirit Rattle control buff

### Character System
- [ ] Breathing skill condition logic
- [ ] Element implications
- [ ] Deck condition TEAMMATE, ENEMY, PARTY_SIZE

### MOBs
- [ ] Active skills for all humanoid classes (~50+ TODOs)
- [ ] Conditional skills (HP/MP low, enemy/ally conditions)

---

## 📋 Minimum Viable Product (MVP) Checklist

To get the game running for basic gameplay:

### Essential:
1. ✅ Server starts and connects to database
2. ✅ Character creation works
3. ✅ Battle system works
4. ⚠️ **API endpoints for player actions** (partially done)
5. ⚠️ **Battle rewards** (TODO)
6. ⚠️ **Character progression** (level up, exp)
7. ⚠️ **Authentication** (password hashing needed)

### Important:
8. ✅ **Location actions** (fully implemented via `/api/actions/update` - rest, train, craft work; gathering actions need handlers)
9. ⚠️ **Item management** (equip/remove functions exist, but may need API endpoints for inventory management)
10. ⚠️ **Party management** (create, join, leave - need to verify endpoints exist)

### Nice to Have:
11. Quest system
12. Dialogue system
13. Gathering/refining
14. Shop system

---

## 🚀 Quick Start Recommendations

### Priority 1: Get Basic Gameplay Working
1. **Implement battle rewards** - Players need exp/gold from battles (TODO in `Battle.ts`)
2. **Add level up logic** - Character progression (exp thresholds, stat increases)
3. **Fix password hashing** - Security issue (TODO in `login/index.ts`)
4. **Verify item/inventory API endpoints** - Check if equip/unequip endpoints exist, or add them

### Priority 2: Core Features
5. **Item management API endpoints** - Equip/unequip/inventory management
6. **Item shop buy/sell** - Economy
7. **Gathering actions** - Resource collection (handlers for Mining, WoodCutting, etc.)

### Priority 3: Polish
8. **Quest system** - Content
9. **Dialogue system** - NPC interactions
10. **MOB skills** - Better enemy AI

---

## 📊 Current Status Summary

**Core Systems:** 90% Complete ✅
- Server infrastructure: ✅
- Database: ✅
- Battle system: ✅
- Skills: ✅
- Character creation: ✅

**Gameplay Features:** 70% Complete ⚠️
- Character actions: ✅ (fully implemented via `/api/actions/update`)
- Battle rewards: ❌ (TODO in code)
- Progression: ⚠️ (partially done - level up logic needed)
- Item management: ⚠️ (functions exist, may need API endpoints)

**Content Systems:** 30% Complete ⚠️
- Gathering/refining: ❌
- Quests: ❌
- Dialogue: ❌
- Shops: ⚠️ (market exists, no interface)

**Overall Readiness:** ~70% 🎯

---

## 🎯 Next Steps

1. **Implement battle rewards** - Critical for progression (TODO in `Battle.ts` lines 281, 491)
2. **Add level up logic** - Character progression (exp thresholds, stat increases, skill points)
3. **Verify/add item management endpoints** - Check if equip/unequip/inventory endpoints exist
4. **Fix password hashing** - Security issue (TODO in `login/index.ts`)
5. **Test end-to-end flow** - Character creation → Set actions → Game loop processes → Battle (automatic) → Rewards → Level up

**Note on Game Mechanics:**
- **Battles are automatic** - Occur when parties encounter during game loop processing. No player-initiated battle needed.
- **Skills are automatic** - Selected from character's skill deck during battle turns. No manual skill selection.
- **Location actions** - Fully implemented via `/api/actions/update` endpoint where players set their CharacterActionSequence.

The game has a solid foundation! The main gaps are battle rewards and character progression systems.

