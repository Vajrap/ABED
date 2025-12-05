import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/views": path.resolve(__dirname, "src/views"),
      "@/viewmodels": path.resolve(__dirname, "src/viewmodels"),
      "@/models": path.resolve(__dirname, "src/models"),
      "@/services": path.resolve(__dirname, "src/services"),
      "@/localization": path.resolve(__dirname, "src/localization"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/types": path.resolve(__dirname, "src/types"),
    },
  },
  server: {
    port: 3018,
    host: true, // Allow external connections
    hmr: {
      port: 3019, // Different port for HMR to avoid conflicts
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  }
});
