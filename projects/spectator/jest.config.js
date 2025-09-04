const { defaultTransformerOptions } = require('jest-preset-angular/presets');

module.exports = {
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        tsconfig: 'projects/spectator/jest/tsconfig.spec.json',
      },
    ],
  },
  roots: ['projects/spectator'],
  testMatch: ['**/jest/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/projects/spectator/setup-jest.ts'],
  moduleNameMapper: {
    '@ngneat/spectator/internals': '<rootDir>/projects/spectator/internals/src/public_api.ts',
    '@ngneat/spectator/jest': '<rootDir>/projects/spectator/jest/src/public_api.ts',
    '@ngneat/spectator': '<rootDir>/projects/spectator/src/public_api.ts',
  }
};
