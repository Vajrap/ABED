import { config } from "dotenv";
import { GameTime } from "./GameTime/GameTime";
import type { DayOfWeek, TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import {
  emptyNewsStruct,
  type News,
  type NewsEmittedFromLocationStructure,
} from "../Entity/News/News";
import { locationManager } from "../Entity/Location/Manager/LocationManager";
import { travelManager } from "./TravelManager";
import Report from "../Utils/Reporter";
import { postman } from "../Entity/News/Postman";
import { mergeNewsStructures } from "../Utils/mergeNewsStructure";

export async function runSchedule() {
  const now = new Date();

  const nextScheduledTime = nextScheduleTick(now);

  const delay = nextScheduledTime.getTime() - now.getTime();

  Report.info(
    `Next game loop scheduled for ${nextScheduledTime.toLocaleTimeString()}`,
  );

  setTimeout(async () => {
    await runGameLoop();
    runSchedule();
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
  const { gameDateHour, gameDateDay, gameDateMonth } = GameTime;

  let allNews: NewsEmittedFromLocationStructure = {
    worldScope: [],
    regionScope: new Map(),
    subRegionScope: new Map(),
    locationScope: new Map(),
    partyScope: new Map(),
    privateScope: new Map(),
  };

  switch (gameDateHour) {
    case 1:
      console.log("GamePhase: Morning");
      break;
    case 2:
      console.log("GamePhase: Afternoon");
      break;
    case 3:
      console.log("GamePhase: Evening");
      break;
    case 4:
      console.log("GamePhase: Night");
      break;
  }

  if (gameDateMonth === 1 && gameDateDay === 1 && gameDateHour === 1) {
    // New year
    // https://www.notion.so/Draw-Global-Event-Card-2737d01e172a801aa596f75ab9503fb5?source=copy_link
    // If a Global Event occurred last year, draw a new Global Event card
    // Adjust goods prices by yearly accumulated production

    // Executor
    const news = emptyNewsStruct();
    allNews = mergeNewsStructures(allNews, news);
  }

  if (
    [1, 3, 5, 7, 9, 11, 13].includes(gameDateMonth) &&
    gameDateDay === 1 &&
    gameDateHour === 1
  ) {
    // New season
    // - Refill resources based on the refilling table if it’s the right season
    // Update weather Interpretation

    // Executor
    const news = emptyNewsStruct();
    allNews = mergeNewsStructures(allNews, news);
  }

  if (gameDateDay === 1 && gameDateHour === 1) {
    // New Month
    // Draw Region Event Card, Trigger event effect and update global event scale

    // Executor
    const news = emptyNewsStruct();
    allNews = mergeNewsStructures(allNews, news);
  }

  if ([1, 7, 13, 19].includes(gameDateDay) && gameDateHour === 1) {
    // New Week
    // Draw Subregion Event Card
    // Some events target a random location in that subregion
    // If an event requires a ‘Location Specialty’, draw from that pile
    // If a location lacks specialty events, proceed with no extra effect

    // Executor
    const news = emptyNewsStruct();
    allNews = mergeNewsStructures(allNews, news);
  }

  if (gameDateHour === 1) {
    // New day
    // Subregions draw weather cards
    // Local weather scales update

    // Executor
    const news = emptyNewsStruct();
    allNews = mergeNewsStructures(allNews, news);
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

  const news = mergeNewsStructures(enc, act, tra);

  return news;
}

async function sendPartyData(news: NewsEmittedFromLocationStructure) {
  postman.deliver(news);
}
