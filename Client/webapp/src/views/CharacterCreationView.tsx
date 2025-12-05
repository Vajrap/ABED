import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  NavigateBefore,
  NavigateNext,
  PersonAdd,
} from "@mui/icons-material";
import { characterService } from "@/services/characterService";
import { useLocalization, L10N } from "@/localization";
import { CharacterCreationRequest } from "@/types/character";

const CharacterCreationContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `var(--gradient-mystical)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const CharacterCreationPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "800px",
  width: "90vw",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: `var(--shadow-mystical)`,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
}));

const TitleBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const GenderToggleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const GenderButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  flex: 1,
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: 600,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
  color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[200],
  },
}));


const PortraitBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const PortraitPlaceholder = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `2px solid ${theme.palette.grey[300]}`,
  fontSize: "0.875rem",
  color: theme.palette.grey[600],
}));

const DescriptionBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(1),
  minHeight: 60,
  display: "flex",
  alignItems: "center",
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  justifyContent: "space-between",
}));

const races = ["human", "elven", "orc", "dwarf", "halfling"];
const classes = ["fighter", "cleric", "rogue", "mage"];
const backgrounds = ["noble", "peasant", "merchant", "scholar", "artisan", "soldier"];

const portraits = [
  "m_human01", "f_human01", "m_elven01", "f_elven01", 
  "m_orc01", "f_orc01", "m_dwarf01", "f_dwarf01", 
  "m_halfling01", "f_halfling01"
];

export const CharacterCreationView: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [characterData, setCharacterData] = useState({
    name: "",
    gender: "MALE" as "MALE" | "FEMALE",
    race: "human",
    portrait: "m_human01",
    class: "fighter",
    background: "noble",
  });

  const [portraitIndex, setPortraitIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameCheckMessage, setNameCheckMessage] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setCharacterData(prev => ({ ...prev, name }));
    
    // Clear any previous name check messages during typing
    setNameCheckMessage(null);
  };


  const handleGenderChange = (gender: "MALE" | "FEMALE") => {
    setCharacterData(prev => ({ ...prev, gender }));
  };

  const handleRaceChange = (race: string) => {
    setCharacterData(prev => ({ ...prev, race }));
  };

  const handleClassChange = (classKey: string) => {
    setCharacterData(prev => ({ ...prev, class: classKey }));
  };

  const handleBackgroundChange = (background: string) => {
    setCharacterData(prev => ({ ...prev, background }));
  };

  const handlePortraitChange = (direction: "prev" | "next") => {
    let newIndex;
    if (direction === "prev") {
      newIndex = portraitIndex > 0 ? portraitIndex - 1 : portraits.length - 1;
    } else {
      newIndex = portraitIndex < portraits.length - 1 ? portraitIndex + 1 : 0;
    }
    setPortraitIndex(newIndex);
    setCharacterData(prev => ({ ...prev, portrait: portraits[newIndex] }));
  };

  const getSelectedRace = () => characterData.race;
  const getSelectedClass = () => characterData.class;
  const getSelectedBackground = () => characterData.background;

  const handleCreateCharacter = async () => {
    if (!characterData.name.trim()) {
      setError(t(L10N.characterCreation.nameRequired));
      return;
    }

    // Validate name format
    if (!/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(characterData.name)) {
      setError(t(L10N.characterCreation.nameInvalidFormat));
      return;
    }

    if (characterData.name.length > 20) {
      setError(t(L10N.characterCreation.nameMaxLength));
      return;
    }

    if (characterData.name.trim().length < 3) {
      setError(t(L10N.characterCreation.nameMinLength));
      return;
    }

    setIsLoading(true);
    setError(null);
    setNameCheckMessage(null);

    try {
      const requestData: CharacterCreationRequest = {
        name: characterData.name.trim(),
        gender: characterData.gender,
        race: characterData.race,
        portrait: characterData.portrait,
        background: characterData.background,
        startingClass: characterData.class,
      };

      const response = await characterService.createCharacter(requestData);

      if (response.success) {
        console.log("Character created successfully!");
        // Navigate to game page
        navigate("/game");
      } else {
        // Check if it's a name-related error
        if (response.messageKey === "character.nameTaken" || 
            response.message?.toLowerCase().includes("name") ||
            response.message?.toLowerCase().includes("taken")) {
          setNameCheckMessage(t(L10N.characterCreation.nameTaken));
        } else {
          setError(response.message || "Failed to create character");
        }
      }
    } catch (error) {
      console.error("Character creation error:", error);
      setError(t(L10N.characterCreation.creationFailed));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToTitle = () => {
    navigate("/login");
  };

  // Calculate character stats for the right panel
  const calculateCharacterStats = () => {
    const selectedRace = characterData.race;
    const selectedClass = characterData.class;
    const selectedBackground = characterData.background;
    
    // If these data won't change, we can leave it here in the front end
    const raceAttributes = {
      human: { charisma: 10, luck: 9, intelligence: 8, leadership: 10, vitality: 8, willpower: 8, planar: 8, control: 9, dexterity: 8, agility: 8, strength: 8, endurance: 8 },
      elven: { charisma: 9, luck: 8, intelligence: 10, leadership: 8, vitality: 8, willpower: 9, planar: 10, control: 9, dexterity: 9, agility: 8, strength: 8, endurance: 8 },
      orc: { charisma: 8, luck: 8, intelligence: 8, leadership: 9, vitality: 10, willpower: 9, planar: 8, control: 8, dexterity: 9, agility: 8, strength: 11, endurance: 10 },
      dwarf: { charisma: 8, luck: 8, intelligence: 8, leadership: 9, vitality: 9, willpower: 10, planar: 8, control: 8, dexterity: 8, agility: 8, strength: 10, endurance: 11 },
      halfling: { charisma: 9, luck: 11, intelligence: 8, leadership: 8, vitality: 8, willpower: 8, planar: 8, control: 9, dexterity: 9, agility: 9, strength: 8, endurance: 8 },
    };

    const classProficiencies = {
      fighter: { 
        bareHand: 8, dagger: 8, sword: 11, rapier: 8, greatSword: 10, machete: 8, blade: 8, scimitar: 8, zanmadao: 8,
        axe: 10, warAxe: 8, halberd: 8, spear: 10, javelin: 8, mace: 10, flail: 8, warHammer: 8,
        throwingKnife: 8, crossbow: 9, bow: 9, gun: 8, magicWand: 8, staff: 8, tome: 8, orb: 8, relic: 8, shield: 11
      },
      cleric: { 
        bareHand: 8, dagger: 8, sword: 8, rapier: 8, greatSword: 8, machete: 8, blade: 8, scimitar: 8, zanmadao: 8,
        axe: 8, warAxe: 8, halberd: 8, spear: 8, javelin: 8, mace: 10, flail: 8, warHammer: 8,
        throwingKnife: 8, crossbow: 8, bow: 8, gun: 8, magicWand: 8, staff: 9, tome: 10, orb: 9, relic: 10, shield: 10
      },
      rogue: { 
        bareHand: 9, dagger: 11, sword: 10, rapier: 10, greatSword: 8, machete: 8, blade: 8, scimitar: 8, zanmadao: 8,
        axe: 8, warAxe: 8, halberd: 8, spear: 8, javelin: 8, mace: 8, flail: 8, warHammer: 8,
        throwingKnife: 11, crossbow: 10, bow: 10, gun: 8, magicWand: 8, staff: 8, tome: 8, orb: 8, relic: 8, shield: 8
      },
      mage: { 
        bareHand: 8, dagger: 9, sword: 8, rapier: 8, greatSword: 8, machete: 8, blade: 8, scimitar: 8, zanmadao: 8,
        axe: 8, warAxe: 8, halberd: 8, spear: 8, javelin: 8, mace: 8, flail: 8, warHammer: 8,
        throwingKnife: 8, crossbow: 8, bow: 8, gun: 8, magicWand: 11, staff: 8, tome: 11, orb: 10, relic: 8, shield: 8
      },
    };

    const backgroundArtisans = {
      noble: { 
        agriculture: 8, mining: 8, smithing: 8, woodCutting: 8, carpentry: 8, foraging: 8, weaving: 8, skinning: 8, tanning: 8, 
        jewelry: 10, cooking: 8, alchemy: 8, enchanting: 8, fishing: 8, masonry: 8, tailoring: 10, brewing: 8, performance: 11, tinkering: 8, electrics: 8 
      },
      peasant: { 
        agriculture: 11, mining: 8, smithing: 8, woodCutting: 10, carpentry: 8, foraging: 10, weaving: 8, skinning: 8, tanning: 8, 
        jewelry: 8, cooking: 10, alchemy: 8, enchanting: 8, fishing: 10, masonry: 8, tailoring: 8, brewing: 8, performance: 8, tinkering: 8, electrics: 8 
      },
      merchant: { 
        agriculture: 8, mining: 8, smithing: 8, woodCutting: 8, carpentry: 8, foraging: 8, weaving: 10, skinning: 8, tanning: 8, 
        jewelry: 10, cooking: 10, alchemy: 8, enchanting: 8, fishing: 8, masonry: 8, tailoring: 10, brewing: 10, performance: 8, tinkering: 8, electrics: 8 
      },
      scholar: { 
        agriculture: 8, mining: 8, smithing: 8, woodCutting: 8, carpentry: 8, foraging: 8, weaving: 8, skinning: 8, tanning: 8, 
        jewelry: 8, cooking: 8, alchemy: 10, enchanting: 11, fishing: 8, masonry: 8, tailoring: 8, brewing: 8, performance: 8, tinkering: 8, electrics: 8 
      },
      artisan: { 
        agriculture: 8, mining: 8, smithing: 11, woodCutting: 8, carpentry: 10, foraging: 8, weaving: 10, skinning: 8, tanning: 8, 
        jewelry: 8, cooking: 8, alchemy: 8, enchanting: 8, fishing: 8, masonry: 10, tailoring: 10, brewing: 8, performance: 8, tinkering: 8, electrics: 8 
      },
      soldier: { 
        agriculture: 8, mining: 8, smithing: 10, woodCutting: 8, carpentry: 8, foraging: 8, weaving: 8, skinning: 8, tanning: 8, 
        jewelry: 8, cooking: 10, alchemy: 8, enchanting: 8, fishing: 8, masonry: 8, tailoring: 8, brewing: 8, performance: 8, tinkering: 11, electrics: 10 
      },
    };
    
    const attributes = raceAttributes[selectedRace as keyof typeof raceAttributes];
    const proficiencies = classProficiencies[selectedClass as keyof typeof classProficiencies];
    const artisans = backgroundArtisans[selectedBackground as keyof typeof backgroundArtisans];
    
    // Calculate vitals
    const vitalityMod = Math.floor((attributes.vitality - 10) / 2);
    const enduranceMod = Math.floor((attributes.endurance - 10) / 2);
    const intelligenceMod = Math.floor((attributes.intelligence - 10) / 2);
    
    const raceVitals = {
      human: { baseHP: 15, baseSP: 15, baseMP: 15, planarAptitude: 50 },
      elven: { baseHP: 15, baseSP: 10, baseMP: 20, planarAptitude: 70 },
      orc: { baseHP: 20, baseSP: 20, baseMP: 5, planarAptitude: 35 },
      dwarf: { baseHP: 15, baseSP: 20, baseMP: 10, planarAptitude: 35 },
      halfling: { baseHP: 15, baseSP: 15, baseMP: 15, planarAptitude: 50 },
    };
    
    const vitals = raceVitals[selectedRace as keyof typeof raceVitals];
    const maxHP = vitals.baseHP + vitalityMod;
    const maxSP = vitals.baseSP + enduranceMod;
    const maxMP = vitals.baseMP + intelligenceMod;
    
    return { attributes, proficiencies, artisans, vitals: { maxHP, maxSP, maxMP, planarAptitude: vitals.planarAptitude } };
  };

  return (
    <CharacterCreationContainer>
      <Box sx={{ display: 'flex', gap: 3, width: '100%', maxWidth: '1400px' }}>
        <CharacterCreationPaper elevation={8} sx={{ flex: 1 }}>
        <TitleBox>
          <Typography variant="h3" component="h1" gutterBottom>
            {t(L10N.characterCreation.title)}
          </Typography>
        </TitleBox>

{/* Character Name and Portrait */}
    <FormSection>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
            {/* Name Input */}
            <Box sx={{ flex: 1 }}>
              <SectionTitle variant="h6">{t(L10N.characterCreation.name)}</SectionTitle>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t(L10N.characterCreation.namePlaceholder)}
                value={characterData.name}
                onChange={handleNameChange}
                inputProps={{ maxLength: 20 }}
                error={characterData.name.length > 20 || (characterData.name.length > 0 && characterData.name.length < 3)}
                helperText={
                  characterData.name.length > 20 
                    ? t(L10N.characterCreation.nameTooLong)
                    : characterData.name.length > 0 && characterData.name.length < 3
                    ? t(L10N.characterCreation.nameMinLength)
                    : characterData.name.length > 0 && !/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(characterData.name)
                    ? t(L10N.characterCreation.nameInvalidChars)
                    : characterData.name.length === 0
                    ? t(L10N.characterCreation.nameTooShort)
                    : ""
                }
              />
              {nameCheckMessage && (
                <Typography 
                  variant="caption" 
                  color={nameCheckMessage.includes("available") ? "success.main" : "error.main"}
                  sx={{ mt: 1, display: "block" }}
                >
                  {nameCheckMessage}
                </Typography>
              )}
            </Box>

            {/* Portrait Selector */}
            <Box sx={{ flex: 1 }}>
              <SectionTitle variant="h6">{t(L10N.characterCreation.portrait)}</SectionTitle>
              <PortraitBox>
                <IconButton onClick={() => handlePortraitChange("prev")}>
                  <NavigateBefore />
                </IconButton>
                <PortraitPlaceholder>
                  {portraits[portraitIndex]}
                </PortraitPlaceholder>
                <IconButton onClick={() => handlePortraitChange("next")}>
                  <NavigateNext />
                </IconButton>
              </PortraitBox>
            </Box>
          </Box>
        </FormSection>

        {/* Gender Selection */}
        <FormSection>
          <SectionTitle variant="h6">{t(L10N.characterCreation.gender)}</SectionTitle>
          <GenderToggleBox>
            <GenderButton
              active={characterData.gender === "MALE"}
              onClick={() => handleGenderChange("MALE")}
            >
              {t(L10N.characterCreation.male)}
            </GenderButton>
            <GenderButton
              active={characterData.gender === "FEMALE"}
              onClick={() => handleGenderChange("FEMALE")}
            >
              {t(L10N.characterCreation.female)}
            </GenderButton>
          </GenderToggleBox>
        </FormSection>

        {/* Race Selection */}
        <FormSection>
          <SectionTitle variant="h6">{t(L10N.characterCreation.race)}</SectionTitle>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {races.map((race) => (
              <Chip
                key={race}
                label={t(L10N.character.races[race as keyof typeof L10N.character.races].name)}
                onClick={() => handleRaceChange(race)}
                color={characterData.race === race ? "primary" : "default"}
                variant={characterData.race === race ? "filled" : "outlined"}
                sx={{ marginBottom: 1 }}
              />
            ))}
          </Stack>
          <DescriptionBox>
            <Typography variant="body2" color="text.secondary">
              {t(L10N.character.races[getSelectedRace() as keyof typeof L10N.character.races].description)}
            </Typography>
          </DescriptionBox>
        </FormSection>

        {/* Class Selection */}
        <FormSection>
          <SectionTitle variant="h6">{t(L10N.characterCreation.class)}</SectionTitle>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {classes.map((classItem) => (
              <Chip
                key={classItem}
                label={t(L10N.character.classes[classItem as keyof typeof L10N.character.classes].name)}
                onClick={() => handleClassChange(classItem)}
                color={characterData.class === classItem ? "primary" : "default"}
                variant={characterData.class === classItem ? "filled" : "outlined"}
                sx={{ marginBottom: 1 }}
              />
            ))}
          </Stack>
          <DescriptionBox>
            <Typography variant="body2" color="text.secondary">
              {t(L10N.character.classes[getSelectedClass() as keyof typeof L10N.character.classes].description)}
            </Typography>
          </DescriptionBox>
        </FormSection>

        {/* Background Selection */}
        <FormSection>
          <SectionTitle variant="h6">{t(L10N.characterCreation.background)}</SectionTitle>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {backgrounds.map((background) => (
              <Chip
                key={background}
                label={t(L10N.character.backgrounds[background as keyof typeof L10N.character.backgrounds].name)}
                onClick={() => handleBackgroundChange(background)}
                color={characterData.background === background ? "primary" : "default"}
                variant={characterData.background === background ? "filled" : "outlined"}
                sx={{ marginBottom: 1 }}
              />
            ))}
          </Stack>
          <DescriptionBox>
            <Typography variant="body2" color="text.secondary">
              {t(L10N.character.backgrounds[getSelectedBackground() as keyof typeof L10N.character.backgrounds].description)}
            </Typography>
          </DescriptionBox>
        </FormSection>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Action Buttons */}
        <ActionButtons>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBackToTitle}
            disabled={isLoading}
          >
            {t(L10N.characterCreation.backToTitle)}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleCreateCharacter}
            disabled={!characterData.name.trim() || isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
          >
            {isLoading ? t(L10N.characterCreation.creating) : t(L10N.characterCreation.createCharacter)}
          </Button>
        </ActionButtons>
        </CharacterCreationPaper>

        {/* Right Panel - Character Stats */}
        <Paper elevation={8} sx={{ width: '400px', maxHeight: '95vh', overflow: 'auto' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Character Stats
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Attributes */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t(L10N.character.attributes)}
              </Typography>
              <Stack spacing={0.5}>
                {(() => {
                  const stats = calculateCharacterStats();
                  return Object.entries(stats.attributes).map(([key, value]) => (
                    <Typography key={key} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t(L10N.character.attributeNames[key as keyof typeof L10N.character.attributeNames])}:</span>
                      <span style={{ fontWeight: 'bold' }}>{value}</span>
                    </Typography>
                  ));
                })()}
              </Stack>
            </Box>

            {/* Vitals */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t(L10N.character.vitals)}
              </Typography>
              <Stack spacing={0.5}>
                {(() => {
                  const stats = calculateCharacterStats();
                  return (
                    <>
                      <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t(L10N.character.maxHP)}:</span>
                        <span style={{ fontWeight: 'bold', color: 'red' }}>{stats.vitals.maxHP}</span>
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t(L10N.character.maxSP)}:</span>
                        <span style={{ fontWeight: 'bold', color: 'blue' }}>{stats.vitals.maxSP}</span>
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t(L10N.character.maxMP)}:</span>
                        <span style={{ fontWeight: 'bold', color: 'purple' }}>{stats.vitals.maxMP}</span>
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t(L10N.character.planarAptitude)}:</span>
                        <span style={{ fontWeight: 'bold', color: '#8B5CF6' }}>{stats.vitals.planarAptitude}%</span>
                      </Typography>
                    </>
                  );
                })()}
              </Stack>
            </Box>

            {/* Proficiencies */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t(L10N.character.proficiencies)}
              </Typography>
              <Stack spacing={0.5}>
                {(() => {
                  const stats = calculateCharacterStats();
                  const topProficiencies = Object.entries(stats.proficiencies)
                    .filter(([_, value]) => value > 8)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6);
                  
                  return topProficiencies.map(([key, value]) => (
                    <Typography key={key} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t(L10N.character.proficiencyNames[key as keyof typeof L10N.character.proficiencyNames])}:</span>
                      <span style={{ fontWeight: 'bold', color: value > 10 ? 'green' : 'orange' }}>{value}</span>
                    </Typography>
                  ));
                })()}
              </Stack>
            </Box>

            {/* Artisan Skills */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t(L10N.character.artisans)}
              </Typography>
              <Stack spacing={0.5}>
                {(() => {
                  const stats = calculateCharacterStats();
                  const topArtisans = Object.entries(stats.artisans)
                    .filter(([_, value]) => value > 8)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6);
                  
                  return topArtisans.map(([key, value]) => (
                    <Typography key={key} variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{t(L10N.character.artisanNames[key as keyof typeof L10N.character.artisanNames])}:</span>
                      <span style={{ fontWeight: 'bold', color: value > 10 ? 'green' : 'orange' }}>{value}</span>
                    </Typography>
                  ));
                })()}
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Box>
    </CharacterCreationContainer>
  );
};
