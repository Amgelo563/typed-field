import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      enabled: true,
    },
    globals: true,
    environment: 'node',
    clearMocks: true,
  },
});
