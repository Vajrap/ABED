import Report from "../Utils/Reporter";
import { characterManager } from "./CharacterManager";
import { runSchedule } from "./GameLoop";
import { gameState, type GameState } from "./GameState";

export class Game {
  //db=db;
  characterManager = characterManager;
  gameState: GameState = gameState;

  async start() {
    try {
      await this.initialize();
    } catch (error) {
      Report.error("Error starting game:", { error });
    }
  }

  private async initialize() {
    await runSchedule();
    Report.info(`Server is up and running at ${new Date().toLocaleString()}`);
  }

  public async save() {
    // await saveGameStateToDB();
  }
}
