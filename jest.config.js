module.exports = {
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '@lib/(.*)$': '<rootDir>/lib/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
    '@bin/(.*)$': '<rootDir>/bin/$1',
    '@helpers/(.*)$': '<rootDir>/helpers/$1',
    '@functions/(.*)$': '<rootDir>/functions/$1',
    '@constructs/(.*)$': '<rootDir>/constructs/$1',
    '@models/(.*)$': '<rootDir>/models/$1',
    '@constants/(.*)$': '<rootDir>/constants/$1',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: 90
    }
  },
  collectCoverageFrom: [
    'lib/**/*.ts',
    'helpers/**/*.ts',
    'functions/**/*.ts'
  ],
  verbose: true,
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage/test-reports' }]]
}
