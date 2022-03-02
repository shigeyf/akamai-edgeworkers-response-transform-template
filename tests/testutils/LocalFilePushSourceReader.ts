/**
 * tests/LocalFilePushSourceReader.ts
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

import * as fs from "fs";
import { Buffer } from "buffer";
import { UnderlyingSource } from "node:stream/web";

export class LocalFilePushSourceReader implements UnderlyingSource {
    private path: string;
    private chunkSize: number;

    constructor(path: string, chunkSize: number) {
        this.path = path;
        this.chunkSize = chunkSize;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
    start(controller: any): void {
        fs.open(this.path, "r", (err, fd) => {
            if (err) {
                console.log(err);
                controller.close();
            }
            /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
            while (true) {
                const buffer = Buffer.alloc(this.chunkSize);
                const bytesRead = fs.readSync(fd, buffer, 0, this.chunkSize, null);
                if (bytesRead === 0) {
                    // EOF
                    controller.close();
                    break;
                } else {
                    controller.enqueue(buffer.slice(0, bytesRead));
                }
            }
        });
    }
}
