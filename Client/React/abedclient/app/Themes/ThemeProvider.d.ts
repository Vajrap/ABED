import { DefaultTheme } from "@mui/system";

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

export default function ThemeProvider<Theme = DefaultTheme>(
  props: ThemeProviderProps<Theme>,
): React.ReactElement<ThemeProviderProps<Theme>>;
