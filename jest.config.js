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
        "^create-response$": "<rootDir>/tests/akamai-edgeworkers-localsim/create-response",
        "^http-request$": "<rootDir>/tests/akamai-edgeworkers-localsim/http-request",
        "^log$": "<rootDir>/tests/akamai-edgeworkers-localsim/log",
        "^streams$": "<rootDir>/tests/akamai-edgeworkers-localsim/streams",
        "^text-encode-transform$": "<rootDir>/tests/akamai-edgeworkers-localsim/text-encode-transform",
        "^url-search-params$": "<rootDir>/tests/akamai-edgeworkers-localsim/url-search-params"
    },
    verbose: true
};
