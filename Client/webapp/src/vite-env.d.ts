/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENVIRONMENT: string;
  readonly VITE_ENABLE_MUSIC_PLAYER: string;
  readonly VITE_ENABLE_GUEST_LOGIN: string;
  readonly VITE_ENABLE_REGISTRATION: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_SUPPORTED_LANGUAGES: string;
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_ENABLE_LOGGING: string;
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_ENABLE_PWA: string;
  readonly VITE_ENABLE_SERVICE_WORKER: string;
  readonly VITE_MUSIC_DEFAULT_VOLUME: string;
  readonly VITE_MUSIC_AUTO_PLAY: string;
  readonly VITE_MUSIC_PERSIST_SETTINGS: string;
  readonly VITE_THEME_MODE: string;
  readonly VITE_CUSTOM_THEME: string;
  readonly VITE_HOT_RELOAD: string;
  readonly VITE_DEV_TOOLS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
