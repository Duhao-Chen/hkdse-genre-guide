import { resolve } from 'path'
import { defineConfig } from 'vite'

// Matches: https://github.com/workadventure/bot-starter-kit/blob/main/vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'MissWongBot',
      fileName: 'bot',
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
})
