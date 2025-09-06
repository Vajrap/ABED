import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { rollTwenty } from "../../Utils/Dice";
import { statMod } from "../../Utils/statMod";
import {
  ActionInput,
  groupRest,
  specialActions,
} from "../Character/Subclass/Action/ActionInput";
import type {
  News,
  NewsContext,
  NewsEmittedFromLocationStructure,
  NewsWithScope,
} from "../News/News";
import type { Party } from "../Party/Party";
import type { LocationInns } from "./Config/Inn";
import { handleRestAction } from "./Events/handlers/rest";
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

export class Location {
  id: LocationsEnum;
  subRegion: SubRegionEnum;
  region: RegionEnum;
  parties: Party[] = [];
  innType: LocationInns;
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
    innConfig?: LocationInns,
  ) {
    this.id = id;
    this.subRegion = subRegion.id;
    this.region = subRegion.region;
    this.connectedLocations = connectedLocations;
    this.actions = actions;
    this.randomEvents = randomEvents ? randomEvents : defaultRandomEvents;
    this.innType = innConfig
      ? innConfig
      : {
          Poor: null,
          Comfortable: null,
          Luxury: null,
          Premium: null,
        };
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
  async processEncounters(): Promise<NewsEmittedFromLocationStructure> {
    let result: NewsEmittedFromLocationStructure = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };
    if (this.parties.length < 2) return result;

    const shuffled = [...this.parties].sort(() => Math.random() - 0.5);

    const candidates: Party[] = shuffled.filter(
      () => rollTwenty().total % 2 === 1,
    );

    if (candidates.length < 2) return result;

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

    for (const n of news) {
      switch (n.scope.kind) {
        case "world":
          result.worldScope.push(n);
          break;
        case "region": {
          const reg = result.regionScope.get(n.scope.region);
          if (!reg) {
            result.regionScope.set(n.scope.region, [n]);
            break;
          } else {
            reg.push(n);
            result.regionScope.set(n.scope.region, reg);
          }
          break;
        }
        case "subRegion": {
          const subReg = result.subRegionScope.get(n.scope.subRegion);
          if (!subReg) {
            result.subRegionScope.set(n.scope.subRegion, [n]);
            break;
          } else {
            subReg.push(n);
            result.subRegionScope.set(n.scope.subRegion, subReg);
          }
          break;
        }
        case "location": {
          const loc = result.locationScope.get(n.scope.location);
          if (!loc) {
            result.locationScope.set(n.scope.location, [n]);
            break;
          } else {
            loc.push(n);
            result.locationScope.set(n.scope.location, loc);
          }
          break;
        }
        case "party": {
          const party = result.partyScope.get(n.scope.partyId);
          if (!party) {
            result.partyScope.set(n.scope.partyId, [n]);
            break;
          } else {
            party.push(n);
            result.partyScope.set(n.scope.partyId, party);
          }
          break;
        }
        case "private": {
          // TODO::
          break;
        }
      }
    }

    return result;
  }

  // TODO, this should return NEWS[]
  async processActions(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsEmittedFromLocationStructure> {
    let news: NewsEmittedFromLocationStructure = {
      worldScope: [],
      regionScope: new Map(),
      subRegionScope: new Map(),
      locationScope: new Map(),
      partyScope: new Map(),
      privateScope: new Map(),
    };

    if (this.parties.length === 0) return [];

    /*
      Action processing idea
      - since now we move from party scale action to character scale action, that means the resolving would happen per character instead
      - but since 'travel' is party wide, which masked character's action, that means we need to skip party that current action is travel

    */
    for (let party of this.parties) {
      // Skip travelling party
      const partyAction = party.actionSequence[day][phase];
      if (partyAction === ActionInput.Travel) {
        continue;
      }

      const context: NewsContext = {
        region: this.region,
        subRegion: this.subRegion,
        location: this.id,
        partyId: party.partyID,
        characterIds: party.characters
          .filter((character) => character !== "none")
          .map((character) => character.id),
      };

      // Skip Special resting Party (exclude ActionInput.Resting, that's for individual)
      // Special action like event or some special things that the leader choose, this will overwrite character's action and dealth with as a party
      if (specialActions.includes(partyAction)) {
        continue;
      }
      // Group Rests handler

      if (groupRest.includes(partyAction)) {
        const characters = party.characters.filter(
          (character) => character !== "none",
        );
        const result = handleRestAction(
          characters,
          partyAction === ActionInput.None ? ActionInput.Rest : partyAction,
          context,
          this.innType,
        );
        let partyNews = news.partyScope.get(party.partyID);
        if (!partyNews) {
          news.partyScope.set(party.partyID, [result.news]);
        } else {
          partyNews.push(result.news);
        }
        continue;
      }

      for (const character of party.characters) {
        if (character === "none") continue;
        context.characterIds = [character.id];
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
          case ActionInput.None: {
            let result: NewsWithScope | null = eventCategory
              ? this.handleSpecialEvent("rest", eventCategory)
              : handleRestAction([character], ActionInput.Rest, context);
            if (result) {
              const characterNews = news.privateScope.get(character.id);
              if (!characterNews) {
                news.privateScope.set(character.id, [result.news]);
              } else {
                characterNews.push(result.news);
              }
            }
            break;
          }
          case ActionInput.TrainAttribute:
          case ActionInput.TrainProficiency:
          case ActionInput.TrainArtisan:
          case ActionInput.TrainSkill: {
            let result: News | null = eventCategory
              ? this.handleSpecialEvent("train", eventCategory)
              : handleTrainAction();
            if (result) news.push(result);
            break;
          }
          case ActionInput.LearnSkill: {
            let result: News | null = eventCategory
              ? this.handleSpecialEvent("train", eventCategory)
              : handleLearnSkillAction();
            if (result) news.push(result);
            break;
          }
          case ActionInput.Craft: {
            let result: News | null = eventCategory
              ? this.handleSpecialEvent("artisan", eventCategory)
              : handleCraftAction();
            if (result) news.push(result);
            break;
          }
          case ActionInput.Stroll: {
            let result: News | null = eventCategory
              ? this.handleSpecialEvent("stroll", eventCategory)
              : handleStrollAction();
            if (result) news.push(result);
            break;
          }
          default: {
            let result: News | null = eventCategory
              ? this.handleSpecialEvent("rest", eventCategory)
              : handleRestAction([character], ActionInput.Rest);
            if (result) news.push(result);
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
  ): NewsWithScope | null {
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
