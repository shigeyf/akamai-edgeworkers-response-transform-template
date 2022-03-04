/**
 * akamai-edgeworkers-localsim/EdgeGrid/auth.ts
 *
 * Copyright 2014 Akamai Technologies, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

import * as uuid from "uuid";
import crypto from "crypto";
import url from "node:url";

export interface EdgeGridRequest {
    method: string;
    path: string;
    query?: url.URLSearchParams;
    headers?: { [key: string]: string };
    headersToSign?: { [key: string]: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
}

function egTime(): string {
    const date = new Date(Date.now());
    //var now = date.getTime();
    //var addSeconds = 1 * 1000;
    //var newDate = new Date(now + addSeconds);
    return date
        .toISOString()
        .replace(/-/g, "")
        .replace(/[.][0-9][0-9][0-9]Z$/, "+0000");
}

function egNonce(): string {
    return uuid.v4();
}

function base64HmacSha256(data: string, key: string): string {
    const encrypt = crypto.createHmac("sha256", key);
    encrypt.update(data);
    return encrypt.digest("base64");
}
function base64Sha256(data: string): string {
    const shasum = crypto.createHash("sha256").update(data);
    return shasum.digest("base64");
}

function canonicalizeHeaders(headers: { [key: string]: string } | undefined): string {
    const formattedHeaders = [];
    if (headers != undefined) {
        for (const key in headers) {
            formattedHeaders.push(key.toLowerCase() + ":" + headers[key].trim().replace(/\s+/g, " "));
        }
    }
    return formattedHeaders.join("\t");
}

function contentHash(request: EdgeGridRequest, maxBody: number) {
    let contentHash = "";
    let preparedBody = request.body || "";
    const headers = request.headers || {};
    const isTarball = preparedBody instanceof Uint8Array && headers["Content-Type"] === "application/gzip";

    if (typeof preparedBody === "object" && !isTarball) {
        let postDataNew = "";
        for (const key in preparedBody) {
            postDataNew += key + "=" + encodeURIComponent(JSON.stringify(preparedBody[key])) + "&";
        }
        // Strip trailing ampersand
        postDataNew = postDataNew.replace(/&+$/, "");
        preparedBody = postDataNew;
        request.body = preparedBody; // Is this required or being used?
    }

    if (request.method === "POST" && preparedBody.length > 0) {
        // If body data is too large, cut down to max-body size
        if (preparedBody.length > maxBody) {
            if (isTarball) preparedBody = preparedBody.slice(0, maxBody);
            else preparedBody = preparedBody.substring(0, maxBody);
        }
        contentHash = base64Sha256(preparedBody);
    }
    return contentHash;
}

function makeSigningKey(timestamp: string, clientSecret: string) {
    const key = base64HmacSha256(timestamp, clientSecret);
    return key;
}

function makeDataToSign(request: EdgeGridRequest, url: string, authHeader: string, maxBody: number) {
    const parsedUrl = new URL(url);
    const dataToSign = [
        // METHOD
        request.method.toUpperCase(),
        // PROTOCOL
        parsedUrl.protocol.replace(":", ""),
        // HOST
        parsedUrl.host,
        // PATH
        parsedUrl.pathname + parsedUrl.search,
        // HEADER
        canonicalizeHeaders(request.headersToSign),
        // CONTENT_HASH
        contentHash(request, maxBody),
        // AUTH HEADER
        authHeader
    ];
    const dataToSignStr = dataToSign.join("\t").toString();
    //console.log(dataToSignStr);
    return dataToSignStr;
}

function signRequest(
    request: EdgeGridRequest,
    url: string,
    timestamp: string,
    clientSecret: string,
    authHeader: string,
    maxBody: number
) {
    return base64HmacSha256(makeDataToSign(request, url, authHeader, maxBody), makeSigningKey(timestamp, clientSecret));
}

function makeAuthHeader(
    request: EdgeGridRequest,
    host: string,
    clientToken: string,
    accessToken: string,
    clientSecret: string,
    timestamp: string,
    nonce: string,
    maxBody: number
) {
    const parsed = new URL(request.path, host);
    if (request.query != undefined) {
        parsed.search = request.query.toString();
    }
    const requestUrl = url.format(parsed);

    const kvps: { [key: string]: string } = {
        client_token: clientToken,
        access_token: accessToken,
        timestamp: timestamp,
        nonce: nonce
    };
    let authHeader = "EG1-HMAC-SHA256 ";
    for (const key in kvps) {
        authHeader += key + "=" + kvps[key] + ";";
    }
    const signedAuthHeader =
        authHeader + "signature=" + signRequest(request, requestUrl, timestamp, clientSecret, authHeader, maxBody);
    return signedAuthHeader;
}

export const generateAuth = function (
    request: EdgeGridRequest,
    clientToken: string,
    clientSecret: string,
    accessToken: string,
    host: string,
    maxBody?: number,
    guid?: string,
    timestamp?: string
): EdgeGridRequest {
    maxBody = maxBody || 131072;
    guid = guid || egNonce();
    timestamp = timestamp || egTime();

    if (request.headers == undefined) {
        request.headers = {};
    }

    request.headers.Authorization = makeAuthHeader(
        request,
        host,
        clientToken,
        accessToken,
        clientSecret,
        timestamp,
        guid,
        maxBody
    );

    return request;
};
