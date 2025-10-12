import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    surface: Palette['primary'];
    accent: Palette['primary'];
    electric: Palette['primary'];
    copper: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    surface?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
    electric?: PaletteOptions['primary'];
    copper?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    accent: true;
    electric: true;
    copper: true;
  }
}

