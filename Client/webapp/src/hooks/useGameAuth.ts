import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { characterService } from "@/services/characterService";

const ENABLE_REDIRECTS = process.env.NEXT_PUBLIC_ENABLE_GAME_REDIRECTS !== "false";

export function useGameAuth() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!ENABLE_REDIRECTS) {
      setIsCheckingAuth(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("sessionToken") : null;
        
        if (!token) {
          console.log("GameView: No token found, redirecting to login");
          router.push("/login");
          return;
        }

        const result = await characterService.checkHasCharacter();
        
        if (!result.success) {
          console.log("GameView: Auth check failed, redirecting to login");
          router.push("/login");
          return;
        }

        if (!result.hasCharacter) {
          console.log("GameView: User doesn't have character, redirecting to character creation");
          router.push("/character-creation");
          return;
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("GameView: Error checking auth:", error);
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isCheckingAuth };
}

