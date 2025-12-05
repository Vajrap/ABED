import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { arcaneTheme } from "@/theme";
import { AppGlobalStyles } from "@/styles/global";
import { LoginView } from "@/views/LoginView";
import { RegisterView } from "@/views/RegisterView";
import { CharacterCreationView } from "@/views/CharacterCreationView";
import { GameView } from "@/views/GameView";
import { MusicPlayer } from "@/components/MusicPlayer/components/MusicPlayer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={arcaneTheme}>
      <CssBaseline />
      <AppGlobalStyles />

      <Router>
        <div
          style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
          <>
            <MusicPlayer />

            <LanguageSwitcher />

            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<LoginView />} />

                <Route path="/register" element={<RegisterView />} />

                <Route
                  path="/character-creation"
                  element={<CharacterCreationView />}
                />

                <Route path="/game" element={<GameView />} />

                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
