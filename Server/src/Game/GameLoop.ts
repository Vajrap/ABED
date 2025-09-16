import { config } from "dotenv";
import { GameTime } from "./GameTime/GameTime";
import type { DayOfWeek, TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import type {
  News,
  NewsEmittedFromLocationStructure,
} from "../Entity/News/News";
import { locationManager } from "../Entity/Location/Manager/LocationManager";
import Report from "../Utils/Reporter";

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
    handleGameMilestones();
    const news = await processEvents(
      GameTime.getCurrentGameDayOfWeek(),
      GameTime.getCurrentGamePhase(),
    );
    await sendPartyData(news);
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
function handleGameMilestones() {
  const { gameDateHour, gameDateDay, gameDateMonth } = GameTime;

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

  if (gameDateHour === 1)
    console.log(`Start of a new day: ${gameDateDay}/${gameDateMonth}`);
  if (gameDateDay === 1 && gameDateHour === 1)
    console.log("Start of a new week");
  if (gameDateDay === 7 && gameDateHour === GameTime.inGameHoursPerDay)
    console.log("End of the week");
  if (
    gameDateDay === GameTime.inGameDaysPerMonth &&
    gameDateDay === GameTime.inGameDaysPerMonth &&
    gameDateHour === GameTime.inGameHoursPerDay
  )
    console.log("End of the month");
  if (gameDateMonth === 1 && gameDateDay === 1 && gameDateHour === 1)
    console.log("Start of the new year");

  //Event Repo, might needed to be add elsewhere? this is just an example
  // if (gameDateMonth === 1) {
  //   event.newYear();
  // }
}

async function processEvents(day: DayOfWeek, phase: TimeOfDay) {
  /*
  Game process
  The game run on phase, each phase equal to 6 hrs in game, and 15 minutes in real life, the equation is said here only once.

  6hrs in game = 15 minutes real life
  1 days in game = 1 hr in real life (4 phases)
  Since a day in real life consist of 24 hours we make it a month in game, so normally one month has 24 days in game
    - A week in game consist of 6 days so in one month (24 days) we also get 4 weeks
  1 months in game (24 days) = 1 day in real life
    - Since a week in real life only consist of 7 days, so we use 2 weeks in real life for a game years that means a years has 14 months,
  1 year in game (14 months) = 2 weeks in real life
  The game have 7 seasons, each seasons would last 2 months in game (2 days in real life)

  When server start, we'll try to map it to 'Sunday' so the 1st and 8th month will be always on Sunday

  : Season and month
    1st - 2nd = Seeding
    3rd - 4th = RainFall
    5th - 6th = GreenTide
    7th - 8th = HarvestMoon
    9th - 10th = SunDry
    11th - 12th = Frostveil
    13th - 14th = LongDark

  : DayOfWeek
    1st day = laoh (white)
    2nd day = rowana (black)
    3rd day = aftree (red)
    4th day = udur (blue)
    5th day = matris (yellow)
    6th day = seethar (green)

  When a phase start, we check first if its fall on any of those,
  - New Year, new season, new month, new week, new day, or just new phase
  : New years (for sure, we have the festival, but that's on monthly scale check)
    -
  : New Season
    - Weather Interpretation change on all subregions
    - Goods Price adaption
    -
  : New Month
  : New Week
  : New Day
    - Subregion draws weather card, weather scale change

  And then the phase event
  - Process Encounters
  - Process Actions
  - Process Travels
  */
  // Since news are dealth with in the location, maybe we use location manager to deal with the WS instead of returning back here and go through send partyData?
  // Else we need some new filtering function, which... a bit redundant,
  const enc: NewsEmittedFromLocationStructure =
    await locationManager.processEncounters(day, phase);
  const act: NewsEmittedFromLocationStructure =
    await locationManager.processActions(day, phase);
  const tra: NewsEmittedFromLocationStructure = await travelManager.allTravel(
    day,
    phase,
  );
  // const news: News[] = [...enc, ...act, ...tra];

  // postman.goForth(news)
}

async function sendPartyData(news: News[]) {
  // webSocketManager.userConnections.forEach((ws, userID) => {
  //   if (ws.readyState !== ws.OPEN) return;
  //   const clientParty = partyManager.getPartyByID(userID);
  //   if (clientParty) {
  //     const partyData = clientParty.intoInterface();
  //     const message = {
  //       type: "PARTY_DATA",
  //       data: partyData,
  //     };
  //     ws.send(JSON.stringify(message));
  //   }
  // });
}
