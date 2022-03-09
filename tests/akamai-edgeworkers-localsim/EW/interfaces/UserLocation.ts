/**
 * akamai-edgeworkers-localsim/EW/interfaces/UserLocation.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

/**
 * Notes:
 * * If the IP address is in the reserved IP space (as designated by the
 *   Internet Assigned Numbers Authority), every property will have the
 *   value of ΓÇÿreservedΓÇÖ.
 * * If user location properties can not be supplied for any reason,
 *   undefined is returned for that property
 */
export interface UserLocation {
    /**
     * The continent value is a two-letter code for the continent that
     * the IP address maps to.
     */
    readonly continent: string | undefined;

    /**
     * The country value is an ISO-3166, two-letter code for the country
     * where the IP address maps to.
     */
    readonly country: string | undefined;

    /**
     * The region value is an ISO-3166, two-letter code for the state,
     * province, or region where the IP address maps to.
     */
    readonly region: string | undefined;

    /**
     * The city value is the city (within a 50-mile radius) that the IP
     * address maps to.
     */
    readonly city: string | undefined;

    /**
     * The zipCode value is the zipcode that the IP address maps to
     * (multiple values possible).
     *
     * Contiguous zip codes will be represented as a range of the form
     * "FirstZipInRange LastZipInRange", and multiple ranges may be
     * present (each range separated by the plus (+) character).
     *
     * For example, the following strings are all valid zipCode values:
     *
     * * 10001
     * * 10001+10003
     * * 10001-10003+10005
     * * 10001-10003+10005-10008
     *
     * For country = US and country = PR, zip refers to the 5 digit
     * zipcode.
     *
     * For country = CA, zip refers to the forward sortation area (FSA).
     * For more information on FSA, go to http://www.canadapost.ca and
     * search for FSA.
     *
     * See the EdgeScape Users Guide for more details.
     */
    readonly zipCode: string | undefined;
}
