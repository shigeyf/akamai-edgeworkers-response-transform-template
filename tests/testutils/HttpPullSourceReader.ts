/**
 * tests/HttpPullSourceReader.ts
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
 */

import fetch from "node-fetch";
import { Buffer } from "buffer";
import { UnderlyingSource } from "node:stream/web";

export class HttpPullSourceReader implements UnderlyingSource {
    private url: string;
    private chunkSize: number;
    private buffer: Buffer;
    private bufferPosition: number;

    constructor(url: string, chunkSize: number) {
        this.url = url;
        this.chunkSize = chunkSize;
        this.buffer = Buffer.alloc(0);
        this.bufferPosition = 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    start(controller: any): void {
        try {
            fetch(this.url)
                .then(async (response) => {
                    this.buffer = await response.buffer();
                    const start = this.bufferPosition;
                    const end = this.bufferPosition + this.chunkSize;
                    if (start < this.buffer.length) {
                        if (end < this.buffer.length) {
                            //console.log("Engueuing %d bytes from %d to %d", this.buffer.slice(start, end).length, start, end);
                            this.bufferPosition = end;
                            controller.enqueue(this.buffer.slice(start, end));
                        } else {
                            //console.log("Engueuing %d bytes from %d to EOB", this.buffer.slice(start, end).length, start);
                            this.bufferPosition = this.buffer.length;
                            controller.enqueue(this.buffer.slice(start));
                            controller.close();
                        }
                    } else {
                        controller.close();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    controller.close();
                });
        } catch (error) {
            console.log(error);
            controller.close();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    pull(controller: any): void {
        if (this.buffer.length > 0) {
            const start = this.bufferPosition;
            const end = this.bufferPosition + this.chunkSize;
            if (start < this.buffer.length) {
                if (end < this.buffer.length) {
                    //console.log("Engueuing %d bytes from %d to %d", this.buffer.slice(start, end).length, start, end);
                    this.bufferPosition = end;
                    controller.enqueue(this.buffer.slice(start, end));
                } else {
                    //console.log("Engueuing %d bytes from %d to EOB", this.buffer.slice(start, end).length, start);
                    this.bufferPosition = this.buffer.length;
                    controller.enqueue(this.buffer.slice(start));
                    controller.close();
                }
            } else {
                controller.close();
            }
        }
    }
}
