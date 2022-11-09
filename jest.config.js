module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: false,
  collectCoverageFrom: [
    "<rootDir>/components/**/**/*.ts(x)",
    "<rootDir>/pages/*.ts(x)",
    "<rootDir>/hooks/**/**/*.ts(x)",
    "<rootDir>/store/**/**/*.ts(x)",
  ],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
};