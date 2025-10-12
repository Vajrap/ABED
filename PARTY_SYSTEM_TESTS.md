# Party System Unit Tests

## Overview

Comprehensive unit tests for the PartyService following the same testing pattern as CharacterService.

---

## **Test Results**

```
✅ 30 tests passing
❌ 0 tests failing
⏱️ Runtime: 56ms
📊 82 expect() calls
```

---

## **Test Coverage**

### **1. createParty() - 7 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Party creation | Creates party with character as leader | ✅ Pass |
| Character placement | Character in first slot, rest "none" | ✅ Pass |
| Behavior initialization | Initializes with PartyBehavior | ✅ Pass |
| Travel state | isTraveling defaults to false | ✅ Pass |
| Arrival state | justArrived defaults to false | ✅ Pass |
| Informations | Empty object initially | ✅ Pass |
| Multiple locations | Creates at different locations | ✅ Pass |

**Key Validations:**
- ✅ Party entity created correctly
- ✅ Leader assigned from character
- ✅ PartyID matches character ID
- ✅ Location set correctly
- ✅ Initial state correct (not traveling, not arrived)
- ✅ Character array properly initialized (6 slots)

---

### **2. partyToInsertParty() - 7 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Entity conversion | Converts party to DB format | ✅ Pass |
| Character IDs | Converts characters to ID array | ✅ Pass |
| Behavior serialization | Serializes to JSONB format | ✅ Pass |
| Informations serialization | Serializes to JSONB format | ✅ Pass |
| ActionSequence serialization | Serializes to JSONB format | ✅ Pass |
| Audit fields | Sets createdBy/updatedBy | ✅ Pass |
| Multiple characters | Handles party with multiple chars | ✅ Pass |

**Key Validations:**
- ✅ All fields correctly mapped
- ✅ Character objects converted to IDs
- ✅ "none" strings preserved
- ✅ Complex objects serialized for JSONB
- ✅ Audit fields set to "system"
- ✅ Leader ID correctly assigned

---

### **3. Party State Management - 2 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Initial state | Correct initial values | ✅ Pass |
| ID consistency | PartyID matches leader ID | ✅ Pass |

**Key Validations:**
- ✅ isTraveling: false
- ✅ justArrived: false
- ✅ location: as specified
- ✅ partyID === leader.id

---

### **4. Party Character Array - 3 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Array length | Always 6 slots | ✅ Pass |
| Slot filling | First filled, rest "none" | ✅ Pass |
| Character identification | getCharacters() returns actual chars | ✅ Pass |

**Key Validations:**
- ✅ Array always has exactly 6 elements
- ✅ First slot contains character
- ✅ Slots 1-5 contain "none"
- ✅ getCharacters() filters out "none"

---

### **5. Party Behavior Initialization - 2 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Behavior calculation | Calculated from character | ✅ Pass |
| Party type | Type is set | ✅ Pass |

**Key Validations:**
- ✅ combatPolicy defined
- ✅ riskTaking defined
- ✅ eventResponse defined
- ✅ Party type defined

---

### **6. Conversion Consistency - 2 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Data integrity | All fields preserved | ✅ Pass |
| "none" handling | "none" strings correct | ✅ Pass |

**Key Validations:**
- ✅ No data loss in conversion
- ✅ Critical fields maintained
- ✅ "none" strings not converted to null

---

### **7. Edge Cases - 3 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Special IDs | Handles UUID edge cases | ✅ Pass |
| Long names | Handles long character names | ✅ Pass |
| Character types | Handles different types | ✅ Pass |

**Key Validations:**
- ✅ Special UUID formats work
- ✅ Long names (100 chars) work
- ✅ Different CharacterType values work

---

### **8. Party ActionSequence - 2 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Initialization | Default sequence assigned | ✅ Pass |
| Preservation | Maintained through conversion | ✅ Pass |

**Key Validations:**
- ✅ ActionSequence object defined
- ✅ Correctly serialized to JSONB

---

### **9. Multiple Party Creation - 2 Tests**

| Test | Description | Status |
|------|-------------|--------|
| Distinct parties | Each party is unique | ✅ Pass |
| Different locations | Parties at different places | ✅ Pass |

**Key Validations:**
- ✅ Different partyIDs
- ✅ Different leaders
- ✅ Different locations

---

## **Test Structure**

### **Mock Character Creation**

```typescript
function createMockCharacter(name: string = "TestHero"): Character {
  const character = new Character({
    id: randomUUID(),
    name: name,
    type: CharacterType.humanoid,
    gender: "MALE",
    level: 1,
    // ... all required fields
  });
  
  character.userId = "test-user-id";
  character.race = "human";
  
  return character;
}
```

**Benefits:**
- Consistent test data
- Easy to create variations
- Mimics real character creation

