import { defineConfig } from "vite";

// This config compiles the bot script for WorkAdventure Custom Script bots.
// The output is a single ES module (dist/bot.js) that WA's headless browser loads.
// Based on: https://github.com/workadventure/bot-starter-kit

export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
      fileName: () => "bot.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Don't bundle WA scripting API — it's provided by the runtime
      external: [],
    },
  },
});
