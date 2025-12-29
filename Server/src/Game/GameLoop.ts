import { GameTime } from "./GameTime/GameTime";
import type { DayOfWeek, TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import {
  News,
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
import { railTravelManager } from "./TravelManager/Rail/index.ts";
import { gameStateEventService } from "../Services/GameStateEventService";

type RunGameLoopOptions = {
  now?: Date;
  force?: boolean;
  label?: string;
  skipBacklog?: boolean;
};

type ProcessPhaseOptions = RunGameLoopOptions & {
  label: string;
};

const loopMetrics = {
  totalRuns: 0,
  successfulRuns: 0,
  skippedRuns: 0,
  failedRuns: 0,
  consecutiveFailedRuns: 0,
  lastDurationMs: 0,
  lastFailureAt: null as Date | null,
  lastError: null as { message: string; trigger: string } | null,
  warnedOnThreshold: false,
};

const FAILURE_ALERT_THRESHOLD = 3;

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
    await runGameLoop({ label: "startup", skipBacklog: true });
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
      skipBacklog: options.skipBacklog,
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

  // Apply base needs decrement per phase (before processing actions)
  // Satiety: -3 per phase, Energy: -2 per phase, Mood: No auto-decay
  const { characterManager } = await import("./CharacterManager");
  const { BuffEnum, DebuffEnum } = await import("../Entity/BuffsAndDebuffs/enum");
  const { createNews } = await import("../Entity/News/News");
  const { NewsSignificance, NewsPropagation } = await import("../InterFacesEnumsAndTypes/NewsEnums");
  
  const phaseDecayNews: News[] = [];
  
  Report.info(`[GameLoop.processEvents] Applying phase decay to ${characterManager.characters.length} characters`);
  
  for (const character of characterManager.characters) {
    const satietyBefore = character.needs.satiety.current;
    const energyBefore = character.needs.energy.current;
    const moodBefore = character.needs.mood.current;
    
    character.needs.decSatiety(3);
    character.needs.decEnergy(2);
    // Mood does not auto-decay
    
    Report.info(`[GameLoop.processEvents] Character ${character.id} (${typeof character.name === 'string' ? character.name : character.name?.en || 'unknown'}) needs: satiety ${satietyBefore}->${character.needs.satiety.current} (-3), energy ${energyBefore}->${character.needs.energy.current} (-2), mood ${moodBefore}`);
    
    // Process permanent buff/debuff decay
    // Iterate through buffs with isPerm === true
    for (const [buffId, entry] of character.buffsAndDebuffs.buffs.entry.entries()) {
      if (entry.isPerm && entry.permValue !== undefined && entry.permValue > 0) {
        entry.permValue -= 1;
        
        // Remove if expired
        if (entry.permValue <= 0) {
          // Only remove if value is also 0 (no battle effect remaining)
          if (entry.value <= 0) {
            character.buffsAndDebuffs.buffs.entry.delete(buffId);
          } else {
            // Clear permValue but keep buff for battle
            entry.isPerm = false;
            entry.permValue = undefined;
          }
          
          // Create news event for expiring blessing
          if (buffId === BuffEnum.bless) {
            if (!character.location) {
              continue; // Skip if no location
            }
            const location = locationManager.locations[character.location];
            if (!location) {
              continue; // Skip if location not found
            }
            const context = {
              region: location.region,
              subRegion: location.subRegion,
              location: character.location,
              partyId: character.partyID || "",
              characterIds: [character.id],
            };
            phaseDecayNews.push(
              createNews({
                scope: {
                  kind: "privateScope",
                  characterId: character.id,
                },
                content: {
                  en: `${character.name?.en || character.name}'s blessing has faded.`,
                  th: `${character.name?.th || character.name} พรที่ได้รับได้จางหายไป`,
                },
                context,
                significance: NewsSignificance.MINOR,
                propagation: NewsPropagation.PRIVATE,
              })
            );
          }
        }
      }
    }
    
    // Iterate through debuffs with isPerm === true
    for (const [debuffId, entry] of character.buffsAndDebuffs.debuffs.entry.entries()) {
      if (entry.isPerm && entry.permValue !== undefined && entry.permValue > 0) {
        entry.permValue -= 1;
        
        // Remove if expired
        if (entry.permValue <= 0) {
          // Only remove if value is also 0 (no battle effect remaining)
          if (entry.value <= 0) {
            character.buffsAndDebuffs.debuffs.entry.delete(debuffId);
          } else {
            // Clear permValue but keep debuff for battle
            entry.isPerm = false;
            entry.permValue = undefined;
          }
          
          // Create news event for expiring curse
          if (debuffId === DebuffEnum.cursed) {
            if (!character.location) {
              continue; // Skip if no location
            }
            const location = locationManager.locations[character.location];
            if (!location) {
              continue; // Skip if location not found
            }
            const context = {
              region: location.region,
              subRegion: location.subRegion,
              location: character.location,
              partyId: character.partyID || "",
              characterIds: [character.id],
            };
            phaseDecayNews.push(
              createNews({
                scope: {
                  kind: "privateScope",
                  characterId: character.id,
                },
                content: {
                  en: `${character.name?.en || character.name}'s curse has lifted.`,
                  th: `${character.name?.th || character.name} คำสาปได้หายไป`,
                },
                context,
                significance: NewsSignificance.MINOR,
                propagation: NewsPropagation.PRIVATE,
              })
            );
          }
        }
      }
    }
  }

  const enc: NewsDistribution = await locationManager.processEncounters(
    day,
    phase,
  );

  const act: NewsDistribution = await locationManager.processActions(
    day,
    phase,
  );

  Report.info(`[GameLoop.processEvents] Processing travel for day=${day}, phase=${phase}`);
  const tra: NewsDistribution = await travelManager.allTravel(day, phase);
  const rail: NewsDistribution = await railTravelManager.allTravel(day, phase);
  
  // Convert phase decay news to NewsDistribution and merge
  const { newsArrayToStructure } = await import("../Entity/News/News");
  const phaseDecayNewsStruct = phaseDecayNews.length > 0 
    ? newsArrayToStructure(phaseDecayNews)
    : { privateScope: new Map(), partyScope: new Map(), locationScope: new Map(), subRegionScope: new Map(), regionScope: new Map(), worldScope: [] };

  return mergeNewsStructures(enc, act, tra, rail, phaseDecayNewsStruct);
}

async function sendPartyData(news: NewsDistribution) {
  // Send news updates via Postman
  postman.deliver(news);
  
  // Send game state updates (party, location, game time) to all connected users
  Report.info("[GameLoop] Calling broadcastGameStateUpdate");
  gameStateEventService.broadcastGameStateUpdate();
  Report.info("[GameLoop] Completed broadcastGameStateUpdate");
}

async function processPhaseInternal(options: ProcessPhaseOptions): Promise<void> {
  const now = options.now ?? new Date();
  const force = options.force ?? false;
  const label = options.label;
  const skipBacklog = options.skipBacklog ?? false;

  GameTime.synchronize(now);

  // TODO:
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
    
    // Reset chat rate limits for new phase (exchange counts reset each phase)
    const { resetRateLimitsForNewPhase } = await import("../Services/ChatRateLimitService");
    await resetRateLimitsForNewPhase();

    loopMetrics.successfulRuns++;
    loopMetrics.lastDurationMs = Math.round(nowMs() - startMs);
    loopMetrics.consecutiveFailedRuns = 0;
    loopMetrics.lastError = null;
    loopMetrics.warnedOnThreshold = false;
    Report.info(
      `Game loop completed (phase=${GameTime.getCurrentPhaseIndex()}, trigger=${label}, duration=${loopMetrics.lastDurationMs}ms)`,
    );
  } catch (error) {
    loopMetrics.failedRuns++;
    loopMetrics.lastDurationMs = Math.round(nowMs() - startMs);
    loopMetrics.consecutiveFailedRuns++;
    loopMetrics.lastFailureAt = new Date();
    loopMetrics.lastError = {
      message: error instanceof Error ? error.message : String(error),
      trigger: label,
    };
    Report.error("Error during game loop", {
      error,
      phaseIndex: GameTime.getCurrentPhaseIndex(),
      trigger: label,
      durationMs: loopMetrics.lastDurationMs,
    });
    if (
      loopMetrics.consecutiveFailedRuns >= FAILURE_ALERT_THRESHOLD &&
      !loopMetrics.warnedOnThreshold
    ) {
      loopMetrics.warnedOnThreshold = true;
      Report.warn("Game loop consecutive failures exceeded threshold", {
        failures: loopMetrics.consecutiveFailedRuns,
        lastFailureAt: loopMetrics.lastFailureAt?.toISOString(),
      });
    }
    throw error;
  }

  Report.debug("Game loop metrics", { ...loopMetrics });
}

export function getGameLoopMetrics() {
  return { ...loopMetrics };
}
