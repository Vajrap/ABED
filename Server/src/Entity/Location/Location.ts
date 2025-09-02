import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { rollTwenty } from "../../Utils/Dice";
import type { News } from "../News/News";
import type { Party } from "../Party/Party";
import type { SubRegion } from "./SubRegion";


export type UserInputAction = {
  type: LocationActionEnum
}


export class Location {
  id: LocationsEnum;
  subRegion: SubRegionEnum;
  region: RegionEnum;
  parties: Party[] = [];
  innType: any[] = [];
  connectedLocations: { location: Location; distance: number }[] = [];
  actions: LocationActionEnum[]

  /*
    normally the chance for any event to occur is DC 15 == about 25% chance
    Need a better think through, cause this means 'ANY KIND' 'GOOD OR BAD' event have the same possibility of occuring.
    The better idea would be, a list of all possible event with dice face number?
    And might need range, like
    > 1 worst event
    > 2-5 bad event, battle, raid, etc
    > 6-14 nothing happended,
    > 15-19 good event, like treasure, quest, etc
    > 20 critically good event?

    This way, team average luck modifier plays some role in it.
    But I still want it to mostly have no events flare up much

    Also, we need to think about random event for specific kind of Character action, like train, learn, craft.
    Cause we might need to trimmed down only possible event on each actions.
  */
  eventDC: number = 15;

  constructor(
    id: LocationsEnum,
    subRegion: SubRegion,
    connectedLocations: { location: Location; distance: number }[],
    actions: LocationActionEnum[]
  ) {
    this.id = id;
    this.subRegion = subRegion.id;
    this.region = subRegion.region;
    this.connectedLocations = connectedLocations;
    this.actions = actions;
  }

  getDistanceTo(location: Location): number | undefined {
    for (const connectedLocation of this.connectedLocations) {
      if (connectedLocation.location === location) {
        return connectedLocation.distance;
      }
    }
    return undefined;
  }

  checkIfLocationConnected(location: Location): boolean {
    return this.connectedLocations.some((loc) => loc.location === location);
  }

  getAllCharactersInLocation() {
    let characters = [];
    for (const party of this.parties) {
      for (const character of party.characters) {
        if (character !== "none") {
          characters.push(character);
        }
      }
    }
    return characters;
  }

  partyMovesIn(party: Party) {
    this.parties.push(party);
  }

  partyMoveOut(party: Party) {
    this.parties = this.parties.filter((p) => p !== party);
  }

  // TODO, this should return NEWS[]
  async processEncounters(): Promise<News[]> {
    if (this.parties.length < 2) return [];
    const shuffled = [...this.parties].sort(() => Math.random() - 0.5);

    const candidates: Party[] = shuffled.filter(
      () => rollTwenty().total % 2 === 1,
    );

    if (candidates.length < 2) return [];

    const encountered = new Set<Party>();
    const news: News[] = [];

    for (let i = 0; i < candidates.length - 1; i++) {
      const candidateA = candidates[i]!;
      if (encountered.has(candidateA)) continue;

      for (let j = i + 1; j < candidates.length; j++) {
        const candidateB = candidates[j]!;
        if (encountered.has(candidateB)) continue;

        // news.push(this.checkAndTriggerEncounterEvent(candidateA, candidateB));
        encountered.add(candidateA);
        encountered.add(candidateB);
      }
    }

    return news;
  }

  // TODO, this should return NEWS[]
  async processActions(day: DayOfWeek, phase: TimeOfDay): Promise<News[]> {
    if (this.parties.length === 0) return [];

    for (let party of this.parties) {
      const action = party.actionSequence[day][phase];

      if (!this.actions.includes(action.type)) {
        console.warn(
          `Party with ID:${party.partyID} Action: ${action.type} at ${day}: ${phase} not allowed in ${this.id};`,
        );
        action.type = LocationActionEnum.Rest;
      }

      if (action.type === LocationActionEnum.Travel) return;

      switch (action.type) {
        case LocationActionEnum.Rest ||
          LocationActionEnum.Inn ||
          LocationActionEnum.Camping ||
          LocationActionEnum.HouseRest:
          handleRestAction(party, this, action.type);
          break;
        case LocationActionEnum.TrainAttribute ||
          LocationActionEnum.TrainProficiency ||
          LocationActionEnum.TrainArtisan ||
          LocationActionEnum.TrainSkill:
          handleTrainAction(party, this, action.detail);
          break;
        case LocationActionEnum.LearnSkill:
          handleLearnSkillAction(party, this, action.detail);
          break;
        case LocationActionEnum.Craft:
          handleCraftAction(party, this);
          break;
        case LocationActionEnum.None:
          event_rest_force(party);
          break;
        case LocationActionEnum.Stroll:
          handleStrollAction(party, this);
          break;
      }
    }
  }
  }
}



