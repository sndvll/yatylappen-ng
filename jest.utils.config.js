module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(nanoid)/)',
  ],
  testMatch: ['**/core/utils/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^nanoid$': '<rootDir>/src/__mocks__/nanoid.ts',
    '^nanoid/(.*)$': '<rootDir>/src/__mocks__/nanoid.ts',
  },
};
