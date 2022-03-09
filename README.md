# Template project for Akamai EdgeWorkers Response Stream Transform app

## Overview

This repository is a sample project source code and template for Akamai EdgeWorkers Response Stream Transform to develop, debug, and test your EdgeWorkers application.

Akamai EdgeWorkers supports the [WHATWG Streams](https://streams.spec.whatwg.org/) specification, which is typically used for [Response Orchestration](https://techdocs.akamai.com/edgeworkers/docs/response-orchestration) to generate and manipulate response bodies within an EdgeWorkers handler function by using built-in **http-request** (`httpRequest()` function) and **create-response** (`createResponse()` function) modules in the `responseProvider` event handler.

Here is a quote about Response Orchestration in EdgeWorkers in the Akamai EdgeWorkers public documentation.

> Response Orchestration, also known as Dynamic Content Assembly, is the ability to create on-the-fly response data and content. You can use Response Orchestration to dynamically create tailored, personalized data or web content for a specific set of users or devices. You can also source data and content from multiple server-side APIs or content origins. Response Orchestration supports conditions when combining multiple data sets or HTML fragments.

Regarding Response Orchestration for your response manipulation scenarios, two important limitations are in EdgeWorkers in Response Provider handler. Please see the article about [Limitations](https://techdocs.akamai.com/edgeworkers/docs/limitations) in EdgeWorkers documentation.

* Maximum body size for responses from an EdgeWorkers function to a browser when the response is passed through as a string
    - 100,000 bytes if you pass a string to createResponse in responseProvider
    - No direct limit if you pass a stream to createResponse in responseProvider.
* Maximum body size for responses from an EdgeWorkers function to a client browser
    - 2048 characters if you use request.respondWith() in the onClientRequest or onClientResponse event handler.

With considering this limitations, using 'stream' is often a realistic option in an EdgeWorkers application for your Response Orchestration scenarios, but your 'stream' implementation sometimes may be getting bit complex when developing and/or debugging your codes. EdgeWorkers supports to [enable JavaScript logging](https://techdocs.akamai.com/edgeworkers/docs/enable-javascript-logging), but the maximum log size per event handler is 1024 bytes and your log contents will be truncated if the log contents exceed 1024 bytes, and so it would be difficult to do debugging and testing even with enabling logging.

It would be better for your project to consider if/how you can develop and debug your EdgeWorkers app on your local computer. Thus, here is a sample template project for your EdgeWorkers Response Stream Transforming application.


## Develop, debug, and test your EdgeWorkers Response Provider handler

### 1. Develop your Response Provider handler

Here is a very simple and practical code for response body manipulation with using EdgeWorkers 'stream' (WHATWG Streams). `SampleTransformer` class is an actual implementation for the response body manipulation.

```typescript
// src/main.ts
import { httpRequest } from "http-request";
import { createResponse } from "create-response";
import { TextEncoderStream, TextDecoderStream } from "text-encode-transform";
import { SampleTransformer } from "./SampleTransformer";

export function responseProvider(request: EW.ResponseProviderRequest) {
    // Call httpRequest to get a target web resource/content for response manipulation
    return httpRequest(`${request.scheme}://${request.host}${request.path}`)
        .then((response) => {
            // Once you will get a response, then create a response to end-users by manipulating with 'stream'.
            return createResponse(
                response.status,
                {},
                // Response manipulation is done in 'stream pipeline' (with pipeThrough() function).
                // `SampleTransformer` stream transformer is expected to handle text data as input
                // rather than binary and the output stream data is expected to be a binary data
                // after transforming with `SampleTransformer`, thus TextDecoderStream()/TextEncoderStream()
                // are used in the piprline.
                response.body
                    .pipeThrough(new TextDecoderStream())
                    .pipeThrough(new SampleTransformer())
                    .pipeThrough(new TextEncoderStream())
            );
        })
        .catch((err) => {
            return createResponse(503, {}, "Internal Server Error");
        });
}
```

### 2. Develop your Transformer (Response Manipulation)

You can extend `TransformStream` for your `SampleTransformer` class to implement your detailed logics of response body manipulation, like below, for such as HTML content manipulation, media manifest file manipulation, and so on. Here is a very simple example of Transformer.

```typescript
// src/SampleTransformer.ts
export class SampleTransformer extends TransformStream<string, string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor() {
        // Initialize a local buffer
        let enqueueBuffer = "";

        function start(controller: any): void {
            // you can put some initialization codes for your stream tranfomer when staring transform.
        }

        function transform(chunk: any, controller: any): void {
            // you can put some manipulation codes to transform stream chunks.
            //   let manipulated = someManipulationFn(chunk);
            // then, you can put a code to enqueue your manipulated chunks to the transformer controller.
            //   controller.enqueue(chunk);

            // This example is very simple to put chunk into a local buffer.
            enqueueBuffer += chunk;
        }

        function flush(controller: any): void {
            // you can put some finalization codes to finish your transformer process.

            // This example is very simple to enqueue the data in the local buffer
            // in where all chunks are put at tranform() function.
            controller.enqueue(enqueueBuffer);
        }

        super({ start, transform, flush });
    }
}
```

### 3. Test your Transformer (Response Manipulation)

This section explains how to test for your Transformer unit module.

An idea of testing your Transformer in your local computer without deploying your codes onto EdgeWorkers is to use "node:stream/web", since Node.js v16.5.0 or later has supported [WHATWG Streams](https://streams.spec.whatwg.org/) fortunately and we can leverage the WHATWG Stream implementation for your local testing.

Here is a sample code for the testing and expects to use [Jest](https://jestjs.io/) and [ts-jest](https://kulshekhar.github.io/ts-jest/) for testing.

Once you will have an implementation of your HTTP Request ['Underlying Source'](https://streams.spec.whatwg.org/#underlying-source-api) as a 'stream' source, you can build a stream pipeline with your Transformer implementation with `pipeThrough()` function of the WHATWG Stream instances.

In this example, `HttpFileSourceReader` class is an UnderlyingSource implementation for source-stream `ReadableStream`, which implements HTTP GET with node-fetch module. You can get the detailed implementation at `tests/testutils/HttpFileSourceReader.ts`.

```typescript
// tests/SampleTransformer.test.ts
import { ReadableStream } from "node:stream/web";
import { TransformStream } from "node:stream/web";
import { TextDecoderStream, TextEncoderStream } from "node:stream/web";
import { TextDecoder } from "node:util";
import { HttpFileSourceReader } from "./testutils/HttpFileSourceReader";
import * as fs from "fs";

// Target Module for this test
import { SampleTransformer } from "../src/SampleTransformer";

describe("Test for SampleTransformer module", (): void => {
    test("Test #1", async (): Promise<void> => {
        const url = "https://edgeworkersorigin.azurewebsites.net/index.html";
        const expected = fs.readFileSync("tests/results/TestResult_module1_test1.html");

        // Setup streams with your SampleTransformer with using Node.js WHATWG Streams implementation.
        // HttpFileSourceReader is an UnderlyingSource implementation for ReadbleStream,
        // which implements HTTP GET with node-fetch
        // You can get the detailed implementation at tests/testutils/HttpFileSourceReader.ts.
        const rstream = new ReadableStream(new HttpFileSourceReader(url));
        const transformedStream1 = rstream
            .pipeThrough(new TextDecoderStream())
            .pipeThrough<string>(new SampleTransformer(queryParams) as TransformStream)
            .pipeThrough(new TextEncoderStream());

        // Once you build a stream pipeline for your testing, then you can get streaming data as below
        // and convert it to text data.
        let result = "";
        for await (const chunk of transformedStream1) {
            const chunkStr = new TextDecoder().decode(chunk);
            result = result + chunkStr;
        }
        
        // You can use console.log for your debugging.
        //console.log("Test1 Expected: " + expected?.length + " bytes\n");
        //console.log(expected + "EOF");
        //console.log("Test1 Result: " + result.length + " bytes\n");
        //console.log(result + "EOF");

        // Checking the actual manipulated results and expected data.
        expect(result === expected).toBe(true);
    });
});
```

This test does not expect to change your test target source code which use EdgeWorkers `streams` library module. How can we test your code??

Jest can support moduleNameMapper feature to map original module names in your source codes to another module names only when testing in your local computer.

You can see an example of **jest.config.js** and a shim "streams" module (a kind of wrapper module) for your local testing as below. 

```javascript
// jest.config.js
module.exports = {
      :
    moduleNameMapper: {
        "^streams$": "<rootDir>/tests/akamai-edgeworkers-localsim/streams",
    },
      :
};
```

```javascript
// tests/akamai-edgeworkers-localsim/streams.ts
export * from "node:stream/web";
```

In this example, Jest will convert EdgeWorkers "**streams**" modules to this local "streams" module, so that your implemented Transformer module can refer `node:stream/web` WHATWG Streams implementation in Node.js when test module will be executed.

The 'stream' module is mapped by Jest's Module Mapping from:
```javascript
import { TransformStream } from "streams"
```
to:
```javascript
import { TransformStream } from "./tests/akamai-edgeworkers-localsim/streams"
```


### 4. Test your ResponseProvider handler implementation (with using EdgeWorkers local simulator implementation)

This section explains how to test your `responseProvider()` handler implementation at EdgeWorkers JavaScript API surface, more than testing a single Transformer unit module.

This testing is bit tricky because you will need to have a EdgeWorkers implementation for your local testing, which requires EdgeWorkers built-in library modules, such as `create-response`, `http-request`, and so on.

This project template provides a sample (and simple) EdgeWorkers local simulator under `tests/akamai-edgeworkers-localsim` folder as a sample implementation for local testing, which contains:
- EdgeWorkers classes and interfaces (such as EW.EwSimResponseProviderRequest, EW.EwSimResponseWithBody objects)
- `create-response` built-in module
- `http-request` built-in module (which internally triggers a HTTP request with node-fetch)
- `log` built-in module (which is a simple shim module of `console.log` function)
- `streams` built-in module (which refers `node:stream/web`)
- `text-encode-transform` built-in module (which refers `node:stream/web`)
- `url-search-params` built-in module (which refers `node:url`)

By using the local simulator above, you can also use the same Jest's module name mapping idea in the previous section for testing your ResponseProvider handler implementation.

> **WARNING**: Please note that there is no guarantees for perfect compatibility with EdgeWorkers real implementation in this local simulator implementation. It would be better to focus just on your debugging and testing of your implemented logics.

Here is a sample code for the testing and expects to use [Jest](https://jestjs.io/) and [ts-jest](https://kulshekhar.github.io/ts-jest/) for testing.

In this sample code, at first, you will need to create a `EW.EwSimResponseProviderRequest` object for your simulated test, and it will be passed to `responseProvider()` API which is in your `main.ts` implementation for your testing.

Then, `responseProvider()` function will return a response object which contains WHATWG `ReadableStream` object.

You will finally check the `ReadableStream` object which contains your manipulated data which is transformed by your Transformer implementation.


```typescript
// tests/main.test.ts
import { EW } from "./akamai-edgeworkers-localsim/EW";
import { TextDecoder } from "node:util";
import * as fs from "fs";

// Target Module for this test
import { responseProvider } from "../src/main";

describe("Test for main module", (): void => {
    test("Test #2", async (): Promise<void> => {
        const expected = fs.readFileSync("tests/results/TestResult_module1_test1.html");

        // Create a simulated Request object for Response Provider in your test.
        const req = new EW.EwSimResponseProviderRequest(
            "edgeworkersorigin.azurewebsites.net",
            "GET",
            "/index.html",
            "https",
            "",
            "https://edgeworkersorigin.azurewebsites.net/index.html",
            12345
        );

        // Call responseProvider EdgeWorkers API surface for this testing.
        const rpResponse = await responseProvider(req);
        // We expects EW.EwSimResponseWithBody object as returned object from responseProvider
        // of this EdgeWorkers local simulator implementation.
        const ewResponse = rpResponse as EW.EwSimResponseWithBody;
        // ewResponse.body is a ReadableStream which contains a manipulated result of response body for your test request,
        // which is transformed by your transformer inmplementation
        let result = "";
        for await (const chunk of ewResponse.body) {
            const chunkStr = new TextDecoder().decode(chunk);
            result = result + chunkStr;
        }

        // You can use console.log for your debugging.
        //console.log("Test1 Expected: " + expected?.length + " bytes\n");
        //console.log(expected + "EOF");
        //console.log("Test1 Result: " + result.length + " bytes\n");
        //console.log(result + "EOF");

        // Checking the actual manipulated results and expected data.
        expect(result === expected).toBe(true);
    });
});
```


## How to use this Project Template

### Prerequisites

This project template is prepared in TypeScript language. It would be better to be familiar with TypeScript.

However toolchains packages will be installed by the Node packaging system, you will need to install the following tools to use this project template.

* Node v16.5.0 or later
* yarn or npm
* jq
* Akamai CLI (optional)


### What are included in this project template

* `src/` folder
    - EdgeWorkers application source codes
    - `main.ts`: contains `responseProvider` event handler implementation
    - `SampleTransformer.ts`: contains very simple `TransformStream` implementation (This is not acting any response data manipulation - you can add your own manipulation logics in this code)
* `tests/` folder
    - `SampleTransformer.test.ts`: contains very simple test module for `SampleTransformer.ts` module
    - `testutils/` folder: contains common utilities for test modules.
    - `akamai-edgeworkers-localsim/` folder: contains a sample implementations of EdgeWorkers local simulator
        - The current implementation contains `streams` and `log` built-in modules of EdgeWorkers JavaScript
- Code Compilation
    - `tsconfig.json`: contaisn configurations for TypeScript
    - `roolup.config.js`: contains configurations for Rollup (a single JS code generation)
- ESLint for code linting
    - `.eslintignore`: a list of files/folders to be ignored for ESLint
    - `.eslintrc.json`: configurations for ESLint
- Prettier for code formatting
    - `.prettierrc`: configurations for Prettier
- Jest for code testing
    - `jest.config.js`: configurations for Jest
- Package management
    - `package.json`: contains configurations for this package
    - `yarn.lock`: a file for package management
- Akamai EdgeWorker operations
    - `akamai-cli`: a wrapper script for Akamai CLI
    - `akamai-cli.config.json`: contains your EdgeWorkers instance configurations
    - `replace.sh`: a shell script to replace *@@VERSION@@* and *@@EDGEWORKERS_ID@@* strings in your codes with your code bundle version and EdgeWorkers Instance Id.

### How to work on this project template

#### 1. Initialize your project

To initialize your project, please run the following command:
```bash
$ yarn
```

This command installs the following packages to your project automatically:

- Packages for TypeScript compilation
    - typescript
    - tslib
    - @types/akamai-edgeworkers
    - rollup
    - @rollup/plugin-commonjs
    - @rollup/plugin-node-resolve
    - @rollup/plugin-typescript
- Packages for code linting (by ESLint)
    - eslint
    - @typescript-eslint/eslint-plugin
    - @typescript-eslint/parser
    - eslint-config-prettier
- Package for code formatting (by Prettier)
    - prettier
- Package for testing (by Jest)
    - jest
    - @types/jest
    - ts-jest
- Package for EdgeWorkers local simulator (using Node v16.5 or later)
    - @types/node
    - @types/node-fetch
    - node-fetch
- Packages for other toolchains
    - npm-run-all
    - rimraf
    - shx

> Node v16.5.0 or later has started to support [WHATWG Streams API](0https://nodejs.org/dist/v16.5.0/docs/api/webstreams.html). This WHATWG Streams implementation is used for EdgeWorkers local simulator for local code development, testing, and/or debugging.


#### 2. Lint your codes in the project

To lint your codes (`*.ts`) under `src/` and `tests/` folders, please run the following command:

```bash
$ yarn lint
```

#### 3. Format your codes in the project

To format your codes (`*.ts`) under `src/` and `tests/` folders, please run the following command:

```bash
$ yarn prettier
```

#### 4. Build project

To complie your codes and build your EdgeWorkers code bundle package, please run the following command:

```bash
$ yarn build
```

The command will generate `dist/` folder to include complied main.js code.
You will also find `ew-bundle.tgz` file as your EdgeWorkers bundle package in `dist/` folder.

#### 5. Test your project

To test your codes, please run the following command:

```bash
$ yarn test
```

You can create your own test codes and modules under `tests/` folder with `*.test.(ts|tsx|js` filename, which are configured as target test modules for Jest testing.

