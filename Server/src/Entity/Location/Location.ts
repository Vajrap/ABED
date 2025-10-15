import type {
  ArtisanKey,
  AttributeKey,
  ProficiencyKey,
} from "../../InterFacesEnumsAndTypes/Enums";
import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import type { RegionEnum } from "../../InterFacesEnumsAndTypes/Enums/Region";
import type { SubRegionEnum } from "../../InterFacesEnumsAndTypes/Enums/SubRegion";
import type { DayOfWeek, TimeOfDay } from "../../InterFacesEnumsAndTypes/Time";
import type { ResourceGenerateCapacity, ResourceGenerationConfig } from "../../InterFacesEnumsAndTypes/Interfaces/Resource";
import {
  addToLocationScope,
  addToPartyScope,
  addToPrivateScope,
  addToRegionScope,
  addToSubRegionScope,
  addToWorldScope,
} from "../../Utils/addNewsToScope";
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
import { handelArtisanAction } from "./Events/handlers/artisans/handleArtisans";
import { handleCraftAction } from "./Events/handlers/craft/handleCraftAction";
import { handleLearnSkill } from "./Events/handlers/learn/handleLearnSkill";
import { handleReadAction } from "./Events/handlers/read/handleReadAction";
import { handleRestAction } from "./Events/handlers/rest";
import { resolveStrollingAction } from "./Events/handlers/strolling/resolveStrollingAction";
import { resolveTavernAction } from "./Events/handlers/tavern/resolveTavernAction";
import { handleTrainArtisans } from "./Events/handlers/train/artisans";
import { handleTrainAttribute } from "./Events/handlers/train/attribute";
import { handleTrainProficiency } from "./Events/handlers/train/proficiency";
import { handleTrainSkill } from "./Events/handlers/train/skill";
import type { SubRegion } from "./SubRegion";
import type { WeatherVolatility } from "../Card/WeatherCard/WeatherCard";
import { Weather } from "../../InterFacesEnumsAndTypes/Weather";
import Report from "../../Utils/Reporter";
import { GameTime } from "../../Game/GameTime/GameTime";
import { subregionRepository } from "../Repository/subregion";

export type UserInputAction = {
  type: ActionInput;
};

