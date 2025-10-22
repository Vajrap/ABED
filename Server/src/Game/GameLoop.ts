import { config } from "dotenv";
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

export async function runSchedule() {
  const now = new Date();

  const nextScheduledTime = nextScheduleTick(now);

  const delay = nextScheduledTime.getTime() - now.getTime();

  Report.info(
    `Next game loop scheduled for ${nextScheduledTime.toLocaleTimeString()}`,
  );

  setTimeout(async () => {
    await runGameLoop();
    await runSchedule();
  }, delay);
}

async function runGameLoop() {
  try {
    console.log("\n=== GAME LOOP START ===");
    console.log(
      `Current Game Time: Year ${GameTime.year}, Season ${GameTime.season}, Day ${GameTime.dayOfSeason}, Hour ${GameTime.hour}`,
    );

    GameTime.advanceOnePhrase();
    console.log(
      `Advanced to: Year ${GameTime.year}, Season ${GameTime.season}, Day ${GameTime.dayOfSeason}, Hour ${GameTime.hour}`,
    );

    console.log("\n--- Processing Milestones ---");
    const mileStoneNews = await handleGameMilestones();

    console.log("\n--- Processing Events ---");
    const news = await processEvents(
      GameTime.getCurrentGameDayOfWeek(),
      GameTime.getCurrentGamePhase(),
    );

    const allNews = mergeNewsStructures(news, mileStoneNews);

    // TODO: Archivers should record the news here

    await sendPartyData(allNews);
    console.log("Game loop executed successfully.");
    console.log("=== GAME LOOP END ===\n");
  } catch (error) {
    console.error("Error during game loop:", error);
  }
}

const nextScheduleTick = (now: Date) => {
  // config();
  // const isTestMode = process.env.TEST_MODE === "true";

  const isTestMode = true;

  if (isTestMode) {
    return new Date(now.getTime() + 10_000);
  } else {
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() + (15 - (now.getMinutes() % 15)),
      0,
      0,
    );
  }
};

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
    console.log("  New day milestone triggered");

    // Save
    // await newsArchiveService.saveToDatabase();
    // save things to database here
    // News, Character, Party, Location, SubRegion, Region, Weather, Event Card, Game State, too much to think now

    // Check if global event card is completed
    if (gameState.activeGlobalEventCards?.completionCondition()) {
      console.log("  Global event card completed");
      // Call cleanup handler before marking as complete
      if (gameState.activeGlobalEventCards.onEnd) {
        gameState.activeGlobalEventCards.onEnd();
        Report.info(
          `Global event "${gameState.activeGlobalEventCards.name}" ended, cleanup executed`,
        );
      }
      gameState.lastGlobalEventCardCompleted = true;
      gameState.completedGlobalEventCards.push(
        gameState.activeGlobalEventCards,
      );
      gameState.activeGlobalEventCards = undefined;
    }

    // News propagation and decay
    console.log("  Processing news spread and decay");
    newsArchiveService.dailySpread();
    newsArchiveService.dailyDecay();

    // Save news to database

    // New day
    // Draw weather cards for all subregions update accordingly
    console.log("  Drawing weather cards for all subregions");
    const weatherNews = drawSubRegionsWeatherCard();
    const weatherStruct = newsArrayToStructure(weatherNews);
    allNews = mergeNewsStructures(allNews, weatherStruct);
    console.log(`  Weather news merged into milestone news`);
  } else {
    console.log(`  Not a new day (hour=${hour}), skipping weather cards`);
  }

  return allNews;
}

async function processEvents(
  day: DayOfWeek,
  phase: TimeOfDay,
): Promise<NewsDistribution> {
  console.log(`  Processing events for day=${day}, phase=${phase}`);

  console.log("  Processing encounters...");
  const enc: NewsDistribution = await locationManager.processEncounters(
    day,
    phase,
  );

  console.log("  Processing actions...");
  const act: NewsDistribution = await locationManager.processActions(
    day,
    phase,
  );

  console.log("  Processing travel...");
  const tra: NewsDistribution = await travelManager.allTravel(day, phase);

  const merged = mergeNewsStructures(enc, act, tra);

  return merged;
}

async function sendPartyData(news: NewsDistribution) {
  postman.deliver(news);
}
