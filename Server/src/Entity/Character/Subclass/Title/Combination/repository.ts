import { CharacterEpithetEnum } from "../Epithet/enum";
import { CharacterRoleEnum } from "../Role/enum";
import { TitleCombination } from "./Combination";
import { combineKey, type ComboKey } from "./combineKey";

export const titleCombination: Map<ComboKey, TitleCombination> = new Map();

const testingTester: TitleCombination = new TitleCombination(
  CharacterRoleEnum.Tester,
  CharacterEpithetEnum.Testing,
  (char) => {},
  (char) => {},
);

titleCombination.set(
  combineKey(CharacterEpithetEnum.Testing, CharacterRoleEnum.Tester),
  testingTester,
);

const testingTesterCombo: TitleCombination = new TitleCombination(
  CharacterRoleEnum.TesterCombo,
  CharacterEpithetEnum.TestingCombo,
  (char) => {
    char.attribute.mutateBase("strength", 1);
  },
  (char) => {
    char.attribute.mutateBase("strength", -1);
  },
);

titleCombination.set(
  combineKey(CharacterEpithetEnum.TestingCombo, CharacterRoleEnum.TesterCombo),
  testingTesterCombo,
);
