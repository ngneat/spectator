import { defineConfig, globalIgnores } from 'eslint/config';
import angular from 'angular-eslint';

export default defineConfig([
  globalIgnores([
    'projects/spectator/test/**/*.ts',
    'projects/spectator/jest/test/**/*.ts',
    'projects/spectator/vitest/test/**/*.ts',
    'projects/spectator/schematics/**/*.*',
  ]),
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    extends: [angular.configs.tsRecommended],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      'no-console': ['error'],
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'lib',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'lib',
          style: 'camelCase',
          type: 'attribute',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended],
    rules: {},
  },
]);
