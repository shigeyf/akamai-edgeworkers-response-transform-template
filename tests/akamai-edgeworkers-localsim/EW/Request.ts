/**
 * tests/akamai-edgeworkers-localsim/EW/Request.ts
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

import { Device } from "./Device";
import { UserLocation } from "./UserLocation";

export class Request {
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

    constructor(
        host: string,
        method: string,
        path: string,
        scheme: string,
        query: string,
        url: string,
        cpCode: number,
        userLocation?: UserLocation,
        decice?: Device
    ) {
        this.host = host;
        this.method = method;
        this.path = path;
        this.scheme = scheme;
        this.query = query;
        this.url = url;
        this.cpCode = cpCode;
        this.userLocation = userLocation;
        this.device = decice;
    }
}
