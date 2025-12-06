// LanguageSwitcher.tsx - Floating language toggle component
import React, { useState, useEffect } from "react";
import {
  Paper,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Fade,
  Switch,
} from "@mui/material";
import { Language, Translate } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {
  getCurrentLanguage,
  setCurrentLanguage,
  Language as LanguageType,
} from "@/localization";

const FloatingLanguageSwitcher = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  zIndex: 9998,
  padding: theme.spacing(1),
  minWidth: 60,
  maxWidth: 200,
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}20)`,
  backdropFilter: "blur(12px)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  },
}));

const CompactView = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 40,
}));

const ExpandedView = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  minWidth: 160,
}));

const LanguageToggle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.background.paper}90, ${theme.palette.background.paper}70)`,
  border: `1px solid ${theme.palette.divider}`,
}));

const LanguageLabel = styled(Typography)(() => ({
  fontFamily: "Cinzel, serif",
  fontWeight: 600,
  fontSize: "0.85rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  transition: "all 0.2s ease",
}));

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 30,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    margin: 2,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(26px)",
      "& .MuiSwitch-thumb:before": {
        content: "'TH'",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        fontWeight: "bold",
        color: theme.palette.secondary.main,
        fontFamily: "Cinzel, serif",
      },
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        border: 0,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.palette.secondary.main,
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 26,
    height: 26,
    "&:before": {
      content: "'EN'",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "9px",
      fontWeight: "bold",
      color: theme.palette.primary.main,
      fontFamily: "Cinzel, serif",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const LanguageSwitcher: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentLang, setCurrentLang] = useState<LanguageType>("en"); // Default to "en" for SSR hydration
  const [isMounted, setIsMounted] = useState(false);
  const [, setForceUpdate] = useState(0);

  // Force re-render when language changes to update all components
  const handleLanguageChange = (newLanguage: LanguageType) => {
    setCurrentLanguage(newLanguage);
    setCurrentLang(newLanguage);
    setForceUpdate((prev) => prev + 1);

    // Trigger a custom event that other components can listen to
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: newLanguage }),
      );

      // Store preference in localStorage
      localStorage.setItem("preferred-language", newLanguage);
    }
  };

  // Load saved language preference on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = localStorage.getItem(
      "preferred-language",
    ) as LanguageType;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "th")) {
      handleLanguageChange(savedLanguage);
    } else {
      // Initialize with default if no saved preference
      setCurrentLang(getCurrentLanguage());
    }
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage: LanguageType = event.target.checked ? "th" : "en";
    handleLanguageChange(newLanguage);
  };

  const getLanguageDisplayName = (lang: LanguageType) => {
    return lang === "en" ? "English" : "ไทย";
  };

  const getLanguageFlag = (lang: LanguageType) => {
    return lang === "en" ? "🇺🇸" : "🇹🇭";
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <FloatingLanguageSwitcher elevation={8}>
      {!isExpanded ? (
        // Compact view
        <CompactView>
          <Tooltip
            title={`Switch to ${currentLang === "en" ? "Thai" : "English"}`}
            placement="left"
          >
            <IconButton
              onClick={toggleExpanded}
              size="small"
              sx={{
                color: "secondary.main",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                },
              }}
            >
              <Language />
            </IconButton>
          </Tooltip>
        </CompactView>
      ) : (
        // Expanded view
        <Fade in={isExpanded} timeout={300}>
          <ExpandedView>
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Translate color="secondary" fontSize="small" />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Language
                </Typography>
              </Box>
              <IconButton
                onClick={toggleExpanded}
                size="small"
                sx={{ color: "text.secondary" }}
              >
                <Language />
              </IconButton>
            </Box>

            {/* Language Toggle */}
            <LanguageToggle>
              <Box display="flex" alignItems="center" gap={1}>
                <Box textAlign="center">
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ fontSize: "10px" }}
                  >
                    {getLanguageFlag("en")}
                  </Typography>
                  <LanguageLabel
                    color={
                      currentLang === "en" ? "primary.main" : "text.secondary"
                    }
                    sx={{
                      opacity: currentLang === "en" ? 1 : 0.6,
                      transform:
                        currentLang === "en" ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    EN
                  </LanguageLabel>
                </Box>

                <CustomSwitch
                  checked={currentLang === "th"}
                  onChange={handleSwitchChange}
                  size="small"
                />

                <Box textAlign="center">
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ fontSize: "10px" }}
                  >
                    {getLanguageFlag("th")}
                  </Typography>
                  <LanguageLabel
                    color={
                      currentLang === "th" ? "secondary.main" : "text.secondary"
                    }
                    sx={{
                      opacity: currentLang === "th" ? 1 : 0.6,
                      transform:
                        currentLang === "th" ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    TH
                  </LanguageLabel>
                </Box>
              </Box>
            </LanguageToggle>

            {/* Current Language Display */}
            <Box mt={2} textAlign="center">
              <Typography variant="caption" color="text.secondary">
                {getLanguageDisplayName(currentLang)}
              </Typography>
            </Box>
          </ExpandedView>
        </Fade>
      )}
    </FloatingLanguageSwitcher>
  );
};

export default LanguageSwitcher;
