/**
 * akamai-edgeworkers-localsim/EW/interfaces/ReadAllHeader.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { Headers } from './Headers';

export interface ReadAllHeader {
    /**
     * Returns a JavaScript object that contains all HTTP request headers as properties.
     *
     * The key for each property is the name of the HTTP header, normalized to lower-case.
     * The value is an array of strings, containing one string for each HTTP header with the same name.
     * The header properties are in the order that they were received by the Akamai edge servers.
     * When you iterate across the object properties you will get the headers in the order that the browser sent them.
     * @returns
     */
    getHeaders(): Headers;
}
