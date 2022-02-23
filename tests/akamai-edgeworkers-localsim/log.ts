/**
 * tests/akamai-edgeworkers-localsim/log.ts
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

class Logger {
    /**
     * Emit a message to the log. If logging is not enabled, this is a noop.
     *
     * When logging is enabled, the format string indicates how to display
     * the arguments. Format specifiers are:
     *
     * - %s - Call `Value::ToString()` on the corresponding argument.
     * - %d or %i - Convert the argument to an integer.
     * - %f - Convert the argument to a float.
     * - %o or %O - Convert the argument to JSON with `JSON.stringify()`.
     *
     * See https://console.spec.whatwg.org/#formatter.
     *
     * When logging is disabled, the format string is not processed, which
     * makes it more efficient than string arithmatic in production
     * environments.
     *
     * @param format A format string, containing zero or more specifiers.
     * @param values Zero or more values to record in the log.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(format: string, ...values: any): void {
        console.log(format, ...values);
    }
}

export const logger = new Logger();