type RandomEvents = {
  rest: RandomEventUnits;
  train: RandomEventUnits;
  learn: RandomEventUnits;
  stroll: RandomEventUnits;
  artisan: RandomEventUnits;
  travel: RandomEventUnits;
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
  travel: {
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
  weatherScale: number;
  volatility: WeatherVolatility;
  // New resource generation system
  resourceGeneration: ResourceGenerationConfig;

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
    volatility: WeatherVolatility,
    randomEvents?: RandomEvents,
    innConfig?: LocationInns,
    weatherScale?: number,
    resourceGeneration?: ResourceGenerationConfig,
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
    this.volatility = volatility;
    this.weatherScale = weatherScale ?? getStartingWeatherScale(volatility);
    this.resourceGeneration = resourceGeneration ?? this.getDefaultResourceGeneration();
  }

  getRandomEventFor(
    action: "rest" | "train" | "learn" | "stroll" | "artisan" | "travel",
    roll: number,
  ): RandomEventHandler | null {
    if (roll >= 5 && roll <= 16) {
      return null;
    }
    const set = this.randomEvents[action];
    let sub: RandomEventSubUnit | null = null;

    if (roll === 1) {
      sub = set.worst;
    }
    if (roll >= 2 && roll <= 4) {
      sub = set.bad;
    }
    if (roll >= 17 && roll <= 19) {
      sub = set.good;
    }
    if (roll === 20) {
      sub = set.best;
    }

    if (!sub) {
      return null;
    }

    // sub is just an array of handlers
    const handler = sub[Math.floor(Math.random() * sub.length)];

    return handler ?? null;
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
      const action = party.actionSequence[day][phase];

      if (action === ActionInput.Travel || specialActions.includes(action))
        continue;

      const context = buildNewsContext(this, party);

      if (isGroupRest(party.actionSequence[day][phase])) {
        const result = processGroupResting(
          party,
          action,
          context,
          this.innType,
        );
        if (result && result.scope.kind != "none")
          addToPartyScope(results, party.partyID, result.news);
        continue;
      }

      const groups = groupCharacterActions(party, day, phase, this.actions);
      processCharacterGroups(groups, context, results, this.randomEvents);
    }

    return results;
  }

  // Resource generation methods
  private getDefaultResourceGeneration(): ResourceGenerationConfig {
    return {
      capacity: {
        // Mineral resources
        ore: 0,
        gemstone: 0,

        // Organic/forestry resources
        wood: 0,


        // Foraging resources
        herbs: 0,
        silk: 0,

        // Aquatic resources
        fish: 0,

        // Agricultural resources
        grain: 0,
        vegetables: 0,
        fruits: 0,

        // Livestock resources
        livestock: 0
      },
      rate: {
        // Mineral resources
        ore: 0,
        gemstone: 0,

        // Organic/forestry resources
        wood: 0,


        // Foraging resources
        herbs: 0,
        silk: 0,

        // Aquatic resources
        fish: 0,

        // Agricultural resources
        grain: 0,
        vegetables: 0,
        fruits: 0,

        // Livestock resources
        livestock: 0
      },
      stockpile: {
        // Mineral resources
        ore: 0,
        gemstone: 0,

        // Organic/forestry resources
        wood: 0,


        // Foraging resources
        herbs: 0,
        silk: 0,

        // Aquatic resources
        fish: 0,

        // Agricultural resources
        grain: 0,
        vegetables: 0,
        fruits: 0,

        // Livestock resources
        livestock: 0
      }
    };
  }

  private generateResources(type: string): number {
    const currentStockpile = this.resourceGeneration.stockpile[type as keyof typeof this.resourceGeneration.stockpile];
    const generationRate = this.resourceGeneration.rate[type as keyof typeof this.resourceGeneration.rate];
    const maxCapacity = this.resourceGeneration.capacity[type as keyof typeof this.resourceGeneration.capacity];

    const roll = rollTwenty().total;
    const fluctuation = (roll - 10) / 100;
    const generated = generationRate * (1 + fluctuation);

    let newAmount = currentStockpile + generated;
    if (newAmount > maxCapacity) {
      newAmount = maxCapacity;
    } else if (newAmount < 0) {
      newAmount = 0;
    }

    this.resourceGeneration.stockpile[type as keyof typeof this.resourceGeneration.stockpile] = newAmount;
    
    // Return amount actually generated (for production tracking)
    return Math.max(0, newAmount - currentStockpile);
  }

  // Generate resources based on capacity and rates
  refillResources(): Map<string, number> {
    const generated = new Map<string, number>();
    
    switch (GameTime.season) {
      case 1:
        // Seeding season
        // fish, livestock
        generated.set("fish", this.generateResources("fish"));
        generated.set("livestock", this.generateResources("livestock"));
        break;
      case 2:
        // RainFall season
        // wood, herbs,
        generated.set("wood", this.generateResources("wood"));
        generated.set("herbs", this.generateResources("herbs"));
        break;
      case 3:
        // GreenTide season
        // fruits
        generated.set("fruits", this.generateResources("fruits"));
        break;
      case 4:
        // HarvestMoon season
        // grain, vegetables, 
        generated.set("grain", this.generateResources("grain"));
        generated.set("vegetables", this.generateResources("vegetables"));
        break;
      case 5:
        // SunDry season
        // silk
        generated.set("silk", this.generateResources("silk"));
        break;
      case 6:
        // Frostveil season
        // gemstone
        generated.set("gemstone", this.generateResources("gemstone"));
        break;
      case 7:
        // LongDark season
        // ore
        generated.set("ore", this.generateResources("ore"));
        break;
      }

    return generated;
  }

  // Get available resources for artisan actions
  getAvailableResources(): ResourceGenerateCapacity {
    return { ...this.resourceGeneration.stockpile };
  }

  getWeather(): Weather {
    const subRegion = subregionRepository.get(this.subRegion);
    if (!subRegion) {
      Report.error(`SubRegion ${this.subRegion} not found`);
      return Weather.Clear;
    }
    const weather = subRegion.weatherInterpretation.get(this.weatherScale);
    if (!weather) {
      Report.error(`Weather ${this.weatherScale} not found`);
      return Weather.Clear;
    }
    return weather;
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
  learnSkill: { character: Character; skillId: SkillId }[];
  strolling: Character[];
  tavern: Character[];
  artisanActions: ArtisanAction[];
  reading: Character[];
  crafting: Character[];
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
    learnSkill: [],
    strolling: [],
    tavern: [],
    artisanActions: [],
    reading: [],
    crafting: [],
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
        groups.learnSkill.push({ character, skillId: action.skillId });
        break;

      case ActionInput.Stroll:
        groups.strolling.push(character);
        break;

      case ActionInput.Tavern:
        groups.tavern.push(character);
        break;

      case ActionInput.Read:
        groups.reading.push(character);
        break;

      case ActionInput.Craft:
        groups.crafting.push(character);
        break;

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

function getEncounterCandidates(parties: Party[]): Party[] {
  if (parties.length < 2) return [];
  const shuffled = [...parties].sort(() => Math.random() - 0.5);
  return shuffled.filter(() => rollTwenty().total % 2 === 1);
}

function pairEncounterCandidates(candidates: Party[]): [Party, Party][] {
  const pairs: [Party, Party][] = [];
  for (let i = 0; i < candidates.length - 1; i += 2) {
    const a = candidates[i];
    const b = candidates[i + 1];
    if (!a || !b) continue;
    pairs.push([a, b]);
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
    case "worldScope":
      result.worldScope.push(news);
      break;
    case "regionScope":
      addToRegionScope(result, news.scope.region, news);
      break;
    case "subRegionScope":
      addToSubRegionScope(result, news.scope.subRegion, news);
      break;
    case "locationScope":
      addToLocationScope(result, news.scope.location, news);
      break;
    case "partyScope":
      addToPartyScope(result, news.scope.partyId, news);
      break;
    case "privateScope":
      // TODO: handle private scope
      for (const charId of news.scope.characterId) {
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
  action:
    | ActionInput.None
    | ActionInput.Rest
    | ActionInput.Inn
    | ActionInput.Camping
    | ActionInput.HouseRest,
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
  let allNews: NewsWithScope[] = [];
  // Solo Artisan
  for (const { character, actionInput } of groups.artisanActions) {
    const results = resolveGroupRandomEvent([character], events.artisan, () =>
      handelArtisanAction(character, context),
    );
    allNews.push(...results);
  }

  // Rest
  for (const c of groups.resting) {
    const result = resolveGroupRandomEvent([c], events.rest, () =>
      handleRestAction([c], ActionInput.Rest, context),
    );
    allNews.push(...result);
  }

  // Group
  // Tavern and strolling might not use the luck roll for random encounter, but the location should provide list of possible events separate into groups
  // Grouping just like the same as RE, worst bad natural good best, each with multiple possible events, and we randomly pick.
  // These resolve functions might need to receive the location or at least set of possible events from location itself
  if (groups.strolling.length > 0) {
    const result: NewsWithScope[] = resolveStrollingAction();
    allNews.push(...result);
  }

  if (groups.tavern.length > 0) {
    const result: NewsWithScope[] = resolveTavernAction();
    allNews.push(...result);
  }

  // Training, subAction grouping
  groups.trainArtisan.forEach((chars, artisanKey) => {
    const result = resolveGroupRandomEvent(chars, events.train, () =>
      handleTrainArtisans(chars, artisanKey, context),
    );
    allNews.push(...result);
  });

  groups.trainAttribute.forEach((chars, attributeKey) => {
    const result = resolveGroupRandomEvent(chars, events.train, () =>
      handleTrainAttribute(chars, attributeKey, context),
    );
    allNews.push(...result);
  });

  groups.trainProficiency.forEach((chars, proficiencyKey) => {
    const result = resolveGroupRandomEvent(chars, events.train, () =>
      handleTrainProficiency(chars, proficiencyKey, context),
    );
    allNews.push(...result);
  });

  groups.trainSkill.forEach((chars, skillId) => {
    const result = resolveGroupRandomEvent(chars, events.train, () =>
      handleTrainSkill(chars, skillId, context),
    );
    allNews.push(...result);
  });

  groups.reading.forEach((c) => {
    const result = handleReadAction(c);
    allNews.push(...result);
  });

  groups.crafting.forEach((c) => {
    const result = handleCraftAction(c, context);
    allNews.push(...result);
  });

  for (const { character, skillId } of groups.learnSkill) {
    const result = resolveGroupRandomEvent([character], events.learn, () =>
      handleLearnSkill(character, skillId, context),
    );
    allNews.push(...result);
  }

  for (const n of allNews) {
    addNewsWithScopeToNewsEmittedFromLocationStruct({
      nws: n,
      nefls: news,
      location: context.location,
      subRegion: context.subRegion,
      region: context.region,
      characterIds: n.news.context.characterIds,
      partyId: n.news.context.partyId,
    });
  }

  return news;
}

function resolveGroupRandomEvent(
  characters: Character[],
  eventSource: RandomEventUnits,
  fallback: () => NewsWithScope | NewsWithScope[] | null,
): NewsWithScope[] {
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
        return results;
      }
    }
  }

  const result = fallback();
  if (result) {
    if (Array.isArray(result)) results.push(...result);
    else results.push(result);
  }

  return results;
}

