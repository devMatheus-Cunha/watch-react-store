export const testEnvironment = "jsdom";
export const testPathIgnorePatterns = ["/node_modules/", "/.next/"];
export const collectCoverage = true;
export const collectCoverageFrom = ["<rootDir>/components/**/**/*.ts(x)", "<rootDir>/pages/*.ts(x)", "<rootDir>/hooks/**/**/*.ts(x)"];
export const setupFilesAfterEnv = ["<rootDir>/.jest/setup.ts"];