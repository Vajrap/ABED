# Game Server Testing Plan

This document outlines a comprehensive testing strategy for the game server, organized by priority, complexity, and testing approach.

## Current Test Coverage Analysis

### ✅ **Already Tested**

- **Character Title System** - Comprehensive (role/epithet/combination logic)
- **Character Core Class** - Constructor, actions, buffs/debuffs, news interface, state management (26 tests)
- **Character Alignment System** - Good/Evil/Chaotic alignment with all ladders and edge cases (54 tests)
- **Character Vitals System** - HP/MP/SP management, death states, value clamping, JSON serialization (66 tests)
- **Character Attributes System** - Base/bonus/battle stat calculations with full statMod integration (69 tests)
- **StatMod Utility** - Complete stat modifier calculations for all value ranges (30 tests)
- **Basic Utilities** - Dice, clamp, isBodyValid
- **Character Stats Training** - Basic training mechanics
- **Skill Learning** - Basic skill acquisition

### ❌ **Major Testing Gaps**

- 90% of Entity classes lack tests
- No integration tests between systems
- No battle system tests
- No game loop/timing tests
- No location/event handling tests
- No manager class tests

## Priority 1: Critical Core Systems (HIGH PRIORITY)

### 1.1 Character System Core (`/Entity/Character/`)

#### **Character.ts** - Main character class ✅ **COMPLETED**

- **Unit Tests Implemented:**
  - ✅ Constructor with various data combinations (required/optional fields)
  - ✅ Constructor with different character types and genders
  - ✅ `getActionFor()` method with different day/time combinations
  - ✅ `getActionFor()` with custom action sequences
  - ✅ `clearBuffAndDebuff()` logic (permanent vs temporary buffs)
  - ✅ `intoNewsInterface()` conversion with different subregions
  - ✅ Character state management (party assignment, equipment, collections)
  - ✅ Integration with all subclass components
- **Test Coverage:** 26 tests, 206 assertions - All passing ✅

#### **CharacterVitals.ts** - HP/MP/SP management ✅ **COMPLETED**

- **Unit Tests Implemented:**
  - ✅ Constructor with default and custom vitals
  - ✅ Vital class behavior (base/bonus/current/max calculations)
  - ✅ Value setting methods (setBase, setBonus, setCurrent) with clamping
  - ✅ Value modification methods (addBase, addBonus, inc, dec)
  - ✅ Death state detection (`isDead` property)
  - ✅ HP/MP/SP management methods (incHp, decHp, incMp, etc.)
  - ✅ Method chaining support
  - ✅ JSON serialization and deserialization
  - ✅ Edge cases (large values, floating point, negative values)
  - ✅ Integration scenarios (battle damage, rest recovery, character progression)
- **Test Coverage:** 66 tests, 145 assertions - All passing ✅

#### **CharacterAttributes.ts** - Core stats system ✅ **COMPLETED**

- **Unit Tests Implemented:**
  - ✅ Constructor with default and custom attribute values
  - ✅ StatBlock class functionality (base/bonus/battle/exp calculations)
  - ✅ All stat manipulation methods (setBase, applyBattleChange, applyBonusChange)
  - ✅ Stat mutation methods (mutateBase, mutateBattle, mutateBonus)
  - ✅ Battle clearing functionality (clearBattle)
  - ✅ Total stat calculations (getTotal)
  - ✅ JSON serialization and deserialization
  - ✅ Complex scenarios (character progression, battle effects, equipment changes)
  - ✅ Integration with statMod function for game mechanics
  - ✅ All 12 attribute types (strength, agility, intelligence, etc.)
- **Test Coverage:** 69 tests, 227 assertions - All passing ✅

#### **StatMod Function** - Stat modifier calculations ✅ **COMPLETED**

- **Unit Tests Implemented:**
  - ✅ All boundary value testing (1-30 range)
  - ✅ Edge cases (above 30, negative values, floating point)
  - ✅ Common game scenarios (average, heroic, legendary, weak stats)
  - ✅ Integration with CharacterAttributes system
- **Test Coverage:** 30 tests, 30 assertions - All passing ✅

#### **CharacterBattleStats.ts** - Combat statistics

