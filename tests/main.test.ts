/**
 * tests/main.test.ts
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

import { EW } from "./akamai-edgeworkers-localsim/EW";
import { TestParams } from "./testutils/TestParams";
import { TextDecoder } from "node:util";

// Target Module for this test
import { responseProvider } from "../src/main";

//
// Test Module #1
//

const TestParameters: TestParams[] = [
    new TestParams(
        "https://edgeworkersorigin.azurewebsites.net/index.html",
        "tests/results/TestResult_module1_test1.html"
    )
];

describe("Test #2 for main responseProvider module", (): void => {
    test("Test #2-1: responseProvider Call Test", async (): Promise<void> => {
        //const url = TestParameters[0].rpRequestUrl;
        //const queryParams = { debug: "true" };
        const expected = TestParameters[0].expectedResponseBody?.toString();

        // Create a simulated Request for Response Provider
        const req = new EW.EwSimResponseProviderRequest(
            "edgeworkersorigin.azurewebsites.net",
            "GET",
            "/index.html",
            "https",
            "debug=true&test1=value1",
            "https://edgeworkersorigin.azurewebsites.net/index.html",
            12345
        );

        const rpResponse = await responseProvider(req);
        const ewResponse = rpResponse as EW.EwSimResponseWithBody;
        let result = "";
        for await (const chunk of ewResponse.body) {
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
