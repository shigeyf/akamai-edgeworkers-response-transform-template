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
        "^cookie$": "<rootDir>/akamai-edgeworkers-localsim/src/cookie",
        "^create-response$": "<rootDir>/akamai-edgeworkers-localsim/src/create-response",
        "^http-request$": "<rootDir>/akamai-edgeworkers-localsim/src/http-request",
        "^log$": "<rootDir>/akamai-edgeworkers-localsim/src/log",
        "^streams$": "<rootDir>/akamai-edgeworkers-localsim/src/streams",
        "^text-encode-transform$": "<rootDir>/akamai-edgeworkers-localsim/src/text-encode-transform",
        "^url-search-params$": "<rootDir>/akamai-edgeworkers-localsim/src/url-search-params"
    },
    verbose: true
};