- **Unit Tests Needed:**
  - Attack/defense calculations
  - Critical hit/miss mechanics
  - Battle modifier applications
  - Stat clearing after battle
  - Combat effectiveness calculations
  - Edge cases (negative stats, overflow)

### 1.2 Battle System (`/Entity/Battle/`)

#### **Battle.ts** - Core combat engine

- **Unit Tests Needed:**
  - Battle initialization with two parties
  - Turn order calculation and management
  - `updateAbGuage()` with various agility values
  - Buff/debuff effects on turn speed (haste, slow, timeWarp)
  - `checkBattleEnd()` scenarios (victory, defeat, draw)
  - Experience calculation algorithm
  - Battle type configurations (Normal, Training, Arena, etc.)
  - Party strength calculation
  - Battle cleanup (stat clearing, health reset)

- **Integration Tests Needed:**
  - Full battle simulation with mock parties
  - Battle report generation
  - Multi-turn battle scenarios

### 1.3 Game Time & Loop (`/Game/`)

#### **GameTime.ts** - Time management

- **Unit Tests Needed:**
  - Time advancement (`advanceOnePhrase()`)
  - Current time getters (day, phase, date)
  - Time calculations and conversions
  - Calendar system accuracy

#### **GameLoop.ts** - Main game execution

- **Unit Tests Needed:**
  - Schedule calculation (`nextScheduleTick()`)
  - Milestone handling for different time periods
  - Event processing integration
  - News aggregation and delivery
  - Error handling during loop execution

- **Integration Tests Needed:**
  - Full game loop simulation
  - Time-based event triggering
  - News system integration

## Priority 2: Entity Management (MEDIUM-HIGH PRIORITY)

### 2.1 Location System (`/Entity/Location/`)

#### **LocationManager.ts** - Location coordination

- **Unit Tests Needed:**
  - Location registration and retrieval
  - Resource refilling mechanics
  - Weather card drawing
  - Encounter processing
  - Action processing

#### **Location Event Handlers** (`/Events/handlers/`)

- **Unit Tests Per Handler:**
  - **Train handlers** - Attribute/skill/proficiency training
  - **Rest handlers** - Different rest types (inn, house, camping, normal)
  - **Craft handlers** - Item creation and resource consumption
  - **Learn handlers** - Skill acquisition
  - **Read handlers** - Information gathering
  - **Strolling handlers** - Random encounters
  - **Tavern handlers** - Social interactions

#### **Encounters** (`/Logics/Encounters/`)

- **Unit Tests Needed:**
  - Hostile encounter detection
  - Neutral encounter resolution
  - Encounter probability calculations

### 2.2 Item & Equipment System (`/Entity/Item/`)

#### **Item.ts & Equipment.ts**

- **Unit Tests Needed:**
  - Item creation and properties
  - Equipment slot assignment
  - Equipment effects application
  - Equipment removal and cleanup
  - Item cost calculations
  - Weapon/armor specific mechanics

#### **Equipment Operations**

- **Unit Tests Needed:**
  - `equip()` function with various scenarios
  - `remove()` function with stat cleanup
  - `getOrThrow()` error handling
  - Equipment modifier applications

### 2.3 Party Management (`/Entity/Party/`)

#### **Party.ts** - Group mechanics

- **Unit Tests Needed:**
  - Party formation and member management
  - `isAllDead()` logic
  - Party-wide stat calculations
  - Action sequence coordination
  - Travel party management

#### **PartyBehavior.ts**

- **Unit Tests Needed:**
  - Behavior pattern implementation
  - Party decision making
  - Group action coordination

### 2.4 Skills System (`/Entity/Skill/`, `/Entity/BreathingSkill/`, `/Entity/LightnessSkill/`)

#### **Skill.ts & learnSkill.ts**

- **Unit Tests Needed:**
  - Skill acquisition mechanics
  - Experience tracking and leveling
  - Skill prerequisites checking
  - Active/conditional skill management

#### **BreathingSkill & LightnessSkill**

- **Unit Tests Needed:**
  - Internal skill mechanics
  - Element type associations
  - Skill activation and effects

## Priority 3: Supporting Systems (MEDIUM PRIORITY)

### 3.1 News & Communication (`/Entity/News/`)

#### **News.ts & Postman.ts**

