module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsConfigFile: 'src/tsconfig.spec.json'
    }
  },
  roots: ['src'],
  testMatch: ['**/*.jest.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@netbasal/spectator/jest': '<rootDir>/projects/spectator/jest/src',
    '@netbasal/spectator': '<rootDir>/projects/spectator/src/lib'
  }
};
