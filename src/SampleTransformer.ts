/**
 * src/SampleTransformer.ts
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

import { TransformStream } from "streams";
import { logger } from "log";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const version = "@@VERSION@@";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const workerId = "@@EDGEWORKERS_ID@@";
let debug = false;

export class SampleTransformer extends TransformStream<string, string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(queryParams: { [key: string]: string }) {
        if (queryParams["debug"] !== undefined && queryParams["debug"] === "true") {
            debug = true;
        }
        if (debug) {
            logger.log("D:T:constructor");
        }
        let enqueueBuffer = "";

        ///
        // Function definitions for this TransformStream implementation
        //

        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        function start(controller: any): void {
            if (debug) {
                logger.log("D:T:start");
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
        function transform(chunk: any, controller: any): void {
            if (debug) {
                logger.log("D:T:transform: %d bytes", chunk.length);
            }
            enqueueBuffer += chunk;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function flush(controller: any): void {
            controller.enqueue(enqueueBuffer);
            if (debug) {
                logger.log("D:T:flush");
            }
        }

        super({ start, transform, flush });
    }
}
