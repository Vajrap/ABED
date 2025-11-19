# Battle System Cheat Sheet for Skill Design Agents

Use this sheet as the system prompt when briefing an LLM to design skills. Keep output grounded in the flow below.

## Party & Formation
- Each party is a fixed 6-slot array: positions 0-2 form the **front line**, 3-5 the **back line**. Use "none" placeholders for empty seats.
- Characters track `front/back` indirectly via their index; targeting helpers already know how to pick a row, shuffle aggro, or skip dead slots.
- A battle always features two parties (A and B). Party metadata (leader, behavior, travel state) matters outside combat; inside combat we only read their character array.

## Turn Economy
1. **AB Gauge Loop** – Each living unit gains `max(statMod(agility), 1)` AB per tick. Hitting 100 grants the next turn and resets the bar.
2. **Turn Cap** – 200 total turns max; reaching it ends combat as a draw after logging survivors.

## Turn Pipeline (Actor Perspective)
1. **Pre-Turn Hooks** – Each trait’s `beforeTurn` fires, then buffs/debuffs resolve. If any says “no,” return a control-state `TurnResult`.
2. **On-Turn Hooks** – Traits run `onTurn`, often building shared context for end-of-turn effects.
3. **Resource Refresh** – Actor regenerates their class resource before picking a skill.
4. **Skill Selection** – Iterate the actor’s prepared skill deck top to bottom. The first skill whose requirements (resource, equipment, buff state) pass is used; fallback is `basicAttack`.
5. **Consume** – Subtract HP/MP/SP plus elemental costs immediately.
6. **Execute** – Call `skill.exec(actor, userPartyAlive, targetPartyAlive, skillLevel, location)`. Logic inside handles targeting, damage, cleansing, etc.
7. **Produce** – Apply deterministic vitals gains, then roll each elemental output between its min/max and add to the resource pool.
8. **Post-Turn Hooks** – Traits run `onEndTurn`, healing statistics record total HP restored, and the log captures `TurnResult.content`.

## Skill Description Examples
- **Heal (Cleric)** – "Restore HP to an ally with least HP percentage. Heals for 1d6 + willpower modifier * (1 + 0.1 * skill level). At level 3+, also removes one debuff from the target.",
- **Defense Up (Guardian)** – "Raise your shield and prepare for incoming attacks. Adds a defense up buff to self for 1 turn, at level 5 the buff lasts for 2 turns. \n Defense up: pDEF and mDEF goes up by 2 effect don't stack."
- **Backstab (Rogue)** – "Slip into your enemy’s blind spot and drive your blade deep. The user must be in hiding state, Deals 1.3× weapon damage + Dexterity mod * (+0.1 per skill level). Gains +4 critical roll if the target is Frightened or Dazed. If skill level reached 5 the base damage went up to 1.5 times weapon damage and critical roll + 5."
- **Chaotic Blessing (Shaman)** – "Has 50% chance to deal damage to all enemies or heal the whole team for 1d6 + ((willpower mod + planar mod )/2) * (1 + (0.1 * skillLevel)). At level 5 the dice is 1d8: heal target roll DC10, if success, gain +1 chaos, attacked target roll DC10 willpower save if fail remove random resource by 1."
- **Turn Undead (Cleric)** – “Deal 1d4 + willpower mod true holy damage to non-undead. Against undead, force a DC10 (DC12 at level 5+) will save; failure means 9999 true damage, success still takes 1d12 + willpower holy damage.”
- **BackDraft (Mage)** - "Targets all enemies with burn status. Deals damage equal to their burn stacks, removes all burn stacks * (1 + 0.1 * skill level), then heals yourself for total equal to all damages did. Damage dealth and Healing amount increased to 1d2 per stack instead of 1 at skill level 5",