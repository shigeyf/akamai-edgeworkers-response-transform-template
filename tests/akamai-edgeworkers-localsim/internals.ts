/**
 * akamai-edgeworkers-localsim/internals.ts
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

import { Headers } from "node-fetch";

export function headersConvertForFetch(headers: { [others: string]: string | string[] }): [string, string][] {
    const convertedHeaders = new Array<[string, string]>();

    Object.keys(headers).forEach((key) => {
        if (Array.isArray(headers[key])) {
            (headers[key] as Array<string>).forEach((value) => {
                convertedHeaders.push([key, value]);
            });
        } else {
            const value = headers[key] as string;
            convertedHeaders.push([key, value]);
        }
    });
    return convertedHeaders;
}

export function headersConvertForEW(headers: Headers): { [others: string]: string[] } {
    const convertedHeaders: { [others: string]: string[] } = {};
    headers.forEach((key, value) => {
        if (convertedHeaders[key] != undefined) {
            const values = convertedHeaders[key];
            values.push(value);
        } else {
            convertedHeaders[key] = [value];
        }
    });
    return convertedHeaders;
}
