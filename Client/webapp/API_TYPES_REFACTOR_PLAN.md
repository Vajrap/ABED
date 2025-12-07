# API Types Refactor Plan

## Goal
Restructure type files to serve as the **API contract/specification** between frontend and backend, ensuring type safety and clear contracts.

## Current State

### Backend (Source of Truth)
- `Server/src/InterFacesEnumsAndTypes/CharacterInterface.ts` - Exact character API contract
- `Server/src/InterFacesEnumsAndTypes/PartyInterface.ts` - Exact party API contract
- All supporting types (enums, interfaces, etc.)

### Frontend (Needs Alignment)
- `Client/webapp/src/types/character.ts` - Generic character types, doesn't match backend exactly
- `Client/webapp/src/types/game.ts` - UI view types, not aligned with API contract

## Proposed Structure

### 1. `src/types/api.ts` - **API Contract** ✅ Created
- Exact match of backend `CharacterInterface`
- Exact match of backend `PartyInterface`
- All supporting enums and types
- This is the **source of truth** for what backend sends

### 2. `src/types/character.ts` - **Character Creation & Requests**
- Character creation request types (what FE sends)
- Character creation response types
- Character name check types
- Keep existing character creation types

### 3. `src/types/game.ts` - **UI View Types**
- Extend/derive from API types
- UI-specific view types (e.g., `CharacterStatsView`)
- Equipment display types
- Types optimized for UI components

## Benefits

1. **Single Source of Truth**: `api.ts` matches backend exactly
2. **Type Safety**: Frontend knows exactly what backend sends
3. **Clear Separation**: API contract vs UI view types
4. **Easy Updates**: When backend changes, update `api.ts` first
5. **Better Documentation**: Types serve as API documentation

## Next Steps

1. ✅ Create `api.ts` with exact backend types
2. Update `character.ts` to reference API types
3. Update `game.ts` to extend API types
4. Update components to use proper types
5. Update mock data to be compatible with API types

