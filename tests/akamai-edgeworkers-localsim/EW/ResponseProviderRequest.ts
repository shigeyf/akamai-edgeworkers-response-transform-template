/**
 * tests/akamai-edgeworkers-localsim/EW/ResponseProviderRequest.ts
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

import { Request } from "./Request";
import { UserLocation } from "./UserLocation";
import { Device } from "./Device";
import { ReadsHeaders, ReadAllHeader, Headers } from "./interfaces";

export class ResponseProviderRequest extends Request implements ReadsHeaders, ReadAllHeader {
    private readonly _headers: { [key: string]: string[] };

    constructor(
        host: string,
        method: string,
        path: string,
        scheme: string,
        query: string,
        url: string,
        cpCode: number,
        userLocation?: UserLocation,
        decice?: Device,
        headers?: { [key: string]: string[] }
    ) {
        super(host, method, path, scheme, query, url, cpCode, userLocation, decice);
        this._headers = {};
        if (headers != undefined) {
            Object.keys(headers).forEach((key) => {
                this._headers[key] = headers[key];
            });
        }
    }

    getHeader(name: string): string[] | null {
        if (this._headers[name] != undefined) {
            return this._headers[name];
        }
        return null;
    }

    getHeaders(): Headers {
        return this._headers;
    }
}
