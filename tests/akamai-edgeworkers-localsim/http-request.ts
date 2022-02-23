/**
 * akamai-edgeworkers-localsim/http-request.ts
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
import fetch from "node-fetch";
import { RequestInfo, RequestInit, Response } from "node-fetch";
import { UnderlyingSource, ReadableStream } from "node:stream/web";
import { headersConvertForEW, headersConvertForFetch } from "./internals";

class HttpSource implements UnderlyingSource {
    private readable: NodeJS.ReadableStream;

    constructor(readable: NodeJS.ReadableStream) {
        this.readable = readable;
    }

    start(controller: any): void {
        this.readable.on("readable", () => {
            let chunk: string | Buffer;
            while (null !== (chunk = this.readable.read())) {
                controller.enqueue(chunk);
            }
        });
        this.readable.on("end", () => {
            controller.close();
        });
    }
}

/**
 * Describes the result of a `httpRequest()`.
 */
export class HttpResponse implements EW.ReadsHeaders, EW.ReadAllHeader {
    status: number = 0;
    ok: boolean = false;
    body: ReadableStream;

    private _response: Response;
    private headers?: EW.Headers;

    constructor(response: Response, headers: EW.Headers, body: ReadableStream) {
        this._response = response;
        this.headers = headers;
        this.body = body;
        this.status = this._response.status;
        this.ok = this._response.ok;
    }

    /**
     * Returns a Promise that resolves to a string containing the
     * response body. Note that the body is buffered in memory.
     */
    text(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve("text");
        });
    }

    /**
     * Parses the body of the response as JSON. The response is buffered
     * and `JSON.parse()` is run on the text.
     */
    json(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve("");
        });
    }

    getHeader(name: string): string[] | null {
        if (this.headers == undefined) { return null; }
        Object.keys(this.headers).forEach((key) => {
            if (key === name) {
                return this.headers![key];
            }
        });
        return null;
    }

    getHeaders(): EW.Headers {
        if (this.headers == undefined) { return {}; }
        return this.headers;
    }
}

/**
 * Performs a subrequest, fetching the requested resource asynchronously.
 *
 * @param url A String containing the URL to fetch. Can be an absolute
 *      or relative URL. Relative URLs will use the parent request as
 *      the base URL. Only "http" and "https" are supported for the
 *      scheme. Specifying port numbers is not supported.
 * @param options May include
 *  - `method` The HTTP method to use.
 *  - `headers` Request headers to specify.
 *  - `body` The request payload.
 *  - `timeout` The request timeout, in milliseconds.
 */

export function httpRequest(
    url: string,
    options?: {
        method?: string;
        headers?: { [others: string]: string | string[] };
        body?: string;
        timeout?: number;
    }
): Promise<HttpResponse> {
    const requestInfo: RequestInfo = url;
    const requestInit: RequestInit = {};

    if (options != undefined) {
        let method = "GET";
        if (options.method != undefined) {
            method = options.method;
        }
        requestInit['method'] = method;
        if (options.headers != undefined) {
            requestInit['headers'] = headersConvertForFetch(options.headers);
        }
        if (options.body != undefined) {
            requestInit['body'] = options.body;
        }
        if (options.timeout != undefined) {
            requestInit['timeout'] = options.timeout;
        }
    }

    return new Promise<HttpResponse>((resolve, reject) => {
        try {
            fetch(requestInfo, requestInit).then((response) => {
                resolve(new HttpResponse(
                    response,
                    headersConvertForEW(response.headers),
                    new ReadableStream(new HttpSource(response.body))
                ));
            })
        } catch (err) {
            console.log("fetch error: " + err);
            reject();
        }
    });
}
