import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gameDataService } from "@/services/gameDataService";
import type { PartyInterface, GameTimeInterface, News } from "@/types/api";
import type { LocationData } from "@/services/locationService";

const ENABLE_REDIRECTS = process.env.NEXT_PUBLIC_ENABLE_GAME_REDIRECTS !== "false";

const DEFAULT_GAME_TIME: GameTimeInterface = {
  hour: 3,
  dayOfWeek: 2,
  dayOfSeason: 15,
  season: 1,
  dayPassed: 14,
  year: 1,
};

export function useGameData(isCheckingAuth: boolean) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [party, setParty] = useState<PartyInterface | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [unseenNews, setUnseenNews] = useState<News[]>([]);
  const [gameTime, setGameTime] = useState<GameTimeInterface | null>(null);

  useEffect(() => {
    if (ENABLE_REDIRECTS && isCheckingAuth) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await gameDataService.fetchGameData();
        
        if (response.success && response.data) {
          setParty(response.data.party);
          setLocation(response.data.location);
          setNews(response.data.news);
          setUnseenNews(response.data.unseenNews);
          
          if (response.data.gameTime) {
            setGameTime(response.data.gameTime);
          } else if (response.data.news.length > 0) {
            setGameTime(response.data.news[0].ts);
          } else {
            console.warn("No game time available, using default");
            setGameTime(DEFAULT_GAME_TIME);
          }
        } else {
          const errorMessages = response.errors 
            ? Object.values(response.errors).filter(Boolean).join(", ")
            : "Failed to load game data";
          
          const hasAuthError = response.errors && (
            errorMessages.includes("auth.noToken") ||
            errorMessages.includes("auth.invalidSession") ||
            errorMessages.includes("auth")
          );

          if (ENABLE_REDIRECTS && hasAuthError) {
            console.log("GameView: Authentication error detected, redirecting to login");
            router.push("/login");
            return;
          }

          setError(errorMessages);
          
          if (response.data) {
            if (response.data.party) setParty(response.data.party);
            if (response.data.location) setLocation(response.data.location);
            if (response.data.news) setNews(response.data.news);
            if (response.data.unseenNews) setUnseenNews(response.data.unseenNews);
          }
        }
      } catch (err) {
        console.error("Error fetching game data:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to load game data";
        
        if (ENABLE_REDIRECTS && (
          errorMessage.includes("401") ||
          errorMessage.includes("Unauthorized") ||
          errorMessage.includes("auth")
        )) {
          console.log("GameView: Authentication error in fetch, redirecting to login");
          router.push("/login");
          return;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, isCheckingAuth]);

  return {
    loading,
    error,
    party,
    setParty,
    location,
    setLocation,
    news,
    unseenNews,
    gameTime,
    setGameTime,
  };
}

