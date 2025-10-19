import type { Range } from "src/InterFacesEnumsAndTypes/Types.ts";

export class DeckCondition {
  selectedCondition: "NONE" | "SELF" | "TEAMMATE" | "ENEMY" | "PARTY_SIZE";
  self: VitalCondition | undefined;
  teammate: { position: number[]; vital: VitalCondition } | undefined; //If any teammate within position met the condition
  enemy: VitalCondition | undefined; //If 'any' enemy met the condition
  partySize: "SMALLER" | "LARGER" | undefined;
  constructor(data: {
    selectedCondition?: "NONE" | "SELF" | "TEAMMATE" | "ENEMY" | "PARTY_SIZE";
    self?: VitalCondition;
    teammate?: { position: number[]; vital: VitalCondition };
    enemy?: VitalCondition;
    partySize?: "SMALLER" | "LARGER";
  }) {
    this.selectedCondition = data.selectedCondition || "NONE";
    this.self = data.self;
    this.teammate = data.teammate;
    this.enemy = data.enemy;
    this.partySize = data.partySize;
  }
}

type VitalCondition = {
  hp: Range;
  mp: Range;
  sp: Range;
};
