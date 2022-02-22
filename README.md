# Template for Akamai EdgeWorkers Response Stream Transform project

## Overview

This repository is a sample project source code and template for Akamai EdgeWorkers Response Stream Transform application.

Akamai EdgeWorkers supports the [WHATWG Streams](https://streams.spec.whatwg.org/) specification, which is typiespecially used for (Response Orchestration](https://techdocs.akamai.com/edgeworkers/docs/response-orchestration) to generate and manipulate response bodies within an EdgeWorkers function by using built-in **http-request** (`httpRequest()` function) and **create-response** (`createResponse()` function) modules in the `responseProvider` event handler.

> Response Orchestration, also known as Dynamic Content Assembly, is the ability to create on-the-fly response data and content. You can use Response Orchestration to dynamically create tailored, personalized data or web content for a specific set of users or devices. You can also source data and content from multiple server-side APIs or content origins. Response Orchestration supports conditions when combining multiple data sets or HTML fragments.

Two important limitations are in EdgeWorkers. Please see the article about [Limitations](https://techdocs.akamai.com/edgeworkers/docs/limitations) in EdgeWorkers documentation.

* Maximum body size for responses from an EdgeWorkers function to a browser when the response is passed through as a string
    - 100,000 bytes if you pass a string to createResponse in responseProvider
    - No direct limit if you pass a stream to createResponse in responseProvider.
* Maximum body size for responses from an EdgeWorkers function to a client browser
    - 2048 characters if you use request.respondWith() in the onClientRequest or onClientResponse event handler.

Your stream implementation sometimes may be getting bit complex when developing and/or debuging your codes. EdgeWorkers supports to [enable JavaScript logging](https://techdocs.akamai.com/edgeworkers/docs/enable-javascript-logging), but the maximum log size per event handler is 1024 bytes and your log contents will be truncated if the log contents exceed 1024 bytes.

It's important for your project to manage how to develop and debug your EdgeWorkers app on your local computer. Thus, here is a sample template project for your EdgeWorkers Response Stream Transforming application.


## Prerequisites

This project template is prepared in TypeScript language. It would be better to be familiar with TypeScript.

However toolchains packages will be installed by the Node packaging system, you will need to install the following tools to use this project template.

* Node v16.5.0 or later
* yarn or npm
* jq
* Akamai CLI (optional)


## What are included in this project template

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

## How to use this project template

### Initialize your project

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


### Lint your codes in the project

To lint your codes (`*.ts`) under `src/` and `tests/` folders, please run the following command:

```bash
$ yarn lint
```

### Format your codes in the project

To format your codes (`*.ts`) under `src/` and `tests/` folders, please run the following command:

```bash
$ yarn prettier
```

### Build project

To complie your codes and build your EdgeWorkers code bundle package, please run the following command:

```bash
$ yarn build
```

The command will generate `dist/` folder to include complied main.js code.
You will also find `ew-bundle.tgz` file as your EdgeWorkers bundle package in `dist/` folder.

## Test your project

To test your codes, please run the following command:

```bash
$ yarn test
```

You can create your own test codes and modules under `tests/` folder with `*.test.(ts|tsx|js` filename, which are configured as target test modules for Jest testing.

