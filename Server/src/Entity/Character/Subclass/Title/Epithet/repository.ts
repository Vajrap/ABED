import { CharacterEpithetEnum } from "./enum";
import { Epithet } from "./Epithet";

const epithet_none = new Epithet(
  CharacterEpithetEnum.None,
    {en: "None", th: "None"},
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
  [CharacterEpithetEnum.None, epithet_none],
  [CharacterEpithetEnum.Retainer, epithet_retainer],
  [CharacterEpithetEnum.Peasant, epithet_peasant],
  [CharacterEpithetEnum.Merchant, epithet_merchant],
  [CharacterEpithetEnum.Scholar, epithet_scholar],
  [CharacterEpithetEnum.Artisan, epithet_artisan],
  [CharacterEpithetEnum.Soldier, epithet_soldier],
]);
