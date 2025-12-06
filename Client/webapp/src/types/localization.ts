// Localization types for the ABED webapp
export type Language = "en" | "th";

export interface LocalizedText {
  en: string;
  th: string;
}

export interface ForgotPasswordModalL10N {
  title: LocalizedText;
  emailLabel: LocalizedText;
  submitButton: LocalizedText;
  cancelButton: LocalizedText;
  successMessage: LocalizedText;
  errorMessage: LocalizedText;
}

export interface LoginPageL10N {
  title: LocalizedText;
  usernameLabel: LocalizedText;
  passwordLabel: LocalizedText;
  loginButton: LocalizedText;
  registerButton: LocalizedText;
  loginError: LocalizedText;
  invalidCredentials: LocalizedText;
  userNotFound: LocalizedText;
  networkError: LocalizedText;
  requiredField: LocalizedText;
  forgotPassword: LocalizedText;
  newToRealm: LocalizedText;
  createAccount: LocalizedText;
  forgotPasswordModal: ForgotPasswordModalL10N;
}

export interface RegisterPageL10N {
  title: LocalizedText;
  eulaTitle: LocalizedText;
  eulaContent: LocalizedText;
  agreeToEula: LocalizedText;
  usernameLabel: LocalizedText;
  passwordLabel: LocalizedText;
  confirmPasswordLabel: LocalizedText;
  emailLabel: LocalizedText;
  emailOptional: LocalizedText;
  registerButton: LocalizedText;
  backToLogin: LocalizedText;

  // Validation messages
  requiredField: LocalizedText;
  passwordMismatch: LocalizedText;
  passwordRequirements: LocalizedText;
  usernameInvalid: LocalizedText;
  emailInvalid: LocalizedText;
  eulaNotAccepted: LocalizedText;

  // Server responses
  registrationSuccess: LocalizedText;
  registrationError: LocalizedText;
  usernameTaken: LocalizedText;
  characterIdTaken: LocalizedText;
  networkError: LocalizedText;
}

export interface CommonL10N {
  loading: LocalizedText;
  error: LocalizedText;
  success: LocalizedText;
  cancel: LocalizedText;
  ok: LocalizedText;
  close: LocalizedText;
  retry: LocalizedText;
}

export interface MusicPlayerL10N {
  play: LocalizedText;
  pause: LocalizedText;
  mute: LocalizedText;
  unmute: LocalizedText;
  volumeControl: LocalizedText;
  expandPlayer: LocalizedText;
  collapsePlayer: LocalizedText;
  togglePlaylist: LocalizedText;
  previousTrack: LocalizedText;
  nextTrack: LocalizedText;
  seekBack: LocalizedText;
  seekForward: LocalizedText;
  toggleShuffle: LocalizedText;
}

export interface AuthL10N {
  noToken: LocalizedText;
  invalidSession: LocalizedText;
  autoAuthFailed: LocalizedText;
  logoutFailed: LocalizedText;
}

export interface GuestL10N {
  notImplemented: LocalizedText;
}

export interface RaceL10N {
  name: LocalizedText;
  description: LocalizedText;
}

export interface ClassL10N {
  name: LocalizedText;
  description: LocalizedText;
}

export interface BackgroundL10N {
  name: LocalizedText;
  description: LocalizedText;
}

export interface CharacterCreationL10N {
  title: LocalizedText;
  subtitle: LocalizedText;
  characterStatus: LocalizedText;
  name: LocalizedText;
  namePlaceholder: LocalizedText;
  gender: LocalizedText;
  male: LocalizedText;
  female: LocalizedText;
  race: LocalizedText;
  class: LocalizedText;
  background: LocalizedText;
  portrait: LocalizedText;
  backToTitle: LocalizedText;
  createCharacter: LocalizedText;
  creating: LocalizedText;
  notSet: LocalizedText;
  // Name validation messages
  nameTooShort: LocalizedText;
  nameTooLong: LocalizedText;
  nameInvalidChars: LocalizedText;
  nameRequired: LocalizedText;
  nameMinLength: LocalizedText;
  nameMaxLength: LocalizedText;
  nameInvalidFormat: LocalizedText;
  nameTaken: LocalizedText;
  creationFailed: LocalizedText;
}

