import type { LocationsEnum } from "../../InterFacesEnumsAndTypes/Enums/Location";
import { statMod } from "../../Utils/statMod";
import { Character } from "../Character/Character";
import type { ItemId } from "../Item/Item";
import { PartyType, type PartyBehavior } from "./PartyBehavior";
import {
  defaultPartyAction,
  type PartyActionSequence,
} from "./ActionlSequence/PartyActionSequence";

type PartyCharacters = [
  Character | "none",
  Character | "none",
  Character | "none",
  Character | "none",
  Character | "none",
  Character | "none",
];

export class Party {
  partyID: string;
  characters: PartyCharacters = [
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ];
  isTraveling: boolean = false;
  location: LocationsEnum;
  behavior: PartyBehavior;

  justArrived: boolean = false;
  informations: Record<string, number> = {};
  actionSequence: PartyActionSequence = defaultPartyAction;
  leader: Character;

  constructor(data: {
    leaderId: string;
    location: LocationsEnum;
    behavior: PartyBehavior;
    characters: Character[];
    leader: Character;
  }) {
    this.partyID = data.leaderId;
    this.location = data.location;
    this.behavior = data.behavior;
    for (let i = 0; i < data.characters.length; i++) {
      const character = data.characters[i];
      if (character) {
        this.characters[i] = character;
      }
    }
    this.leader = data.leader;
    this.setup();
  }

  getCharacters(): Character[] {
    return this.characters.filter((character) => character !== "none");
  }

  setTravelSpeed(speed: "bold" | "measured" | "careful") {
    this.behavior.travelPace = speed;
  }

  setup() {
    this.setBehavior();
    this.setType();
  }

  private setBehavior() {
    this.behavior.combatPolicy = this.calculateCombatPolicy("battlePolicy");
    this.behavior.riskTaking = this.calculateCombatPolicy("riskTaking");
    this.behavior.eventResponse = this.calculateCombatPolicy("eventResponse");
  }

  private calculateCombatPolicy(
    type: "battlePolicy" | "riskTaking" | "eventResponse",
  ): "bold" | "careful" | "measured" {
    const characters = this.characters.filter(
      (character) => character !== "none",
    );

    let policySum = 0;
    let neutralPull = 0;
    let totalWeight = characters.length;

    for (const character of characters) {
      const modifier =
        statMod(character.attribute.getStat("leadership").total) * 10;
      switch (character.behavior[type]) {
        case "bold":
          policySum += 100 + modifier / totalWeight;
          break;
        case "careful":
          policySum += 0 - modifier / totalWeight;
          break;
        case "measured":
          policySum += 50;
          neutralPull += modifier;
          break;
      }
    }

    let average = policySum / totalWeight;

    const distanceFromNeutral = 50 - average;
    const correction =
      Math.sign(distanceFromNeutral) *
      Math.min(Math.abs(distanceFromNeutral), neutralPull / totalWeight);
    average += correction;

    average = Math.max(0, Math.min(100, average));

    return average > 66 ? "bold" : average < 34 ? "careful" : "measured";
  }

  private setType() {
    // TODO party type logic taken all in the party and find common ground
    this.behavior.type = PartyType.wanderer;
  }

  isAllDead(): boolean {
    return this.characters.every(
      (character) => character === "none" || character.vitals.isDead,
    );
  }
}