- **Unit Tests Needed:**
  - News creation with different scopes
  - News delivery mechanisms
  - Scope-based filtering
  - News aggregation and merging
  - Character news interface conversion

### 3.2 Character Subsystems

#### **CharacterFame.ts** - Reputation system

- **Unit Tests Needed:**
  - Fame calculation by region
  - Fame string representation
  - Fame modifiers and effects

#### **CharacterBehavior.ts** - AI behavior

- **Unit Tests Needed:**
  - Crafting preference logic
  - Trade policy implementation
  - Behavior pattern selection

#### **CharacterNeeds.ts** - Character needs

- **Unit Tests Needed:**
  - Need satisfaction mechanics
  - Need decay over time
  - Need fulfillment effects

#### **CharacterAlignment.ts** - Moral alignment ✅ **COMPLETED**

- **Unit Tests Implemented:**
  - ✅ Constructor with good/evil values
  - ✅ Good ladder (Kind, Noble, Saint, Divine) with all thresholds
  - ✅ Evil ladder (Cruel, Vile, Tyrant, Infernal) with all thresholds
  - ✅ Chaotic ladder (Mad, Lunatic, Maniac, Anarch) with average calculation
  - ✅ Initiate (default state) for values < 30
  - ✅ Chaotic condition logic (both ≥30, difference <30)
  - ✅ Boundary testing and edge cases
  - ✅ Extreme values and negative value handling
- **Test Coverage:** 54 tests, 58 assertions - All passing ✅
- **Implementation Fix:** Corrected chaotic calculation to use average instead of difference
- **Implementation Fix:** Fixed turnMax function thresholds (30-49, 50-69, 70-89, 90-100)

### 3.3 Advanced Character Features

#### **DeckCondition.ts** - Conditional logic

- **Unit Tests Needed:**
  - Condition evaluation
  - Deck state management
  - Conditional skill activation

#### **PlanarAptitude.ts** - Planar magic

- **Unit Tests Needed:**
  - Aptitude calculations
  - Planar effects application
  - Cross-planar interactions

## Priority 4: Utilities & Infrastructure (LOW-MEDIUM PRIORITY)

### 4.1 Enhanced Utilities (`/Utils/`)

#### **Reporter.ts** - Logging system

- **Unit Tests Needed:**
  - Log level filtering
  - Message formatting
  - Error reporting

#### **News utilities**

- **Unit Tests Needed:**
  - `addNewsToScope()` function
  - `mergeNewsStructure()` complex merging

### 4.2 Connection Management (`/Entity/Connection/`)

#### **connectionManager.ts**

- **Unit Tests Needed:**
  - Connection establishment
  - Connection pooling
  - Error handling and recovery

### 4.3 Travel System (`/Game/TravelManager/`)

#### **TravelManager & TravelingParty**

- **Unit Tests Needed:**
  - Travel method calculations
  - Distance and time calculations
  - Travel event handling
  - Party travel coordination

## Testing Implementation Strategy

### Test Structure Organization

```
Tests/
├── Unit/                    # Isolated component tests
│   ├── Entity/
│   │   ├── Character/       # Character system tests
│   │   ├── Battle/          # Battle system tests
│   │   ├── Location/        # Location system tests
│   │   └── ...
│   ├── Game/                # Game system tests
│   └── Utils/               # Utility tests
├── Integration/             # System interaction tests
│   ├── BattleFlow/          # Full battle scenarios
│   ├── GameLoop/            # Complete game cycles
│   ├── LocationEvents/      # Location event chains
│   └── CharacterProgression/ # Character development
└── E2E/                     # End-to-end scenarios
    ├── GameSession/         # Full game sessions
    ├── PartyAdventures/     # Multi-character scenarios
    └── WorldSimulation/     # Large-scale simulations
```

### Testing Patterns to Implement

#### 1. **Factory Pattern Enhancement**

- Extend `CharacterFactory` for more complex scenarios
- Create factories for `Battle`, `Location`, `Party`, `Item`
- Add scenario builders for common test setups

#### 2. **Mock Strategy**

- Mock external dependencies (time, random, file I/O)
- Create test doubles for manager classes
- Implement deterministic random for reproducible tests

#### 3. **Test Data Management**

