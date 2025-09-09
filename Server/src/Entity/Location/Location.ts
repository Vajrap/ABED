import type {
  ArtisanKey,
  AttributeKey,
  ProficiencyKey,
} from "../../InterFacesEnumsAndTypes/Enums";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import { rollTwenty } from "../../Utils/Dice";
import { statMod } from "../../Utils/statMod";
import type { Character } from "../Character/Character";
import {
  ActionInput,
  groupRest,
  specialActions,
} from "../Character/Subclass/Action/CharacterAction";
import type {
  News,
  NewsContext,
  NewsEmittedFromLocationStructure,
  NewsWithScope,
} from "../News/News";
import type { Party } from "../Party/Party";
import type { SkillId } from "../Skill/enums";
import type { LocationInns } from "./Config/Inn";
import { handleRestAction } from "./Events/handlers/rest";
import { handleTrainAction } from "./Events/handlers/train";
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
  worst: RandomEventSubUnit;
  bad: RandomEventSubUnit;
  good: RandomEventSubUnit;
  best: RandomEventSubUnit;
};

type RandomEventHandler = (characters: Character[]) => NewsWithScope;
export type RandomEventSubUnit = RandomEventHandler[];

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

  async processEncounters(): Promise<NewsEmittedFromLocationStructure> {
    const result = createEmptyNewsStructure();

    const candidates = getEncounterCandidates(this.parties);
    if (candidates.length < 2) return result;

    const encounterPairs = pairEncounterCandidates(candidates);
    const newsList = generateEncounterNews(encounterPairs);

    for (const n of newsList) {
      pushNewsToScope(result, n);
    }

    return result;
  }

  async processActions(
    day: DayOfWeek,
    phase: TimeOfDay,
  ): Promise<NewsEmittedFromLocationStructure> {
    const results: NewsEmittedFromLocationStructure =
      createEmptyNewsStructure();
    if (this.parties.length === 0) return results;

    for (const party of this.parties) {
      if (shouldSkipPartyActions(party, day, phase)) continue;

      const context = buildNewsContext(this, party);

      if (isGroupRest(party.actionSequence[day][phase])) {
        const result = processGroupResting(
          party,
          party.actionSequence[day][phase],
          context,
          this.innType,
        );
        if (result) addToPartyScope(results, party.partyID, result.news);
        continue;
      }

      const groups = groupCharacterActions(party, day, phase, this.actions);
      processCharacterGroups(groups, context, results, this.randomEvents);
    }

    return results;
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

type ArtisanAction = {
  character: Character;
  actionInput: ActionInput;
};

type CharacterGroups = {
  resting: Character[];
  trainAttribute: Map<AttributeKey, Character[]>;
  trainArtisan: Map<ArtisanKey, Character[]>;
  trainProficiency: Map<ProficiencyKey, Character[]>;
  trainSkill: Map<SkillId, Character[]>;
  learnSkill: Map<SkillId, Character[]>;
  strolling: Character[];
  tavern: Character[];
  artisanActions: ArtisanAction[];
};

function groupCharacterActions(
  party: Party,
  day: DayOfWeek,
  phase: TimeOfDay,
  validActions: ActionInput[],
): CharacterGroups {
  const groups: CharacterGroups = {
    resting: [],
    trainAttribute: new Map(),
    trainArtisan: new Map(),
    trainProficiency: new Map(),
    trainSkill: new Map(),
    learnSkill: new Map(),
    strolling: [],
    tavern: [],
    artisanActions: [],
  };

  for (const character of party.characters.filter((c) => c !== "none")) {
    const action = character.actionSequence[day][phase];

    function addToMapArray<K, V>(map: Map<K, V[]>, key: K, value: V) {
      const existing = map.get(key);
      if (existing) {
        existing.push(value);
      } else {
        map.set(key, [value]);
      }
    }

    if (action.type === ActionInput.Travel) continue;
    if (!validActions.includes(action.type)) {
      groups.resting.push(character);
      continue;
    }

    switch (action.type) {
      case ActionInput.Rest:
        groups.resting.push(character);
        break;

      case ActionInput.TrainAttribute:
        addToMapArray(groups.trainAttribute, action.attribute, character);
        break;

      case ActionInput.TrainArtisan:
        addToMapArray(groups.trainArtisan, action.artisan, character);
        break;

      case ActionInput.TrainProficiency:
        addToMapArray(groups.trainProficiency, action.proficiency, character);
        break;

      case ActionInput.TrainSkill:
        addToMapArray(groups.trainSkill, action.skillId, character);
        break;

      case ActionInput.LearnSkill:
        addToMapArray(groups.learnSkill, action.skillId, character);
        break;

      case ActionInput.Stroll:
        groups.strolling.push(character);
        break;

      case ActionInput.Tavern:
        groups.tavern.push(character);
        break;

      case ActionInput.Read:
      case ActionInput.Craft:
      case ActionInput.Mining:
      case ActionInput.WoodCutting:
      case ActionInput.Foraging:
      case ActionInput.Smelting:
      case ActionInput.Tanning:
      case ActionInput.Carpentry:
      case ActionInput.Weaving:
      case ActionInput.Enchanting:
        groups.artisanActions.push({ character, actionInput: action.type });
        break;
    }
  }

  return groups;
}

// Utility to add to a Map<K, V[]>
function addToWorldScope(news: NewsEmittedFromLocationStructure, item: News) {
  news.worldScope.push(item);
}

function addToRegionScope(
  news: NewsEmittedFromLocationStructure,
  region: RegionEnum,
  item: News,
) {
  const arr = news.regionScope.get(region);
  if (arr) {
    arr.push(item);
  } else {
    news.regionScope.set(region, [item]);
  }
}

function addToSubRegionScope(
  news: NewsEmittedFromLocationStructure,
  subRegion: SubRegionEnum,
  item: News,
) {
  const arr = news.subRegionScope.get(subRegion);
  if (arr) {
    arr.push(item);
  } else {
    news.subRegionScope.set(subRegion, [item]);
  }
}

function addToLocationScope(
  news: NewsEmittedFromLocationStructure,
  location: LocationsEnum,
  item: News,
) {
  const arr = news.locationScope.get(location);
  if (arr) {
    arr.push(item);
  } else {
    news.locationScope.set(location, [item]);
  }
}

function addToPartyScope(
  news: NewsEmittedFromLocationStructure,
  partyId: string,
  item: News,
) {
  const arr = news.partyScope.get(partyId);
  if (arr) {
    arr.push(item);
  } else {
    news.partyScope.set(partyId, [item]);
  }
}

function addToPrivateScope(
  news: NewsEmittedFromLocationStructure,
  characterId: string,
  item: News,
) {
  const arr = news.privateScope.get(characterId);
  if (arr) {
    arr.push(item);
  } else {
    news.privateScope.set(characterId, [item]);
  }
}

function getEncounterCandidates(parties: Party[]): Party[] {
  if (parties.length < 2) return [];
  const shuffled = [...parties].sort(() => Math.random() - 0.5);
  return shuffled.filter(() => rollTwenty().total % 2 === 1);
}

function pairEncounterCandidates(candidates: Party[]): [Party, Party][] {
  const pairs: [Party, Party][] = [];
  const encountered = new Set<Party>();

  for (let i = 0; i < candidates.length - 1; i++) {
    const a = candidates[i]!;
    if (encountered.has(a)) continue;

    for (let j = i + 1; j < candidates.length; j++) {
      const b = candidates[j]!;
      if (encountered.has(b)) continue;

      pairs.push([a, b]);
      encountered.add(a);
      encountered.add(b);
      break; // one pairing per party
    }
  }

  return pairs;
}

function generateEncounterNews(pairs: [Party, Party][]): News[] {
  const news: News[] = [];
  for (const [a, b] of pairs) {
    // Placeholder - replace with actual logic
    // const result = checkAndTriggerEncounterEvent(a, b);
    // if (result) news.push(result);
  }
  return news;
}

function pushNewsToScope(result: NewsEmittedFromLocationStructure, news: News) {
  switch (news.scope.kind) {
    case "world":
      result.worldScope.push(news);
      break;
    case "region":
      addToRegionScope(result, news.scope.region, news);
      break;
    case "subRegion":
      addToSubRegionScope(result, news.scope.subRegion, news);
      break;
    case "location":
      addToLocationScope(result, news.scope.location, news);
      break;
    case "party":
      addToPartyScope(result, news.scope.partyId, news);
      break;
    case "private":
      // TODO: handle private scope
      for (const charId of news.scope.characterIds) {
        addToPrivateScope(result, charId, news);
      }
      break;
  }
}

function createEmptyNewsStructure(): NewsEmittedFromLocationStructure {
  return {
    worldScope: [],
    regionScope: new Map(),
    subRegionScope: new Map(),
    locationScope: new Map(),
    partyScope: new Map(),
    privateScope: new Map(),
  };
}

function shouldSkipPartyActions(
  party: Party,
  day: DayOfWeek,
  phase: TimeOfDay,
): boolean {
  const action = party.actionSequence[day][phase];
  return action === ActionInput.Travel || specialActions.includes(action);
}

function buildNewsContext(location: Location, party: Party): NewsContext {
  return {
    region: location.region,
    subRegion: location.subRegion,
    location: location.id,
    partyId: party.partyID,
    characterIds: party.characters.filter((c) => c !== "none").map((c) => c.id),
  };
}

function isGroupRest(action: ActionInput): boolean {
  return groupRest.includes(action);
}

function processGroupResting(
  party: Party,
  action: ActionInput,
  context: NewsContext,
  innType: LocationInns,
): NewsWithScope | null {
  const characters = party.characters.filter((c) => c !== "none");
  return handleRestAction(
    characters,
    action === ActionInput.None ? ActionInput.Rest : action,
    context,
    innType,
  );
}

function processCharacterGroups(
  groups: CharacterGroups,
  context: NewsContext,
  news: NewsEmittedFromLocationStructure,
  events: RandomEvents,
): NewsEmittedFromLocationStructure {
  // Solo Artisan
  for (const { character, actionInput } of groups.artisanActions) {
    resolveGroupRandomEvent(
      [character],
      events.artisan,
      () => handelArtisanAction(character, actionInput, context),
      "private",
      news,
      character.id,
    );
  }

  // Rest
  for (const c of groups.resting) {
    resolveGroupRandomEvent(
      [c],
      events.rest,
      () => handleRestAction([c], ActionInput.Rest, context),
      "private",
      news,
      c.id,
    );
  }

  // Group
  // Tavern and strolling might not use the luck roll for random encounter, but the location should provide list of possible events separate into groups
  // Grouping just like the same as RE, worst bad natural good best, each with multiple possible events, and we randomly pick.
  if (groups.strolling.length > 0) {
  }

  if (groups.tavern.length > 0) {
  }

  // Training, subAction grouping
  groups.trainArtisan.forEach((chars, artisanKey) => {
    resolveGroupRandomEvent(
      chars,
      events.train,
      () => handleTrainAction(chars, artisanKey, context),
      "party",
      news,
      context.partyId,
    );
  });

  groups.trainAttribute.forEach((chars, attributeKey) => {
    resolveGroupRandomEvent(
      chars,
      events.train,
      () => handleTrainAction(chars, attributeKey, context),
      "party",
      news,
      context.partyId,
    );
  });

  groups.trainProficiency.forEach((chars, proficiencyKey) => {
    resolveGroupRandomEvent(
      chars,
      events.train,
      () => handleTrainAction(chars, proficiencyKey, context),
      "party",
      news,
      context.partyId,
    );
  });

  groups.trainSkill.forEach((chars, skillId) => {
    resolveGroupRandomEvent(
      chars,
      events.train,
      () => {},
      "party",
      news,
      context.partyId,
    );
  });

  groups.learnSkill.forEach((chars, skillId) => {
    resolveGroupRandomEvent(
      chars,
      events.learn,
      () => {},
      "party",
      news,
      context.partyId,
    );
  });

  return news;
}

function resolveGroupRandomEvent(
  characters: Character[],
  eventSource: RandomEventUnits,
  fallback: () => NewsWithScope | null,
) {
  let results: NewsWithScope[] = [];
  const luckAvg = Math.floor(
    characters.reduce(
      (sum, c) => sum + statMod(c.attribute.getTotal("luck")),
      0,
    ) / characters.length,
  );
  const roll = rollTwenty().total + luckAvg;
  const category = getEventCategory(roll);

  if (category) {
    const candidates = eventSource[category];
    if (candidates.length > 0) {
      const event = candidates[Math.floor(Math.random() * candidates.length)];
      const result = event!(characters);
      if (result) {
        results.push(result);
        return;
      }
    }
  }

  const result = fallback();
  if (result) {
    results.push(result);
  }
}

function addNewsWithScopeToNewsEmittedFromLocationStruct(
  nws: NewsWithScope,
  nefls: NewsEmittedFromLocationStructure,
) {
  switch (nws.scope.kind) {
    case "private":
      addToPrivateScope(nefls, "characterId", nws.news);
      break;
    case "party":
      nefls.partyScope.push(nws);
      break;
    case "location":
      nefls.locationScope.push(nws);
      break;
    case "subRegion":
      nefls.subRegionScope.push(nws);
      break;
    case "region":
      nefls.regionScope.push(nws);
      break;
    case "world":
      nefls.worldScope.push(nws);
      break;
  }
}
