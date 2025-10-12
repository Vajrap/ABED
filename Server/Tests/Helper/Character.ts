import { Character } from "../../src/Entity/Character/Character";
import { CharacterAlignment } from "../../src/Entity/Character/Subclass/Alignment/CharacterAlignment";
import { CharacterFame } from "../../src/Entity/Character/Subclass/Fame/CharacterFame";
import { CharacterNeeds } from "../../src/Entity/Character/Subclass/Needs/CharacterNeeds";
import { CharacterArtisans } from "../../src/Entity/Character/Subclass/Stats/CharacterArtisans";
import { CharacterAttributes } from "../../src/Entity/Character/Subclass/Stats/CharacterAttributes";
import { CharacterBattleStats } from "../../src/Entity/Character/Subclass/Stats/CharacterBattleStats";
import { CharacterElements } from "../../src/Entity/Character/Subclass/Stats/CharacterElements";
import { CharacterProficiencies } from "../../src/Entity/Character/Subclass/Stats/CharacterProficiencies";
import { CharacterVitals } from "../../src/Entity/Character/Subclass/Vitals/CharacterVitals";
import {
  CharacterType,
  type AttributeKey,
  type ProficiencyKey,
  type ArtisanKey,
  type BattleStatKey,
  type ElementKey,
} from "../../src/InterFacesEnumsAndTypes/Enums";
import {
  defaultActionSequence,
  type CharacterActionSequence,
} from "../../src/Entity/Character/Subclass/Action/CharacterAction";

/* ---------------------------------------
   Shared tiny helper for patching a stat
----------------------------------------*/
type StatPatch = Partial<{
  base: number;
  bonus: number;
  battle: number;
  exp: number;
}>;

type GetterBucket<K extends string> = {
  getStat(key: K): { base: number; bonus: number; battle: number; exp: number };
};

function applyStatPatch<K extends string>(
  bucket: GetterBucket<K>,
  key: K,
  patch: StatPatch,
) {
  const s = bucket.getStat(key);
  if (patch.base !== undefined) s.base = patch.base;
  if (patch.bonus !== undefined) s.bonus = patch.bonus;
  if (patch.battle !== undefined) s.battle = patch.battle;
  if (patch.exp !== undefined) s.exp = patch.exp;
}

/* ---------------------------------------
   Character factory (one-shot builder)
----------------------------------------*/
export class CharacterFactory {
  private characterDraft: Character;
  private used = false;

  constructor() {
    this.characterDraft = this.makeDefault();
  }

  static create() {
    return new CharacterFactory();
  }

  private makeDefault(): Character {
    return new Character({
      id: "Test",
      name: "Test",
      type: CharacterType.humanoid,
      gender: "NONE",
      level: 1,
      alignment: new CharacterAlignment({ good: 0, evil: 0 }),
      artisans: new CharacterArtisans(),
      attribute: new CharacterAttributes(),
      battleStats: new CharacterBattleStats(),
      proficiencies: new CharacterProficiencies(),
      elements: new CharacterElements(),
      needs: new CharacterNeeds(),
      vitals: new CharacterVitals({}),
      statTracker: 0,
      fame: new CharacterFame(),
      actionSequence: defaultActionSequence(),
    });
  }

  private assertUnused() {
    if (this.used)
      throw new Error("CharacterFactory already used. Create a new factory.");
  }

  withName(name: string) {
    this.assertUnused();
    this.characterDraft.name = name;
    return this;
  }
  withGender(gender: "MALE" | "FEMALE" | "NONE") {
    this.assertUnused();
    this.characterDraft.gender = gender;
    return this;
  }
  withLevel(level: number) {
    this.assertUnused();
    this.characterDraft.level = level;
    return this;
  }
  withProficiencies(p: CharacterProficiencies) {
    this.assertUnused();
    this.characterDraft.proficiencies = p;
    return this;
  }
  withElements(e: CharacterElements) {
    this.assertUnused();
    this.characterDraft.elements = e;
    return this;
  }
  withAttributes(a: CharacterAttributes) {
    this.assertUnused();
    this.characterDraft.attribute = a;
    return this;
  }
  withBattleStats(b: CharacterBattleStats) {
    this.assertUnused();
    this.characterDraft.battleStats = b;
    return this;
  }
  withArtisans(a: CharacterArtisans) {
    this.assertUnused();
    this.characterDraft.artisans = a;
    return this;
  }
  withAlignment(al: CharacterAlignment) {
    this.assertUnused();
    this.characterDraft.alignment = al;
    return this;
  }
  withStatTracker(n: number) {
    this.assertUnused();
    this.characterDraft.statTracker = n;
    return this;
  }
  // (optional helpers if you want them later)
  // withLevel(level: number)         { this.assertUnused(); this.characterDraft.level = level; return this; }
  // withType(type: CharacterType)    { this.assertUnused(); this.characterDraft.type = type; return this; }

  build(): Character {
    this.assertUnused();
    this.used = true;
    return this.characterDraft;
  }
}

/* ---------------------------------------
   Attributes / Proficiencies / Artisans /
   BattleStats / Elements factories
   (all the same shape; one 'with' each)
----------------------------------------*/
export class CharacterAttributesFactory {
  private a = new CharacterAttributes();
  static create() {
    return new CharacterAttributesFactory();
  }
  with(key: AttributeKey, patch: StatPatch) {
    applyStatPatch(this.a, key, patch);
    return this;
  }
  build() {
    return this.a;
  }
}

export class CharacterProficienciesFactory {
  private p = new CharacterProficiencies();
  static create() {
    return new CharacterProficienciesFactory();
  }
  with(key: ProficiencyKey, patch: StatPatch) {
    applyStatPatch(this.p, key, patch);
    return this;
  }
  build() {
    return this.p;
  }
}

export class CharacterArtisansFactory {
  private a = new CharacterArtisans();
  static create() {
    return new CharacterArtisansFactory();
  }
  with(key: ArtisanKey, patch: StatPatch) {
    applyStatPatch(this.a, key, patch);
    return this;
  }
  build() {
    return this.a;
  }
}

export class CharacterBattleStatsFactory {
  private b = new CharacterBattleStats();
  static create() {
    return new CharacterBattleStatsFactory();
  }
  with(key: BattleStatKey, patch: StatPatch) {
    applyStatPatch(this.b, key, patch);
    return this;
  }
  build() {
    return this.b;
  }
}

export class CharacterElementsFactory {
  private e = new CharacterElements();
  static create() {
    return new CharacterElementsFactory();
  }
  with(key: ElementKey, patch: StatPatch) {
    applyStatPatch(this.e, key, patch);
    return this;
  }
  build() {
    return this.e;
  }
}