export interface CharacterL10N {
  invalidData: LocalizedText;
  attributes: LocalizedText;
  vitals: LocalizedText;
  proficiencies: LocalizedText;
  artisans: LocalizedText;
  maxHP: LocalizedText;
  maxSP: LocalizedText;
  maxMP: LocalizedText;
  planarAptitude: LocalizedText;
  attributeNames: {
    charisma: LocalizedText;
    luck: LocalizedText;
    intelligence: LocalizedText;
    leadership: LocalizedText;
    vitality: LocalizedText;
    willpower: LocalizedText;
    planar: LocalizedText;
    control: LocalizedText;
    dexterity: LocalizedText;
    agility: LocalizedText;
    strength: LocalizedText;
    endurance: LocalizedText;
  };
  proficiencyNames: {
    sword: LocalizedText;
    shield: LocalizedText;
    axe: LocalizedText;
    mace: LocalizedText;
    spear: LocalizedText;
    bareHand: LocalizedText;
    dagger: LocalizedText;
    rapier: LocalizedText;
    greatSword: LocalizedText;
    machete: LocalizedText;
    blade: LocalizedText;
    scimitar: LocalizedText;
    zanmadao: LocalizedText;
    warAxe: LocalizedText;
    halberd: LocalizedText;
    javelin: LocalizedText;
    flail: LocalizedText;
    bow: LocalizedText;
    crossbow: LocalizedText;
    throwingKnife: LocalizedText;
    staff: LocalizedText;
    wand: LocalizedText;
    orb: LocalizedText;
    tome: LocalizedText;
    warHammer: LocalizedText;
    gun: LocalizedText;
    magicWand: LocalizedText;
    relic: LocalizedText;
  };
  artisanNames: {
    performance: LocalizedText;
    jewelry: LocalizedText;
    tailoring: LocalizedText;
    blacksmithing: LocalizedText;
    carpentry: LocalizedText;
    cooking: LocalizedText;
    alchemy: LocalizedText;
    engineering: LocalizedText;
    herbalism: LocalizedText;
    leatherworking: LocalizedText;
    masonry: LocalizedText;
    mining: LocalizedText;
    agriculture: LocalizedText;
    smithing: LocalizedText;
    woodCutting: LocalizedText;
    foraging: LocalizedText;
    weaving: LocalizedText;
    skinning: LocalizedText;
    tanning: LocalizedText;
    enchanting: LocalizedText;
    fishing: LocalizedText;
    brewing: LocalizedText;
    tinkering: LocalizedText;
    electrics: LocalizedText;
  };
  nameTaken: LocalizedText;
  creationFailed: LocalizedText;
  listFailed: LocalizedText;
  notFound: LocalizedText;
  setActiveFailed: LocalizedText;
  invalidName: LocalizedText;
  nameAvailable: LocalizedText;
  nameCheckFailed: LocalizedText;
  races: {
    human: RaceL10N;
    elven: RaceL10N;
    orc: RaceL10N;
    dwarf: RaceL10N;
    halfling: RaceL10N;
    vulpine: RaceL10N;
  };
  classes: {
    barbarian: ClassL10N;
    cleric: ClassL10N;
    druid: ClassL10N;
    duelist: ClassL10N;
    guardian: ClassL10N;
    inquisitor: ClassL10N;
    knight: ClassL10N;
    mage: ClassL10N;
    monk: ClassL10N;
    mystic: ClassL10N;
    paladin: ClassL10N;
    rogue: ClassL10N;
    scholar: ClassL10N;
    shaman: ClassL10N;
    spellblade: ClassL10N;
    warrior: ClassL10N;
    warlock: ClassL10N;
    witch: ClassL10N;
    seer: ClassL10N;
    nomad: ClassL10N;
    engineer: ClassL10N;
  };
  backgrounds: {
    noble: BackgroundL10N;
    peasant: BackgroundL10N;
    merchant: BackgroundL10N;
    scholar: BackgroundL10N;
    artisan: BackgroundL10N;
    soldier: BackgroundL10N;
  };
}

export interface L10NType {
  loginPage: LoginPageL10N;
  registerPage: RegisterPageL10N;
  common: CommonL10N;
  musicPlayer: MusicPlayerL10N;
  auth: AuthL10N;
  guest: GuestL10N;
  characterCreation: CharacterCreationL10N;
  character: CharacterL10N;
}

// Keep the old interface name for backward compatibility
export type L10N = L10NType;

// Utility type for getting text in current language
export type GetLocalizedText = (
  text: LocalizedText,
  language: Language,
) => string;
