"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import arcaneTheme from "./Themes/themes/arcaneTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={arcaneTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
