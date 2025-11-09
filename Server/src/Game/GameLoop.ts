import { GameTime } from "./GameTime/GameTime";
import type { DayOfWeek, TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import {
  type NewsDistribution,
  newsArrayToStructure,
} from "../Entity/News/News";
import { locationManager } from "../Entity/Location/Manager/LocationManager";
import { travelManager } from "./TravelManager";
import Report from "../Utils/Reporter";
import { postman } from "../Entity/News/Postman";
import { mergeNewsStructures } from "../Utils/mergeNewsStructure";
import { gameState } from "./GameState";
import { drawSubRegionsWeatherCard } from "../Event/subRegionWeather.ts";
import { drawGlobalEventCard } from "../Event/drawGlobalEventCard.ts";
import { drawRegionEventCard } from "../Event/drawRegionEventCard.ts";
import { market } from "../Entity/Market/Market.ts";
import { newsArchiveService } from "../Entity/News/NewsArchive";
import { getGameLoopMode } from "../config/gameLoop";
import { persistLastProcessedPhase } from "../Database/gameStateStore";
import { saveDailyState } from "../Database/persistence";

type RunGameLoopOptions = {
  now?: Date;
  force?: boolean;
  label?: string;
};

type ProcessPhaseOptions = RunGameLoopOptions & {
  label: string;
  skipBacklog?: boolean;
};

const loopMetrics = {
  totalRuns: 0,
  successfulRuns: 0,
  skippedRuns: 0,
  failedRuns: 0,
  lastDurationMs: 0,
};

const nowMs = () =>
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();

let runQueue: Promise<void> = Promise.resolve();

export async function runSchedule() {
  const mode = getGameLoopMode();

  if (mode !== "prod") {
    Report.info(
      `Game loop scheduler disabled (mode=${mode}). Use manual trigger to advance phases.`,
    );
    GameTime.synchronize();
    return;
  }

  try {
    await runGameLoop({ label: "startup" });
  } catch (error) {
    Report.error("Initial game loop run failed during scheduler start", {
      error,
    });
  }

  scheduleNextTick();
}

function scheduleNextTick() {
  const now = new Date();
  const delay = GameTime.timeUntilNextPhase(now);
  const nextRun = new Date(now.getTime() + delay);

  Report.info(
    `Next game loop scheduled for ${nextRun.toLocaleTimeString()} (in ${Math.round(
      delay / 1000,
    )}s)`,
  );

  setTimeout(async () => {
    try {
      await runGameLoop();
    } catch (error) {
      Report.error("Scheduled game loop run failed", { error });
    } finally {
      scheduleNextTick();
    }
  }, delay);
}

export async function runGameLoop(options: RunGameLoopOptions = {}) {
  const label = options.label ?? "scheduled";
  const task = () =>
    processPhaseInternal({
      ...options,
      label,
    });
  const taskPromise = runQueue.then(task);
  runQueue = taskPromise.catch(() => {});
  await taskPromise;
}

async function handleGameMilestones(): Promise<NewsDistribution> {
  const { hour, dayOfSeason, season } = GameTime;

  let allNews: NewsDistribution = {
    worldScope: [],
    regionScope: new Map(),
    subRegionScope: new Map(),
    locationScope: new Map(),
    partyScope: new Map(),
    privateScope: new Map(),
  };

  // day of season and day of week seems a bit redundant, but we'll keep it for now
  if (season === 1 && dayOfSeason === 1 && hour === 1) {
    // New year
    // https://www.notion.so/Draw-Global-Event-Card-2737d01e172a801aa596f75ab9503fb5?source=copy_link
    // If a Global Event occurred last year, draw a new Global Event card
    if (gameState.lastGlobalEventCardCompleted) {
      const news = drawGlobalEventCard();

      if (news) {
        mergeNewsStructures(allNews, news);
      }

      gameState.lastGlobalEventCardCompleted = false;
    }

    // Adjust goods prices by yearly accumulated production
    market.adjustYearlyPrices();
    market.resourceTracker.resetYearlyTracking();
  }

  if (dayOfSeason === 1 && hour === 1) {
    // New season
    // - Refill resources based on the refilling table if it's the right season
    locationManager.refillResources();

    // Adjust seasonal prices (local shortage factors recalculated on-demand)
    market.adjustSeasonalPrices();
  }

  // A season consist of 8 weeks, (2 months) a week is 6 days, so 25th will be the later half of the season, the 2nd month
  if ((dayOfSeason === 1 || dayOfSeason === 25) && hour === 1) {
    // New Month
    // Draw Region Event Card, Trigger event effect and update global event scale
    const regionCardNews = drawRegionEventCard();

    if (regionCardNews) {
      allNews = mergeNewsStructures(allNews, regionCardNews);
    }
  }

  if (hour === 1) {
    // Save
    // await newsArchiveService.saveToDatabase();
    // save things to database here
    // News, Character, Party, Location, SubRegion, Region, Weather, Event Card, Game State, too much to think now
    //
    // Check if global event card is completed
    if (gameState.activeGlobalEventCards?.completionCondition()) {
      // Call cleanup handler before marking as complete
      if (gameState.activeGlobalEventCards.onEnd) {
        gameState.activeGlobalEventCards.onEnd();
        Report.info(
          `Global event "${gameState.activeGlobalEventCards.name}" has ended.`,
        );
      }
      gameState.lastGlobalEventCardCompleted = true;
      gameState.completedGlobalEventCards.push(
        gameState.activeGlobalEventCards,
      );
      gameState.activeGlobalEventCards = undefined;
    }

    // News propagation and decay
    newsArchiveService.dailySpread();
    newsArchiveService.dailyDecay();

    await saveDailyState();

    // New day
    // Draw weather cards for all subregions update accordingly
    const weatherNews = drawSubRegionsWeatherCard();
    const weatherStruct = newsArrayToStructure(weatherNews);
    allNews = mergeNewsStructures(allNews, weatherStruct);
  }

  return allNews;
}

async function processEvents(
  day: DayOfWeek,
  phase: TimeOfDay,
): Promise<NewsDistribution> {
  Report.info(`Processing events for day=${day}, phase=${phase}`);

  const enc: NewsDistribution = await locationManager.processEncounters(
    day,
    phase,
  );

  const act: NewsDistribution = await locationManager.processActions(
    day,
    phase,
  );

  const tra: NewsDistribution = await travelManager.allTravel(day, phase);

  const merged = mergeNewsStructures(enc, act, tra);

  return merged;
}

async function sendPartyData(news: NewsDistribution) {
  postman.deliver(news);
}

async function processPhaseInternal(options: ProcessPhaseOptions): Promise<void> {
  const now = options.now ?? new Date();
  const force = options.force ?? false;
  const label = options.label;
  const skipBacklog = options.skipBacklog ?? false;

  GameTime.synchronize(now);

  if (!skipBacklog && !force) {
    const lastProcessed = GameTime.getLastProcessedPhaseIndex();
    const currentPhase = GameTime.getCurrentPhaseIndex();
    let nextPhaseToProcess =
      lastProcessed === null ? currentPhase : lastProcessed + 1;

    while (nextPhaseToProcess < currentPhase) {
      const timestamp = GameTime.computePhaseTimestamp(nextPhaseToProcess);
      await processPhaseInternal({
        now: timestamp,
        force: true,
        label: "catch-up",
        skipBacklog: true,
      });
      nextPhaseToProcess++;
    }

    // Resync after catch-up to ensure we're positioned at the current phase
    GameTime.synchronize(now);
  }

  const shouldProcess = GameTime.markCurrentPhaseProcessed(force);
  if (!shouldProcess) {
    loopMetrics.skippedRuns++;
    Report.debug("Skipping game loop; phase already processed", {
      phaseIndex: GameTime.getCurrentPhaseIndex(),
      trigger: label,
    });
    return;
  }

  loopMetrics.totalRuns++;
  const startMs = nowMs();

  try {
    Report.info(
      `Processing Game Loop @ ${now.toISOString()} (phase=${GameTime.getCurrentPhaseIndex()}, trigger=${label})`,
    );
    Report.info(
      `Current Game Time: Year ${GameTime.year}, Season ${GameTime.season}, Day ${GameTime.dayOfSeason}, Hour ${GameTime.hour}`,
    );

    const mileStoneNews = await handleGameMilestones();

    const news = await processEvents(
      GameTime.getCurrentGameDayOfWeek(),
      GameTime.getCurrentGamePhase(),
    );

    const allNews = mergeNewsStructures(news, mileStoneNews);

    // TODO: Archivers should record the news here

    await sendPartyData(allNews);
    await persistLastProcessedPhase(GameTime.getCurrentPhaseIndex());

    loopMetrics.successfulRuns++;
    loopMetrics.lastDurationMs = Math.round(nowMs() - startMs);
    Report.info(
      `Game loop completed (phase=${GameTime.getCurrentPhaseIndex()}, trigger=${label}, duration=${loopMetrics.lastDurationMs}ms)`,
    );
  } catch (error) {
    loopMetrics.failedRuns++;
    loopMetrics.lastDurationMs = Math.round(nowMs() - startMs);
    Report.error("Error during game loop", {
      error,
      phaseIndex: GameTime.getCurrentPhaseIndex(),
      trigger: label,
      durationMs: loopMetrics.lastDurationMs,
    });
    throw error;
  }

  Report.debug("Game loop metrics", { ...loopMetrics });
}
