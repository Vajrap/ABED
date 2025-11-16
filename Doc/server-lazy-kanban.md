# Server Lazy Kanban

## Workflow Buckets
- `Backlog`: Prioritized upcoming work; pull from here first.
- `In Progress`: Actively being developed; keep limited and updated with owner + start date.
- `Blocked`: Needs attention to unblock; note blockers clearly.
- `Done`: Completed and verified; include completion date.
- `Archive`: Retired ideas or long-term parking.

## Backlog

### Core Systems & Infrastructure
- [ ] Implement Quest System — quest class/interface, quest tracking on Character, quest database schema, quest givers, objectives, completion logic, rewards (SYSTEM_ARCHITECTURE.md 7.0.1)
- [ ] Implement Dialogue System — NPCDialogue class, dialogue tree system, dialogue outcomes, NPC dialogue definitions, choice system (SYSTEM_ARCHITECTURE.md 7.0.2)
- [ ] Implement Item Shop System — shop class/interface, shop inventory, buy/sell logic, shop UI integration, shop types (SYSTEM_ARCHITECTURE.md 7.0.6)
- [ ] Implement Item Pickup System — item spawn system, pickup validation, item discovery mechanics, ground item management (SYSTEM_ARCHITECTURE.md 7.0.7)
- [ ] Implement Knowledge Exchange System — knowledge exchange implementation, trade event system, relationship updates, knowledge types (scholarly, military, underworld, religious, folk) (SYSTEM_ARCHITECTURE.md 7.0.11)
- [ ] Implement Storyline Event System — storyline tracking on Character/GameState, storyline progression, storyline-specific event cards, completion tracking, branching logic (SYSTEM_ARCHITECTURE.md 7.0.10)

### Action Handlers & Gameplay
- [ ] Implement Gathering Action Handlers — Mining, WoodCutting, Foraging handlers with resource generation, skill checks, success rates (SYSTEM_ARCHITECTURE.md 7.0.3)
- [ ] Implement Refining Action Handlers — Smelting, Tanning, Carpentry, Weaving, Enchanting handlers with material transformation, success rates, quality calculations (SYSTEM_ARCHITECTURE.md 7.0.4)
- [ ] Implement Special Location Action Handlers — religious sites (HeavensDecreeMeeting, ChurchOfLaoh, Shrines, etc.), guilds (AdventureGuild, BountyBoard), schools (MagicSchool, MagicAcademy, etc.) with location-specific logic, rewards, requirements (SYSTEM_ARCHITECTURE.md 7.0.5)
- [ ] Implement Encounter Resolution — encounter event checking, encounter type determination, encounter outcome logic, battle triggering from encounters (SYSTEM_ARCHITECTURE.md 7.0.8)
- [ ] Deepen party & character actions — validate action plans server-side, flesh out artisan/train/read outcomes, and implement encounter resolution.

### World Events & Narrative
- [ ] Implement World Event Escalation System — escalation checking logic (check global event scale against thresholds), escalation event triggering, climax event triggering at max scale, escalation effects implementation (SYSTEM_ARCHITECTURE.md 7.0.9)
- [ ] Build out event decks & narrative hooks — author diverse global/regional cards with escalation, completion, and cleanup logic.
- [ ] Author encounter & event content — fill global/regional/local decks with card definitions (`onDraw`, resolution flows) and location random events.

### Travel & Locations
- [ ] Extend travel mechanics (train support) — add train infrastructure to repositories, extend `TravelMethodEnum`, and implement multi-mode pathing & events. (Note: Rail system exists but needs events/improvements)
- [ ] Expand locations & world-building — seed additional regions/sub-regions, connect location graph, and populate random event handlers.
- [ ] Populate world data foundations — enumerate regions/sub-regions/locations, connect the travel graph, seed weather and inn/resource configs.
- [ ] Instrument travel news & milestones — add rail/overland travel news templates, milestone announcements, and archive/decay behaviour.

### Economy & Market
- [ ] Align economy & market systems — finalize resource capacities/rates, integrate seasonal adjustments, and surface pricing via API.
- [ ] Initialize economy baselines — load market inventories, resource baselines, recipes, and pricing modifiers for early gameplay.

### Persistence & State
- [ ] Persist party/character state — create DB schema + load/save routines for parties, characters, inventories, and quest progress.

### News & Communication
- [ ] Finalize news delivery pipeline — persist/archive news, complete `postman.deliver`, and expose history endpoints.

### Testing & Tooling
- [ ] Expand automated testing & tooling — add unit/integration suites, seed scripts, and monitoring/alerting instrumentation.
- [ ] Ship debug fixtures & tools — CLI/admin helpers to spawn parties, inspect state, seed quests, and trigger events for testing.

### Content & NPCs
- [ ] Seed parties, NPCs, and default behaviours — create initial party roster, character stats/gear, NPC definitions, and behaviour weights.

## In Progress
- _None — pull from backlog when ready to start work._

## Blocked
- _None — flag items here with blockers and owners._

## Done
- [x] Initial board setup (2025-11-09)
- [x] Stabilize core loop & persistence — prod loop fixed at 15 min; add manual trigger (CLI/API) for dev/test; derive in-game clock from real-world elapsed time (no persisted state) with mapping plan (≈2 real weeks = 1 game year); detail persistence targets later; parameterize scheduling and cover `runGameLoop`. (Completed - moved from In Progress)

## Archive
- _Empty — park long-term ideas here when needed._