---

## **Test Categories**

### **Pure Function Tests** ✅
- `createParty()`
- `partyToInsertParty()`

**No Database Required:**
- All tests are pure unit tests
- No mocking of database needed
- Fast execution (56ms for 30 tests)

### **Not Tested (Integration Only)**
- `savePartyToDatabase()` - Requires actual DB
- `getPartyByPartyID()` - Requires actual DB
- `updateParty()` - Requires actual DB

**Rationale:**
- Database methods will be tested through integration tests
- User specified: "we don't need integration test here, I'll just handtesting integration"

---

## **Key Insights from Tests**

### **1. Party Entity is Correctly Initialized**
```typescript
✅ partyID = character.id
✅ leader = character
✅ characters = [character, "none", "none", "none", "none", "none"]
✅ location = specified location
✅ isTraveling = false
✅ justArrived = false
✅ informations = {}
✅ behavior = new PartyBehavior()
✅ actionSequence = defaultPartyAction
```

### **2. Conversion to DB Format is Accurate**
```typescript
✅ Character objects → Character IDs
✅ "none" strings preserved
✅ Complex objects serialized (behavior, actionSequence, informations)
✅ Audit fields set
✅ All required fields present
```

### **3. Edge Cases Handled**
```typescript
✅ Special UUID formats
✅ Long character names
✅ Different character types
✅ Multiple party creation
✅ Different locations
```

---

## **Code Quality Metrics**

| Metric | Value | Status |
|--------|-------|--------|
| Tests Passing | 30/30 | ✅ 100% |
| Assertions | 82 | ✅ Good coverage |
| Execution Time | 56ms | ✅ Fast |
| Test File Size | ~320 lines | ✅ Well-structured |
| Functions Tested | 2/5 | ✅ Pure functions only |

---

## **Comparison with CharacterService Tests**

### **Similarities**
- ✅ Pure function testing
- ✅ No database mocking
- ✅ Mock entity creation
- ✅ Comprehensive edge cases
- ✅ Conversion testing

### **Differences**
- PartyService: 30 tests
- CharacterService: ~25 tests
- PartyService: Simpler entity (fewer fields)
- PartyService: No race/class/background complexity

---

## **Running the Tests**

### **Run Party Tests Only**
```bash
cd Server
bun test Tests/Services/PartyService.test.ts
```

### **Run All Service Tests**
```bash
bun test Tests/Services/
```

### **Run All Tests**
```bash
bun test
```

### **Watch Mode**
```bash
bun test --watch Tests/Services/PartyService.test.ts
```

---

## **Test Maintenance**

### **When to Update Tests**

1. **Party Entity Changes**
   - New fields added
   - Behavior calculation changed
   - Character array logic changed

2. **Service Method Changes**
   - New methods added
   - Conversion logic changed
   - Validation logic changed

3. **Bug Fixes**
   - Add test for the bug
   - Fix the code
   - Verify test passes

---

## **Future Test Additions**

### **If Database Tests Needed**
```typescript
describe("savePartyToDatabase", () => {
  it("should save party to database", async () => {
    // Mock database
    // Test save operation
  });
});

describe("getPartyByPartyID", () => {
  it("should fetch party from database", async () => {
    // Mock database
    // Test fetch operation
  });
});

describe("updateParty", () => {
  it("should update party in database", async () => {
    // Mock database
    // Test update operation
  });
});
```

**For Now:** Hand-testing integration with actual database

---

## **Test Success Summary**

### **✅ All PartyService Pure Functions Tested**
- `createParty()` - 7 tests
- `partyToInsertParty()` - 7 tests

### **✅ All Edge Cases Covered**
- State initialization
- Character array handling
- Behavior setup
- Conversion consistency
- Special IDs, long names, different types
- Multiple parties
- Different locations

### **✅ Fast & Reliable**
- 56ms execution
- No flaky tests
- No database dependencies

---

## **Integration Testing Plan**

### **Manual Testing Checklist**

1. **Create Character via API**
   ```bash
   POST /api/character/create
   # Should auto-create party
   ```

2. **Verify Party in Database**
   ```sql
   SELECT * FROM parties WHERE party_id = '<character_id>';
   ```

3. **Verify Character-Party Link**
   ```sql
   SELECT c.id, c.name, c.party_id, p.party_id 
   FROM characters c 
   JOIN parties p ON c.party_id = p.party_id;
   ```

4. **Fetch Party via API** (when implemented)
   ```bash
   GET /api/party
   # Should return party with character
   ```

---

**Last Updated**: October 8, 2025  
**Test Status**: ✅ All Passing (30/30)  
**Coverage**: Pure functions only (as requested)  
**Next**: Manual integration testing with actual database