export enum LocationActionEnum {
  Rest = "Rest",
  Inn = "Inn",
  Camping = "Camping",
  HouseRest = "House Rest",
  Travel = "Travel",
  TrainAttribute = "Train Attribute",
  TrainProficiency = "Train Proficiency",
  TrainArtisan = "Train Artisan",
  TrainSkill = "Train Skill",
  LearnSkill = "Learn Skill",
  Stroll = "Stroll",
  Craft = "Craft",
  // Blacksmith = 'Blacksmith',
  // Apothecary = 'Apothecary',
  // Tailor = 'Tailor',
  // Armorer = 'Armorer',
  // Jeweler = 'Jeweler',
  // Arcanist = 'Arcanist',
  // Grocery = 'Grocery',
  // Tavern = 'Tavern',
  // HeavensDecreeMeeting = 'Heavens Decree Meeting',
  // ChurchOfLaoh = 'Church of Laoh',
  // GreatTempleOfLaoh = 'Great Temple of Laoh',
  // CultOfNizarith = 'Cult of Nizarith',
  // ShrineOfGelthoran = 'Shrine of Gelthoran',
  // MajorShrineOfGelthoran = 'Major Shrine of Gelthoran',
  // ShrineOfAqorath = 'Shrine of Aqorath',
  // MajorShrineOfAqorath = 'Major Shrine of Aqorath',
  // ShrineOfValthoria = 'Shrine of Valthoria',
  // MajorShrineOfValthoria = 'Major Shrine of Valthoria',
  // ShrineOfPyrnthanas = 'Shrine of Pyrnthanas',
  // MajorShrineOfPyrnthanas = 'Major Shrine of Pyrnthanas',
  // Barrack = 'Barrack',
  // KnightOrder = 'Knight Order',
  // MagicSchool = 'Magic School',
  // MagicAcademy = 'Magic Academy',
  // ChurchOfLaohMagicLearning = 'Church of Laoh Magic Learning',
  // CultOfNizarithMagicLearning = 'Cult of Nizarith Magic Learning',
  // AdventureGuild = 'Adventure Guild',
  // BountyBoard = 'Bounty Board',
  // Arena = 'Arena',
  None = "None",
}

export enum LocationEventEnum {
  BattleEvent = "battleEvent",

  //Resting events
  RestInnPoor = "restInnPoor",
  RestInnComfortable = "restInnComfortable",
  RestInnPremium = "restInnPremium",
  RestInnLuxury = "restInnLuxury",
  RestHouse = "restHouse",
  RestCamp = "restCamp",

  //Training events
  TrainAttribute = "trainAttribute",
  TrainProficiency = "trainProficiency",
  TrainArtisan = "trainArtisan",

  //Skill events
  SkillLearn = "skillLearn",
  SkillTrain = "skillTrain",

  //Crafting events
  Craft = "craft",

  //Explorations and Travel events
  StrollEvent = "strollEvent", //Stroll event take 3 arguments, the party, the player, and the event() -> {} to execute, maybe about gaining insight or call a check to call for another event

  //Dialogue events
  DialogueEvent = "dialogueEvent", //Dialogue with NPC, take player character and NPCDialogue (needed implementation) -> NPC Dialogue class would be needed, determine the dialogue tree and the outcome

  //Quest events
  QuestGiverEvent = "questGiverEvent", //Take character and quest, might check if the character has the quest already, if true -> update quest instead.
  QuestUpdateEvent = "questUpdateEvent",
  QuestCompleteEvent = "questCompleteEvent",

  //Item events
  ItemPickupEvent = "itemPickupEvent", //Take character and item, add item to character inventory
  ItemShopEvent = "itemShopEvent", //Take character and shop, open shop interface, buy/sell items

  None = "none",
}
