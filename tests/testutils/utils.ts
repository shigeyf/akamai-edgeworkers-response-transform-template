/**
 * tests/utils.ts
 *
 * Author: sfukushi@akamai.com
 * Date: August 30, 2021
 */
/**
 * Copyright (c) 2021 Akamai Technologies (Shige Fukushima <sfukushi@akamai.com>)
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

export function getQueryParameters(url: string): string {
    if (!url) return "";

    const quesPos = url.indexOf("?");
    let hashPos = url.indexOf("#");
    if (quesPos == -1) return "";
    if (hashPos == -1) hashPos = url.length;

    const queryParams = url.substring(quesPos + 1, hashPos);
    return queryParams;
}

export function getJsonFromUrl(url: string): { [key: string]: string } {
    if (!url) return {};

    const quesPos = url.indexOf("?");
    let hashPos = url.indexOf("#");
    if (quesPos == -1) return {};
    if (hashPos == -1) hashPos = url.length;

    const queryParams = url.substring(quesPos + 1, hashPos);

    const result: { [key: string]: string } = {};
    queryParams.split("&").forEach(function (paramStr) {
        if (!paramStr) return;
        paramStr = paramStr.split("+").join(" "); // replace every + with space
        const param = paramStr.split("=");
        if (param.length > 1) {
            result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
        } else {
            result[decodeURIComponent(param[0])] = "";
        }
    });
    return result;
}
