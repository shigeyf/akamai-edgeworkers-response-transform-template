/**
 * akamai-edgeworkers-localsim/EW/interfaces/HasRoute.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

//import { Destination } from '../classes';

export interface HasRoute {
    /**
     * Routes the outbound origin request to a pre-defined origin server, a modified path, or a modified query string.
     *
     * If called, indicates that the request should be routed to a pre-specified origin
     * server,or have the path or query string modified.
     *
     * The destination must be a JavaScript object containing at least one of the following optional properties;
     *  path, query, or origin.
     * If the destination is not a JavaScript object an error is thrown.
     * This method can only be modified during the onClientRequest event.
     *
     * Edge defined redirects always take precedence over modify forward paths.
     * Therefore, the Edge Redirector and Redirect behaviors take precedence over EdgeWorkers forward route modifications
     * made using the route(destination) function.
     *
     * @param destination A JavaScript object containing the optional properties that will control route. An error is thrown if the input is not a JavaScript Object.
     */
    //route(destination: Destination): void;
}
