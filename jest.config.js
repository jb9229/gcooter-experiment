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
  moduleNameMapper: {
    '^utils/(.*)$': '<rootDir>/src/gbike-mobile-lib/utils/$1',
    '^assets/(.*)$': '<rootDir>/assets/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|gif|png|mp4|mkv|avi|webm|swf|wav|mid)$': 'jest-static-stubs/$1',
  },
  setupFiles: ['<rootDir>/test/jestSetup.ts'],
};
