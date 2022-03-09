/**
 * tests/akamai-edgeworkers-localsim/EW/EwSimResponse.ts
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

import { Response, Headers } from "./interfaces";

export class EwSimResponse implements Response {
    status: number;
    private _headers: Headers;

    constructor(status: number, headers: { [key: string]: string | string[] }) {
        this.status = status;
        this._headers = {};
        Object.keys(headers).forEach((key) => {
            let headerValues = headers[key];
            if (!Array.isArray(headerValues)) {
                headerValues = [headers[key] as string];
            }
            this._headers[key] = headerValues;
        });
    }

    getHeader(name: string): string[] | null {
        if (this._headers[name] != undefined) {
            return this._headers[name];
        }
        return null;
    }

    setHeader(name: string, value: string | string[]): void {
        if (Array.isArray(value)) {
            this._headers[name] = value;
        } else {
            this._headers[name] = [value];
        }
    }

    addHeader(name: string, value: string | string[]): void {
        if (Array.isArray(value)) {
            value.forEach((v) => {
                this._headers[name].push(v);
            });
        } else {
            this._headers[name].push(value);
        }
    }

    removeHeader(name: string): void {
        delete this._headers[name];
    }
}
