# Server

## Setup

Install dependencies with Bun:

```bash
bun install
```

Create a `.env` file (copy from `.env.example` if present) and populate database credentials plus the game-loop settings listed below.

### Game Loop Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `GAME_LOOP_MODE` | `prod` | `prod` auto-schedules every phase; set to `dev` or `test` to disable the timer and rely on manual triggers. |
| `GAME_EPOCH_UTC` | `2025-01-01T00:00:00.000Z` | ISO timestamp for the in-game Year 0, Season 1, Day 1, Phase 1 reference point. |
| `GAME_MS_PER_PHASE` | `900000` | Real-world milliseconds per game phase (15 min by default). Lower this in dev/test to advance time faster. |

## Running the Server

```bash
bun run index.ts
```

This command initializes the database, starts the scheduler (if `GAME_LOOP_MODE=prod`), and exposes the HTTP API.

## Manual Game Loop Trigger

When running in `dev`/`test` modes—or if you need to fast-forward the world—you can invoke the loop manually:

```bash
# Run a single simulated phase (uses epoch + phase length to generate timestamps)
bun run game:loop --simulate --phases 1

# Advance three actual phases using the current wall-clock time, even if they were processed already
bun run game:loop --phases 3 --force
```

Flags:

- `--phases <n>`: number of iterations (default `1`)
- `--simulate`: advances phases using deterministic timestamps (ignores real time)
- `--force`: processes the phase even if it was already handled (implies `--simulate`)

In production the scheduler performs an initial catch-up run on startup and replays any missed phases sequentially before handling the current tick, so manual triggers can safely coexist with the timer.

## Notes

- The scheduler computes in-game time from the real clock each run; no persistent game-time state is stored between restarts.
- Loop metrics track total/success/failure counts, consecutive failures, and last error; phase failures emit a warning after three consecutive errors and are reset on the next success.
- At the start of each in-game day (`hour === 1`), the server snapshots game state, market data, resource tracking, and news archives back into Postgres.
- This project was created using `bun init` in bun v1.2.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
