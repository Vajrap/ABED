import { characterManager } from "./CharacterManager";
import { runSchedule } from "./GameLoop";

export class Game {
  //db=db;
  characterManager = characterManager;

  async start() {
    try {
      // initial DB, postgres,
      // loadthings from DB into manager and repository
      // manager is like... pool of things? characterManager hold all characters, locationManager hold all locations etc
      // Repository might be more about the hard code things like items? actually location should also be in Repo too but we need list of all characters inside it... so DB related, decide later,
      // Initial game, like start game
    } catch (error) {
      console.error("Error starting game:", error);
    }
  }

  private async initialize() {
    runSchedule();
    console.log(`Server is up and running at ${new Date().toLocaleString()}`);
    console
      .log
      // `In game characters loaded: ${this.characterManager.characters.length} characters`,
      ();
    console
      .log
      // `In game parties loaded: ${this.partyManager.parties.length} parties`,
      ();
  }

  public async save() {
    // await saveGameStateToDB();
  }
}