function addNewsWithScopeToNewsEmittedFromLocationStruct(data: {
  nws: NewsWithScope;
  nefls: NewsEmittedFromLocationStructure;
  location: LocationsEnum;
  subRegion: SubRegionEnum;
  region: RegionEnum;
  characterIds: string[];
  partyId: string;
}): NewsEmittedFromLocationStructure {
  switch (data.nws.scope.kind) {
    case "privateScope":
      for (const characterId of data.characterIds) {
        addToPrivateScope(data.nefls, characterId, data.nws.news);
      }
      break;
    case "partyScope":
      addToPartyScope(data.nefls, data.partyId, data.nws.news);
      break;
    case "locationScope":
      addToLocationScope(data.nefls, data.location, data.nws.news);
      break;
    case "subRegionScope":
      addToSubRegionScope(data.nefls, data.subRegion, data.nws.news);
      break;
    case "regionScope":
      addToRegionScope(data.nefls, data.region, data.nws.news);
      break;
    case "worldScope":
      addToWorldScope(data.nefls, data.nws.news);
      break;
  }
  return data.nefls;
}


function getStartingWeatherScale(volatility: WeatherVolatility): number {
  switch (volatility) {
    case "TRANQUIL":
      return 20 + Math.random() * 20; // ~20–40
    case "CALM":
      return 30 + Math.random() * 25; // ~30–55
    case "STABLE":
      return 40 + Math.random() * 20; // ~40–60
    case "BALANCE":
      return 45 + Math.random() * 30; // ~45–75
    case "UNSTABLE":
      return 55 + Math.random() * 25; // ~55–80
    case "VOLATILE":
      return 65 + Math.random() * 25; // ~65–90
    case "EXTREME":
      return 75 + Math.random() * 25; // ~75–100
  }
}
