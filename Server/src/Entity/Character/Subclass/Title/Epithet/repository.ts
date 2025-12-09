import { CharacterEpithetEnum } from "./enum";
import { Epithet } from "./Epithet";

const epithet_none = new Epithet(
  CharacterEpithetEnum.None,
    {en: "None", th: "None"},
);

const epithet_retainer = new Epithet(
  CharacterEpithetEnum.Retainer,
    {en: "Retainer", th: "Retainer"},
);

const epithet_peasant = new Epithet(
  CharacterEpithetEnum.Peasant,
    {en: "Peasant", th: "Peasant"},
);

const epithet_merchant = new Epithet(
  CharacterEpithetEnum.Merchant,
    {en: "Merchant", th: "Merchant"},
);

const epithet_scholar = new Epithet(
  CharacterEpithetEnum.Scholar,
    {en: "Scholar", th: "Scholar"},
);

const epithet_artisan = new Epithet(
  CharacterEpithetEnum.Artisan,
    {en: "Artisan", th: "Artisan"},
);

const epithet_soldier = new Epithet(
  CharacterEpithetEnum.Soldier,
    {en: "Soldier", th: "Soldier"},
);

const epithet_noble = new Epithet(
  CharacterEpithetEnum.Noble,
    {en: "Noble", th: "Noble"},
);

const epithet_adventurer = new Epithet(
  CharacterEpithetEnum.Adventurer,
    {en: "Adventurer", th: "Adventurer"},
);

const epithet_criminal = new Epithet(
  CharacterEpithetEnum.Criminal,
    {en: "Criminal", th: "Criminal"},
);

const epithet_hermit = new Epithet(
  CharacterEpithetEnum.Hermit,
    {en: "Hermit", th: "Hermit"},
);

const epithet_folkHero = new Epithet(
  CharacterEpithetEnum.FolkHero,
    {en: "FolkHero", th: "FolkHero"},
);

const epithet_cityGuard = new Epithet(
  CharacterEpithetEnum.CityGuard,
    {en: "CityGuard", th: "CityGuard"},
);

export const epithetRepository: Map<CharacterEpithetEnum, Epithet> = new Map([
  [CharacterEpithetEnum.None, epithet_none],
  [CharacterEpithetEnum.Retainer, epithet_retainer],
  [CharacterEpithetEnum.Peasant, epithet_peasant],
  [CharacterEpithetEnum.Merchant, epithet_merchant],
  [CharacterEpithetEnum.Scholar, epithet_scholar],
  [CharacterEpithetEnum.Artisan, epithet_artisan],
  [CharacterEpithetEnum.Soldier, epithet_soldier],
  [CharacterEpithetEnum.Noble, epithet_noble],
  [CharacterEpithetEnum.Adventurer, epithet_adventurer],
  [CharacterEpithetEnum.Criminal, epithet_criminal],
  [CharacterEpithetEnum.Hermit, epithet_hermit],
  [CharacterEpithetEnum.FolkHero, epithet_folkHero],
  [CharacterEpithetEnum.CityGuard, epithet_cityGuard],
]);
