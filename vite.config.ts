import { defineConfig } from "vite";

// Based on: https://docs.workadventu.re/developer/map-scripting/using-typescript/
export default defineConfig({
  build: {
    lib: {
      entry: "src/main.ts",
      name: "MissWongBot",
      formats: ["umd"],
      fileName: () => "bot.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "bot.js",
      },
    },
  },
});
