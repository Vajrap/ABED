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
      // initial DB, postgres,
      // Change Game State here

      await this.initialize();
      // load things from DB into manager and repository
      // manager is like... pool of things? characterManager hold all characters, locationManager hold all locations etc
      // Repository might be more about the hard code things like items? actually location should also be in Repo too but we need list of all characters inside it... so DB related, decide later,
      // Initial game, like start game
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
