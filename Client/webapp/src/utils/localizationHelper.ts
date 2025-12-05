import { L10N } from "@/localization";
import type { LocalizedText } from "@/types/localization";

/**
 * Get a LocalizedText object from a dot-notation key path
 * Example: "registerPage.usernameTaken" -> L10N.registerPage.usernameTaken
 * 
 * @param keyPath - Dot-notation path like "registerPage.usernameTaken"
 * @returns LocalizedText object or null if not found
 */
export function getL10NByKey(keyPath: string): LocalizedText | null {
  if (!keyPath) return null;
  
  const keyParts = keyPath.split(".");
  let current: any = L10N;
  
  // Navigate through the L10N object
  for (const part of keyParts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  
  // Check if we found a valid LocalizedText object
  if (current && typeof current === "object" && "en" in current) {
    return current as LocalizedText;
  }
  
  return null;
}

/**
 * Get a translated message from a dot-notation key path
 * Falls back to defaultMessage if key not found
 * 
 * @param keyPath - Dot-notation path like "registerPage.usernameTaken"
 * @param language - Current language ("en" or "th")
 * @param defaultMessage - Fallback message if key not found
 * @returns Translated string
 */
export function getTranslatedMessage(
  keyPath: string,
  language: "en" | "th",
  defaultMessage: string
): string {
  const localizedText = getL10NByKey(keyPath);
  
  if (localizedText) {
    return localizedText[language] || localizedText.en || defaultMessage;
  }
  
  return defaultMessage;
}

