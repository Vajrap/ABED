import React from "react";
import ThemeProvider from "./theme/ThemeProvider";
import GlobalComponents from "./components/GlobalComponents";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GlobalComponents />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
