/**
 * akamai-edgeworkers-localsim/EW/interfaces/Headers.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

// This is what we return from the API. Hence the type is string[]
export interface Headers {
    [others: string]: string[];
}
