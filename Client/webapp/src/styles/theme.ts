import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// Medieval/Steampunk/Arcane color palette
const colors = {
  // Primary: Soft Brown (leather, wood, earth)
  softBrown: {
    50: "#faf8f5",
    100: "#f0ebe1",
    200: "#e6d7c3",
    300: "#d4bc94",
    400: "#c19d65",
    500: "#a67c52", // Main soft brown
    600: "#8b6644",
    700: "#715238",
    800: "#5a422d",
    900: "#483525",
  },

  // Secondary: Violet (magic, arcane, mystical)
  mysticalViolet: {
    50: "#f8f6fc",
    100: "#ede8f7",
    200: "#ddd5f0",
    300: "#c4b5e4",
    400: "#a68dd5",
    500: "#8b64c7", // Main violet
    600: "#7551b5",
    700: "#624396",
    800: "#513a7a",
    900: "#433264",
  },

  // Accent: Spark Blue (electricity, steam, energy)
  sparkBlue: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Main spark blue
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // Supporting colors
  parchment: "#f5f2e8", // Background, paper-like
  darkStone: "#2d2a26", // Text, stone-like
  copper: "#b87333", // Accents, metallic
  steel: "#71797E", // Borders, metallic
  ember: "#ff6b35", // Warnings, fire-like
  forestGreen: "#4a5d23", // Success, nature
};

// Create the custom theme
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: colors.softBrown[300],
      main: colors.softBrown[500],
      dark: colors.softBrown[700],
      contrastText: "#ffffff",
    },
    secondary: {
      light: colors.mysticalViolet[300],
      main: colors.mysticalViolet[500],
      dark: colors.mysticalViolet[700],
      contrastText: "#ffffff",
    },
    error: {
      light: alpha(colors.ember, 0.7),
      main: colors.ember,
      dark: "#d55200",
      contrastText: "#ffffff",
    },
    warning: {
      light: alpha(colors.copper, 0.7),
      main: colors.copper,
      dark: "#9a5f2a",
      contrastText: "#ffffff",
    },
    info: {
      light: colors.sparkBlue[300],
      main: colors.sparkBlue[500],
      dark: colors.sparkBlue[700],
      contrastText: "#ffffff",
    },
    success: {
      light: alpha(colors.forestGreen, 0.7),
      main: colors.forestGreen,
      dark: "#3a4a1c",
      contrastText: "#ffffff",
    },
    background: {
      default: colors.parchment,
      paper: "#ffffff",
    },
    text: {
      primary: colors.darkStone,
      secondary: colors.steel,
    },
    divider: alpha(colors.steel, 0.2),
  },

  typography: {
    fontFamily: [
      "Cinzel", // Medieval serif for headings
      "Crimson Text", // Readable serif for body
      "Georgia",
      "serif",
    ].join(","),
    h1: {
      fontFamily: "Cinzel, serif",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h2: {
      fontFamily: "Cinzel, serif",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    h3: {
      fontFamily: "Cinzel, serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Cinzel, serif",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "Cinzel, serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Cinzel, serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Crimson Text, serif",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "Crimson Text, serif",
      lineHeight: 1.5,
    },
    button: {
      fontFamily: "Cinzel, serif",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },

  shape: {
    borderRadius: 8, // Slightly rounded for medieval feel
  },

  components: {
    // Custom button styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "10px 24px",
          boxShadow: `0 2px 4px ${alpha(colors.darkStone, 0.2)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: `0 4px 8px ${alpha(colors.darkStone, 0.3)}`,
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${colors.softBrown[500]}, ${colors.softBrown[600]})`,
          "&:hover": {
            background: `linear-gradient(135deg, ${colors.softBrown[600]}, ${colors.softBrown[700]})`,
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: colors.softBrown[500],
          color: colors.softBrown[600],
          "&:hover": {
            borderWidth: 2,
            backgroundColor: alpha(colors.softBrown[500], 0.1),
          },
        },
      },
    },

    // Custom text field styling
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: alpha("#ffffff", 0.8),
            "& fieldset": {
              borderColor: colors.steel,
              borderWidth: 1.5,
            },
            "&:hover fieldset": {
              borderColor: colors.softBrown[500],
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.mysticalViolet[500],
              borderWidth: 2,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.darkStone,
            fontFamily: "Crimson Text, serif",
            "&.Mui-focused": {
              color: colors.mysticalViolet[600],
            },
          },
        },
      },
    },

    // Custom paper/card styling
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(135deg, ${alpha("#ffffff", 0.9)}, ${alpha(colors.parchment, 0.7)})`,
          backdropFilter: "blur(8px)",
          border: `1px solid ${alpha(colors.steel, 0.2)}`,
          boxShadow: `0 8px 32px ${alpha(colors.darkStone, 0.12)}`,
        },
        elevation1: {
          boxShadow: `0 2
