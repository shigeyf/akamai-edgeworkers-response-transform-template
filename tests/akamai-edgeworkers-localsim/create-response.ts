/**
 * akamai-edgeworkers-localsim/create-response.ts
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

import { EW } from "./EW";
import { ReadableStream } from "./streams";

/**
 * Specifies headers for createResponse(). Keys are treated as header
 * names, and values are treated as header values.
 */
// This is HeadersUI
interface Headers {
    [others: string]: string | string[];
}

/**
 * A response body, either in the form of a static string or a readable stream.
 */
type CreateResponseBody = string | ReadableStream;

/**
 * Generates a return value for responseProvider(). It validates the
 * passed values and returns an opaque object. Callers should be
 * prepared for the function to throw exceptions if they specify invalid
 * arguments.
 *
 * @param status The HTTP status code of the outgoing response. Must be
 *          in the range of 100-599.
 * @param headers Properties used as key:value pairs for the response
 *          headers. Keys are strings that contain header names, values
 *          are either strings or arrays of strings.
 * @param body Content of the response body. When specified as a
 *          string, the body is limited to 100,000 bytes. When specified
 *          as a ReadableStream, there is no limit.
 * @param denyReason Deny reason when the status code is 403.
 */

export function createResponse(
    status: number,
    headers: Headers,
    body: CreateResponseBody,
    denyReason?: string
// eslint-disable-next-line @typescript-eslint/ban-types
): object {
    return new EW.Response(status, headers, body, denyReason);
}

/*
export function createResponse_(
    body?: CreateResponseBody,
    opts?: {
        status?: number | undefined;
        headers?: Headers | undefined;
        denyReason?: string | undefined;
    }
): object {
    let _status = 200;
    let _headers = {};
    let _body: CreateResponseBody = "";
    if (body != undefined) {
        _body = body;
    }
    if (opts != undefined) {
        if (opts.status != undefined) {
            _status = opts.status;
        }
        if (opts.headers != undefined) {
            _headers = opts.headers;
        }
    }
    return new EW.Response(_status, _headers, _body, opts.denyReason);
}
*/
