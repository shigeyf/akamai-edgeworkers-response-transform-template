/**
 * akamai-edgeworkers-localsim/EW/interfaces/Destination.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface Destination {
    /**
     * The identifier of the pre-configured origin to send the outgoing request to.
     */
    origin?: string | undefined;

    /**
     * The new path to use in the outgoing request.
     */
    path?: string | undefined;

    /**
     * The new query string to use in the outgoing request.
     */
    query?: string | undefined;
}
