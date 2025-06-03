const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' }); // path to the Next project root

/** @type {import('jest').Config} */
const customConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    // CSS / SCSS modules → identity-obj-proxy
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    // Static assets → stub (create the file below)
    '^.+\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
    // Alias paths, if you use "@/..." in tsconfig
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  globals: {
    fetch: global.fetch,
  },
};

module.exports = createJestConfig(customConfig);
