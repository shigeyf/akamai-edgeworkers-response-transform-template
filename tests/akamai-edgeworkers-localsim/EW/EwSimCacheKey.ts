/**
 * tests/akamai-edgeworkers-localsim/EW/EwSimCacheKey.ts
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

import { CacheKey } from "./interfaces/CacheKey";

export class EwSimCacheKey implements CacheKey {
    /**
     * Specifies that the entire query string should be excluded from the cache key. By
     * default, the entire query string is part of the cache key.
     */
    excludeQueryString(): void {
        // To Be Implemented - No implementation currently
    }

    /**
     * Specifies that the entire query string should be included from the cache key. This is
     * done by default, however it is provided as an API to be reverted to the default.
     */
    includeQueryString(): void {
        // To Be Implemented - No implementation currently
        return;
    }

    /**
     * Specifies that the named query argument is included in the cache key. Can be called
     * multiple times to include multiple query arguments. Calling this function will result
     * in all query arguments not explicitly included to be excluded from the cache key. By
     * default, the entire query string is part of the cache key. This would override previous
     * calls to "excludeQueryString()" or "includeQueryString()".
     *
     * @param name The name of the query arg to include in the cache key
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    includeQueryArgument(name: string): void {
        // To Be Implemented - No implementation currently
        return;
    }

    /**
     * Specifies that the named cookie is included in the cache key. Can be called multiple
     * times to include multiple cookies.
     *
     * @param name The name of the cookie to include in the cid
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    includeCookie(name: string): void {
        // To Be Implemented - No implementation currently
        return;
    }

    /**
     * Specifies that the named HTTP request header is included in the cache key. Can be
     * called multiple times to include multiple headers.
     *
     * @param name The name of the header to include in the cid
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    includeHeader(name: string): void {
        // To Be Implemented - No implementation currently
        return;
    }

    /**
     * Specifies that the named variable is included in the cache key. Can be called multiple
     * times to include multiple variable.
     *
     * @param name The name of the variable to include in the cid
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    includeVariable(name: string): void {
        // To Be Implemented - No implementation currently
        return;
    }
}
