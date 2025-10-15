import { config } from "dotenv";
import { GameTime } from "./GameTime/GameTime";
import type { DayOfWeek, TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import {
  type NewsEmittedFromLocationStructure,
} from "../Entity/News/News";
import { locationManager } from "../Entity/Location/Manager/LocationManager";
import { travelManager } from "./TravelManager";
import Report from "../Utils/Reporter";
import { postman } from "../Entity/News/Postman";
import { mergeNewsStructures } from "../Utils/mergeNewsStructure";
import { gameState } from "./GameState";
import { addToSubRegionScope } from "../Utils/addNewsToScope";
import {drawSubRegionsWeatherCard} from "../Event/subRegionWeather.ts";
import { drawGlobalEventCard } from "../Event/drawGlobalEventCard.ts";
import { market } from "../Entity/Market/Market.ts";

export async function runSchedule() {
  const now = new Date();

  const nextScheduledTime = nextScheduleTick(now);

  const delay = nextScheduledTime.getTime() - now.getTime();

  Report.info(
    `Next game loop scheduled for ${nextScheduledTime.toLocaleTimeString()}`,
  );

  setTimeout(async () => {
    await runGameLoop();
    // TODO: Can be repetitive,
    await runSchedule();
  }, delay);
}

async function runGameLoop() {
  try {
    GameTime.advanceOnePhrase();
    const mileStoneNews = handleGameMilestones();
    const news = await processEvents(
      GameTime.getCurrentGameDayOfWeek(),
      GameTime.getCurrentGamePhase(),
    );

    const allNews = mergeNewsStructures(news, mileStoneNews);

    await sendPartyData(allNews);
    console.log("Game loop executed successfully.");
  } catch (error) {
    console.error("Error during game loop:", error);
  }
}

const nextScheduleTick = (now: Date) => {
  config();
  const isTestMode = process.env.TEST_MODE === "true";

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

// TODO:: Mile stone consist of more than just Dating, it might have some events declaration, see example
function handleGameMilestones(): NewsEmittedFromLocationStructure {
  const { hour, dayOfWeek, dayOfSeason, season } = GameTime;

  let allNews: NewsEmittedFromLocationStructure = {
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
        mergeNewsStructures(allNews, news)
      }

      gameState.lastGlobalEventCardCompleted = false;
    }

    // Adjust goods prices by yearly accumulated production
    market.adjustYearlyPrices();
    market.resourceTracker.resetYearlyTracking();
  }

  if (
    dayOfSeason === 1 &&
    hour === 1
  ) {
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
    /*
      const card = drawRegionEventCard();
      const result: NewsEmittedFromLocationStructure = card.effect(state);
      allNews = mergeNewsStructures(allNews, result);
    */
  }

  if (dayOfWeek === 1 && hour === 1) {
    // Check if global event card is completed
    if (gameState.activeGlobalEventCards?.completionCondition()) {
      gameState.lastGlobalEventCardCompleted = true;
    }
    // New Week
    // Draw Subregion Event Card
    /*
      const card = drawSubregionEventCard();
      const result: NewsEmittedFromLocationStructure = card.effect(state);
      allNews = mergeNewsStructures(allNews, result);
    */
    // Some events target a random location in that subregion
    // If an event requires a ‘Location Specialty’, draw from that pile
    // If a location lacks specialty events, proceed with no extra effect
  }

  if (hour === 1) {
    // New day
    // Draw weather cards for all subregions update accordingly
    const weatherNews = drawSubRegionsWeatherCard();

    for (const wn of weatherNews) {
      addToSubRegionScope(allNews, wn.context.subRegion, wn);
    }
  }

  return allNews;
}

async function processEvents(
  day: DayOfWeek,
  phase: TimeOfDay,
): Promise<NewsEmittedFromLocationStructure> {
  const enc: NewsEmittedFromLocationStructure =
    await locationManager.processEncounters(day, phase);
  const act: NewsEmittedFromLocationStructure =
    await locationManager.processActions(day, phase);
  const tra: NewsEmittedFromLocationStructure = await travelManager.allTravel(
    day,
    phase,
  );

  return mergeNewsStructures(enc, act, tra);
}

async function sendPartyData(news: NewsEmittedFromLocationStructure) {
  postman.deliver(news);
}
