/**
 * tests/HttpPushSourceReader.ts
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

export class HttpPushSourceReader {
    private url: string;
    private chunkSize: number;

    constructor(url: string, chunkSize: number) {
        this.url = url;
        this.chunkSize = chunkSize;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    start(controller: any): void {
        try {
            fetch(this.url)
                .then(async (response) => {
                    const buffer = await response.buffer();
                    let position = 0;
                    while (position < buffer.length) {
                        const start = position;
                        const end = position + this.chunkSize;
                        if (end < buffer.length) {
                            controller.enqueue(buffer.slice(start, end));
                        } else {
                            controller.enqueue(buffer.slice(start));
                            controller.close();
                        }
                        position = end;
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
}
