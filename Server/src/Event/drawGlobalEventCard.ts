import { gameState } from "../Game/GameState"
import Report from "../Utils/Reporter"

export function drawGlobalEventCard() {
    if (gameState.activeGlobalEventCards) {
        Report.error("Global event card already active");
        return;
    }

    return gameState.drawGlobalCard();
}