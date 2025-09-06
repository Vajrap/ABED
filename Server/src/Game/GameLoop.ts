import { config } from "dotenv";
import { GameTime } from "./GameTime/GameTime";
import type { DayOfWeek, TimeOfDay } from "../InterFacesEnumsAndTypes/Time";
import type { News } from "../Entity/News/News";
import { locationManager } from "../Entity/Location/Manager/LocationManager";

export async function runSchedule() {
  const now = new Date();

  const nextScheduledTime = nextScheduleTick(now);

  const delay = nextScheduledTime.getTime() - now.getTime();

  console.log(
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
  // Since news are dealth with in the location, maybe we use location manager to deal with the WS instead of returning back here and go through send partyData?
  // Else we need some new filtering function, which... a bit redundant,
  const enc: News[] = await locationManager.processEncounters(day, phase);
  const act: News[] = await locationManager.processActions(day, phase);
  // const tra: News[] = await travelManager.allTravel(day, phase);
  const news: News[] = [...enc, ...act, ...tra];

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
