/**
 * akamai-edgeworkers-localsim/EW/interfaces/MutatesHeaders.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface MutatesHeaders {
    /**
     * Sets header values and overrides any previous headers.
     * This request header can only be modified during the onClientRequest and onOriginRequest events.
     *
     * @param name Name of the header
     * @param value Value of the header
     */
    setHeader(name: string, value: string | string[]): void;

    /**
     * Renames or adds values to a header. If the header already exists, then the value is appended.
     * The new header value can be a single string or an array.
     * This request header can only be modified during the onClientRequestand onOriginRequestevents.
     *
     * @param name New header name
     * @param value New Header value(s)
     */
    addHeader(name: string, value: string | string[]): void;

    /**
     * Removes the named header.
     * This request header can only be modified during the onClientRequest and onOriginRequest events.
     * The header name is case insensitive.
     *
     * @param name Name of the header to remove
     */
    removeHeader(name: string): void;
}
