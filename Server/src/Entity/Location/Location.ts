import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { rollTwenty } from "../../Utils/Dice";
import { statMod } from "../../Utils/statMod";
import {
  ActionInput,
  specialActions,
} from "../Character/Subclass/Action/ActionInput";
import type { News } from "../News/News";
import type { Party } from "../Party/Party";
import type { SubRegion } from "./SubRegion";

export type UserInputAction = {
  type: ActionInput;
};

type RandomEvents = {
  rest: RandomEventUnits;
  train: RandomEventUnits;
  learn: RandomEventUnits;
  stroll: RandomEventUnits;
  artisan: RandomEventUnits;
};

type RandomEventUnits = {
  worst: (() => News)[];
  bad: (() => News)[];
  good: (() => News)[];
  best: (() => News)[];
};

const defaultRandomEvents: RandomEvents = {
  rest: {
    worst: [],
    bad: [],
    good: [],
    best: [],
  },
  train: {
    worst: [],
    bad: [],
    good: [],
    best: [],
  },
  learn: {
    worst: [],
    bad: [],
    good: [],
    best: [],
  },
  stroll: {
    worst: [],
    bad: [],
    good: [],
    best: [],
  },
  artisan: {
    worst: [],
    bad: [],
    good: [],
    best: [],
  },
};

type InnSetUp = {};

export class Location {
  id: LocationsEnum;
  subRegion: SubRegionEnum;
  region: RegionEnum;
  parties: Party[] = [];
  innType: InnSetUp[] = [];
  connectedLocations: { location: Location; distance: number }[] = [];
  actions: ActionInput[];
  randomEvents: RandomEvents;

  /*
    We need a list of all possible event with dice face number.
    And might need range, like
    > 1 worst event
    > 2-4 bad event, battle, raid, etc
    > 5-16 nothing happended,
    > 17-19 good event, like treasure, quest, etc
    > 20 critically good event?

    This way, team average luck modifier plays some role in it.
    But I still want it to mostly have no events flare up much

    Also, we need to think about random event for specific kind of Character action, like train, learn, craft.
    Cause we might need to trimmed down only possible event on each actions.
  */

  constructor(
    id: LocationsEnum,
    subRegion: SubRegion,
    connectedLocations: { location: Location; distance: number }[],
    actions: ActionInput[],
    randomEvents?: RandomEvents,
  ) {
    this.id = id;
    this.subRegion = subRegion.id;
    this.region = subRegion.region;
    this.connectedLocations = connectedLocations;
    this.actions = actions;
    this.randomEvents = randomEvents ? randomEvents : defaultRandomEvents;
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
    let news = [];
    if (this.parties.length === 0) return [];

    /*
      Action processing idea
      - since now we move from party scale action to character scale action, that means the resolving would happen per character instead
      - but since 'travel' is party wide, which masked character's action, that means we need to skip party that current action is travel

    */
    for (let party of this.parties) {
      // Skip travelling party
      const partyAction = party.travelSequence[day][phase];
      if (partyAction === ActionInput.Travel) continue;
      // Special action like event or some special things that the leader choose, this will overwrite character's action and dealth with as a party
      if (specialActions.includes(partyAction)) {
        // TODO: deal with special action, might be story or something tied to the location, having special effect
        continue;
      }

      for (const character of party.characters) {
        if (character === "none") continue;
        let action = character.actionSequence[day][phase];
        if (action === ActionInput.Travel) continue;
        if (!this.actions.includes(action)) action = ActionInput.Rest;

        // Still needs to determine if we think of random event as differed per action, or is it location wide?
        // For example, if roll = 20, would event appeared from action=train and action=rest and action = craft the same thing?
        // A quick instinct would says, no?
        let randomEncounter =
          rollTwenty().total +
          statMod(character.attribute.getStat("luck").total);
        const eventCategory = getEventCategory(randomEncounter);

        switch (action) {
          case ActionInput.Rest:
          case ActionInput.Inn:
          case ActionInput.Camping:
          case ActionInput.HouseRest:
          case ActionInput.None: {
            let result: News = eventCategory
              ? this.handleSpecialEvent("rest", eventCategory)
              : handleRestAction();
            news.push(result);
            break;
          }
          case ActionInput.TrainAttribute:
          case ActionInput.TrainProficiency:
          case ActionInput.TrainArtisan:
          case ActionInput.TrainSkill: {
            let result: News = eventCategory
              ? this.handleSpecialEvent("train", eventCategory)
              : handleTrainAction();
            news.push(result);
            break;
          }
          case ActionInput.LearnSkill: {
            let result: News = eventCategory
              ? this.handleSpecialEvent("train", eventCategory)
              : handleLearnSkillAction();
            news.push(result);
            break;
          }
          case ActionInput.Craft: {
            let result: News = eventCategory
              ? this.handleSpecialEvent("artisan", eventCategory)
              : handleCraftAction();
            news.push(result);
            break;
          }
          case ActionInput.Stroll: {
            let result: News = eventCategory
              ? this.handleSpecialEvent("stroll", eventCategory)
              : handleStrollAction();
            news.push(result);
            break;
          }
          default: {
            let result: News = eventCategory
              ? this.handleSpecialEvent("rest", eventCategory)
              : handleRestAction();
            news.push(result);
            break;
          }
        }
      }
    }
    return news;
  }

  private handleSpecialEvent(
    actionType: keyof RandomEvents,
    category: keyof RandomEventUnits,
  ): News | null {
    const events = this.randomEvents[actionType][category];
    const event =
      events.length > 0
        ? events[Math.floor(Math.random() * events.length)]
        : null;
    if (event) {
      const news = event();
      return news;
    }
    return null;
  }
}

function getEventCategory(roll: number): keyof RandomEventUnits | null {
  if (roll === 1) return "worst";
  if (roll >= 2 && roll <= 3) return "bad";
  if (roll >= 4 && roll <= 17) return null; // no event
  if (roll >= 18 && roll <= 19) return "good";
  if (roll === 20) return "best";
  return null;
}
