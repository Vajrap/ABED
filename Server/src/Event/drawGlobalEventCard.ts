import { gameState } from "../Game/GameState";
import Report from "../Utils/Reporter";

export function drawGlobalEventCard() {
  console.log("Drawing global event card");
  if (gameState.activeGlobalEventCards) {
    Report.error("Global event card already active");
    return;
  }

  return gameState.drawGlobalCard();
}
