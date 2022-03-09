/**
 * tests/akamai-edgeworkers-localsim/EW/EwSimUserLocation.ts
 *
 * Copyright (c) 2021 Shigeyuki Fukushima <shigeyf@outlook.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { UserLocation } from "./interfaces/UserLocation";

export class EwSimUserLocation implements UserLocation {
    // Notes:
    // - If the IP address is in the reserved IP space (as designated by the
    //   Internet Assigned Numbers Authority), every property will have the
    //   value of ‘reserved’.
    // - If user location properties can not be supplied for any reason,
    //   undefined is returned for that property

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

    constructor(continent: string, country: string, region: string, city: string, zipCode?: string) {
        this.continent = continent;
        this.country = country;
        this.region = region;
        this.city = city;
        this.zipCode = zipCode;
    }
}
