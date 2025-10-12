import { CharacterEpithetEnum } from "./enum";
import { Epithet } from "./Epithet";

const epithet_test = new Epithet(
  CharacterEpithetEnum.Testing,
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
  (char) => {
    char.title.epithet = CharacterEpithetEnum.TestingCombo;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.epithet = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

const epithet_retainor = new Epithet(
  CharacterEpithetEnum.Retainor
);

const epithet_peasant = new Epithet(
  CharacterEpithetEnum.Peasant
);

const epithet_merchant = new Epithet(
  CharacterEpithetEnum.Merchant
);

const epithet_scholar = new Epithet(
  CharacterEpithetEnum.Scholar
);

const epithet_artisan = new Epithet(
  CharacterEpithetEnum.Artisan
);

const epithet_soldier = new Epithet(
  CharacterEpithetEnum.Soldier
);

export const epithetRepository: Map<CharacterEpithetEnum, Epithet> = new Map([
  [CharacterEpithetEnum.Testing, epithet_test],
  [CharacterEpithetEnum.TestingCombo, epithet_testCombo],
  [CharacterEpithetEnum.Retainor, epithet_retainor],
  [CharacterEpithetEnum.Peasant, epithet_peasant],
  [CharacterEpithetEnum.Merchant, epithet_merchant],
  [CharacterEpithetEnum.Scholar, epithet_scholar],
  [CharacterEpithetEnum.Artisan, epithet_artisan],
  [CharacterEpithetEnum.Soldier, epithet_soldier],
]);
