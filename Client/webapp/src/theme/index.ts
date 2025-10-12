import { createTheme } from '@mui/material/styles';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *                    ARCANE BEAM ELECTRIC DREAM - THEME GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * THEME PHILOSOPHY
 * ────────────────
 * Our theme blends medieval fantasy with early electric-age aesthetics, creating
 * a unique "arcane steampunk" atmosphere. Think ancient scrolls meeting Victorian
 * engineering, magical runes illuminated by electric light.
 * 
 * VISUAL IDENTITY
 * ───────────────
 * - Era: Medieval fantasy meets early 20th century electric age
 * - Materials: Aged parchment, brass mechanisms, crystal elements, copper wiring
 * - Lighting: Warm candlelight mixed with cool electric glow
 * - Typography: Elegant serifs (Cinzel, Crimson Text) for medieval feel
 * - Ornamentation: Subtle borders, soft shadows, gentle gradients
 * 
 * COLOR PALETTE
 * ─────────────
 * PRIMARY (Deep Arcane Blue) - #2C3E8C
 *   - Main UI elements, primary actions, trust and stability
 *   - Think: Night sky, deep magic, ancient tomes
 * 
 * SECONDARY (Electric Purple) - #8B5CF6
 *   - Magical elements, secondary actions, mystical energy
 *   - Think: Lightning, magical auras, enchantments
 * 
 * TERTIARY (Brass/Bronze) - #D97706
 *   - Mechanical elements, borders, highlights
 *   - Think: Clockwork, brass fittings, warm metal
 * 
 * ACCENT (Mystical Green) - #10B981
 *   - Success states, positive feedback, growth
 *   - Think: Healing magic, nature, life energy
 * 
 * COPPER (Error Red) - #DC2626
 *   - Error states, warnings, danger
 *   - Think: Warning lights, hot metal, alarms
 * 
 * BACKGROUND (Parchment/Stone)
 *   - Warm off-whites, aged paper tones
 *   - Think: Old scrolls, weathered stone, candlelit rooms
 * 
 * DESIGN PRINCIPLES
 * ─────────────────
 * 1. TEXTURE > FLAT
 *    - Use subtle gradients, shadows, and borders
 *    - Avoid pure flat colors - add depth and age
 *    - Paper/cards should feel like physical objects
 * 
 * 2. WARMTH > COLDNESS
 *    - Prefer warm tones over cool clinical whites
 *    - Use amber/brass tints in neutrals
 *    - Soft, inviting color temperatures
 * 
 * 3. ORNAMENTAL > MINIMALIST
 *    - Add tasteful borders, corner decorations
 *    - Use distinctive fonts (Cinzel for headers, Crimson Text for body)
 *    - Embrace decorative elements without overwhelming
 * 
 * 4. GLOW > SHADOW
 *    - Interactive elements should "glow" with arcane energy
 *    - Use inner shadows and soft outer glows
 *    - Electric/magical elements emit light
 * 
 * 5. AGED > PRISTINE
 *    - Elements should feel weathered and well-used
 *    - Subtle texture, not perfectly smooth
 *    - History and character in every component
 * 
 * COMPONENT STYLING GUIDELINES
 * ────────────────────────────
 * MODALS/DIALOGS (AlertBox, Dialogs, etc.)
 *   - Background: Aged parchment with subtle texture/gradient
 *   - Border: Ornamental brass/copper border (2-3px)
 *   - Title: Cinzel font, arcane blue or matching severity color
 *   - Content: Crimson Text font, readable dark text on warm background
 *   - Backdrop: Dark with slight blur, like looking through old glass
 *   - Buttons: Brass-trimmed, glowing on hover, proper weight
 * 
 * BUTTONS
 *   - Primary: Deep blue with brass border, glows on hover
 *   - Secondary: Outlined with brass/copper, fills on hover
 *   - Danger: Copper red with warning glow
 *   - All: Crimson Text font, proper capitalization (not all-caps)
 * 
 * INPUTS/FORMS
 *   - Background: Slightly recessed, aged paper feel
 *   - Border: Subtle brass when focused, neutral when idle
 *   - Label: Crimson Text, arcane blue color
 *   - Error state: Copper border with warning glow
 * 
 * CARDS/PAPERS
 *   - Background: Layered parchment gradient
 *   - Border: Thin brass/copper outline
 *   - Shadow: Soft, warm-toned (not harsh black)
 *   - Corner radius: Gentle (8-12px), not too rounded
 * 
 * TYPOGRAPHY
 * ──────────
 * Cinzel (Serif, Elegant, Medieval)
 *   - Use for: Titles, headers, important labels
 *   - Weight: 400-700
 *   - When: Establishing hierarchy and gravitas
 * 
 * Crimson Text (Serif, Readable, Classic)
 *   - Use for: Body text, descriptions, form inputs
 *   - Weight: 400-600
 *   - When: Readability is important
 * 
 * Inter/Roboto (Sans-serif, Clean, Modern)
 *   - Use for: Small UI text, technical info, fallback
 *   - Weight: 300-500
 *   - When: Clarity over style
 * 
 * ANIMATION & INTERACTION
 * ───────────────────────
 * - Transitions: 200-300ms, ease-out
 * - Hover states: Subtle glow, slight scale (1.02-1.05)
 * - Focus states: Brass/electric border glow
 * - Disabled states: Reduced opacity (0.5-0.6), desaturated
 * - Loading states: Gentle pulse or shimmer
 * 
 * ACCESSIBILITY
 * ─────────────
 * - Maintain WCAG AA contrast ratios minimum
 * - Focus indicators clearly visible
 * - Interactive elements min 44x44px touch target
 * - Screen reader friendly labels
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// Arcane Beam Electric Dream Theme
// Medieval + Magic + Steampunk + Early Electric
// Color scheme: Deep blues, electric purples, brass/gold accents, copper highlights, mystical greens

