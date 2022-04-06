# Akamai EdgeWorkers simulator modules for local unit tests

## Overview

The modules in this folder is an example implementation of Akamai EdgeWorkers classes and built-in modules, which is used as a local running simulation of your EdgeWorkers application in your development works.

You can use the modules to define your tests and develop your test modules with Jest and other test frameworks to do unit testing and module debugging effectively 
When you are developing an EdgeWokers application, you may have a trial and error with deploying your EdgeWorkers application bundle packaging. You can enable [JavaScript Logging](https://techdocs.akamai.com/edgeworkers/docs/enable-javascript-logging) in your deployed EdgeWorkers application, which may help you to do test and debug your application, but it's not typically a efficient way. Sometimes you wants to have a good confidence in your development of the application before your deployment, because:

- EdgeWorkers application is a partial component of HTTP request/response flows as an event handler implementation, and therefore the flows could be easily broken if there is a problem in your implementation.
- However there is a Logger module and functionality to enable JavaScript logging to output some debug information when running a application, JavaScript logging has a max limit in the log output. Also, there is no way for code-level step-by-step debugging in EdgeWorkers when you deploy your applications.
- Especially in response orchestration and manipulation implementation of yoru EdgeWorkers application, there is a big benifit in the "stream" implementation, that is no size limitation of the response data. But, the "stream" is asynchronous and your event handler with asynchronous tasks/logics are very complex to debug.

To test and debug modules (or components) of your EdgeWorkers application, you can use the modules in this folder to define your test logics and make your test codes with Jest and other test frameworks to do unit testing and module debugging effectively in your local machine.


## Current status

This repository provides EdgeWorkers Class '*sample*' implementations which implements official EdgeWorkers Types:

- Classes for onClientRequest event handler
    * EW.EwSimIngressClientRequest class – implements EW.IngressClientRequest
- Classes for onClientResponse event handler
    * EW.EwSimEgressClientRequest class – implements EW.EgressClientRequest
    * EW.EwSimEgressClientResponse class – implements EW.EgressClientResponse
- Classes for onOriginRequest event handler
    * EW.EwSimIngressOriginRequest class – implements EW.IngressOriginRequest
- Classes for onOriginResponse event handler
    * EW.EwSimEgressOriginRequest class – implements EW.EgressOriginRequest
    * EW.EwSimEgressOriginResponse class – implements EW.EgressOriginResponse
- Classes for responseProvider event handler
    * EW.EwSimResponseProviderRequest class – implements EW.ResponseProviderRequest
    * EW.EwSimResponseWithBody class – a sample implementation of event handler output
- Utility classes
    * EW.EwSimCacheKey class – implements EW.CacheKey interface
    * EW.EwSimDevice class – implements EW.Device interface
    * EW.EwSimUserLocation class – implements EW.UserLocation interface

Also this provides EdgeWorkers '*sample*' module implementations which implements official EdgeWorkers built-in modules:
- cookies – very mock-type implementation
- create-response – a sample implementation
- http-request – a sample implementation with node-fetch for HTTP sub-requests
- log – a shim module to console.log
- streams – a shim module to node:stream/web
- text-encoder-transform – a shim module to node:stream/web
- url-search-params – a shim module to node:url


## EdgeKV integration

Since EdgeWorkers is tightly integrated with EdgeKV, EdgeWorkers calls a special API to access EdgeKV with ‘X-Akamai-EdgeDB-Auth’ access token for EdgeWorkers app. But, the special API is not accessible from your client computer in your local unit-test runs.

For local tests, public open EdgeKV APIs with EdgeGrid Auth token will be  required for your local tests of EdgeKV integration. This EdgeWorkers simulator's ‘http-request’ module implementation will convert the EdgeKV API calls from the special API endpoint to the public EdgeKV API endpoint.

> Note: EdgeGrid-based API may cause bit slow responses and have a rate-limit of API calls.


## Limitations

* Be aware of HTTP sub-requests limitations in EdgeWorkers
    - Please see the official document: https://techdocs.akamai.com/edgeworkers/docs/http-request
    - HTTP sub-requests (http-request module) in this simulator does not simulate such limitations.
* Currently, no session storage implementation in this simulator, and thus no header/variable transfer can be simulated between different event handlers
* Currently, no Destination interface is implemented
* No CacheKey simulation is implemented in local simulator
* No caching simulation
* There is no guarantee of perfect compatibility between *real* EdgeWorkers implementation and simulator implementation


I would say another important notes in your EW development.
- Your EdgeWorkers codes and test codes run on Node.js, thus sometimes you may accidentaly use Node core modules or any modules depending on Node core modules in your EdgeWorkers codes, which are node supported in EdgeWorkers runtime.
- This simulator does not provide such a module dependency detection, currently.
- When you imports such modules into your codes, the import process will give you erros, since those module may not be existed in EdgeWorkers or not work with EdgeWorkers
- For more details, please see the EW Runetime JavaScript specifications at: https://techdocs.akamai.com/edgeworkers/docs/specifications
