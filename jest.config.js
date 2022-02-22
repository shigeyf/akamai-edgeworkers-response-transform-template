/**
 * jest.config.js
 */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// Configurations for Jest testing
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/**/tests/**/*.test.(ts|tsx|js)"],
    moduleNameMapper: {
        "^streams$": "<rootDir>/tests/akamai-edgeworkers-localsim/streams",
        "^log$": "<rootDir>/tests/akamai-edgeworkers-localsim/log"
    },
    verbose: true
};
