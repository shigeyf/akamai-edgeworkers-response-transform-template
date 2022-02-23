/**
 * akamai-edgeworkers-localsim/EW/interfaces/HasRespondWith.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface HasRespondWith {
    /**
     * Constructs a response for the given request, rather than fetching a response from cache or the origin.
     * Returns - Responses created through the respondWith() method can return a body with a maximum of 2048 characters.
     * The Connection, Keep-Alive, Proxy-Authenticate, Proxy-Authorization, TE, Trailers, and Transfer-Encoding
     *  hop-by-hop headers should not be set when creating a request.
     *
     * The Host, Content-Length, and Vary headers should not be set or copied from another request.
     * If you opt to set them anyway, you need to make sure that the values are correct.
     *
     * An incorrect value in the Host header can break your request.
     * An incorrect value in the Content-Length header will break the response.
     * Make sure that the value reflects the actual length of the payload you're passing.
     * An incorrect value in the Vary header can break cacheability.
     *
     * respondWith() supports the GET, POST, DELETE, PUT, PATCH, and HEAD request methods.
     *
     * Indicates that a complete response is being generated for a
     * request, rather than fetching a response from cache or the origin.
     *
     * If called multiple times within an event handler, the last
     * Response arguments passed in would be the arguments used to
     * generate a response.
     *
     * The maximum response body string length is 2K characters. If
     * validation of the passed in Response object fails it will throw
     * an exception. For example, a Response body bigger than the limit
     * will cause an exception.
     *
     * Note: The status supports 2xx Success , 3xx Redirection , 4xx Client Error , and 5xx Server Error status codes.
     * An exception is thrown if the status code is outside the 2xx to 5xx range.)
     *
     * The deny_reason is an optional argument, and only used if the
     * status code is 403.
     *
     * @param status The HTTP status code
     * @param headers Properties used as key/value pairs for the response headers
     * @param body The content of the response body
     * @param deny_reason The deny reason set if the status code is a 403 (optional)
     */
    respondWith(status: number, headers: object, body: string, deny_reason?: string): void;
}
