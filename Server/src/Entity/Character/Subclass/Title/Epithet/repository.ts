import { CharacterEpithetEnum } from "./enum";
import { Epithet } from "./Epithet";

const epithet_test = new Epithet(
  CharacterEpithetEnum.Testing,
  "Testing",
  (char) => {
    char.title.epithet = CharacterEpithetEnum.Testing;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.epithet = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

const epithet_testCombo = new Epithet(
  CharacterEpithetEnum.TestingCombo,
  "TestingCombo",
  (char) => {
    char.title.epithet = CharacterEpithetEnum.TestingCombo;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.epithet = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

export const epithetRepository: Map<CharacterEpithetEnum, Epithet> = new Map([
  [CharacterEpithetEnum.Testing, epithet_test],
  [CharacterEpithetEnum.TestingCombo, epithet_testCombo],
]);
