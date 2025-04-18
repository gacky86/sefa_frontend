import { defineConfig } from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    include: ['src/tests/**/*.test.tsx'],
    exclude: [
      'src/tests/components/FlashCardDetail.test.tsx',
      'src/tests/components/NewFlashCard.test.tsx',
      'src/tests/components/FlashCardSetting.test.tsx',
      'src/tests/components/FlashCardDelete.test.tsx',

    ],
    environment: 'jsdom',
    coverage: {
      reporter: ['html'],
      reportsDirectory: './coverage'
    },
  },
  plugins: [tsconfigPaths()],
})
