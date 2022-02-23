/**
 * src/main.ts
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
 * DESCRIPTION:
 * This is a simple sample TransformStream implementation.
 *
 */

import { httpRequest } from "http-request";
import { createResponse } from "create-response";
import { TextEncoderStream, TextDecoderStream } from "text-encode-transform";
import { SampleTransformer } from "./SampleTransformer";
import { logger } from "log";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const version = "@@VERSION@@";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const workerId = "@@EDGEWORKERS_ID@@";

function getJsonFromUrl(queryParams: string): { [key: string]: string } {
    /*
    if (!url) return {}
    const quesPos = url.indexOf("?");
    let hashPos = url.indexOf("#");
    if (quesPos == -1) return {};
    if (hashPos == -1) hashPos = url.length;
    const queryParams = url.substring(quesPos + 1, hashPos);
    */
    const result: { [key: string]: string } = {};
    queryParams.split("&").forEach(function (paramStr) {
        if (!paramStr) return;
        paramStr = paramStr.split("+").join(" "); // replace all '+' with space
        const param = paramStr.split("=");
        if (param.length > 1) {
            result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
        } else {
            result[decodeURIComponent(param[0])] = "";
        }
    });
    return result;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function responseProvider(request: EW.ResponseProviderRequest) {
    const queryParameters = getJsonFromUrl(request.query);
    logger.log("D:RP:host=%s", request.host);
    logger.log("D:RP:url=%s", request.url);
    logger.log("D:RP:path=%s", request.path);
    logger.log("D:RP:query=%s", request.query);
    logger.log("D:RP:QPs=%o", queryParameters);

    return httpRequest(`${request.scheme}://${request.host}${request.path}`)
        .then((response) => {
            logger.log("D:RP:Calling create-response");
            return createResponse(
                response.status,
                {},
                response.body
                    .pipeThrough(new TextDecoderStream())
                    .pipeThrough(new SampleTransformer(queryParameters))
                    .pipeThrough(new TextEncoderStream())
            );
        })
        .catch((err) => {
            logger.log("D:RP:http-request[error], %s", err);
        });
}
