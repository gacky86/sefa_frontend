import { defineConfig } from 'vite'

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
})
