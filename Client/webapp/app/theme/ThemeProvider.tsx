"use client";

import { ThemeProvider as MUIThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { arcaneTheme, cssVariables } from "@/theme";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MUIThemeProvider theme={arcaneTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": cssVariables,
          "*": {
            boxSizing: "border-box",
          },
          "html, body": {
            margin: 0,
            padding: 0,
            height: "100%",
            fontFamily: "'Crimson Text', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
            background: cssVariables["--gradient-arcane"],
            backgroundAttachment: "fixed",
          },
          "#root": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          // Custom scrollbar
          "::-webkit-scrollbar": {
            width: 8,
          },
          "::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 4,
          },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(139, 92, 246, 0.5)",
            borderRadius: 4,
            "&:hover": {
              background: "rgba(139, 92, 246, 0.7)",
            },
          },
          // Animations
          "@keyframes pulse": {
            "0%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.5,
            },
            "100%": {
              opacity: 1,
            },
          },
          "@keyframes fadeIn": {
            from: {
              opacity: 0,
              transform: "translateY(20px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          // Page animations
          ".page-enter": {
            animation: "fadeIn 0.3s ease-out",
          },
        }}
      />
      {children}
    </MUIThemeProvider>
  );
}