- Create shared test fixtures
- Implement data builders for complex objects
- Add test scenario templates

#### 4. **Performance Testing**

- Battle performance with large parties
- Game loop efficiency testing
- Memory usage monitoring
- Location event processing speed

### Implementation Phases

#### **Phase 1 (Week 1-2): Core Systems**

- Character vitals, attributes, battle stats
- Basic battle mechanics
- Game time management
- Essential utilities

#### **Phase 2 (Week 3-4): Battle System**

- Complete battle flow testing
- Experience calculations
- Battle type variations
- Buff/debuff system

#### **Phase 3 (Week 5-6): Location & Events**

- Location event handlers
- Encounter system
- Resource management
- News system

#### **Phase 4 (Week 7-8): Integration & Polish**

- Cross-system integration tests
- Performance optimization
- Edge case coverage
- Documentation updates

### Test Quality Metrics

#### **Coverage Goals**

- **Unit Test Coverage**: 90%+ for critical systems
- **Integration Coverage**: 80%+ for system interactions
- **Branch Coverage**: 85%+ for complex logic paths

#### **Quality Indicators**

- All tests must be deterministic (no flaky tests)
- Each test should complete in <100ms
- Integration tests should complete in <5s
- Full test suite should run in <2 minutes

### Special Testing Considerations

#### **Game-Specific Challenges**

- **Randomness**: Use seeded random generators for reproducibility
- **Time Dependencies**: Mock time progression for predictable tests
- **State Persistence**: Test save/load scenarios
- **Complex Interactions**: Focus on emergent behavior testing

#### **Performance Critical Areas**

- Battle turn calculation (frequent execution)
- Game loop processing (real-time requirements)
- News aggregation (multiple sources)
- Location event handling (concurrent processing)

### Continuous Integration Setup

#### **Test Automation**

- Run tests on every commit
- Separate fast/slow test suites
- Automated coverage reporting
- Performance regression detection

#### **Test Environment**

- Isolated test database
- Configurable test modes
- Parallel test execution
- Cross-platform compatibility

## Conclusion

This testing plan addresses the significant testing gap in the game server codebase. Implementation should follow the priority order, starting with core character and battle systems, then expanding to supporting systems and finally comprehensive integration testing.

## Progress Summary

### ✅ **Completed (Phase 1 - Core Character Systems)**

- **Character Class**: 26 comprehensive tests covering constructor, actions, buffs/debuffs, news interface, state management
- **Character Alignment**: 54 comprehensive tests covering good/evil/chaotic ladders, edge cases, boundary conditions
- **Character Vitals**: 66 comprehensive tests covering HP/MP/SP management, death states, value clamping, JSON serialization
- **Character Attributes**: 69 comprehensive tests covering stat calculations, equipment effects, battle modifiers, JSON serialization
- **StatMod Utility**: 30 comprehensive tests covering all modifier ranges, edge cases, game scenarios
- **Total New Tests Added**: 245 tests, 636+ assertions
- **Bug Fixes During Testing**:
  - Fixed chaotic alignment calculation (now uses average instead of difference)
  - Fixed turnMax thresholds for proper alignment ranges
  - Corrected CharacterAlignment constructor (removed law/chaos parameters)

### 🔄 **Next Priority Items**

1. **CharacterBattleStats** - Combat statistics
2. **CharacterProficiencies** - Skill proficiency system
3. **CharacterElements** - Elemental affinities
4. **Battle System** - Core combat engine

### 📊 **Current Coverage Status**

- **Before**: ~10% test coverage, 4 major systems tested
- **After**: ~25% test coverage, 9 major systems tested
- **Tests Added**: 245 new tests (from 61 to 306 total tests)
- **Quality**: All new tests passing, deterministic, fast execution (~60ms total)

The success of this plan depends on:

1. Consistent test-driven development practices
2. Regular refactoring to maintain testability
3. Continuous coverage monitoring
4. Team commitment to testing standards

**Updated Estimated Implementation Time**: 4-6 weeks for comprehensive coverage (reduced due to established patterns and accelerated progress)
**Resource Requirements**: 1-2 developers focused on testing
**Success Metrics**: >90% coverage, <5% flaky tests, stable performance benchmarks
