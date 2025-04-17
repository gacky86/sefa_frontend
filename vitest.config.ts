import { defineConfig } from 'vite'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    include: ['src/tests/**/*.test.tsx'],
    environment: 'jsdom',
    coverage: {
      reporter: ['html'],
      reportsDirectory: './coverage'
    },
  },
  plugins: [tsconfigPaths()],
})
