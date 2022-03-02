/**
 * tests/SampleTransformer.test.ts
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

import { ReadableStream } from "./akamai-edgeworkers-localsim/streams";
import { TransformStream } from "./akamai-edgeworkers-localsim/streams";
import { TextDecoderStream, TextEncoderStream } from "./akamai-edgeworkers-localsim/streams";

import { TextDecoder } from "node:util";
import { HttpFileSourceReader } from "./testutils/HttpFileSourceReader";
import { LocalFilePullSourceReader } from "./testutils/LocalFilePullSourceReader";
import { LocalFilePushSourceReader } from "./testutils/LocalFilePushSourceReader";
import { HttpPullSourceReader } from "./testutils/HttpPullSourceReader";
import { HttpPushSourceReader } from "./testutils/HttpPushSourceReader";
import { StringArrayPushSourceReader } from "./testutils/StringArrayPushSourceReader";
import { TestParams } from "./testutils/TestParams";

// Target Module for this test
import { SampleTransformer } from "../src/SampleTransformer";

//
// Test Module #1
//
import { test1StringArrayInput } from "./results/TestResult_module1_test1";
const TestParameters: TestParams[] = [
    new TestParams(
        "https://edgeworkersorigin.azurewebsites.net/index.html",
        "tests/results/TestResult_module1_test1.html"
    )
];

describe("Test #1 for SampleTransformer module", (): void => {
    test("Test #1-1: No Conversion Simple Transformer Test", async (): Promise<void> => {
        const url = TestParameters[0].rpRequestUrl;
        const path = TestParameters[0].outputFilename;
        const queryParams = { debug: "true" };
        const expected = TestParameters[0].expectedResponseBody?.toString();

        // very simpla example of UnderlyingSource implementation
        const rstream = new ReadableStream(new HttpFileSourceReader(url));
        // other exmaples of UnderlyingSource implementations
        //const rstream = new ReadableStream(new LocalFilePullSourceReader(path, 10));
        //const rstream = new ReadableStream(new LocalFilePushSourceReader(path, 10));
        //const rstream = new ReadableStream(new HttpPullSourceReader(url, 10));
        //const rstream = new ReadableStream(new HttpPushSourceReader(url, 10));
        //const rstream = new ReadableStream(new StringArrayPushSourceReader(test1StringArrayInput));

        const transformedStream1 = rstream
            .pipeThrough(new TextDecoderStream())
            .pipeThrough<string>(new SampleTransformer(queryParams) as TransformStream)
            .pipeThrough(new TextEncoderStream());
        let result = "";
        for await (const chunk of transformedStream1) {
            const chunkStr = new TextDecoder().decode(chunk);
            result = result + chunkStr;
        }
        console.log("Test1 Expected: " + expected?.length + " bytes\n");
        console.log(expected + "EOF");
        console.log("Test1 Result: " + result.length + " bytes\n");
        console.log(result + "EOF");
        expect(result === expected).toBe(true);
    });
});
