/**
 * akamai-edgeworkers-localsim/EW/interfaces/Headers.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

// This is what we receives from programmers' applications at the API.
// For convenience reasons, the programmers can give a single header value string
// instead of header value string array.
export interface HeadersUI {
    [others: string]: string | string[];
}
