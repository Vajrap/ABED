"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  NavigateBefore,
  NavigateNext,
  PersonAdd,
} from "@mui/icons-material";
import { useCharacterCreationLogic } from "./useCharacterCreationLogic";
import { useLocalization, L10N } from "@/localization";
import { skillsL10N } from "@/L10N/skills";
import * as skillEnums from "@/L10N/skillEnums";
import { renderText, type RenderTextOptions } from "@/utils/TextRenderer";
import { PortraitRenderer } from "@/components/Portrait/PortraitRenderer";
import { BattleSpriteRenderer } from "@/components/Battle/BattleSpriteRenderer";
import { characterService } from "@/services/characterService";

// Helper function to get skill L10N by mapping skill name + class to enum value
// This function searches across all skill enum types since skills are stored by their enum value (not class prefix)
function getSkillL10N(skillId: string, classValue: string, language: "en" | "th" = "en") {
  try {
    // Map class name to enum type for context (but we'll search all enums)
    const classEnumMap: Record<string, keyof typeof skillEnums> = {
      Cleric: "ClericSkillId",
      Seer: "SeerSkillId",
      Mage: "MageSkillId",
      Mystic: "MysticSkillId",
      Rogue: "RogueSkillId",
      Spellblade: "SpellbladeSkillId",
      Shaman: "ShamanSkillId",
      Barbarian: "BarbarianSkillId",
      Warrior: "WarriorSkillId",
      Knight: "KnightSkillId",
      Guardian: "GuardianSkillId",
      Paladin: "PaladinSkillId",
      Druid: "DruidSkillId",
      Monk: "MonkSkillId",
      Warlock: "WarlockSkillId",
      Duelist: "DuelistSkillId",
      Witch: "WitchSkillId",
      Inquisitor: "InquisitorSkillId",
      Scholar: "ScholarSkillId",
      Engineer: "EngineerSkillId",
      Nomad: "NomadSkillId",
    };

    // First, try to get the enum type for the class
    const normalizedClass = classValue.charAt(0).toUpperCase() + classValue.slice(1);
    const enumTypeName = classEnumMap[classValue] || classEnumMap[normalizedClass as keyof typeof classEnumMap];

    // Try to get the skill from the class-specific enum first
    if (enumTypeName) {
      const enumType = skillEnums[enumTypeName] as Record<string, string>;
      if (enumType) {
        const enumValue = enumType[skillId];
        if (enumValue) {
          const skillData = skillsL10N[enumValue as keyof typeof skillsL10N];
          if (skillData) {
            return {
              name: skillData.name?.[language] || skillData.name?.en || skillId,
              description: skillData.description?.[language] || skillData.description?.en || "",
              formula: skillData.formula,
            };
          }
        }
      }
    }

    // If not found in class-specific enum, search all skill enums
    // This handles cases where the skill might be in a different enum
    const allEnumNames: (keyof typeof skillEnums)[] = [
      "BasicSkillId", "MobSkillId", "ClericSkillId", "SeerSkillId", "ScholarSkillId",
      "MageSkillId", "MysticSkillId", "RogueSkillId", "SpellbladeSkillId", "ShamanSkillId",
      "BarbarianSkillId", "WarriorSkillId", "KnightSkillId", "GuardianSkillId", "PaladinSkillId",
      "DruidSkillId", "MonkSkillId", "WarlockSkillId", "DuelistSkillId", "WitchSkillId",
      "InquisitorSkillId", "EngineerSkillId", "NomadSkillId",
    ];

    for (const enumName of allEnumNames) {
      const enumType = skillEnums[enumName] as Record<string, string>;
      if (enumType) {
        const enumValue = enumType[skillId];
        if (enumValue) {
          const skillData = skillsL10N[enumValue as keyof typeof skillsL10N];
          if (skillData) {
            return {
              name: skillData.name?.[language] || skillData.name?.en || skillId,
              description: skillData.description?.[language] || skillData.description?.en || "",
              formula: skillData.formula,
            };
          }
        }
      }
    }

    // If still not found, the skill doesn't exist in L10N
    return null;
  } catch (error) {
    // L10N files not available yet or import failed
    console.warn(`Failed to get skill L10N for ${skillId} (${classValue}):`, error);
    return null;
  }
}

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

const GenderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
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

const CreateCharacterButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main, // Override any gradient
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  "&:hover:not(:disabled)": {
    background: theme.palette.primary.dark, // Override any gradient on hover
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-1px)",
    boxShadow: `0 6px 12px ${theme.palette.primary.main}40`,
  },
  "&:disabled": {
    background: theme.palette.grey[300], // Override any gradient when disabled
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.grey[600],
    opacity: 0.7,
  },
}));

