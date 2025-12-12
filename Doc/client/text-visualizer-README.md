# L10N Text Visualizer

A simple web application to visualize how L10N text (skills, buffs, debuffs) will render in the frontend with all markup and formula replacements.

## Features

- **Skills Visualization**: View all skills with their descriptions, formulas, and level-based conditionals
- **Buffs/Debuffs Visualization**: View all buffs and debuffs with their descriptions, formulas, and counter values
- **Markup Rendering**: See how markup tags like `[r]`, `[g]`, `[b]`, `<BuffName>`, `<DebuffName>`, etc. are rendered
- **Formula Replacement**: See how `<FORMULA>`, `<COUNTER>`, stat modifiers, and other placeholders are replaced
- **Language Switching**: Switch between English and Thai
- **Reusable Rendering Logic**: The `renderText()` function in `app.js` can be copied to the actual Client codebase

## Usage

### Start the server

```bash
cd Client/text-visualizer
bun run dev
```

The server will start on `http://localhost:3001`

**Note:** If port 3001 is already in use, you can:
- Kill the existing process: `lsof -ti:3001 | xargs kill -9`
- Or use a different port: `PORT=3002 bun run dev`

### View in browser

Open `http://localhost:3001` in your browser to see the visualizer.

## Mock Character

The app uses a mock character with:
- **Skills**: All skills from the enum with random levels (1-5)
- **Buffs**: All buffs with random values (1-3) and counters (0-4)
- **Debuffs**: All debuffs with random values (1-3) and counters (0-4)
- **Stats**: Predefined stat values for modifier calculations

## Rendering Logic

The core rendering logic is in `public/app.js` in the `renderText()` function. This function:

1. Replaces `<FORMULA>` with the actual formula
2. Handles level conditionals: `{5}'value_if_5+':'value_if_below'{/}`
3. Handles counter conditionals: `{COUNTER>=1}text{/}`
4. Renders color tags: `[r]`, `[g]`, `[b]`
5. Renders buff/debuff tags: `<BuffName>`, `<DebuffName>`
6. Replaces stat modifiers: `<STRmod>`, `<DEXmod>`, etc.
7. Replaces other placeholders: `<WeaponDamage>`, `<COUNTER>`

This logic can be directly reused in your actual Client application.

## File Structure

```
text-visualizer/
├── server.ts          # Bun server
├── package.json       # Dependencies
├── public/
│   ├── index.html    # Main HTML page
│   ├── app.js        # Rendering logic (reusable)
│   └── style.css     # Styling
└── README.md         # This file
```

## API Endpoints

- `GET /api/character` - Returns mock character data
- `GET /api/l10n` - Returns all L10N data (skills, buffs, debuffs)

