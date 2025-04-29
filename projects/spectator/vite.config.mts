// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import angular from '@analogjs/vite-plugin-angular';
import * as path from 'node:path';

export default defineConfig(({ mode }) => ({
  plugins: [
    angular({tsconfig: path.join(import.meta.dirname, '/vitest/tsconfig.spec.json')}),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    setupFiles: 'setup-vitest.ts',
    environment: 'jsdom',
    include: ['vitest/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    pool: 'forks',
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
