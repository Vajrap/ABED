import { expect, describe, beforeEach, afterEach, it, mock} from "bun:test";
import { trainInvoker, trainStat as realTrainStat, trainArtisan, trainAttribute, trainProficiency } from "../../../../../src/Entity/Character/Subclass/Stats/train";
import { CharacterFactory, CharacterAttributesFactory, CharacterProficienciesFactory } from "../../../../Helper/Character";

mock.module("../../../../../Utils/Dice", () => ({ rollTwenty: () => ({ total: 20 }) }));

describe("trainStat call counting via invoker", () => {
  beforeEach(() => {
    trainInvoker.trainStat = mock(realTrainStat)
  });

  afterEach(() => {
  trainInvoker.trainStat = realTrainStat;
  });

  it("does nothing when level >= 30 (trainStat not called)", () => {
    const char = CharacterFactory.create().withLevel(30).build();
    trainArtisan(char, "alchemy");
    trainAttribute(char, "agility");
    trainProficiency(char, "axe");
    expect(trainInvoker.trainStat).not.toHaveBeenCalled()
  });

  it("attributes: no-op when base >= 30 (trainStat not called)", () => {
    const attrs = CharacterAttributesFactory.create().with("agility", { base: 30 }).build();
    const char = CharacterFactory.create().withAttributes(attrs).build();
    trainAttribute(char, "agility");
    expect(trainInvoker.trainStat).not.toHaveBeenCalled()
  });

  it("proficiencies: no-op when base >= 30 (trainStat not called)", () => {
    const profs = CharacterProficienciesFactory.create().with("axe", { base: 30 }).build();
    const char = CharacterFactory.create().withProficiencies(profs).build();
    trainProficiency(char, "axe");
    expect(trainInvoker.trainStat).not.toHaveBeenCalled()
  });

  it("attribute: stat-up path (trainStat called once)", () => {
    const attrs = CharacterAttributesFactory.create()
      .with("strength", { base: 1, exp: 1_000_000 })
      .with("intelligence", { base: 18 })
      .build();
    const char = CharacterFactory.create().withAttributes(attrs).withStatTracker(0).build();
    trainAttribute(char, "strength");
    expect(trainInvoker.trainStat).toHaveBeenCalledTimes(1);
    expect(char.attribute.getStat("strength").base).toBeGreaterThan(1);
    expect(char.attribute.getStat("strength").exp).toBeLessThan(1_000_000);
  });
});