// Helper function to get localized name with fallback
const getLocalizedRaceName = (t: any, raceId: string): string => {
  const raceKey = raceId.toLowerCase();
  try {
    return t(L10N.character.races[raceKey as keyof typeof L10N.character.races]?.name || { en: raceId, th: raceId });
  } catch {
    return raceId;
  }
};

const getLocalizedRaceDescription = (t: any, raceId: string): string => {
  const raceKey = raceId.toLowerCase();
  try {
    return t(L10N.character.races[raceKey as keyof typeof L10N.character.races]?.description || { en: `A ${raceId} character`, th: `ตัวละคร${raceId}` });
  } catch {
    return `A ${raceId} character`;
  }
};

const getLocalizedClassName = (t: any, classId: string): string => {
  const classKey = classId.toLowerCase();
  try {
    return t(L10N.character.classes[classKey as keyof typeof L10N.character.classes]?.name || { en: classId, th: classId });
  } catch {
    return classId;
  }
};

const getLocalizedClassDescription = (t: any, classId: string): string => {
  const classKey = classId.toLowerCase();
  try {
    return t(L10N.character.classes[classKey as keyof typeof L10N.character.classes]?.description || { en: `A ${classId} class`, th: `อาชีพ${classId}` });
  } catch {
    return `A ${classId} class`;
  }
};

const getLocalizedBackgroundName = (t: any, backgroundId: string): string => {
  // Map "retainor" to "noble" for L10N
  const backgroundKey = backgroundId === "retainor" ? "noble" : backgroundId.toLowerCase();
  try {
    return t(L10N.character.backgrounds[backgroundKey as keyof typeof L10N.character.backgrounds]?.name || { en: backgroundId, th: backgroundId });
  } catch {
    return backgroundId;
  }
};

const getLocalizedBackgroundDescription = (t: any, backgroundId: string): string => {
  const backgroundKey = backgroundId === "retainor" ? "noble" : backgroundId.toLowerCase();
  try {
    return t(L10N.character.backgrounds[backgroundKey as keyof typeof L10N.character.backgrounds]?.description || { en: `A ${backgroundId} background`, th: `ภูมิหลัง${backgroundId}` });
  } catch {
    return `A ${backgroundId} background`;
  }
};



// Color mappings
// Color mappings
const EYES_COLORS = [
  { value: 1, label: "Red" },
  { value: 2, label: "Green" },
  { value: 3, label: "Yellow" },
  { value: 4, label: "Blue" },
  { value: 5, label: "Purple" },
  { value: 6, label: "Pink" },
  { value: 7, label: "Gray" },
];

const HAIR_COLORS = [
  { value: 1, label: "Red" },
  { value: 2, label: "Green" },
  { value: 3, label: "Gold" },
  { value: 4, label: "Blue" },
  { value: 5, label: "Purple" },
  { value: 6, label: "Pink" },
  { value: 7, label: "Deep Brown" },
  { value: 8, label: "Auburn" },
  { value: 9, label: "Black" },
  { value: 10, label: "Gray" },
];

// Feature flag to enable/disable redirects (useful for debugging/fixing the page)
// const ENABLE_REDIRECTS = process.env.NEXT_PUBLIC_ENABLE_CHARACTER_CREATION_REDIRECTS !== "false";
const ENABLE_REDIRECTS = false

