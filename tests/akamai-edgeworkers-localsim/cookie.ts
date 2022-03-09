/**
 * akamai-edgeworkers-localsim/cookie.ts
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

/**
 * A cookies module is available to assist in cookie manipulation.
 * This module exports two structs, Cookies and SetCookie, each corresponding to one "Cookie" or "Set-Cookie" header respectively.
 *
 * Cookies are often user or session specific, stripping the cookie helps improve the offload of cached objects.
 * To keep the Set-Cookie header, you can use the <edgeservices:cookie.pass-set-cookie-policy> metadata tag.
 * This metadata tag lets you keep the Set-Cookie header modifications made during the onClientResponse event.
 *
 * Provides access to the Cookies header of a request, allowing the
 * addition, removal, or modification of cookie values.
 */
export class Cookies {
    private _cookies: { name: string; value: string }[];
    /**
     * Constructor for a new "Cookies" struct to hold cookies.
     *
     * @param cookieHeader The raw Cookie header to pass to the constructor
     *      to parse. If an array is passed, the first element must be a
     *      string and that is used as the cookies string to parse. If this
     *      is not passed, an empty cookies object is returned.
     *
     * @param options Only used when parsing an existing Cookie header.
     *      Object to override the default decode of the Cookie values. This
     *      object must have a function named 'decode' on it, which should
     *      take a string and return the result of the custom decoding of
     *      that string.
     */
    constructor(header?: string | string[] | null, options?: any) {
        this._cookies = [];
        let decoder = (s: string) => {
            return s;
        };
        if (options != undefined && Object.prototype.hasOwnProperty.call(options, "decode")) {
            const fn = options["decode"];
            if (typeof fn == "function") {
                decoder = fn;
            }
        }
        if (Array.isArray(header)) {
            header.forEach((h) => {
                const decoded = decoder(h);
                const kvps = decoded.split(";");
                kvps.forEach((kvp) => {
                    const [key, value] = kvp.split("=");
                    this._cookies.push({ name: key, value: value });
                });
            });
        } else {
            const decoded = decoder(header);
            const kvps = decoded.split(";");
            kvps.forEach((kvp) => {
                const [key, value] = kvp.split("=");
                this._cookies.push({ name: key, value: value });
            });
        }
    }

    /**
     * Returns the string representation to use when setting the Cookie
     * header, encoding values by default.
     */
    toHeader(): string {
        let cookieHeader = "";
        this._cookies.forEach((kvp) => {
            cookieHeader = cookieHeader + kvp.name + "=" + kvp.value + ";";
        });
        return cookieHeader;
    }

    /**
     * Get the first instance of the cookie matching the given name.
     *
     * @param name Cookie name.
     */
    get(name: string): string | undefined {
        this._cookies.forEach((kvp) => {
            if (kvp.name == name) {
                return kvp.value;
            }
        });
        return undefined;
    }

    /**
     * Get all Instances of the cookie matching the given name.
     *
     * @param name cookie name.
     */
    getAll(name: string): string[] {
        const result = [];
        this._cookies.forEach((kvp) => {
            if (kvp.name == name) {
                result.push(kvp.value);
            }
        });
        return result;
    }

    /**
     * Get all names of existing cookies held by this Cookies object.
     */
    names(): string[] {
        const result = [];
        this._cookies.forEach((kvp) => {
            result.push(kvp.name);
        });
        return result;
    }

    /**
     * Adds a cookie.
     * @param name Name of the cookie
     * @param value Value of the cookie.
     */
    add(name: string, value: string): void {
        this._cookies.push({ name: name, value: value });
    }

    /**
     * Removes all cookies with a given name.
     *
     * @param name Cookie name.
     */
    delete(name: string): void {
        const filtred = this._cookies.filter((item) => item.name !== name);
        this._cookies = filtred;
    }
}

/**
 * Provides access to the SetCookies header of a request.
 */
export class SetCookie {
    name: string | undefined;
    value: string | undefined;
    maxAge: number | undefined;
    domain: string | undefined;
    path: string | undefined;
    expires: { toUTCString: () => string } | undefined;
    httpOnly: boolean | undefined;
    secure: boolean | undefined;
    sameSite: "Strict" | "Lax" | "None" | undefined;

    /**
     * Constructor for a new "SetCookie" struct to hold a specific Set-Cookie
     * header representation.
     */
    constructor(opts?: {
        name: string;
        value: string;
        maxAge?: number | undefined;
        domain?: string | undefined;
        path?: string | undefined;
        expires?: { toUTCString: () => string } | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }) {
        this.httpOnly = false;
        this.secure = false;
        this.name = opts.name;
        this.value = opts.value;
        this.maxAge = opts.maxAge;
        this.domain = opts.domain;
        this.path = opts.path;
        this.expires = opts.expires;
        this.httpOnly = opts.httpOnly;
        this.secure = opts.secure;
        this.sameSite = opts.sameSite;
    }

    /**
     * Returns the string representation to use when setting the Set-Cookie
     * header, encoding values by default.
     */
    toHeader(options?: any): string {
        let cookie = "";
        if (this.name == undefined || this.value == undefined) {
            return "";
        }
        cookie = this.name + "=" + this.value + ";";
        if (this.expires != undefined) {
            cookie = cookie + " Expires=" + this.expires + ";";
        }
        if (this.maxAge != undefined) {
            cookie = cookie + " Max-Age=" + this.maxAge + ";";
        }
        if (this.domain != undefined) {
            cookie = cookie + " Domain=" + this.domain + ";";
        }
        if (this.path != undefined) {
            cookie = cookie + " Path=" + this.expires + ";";
        }
        if (this.httpOnly != undefined && this.httpOnly) {
            cookie = cookie + " HttpOnly;";
        }
        if (this.secure != undefined && this.secure) {
            cookie = cookie + " Secure;";
        }
        if (this.sameSite != undefined) {
            cookie = cookie + " SameSite=" + this.sameSite + ";";
        }

        if (options != undefined && Object.prototype.hasOwnProperty.call(options, "encode")) {
            const fn = options["encode"];
            if (typeof fn == "function") {
                const encodedCookie = fn(cookie);
                cookie = encodedCookie;
            }
        }
        return cookie;
    }
}
