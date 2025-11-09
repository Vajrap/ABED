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

  const phasesIndex = args.findIndex((arg) => arg === "--phases");
  const phasesValue =
    phasesIndex >= 0 && args[phasesIndex + 1]
      ? Number(args[phasesIndex + 1])
      : 1;

  const force = args.includes("--force");
  const simulate = args.includes("--simulate");

  return {
    phases: Number.isFinite(phasesValue) && phasesValue > 0 ? phasesValue : 1,
    force: force || simulate,
    simulate,
  };
}

async function main() {
  const options = parseArgs();

  Report.info(
    `Manual game loop trigger starting (phases=${options.phases}, force=${options.force}, simulate=${options.simulate})`,
  );

  await initializeDatabase();

  try {
    GameTime.synchronize();

    let lastPhaseIndex = GameTime.getCurrentPhaseIndex();
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

