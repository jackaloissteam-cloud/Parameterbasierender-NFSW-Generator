import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
// ... andere Imports falls vorhanden

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths()
    // ... andere Plugins
  ],
  // DIESEN BEREICH HINZUFÜGEN ODER ERWEITERN:
  build: {
    target: "esnext",
  },
});
