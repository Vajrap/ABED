# Battle Simulator

A standalone frontend application for simulating battles from the game's battle system.

## Setup

### Prerequisites
1. **Start the backend server first** (required for API):
   ```bash
   cd Server
   bun run dev
   ```
   The server will run on http://localhost:7890

2. **Then start the battle simulator frontend**:
   ```bash
   cd Client/battle-simulator
   npm install  # First time only
   npm run dev
   ```
   The app will run on http://localhost:3020 and proxy API requests to http://localhost:7890/api/playground

### Quick Start
```bash
# Terminal 1: Start backend
cd Server && bun run dev

# Terminal 2: Start frontend
cd Client/battle-simulator && npm run dev
```

Then open http://localhost:3020 in your browser.

## Features

- Configure two parties with up to 6 characters each
- Choose from predefined MOBs or create custom characters
- Select race, class, level, skills, and equipment
- Run battle simulations
- View turn-by-turn results with expandable details
- Save and load battle presets
- View detailed battle statistics

## Usage

1. **Configuration Tab**: Set up Party A and Party B
   - Click on character slots to add/configure characters
   - Choose MOB or custom character
   - Set level, skills, and equipment
   - Select location and battle type
   - Click "Simulate Battle" to run

2. **Battle Results Tab**: View simulation results
   - Turn-by-turn list with one-line summaries
   - Expand each turn to see detailed information
   - View party summaries and statistics

3. **Presets Tab**: Manage battle configurations
   - Load predefined presets
   - Save current configuration as custom preset
   - Delete custom presets

