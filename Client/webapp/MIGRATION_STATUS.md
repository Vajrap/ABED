# Frontend Migration Status (Next.js + Elysia + Bun)

This document tracks the progress of migrating the `Client/webapp` project from its current Vite/React Router stack to a Next.js App Router + Elysia + Bun stack.

## Overall Progress

- [x] Set up Next.js structure in `webapp` directory
- [x] Set up custom server (Elysia + Next.js)
- [x] Migrate theme and global styles to Next.js layout
- [x] Convert React Router routes to Next.js App Router
- [x] Convert ViewModels to React hooks pattern
- [x] Port LoginView component to Next.js
- [x] Port RegisterView component to Next.js
- [x] Migrate Character Creation page (with all 20 classes and 6 races)
- [x] Migrate Game view
- [x] Add LanguageSwitcher to layout
- [x] Add MusicPlayer to layout
- [x] Add metadata API endpoint for character creation
- [x] Update L10N with all new classes and Vulpine race

## Completed Pages

- ✅ `/login` - Fully migrated (`app/login/page.tsx`, `app/login/LoginView.tsx`, `app/login/useLoginLogic.ts`)
- ✅ `/register` - Fully migrated (`app/register/page.tsx`, `app/register/RegisterView.tsx`, `app/register/useRegisterLogic.ts`)
- ✅ `/character-creation` - Fully migrated (`app/character-creation/page.tsx`, `app/character-creation/CharacterCreationView.tsx`, `app/character-creation/useCharacterCreationLogic.ts`)
  - Now supports all 20 classes and 6 races (including Vulpine)
  - Dynamic metadata fetching from backend
- ✅ `/game` - Fully migrated (`app/game/page.tsx`, `app/game/GameView.tsx`)

## Backend API Updates

- ✅ Added `/api/character/metadata` endpoint (GET) - Returns available races, classes, and backgrounds for character creation

## ViewModels → Hooks

- ✅ `LoginViewModel` → `useLoginLogic.ts`
- ✅ `RegisterViewModel` → `useRegisterLogic.ts`
- ✅ Character Creation logic → `useCharacterCreationLogic.ts`

## Pending Tasks

- [ ] Set up Elysia API routes structure (currently using Express backend)
- [ ] Update services to use Elysia API endpoints
- [ ] Remove old `src/` directory after full migration
- [ ] Add stats preview calculation in Character Creation (when backend provides data)

## Migration Pattern

### 1. Create Hook (ViewModel → Hook)
- Convert class-based ViewModel to React hook
- Use `useState` instead of class state
- Return state and handlers

### 2. Create View Component
- Use `"use client"` directive
- Import and use the hook
- Replace `useNavigate()` with `useRouter()` from `next/navigation`
- Replace `router.push()` instead of `navigate()`

### 3. Create Page Route
- Simple wrapper that imports and renders the View component

## Notes

- Old `src/` directory is kept until migration is complete
- Components can be imported from `@/components` (paths configured in tsconfig.json)
- Services work with existing Express backend for now
- Theme and localization systems work as-is
- All 20 classes from ClassEnum are now available in character creation
- Vulpine race added to race selection