export default function CharacterCreationView() {
  const router = useRouter();
  const { t, currentLanguage } = useLocalization();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const {
    isLoading,
    error,
    nameCheckMessage,
    stats,
    formData,
    portraitOptions,
    assetCatalogLoaded,
    updateField,
    updatePortraitPart,
    cyclePortraitPart,
    createCharacter,
    isFormValid,
    availableRaces,
    availableClasses,
    availableBackgrounds,
  } = useCharacterCreationLogic();

  // Check authentication and character status on mount
  useEffect(() => {
    if (!ENABLE_REDIRECTS) {
      setIsCheckingAuth(false);
      return;
    }

    const checkAuthAndCharacter = async () => {
      try {
        // Check if user has a token (is logged in)
        const token = typeof window !== "undefined" ? localStorage.getItem("sessionToken") : null;

        if (!token) {
          // Not logged in - redirect to login
          console.log("CharacterCreationView: No token found, redirecting to login");
          router.push("/login");
          return;
        }

        // Check if user has a character
        const result = await characterService.checkHasCharacter();

        if (!result.success) {
          // Auth failed - redirect to login
          console.log("CharacterCreationView: Auth check failed, redirecting to login");
          router.push("/login");
          return;
        }

        if (result.hasCharacter) {
          // User already has a character - redirect to game
          console.log("CharacterCreationView: User already has character, redirecting to game");
          router.push("/game");
          return;
        }

        // User is logged in and doesn't have a character - allow access
        setIsCheckingAuth(false);
      } catch (error) {
        console.error("CharacterCreationView: Error checking auth/character:", error);
        // On error, allow access (fail open) so page can still be fixed
        setIsCheckingAuth(false);
      }
    };

    checkAuthAndCharacter();
  }, [router]);

  const handleCreateCharacter = async () => {
    const success = await createCharacter();
    if (success) {
      router.push("/game");
    }
  };

  const handleBackToTitle = () => {
    router.push("/login");
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && isFormValid() && !isLoading) {
      handleCreateCharacter();
    }
  };

  // Stats are calculated locally when race, class, or background changes

  // Show loading state while checking auth
  if (ENABLE_REDIRECTS && isCheckingAuth) {
    return (
      <CharacterCreationContainer>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      </CharacterCreationContainer>
    );
  }

  return (
    <CharacterCreationContainer>
      <Box sx={{ display: 'flex', gap: 3, width: '100%', maxWidth: '1400px' }}>
        <CharacterCreationPaper elevation={8} sx={{ flex: 1 }}>
          <TitleBox>
            <Typography variant="h3" component="h1" gutterBottom>
              {t(L10N.characterCreation.title)}
            </Typography>
          </TitleBox>

          {/* Main Content: Character Info and Portrait */}
          <FormSection>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
              {/* Character Info Section */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Name */}
                <Box>
                  <SectionTitle variant="h6">{t(L10N.characterCreation.name)}</SectionTitle>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t(L10N.characterCreation.namePlaceholder)}
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onKeyPress={handleKeyPress}
                    inputProps={{ maxLength: 20 }}
                    error={formData.name.length > 20 || (formData.name.length > 0 && formData.name.length < 3)}
                    helperText={
                      formData.name.length > 20
                        ? t(L10N.characterCreation.nameTooLong)
                        : formData.name.length > 0 && formData.name.length < 3
                          ? t(L10N.characterCreation.nameMinLength)
                          : formData.name.length > 0 && !/^[a-zA-Z\u0E00-\u0E7F\s]+$/.test(formData.name)
                            ? t(L10N.characterCreation.nameInvalidChars)
                            : formData.name.length === 0
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

                {/* Gender Selection */}
                <Box>
                  <SectionTitle variant="h6">{t(L10N.characterCreation.gender)}</SectionTitle>
                  <GenderToggleBox>
                    <GenderButton
                      active={formData.gender === "MALE"}
                      onClick={() => updateField("gender", "MALE")}
                      disabled={isLoading}
                    >
                      {t(L10N.characterCreation.male)}
                    </GenderButton>
                    <GenderButton
                      active={formData.gender === "FEMALE"}
                      onClick={() => updateField("gender", "FEMALE")}
                      disabled={isLoading}
                    >
                      {t(L10N.characterCreation.female)}
                    </GenderButton>
                  </GenderToggleBox>
                </Box>

                {/* Race Selection */}
                <Box>
                  <SectionTitle variant="h6">{t(L10N.characterCreation.race)}</SectionTitle>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {availableRaces.map((race) => (
                      <Chip
                        key={race.id}
                        label={getLocalizedRaceName(t, race.id)}
                        onClick={() => updateField("race", race.id)}
                        color={formData.race === race.id ? "primary" : "default"}
                        variant={formData.race === race.id ? "filled" : "outlined"}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Class Selection */}
                <Box>
                  <SectionTitle variant="h6">{t(L10N.characterCreation.class)}</SectionTitle>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {availableClasses.map((classItem) => (
                      <Chip
                        key={classItem.id}
                        label={getLocalizedClassName(t, classItem.id)}
                        onClick={() => updateField("class", classItem.id)}
                        color={formData.class === classItem.id ? "primary" : "default"}
                        variant={formData.class === classItem.id ? "filled" : "outlined"}
                      />
                    ))}
                  </Stack>
                </Box>

                {/* Background Selection */}
                <Box>
                  <SectionTitle variant="h6">{t(L10N.characterCreation.background)}</SectionTitle>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {availableBackgrounds.map((background) => (
                      <Chip
                        key={background.id}
                        label={getLocalizedBackgroundName(t, background.id)}
                        onClick={() => updateField("background", background.id)}
                        color={formData.background === background.id ? "primary" : "default"}
                        variant={formData.background === background.id ? "filled" : "outlined"}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>

              {/* Portrait Section */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Portrait and Battle Preview */}
                <Box sx={{ display: "flex", gap: 10, justifyContent: "left" }}>
                  <Box>
                    <PortraitRenderer
                      portrait={formData.portrait}
                      gender={formData.gender}
                      size={120}
                      alt="Character portrait preview"
                      equipment={{
                        body: stats?.startingEquipments?.find(eq => eq.slot === "body")?.item || null,
                      }}
                    />
                  </Box>
                  <Box>
                    <BattleSpriteRenderer
                      portrait={formData.portrait}
                      gender={formData.gender}
                      equipment={{
                        body: stats?.startingEquipments?.find(eq => eq.slot === "body")?.item || null,
                        weapon: stats?.startingEquipments?.find(eq => eq.slot === "rightHand")?.item || null,
                      }}
                      size={120}
                      animated={true}
                    />
                  </Box>
                </Box>

                {/* Portrait Part Selectors */}
                {assetCatalogLoaded && portraitOptions && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {/* Row 1: Base, Face */}
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      {/* Base Color */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Base Color
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("base", "prev")}
                          >
                            <NavigateBefore />
                          </IconButton>
                          <Chip
                            label={formData.portrait.base}
                            size="small"
                            sx={{
                              minWidth: 60,
                              backgroundColor: "primary.main",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("base", "next")}
                          >
                            <NavigateNext />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Face */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Face
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("face", "prev")}
                          >
                            <NavigateBefore />
                          </IconButton>
                          <Chip
                            label={formData.portrait.face}
                            size="small"
                            sx={{
                              minWidth: 60,
                              backgroundColor: "primary.main",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("face", "next")}
                          >
                            <NavigateNext />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>

                    {/* Row 2: Eyes, Eyes Color */}
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      {/* Eyes */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Eyes
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("eyes", "prev")}
                          >
                            <NavigateBefore />
                          </IconButton>
                          <Chip
                            label={formData.portrait.eyes}
                            size="small"
                            sx={{
                              minWidth: 60,
                              backgroundColor: "primary.main",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("eyes", "next")}
                          >
                            <NavigateNext />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Eyes Color */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Eyes Color
                        </Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={formData.portrait.eyes_color || 1}
                            onChange={(e) => updatePortraitPart("eyes_color", e.target.value)}
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {EYES_COLORS.map((color) => (
                              <MenuItem key={color.value} value={color.value}>
                                {color.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>



                    {/* Row 3: Hair Style */}
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      {/* Hair Style */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Hair Style
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("hair", "prev")}
                          >
                            <NavigateBefore />
                          </IconButton>
                          <Chip
                            label={formData.portrait.hair}
                            size="small"
                            sx={{
                              minWidth: 60,
                              backgroundColor: "primary.main",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("hair", "next")}
                          >
                            <NavigateNext />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Empty spacer to balance layout */}
                      <Box sx={{ flex: 1 }} />
                    </Box>

                    {/* Row 4: Hair Color + Beard Checkbox */}
                    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-end" }}>
                      {/* Hair Color */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Hair Color
                        </Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={formData.portrait.hair_color || 1}
                            onChange={(e) => updatePortraitPart("hair_color", e.target.value)}
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {HAIR_COLORS.map((color) => (
                              <MenuItem key={color.value} value={color.value}>
                                {color.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Beard Checkbox */}
                      {formData.gender === "MALE" && (
                        <Box>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.portrait.beard !== null && formData.portrait.beard !== undefined}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updatePortraitPart("beard", 1);
                                  } else {
                                    updatePortraitPart("beard", null);
                                  }
                                }}
                                size="small"
                              />
                            }
                            label="Beard"
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Row 5: Jaw + Beard (only shown when checkbox is checked) */}
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      {/* Jaw */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                          Jaw
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("jaw", "prev")}
                          >
                            <NavigateBefore />
                          </IconButton>
                          <Chip
                            label={formData.portrait.jaw}
                            size="small"
                            sx={{
                              minWidth: 60,
                              backgroundColor: "primary.main",
                              color: "white",
                              fontWeight: 500,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => cyclePortraitPart("jaw", "next")}
                          >
                            <NavigateNext />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Beard (only shown when checkbox is checked) */}
                      {formData.gender === "MALE" && formData.portrait.beard !== null && formData.portrait.beard !== undefined && (
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                            Beard
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <IconButton
                              size="small"
                              onClick={() => cyclePortraitPart("beard", "prev")}
                            >
                              <NavigateBefore />
                            </IconButton>
                            <Chip
                              label={formData.portrait.beard?.toString() || "None"}
                              size="small"
                              sx={{
                                minWidth: 60,
                                backgroundColor: "primary.main",
                                color: "white",
                                fontWeight: 500,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => cyclePortraitPart("beard", "next")}
                            >
                              <NavigateNext />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}

                {!assetCatalogLoaded && (
                  <Typography variant="caption" color="text.secondary">
                    Loading portrait options...
                  </Typography>
                )}
              </Box>
            </Box>
          </FormSection>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {typeof error === "string" ? error : t(error)}
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
            <CreateCharacterButton
              variant="contained"
              size="large"
              onClick={handleCreateCharacter}
              disabled={!isFormValid() || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
            >
              {isLoading ? t(L10N.characterCreation.creating) : t(L10N.characterCreation.createCharacter)}
            </CreateCharacterButton>
          </ActionButtons>
        </CharacterCreationPaper>

        {/* Right Panel - Character Stats */}
        <Paper elevation={8} sx={{ width: '400px', maxHeight: '95vh', overflow: 'auto' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Character Stats
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {stats && formData.race && formData.class && formData.background ? (
              <Box>
                {/* Vitals */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Vitals</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2">HP: {stats.vitals.maxHP}</Typography>
                    <Typography variant="body2">SP: {stats.vitals.maxSP}</Typography>
                    <Typography variant="body2">MP: {stats.vitals.maxMP}</Typography>
                    <Typography variant="body2">Planar Aptitude: {stats.vitals.planarAptitude}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Attributes - Show all without scrolling */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Attributes</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {Object.entries(stats.attributes).map(([key, value]) => (
                      <Typography key={key} variant="body2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value.base}
                        {value.bonus !== 0 && (
                          <span style={{ color: value.bonus > 0 ? 'green' : 'red' }}>
                            {value.bonus > 0 ? ` +${value.bonus}` : ` ${value.bonus}`}
                          </span>
                        )}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Proficiencies */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Proficiencies</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {Object.entries(stats.proficiencies)
                      .filter(([_, value]) => value.base > 8) // Only show proficiencies > 8
                      .map(([key, value]) => (
                        <Typography key={key} variant="body2">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value.base}
                        </Typography>
                      ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Artisan Skills */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Artisan Skills</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {Object.entries(stats.artisans)
                      .filter(([_, value]) => value.base > 8) // Only show artisan skills > 8
                      .map(([key, value]) => (
                        <Typography key={key} variant="body2">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value.base}
                        </Typography>
                      ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Starting Skills */}
                {stats.startingSkills.length > 0 && (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Starting Skills</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {stats.startingSkills.map((skillId) => {
                          const skillL10N = getSkillL10N(skillId, formData.class, currentLanguage || "en");
                          if (!skillL10N) {
                            return (
                              <Box key={skillId}>
                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                  {skillId}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mt: 0.5 }}>
                                  Skill description not available
                                </Typography>
                              </Box>
                            );
                          }

                          // Render description with text parser
                          // useFormulaCapsule: false means formulas render as plain text (no border/capsule)
                          const renderOptions: RenderTextOptions = {
                            skillLevel: 1, // Default to level 1 for starting skills
                            formula: skillL10N.formula || null,
                            counter: 0,
                            isSkill: true,
                            character: null, // No character stats for preview
                            l10nData: null, // No buff/debuff data for preview
                            currentLanguage: (currentLanguage || "en") as "en" | "th",
                            renderBuffDebuffTooltip: null, // No tooltips for preview
                            useFormulaCapsule: false, // Render formulas as plain text, not in a capsule
                          };

                          return (
                            <Box key={skillId}>
                              <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                                {skillL10N.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                component="div"
                                sx={{
                                  color: "text.secondary",
                                  fontStyle: 'italic',
                                  lineHeight: 1.6,
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: renderText(skillL10N.description, renderOptions),
                                }}
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </>
                )}

                {/* Starting Equipment */}
                {stats.startingEquipments.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Starting Equipment</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {stats.startingEquipments.map((equip, index) => {
                        // Format slot name for display
                        const slotName = equip.slot
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())
                          .trim();
                        return (
                          <Box key={`${equip.slot}-${index}`}>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {slotName}: {equip.item}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              {/* Equipment descriptions will be available after item L10N extraction */}
                              Equipment description not available
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Select race, class, and background to see stats preview.
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </CharacterCreationContainer>
  );
}

