/**
 * akamai-edgeworkers-localsim/EW/interfaces/Request.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

import { Device } from "../Device";
import { UserLocation } from "../UserLocation";

export interface Request {
    /**
     * The Host header value of the incoming request.
     */
    readonly host: string;

    /**
     * The HTTP method of the incoming request.
     */
    readonly method: string;

    /**
     * The URL path of the incoming request, including the filename and
     * extension, but without any query string.
     */
    readonly path: string;

    /**
     * The scheme of the incoming request ("http" or "https").
     */
    readonly scheme: string;

    /**
     * The query string of the incoming request.
     */
    readonly query: string;

    /**
     * The Relative URL of the incoming request. This includes the path as well
     * as the query string.
     */
    readonly url: string;

    /**
     * Object containing properties specifying the end user's geographic
     * location. This value of this property will be null if the contract
     * associated with the request does not have the appropriate entitlements.
     */
    readonly userLocation: UserLocation | undefined;

    /**
     * Object containing properties specifying the device characteristics. This
     * value of this property will be null if the contract associated with the
     * request does not have entitlements for EDC.
     */
    readonly device: Device | undefined;

    /**
     * The cpcode used for reporting.
     */
    readonly cpCode: number;
}
