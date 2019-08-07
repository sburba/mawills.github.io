// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["^\\w+\\.ts$"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ["clover"],

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
