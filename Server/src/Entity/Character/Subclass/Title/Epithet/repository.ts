import { CharacterEpithetEnum } from "./enum";
import { Epithet } from "./Epithet";

const epithet_test = new Epithet(
  CharacterEpithetEnum.Testing,
    {en: "test", th: "test"},
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
    {en: "test", th: "test"},
  (char) => {
    char.title.epithet = CharacterEpithetEnum.TestingCombo;
    char.attribute.mutateBase("agility", 1);
  },
  (char) => {
    char.title.epithet = undefined;
    char.attribute.mutateBase("agility", -1);
  },
);

const epithet_retainer = new Epithet(
  CharacterEpithetEnum.Retainer,
    {en: "test", th: "test"},
);

const epithet_peasant = new Epithet(
  CharacterEpithetEnum.Peasant,
    {en: "test", th: "test"},
);

const epithet_merchant = new Epithet(
  CharacterEpithetEnum.Merchant,
    {en: "test", th: "test"},
);

const epithet_scholar = new Epithet(
  CharacterEpithetEnum.Scholar,
    {en: "test", th: "test"},
);

const epithet_artisan = new Epithet(
  CharacterEpithetEnum.Artisan,
    {en: "test", th: "test"},
);

const epithet_soldier = new Epithet(
  CharacterEpithetEnum.Soldier,
    {en: "test", th: "test"},
);

export const epithetRepository: Map<CharacterEpithetEnum, Epithet> = new Map([
  [CharacterEpithetEnum.Testing, epithet_test],
  [CharacterEpithetEnum.TestingCombo, epithet_testCombo],
  [CharacterEpithetEnum.Retainer, epithet_retainer],
  [CharacterEpithetEnum.Peasant, epithet_peasant],
  [CharacterEpithetEnum.Merchant, epithet_merchant],
  [CharacterEpithetEnum.Scholar, epithet_scholar],
  [CharacterEpithetEnum.Artisan, epithet_artisan],
  [CharacterEpithetEnum.Soldier, epithet_soldier],
]);
