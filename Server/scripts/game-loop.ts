#!/usr/bin/env bun
import { runGameLoop } from "../src/Game/GameLoop";
import { GameTime } from "../src/Game/GameTime/GameTime";
import Report from "../src/Utils/Reporter";
import { initializeDatabase, shutdownDatabase } from "../src/Database/init";
import { getGameEpoch, getMsPerPhase } from "../src/config/gameLoop";

type CLIOptions = {
  phases: number;
  force: boolean;
  simulate: boolean;
};

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);

  let phasesValue: number | undefined;
  for (const key of ["--phases", "--phase"]) {
    const idx = args.findIndex((arg) => arg === key);
    if (idx >= 0) {
      const raw = args[idx + 1];
      phasesValue = raw ? Number(raw) : undefined;
      break;
    }
  }

  const force = args.includes("--force");
  const simulate = args.includes("--simulate");

  return {
    phases: phasesValue !== undefined && Number.isFinite(phasesValue) && phasesValue > 0 ? phasesValue : 1,
    force: force || simulate,
    simulate,
  };
}

async function main() {
  const options = parseArgs();

  await initializeDatabase();

  let startPhaseIndex = 0;
  let startGameTime = {
    year: 0,
    season: 0,
    dayOfSeason: 0,
    hour: 0,
    phaseIndex: 0,
  };

  try {
    GameTime.synchronize();

    startPhaseIndex = GameTime.getCurrentPhaseIndex();
    startGameTime = {
      year: GameTime.year,
      season: GameTime.season,
      dayOfSeason: GameTime.dayOfSeason,
      hour: GameTime.hour,
      phaseIndex: startPhaseIndex,
    };

    Report.info(
      `Manual game loop trigger starting (phases=${options.phases}, force=${options.force}, simulate=${options.simulate})`,
      {
        startGameTime,
      },
    );

    let lastPhaseIndex = startPhaseIndex;
    const epoch = getGameEpoch().getTime();
    const msPerPhase = getMsPerPhase();

    for (let i = 0; i < options.phases; i++) {
      let nowOverride: Date | undefined = undefined;

      if (options.simulate) {
        const targetPhase = lastPhaseIndex + 1;
        const simulatedNow = new Date(epoch + targetPhase * msPerPhase);
        nowOverride = simulatedNow;
        lastPhaseIndex = targetPhase;
      }

      await runGameLoop({
        now: nowOverride,
        force: options.force,
        label: options.simulate ? "simulated" : "manual",
      });
    }
  } finally {
    const endPhaseIndex = GameTime.getCurrentPhaseIndex();
    const endGameTime = {
      year: GameTime.year,
      season: GameTime.season,
      dayOfSeason: GameTime.dayOfSeason,
      hour: GameTime.hour,
      phaseIndex: endPhaseIndex,
    };

    Report.info("Manual game loop trigger finished", {
      startPhaseIndex,
      endPhaseIndex,
      phaseDelta: endPhaseIndex - startPhaseIndex,
      startGameTime,
      endGameTime,
    });

    await shutdownDatabase();
  }
}

main()
  .then(() => {
    Report.info("Manual game loop run completed.");
    process.exit(0);
  })
  .catch((error) => {
    Report.error("Manual game loop run failed", { error });
    process.exit(1);
  });

