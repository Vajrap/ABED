# Type Narrowing in Item System

## The Problem

When a subclass extends a parent class, TypeScript infers the property types from the parent, even if the constructor accepts a narrower type:

```typescript
// Before type narrowing
class Item {
  id: ItemId;  // Wide type (all items)
}

class Equipment extends Item {
  constructor(data: { id: EquipmentId }) {  // Narrow type (only equipment)
    super(data);
  }
}

// Problem: TypeScript infers equipment.id as ItemId, not EquipmentId!
const equipment = new Equipment({ id: SwordId.ironSword });
equipment.id;  // Type: ItemId ❌ (should be EquipmentId)
```

This weakens type safety because functions might accept non-equipment ItemIds even though the object is Equipment.

## The Solution: `declare id` Pattern

Use TypeScript's `declare` keyword to override the property type in subclasses:

```typescript
class Equipment extends Item {
  // Override to narrow type from ItemId to EquipmentId
  declare id: EquipmentId;  // ✅
  
  constructor(data: { id: EquipmentId }) {
    super(data);
  }
}

// Now it works!
const equipment = new Equipment({ id: SwordId.ironSword });
equipment.id;  // Type: EquipmentId ✅
```

The `declare` keyword tells TypeScript "this property exists with this narrower type" without actually creating a new property at runtime. It's purely a compile-time type assertion.

## Type Hierarchy in Our System

```typescript
Item
├── id: ItemId

Equipment extends Item
├── declare id: EquipmentId  // EquipmentId ⊆ ItemId

Weapon extends Equipment
├── declare id: WeaponId  // WeaponId ⊆ EquipmentId

Sword extends Weapon
├── declare id: SwordId  // SwordId ⊆ WeaponId

// Each level narrows the type further!
```

## Real-World Example

```typescript
// ✅ Type-safe equipment function
function equipItem(char: Character, equipment: Equipment, slot: CharacterEquipmentSlot) {
  // equipment.id is EquipmentId, not ItemId
  // TypeScript prevents you from passing a BookId or FoodId
  equipmentRepository.set(equipment.id, equipment);  // ✅ Safe!
  
  // Later when we access it...
  const equippedId = equipment.id;  // Type: EquipmentId ✅
}

// ❌ Without type narrowing, this would be possible:
function badEquipItem(char: Character, equipment: Equipment, slot: CharacterEquipmentSlot) {
  // equipment.id would be ItemId
  // TypeScript might allow BookId.magicTome here ❌
  ItemRepository.set(equipment.id, equipment);
}
```

## Applied Throughout the System

Every subclass now has proper type narrowing:

### Equipment
```typescript
Equipment.id    → EquipmentId
Weapon.id       → WeaponId
Sword.id        → SwordId
Axe.id          → AxeId
Armor.id        → ArmorId
Body.id         → BodyId
HeadWear.id     → HeadWearId
// ... etc
```

### Consumables
```typescript
ItemConsumable.id → ConsumableId
Potion.id         → PotionId
Food.id           → FoodId
Useable.id        → UsableId
```

### Misc Items
```typescript
ItemMisc.id     → MiscItemId
ItemResource.id → ResourceId
Wood.id         → WoodId
Skin.id         → SkinId
Bone.id         → BoneId
Gold.id         → GoldId
```

### Books
```typescript
ItemBook.id → BookId
```

## Benefits

1. **Maximum Type Safety**: Functions can't accidentally accept wrong item types
2. **Better IDE Support**: Auto-complete shows only valid IDs for each class
3. **Catch Errors Early**: TypeScript catches type mismatches at compile time
4. **Self-Documenting**: The type system itself documents what IDs are valid
5. **Refactoring Safety**: Changing ID types updates everywhere automatically

## Example in Practice

```typescript
import { Sword } from "./Equipment/Weapon/Sword/Sword";
import { SwordId } from "./Equipment/Weapon/type";
import { equipmentRepository } from "./Equipment/repository";

// Creating a sword
const ironSword = new Sword(...);
ironSword.id;  // Type: SwordId ✅

// Repository enforces types
equipmentRepository.set(ironSword.id, ironSword);  // ✅ Works

// Can't put wrong type
const potion = new Potion(...);
equipmentRepository.set(potion.id, ironSword);  // ❌ TypeScript error!
// Error: Argument of type 'PotionId' is not assignable to parameter of type 'EquipmentId'

// Functions receive narrowed types
function modifyWeapon(weaponId: WeaponId) {
  // weaponId is guaranteed to be a weapon, not any item
}

const weapon = new Sword(...);
modifyWeapon(weapon.id);  // ✅ Works - weapon.id is SwordId (subset of WeaponId)

const food = new Food(...);
modifyWeapon(food.id);  // ❌ TypeScript error!
// Error: Argument of type 'FoodId' is not assignable to parameter of type 'WeaponId'
```

## Key Takeaway

The `declare id` pattern ensures that TypeScript knows the exact type of ID at every level of the hierarchy, providing maximum type safety without runtime overhead!


