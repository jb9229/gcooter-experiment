module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: {
        jsx: 'react',
      },
      diagnostics: false,
    },
  },
  setupFiles: ['<rootDir>/test/jestSetup.ts'],
};
