import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: false,
  collectCoverageFrom: [
    "<rootDir>/components/**/**/*.ts(x)",
    "<rootDir>/pages/*.ts(x)"
  ],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
};

export default config;