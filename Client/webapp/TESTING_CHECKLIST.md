# Testing Checklist for Next.js Migration

## Prerequisites
- ✅ Backend server running in Docker on `http://localhost:7890`
- ✅ Frontend dependencies installed (`bun install` in `Client/webapp`)
- ✅ Start dev server: `bun run dev` (should start on `http://localhost:3000`)

## Pages to Test

### 1. Login Page (`/login`)
- [ ] Page loads correctly
- [ ] Username/email field works
- [ ] Password field works
- [ ] Login button is enabled when form is valid
- [ ] Error messages display correctly for invalid credentials
- [ ] Successfully logs in and redirects to `/game` or `/character-creation`
- [ ] Language switcher works (if visible)
- [ ] Music player works (if visible)

### 2. Register Page (`/register`)
- [ ] Page loads correctly
- [ ] All form fields work (username, email, password, confirm password, EULA checkbox)
- [ ] Password strength indicator works
- [ ] Password mismatch validation works
- [ ] EULA dialog opens and displays correctly
- [ ] Form validation prevents invalid submissions
- [ ] Registration succeeds and redirects to `/login`
- [ ] Error messages display correctly (e.g., username taken)

### 3. Character Creation Page (`/character-creation`)
- [ ] Page loads correctly
- [ ] **Metadata loads** - Should fetch races, classes, and backgrounds from `/api/character/metadata`
- [ ] **All 6 races display** - Human, Elven, Orc, Dwarf, Halfling, Vulpine
- [ ] **All 20 classes display** - Cleric, Seer, Mage, Mystic, Rogue, SpellBlade, Shaman, Barbarian, Warrior, Knight, Guardian, Paladin, Druid, Monk, Warlock, Duelist, Witch, Inquisitor, Scholar, Engineer, Nomad
- [ ] All 6 backgrounds display - Retainer, Peasant, Merchant, Scholar, Artisan, Soldier
- [ ] Name field validation works (min 3, max 20, English/Thai only)
- [ ] Gender selection works (Male/Female)
- [ ] Race selection updates portrait options
- [ ] Portrait selector works (prev/next buttons)
- [ ] Class selection shows description
- [ ] Background selection shows description
- [ ] Character creation succeeds and redirects to `/game`
- [ ] Error messages display correctly (e.g., name taken)

### 4. Game Page (`/game`)
- [ ] Page loads correctly
- [ ] Sidebar displays with all menu items
- [ ] Party member cards display correctly
- [ ] Schedule modal opens and works
- [ ] Logout button works and redirects to `/login`
- [ ] All sidebar buttons work (Stats, Skills, Inventory, etc.)

## API Endpoints to Verify

### Backend (Express - Docker)
- [ ] `POST /api/login` - Login works
- [ ] `POST /api/register` - Registration works
- [ ] `GET /api/character/metadata` - Returns races, classes, backgrounds
- [ ] `POST /api/character/create` - Character creation works
- [ ] `POST /api/character/checkName` - Name validation works

## Common Issues to Check

1. **CORS Errors** - If you see CORS errors, check if the backend allows requests from `http://localhost:3000`
2. **API Connection** - Verify backend is accessible at `http://localhost:7890`
3. **Missing Dependencies** - Run `bun install` if you see module not found errors
4. **Type Errors** - Check that TypeScript compilation succeeds
5. **Routing** - All routes should work without React Router errors

## Browser Console Checks

- [ ] No React errors
- [ ] No API call failures (check Network tab)
- [ ] No TypeScript errors
- [ ] Metadata fetch succeeds (`/api/character/metadata`)

## Notes

- The frontend currently uses the Express backend (not Elysia routes yet)
- All API calls go to `http://localhost:7890` (configured in `RestHandler.ts`)
- Language switcher and Music player should be visible on all pages (in layout)
- Character creation now supports all 20 classes and 6 races dynamically