export const arcaneTheme = createTheme({
  palette: {
    mode: 'light',
    // Primary: Purple (main accent color)
    primary: {
      main: '#9933ff', // Purple - primary accent
      light: '#b366ff',
      dark: '#7700cc',
      contrastText: '#FFFFFF',
    },
    // Secondary: Copper (secondary accent color)
    secondary: {
      main: '#ff9933', // Copper - secondary accent
      light: '#ffb366',
      dark: '#cc7700',
      contrastText: '#FFFFFF',
    },
    // Tertiary: Teal (grading color between purple and copper)
    tertiary: {
      main: '#00cc99', // Teal - tertiary accent
      light: '#33ddaa',
      dark: '#009977',
      contrastText: '#FFFFFF',
    },
    // Background: Beige for all modals/papers
    background: {
      default: '#FFFFE6', // Beige
      paper: '#FFFFE6', // Same beige for consistency
    },
    surface: {
      main: '#E8E8D0', // Slightly darker beige for surfaces
    },
    // Accent colors for specific purposes
    accent: {
      main: '#00cc99', // Teal (same as tertiary)
      light: '#33ddaa',
      dark: '#009977',
      contrastText: '#FFFFFF',
    },
    electric: {
      main: '#9933ff', // Purple (same as primary)
      light: '#b366ff',
      dark: '#7700cc',
      contrastText: '#FFFFFF',
    },
    copper: {
      main: '#ff9933', // Copper (same as secondary)
      light: '#ffb366',
      dark: '#cc7700',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#2D2D2D', // Darker for beige background readability
      secondary: '#5A5A5A', // Medium dark grey
      disabled: '#999999', // Light grey
    },
    // Error/Warning: Magenta (for alerts and warnings)
    error: {
      main: '#e60073', // Magenta
      light: '#ff3399',
      dark: '#b30059',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#e60073', // Same magenta for warnings
      light: '#ff3399',
      dark: '#b30059',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#00cc99', // Teal (tertiary)
      light: '#33ddaa',
      dark: '#009977',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#00cc99', // Teal (tertiary) for success
      light: '#33ddaa',
      dark: '#009977',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          background: 'linear-gradient(135deg, #2C3E8C 0%, #8B5CF6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1A2B73 0%, #7C3AED 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        },
        elevation1: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B5CF6',
              borderWidth: 2,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8B5CF6',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          '&.MuiChip-clickable:hover': {
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: '#8B5CF6',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#7C3AED',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&.MuiAlert-standardSuccess': {
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: '#047857',
          },
          '&.MuiAlert-standardError': {
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            color: '#B91C1C',
          },
          '&.MuiAlert-standardWarning': {
            backgroundColor: 'rgba(217, 119, 6, 0.1)',
            color: '#B45309',
          },
          '&.MuiAlert-standardInfo': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#2563EB',
          },
        },
      },
    },
  },
});

// Custom background gradients for different views
export const backgroundGradients = {
  login: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  register: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  characterCreation: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  game: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  // Arcane Beam Electric Dream specific gradients
  arcane: 'linear-gradient(135deg, #2C3E8C 0%, #8B5CF6 50%, #10B981 100%)',
  electric: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  mystical: 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)',
  steampunk: 'linear-gradient(135deg, #D97706 0%, #DC2626 100%)',
};

// Custom shadows
export const customShadows = {
  arcane: '0 20px 40px rgba(44, 62, 140, 0.2)',
  electric: '0 20px 40px rgba(139, 92, 246, 0.2)',
  mystical: '0 20px 40px rgba(16, 185, 129, 0.2)',
  steampunk: '0 20px 40px rgba(217, 119, 6, 0.2)',
  strong: '0 25px 50px rgba(0, 0, 0, 0.25)',
  subtle: '0 8px 16px rgba(0, 0, 0, 0.1)',
};

// CSS variables for global use
export const cssVariables = {
  '--gradient-arcane': backgroundGradients.arcane,
  '--gradient-electric': backgroundGradients.electric,
  '--gradient-mystical': backgroundGradients.mystical,
  '--gradient-steampunk': backgroundGradients.steampunk,
  '--shadow-arcane': customShadows.arcane,
  '--shadow-electric': customShadows.electric,
  '--shadow-mystical': customShadows.mystical,
  '--shadow-steampunk': customShadows.steampunk,
  '--shadow-strong': customShadows.strong,
  '--shadow-subtle': customShadows.subtle,
};

export default arcaneTheme;
