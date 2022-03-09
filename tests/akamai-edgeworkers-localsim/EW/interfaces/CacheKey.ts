/**
 * akamai-edgeworkers-localsim/EW/interfaces/CacheKey.ts
 *
 * Type definitions for non-npm package Akamai EdgeWorkers JavaScript API 1.0
 */

export interface CacheKey {
    /**
     * Specifies that the entire query string should be excluded from the cache key. By
     * default, the entire query string is part of the cache key.
     */
    excludeQueryString(): void;

    /**
     * Specifies that the entire query string should be included from the cache key. This is
     * done by default, however it is provided as an API to be reverted to the default.
     */
    includeQueryString(): void;

    /**
     * Specifies that the named query argument is included in the cache key. Can be called
     * multiple times to include multiple query arguments. Calling this function will result
     * in all query arguments not explicitly included to be excluded from the cache key. By
     * default, the entire query string is part of the cache key. This would override previous
     * calls to "excludeQueryString()" or "includeQueryString()".
     *
     * @param name The name of the query arg to include in the cache key
     */
    includeQueryArgument(name: string): void;

    /**
     * Specifies that the named cookie is included in the cache key. Can be called multiple
     * times to include multiple cookies.
     *
     * @param name The name of the cookie to include in the cid
     */
    includeCookie(name: string): void;

    /**
     * Specifies that the named HTTP request header is included in the cache key. Can be
     * called multiple times to include multiple headers.
     *
     * @param name The name of the header to include in the cid
     */
    includeHeader(name: string): void;

    /**
     * Specifies that the named variable is included in the cache key. Can be called multiple
     * times to include multiple variable.
     *
     * @param name The name of the variable to include in the cid
     */
    includeVariable(name: string): void;
}
