/**
 * akamai-edgeworkers-localsim/EdgeGrid/EdgeGridHttpRequestHook.ts
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

import { edgerc } from "./edgerc";
import { generateAuth, EdgeGridRequest } from "./auth";
import { RequestInfo, RequestInit } from "node-fetch";

const EDGEDB_AUTH = "X-Akamai-EdgeDB-Auth";

export const EdgeGridHttpRequestHook = function (
    requestInfo: RequestInfo,
    requestInit: RequestInit
): { requestInfo: RequestInfo; requestInit: RequestInit } {
    const egConfig = edgerc("~/.edgerc", "papi");
    const url: string = requestInfo as string;

    // Replace URL
    const urlObject = new URL(url);
    urlObject.pathname = urlObject.pathname.replace(/^\/api\/v1\//, "/edgekv/v1/networks/production/");
    urlObject.host = egConfig.host.replace(/^http[s]*:\/\//, "");
    urlObject.hostname = egConfig.host.replace(/^http[s]*:\/\//, "");
    requestInfo = urlObject.toString();

    // Get EdgeGrid Authorization Token
    const request: EdgeGridRequest = {
        method: requestInit["method"] as string,
        path: urlObject.pathname,
        query: urlObject.searchParams
    };
    const req = generateAuth(
        request,
        egConfig.client_token,
        egConfig.client_secret,
        egConfig.access_token,
        egConfig.host
    );

    // Replace Headers
    const replacedHeaders = new Array<[string, string]>();
    if (Array.isArray(requestInit["headers"])) {
        const headerArray = requestInit["headers"] as Array<[string, string]>;
        headerArray.forEach((header) => {
            if (header[0] != EDGEDB_AUTH) {
                replacedHeaders.push(header);
            }
        });
    }
    if (req.headers != undefined) {
        if (req.headers.Authorization != undefined) {
            replacedHeaders.push(["Authorization", req.headers.Authorization]);
        }
    }
    requestInit["headers"] = replacedHeaders;

    return { requestInfo, requestInit };
};
