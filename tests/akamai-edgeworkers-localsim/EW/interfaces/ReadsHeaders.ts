/**
 * akamai-edgeworkers-localsim/EW/interfaces/ReadsHeaders.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface ReadsHeaders {
    /**
     * Returns an array of header values by header name. The header names are case insensitive.
     * If the header doesn't exist, a value of undefined is returned.
     * This request header can only be modified during the onClientRequestand onOriginRequestevents.
     *
     * @param name Name of the header(s)
     * @returns
     */
    getHeader(name: string): string[] | null;
}