px 8px ${alpha(colors.darkStone, 0.1)}`,
        },
        elevation4: {
          boxShadow: `0 8px 24px ${alpha(colors.darkStone, 0.15)}`,
        },
      },
    },

    // Custom checkbox styling
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.steel,
          "&.Mui-checked": {
            color: colors.mysticalViolet[500],
          },
          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        },
      },
    },

    // Custom alert styling
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: "Crimson Text, serif",
        },
        standardError: {
          backgroundColor: alpha(colors.ember, 0.1),
          color: colors.ember,
          border: `1px solid ${alpha(colors.ember, 0.3)}`,
        },
        standardWarning: {
          backgroundColor: alpha(colors.copper, 0.1),
          color: colors.copper,
          border: `1px solid ${alpha(colors.copper, 0.3)}`,
        },
        standardInfo: {
          backgroundColor: alpha(colors.sparkBlue[500], 0.1),
          color: colors.sparkBlue[700],
          border: `1px solid ${alpha(colors.sparkBlue[500], 0.3)}`,
        },
        standardSuccess: {
          backgroundColor: alpha(colors.forestGreen, 0.1),
          color: colors.forestGreen,
          border: `1px solid ${alpha(colors.forestGreen, 0.3)}`,
        },
      },
    },

    // Custom dialog styling
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          border: `2px solid ${colors.softBrown[300]}`,
          backgroundImage: `linear-gradient(135deg, ${colors.parchment}, ${alpha("#ffffff", 0.95)})`,
        },
      },
    },

    // Custom app bar styling (for potential future use)
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${colors.darkStone}, ${colors.steel})`,
          boxShadow: `0 2px 12px ${alpha(colors.darkStone, 0.3)}`,
        },
      },
    },
  },
});

// Custom CSS variables for additional theming
export const cssVariables = {
  "--color-soft-brown": colors.softBrown[500],
  "--color-mystical-violet": colors.mysticalViolet[500],
  "--color-spark-blue": colors.sparkBlue[500],
  "--color-parchment": colors.parchment,
  "--color-dark-stone": colors.darkStone,
  "--color-copper": colors.copper,
  "--color-steel": colors.steel,
  "--font-heading": "Cinzel, serif",
  "--font-body": "Crimson Text, serif",
  "--shadow-soft": `0 4px 16px ${alpha(colors.darkStone, 0.1)}`,
  "--shadow-medium": `0 8px 24px ${alpha(colors.darkStone, 0.15)}`,
  "--shadow-strong": `0 12px 40px ${alpha(colors.darkStone, 0.2)}`,
  "--gradient-primary": `linear-gradient(135deg, ${colors.softBrown[400]}, ${colors.softBrown[600]})`,
  "--gradient-secondary": `linear-gradient(135deg, ${colors.mysticalViolet[400]}, ${colors.mysticalViolet[600]})`,
  "--gradient-background": `linear-gradient(135deg, ${colors.parchment}, ${alpha("#ffffff", 0.9)})`,
};

export default theme;
